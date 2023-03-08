<template>
  <header class="sticky top-0 bg-slate-600 py-4 shadow-lg">
    <nav class="container flex flex-1 items-center justify-between">
      <RouterLink :to="{ name: 'home' }" class="text-xl font-bold text-white"
        >Home</RouterLink
      >
      <div
        class="hidden items-center justify-evenly gap-4 text-lg text-white sm:flex"
      >
        <RouterLink :to="{ name: 'protected' }">Protected</RouterLink>
        <RouterLink :to="{ name: 'unprotected' }">Unprotected</RouterLink>
        <RouterLink
          v-if="store.authenticated === true"
          :to="{ name: 'dashboard' }"
          >Dashboard</RouterLink
        >
      </div>
      <div class="sm:hidden">
        <Menu>
          <div class="relative">
            <MenuButton class="text-xl font-semibold text-white"
              >More</MenuButton
            >
            <Transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems
                class="absolute top-[calc(100%+16px)] -right-7 flex flex-col space-y-3 rounded-md bg-gray-100 p-3 shadow-lg"
              >
                <MenuItem v-slot="{ active }">
                  <RouterLink :to="{ name: 'protected' }">Protected</RouterLink>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <RouterLink :to="{ name: 'unprotected' }"
                    >Unprotected</RouterLink
                  >
                </MenuItem>
                <MenuItem
                  v-if="store.authenticated === true"
                  v-slot="{ active }"
                >
                  <RouterLink :to="{ name: 'dashboard' }">Dashboard</RouterLink>
                </MenuItem>
              </MenuItems>
            </Transition>
          </div>
        </Menu>
      </div>
      <button
        v-if="store.authenticated === true"
        class="rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
        @click="store.logOut"
      >
        Logout
      </button>
    </nav>
  </header>
</template>

<script setup>
import { useAuthStore } from "../store";
import { RouterLink } from "vue-router";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
const store = useAuthStore();
</script>
