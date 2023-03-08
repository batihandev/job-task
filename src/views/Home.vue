<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../store";
const store = useAuthStore();
const router = useRouter();

const Auth = (value) => {
  console.log(value);
  let param = "login";
  if (value === "SignUp") {
    param = "register";
  }
  router.push({ name: "auth", params: { value: param } });
};
</script>

<template>
  <main>
    <div
      v-if="store.authenticated === false"
      class="mx-auto flex max-w-2xl flex-col items-center justify-center py-5 px-5"
    >
      <div class="cursor-pointer text-xl font-medium" @click="Auth('SignUp')">
        Join us now! It's free.
      </div>
      <div class="cursor-pointer text-xl font-medium" @click="Auth('SignIn')">
        &nbsp; Or Sign In.
      </div>
    </div>
    <div
      v-else
      class="flex flex-col items-center justify-center space-y-4 py-5"
    >
      <h1 class="form-title">Welcome {{ store.user.name }}</h1>
      <p
        class="max-w-sm px-5 text-center text-sm text-gray-500 md:px-0 md:text-base"
      >
        This is home page when you are logged in.
      </p>
    </div>
  </main>
</template>
