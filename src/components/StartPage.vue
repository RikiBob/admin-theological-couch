<template>
  <div class="content-wrapper" >
    <div class="info-item">
        <h1>Ласкаво просимо в адмін-панель!</h1>
        <p>Вітаємо вас у системі керування вмістом! Тут ви можете управляти випусками та питаннями, що надходять від користувачів. Адмін-панель дозволяє зручно керувати ефірами та взаємодіяти з аудиторією, надаючи можливість відповідати на питання та переглядати історію відповідей.</p>

        <div class="section">
          <h2>Основні розділи:</h2>
          <div>
              <strong>Випуски</strong>
              <p>У розділі "Випуски" ви можете додавати нові ефіри та видаляти вже існуючі. Кожен випуск є важливою частиною вашого контенту, і лише після його додавання ви зможете переходити до відповіді на питання, що стосуються цього випуску.</p>
              <strong>Питання</strong>
              <p>У розділі "Питання" ви можете переглядати запити, що надійшли від користувачів, та відповідати на них. Також ви зможете ознайомитися з історією відповідей на попередні питання. Пам'ятайте, що перед тим, як відповідати на питання, потрібно обов'язково додати відповідний випуск.</p>
          </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.content-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.info-item {
  flex: 1;
  padding: 20px;
  text-align: center;
  font-size: 18px;
}

@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
    padding: 10px;
  }

  .info-item {
    font-size: 16px;
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    padding: 5px;
  }

  .info-item {
    font-size: 14px;
    padding: 10px;
  }
}
</style>
