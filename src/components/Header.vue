<template>
  <header class="sticky top-0 bg-slate-600 py-4 shadow-lg">
    <nav class="container flex flex-1 items-center justify-between">
      <RouterLink :to="{ name: 'home' }" class="text-xl font-bold text-white"
        >Home</RouterLink
      >
      <div class="flex items-center justify-evenly gap-4 text-lg text-white">
        <RouterLink :to="{ name: 'protected' }">Protected</RouterLink>
        <RouterLink :to="{ name: 'unprotected' }">Unprotected</RouterLink>
        <RouterLink
          v-if="store.authenticated === true"
          :to="{ name: 'dashboard' }"
          >Dashboard</RouterLink
        >
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
const store = useAuthStore();
</script>
