<script setup lang="ts">
import type { ProfileResponse } from '@/api/data/response/auth_response'
import { onMounted, ref } from 'vue'
import { getProfile } from '@/api/methods/auth'
import { apiError } from '@/api/error_handler'
import type { ErrorResponse } from '@/api/data/response/response'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import ErrorView from '@/views/ErrorView.vue'

const tabActive = ref<'role' | 'permission'>('role')
const error = ref<ErrorResponse | null>(null)
const loading = ref<boolean>(false)
const profile = ref<ProfileResponse | null>(null)

const fetchData = async () => {
  loading.value = true
  try {
    const { data } = await getProfile()
    profile.value = data.data
  } catch (err) {
    error.value = apiError(err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)
</script>

<template>
  <ErrorView v-if="error" :error="error?.message" @action="fetchData" />

  <div
    v-if="!loading && !error && profile"
    class="card card-compact bg-base-100 w-full"
  >
    <figure>
      <img
        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
        alt="Shoes"
      />
    </figure>
    <div class="card-body">
      <div class="flex gap-x-3">
        <div class="flex flex-col gap-y-3">
          <span>Name</span>
          <span>Email</span>
          <span>Phone</span>
          <span>Joined At</span>
          <span>Last Profile Update At</span>
        </div>
        <div class="flex flex-col gap-y-3">
          <span>: {{ profile.name }}</span>
          <span>: {{ profile.email || '-' }}</span>
          <span>: {{ profile.phone || '-' }}</span>
          <span>: {{ formatDistanceToNow(profile.createdAt) }}</span>
          <span>: {{ formatDistanceToNow(profile.updatedAt) }}</span>
        </div>
      </div>

      <div role="tablist" class="tabs tabs-bordered mt-3 mb-2">
        <button
          role="tab"
          class="tab"
          :class="{ 'tab-active': tabActive === 'role' }"
          @click="tabActive = 'role'"
        >
          Roles
        </button>
        <button
          role="tab"
          class="tab"
          :class="{ 'tab-active': tabActive === 'permission' }"
          @click="tabActive = 'permission'"
        >
          Permissions
        </button>
      </div>

      <div v-if="tabActive === 'role'">
        <div class="flex flex-wrap gap-2">
          <div
            v-for="r in profile.roles"
            :key="r.id"
            class="badge badge-accent"
          >
            {{ r.name }}
          </div>
        </div>
        <span class="text-center" v-if="!profile.roles">
          No data available</span
        >
      </div>

      <div v-if="tabActive === 'permission'">
        <div class="flex flex-wrap gap-2">
          <div
            v-for="p in profile.permissions"
            :key="p.id"
            class="badge badge-secondary"
          >
            {{ p.name }}
          </div>
        </div>
        <span class="text-center" v-if="!profile.permissions">
          No data available</span
        >
      </div>

      <div class="card-actions mt-5">
        <button class="btn btn-sm btn-primary">Edit Profile</button>
      </div>
    </div>
  </div>

  <div v-if="loading" class="flex flex-col gap-4">
    <div class="skeleton h-32 w-full"></div>
    <div class="skeleton h-4 w-28"></div>
    <div class="skeleton h-4 w-full"></div>
    <div class="skeleton h-4 w-full"></div>
  </div>
</template>

<style scoped></style>
