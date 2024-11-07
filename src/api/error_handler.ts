import { AxiosError } from 'axios'
import type { BaseResponse, ErrorResponse } from '@/api/data/response/response'

export const apiError = (error: any): ErrorResponse => {
  if (error instanceof AxiosError) {
    const axiosError = error as AxiosError
    if (axiosError.response) {
      const res = axiosError.response?.data as BaseResponse<any>
      return res.error
    }
  }

  return {
    message: error.message ?? 'Server Error'
  }
}
