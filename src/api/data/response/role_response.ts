import type { Permission } from '@/api/data/response/permission_response'

export interface RoleResponse {
  id: string
  name: string
  description: string
  createdAt: Date
  permissions: Permission[]
}

export interface Role {
  id: number
  name: string
}
