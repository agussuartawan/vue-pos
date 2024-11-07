<script setup lang="ts">
import IconEmail from '@/components/icons/IconEmail.vue'
import IconKey from '@/components/icons/IconKey.vue'
import { ref } from 'vue'
import { useSessionStore } from '@/stores/session'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { LoginSchema } from '@/api/data/schemas/auth_schema'
import { useRoute, useRouter } from 'vue-router'
import { axiosInstance } from '@/api/axios_instance'
import { apiError } from '@/api/error_handler'
import AlertError from '@/components/alerts/AlertError.vue'
import type { ErrorResponse } from '@/api/data/response/response'
import AlertWarning from '@/components/alerts/AlertWarning.vue'
import { useFlashMessageStore } from '@/stores/flash_message'
import AlertSuccess from '@/components/alerts/AlertSuccess.vue'

const router = useRouter()
const route = useRoute()
const session = useSessionStore()
const flash = useFlashMessageStore()
const isSubmitting = ref<boolean>(false)
const errorResponse = ref<ErrorResponse | null>(null)

const onSubmit = async (values: any) => {
  isSubmitting.value = true
  try {
    const { data } = await axiosInstance.post('/auth/login', values)
    session.set(data.data)

    const to = route.query.to || '/dashboard'
    await router.push(to as string)
  } catch (error) {
    errorResponse.value = apiError(error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="bg-base-200 flex items-center justify-center min-h-screen">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl font-bold mb-6">Login</h2>

        <AlertWarning v-if="flash.message && flash.type == 'warning'">
          {{ flash.message }}
        </AlertWarning>

        <AlertSuccess v-if="flash.message && flash.type == 'success'">
          {{ flash.message }}
        </AlertSuccess>

        <AlertError v-if="errorResponse">
          {{ errorResponse.message }}
        </AlertError>
        <AlertError v-for="v in errorResponse?.validation" :key="v.field">
          {{ v.field }}: {{ v.message }}
        </AlertError>

        <Form
          v-slot="{ errors }"
          :validation-schema="LoginSchema"
          @submit="onSubmit"
        >
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <label
              class="input input-bordered flex items-center gap-2"
              :class="{ 'input-error': errors.email }"
            >
              <IconEmail />
              <Field
                name="email"
                type="email"
                class="grow"
                placeholder="email@example.com"
              />
            </label>
            <ErrorMessage class="text-xs text-error" name="email" as="span" />
          </div>
          <div class="form-control mt-4">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <label
              class="input input-bordered flex items-center gap-2"
              :class="{ 'input-error': errors.password }"
            >
              <IconKey />
              <Field
                name="password"
                type="password"
                class="grow"
                placeholder="Enter password"
              />
            </label>
            <ErrorMessage
              class="text-xs text-error"
              name="password"
              as="span"
            />
            <label class="label">
              <a href="#" class="label-text-alt link link-hover"
                >Forgot password?</a
              >
            </label>
          </div>
          <div class="form-control mt-6">
            <button
              :disabled="isSubmitting"
              type="submit"
              class="btn btn-primary"
            >
              <span v-if="isSubmitting" class="loading loading-dots"></span>
              <span v-else>Login</span>
            </button>
          </div>
        </Form>
        <!--        <div class="divider">OR</div>-->
        <!--        <div class="text-center">-->
        <!--          <p>Don't have an account?</p>-->
        <!--          <a href="#" class="link link-primary">Sign up now</a>-->
        <!--        </div>-->
      </div>
    </div>
  </div>
</template>
