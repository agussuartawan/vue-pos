import { defineStore } from 'pinia'
import { type Component, markRaw } from 'vue'

export const usePopupStore = defineStore('popup', {
  state: () => ({
    isOpen: false,
    component: null as Component | null,
    title: null as string | null,
    props: {} as any
  }),
  actions: {
    openPopup(component: Component, title: string, props?: any) {
      this.isOpen = true
      this.component = markRaw(component)
      this.props = props
      this.title = title
    },
    closePopup() {
      this.isOpen = false
      this.component = null
    }
  }
})
