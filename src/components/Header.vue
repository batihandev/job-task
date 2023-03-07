<template>
  <header class="sticky top-0 bg-slate-600 shadow-lg py-4">
    <nav class="container flex items-center justify-between">
      <RouterLink :to="{ name: 'home' }" class="text-white font-bold text-xl"
        >Task</RouterLink
      >
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
