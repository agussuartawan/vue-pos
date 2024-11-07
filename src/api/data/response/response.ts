export interface BaseResponse<T> {
  status: number
  message: string
  data: T
  pagination: PaginationResponse
  error: ErrorResponse
}

export interface PaginationResponse {
  query: string
  page: number
  limit: number
  sortBy: string
  sort: string
  next: number
  prev: number
  totalData: number
  totalPage: number
}

export interface ErrorResponse {
  message: string
  validation?: ValidationFailedResponse[]
}

export interface ValidationFailedResponse {
  field: string
  message: string
}
