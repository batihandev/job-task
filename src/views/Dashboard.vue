<script setup>
import { useAuthStore } from "../store";
import { PencilAltIcon } from "@heroicons/vue/outline";
import { CheckCircleIcon } from "@heroicons/vue/outline";
import { useValidateStore } from "../store";
import { ref } from "vue";
const store = useAuthStore();
const validateStore = useValidateStore();
const editing = ref(false);
const keyRemmember = ref("");
const userref = ref(JSON.parse(localStorage.getItem("user")));
const syncUserDetails = (key) => {
  if (key === "password") {
    validateStore.confirmPassword = store.user.confirmpassword;
  }
  validateStore[key] = store.user[key];
};
const initialStoreMatch = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  for (const key in user) {
    store.user[key] = user[key];
    validateStore[key] = user[key];
    if (key === "password") {
      validateStore.confirmPassword = store.user[key];
    }
  }
  return true;
};
initialStoreMatch();
const inputEnable = (key) => {
  cancelChanges();
  if (editing.value) return;
  keyRemmember.value = key;

  editing.value = true;
  if (key === "password") {
    store.user.confirmpassword = store.user.password;
  }
  syncUserDetails(key);
};
const confrimChange = () => {
  const key = keyRemmember.value;
  syncUserDetails(key);
  if (validateStore.errors[key]) return;
  if (key === "password") {
    if (store.user.password !== store.user.confirmpassword) {
      alert("Passwords do not match");
      return;
    }
    store.user.confirmpassword = store.user.password;
    setTimeout(() => {
      delete store.user.confirmpassword;
    }, 0);
  }
  editing.value = false;

  keyRemmember.value = "";

  store.editUser(store.user);
  userref.value = JSON.parse(localStorage.getItem("user"));
};
const onChange = () => {
  const key = keyRemmember.value;
  syncUserDetails(key);
};
const cancelChanges = () => {
  editing.value = false;
  keyRemmember.value = "";
  initialStoreMatch();
  delete store.user.confirmpassword;
};
</script>
<script>
export default {
  methods: {
    focusInput(key) {
      this.$refs[key][0].focus();
      this.$refs[key][0].select();
    },
  },
};
</script>

<template>
  <main class="flex flex-col items-center justify-center">
    <h1 class="form-title py-5">
      Welcome {{ userref.username }}, {{ userref.name }} {{ userref.surname }}
    </h1>
    <form @submit.prevent class="flex flex-col items-center justify-center">
      <div
        class="grid border-spacing-1 grid-cols-1 rounded border-2 border-blue-500 border-opacity-25 bg-sky-200 px-5 py-2 sm:grid-cols-2"
      >
        <div v-for="(values, key) in store.user">
          <div class="flex flex-col p-2">
            <label :for="key" class="relative px-2 font-medium text-gray-700"
              >{{
                key.toString().charAt(0).toUpperCase() + key.toString().slice(1)
              }}
              <div
                v-if="key !== 'id' && key !== 'confirmpassword'"
                :id="key + 'pencil'"
                :class="key === keyRemmember ? 'hidden' : 'block'"
              >
                <PencilAltIcon
                  @click="focusInput(key), inputEnable(key)"
                  class="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer text-red-400 transition-colors duration-200 hover:text-red-800"
                />
              </div>
              <div
                v-if="key !== 'id' && key !== 'confirmpassword'"
                :id="key + 'check'"
                :class="key === keyRemmember ? 'block' : 'hidden'"
              >
                <CheckCircleIcon
                  @click="confrimChange()"
                  class="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer text-green-600 transition-colors duration-200 hover:text-green-800"
                />
              </div>
            </label>
            <div class="relative">
              <input
                :ref="key"
                @input="onChange(key)"
                v-if="
                  key !== 'id' &&
                  key !== 'password' &&
                  key !== 'token' &&
                  key !== 'confirmpassword'
                "
                class="border-b border-sky-300 p-2 text-lg outline-none ring-2 ring-transparent"
                :class="
                  key === keyRemmember
                    ? 'rounded  border-blue-500 border-opacity-25 bg-blue-300 bg-opacity-50 ring-2  ring-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                    : 'pointer-events-none cursor-none  bg-transparent'
                "
                type="text"
                v-model="store.user[key]"
              />
              <input
                :ref="key"
                @input="onChange(key)"
                v-else
                class="border border-b border-transparent border-b-sky-300 p-2 text-lg outline-none ring-2 ring-transparent"
                :class="
                  key === keyRemmember || key === 'confirmpassword'
                    ? 'rounded border-blue-500 border-opacity-25 bg-blue-300 bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                    : 'pointer-events-none cursor-none  bg-transparent'
                "
                type="password"
                v-model="store.user[key]"
              />
              <div class="h-5 w-[200px]">
                <span
                  class="block whitespace-nowrap p-1 text-xs text-red-500"
                  v-if="key === keyRemmember"
                  >{{ validateStore.errors[key] }}</span
                >
                <span
                  class="block whitespace-nowrap p-1 text-xs text-red-500"
                  v-if="key === 'confirmpassword'"
                  >{{ validateStore.errors["confirmPassword"] }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-1 items-center justify-center gap-5">
        <button
          :class="editing ? 'block' : 'pointer-events-none opacity-50'"
          class="mt-10 rounded bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700"
          @click="confrimChange()"
          type="submit"
        >
          Save Changes
        </button>
        <button
          :class="editing ? 'block' : 'pointer-events-none opacity-50'"
          class="mt-10 rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
          @click="cancelChanges()"
          type="submit"
        >
          Cancel
        </button>
      </div>
    </form>
  </main>
</template>
