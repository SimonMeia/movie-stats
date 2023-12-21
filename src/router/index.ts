import HomeView from '@/views/HomeView.vue'
import StatisticsView from '@/views/StatisticsView.vue'
import StoryView from '@/views/StoryView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: StatisticsView
    },
    {
      path: '/story',
      name: 'story',
      component: StoryView
    }
  ]
})

export default router
