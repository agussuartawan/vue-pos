import { defineStore } from 'pinia'
import type { LoginResponse } from '@/api/data/response/auth_response'
import { ref } from 'vue'

export const useSessionStore = defineStore(
  '__vue_sess',
  () => {
    const user = ref<LoginResponse | null>(null)
    const isAuthenticated = ref<boolean>(false)

    const set = (res: LoginResponse) => {
      user.value = res
      isAuthenticated.value = true
    }

    const clear = () => {
      user.value = null
      isAuthenticated.value = false
    }

    return { user, isAuthenticated, set, clear }
  },
  {
    persist: true
  }
)
