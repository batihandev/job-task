<script setup>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { useAuthStore } from "./store";
const store = useAuthStore();
if (!store.authenticated) {
  store.checkUser();
  console.log("checking user", store.authenticated);
}
</script>

<template>
  <Header />
  <RouterView v-slot="{ Component }">
    <component :is="Component" />
  </RouterView>
  <Footer />
</template>

<style scoped></style>
