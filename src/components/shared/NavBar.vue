<template>
  <Disclosure as="nav" class="bg-white shadow" v-slot="{open}">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="-ml-2 mr-2 flex items-center md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <router-link to="/" class="flex-shrink-0 flex items-center">
            <img
              class="block h-12 w-12 rounded-full"
              src="@/assets/project_logo.jpg"
              alt="Workflow"
            />
            <h3 class="font-bold">Social Mixer</h3>
          </router-link>
          <div class="hidden md:ml-6 md:flex md:space-x-8">
            <a
              href="#"
              class="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Main Feed
            </a>
            <a
              href="#"
              class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Your Feed
            </a>
          </div>
        </div>
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <button
              type="button"
              class="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusSmIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              <span>Create Post</span>
            </button>
          </div>
          <div class="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
            <Menu as="div" class="ml-3 relative">
              <div>
                <MenuButton
                  class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span class="sr-only">Open user menu</span>
                  <div v-if="currentUser()">
                    <img
                      class="h-10 w-10 rounded-full object-cover border-2 border-blue-300"
                      :src="currentUser().image"
                      alt="user's profile"
                    />
                  </div>
                  <div v-else>
                    <img
                      class="h-10 w-10 rounded-full object-cover"
                      src="@/assets/no_user_avatar.jpg"
                      alt="user's profile"
                    />
                  </div>
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="origin-top-right absolute right-0 top-14 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div v-if="currentUser()">
                    <MenuItem>
                      <router-link
                        to="/settings"
                        class="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-blue-300"
                        >Your Profile</router-link
                      >
                    </MenuItem>

                    <MenuItem>
                      <span
                        @click="logout()"
                        class="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-blue-300"
                        >Sign out</span
                      >
                    </MenuItem>
                  </div>

                  <div v-if="!currentUser()">
                    <MenuItem>
                      <router-link
                        to="/register"
                        class="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-blue-300"
                        >Sign Up</router-link
                      >
                    </MenuItem>
                    <MenuItem>
                      <router-link
                        to="/login"
                        class="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-blue-300"
                        >Log In</router-link
                      >
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="md:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <!-- Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" -->
        <DisclosureButton
          as="a"
          href="#"
          class="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
          >Main Feed</DisclosureButton
        >
        <DisclosureButton
          as="a"
          href="#"
          class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
          >Your Feed</DisclosureButton
        >
      </div>
      <div class="pt-4 pb-3 border-t border-gray-200">
        <div class="flex items-center px-4 sm:px-6">
          <div class="flex-shrink-0">
            <img
              class="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">
              User Userovich
            </div>
            <div class="text-sm font-medium text-gray-500">user@abuser.com</div>
          </div>
        </div>
        <div class="mt-3 space-y-1">
          <DisclosureButton
            as="a"
            href="#"
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
            >Your Profile</DisclosureButton
          >
          <DisclosureButton
            as="a"
            href="#"
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
            >Sign out</DisclosureButton
          >
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue'
import {MenuIcon, XIcon} from '@heroicons/vue/outline'
import {PlusSmIcon} from '@heroicons/vue/solid'
import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    MenuIcon,
    PlusSmIcon,
    XIcon,
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout',
    }),
    ...mapGetters({
      currentUser: 'auth/currentUser',
    }),
  },
}
</script>
