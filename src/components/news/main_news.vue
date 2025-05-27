<template>
  <main class="text-white min-vh-100" :style="{ backgroundColor: '#1A1919' }">

    <!-- Hero -->
    <section class="py-5 text-center" :style="{ backgroundColor: '#2A2A2A' }">
      <div class="container">
        <h1 class="display-4 fw-bold" :style="{ color: '#2196F3' }">Bienvenido a TechNews</h1>
        <p class="lead text-light">
          Las últimas noticias sobre tecnología, innovación e inteligencia artificial.
        </p>
        <a href="https://developer.nytimes.com/" target="_blank">
        <img src="https://developer.nytimes.com/files/poweredby_nytimes_150c.png?v=1583354208341" alt="new york times image">
        </a>
      </div>

    </section>

    <!-- Noticias -->
    <!-- Noticias -->
<section class="container py-5" aria-labelledby="news-section">
  <h2 id="news-section" class="mb-4" :style="{ color: '#2196F3' }">Noticias</h2>
  <div class="row g-4">
    <article
      class="col-md-4 mb-5"
      v-for="(noticia, index) in news"
      :key="index"
      :aria-label="`Noticia: ${noticia.title}`"
      role="article"
    >
      <div class="card h-100 border-0 shadow d-flex flex-column" :style="{ backgroundColor: '#2A2A2A', minHeight: '100%' }">
        <img
           loading="lazy"
          :src="noticia.multimedia[1].url"
          class="card-img-top noticia-img"
          :alt="`Imagen ilustrativa de la noticia titulada`"
        />
        <div class="card-body d-flex flex-column">
          <h3 class="card-title text-white h5">{{ noticia.title }}</h3>
          <small class="mb-2" :style="{ color: '#2196F3'}">{{ noticia.created_date }}</small>
          <p class="card-text text-light flex-grow-1 text-truncate-3">{{ noticia.abstract }}</p>
        </div>
        <div class="card-footer bg-transparent border-0">
          <a
            :href="noticia.url"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-sm text-white"
            :style="{ backgroundColor: '#2196F3' }"
            :aria-label="`Leer más sobre ${noticia.title}`"
          >
            Leer más
          </a>
        </div>
      </div>
    </article>
  </div>
</section>

</main>
</template>

<script setup>
import { getNews } from './news_nyt';
import { ref, onMounted, computed } from 'vue';

const news = ref([]);

onMounted(async () => {
  news.value = await getNews();
  insertJsonLd();
  
  if (news.value.length > 0 && news.value[0].multimedia?.[0]?.url) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = news.value[0].multimedia[0].url;
  document.head.appendChild(link);
}
});

const jsonLd = computed(() => {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "TechNews",
    "description": "Noticias sobre tecnología, innovación e inteligencia artificial.",
    "url": "https://ing-web-proyect.vercel.app/noticias",
    "mainEntity": news.value.map((noticia, index) => ({
      "@type": "NewsArticle",
      "headline": noticia.title,
      "datePublished": noticia.created_date,
      "url": noticia.url,
      "image": noticia.multimedia?.[0]?.url || '',
      "description": noticia.abstract,
      "position": index + 1,
      "publisher": {
        "@type": "Organization",
        "name": "The New York Times",
        "logo": {
          "@type": "ImageObject",
          "url": "https://developer.nytimes.com/files/poweredby_nytimes_150c.png?v=1583354208341"
        }
      }
    }))
  };
});

// Función para inyectar el JSON-LD en el <head>
function insertJsonLd() {
  // Si ya existe, lo eliminamos para evitar duplicados
  const existing = document.getElementById('jsonld-technews');
  if (existing) existing.remove();

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'jsonld-technews';
  script.text = JSON.stringify(jsonLd.value, null, 2);

  document.head.appendChild(script);
}
</script>


<style scoped>
/* Limita la descripción a 3 líneas con puntos suspensivos */
.text-truncate-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Número de líneas */
  -webkit-box-orient: vertical;
}

.noticia-img {
  height: 200px; /* o el alto que desees */
  object-fit: cover;
  width: 100%;
  border-top-left-radius: 0.375rem; /* opcional: bordes redondeados si usas Bootstrap */
  border-top-right-radius: 0.375rem;
}
</style>
