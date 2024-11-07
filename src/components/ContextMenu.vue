<script lang="ts">
import { defineComponent, type PropType } from 'vue'

interface ContextMenuItem {
  label: string
  action: (rowData: any) => void
}

interface ContextMenuPosition {
  x: number
  y: number
}

export default defineComponent({
  name: 'ContextMenu',
  props: {
    contextMenuItems: {
      type: Array as PropType<ContextMenuItem[]>,
      required: true
    },
    position: {
      type: Object as PropType<ContextMenuPosition>,
      required: true
    }
  },
  emits: ['close', 'action'],
  setup(_, { emit }) {
    const handleAction = (action: (row: any) => void) => {
      emit('action', action)
      emit('close')
    }

    return { handleAction }
  }
})
</script>

<template>
  <div
    ref="contextMenu"
    :style="{ top: `${position.y}px`, left: `${position.x}px` }"
    class="bg-base-300 shadow-lg rounded-lg p-2 absolute"
  >
    <ul class="rounded-box">
      <li
        v-for="(menu, index) in contextMenuItems"
        :key="index"
        @click="handleAction(menu.action)"
        class="py-1 px-4 hover:bg-base-100 cursor-pointer"
      >
        {{ menu.label }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
