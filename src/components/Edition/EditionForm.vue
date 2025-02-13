<script setup>
import { ref, inject } from "vue";
import {useRouter} from "vue-router";
import ErrorHandler from "@/components/ErrorHandler.vue";

const api = inject("api");
const router = useRouter();
const name = ref("");
const urlVideo = ref("");
const errors = ref([]);

const formSubmit = async () => {
  try {
    errors.value = [];

    if (!name.value || !urlVideo.value) {
      errors.value.push('Поля обов\`язкові для заповнення');
      return;
    }

    const data = {
      name: name.value,
      url_video: urlVideo.value,
    };

    await api.post('/admin/edition', data);
    routeTo('/editions');
  } catch (error) {
    errors.value.push(error?.response?.data);
  }
}

const routeTo = (route) => {
  router.push(route);
}
</script>

<template>
  <div class="content-wrapper">
  <form @submit.prevent="submitForm" class="edition-form">
    <h3>Edition</h3>
    <input type="text" v-model="name" placeholder="Назва випуску" class="input-field" />
    <input type="url" v-model="urlVideo" placeholder="Посилання на відео" class="input-field" />
    <button type="submit" class="submit-button" @click="formSubmit">Зберегти</button>
    <button type="submit" class="submit-button" @click="routeTo('/editions')">Назад</button>
  </form>
  </div>
  <ErrorHandler :errors="errors"/>
</template>

<style scoped>
.content-wrapper{
  width: 1000px;
}

.edition-form {
  display: flex;
  flex-direction: column;
  width: 70%;
  gap: 15px;
}

.input-field {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid #d8d1bd;
  outline: none;
  background-color: transparent;
  color: #111111;
  transition: border-color 0.3s, color 0.3s;
}

.input-field::placeholder {
  color: #b3a58c;
  opacity: 0.8;
}

.input-field:focus, .input-field:hover {
  border-bottom: 2px solid #9e8f75;
}

.submit-button {
  width: 100%;
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
  transform: scale(1.05);
}
</style>
