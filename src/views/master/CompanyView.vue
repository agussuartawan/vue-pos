<script setup lang="ts">
import PaginationLink from '@/components/PaginationLink.vue'
import TableMain from '@/components/TableMain.vue'
import MainLayout from '@/components/layouts/MainLayout.vue'
import InputSearch from '@/components/inputs/InputSearch.vue'
import ButtonFilter from '@/components/buttons/ButtonFilter.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import { useRoute } from 'vue-router'
import { usePopupStore } from '@/stores/popup'
import FormPermission from '@/components/forms/FormPermission.vue'
import { watch } from 'vue'
import TabLayout from '@/components/layouts/tabs/TabLayout.vue'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import MasterTab from '@/components/layouts/tabs/MasterTab.vue'

const route = useRoute()
const popup = usePopupStore()
const tabSelected: number = 2

const headers = [
  {
    label: 'No'
  },
  {
    label: 'Name',
    name: 'name'
  },
  {
    label: 'Description'
  },
  {
    label: 'Created At',
    name: 'createdAt'
  }
]

const tableData = [
  { name: 'Alice', description: 'Alice desc', createdAt: new Date() },
  { name: 'Alice', description: 'Alice desc', createdAt: new Date() },
  { name: 'Alice', description: 'Alice desc', createdAt: new Date() },
  { name: 'Alice', description: 'Alice desc', createdAt: new Date() },
  { name: 'Alice', description: 'Alice desc', createdAt: new Date() },
  { name: 'Alice', description: 'Alice desc', createdAt: new Date() }
]

const contextMenuItems = [
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

const showFormEdit = (row: any) => {
  popup.openPopup(FormPermission, { title: 'Edit Company', data: row })
}

const showFormCreate = () => {
  popup.openPopup(FormPermission, { title: 'Create Company' })
}

watch(
  () => route.query,
  () => {
    tableData.push({
      name: 'Kowo',
      description: 'Kowo desc',
      createdAt: new Date()
    })
  },
  { immediate: true }
)
</script>

<template>
  <MainLayout>
    <TabLayout title="Companies" description="Total 100 data">
      <template v-slot:tabs>
        <MasterTab />
      </template>
      <template v-slot:body>
        <div class="mt-3">
          <div class="mb-3 flex justify-between">
            <div class="flex items-center gap-2">
              <ButtonFilter :filtered="false" />
              <InputSearch />
            </div>
            <div class="flex items-center gap-2">
              <button
                @click="showFormCreate"
                class="btn btn-sm bg-base-100 rounded-lg"
              >
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
              <template #default="{ row, index }">
                <td @click="showFormEdit(row)">{{ index + 1 }}</td>
                <td @click="showFormEdit(row)">{{ row.name }}</td>
                <td @click="showFormEdit(row)">{{ row.description }}</td>
                <td @click="showFormEdit(row)">
                  {{ formatDistanceToNow(row.createdAt) }}
                </td>
              </template>
            </TableMain>
          </div>
        </div>
      </template>
    </TabLayout>
  </MainLayout>
</template>

<style scoped></style>
