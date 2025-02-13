<script setup>
import {useRoute, useRouter} from "vue-router";
import {inject, ref, watch} from "vue";
import ErrorHandler from "@/components/ErrorHandler.vue";

const api = inject('api')
const errors = ref([]);
const router = useRouter();
const route = useRoute();
const items = ref([]);
const sortOrder = ref('ASC');
const page = ref(Number(route.query.page) || 1);

const routeTo = (route) => {
  try {
    router.push(route);
  } catch (error) {
    errors.value.push(error?.response?.data);
  }
}

const loadItems = async () => {
  try {
    errors.value = [];
    const response = await api.get(`/questions/answered?page=${page.value}&sortOrder=${sortOrder.value}`) ;
    items.value = response.data;
  } catch (error) {
    errors.value.push(error?.response?.data);
  }
};

const changePage = (newPage) => {
  try {
    page.value = newPage;
    router.push({query: {...route.query, page: newPage}});
  } catch (error) {
    errors.value.push(error?.response?.data);
  }
};

const toggleSortOrder = async () => {
  sortOrder.value = sortOrder.value === "ASC" ? "DESC" : "ASC";
  await loadItems();
};

const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleString('uk-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (error) {
    errors.value.push(error?.response?.data);
  }
};

watch(() => route.query.page, async (newPage) => {
  try {
    page.value = Number(newPage) || 1;
    await loadItems();
  } catch (error) {
    errors.value.push(error?.response?.data);
  }
}, { immediate: true });
</script>

<template>
  <div class="content-wrapper">
    <div class="button-container">
      <button class="btn" @click="routeTo('/questions')">Назад</button>

      <div class="sort-container">
        <span class="sort-text">Сортувати</span>
        <button class="sort-btn" @click="toggleSortOrder">
          <span :class="{'arrow-up': sortOrder === 'ASC', 'arrow-down': sortOrder === 'DESC'}">▲</span>
        </button>
      </div>
    </div>

    <div v-if="items.length === 0" class="no-items">Більше відповідей немає</div>
    <div v-else class="item-list">
      <div v-for="item in items" :key="item.id" class="item">
        <div class="item-details">
          <h3 class="question-title">{{ item.question_summary }}</h3>

          <div class="question-block">
            <p class="question-label">Питання:</p>
            <p class="question-text">{{ item.question_text }}</p>
          </div>

          <p class="answer-label">Відповідь:</p>
          <a :href="item.url_answer" target="_blank">{{ item.url_answer }}</a>
          <p class="formatted-date">{{ formatDate(item.created_at) }}</p>
        </div>
      </div>
    </div>

    <div class="pagination">
      <button v-if="page > 1" @click="changePage(page - 1)" class="pagination-btn">← Попередня</button>
      <span class="page-indicator">Сторінка {{ page }}</span>
      <button v-if="items.length !== 0" @click="changePage(page + 1)" class="pagination-btn">Наступна →</button>
    </div>
  </div>

  <ErrorHandler :errors="errors"/>
</template>

<style scoped>
.content-wrapper {
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 1000px;
}

.button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 50px;
  position: relative;
}

.sort-container {
  display: flex;
  align-items: center;
  gap: 5px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
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

.question-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.question-block, .answer-block {
  background-color: #e9e9e9;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.question-label, .answer-label {
  font-weight: bold;
  color: #555;
  margin-bottom: 5px;
}

.question-text, .answer-text {
  font-size: 18px;
  word-spacing: 3px;
}

.formatted-date {
  font-size: 14px;
  color: #666;
  margin-top: auto;
  text-align: right;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
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
}
</style>