<script setup lang="ts">
import IconOffice from '@/components/icons/IconOffice.vue'
import IconArchiveBox from '@/components/icons/IconArchiveBox.vue'
import IconStorefront from '@/components/icons/IconStorefront.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isActive = (path: string) => route.path.includes(path)
</script>

<template>
  <div class="flex items-center">
    <RouterLink
      to="/user-management/permissions"
      role="tab"
      class="tab gap-1"
      :class="{ 'tab-active': isActive('/permissions') }"
    >
      <IconOffice />
      Permission
    </RouterLink>
    <RouterLink
      to="/user-management/roles"
      role="tab"
      class="tab gap-1"
      :class="{ 'tab-active': isActive('/roles') }"
    >
      <IconArchiveBox />
      Role
    </RouterLink>
    <RouterLink
      to="/user-management/users"
      role="tab"
      class="tab gap-1"
      :class="{ 'tab-active': isActive('/users') }"
    >
      <IconStorefront />
      User
    </RouterLink>
  </div>
</template>
