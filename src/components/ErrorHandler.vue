<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  errors: Array
});

const removeError = (index) => {
  props.errors.splice(index, 1);
};
</script>

<template>
  <div v-if="errors.length" class="error-container">
    <div v-for="(error, index) in errors" :key="index" class="error-box">
      <span>{{ error }}</span>
      <button @click="removeError(index)" class="close-btn">✖</button>
    </div>
  </div>
</template>

<style scoped>
.error-container {
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 90%;
  background: rgba(140, 43, 43, 0.7);
  padding: 10px;
  border-radius: 10px;
  animation: slideUp 0.5s ease-in-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translate(-50%, 100%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

.error-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(198, 55, 55, 0.7);
  color: #dac4c4;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 6px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.close-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  color: #dac4c4;
  font-size: 14px;
  padding: 0;
  margin-left: 10px;
}

.close-btn:hover {
  color: darkred;
}
</style>