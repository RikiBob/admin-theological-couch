import {createRouter, createWebHistory} from 'vue-router';
import './assets/main.css'
import {createApp} from 'vue'
import App from './App.vue'
import LoginFormView from "@/components/LoginForm.vue";
import EditionForm from "@/components/Edition/EditionForm.vue";
import EditionsStack from "@/components/Edition/EditionsStack.vue";
import StartPage from "@/components/StartPage.vue";
import QuestionStack from "@/components/Question/QuestionsStack.vue";
import QuestionsHistory from "@/components/Question/QuestionsHistory.vue";
import FormForAnswer from "@/components/Question/FormForAnswer.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [{
        name: 'Home',
        path: '/',
        component: StartPage
    }, {
        name: 'Login',
        path: '/login',
        component: LoginFormView
    }, {
        name: 'EditionsStack',
        path: '/editions',
        component: EditionsStack
    }, {
        name: 'EditionForm',
        path: '/edition/form',
        component: EditionForm
    }, {
        name: 'QuestionsStack',
        path: '/questions',
        component: QuestionStack
    }, {
        name: 'QuestionsHistory',
        path: '/questions/history',
        component: QuestionsHistory
    }, {
        name: 'FormForAnswer',
        path: '/answer/form',
        component: FormForAnswer
    },],
});

router.afterEach(() => {
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50); // Додаємо затримку, щоб скрол виконувався після рендеру
});

createApp(App)
    .use(router)
    .mount('#app')
