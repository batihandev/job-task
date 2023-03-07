<script setup>
import { useAuthStore } from "../store";
const store = useAuthStore();
</script>

<template>
  <main>
    <div class="flex flex-col items-center justify-center space-y-4 py-5">
      <h1 class="form-title">Welcome {{ store.user.name }}</h1>
      <button
        class="rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
        @click="store.logOut"
      >
        Logout
      </button>
    </div>
  </main>
</template>
