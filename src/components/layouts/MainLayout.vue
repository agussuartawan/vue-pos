<!-- src/components/Sidebar.vue -->

<script lang="ts">
import ThemeSelector from '@/components/ThemeToggle.vue'
import { usePopupStore } from '@/stores/popup'
import PopUp from '@/components/PopUp.vue'
import IconHome from '@/components/icons/IconHome.vue'
import { useRoute, useRouter } from 'vue-router'
import { markRaw } from 'vue'
import IconDatabase from '@/components/icons/IconDatabase.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import UserInfo from '@/components/layouts/UserInfo.vue'
import ProfileData from '@/components/ProfileData.vue'
import IconLock from '@/components/icons/IconLock.vue'
import IconBell from '@/components/icons/IconBell.vue'
import { toast } from 'vue3-toastify'
import { logout } from '@/api/methods/auth'
import { apiError } from '@/api/error_handler'
import { useFlashMessageStore } from '@/stores/flash_message'
import { useSessionStore } from '@/stores/session'
import IconUserSetting from '@/components/icons/IconUserSetting.vue'

export default {
  components: {
    IconBell,
    IconLock,
    UserInfo,
    IconCheck,
    IconArrowRight,
    PopUp,
    ThemeSelector
  },
  data() {
    return {
      popupStore: usePopupStore(),
      isMinimized: true,
      sections: [
        {
          title: 'Main',
          links: [
            {
              name: 'Dashboard',
              url: '/dashboard',
              icon: markRaw(IconHome)
            }
          ]
        },
        {
          title: 'Data',
          links: [
            {
              name: 'User Management',
              url: 'user-management',
              icon: markRaw(IconUserSetting),
              child: [
                { name: 'Permission', url: '/user-management/permissions' },
                { name: 'Role', url: '/user-management/roles' },
                { name: 'User', url: '/user-management/users' }
              ]
            },
            {
              name: 'Master',
              url: 'master',
              icon: markRaw(IconDatabase),
              child: [
                { name: 'Company', url: '/master/companies' },
                { name: 'Warehouse', url: '/master/warehouses' },
                { name: 'Category', url: '/master/categories' },
                { name: 'Unit', url: '/master/units' }
              ]
            }
          ]
        }
      ] as any
    }
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const session = useSessionStore()
    const flash = useFlashMessageStore()

    const isActive = (path: string) => route.path === path
    const isContains = (path: string) => route.path.includes(path)

    return { isActive, isContains, router, session, flash }
  },
  methods: {
    toast,
    toggleSidebar() {
      this.isMinimized = !this.isMinimized
    },
    openProfile() {
      this.popupStore.openPopup(ProfileData, 'Profile')
    },
    async handleLogout() {
      try {
        await logout()
        this.session.clear()

        this.flash.setMessage('Logout success, see ya', 'success')

        await this.router.push('/login')
      } catch (err) {
        const error = apiError(err)
        toast(error.message, { type: 'error' })
      }
    }
  }
}
</script>

