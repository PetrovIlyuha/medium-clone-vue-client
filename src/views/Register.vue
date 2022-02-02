<template>
  <div class="h-full flex relative" style="height: 93.2vh">
    <div v-if="authErrors()" class="absolute top-10 right-10"></div>
    <div class="hidden lg:block w-1/2 relative flex-1 opacity-75">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="@/assets/register_login.jpg"
        alt=""
      />
    </div>
    <div
      class="flex-1 w-1/2 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img
            class="h-12 w-auto"
            src="@/assets/project_logo.jpg"
            alt="Social Mixer"
          />
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>

        <div class="mt-8">
          <div>
            <div class="mt-6 relative">
              <div
                class="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div class="w-full border-t border-gray-300" />
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500 font-bold">
                  to start using Social Mixer
                </span>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <form class="space-y-6">
              <div>
                <label
                  for="username"
                  class="block text-sm font-medium text-gray-700"
                >
                  Choose Username
                </label>
                <div class="mt-1 relative">
                  <input
                    id="username"
                    name="username"
                    v-model="username"
                    type="text"
                    autocomplete="username"
                    required=""
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <div
                    v-if="v$.username.$error"
                    class="absolute -bottom-5 text-sm text-red-500 font-bold animate-pulse"
                  >
                    Username should at least be 2 characters long
                  </div>
                </div>
              </div>
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div class="mt-1 relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    v-model="email"
                    autocomplete="email"
                    required=""
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <div
                    v-if="v$.email.$error"
                    class="absolute -bottom-5 text-sm text-red-500 font-bold animate-pulse"
                  >
                    Not a valid email address
                  </div>
                </div>
              </div>

              <div class="space-y-1">
                <label
                  for="password"
                  class="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div class="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    v-model="password"
                    autocomplete="current-password"
                    required=""
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <div
                    v-if="v$.password.$error"
                    class="absolute -bottom-5 text-sm text-red-500 font-bold animate-pulse"
                  >
                    Password should at least be 6 characters long
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-between w-full">
                <h2 class="font-bold">Have an Account?</h2>
                <router-link
                  to="/login"
                  class="text-blue-500 hover:text-blue-600 font-semibold"
                >
                  Login
                </router-link>
              </div>

              <div>
                <button
                  @click="registerFormSubmit"
                  :disabled="formNotValid"
                  :class="{
                    'w-full relative flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500': true,
                    'bg-gray-400': formNotValid,
                    'bg-indigo-600 hover:bg-indigo-700': !formNotValid,
                  }"
                >
                  <span
                    style="border-top-color: transparent"
                    v-if="isSubmitting()"
                    class="w-5 h-5 border-2 absolute top-50 left-32 border-blue-400 border-solid rounded-full animate-spin"
                  ></span>
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import {email, minLength} from '@vuelidate/validators'
import {mapActions, mapGetters} from 'vuex'

import {useToast} from 'vue-toastification'

export default {
  name: 'RegisterPage',
  data: () => ({
    v$: useVuelidate(),
    username: '',
    email: '',
    password: '',
    toast: useToast(),
  }),
  computed: {
    formNotValid() {
      this.v$.$validate()
      return this.v$.$errors.length > 0
    },
  },
  methods: {
    ...mapActions({
      register: 'auth/register',
      clearState: 'auth/clearState',
    }),
    ...mapGetters({
      isSubmitting: 'auth/isSubmitting',
      authErrors: 'auth/authErrors',
      currentUser: 'auth/currentUser',
      isSuccess: 'auth/isSuccess',
    }),
    registerFormSubmit(e) {
      e.preventDefault()
      this.v$.$validate()
      if (this.v$.$errors.length) {
        this.toast.error('Form is invalid', {
          timeout: 2000,
        })
      } else {
        this.register({
          username: this.username,
          email: this.email,
          password: this.password,
        })
        this.clearForm()
      }
    },
    clearForm() {
      this.username = ''
      this.email = ''
      this.password = ''
    },
  },
  validations() {
    return {
      username: {minLength: minLength(2)},
      email: {email},
      password: {minLength: minLength(6)},
    }
  },
  updated() {
    if (this.authErrors()) {
      for (let error of Object.values(this.authErrors())) {
        this.toast.error(error, {
          timeout: 2000,
        })
      }
      this.clearState()
    }
    if (this.isSuccess()) {
      this.toast.success(this.isSuccess(), {timeout: 2000})
      setTimeout(() => {
        this.$router.push({name: 'login'})
      }, 2000)
    }
  },
}
</script>

<style></style>
