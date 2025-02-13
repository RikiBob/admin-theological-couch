<script setup>
import {ref} from 'vue'
import { useRouter } from "vue-router";
import ErrorHandler from "@/components/ErrorHandler.vue";
import axios from "axios";

const login = ref('');
const password = ref('');
const errors = ref([]);
const router = useRouter();

const fetchData = async () => {
  try {
    errors.value = [];

    if (!login.value || !password.value) {
      errors.value.push('Логін і пароль є обов’язковими');
      return;
    }

    const data = {
      login: login.value,
      password: password.value
    };

    await axios.post('http://localhost:3000/auth/login', data, { withCredentials: true });
    await router.push('/');
  } catch (error) {
    errors.value.push(error?.response?.data?.errors);
  }
};
</script>

<template>
  <div class="login-container" @keyup.enter="fetchData">
    <input type="text" v-model="login" placeholder="Login" class="input-field" />
    <input type="password" v-model="password" placeholder="Password" class="input-field" />
    <button class="submit-button" @click="fetchData">Sign In</button>
    <ErrorHandler :errors="errors"/>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 15px;
  background-color: #5b654a;
}

.input-field {
  width: 250px;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid #9e8f75;
  outline: none;
  background-color: transparent;
  color: #d8d1bd;
  transition: border-color 0.3s, color 0.3s;
}

.input-field::placeholder {
  color: #b3a58c;
  opacity: 0.8;
}

.input-field:focus, .input-field:hover {
  border-bottom: 2px solid #d8d1bd;
}

.input-field:hover {
  cursor: default;
}

.submit-button {
  width: 260px;
  padding: 12px;
  font-size: 18px;
  background-color: #b3a58c;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
}

.submit-button:hover {
  background-color: #9e8f75;
  transform: scale(1.05) translateY(-2px);
}
</style>