import type { LoginRequest } from '@/api/data/request/auth_request'
import { apiError } from '@/api/error_handler'
import { axiosInstance } from '@/api/axios_instance'
import type { BaseResponse } from '@/api/data/response/response'
import type { ProfileResponse } from '@/api/data/response/auth_response'

export const login = async (req: LoginRequest) => {
  try {
    const { data } = await axiosInstance.post('/auth/login', req)
    return data
  } catch (error) {
    return apiError(error)
  }
}

export const getProfile = async () =>
  await axiosInstance.get<BaseResponse<ProfileResponse>>('/auth/profile')

export const logout = async () =>
  await axiosInstance.delete<BaseResponse<any>>('/auth/logout')
