<script setup>

</script>

<template>
  <div class="content-wrapper" >
    <div class="info-item">
        <h3>Edition</h3>
        <p>Details about the edition go here.</p>
      </div>
      <div class="info-item">
        <h3>Question</h3>
        <p>Details about the question go here.</p>
      </div>
  </div>
</template>

<style scoped>
.content-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1000px;
}

.info-item {
  flex: 1;
  padding: 20px;
  text-align: center;
}
</style>
