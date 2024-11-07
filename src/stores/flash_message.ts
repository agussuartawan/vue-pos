import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFlashMessageStore = defineStore('flash_message', () => {
  const message = ref<string | null>(null)
  const type = ref<'success' | 'error' | 'warning'>('success')
  let messageId: number | null = null

  const setMessage = (
    msg: string,
    msgType?: 'success' | 'error' | 'warning',
    timeout?: number
  ) => {
    message.value = msg

    if (msgType) {
      type.value = msgType
    }

    if (messageId) {
      clearTimeout(messageId)
    }

    messageId = window.setTimeout(() => {
      clearMessage()
    }, timeout || 5000)
  }

  const clearMessage = () => {
    message.value = null
    if (messageId) {
      clearTimeout(messageId)
      messageId = null
    }
  }

  return { message, setMessage, clearMessage, type }
})
