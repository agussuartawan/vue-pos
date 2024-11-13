<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import IconPlus from '@/components/icons/IconPlus.vue'
import ButtonFilter from '@/components/buttons/ButtonFilter.vue'
import MainLayout from '@/components/layouts/MainLayout.vue'
import TabLayout from '@/components/layouts/tabs/TabLayout.vue'
import PaginationLink from '@/components/PaginationLink.vue'
import UserManagementTab from '@/components/layouts/tabs/UserManagementTab.vue'
import ErrorView from '@/views/ErrorView.vue'
import InputSearch from '@/components/inputs/InputSearch.vue'
import TableMain from '@/components/TableMain.vue'
import { useRoute } from 'vue-router'
import { usePopupStore } from '@/stores/popup'
import { onMounted, ref, watch } from 'vue'
import type { BaseResponse, ErrorResponse } from '@/api/data/response/response'
import type { PermissionResponse } from '@/api/data/response/permission_response'
import FormPermission from '@/components/forms/FormPermission.vue'
import { apiError } from '@/api/error_handler'
import { getRoles } from '@/api/methods/role'

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
  popup.openPopup(FormPermission, 'Edit Role', { data: row })
}

const showFormCreate = () => {
  popup.openPopup(FormPermission, 'Create Role')
}

const fetchData = async () => {
  loading.value = true
  try {
    const { data } = await getRoles()
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

    <TabLayout
      v-else
      title="Role"
      :description="`Total ${response?.pagination?.totalData ?? 0} data`"
    >
      <template v-slot:tabs>
        <UserManagementTab />
      </template>
      <template v-slot:body>
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
      </template>
    </TabLayout>
  </MainLayout>
</template>

<style scoped></style>
