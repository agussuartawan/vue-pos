<script lang="ts">
import { computed } from 'vue'
import { usePopupStore } from '@/stores/popup'

export default {
  setup() {
    const popupStore = usePopupStore()

    // Responsif untuk ukuran popup berdasarkan lebar layar
    const popupStyle = computed(() => ({
      width: window.innerWidth < 640 ? '100%' : '400px', // Lebar penuh di mobile, 400px di desktop
      maxWidth: '100%'
    }))

    return { popupStore, popupStyle }
  }
}
</script>

<template>
  <div>
    <!-- Pop-up overlay -->
    <div
      @click.self="popupStore.closePopup()"
      :class="[
        'fixed inset-0 bg-black bg-opacity-50 z-40',
        popupStore.isOpen ? 'translate-x-0' : 'translate-x-full'
      ]"
    >
      <!-- Pop-up container yang muncul dari kanan -->
      <div
        :class="[
          'fixed right-0 top-0 transition-all duration-300 h-full bg-base-100 shadow-lg z-50',
          popupStore.isOpen ? 'translate-x-0' : 'translate-x-full'
        ]"
        :style="popupStyle"
      >
        <!-- Header pop-up -->
        <div
          class="flex items-center justify-between p-4 border-b border-base-200"
        >
          <h2 class="text-lg font-semibold">{{ popupStore.title }}</h2>
          <button
            @click="popupStore.closePopup()"
            class="text-gray-500 hover:text-gray-700"
          >
            <span class="text-xl">&times;</span>
          </button>
        </div>

        <!-- Isi pop-up -->
        <div class="p-4 overflow-y-auto" style="max-height: calc(100vh - 4rem)">
          <component :is="popupStore.component" v-bind="popupStore.props" />
        </div>
      </div>
    </div>
  </div>
</template>
