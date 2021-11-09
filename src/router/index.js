import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../components/Welcome.vue';
import WorkingTimes from '../components/WorkingTimes.vue';

function navGuard (to, from, next) {
  console.log(to);
  console.log(from)
  console.log(next)
  let userId = localStorage.getItem("userId");
  if (userId) {
    next()
  } else {
    alert("You must be connected to access this page")
  }
}

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/workingtimes',
    name: 'Working Times',
    component: WorkingTimes,
    beforeEnter : navGuard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
