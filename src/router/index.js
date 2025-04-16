import GameHandler from '@/components/games/GameHandler.vue'
import $bus from '@/globaleventbus'
import Dashboard from '@/views/Dashboard.vue'
import Lesson from '@/views/Lesson.vue'
import Login from '@/views/Login.vue'
import Topic from '@/views/Topic.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login 🔐',
    component: Login
  },
  {
    path: '/dash',
    name: 'Dashboard 🏠',
    component: Dashboard
  },
  {
    path: '/course/:courseID/topic/:topicID',
    name: 'Topic Overview 📋',
    props: true,
    component: Topic
  },
  {
    path: '/lesson/:lessonID',
    props: true,
    children: [
      {
        path: 'go',
        name: 'Lesson 📖',
        props: true,
        component: Lesson
      },
      {
        path: 'review',
        props: true,
      }
    ]
  },
  {
    path: '/test/:gameFile', 
    props: true,
    component: GameHandler
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.afterEach((to, from) => {
  document.title = to.name || "DEFAULT";
  $bus.$emit('pageChangeTick'); // for updating navbar!
});

export default router
