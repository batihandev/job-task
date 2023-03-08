<script setup>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { useAuthStore } from "./store";
const store = useAuthStore();
if (!store.authenticated) {
  store.checkUser();
}
</script>

<template>
  <Header />
  <RouterView v-slot="{ Component }">
    <Transition name="page" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
  <Footer />
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: 300ms ease all;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
