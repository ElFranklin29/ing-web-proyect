import { createRouter, createWebHistory } from 'vue-router'
import products_catalog from '../components/catalog/products_catalog.vue'
import main_news from '../components/news/main_news.vue'


const routes = [
  {
    path: '/',
    name: '',
    component: main_news,
    props: true,
    meta: {
      title: 'TechNews',
      metaTags: [
        {
          name: 'description',
          content: 'Noticias actualizadas de tecnología, IA e innovación.'
        },
        {
          property: 'og:title',
          content: 'Noticias de Tecnología'
        }
      ]
    }
  },
  {
    path: '/catalogo',
    name: 'Catalog',
    component: products_catalog,
    meta: {
      title: 'SmartChoice',
      metaTags: [
        {
          name: 'description',
          content: 'Explora nuestro catálogo de productos tecnológicos al mejor precio.'
        },
        {
          property: 'og:title',
          content: 'Catálogo de Productos'
        }
      ]
    }
  },
  {
    path: '/noticias',
    name: 'News',
    component: main_news,
    props: true,
    meta: {
      title: 'TechNews',
      metaTags: [
        {
          name: 'description',
          content: 'Noticias actualizadas de tecnología, IA e innovación.'
        },
        {
          property: 'og:title',
          content: 'Noticias de Tecnología'
        }
      ]
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})



router.beforeEach((to, from, next) => {

  if (to.meta?.title) {
    document.title = to.meta.title
  }

  
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).forEach(el => el.remove())


  if (to.meta?.metaTags) {
    to.meta.metaTags.forEach(tagDef => {
      const tag = document.createElement('meta')

      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key])
      })

      tag.setAttribute('data-vue-router-controlled', '')
      document.head.appendChild(tag)
    })
  }

  next()
})


export default router

