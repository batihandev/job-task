<template>
  <div class="mx-auto flex max-w-2xl items-center justify-center py-5 px-5">
    <Transition name="auth" mode="out-in">
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
            <div class="h-5">
              <span v-if="formRef">
                {{ store.errors.username }}
              </span>
            </div>
          </div>
          <div class="field">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="store.password" />
            <div class="h-5">
              <span v-if="formRef">
                {{ store.errors.password }}
              </span>
            </div>
          </div>
          <div class="field">
            <button type="submit" @click="submitFormValidate()">Sign In</button>
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
            <div class="h-5">
              <span v-if="formRef">
                {{ store.errors.username }}
              </span>
            </div>
          </div>
          <div class="field">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="store.name" />
            <div class="h-5">
              <span v-if="formRef">
                {{ store.errors.name }}
              </span>
            </div>
          </div>
          <div class="field">
            <label for="surname">Surname</label>
            <input type="text" id="surname" v-model="store.surname" />
            <div class="h-5">
              <span v-if="formRef">
                {{ store.errors.surname }}
              </span>
            </div>
          </div>
          <div class="field">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="store.password" />
            <div class="h-5">
              <span v-if="formRef">
                {{ store.errors.password }}
              </span>
            </div>
          </div>
          <div class="field">
            <label for="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              v-model="store.confirmPassword"
            />
            <div class="h-5">
              <span
                class="error"
                v-if="formRef && store.errors.confirmPassword"
              >
                {{ store.errors.confirmPassword }}
              </span>
            </div>
          </div>
          <div>
            <button type="submit" @click="submitFormValidate()">Sign Up</button>
          </div>
          <div>
            <router-link to="/login">Already have an account?</router-link>
          </div>
        </form>
      </div>
      <div v-else>
        <NotFound />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useValidateStore } from "../store";
import { useAuthStore } from "../store";
import NotFound from "./NotFound.vue";
import { ref } from "vue";
const formRef = ref(false);
const authStore = useAuthStore();
const store = useValidateStore();
const route = useRoute();
const submitFormValidate = () => {
  formRef.value = true;
};
</script>
<style>
.auth-enter-active,
.auth-leave-active {
  transition: 300ms ease all;
}
.auth-enter-from,
.auth-leave-to {
  opacity: 0;
}
</style>
