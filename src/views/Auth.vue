<template>
  <div class="mx-auto flex max-w-2xl items-center justify-center py-5 px-5">
    <div v-if="route.params.value === 'login'">
      <h1 class="form-title">Sign In</h1>
      <form
        @submit.prevent="authStore.signIn(store.username, store.password)"
        novalidate
        class="form"
      >
        <div class="field">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="store.username" />
          <span>
            {{ store.errors.username }}
          </span>
        </div>
        <div class="field">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="store.password" />
          <span>
            {{ store.errors.password }}
          </span>
        </div>
        <div class="field">
          <button type="submit">Sign In</button>
        </div>
        <div>
          <router-link to="/register">Don't have an account?</router-link>
        </div>
      </form>
    </div>
    <div v-else-if="route.params.value === 'register'">
      <h1 class="form-title">Sign Up</h1>
      <form @submit="store.signup" class="form" novalidate>
        <div class="field">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="store.username" />
          <span>
            {{ store.errors.username }}
          </span>
        </div>
        <div class="field">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="store.name" />
          <span>
            {{ store.errors.name }}
          </span>
        </div>
        <div class="field">
          <label for="surname">Surname</label>
          <input type="text" id="surname" v-model="store.surname" />
          <span>
            {{ store.errors.surname }}
          </span>
        </div>
        <div class="field">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="store.password" />
          <span>
            {{ store.errors.password }}
          </span>
        </div>
        <div class="field">
          <label for="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            v-model="store.confirmPassword"
          />
          <span class="error" v-if="store.errors.confirmPassword">
            {{ store.errors.confirmPassword }}
          </span>
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
        <div>
          <router-link to="/login">Already have an account?</router-link>
        </div>
      </form>
    </div>
    <div v-else>
      <NotFound />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useValidateStore } from "../store";
import { useAuthStore } from "../store";
import NotFound from "./NotFound.vue";
const authStore = useAuthStore();
const store = useValidateStore();
const route = useRoute();
</script>
