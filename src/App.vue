<script setup>
import {computed, defineProps, ref, provide} from "vue";
import {useRouter, useRoute} from "vue-router";
import axios from "axios";
import ErrorHandler from "@/components/ErrorHandler.vue";

const url = import.meta.env.VITE_SERVER_URL;
const router = useRouter();
const route = useRoute();
const errors = ref([]);
const api = axios.create({
  baseURL: url,
  withCredentials: true,
});

let isRefreshing = false;
let subscribers = [];

const subscribeTokenRefresh = (callback) => {
  subscribers.push(callback);
};

const onRefreshed = (token) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  subscribers.forEach((callback) => callback(token));
  subscribers = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.log('Intercepted error:', error);
      const originalRequest = error.config;

      if (error.response && error.response.status === 500 && !originalRequest._retry) {
        console.log('Handling 500 error');

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            subscribeTokenRefresh(
                (token) => {
                  originalRequest.headers['Authorization'] = `Bearer ${token}`;
                  resolve(api(originalRequest));
                },
                reject(error)
            );
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const response = await api.post('/auth/refresh');

          errors.value = [];
          isRefreshing = false;
          onRefreshed(response.data.accessToken);

          return api(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          subscribers = [];
          errors.value.push(refreshError?.response?.data?.message);

          await router.push('/login');

          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
);

const routeTo = (route) => {
  router.push(route);
};

const showTopBar = computed(() => route.path !== "/login");

provide("api", api);

defineProps({
  errors: Array,
});
</script>

<template>
  <div v-if="showTopBar">
   <div class="top-bar">
      <div class="top-bar-item" @click="routeTo('/editions')">
       Edition
     </div>

     <div class="separator"></div>

      <div class="top-bar-item" @click="routeTo('/questions')">
       Question
     </div>
   </div>

   <div class="content-wrapper">
      <div class="info-box">
        <RouterView />
      </div>
   </div>
  </div>

  <div v-if="!showTopBar"><RouterView/></div>
  <ErrorHandler :errors="errors" />
</template>

<style scoped>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow-y: auto;
}

.top-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5b654a;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 50px;
}

.top-bar-item {
  flex: 1;
  text-align: center;
  line-height: 50px;
  font-size: 18px;
  color: #d8d1bd;
  transition: background-color 0.3s, color 0.3s;
  cursor: pointer;
}

.top-bar-item:hover {
  background-color: #9e8f75;
  color: #ffffff;
}

.separator {
  width: 2px;
  height: 50px;
  background-color: #9e8f75;
}

.content-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  flex-grow: 1;
  margin-top: 50px;
  padding: 50px;
}

.info-box {
  background: white;
  color: #111;
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  min-height: 300px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}
</style>
