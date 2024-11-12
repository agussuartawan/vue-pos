import type { PermissionResponse } from '@/api/data/response/permission_response'
import type { BaseResponse } from '@/api/data/response/response'
import { axiosInstance } from '@/api/axios_instance'

export const getPermission = async () =>
  await axiosInstance.get<BaseResponse<PermissionResponse[]>>('permission')
