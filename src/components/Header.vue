<template>
  <header class="sticky top-0 z-10 bg-slate-600 py-4 shadow-lg">
    <nav class="container flex flex-1 items-center justify-between">
      <RouterLink
        :to="{ name: 'home' }"
        class="text-xl font-bold text-white hover:opacity-80"
        >Home</RouterLink
      >
      <div
        class="hidden items-center justify-evenly gap-4 text-lg text-white sm:flex"
      >
        <RouterLink
          :to="{ name: 'protected' }"
          class="transition-opacity duration-300 hover:opacity-80"
          >Protected</RouterLink
        >
        <RouterLink
          :to="{ name: 'unprotected' }"
          class="transition-opacity duration-300 hover:opacity-80"
          >Unprotected</RouterLink
        >
      </div>
      <div v-if="store.authenticated" class="z-10">
        <Menu>
          <div class="relative">
            <MenuButton
              class="flex items-center justify-center text-xl font-semibold text-white transition-opacity duration-300 hover:opacity-80"
            >
              <div>
                {{ store.user.username
                }}<ChevronDownIcon
                  class="absolute right-0 bottom-0 h-6 w-6 translate-x-full"
                />
              </div>
            </MenuButton>
            <Transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems
                class="menu-hovers absolute top-[calc(100%+16px)] -right-[20px] z-10 flex min-w-[150px] flex-col rounded-b-md bg-gray-100 py-3 px-5 text-right shadow-lg"
              >
                <MenuItem class="border-b border-gray-300 pb-2">
                  <div class="font-semibold">
                    Hi , {{ store.user.name }} {{ store.user.surname }}
                  </div>
                </MenuItem>
                <MenuItem class="w-full" v-slot="{ active }">
                  <RouterLink :to="{ name: 'dashboard' }">Dashboard</RouterLink>
                </MenuItem>
                <MenuItem class="block w-full sm:hidden" v-slot="{ active }">
                  <RouterLink :to="{ name: 'protected' }">Protected</RouterLink>
                </MenuItem>
                <MenuItem
                  class="block w-full border-b border-gray-300 pb-2 sm:hidden"
                  v-slot="{ active }"
                >
                  <RouterLink :to="{ name: 'unprotected' }"
                    >Unprotected</RouterLink
                  >
                </MenuItem>

                <MenuItem class="">
                  <button
                    class="tranisiton-colors mt-3 rounded bg-red-300 py-1 px-2 font-bold text-white duration-300 hover:bg-red-500"
                    @click="store.logOut"
                  >
                    Logout
                  </button>
                </MenuItem>
              </MenuItems>
            </Transition>
          </div>
        </Menu>
      </div>
      <div v-else>
        <Transition name="link" mode="out-in">
          <router-link
            v-if="route.params.value === 'login'"
            class="block w-[76px] text-xl font-semibold text-white"
            to="/register"
            >Sign Up</router-link
          >
          <router-link
            v-else
            class="block w-[76px] text-xl font-semibold text-white"
            to="/login"
            >Login</router-link
          >
        </Transition>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useAuthStore } from "../store";
import { RouterLink } from "vue-router";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/solid";
import { useRoute } from "vue-router";
const route = useRoute();

const store = useAuthStore();
</script>
<style>
.link-enter-active,
.link-leave-active {
  transition: 200ms ease all;
}
.link-enter-from,
.link-leave-to {
  opacity: 0.1;
}
</style>
