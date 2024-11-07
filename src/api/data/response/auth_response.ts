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

export interface Role {
  id: number
  name: string
}

export interface Permission {
  id: number
  name: string
}
