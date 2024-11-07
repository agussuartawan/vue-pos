import { object, ObjectSchema, string } from 'yup'
import type { LoginRequest } from '@/api/data/request/auth_request'

export const LoginSchema: ObjectSchema<LoginRequest> = object({
  email: string().required().email(),
  password: string().required()
})
