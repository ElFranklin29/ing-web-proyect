import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import router from './router'

app.use(VueGtm, {
  id: 'GTM-59G6W7LB', // tu GTM ID
  enabled: true,
  debug: true,
  vueRouter: router, // si usas vue-router
});


createApp(App).use(router).mount('#app')

