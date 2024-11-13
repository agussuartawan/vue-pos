<script setup lang="ts">
import PaginationLink from '@/components/PaginationLink.vue'
import MainLayout from '@/components/layouts/MainLayout.vue'
import TableMain from '@/components/TableMain.vue'
import InputSearch from '@/components/inputs/InputSearch.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import ButtonFilter from '@/components/buttons/ButtonFilter.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import { usePopupStore } from '@/stores/popup'
import FormPermission from '@/components/forms/FormPermission.vue'
import type { PermissionResponse } from '@/api/data/response/permission_response'
import type { BaseResponse, ErrorResponse } from '@/api/data/response/response'
import ErrorView from '@/views/ErrorView.vue'
import { apiError } from '@/api/error_handler'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import { getPermissions } from '@/api/methods/permission'

const route = useRoute()
const popup = usePopupStore()
const response = ref<BaseResponse<PermissionResponse[]> | null>(null)
const loading = ref<boolean>(false)
const error = ref<ErrorResponse | null>(null)

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

const contextMenuItems = [
  {
    label: 'Assign to Role',
    action: (rowData: any) => {
      console.log('Assign to Role', rowData)
    }
  },
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
  popup.openPopup(FormPermission, 'Edit Permission', { data: row })
}

const showFormCreate = () => {
  popup.openPopup(FormPermission, 'Create Permission')
}

const fetchData = async () => {
  loading.value = true
  try {
    const { data } = await getPermissions()
    response.value = data
  } catch (err) {
    error.value = apiError(err)
  } finally {
    loading.value = false
  }
}

watch(
  () => route.query,
  () => {
    fetchData()
  },
  { immediate: true }
)

onMounted(fetchData)
</script>

<template>
  <MainLayout>
    <ErrorView v-if="error" :error="error?.message" @action="fetchData" />

    <div v-else>
      <h1 class="text-2xl font-semibold">Permissions</h1>
      <p>Total 20 data</p>

      <div class="mt-5">
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
            :data="response?.data"
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
    </div>
  </MainLayout>
</template>

<style scoped></style>
