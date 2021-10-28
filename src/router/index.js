import { createRouter, createWebHistory } from 'vue-router'
// import User from '../components/User.vue'
import Welcome from '../components/Welcome.vue';
import WorkingTimes from '../components/WorkingTimes.vue';

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/workingtimes',
    name: 'Working Times',
    component: WorkingTimes
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
