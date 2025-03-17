<script setup>
import { ref, watch} from 'vue';
import {useRoute, useRouter} from "vue-router";
import { api } from "@/helpers/api.service.js";

const router = useRouter();
const route = useRoute();
const items = ref([]);
const showDeleteModal = ref(false);
const itemToDelete = ref(null);
const page = ref(+route.query.page || 1);

const loadItems = async () => {
    items.value = await api.get(`/editions/all?page=${page.value}`);
};

const deleteItem = async () => {
    await api.remove(`/admin/edition/${itemToDelete.value}`);
    showDeleteModal.value = false;
    await loadItems();
};

const openDeleteModal = (id) => {
  itemToDelete.value = id;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  itemToDelete.value = null;
};

const routeTo = (route) => {
    router.push(route);
}

const changePage = (newPage) => {
    page.value = newPage;
    router.push({query: {...route.query, page: newPage}});
};

const convertToEmbedUrl = (url) => {
  const videoId = url.split('v=')[1];

  return `https://www.youtube.com/embed/${videoId}`;
}

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

watch(() => route.query.page, async (newPage) => {
    page.value = +newPage || 1;
    await loadItems();
}, { immediate: true });
</script>

<template>
  <div class="content-wrapper">
    <div class="button-container">
      <button class="btn" @click="routeTo('/')">Назад</button>
      <button class="btn" @click="routeTo('/edition/form')">Додати</button>
    </div>

    <div v-if="items.length === 0" class="no-items">Більше випусків немає</div>
    <div v-else class="item-list">
      <div v-for="item in items" :key="item.id" class="item">
        <div class="item-details">
          <h3>{{ item.name }}</h3>
          <div class="video-container">
            <iframe
                    :src="convertToEmbedUrl(item.url_video)"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
            </iframe>
          </div>
          <p class="formatted-date">{{ formatDate(item.created_at) }}</p>
        </div>
        <button @click="openDeleteModal(item.id)" class="delete-button">Видалити</button>
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

iframe {
  margin-top: 10px;
  border: none;
  width: 100%;
  max-width: 600px;
}

.formatted-date {
  font-size: 14px;
  color: #666;
  margin-top: auto;
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

@media screen and (max-width: 768px) {
  .content-wrapper {
    width: 100%;
    padding: 10px;
  }

  .item {
    flex-direction: column;
    padding: 10px;
  }

  .button-container {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    margin-bottom: 10px;
  }

  .modal {
    width: 90%;
  }

  .pagination {
    flex-direction: column;
    gap: 10px;
  }

  iframe {
    width: 100%;
  }

  .item-details {
    width: 100%;
  }
}

@media screen and (max-width: 480px) {
  .btn {
    font-size: 16px;
  }

  .item {
    padding: 8px;
  }

  .pagination-btn {
    font-size: 14px;
  }
}
</style>

