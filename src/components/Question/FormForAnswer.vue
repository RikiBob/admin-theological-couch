<script setup>
import { ref, watch } from "vue";
import {useRoute, useRouter} from "vue-router";
import { api } from "@/helpers/api.service.js";
import { errors } from '@/helpers/errors.js'

const router = useRouter();
const route = useRoute();
const questionSummary = ref("");
const urlAnswer = ref("");
const idQuestion = ref(route.query.id || "");
const showSuccessMessage = ref(false);

const formSubmit = async () => {
    if (!questionSummary.value.trim() || !urlAnswer.value.trim()) {
      errors.value.push('Поля обов\`язкові для заповнення');
      return;
    }

    const data = {
      question_summary: questionSummary.value,
      url: urlAnswer.value,
    };

    const response = await api.patch(`/admin/answer/${idQuestion.value}`, data);

     if (response.ok) {
        showSuccessMessage.value = true;

        questionSummary.value = '';
        urlAnswer.value = '';

        setTimeout(() => {
        showSuccessMessage.value = false;
        }, 3000);
     }
}

const routeTo = (route) => {
  router.push(route);
}

watch(() => route.query.id, (id) => {
  idQuestion.value = id;
})
</script>

<template>
  <div class="content-wrapper">
    <form @submit.prevent="submitForm" class="edition-form">
      <h3>Форма для відповіді</h3>
      <input type="text" v-model="questionSummary" placeholder="Коротка назва" class="input-field" />
      <input type="url" v-model="urlAnswer" placeholder="Посилання для відео" class="input-field" />
      <button type="submit" class="submit-button" @click="formSubmit">Відповісти</button>
      <button type="submit" class="submit-button" @click="routeTo('/questions')">Назад</button>
    </form>
  </div>
  <div v-if="showSuccessMessage" class="success-message">
    ✅ Відповідь успішно відправлена!
  </div>
</template>

<style scoped>
.content-wrapper{
  display: flex;
  justify-content: center;
  width: 100%;
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

/* Медіа-запит для мобільних пристроїв */
@media (max-width: 768px) {
  .edition-form {
    width: 100%;
    padding: 10px;
  }

  .input-field {
    font-size: 14px;
    padding: 10px;
  }

  .submit-button {
    font-size: 16px;
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .input-field {
    font-size: 14px;
    padding: 8px;
  }

  .submit-button {
    font-size: 14px;
    padding: 10px;
  }

  .success-message {
    font-size: 14px;
    padding: 8px;
  }
}
</style>
