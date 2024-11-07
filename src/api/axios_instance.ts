import axios from 'axios'
import router from '@/router'
import { useSessionStore } from '@/stores/session'
import { useFlashMessageStore } from '@/stores/flash_message'

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  withCredentials: true
})

axiosInstance.interceptors.response.use(
  res => {
    return res
  },
  async error => {
    if (error.response?.status === 401) {
      const session = useSessionStore()
      session.clear()

      // prepare flash message
      const flash = useFlashMessageStore()
      flash.setMessage('Your session has expired.', 'warning')

      // prepare redirect
      const currentRoute = router.currentRoute.value
      const to = currentRoute.fullPath
      await router.push({ name: 'login', query: { to } })
    }

    return Promise.reject(error)
  }
)
