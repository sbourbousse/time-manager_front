import { createApp } from 'vue'
// import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faClock, faStopwatch, faUserClock, faHome, faChartPie } from '@fortawesome/free-solid-svg-icons'

library.add(faClock, faStopwatch, faUserClock, faHome, faChartPie)

import './assets/css/main.css';


// Vue.component('font-awesome-icon', FontAwesomeIcon)

createApp(App).component("fa", FontAwesomeIcon).use(router).mount('#app')
