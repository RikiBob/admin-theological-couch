<script setup>

</script>

<template>
  <div class="top-bar">
    <div class="top-bar-item">
      Edition
    </div>
    <div class="separator"></div>
    <div class="top-bar-item">
      Question
    </div>
  </div>
</template>

<style scoped>
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
</style>
