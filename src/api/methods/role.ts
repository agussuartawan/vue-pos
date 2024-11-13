import type { BaseResponse } from '@/api/data/response/response'
import { axiosInstance } from '@/api/axios_instance'
import type { RoleResponse } from '@/api/data/response/role_response'

export const getRoles = async () =>
  await axiosInstance.get<BaseResponse<RoleResponse[]>>('role')
