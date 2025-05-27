import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import VueGtmPlugin from 'vue-gtm/dist/plugin'

const app = createApp(App)

app.use(router)
app.mount('#app')

app.use(VueGtmPlugin, {
  id: 'GTM-59G6W7LB', 
  enabled: true,
  debug: true,
  vueRouter: router, 
})