<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <aside
      @mouseenter="isMinimized = false"
      @mouseleave="isMinimized = true"
      class="bg-base-100"
    >
      <div
        :class="[
          'flex flex-col h-full transition-all ease-in-out duration-300',
          isMinimized ? 'w-16' : 'w-56'
        ]"
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-4">
          <!-- Logo Section -->
          <div class="flex items-center" v-if="!isMinimized">
            <img
              src="https://ui-avatars.com/api/?name=John+Doe"
              alt="Logo"
              class="w-6 h-6"
            />
            <span class="ml-3 text-xl whitespace-nowrap font-bold">My App</span>
          </div>

          <!-- Toggle Sidebar Button -->
          <button
            @click="toggleSidebar"
            class="p-2"
            :class="{ 'rotate-180': isMinimized }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>

        <!-- User Info -->
        <UserInfo
          role="button"
          :isMinimized="isMinimized"
          @click="openProfile"
        />

        <div class="py-2" v-for="section in sections" :key="section.title">
          <!-- Divider Title -->
          <div class="ms-4 mb-[7px]">
            <h2 v-if="!isMinimized" class="text-xs whitespace-nowrap">
              {{ section.title }}
            </h2>
            <h2 v-else class="text-xs text-transparent">1</h2>
          </div>

          <!-- Menu Items -->
          <ul class="space-y-4 text-sm font-semibold w-full">
            <li v-for="link in section.links" :key="link.name">
              <RouterLink
                v-if="!link.child"
                :to="link.url"
                class="w-full flex items-center px-4 py-2 hover:bg-base-200"
                :class="{ 'bg-base-200': isActive(link.url) }"
              >
                <span class="h-6 w-6">
                  <component size="w-6 h-6" :is="link.icon" />
                </span>
                <span v-if="!isMinimized" class="whitespace-nowrap ml-3">
                  {{ link.name }}
                </span>
              </RouterLink>

              <div
                role="button"
                v-else
                class="dropdown dropdown-hover dropdown-right w-full"
              >
                <div
                  tabindex="0"
                  class="w-full flex justify-between items-center px-4 py-2 hover:bg-base-200"
                  :class="{ 'bg-base-200': isContains(link.url) }"
                >
                  <div class="flex items-center">
                    <span class="h-6 w-6">
                      <component size="w-6 h-6" :is="link.icon" />
                    </span>
                    <span v-if="!isMinimized" class="whitespace-nowrap ml-3">
                      {{ link.name }}
                    </span>
                  </div>

                  <span><IconArrowRight /></span>
                </div>
                <ul
                  tabindex="0"
                  class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li v-for="(c, i) in link.child" :key="i">
                    <RouterLink :to="c.url">
                      <div class="flex items-center justify-between">
                        {{ c.name }}
                        <IconCheck v-if="isActive(c.url)" />
                      </div>
                    </RouterLink>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </aside>

    <!-- Konten Utama -->
    <div class="flex-1 flex flex-col">
      <!-- Header Konten Utama -->
      <div class="flex items-center bg-base-100 justify-between p-4">
        <!-- Breadcrumb -->
        <div class="breadcrumbs font-semibold text-sm">
          <ul>
            <li><a>Home</a></li>
            <li><a>Documents</a></li>
            <li>Add Document</li>
          </ul>
        </div>

        <div class="flex justify-between items-center gap-x-2">
          <div class="tooltip tooltip-bottom" data-tip="Toggle Theme">
            <ThemeSelector />
          </div>

          <!-- Tombol Notifikasi -->
          <div
            class="tooltip tooltip-bottom relative p-2"
            data-tip="Notification"
          >
            <button>
              <IconBell />
              <!-- Badge Notifikasi -->
              <span
                class="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full"
              ></span>
            </button>
          </div>

          <div class="tooltip tooltip-left" data-tip="Logout">
            <button @click="handleLogout">
              <IconLock />
            </button>
          </div>
        </div>
      </div>

      <!-- Isi Konten -->
      <div class="items-start min-h-screen">
        <div class="rounded-2xl min-h-screen w-full h-auto p-4 bg-base-200">
          <slot />
        </div>

        <!--Footer-->
        <footer class="footer footer-center bg-base-100 text-base-content p-4">
          <aside>
            <p>Copyright &copy; 2024 Kowo</p>
          </aside>
        </footer>
      </div>

      <PopUp />
    </div>
  </div>
</template>

<style scoped>
.divider-title {
  display: flex;
  align-items: center;
  color: #9ca3af; /* Light gray for text */
}

.divider-title::before,
.divider-title::after {
  content: '';
  flex-grow: 1;
  height: 1px;
  background-color: #4b5563;
  margin: 0 8px; /* Space between line and text */
}

.divider-line {
  height: 1px;
  background-color: #4b5563;
  margin: 12px 0;
  align-items: center;
}
</style>
