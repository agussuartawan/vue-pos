import type { LoginRequest } from '@/api/data/request/auth_request'
import { axiosInstance } from '@/api/axios_instance'
import type { BaseResponse } from '@/api/data/response/response'
import type {
  LoginResponse,
  ProfileResponse
} from '@/api/data/response/auth_response'

export const login = async (req: LoginRequest) =>
  await axiosInstance.post<BaseResponse<LoginResponse>>('/auth/login', req)

export const getProfile = async () =>
  await axiosInstance.get<BaseResponse<ProfileResponse>>('/auth/profile')

export const logout = async () =>
  await axiosInstance.delete<BaseResponse<string>>('/auth/logout')
