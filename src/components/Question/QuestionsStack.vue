<script setup>
import {useRoute, useRouter} from "vue-router";
import { ref, watch } from "vue";
import { api } from "@/helpers/api.service.js"

const router = useRouter();
const route = useRoute();
const items = ref([]);
const sortOrder = ref('ASC');
const page = ref(+route.query.page || 1);
const showDeleteModal = ref(false);
const itemToDelete = ref(null);

const routeTo = (route) => {
  router.push(route);
}

const loadItems = async () => {
    items.value = await api.get(`/questions/unanswered?page=${page.value}&sortOrder=${sortOrder.value}`);
};

const changePage = (newPage) => {
    page.value = newPage;
    router.push({query: {...route.query, page: newPage}});
};

const toggleSortOrder = async () => {
  sortOrder.value = sortOrder.value === "ASC" ? "DESC" : "ASC";
  await loadItems();
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('uk-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
};

const answer = (id) => {
  router.push({path: '/answer/form', query: {id: id.toString()}});
}

const deleteItem = async (id) => {
  await api.remove(`/admin/question/${itemToDelete.value}`);
  showDeleteModal.value = false;
  await loadItems();
}

const openDeleteModal = (id) => {
  itemToDelete.value = id;
  showDeleteModal.value = true;
}

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  itemToDelete.value = null;
}

watch(() => route.query.page, async (newPage) => {
    page.value = +newPage || 1;
    await loadItems();
}, { immediate: true });
</script>

<template>
  <div class="content-wrapper">
    <div class="button-container">
      <button class="btn" @click="routeTo('/')">Назад</button>

      <div class="sort-container">
        <span class="sort-text">Сортувати</span>
        <button class="sort-btn" @click="toggleSortOrder">
          <span :class="{'arrow-up': sortOrder === 'ASC', 'arrow-down': sortOrder === 'DESC'}">▲</span>
        </button>
      </div>

      <button class="btn" @click="routeTo('/questions/history')">Історія</button>
    </div>

    <div v-if="items.length === 0" class="no-items">Більше питань немає</div>
    <div v-else class="item-list">
      <div v-for="item in items" :key="item.id" class="item">
        <div class="item-details">
          <p class="question-text">{{ item.question_text }}</p>
          <p class="formatted-date">{{ formatDate(item.created_at) }}</p>
        </div>
        <div class="btn-container">
          <button class="answer-btn" @click="answer(item.id)">Відповісти</button>
          <button class="delete-button" @click="openDeleteModal(item.id)">Видалити</button>
        </div>
      </div>
    </div>

    <div class="pagination">
      <button v-if="page > 1" @click="changePage(page - 1)" class="pagination-btn">← Попередня</button>
      <span class="page-indicator">Сторінка {{ page }}</span>
      <button v-if="items.length !== 0" @click="changePage(page + 1)" class="pagination-btn">Наступна →</button>
    </div>
  </div>

  <div v-if="showDeleteModal" class="modal-overlay">
    <div class="modal">
      <h3>Ви впевнені, що хочете видалити цей елемент?</h3>
      <div class="modal-buttons">
        <button @click="deleteItem" class="btn">Підтвердити</button>
        <button @click="closeDeleteModal" class="btn">Скасувати</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-wrapper {
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.button-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 50px;
}

.btn {
  padding: 10px 20px;
  font-size: 18px;
  min-width: 150px;
  border: none;
  background-color: #b3a58c;
  color: #fff;
  cursor: pointer;
  border-radius: 8px;
  transition: transform 0.2s, background-color 0.2s;
}

.btn:hover {
  background-color: #9e8f75;
  transform: scale(1.05);
}

.sort-container {
  display: flex;
  align-items: center;
  gap: 5px;
}

.sort-text {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.sort-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  padding: 0;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
}

.arrow-up {
  color: #28a745;
}

.arrow-down {
  color: #dc3545;
  transform: rotate(180deg);
}

.item-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
  padding-right: 10px;
}

.item {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 15px;
  min-height: 200px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.item-details {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.question-text {
  font-size: 18px;
  font-weight: normal;
  margin-bottom: 10px;
  word-spacing: 4px;
}

.formatted-date {
  font-size: 14px;
  color: #666;
  margin-top: auto;
}

.btn-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
}

.answer-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.answer-btn:hover {
  background-color: #307d31;
}

.delete-button {
  padding: 10px 15px;
  background-color: #ef1b1b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #ad0000;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  text-align: center;
}

.modal-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
  width: 100%;
}

.pagination-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.pagination-btn:hover {
  background-color: #0056b3;
}

.page-indicator {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.no-items {
  text-align: center;
  font-size: 18px;
  color: #777;
  margin: 20px 0;
  width: 100%;
}

@media (max-width: 768px) {
  .content-wrapper {
    width: 100%;
  }

  .button-container {
    flex-direction: column;
    gap: 15px;
    margin-bottom: 30px;
  }

  .btn {
    width: 100%;
    min-width: auto;
    padding: 12px;
    font-size: 16px;
  }

  .item {
    flex-direction: column;
    align-items: flex-start;
    padding: 12px;
  }

  .item-details {
    width: 100%;
  }

  .question-text {
    font-size: 16px;
  }

  .pagination {
    flex-direction: column;
    gap: 10px;
  }

  .pagination-btn {
    width: 100%;
    padding: 12px;
    font-size: 16px;
  }

  .sort-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .sort-btn {
    font-size: 18px;
  }

  .no-items {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .btn {
    font-size: 14px;
    padding: 10px 15px;
  }

  .pagination-btn {
    font-size: 14px;
    padding: 10px 15px;
  }

  .item {
    min-height: 160px;
    padding: 10px;
  }

  .question-text {
    font-size: 14px;
  }

  .answer-btn {
    padding: 8px 16px;
    font-size: 14px;
  }
}
</style>
