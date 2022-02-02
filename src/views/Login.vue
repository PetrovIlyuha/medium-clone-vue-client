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
            alt="Workflow"
          />
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">Login</h2>
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
                <span class="px-2 bg-white text-gray-500 font-semibold">
                  With Email & Password
                </span>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <form class="space-y-6">
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
                    autocomplete="email"
                    v-model="email"
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
                    autocomplete="current-password"
                    v-model="password"
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
                <h2 class="font-bold">Need an Account?</h2>
                <router-link
                  to="/register"
                  class="text-blue-500 hover:text-blue-600 font-semibold"
                >
                  Register
                </router-link>
              </div>

              <div>
                <button
                  @click="loginFormSubmit"
                  :disabled="formNotValid"
                  :class="{
                    'w-full relative flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500': true,
                    'bg-gray-400': formNotValid || isSubmitting(),
                    'bg-indigo-600 hover:bg-indigo-700': !formNotValid,
                  }"
                >
                  <span
                    style="border-top-color: transparent"
                    v-if="isSubmitting()"
                    class="w-5 h-5 border-2 absolute top-50 left-32 border-blue-400 border-solid rounded-full animate-spin"
                  ></span>
                  Log In
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
  name: 'Login',
  data: () => ({
    v$: useVuelidate(),
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
      login: 'auth/login',
      clearState: 'auth/clearState',
    }),
    ...mapGetters({
      isSubmitting: 'auth/isSubmitting',
      authErrors: 'auth/authErrors',
      currentUser: 'auth/currentUser',
      isSuccess: 'auth/isSuccess',
    }),
    loginFormSubmit(e) {
      e.preventDefault()
      this.v$.$validate()
      if (this.v$.$errors.length) {
        this.toast.error('Form is invalid', {
          timeout: 2000,
        })
      } else {
        this.login({
          email: this.email,
          password: this.password,
        })
        this.clearForm()
      }
    },
    clearForm() {
      this.email = ''
      this.password = ''
    },
  },
  validations() {
    return {
      email: {email},
      password: {minLength: minLength(6)},
    }
  },
  updated() {
    if (this.authErrors()) {
      console.log(Object.values(this.authErrors()))
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
        this.$router.push({name: 'home'})
      }, 2000)
    }
  },
}
</script>

<style></style>
