<script setup>
import {computed} from "vue";
import {useRouter, useRoute} from "vue-router";
import ErrorHandler from "@/components/ErrorHandler.vue";
import { errors } from "@/helpers/errors.js";
import {api} from "@/helpers/api.service.js";
import GlobalLoader from "@/components/GlobalLoader.vue";

const router = useRouter();
const route = useRoute();

const routeTo = (route) => {
  router.push(route);
};

const showTopBar = computed(() => route.path !== "/login");

const logout = async () => {
  await api.post('/auth/logout');
  await router.push('/login');
}
</script>

<template>
  <div v-if="showTopBar">
   <div class="top-bar">
      <div class="top-bar-item left" @click="routeTo('/editions')">
       Випуски
     </div>

     <div class="separator"></div>

      <div class="top-bar-item" @click="routeTo('/questions')">
       Питання
     </div>
     <button @click="logout" class="logout-button">Вихід</button>
   </div>

   <div class="content-wrapper">
      <div class="info-box">
        <GlobalLoader />
        <RouterView />
      </div>
   </div>
  </div>

  <div v-if="!showTopBar"><RouterView/></div>
  <ErrorHandler v-if="errors.length" :errors="errors" />
</template>

<style scoped>
body, html {
  margin: 0;
  padding: 0;
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

.left {
  margin-left: 85px;
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

/* Content wrapper and Info box */
.content-wrapper {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  margin-top: 50px;
  padding: 50px;
  box-sizing: border-box;
}

.info-box {
  background: white;
  color: #111;
  border-radius: 20px;
  padding: 40px;
  width: 80%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

/* Logout button styling */
.logout-button {
  background-color: #f44336;
  color: white;
  margin-right: 10px;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  margin-left: 20px;
}

.logout-button:hover {
  background-color: #d32f2f;
  transform: scale(1.05);
}

.logout-button:focus {
  outline: none;
}

/* Responsive Design for Mobile */
@media screen and (max-width: 768px) {
  .top-bar {
    height: 60px;
  }

  .top-bar-item {
    font-size: 16px;
  }

  .content-wrapper {
    padding: 20px;
  }

  .info-box {
    width: 90%;
    padding: 20px;
  }

  .logout-button {
    font-size: 14px;
    padding: 8px 16px;
  }

  .top-bar-item {
    line-height: 40px;
  }
}

@media screen and (max-width: 480px) {
  .top-bar {
    height: 50px;
  }

  .top-bar-item {
    font-size: 14px;
    padding: 5px;
  }

  .content-wrapper {
    padding: 10px;
  }

  .info-box {
    width: 100%;
    padding: 15px;
  }

  .logout-button {
    font-size: 12px;
    padding: 8px 14px;
  }

  .separator {
    display: none;
  }
}
</style>

