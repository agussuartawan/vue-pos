<script lang="ts">
import { defineComponent, type PropType, ref, watch } from 'vue'
import ContextMenu from '@/components/ContextMenu.vue'
import { usePopupStore } from '@/stores/popup'
import IconSort from '@/components/icons/IconSort.vue'
import IconSortAsc from '@/components/icons/IconSortAsc.vue'
import IconSortDesc from '@/components/icons/IconSortDesc.vue'
import { useRoute, useRouter } from 'vue-router'

interface ContextMenuItem {
  label: string
  action: (rowData: any) => void
}

interface TableHeader {
  label: string
  name?: string
}

export default defineComponent({
  name: 'TableMain',
  components: { IconSortDesc, IconSortAsc, IconSort, ContextMenu },
  props: {
    headers: {
      type: Array as PropType<TableHeader[]>,
      required: true
    },
    data: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    contextMenuItems: {
      type: Array as PropType<ContextMenuItem[]>,
      required: true
    }
  },
  setup() {
    const popup = usePopupStore()
    const showMenu = ref(false)
    const menuPosition = ref({ x: 0, y: 0 })
    const currentRow = ref<any>(null)
    const route = useRoute()
    const router = useRouter()
    const sort = ref<string | null>(null)
    const sortBy = ref<string | null>(null)

    const showContextMenu = (event: MouseEvent, rowData: any) => {
      showMenu.value = true
      menuPosition.value = { x: event.pageX, y: event.pageY }
      currentRow.value = rowData
      document.addEventListener('click', () => {
        showMenu.value = false
      })
    }

    const handleContextMenuAction = (action: (row: any) => void) => {
      action(currentRow.value)
      showMenu.value = false
    }

    const handleSort = (sort: string) => {
      const query = { ...route.query }
      const sortBy = route.query.sortBy

      query.sort = sort

      if (!sortBy) {
        query.sortBy = 'asc'
      } else if (sortBy === 'asc') {
        query.sortBy = 'desc'
      } else {
        delete query.sortBy
      }

      router.replace({ path: route.path, query })
    }

    watch(
      () => route.query,
      () => {
        sort.value = (route.query.sort as string) || null
        sortBy.value = (route.query.sortBy as 'asc' | 'desc') || null
      },
      { immediate: true }
    )

    return {
      popup,
      showContextMenu,
      showMenu,
      handleContextMenuAction,
      menuPosition,
      handleSort,
      sort,
      sortBy
    }
  }
})
</script>

<template>
  <table class="table table-sm" @contextmenu.prevent>
    <thead>
      <tr>
        <th v-for="header in headers" :key="header.label">
          <button
            v-if="header.name"
            class="flex items-center"
            @click="handleSort(header.name)"
          >
            {{ header.label }}
            <IconSort v-if="!sortBy || sort !== header.name" size="w-4 h-4" />

            <IconSortAsc
              v-else-if="sortBy === 'asc' && sort === header.name"
              size="w-4 h-4"
            />

            <IconSortDesc
              v-else-if="sortBy === 'desc' && sort === header.name"
              size="w-4 h-4"
            />
          </button>
          <span v-else>{{ header.label }}</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, index) in data"
        :key="index"
        class="hover:bg-base-200 cursor-pointer"
        @contextmenu.prevent="showContextMenu($event, row)"
      >
        <slot :row="row" :index="index"></slot>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td
          class="text-center"
          v-if="data.length === 0"
          :colspan="headers.length"
        >
          No data available
        </td>
      </tr>
      <tr>
        <th v-for="header in headers" :key="header.label">
          {{ header.label }}
        </th>
      </tr>
    </tfoot>
  </table>

  <ContextMenu
    v-if="showMenu"
    :context-menu-items="contextMenuItems"
    :position="menuPosition"
    @close="showMenu = false"
    @action="handleContextMenuAction"
  />
</template>
