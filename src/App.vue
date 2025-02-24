<script setup>
import {computed} from "vue";
import {useRouter, useRoute} from "vue-router";
import ErrorHandler from "@/components/ErrorHandler.vue";
import { errors } from "@/helpers/errors.js";

const router = useRouter();
const route = useRoute();

const routeTo = (route) => {
  router.push(route);
};

const showTopBar = computed(() => route.path !== "/login");
</script>

<template>
  <div v-if="showTopBar">
   <div class="top-bar">
      <div class="top-bar-item" @click="routeTo('/editions')">
       Випуски
     </div>

     <div class="separator"></div>

      <div class="top-bar-item" @click="routeTo('/questions')">
       Питання
     </div>
   </div>

   <div class="content-wrapper">
      <div class="info-box">
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
