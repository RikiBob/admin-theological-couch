<script setup>
import { ref } from "vue";
import {useRouter} from "vue-router";
import { api } from "@/helpers/api.service.js"
import { errors } from "@/helpers/errors.js"

const router = useRouter();
const name = ref("");
const urlVideo = ref("");
const showSuccessMessage = ref(false);

const formSubmit = async () => {
    if (!name.value.trim() || !urlVideo.value.trim()) {
      errors.value.push('Поля обов\`язкові для заповнення');
      return;
    }

    const data = {
      name: name.value,
      url_video: urlVideo.value,
    };

    const response = await api.post('/editions', data);

    if (response.ok) {
      showSuccessMessage.value = true;

      name.value = '';
      urlVideo.value = '';

      setTimeout(() => {
        showSuccessMessage.value = false;
      }, 3000);
    }
}

const routeTo = (route) => {
  router.push(route);
}
</script>

<template>
  <div class="content-wrapper">
  <form @submit.prevent="submitForm" class="edition-form">
    <h3>Форма для нового випуску</h3>
    <input type="text" v-model="name" placeholder="Назва випуску" class="input-field" />
    <input type="url" v-model="urlVideo" placeholder="Посилання на відео" class="input-field" />
    <button type="submit" class="submit-button" @click="formSubmit">Зберегти</button>
    <button type="submit" class="submit-button" @click="routeTo('/editions')">Назад</button>
  </form>
  </div>
  <div v-if="showSuccessMessage" class="success-message">
    ✅ Дані успішно збережено!
  </div>
</template>

<style scoped>
.content-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
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

.success-message {
  margin-top: 10px;
  padding: 10px;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 5px;
}

@media screen and (max-width: 768px) {
  .content-wrapper {
    width: 100%;
    padding: 10px;
  }

  .edition-form {
    width: 100%;
  }

  .input-field {
    font-size: 14px;
  }

  .submit-button {
    font-size: 16px;
    padding: 10px;
  }
}

@media screen and (max-width: 480px) {
  .input-field {
    font-size: 14px;
  }

  .submit-button {
    font-size: 14px;
  }

  .success-message {
    font-size: 14px;
  }
}
</style>

