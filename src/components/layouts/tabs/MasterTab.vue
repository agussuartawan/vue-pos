<script setup lang="ts">
import IconDotHorizontal from '@/components/icons/IconDotHorizontal.vue'
import IconOffice from '@/components/icons/IconOffice.vue'
import IconArchiveBox from '@/components/icons/IconArchiveBox.vue'
import IconStorefront from '@/components/icons/IconStorefront.vue'
import IconBreaker from '@/components/icons/IconBreaker.vue'
</script>

<template>
  <div class="flex items-center">
    <RouterLink to="/master/companies" role="tab" class="tab gap-1">
      <IconOffice />
      Company
    </RouterLink>
    <RouterLink to="/master/companies" role="tab" class="tab gap-1 tab-active">
      <IconArchiveBox />
      Warehouse
    </RouterLink>
    <RouterLink to="/master/companies" role="tab" class="tab gap-1">
      <IconStorefront />
      Outlet
    </RouterLink>
    <RouterLink to="/master/companies" role="tab" class="tab gap-1">
      <IconBreaker />
      Unit
    </RouterLink>
    <div class="dropdown dropdown-hover dropdown-bottom dropdown-end">
      <div tabindex="0" role="button" class="m-1">
        <IconDotHorizontal />
      </div>
      <ul
        tabindex="0"
        class="dropdown-content menu bg-base-300 rounded-box z-[1] w-52 p-2 shadow"
      >
        <li><a>Item 1</a></li>
        <li><a>Item 2</a></li>
      </ul>
    </div>
  </div>
</template>
