import type { Permission } from '@/api/data/response/permission_response'
import type { Role } from '@/api/data/response/role_response'

export interface LoginResponse {
  name: string
  avatar?: string
  roles: string[]
  permissions: string[]
}

export interface ProfileResponse {
  id: number
  name: string
  email: string
  phone?: string
  createdAt: Date
  updatedAt: Date
  roles?: Role[]
  permissions?: Permission[]
}
