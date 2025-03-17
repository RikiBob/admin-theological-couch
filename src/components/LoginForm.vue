<script setup>
import {ref} from 'vue'
import { useRouter } from "vue-router";
import { api } from "@/helpers/api.service.js";
import { errors } from "@/helpers/errors.js"

const router = useRouter();
const login = ref('');
const password = ref('');

const fetchData = async () => {
    if (!login.value.trim() || !password.value.trim()) {
      errors.value.push('Логін і пароль є обов’язковими');
      return;
    }

    const data = {
      login: login.value.trim(),
      password: password.value.trim()
    };

    await api.post('/auth/login', data);
    await router.push('/');
};
</script>

<template>
  <div class="login-container" @keyup.enter="fetchData">
    <input type="text" v-model="login" placeholder="Login" class="input-field" />
    <input type="password" v-model="password" placeholder="Password" class="input-field" />
    <button class="submit-button" @click="fetchData">Sign In</button>
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

@media (max-width: 768px) {
  .input-field {
    width: 80%;
    font-size: 14px;
  }

  .submit-button {
    width: 80%;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .input-field {
    width: 90%;
    font-size: 14px;
  }

  .submit-button {
    width: 90%;
    font-size: 14px;
  }
}
</style>
