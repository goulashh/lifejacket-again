import GameHandler from '@/components/games/GameHandler.vue'
import Dashboard from '@/views/Dashboard.vue'
import Lesson from '@/views/Lesson.vue'
import Login from '@/views/Login.vue'
import Topic from '@/views/Topic.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/dash',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/course/:courseID/topic/:topicID',
    name: 'Topic',
    props: true,
    component: Topic
  },
  {
    path: '/lesson/:lessonID',
    props: true,
    children: [
      {
        path: 'go',
        props: true,
        component: Lesson
      },
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

export default router
