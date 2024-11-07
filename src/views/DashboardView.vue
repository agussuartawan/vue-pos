<script lang="ts">
import { defineComponent } from 'vue'
import MainLayout from '@/components/layouts/MainLayout.vue'
import TableMain from '@/components/TableMain.vue'
import { usePopupStore } from '@/stores/popup'
import PaginationLink from '@/components/PaginationLink.vue'
import InputSearch from '@/components/inputs/InputSearch.vue'
import ButtonFilter from '@/components/buttons/ButtonFilter.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import InputText from '@/components/inputs/InputText.vue'
import ProfileData from '@/components/ProfileData.vue'

export default defineComponent({
  computed: {
    InputText() {
      return InputText
    }
  },
  components: {
    ProfileData,
    IconPlus,
    ButtonFilter,
    InputSearch,
    PaginationLink,
    TableMain,
    MainLayout
  },
  data() {
    return {
      popup: usePopupStore(),
      headers: [
        {
          label: 'Name'
        },
        {
          label: 'Age'
        },
        {
          label: 'Country'
        }
      ],
      tableData: [
        { name: 'Alice', age: 30, country: 'USA' },
        { name: 'Bob', age: 24, country: 'Canada' },
        { name: 'Bob', age: 24, country: 'Canada' },
        { name: 'Bob', age: 24, country: 'Canada' }
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' },
        // { name: 'Bob', age: 24, country: 'Canada' }
      ],
      contextMenuItems: [
        {
          label: 'Edit',
          action: (rowData: any) => {
            console.log('Edit', rowData)
          }
        },
        {
          label: 'Delete',
          action: (rowData: any) => {
            console.log('Delete', rowData)
          }
        }
      ]
    }
  }
})
</script>

<template>
  <MainLayout>
    <h1 class="text-2xl font-semibold">Dashboard</h1>
    <p>Isi konten halaman Anda di sini.</p>

    <div class="mt-5">
      <div class="mb-3 flex justify-between">
        <div class="flex items-center gap-2">
          <ButtonFilter :filtered="false" />
          <InputSearch />
        </div>
        <div class="flex items-center gap-2">
          <button class="btn btn-sm bg-base-100 rounded-lg">
            <IconPlus size="w-4 h-4" />
            Create
          </button>
          <PaginationLink />
        </div>
      </div>
      <div class="bg-base-100 p-2 w-full rounded-2xl">
        <TableMain
          :headers="headers"
          :data="tableData"
          :contextMenuItems="contextMenuItems"
        >
          <template #default="{ row }">
            <tr @click="popup.openPopup(InputText, { title: 'Test' })">
              <td>{{ row.name }}</td>
              <td>{{ row.age }}</td>
              <td>{{ row.country }}</td>
            </tr>
          </template>
        </TableMain>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped></style>
