<template>
  <main>

    <!-- Hero Section -->
    <section class="hero d-flex align-items-center justify-content-center text-white">
      <transition name="fade">
        <div class="text-center">
          <h1 class="display-4 fw-bold">SmartChoice</h1>
          <p class="lead">Encuentra lo mejor en un solo lugar</p>
        </div>
      </transition>
    </section>

    <!-- Título y descripción -->
    <section class="container text-center my-5">
      <transition name="fade-slide">
        <div>
          <h2 class="fw-bold mb-3" style="color: #1A1919;">Catálogo</h2>
          <p class="text-muted">A continuación encontrarás los mejores productos de tecnología a los mejores precios.
          </p>
        </div>
      </transition>
    </section>

    <!-- Catálogo de productos -->
    <section class="container">
      <div class="row">
        <transition-group name="fade-card" tag="div" class="row">
          <div v-for="product in catalog" :key="product.product_id" class="col-md-4 mb-5">
            <div class="card h-100 shadow-sm">
              <img :src="product.thumbnail" class="card-img-top catalogo-img" alt="Imagen del producto ">
              <div class="card-body">
                <h5 class="card-title">{{ product.title }}</h5>
                <p class="mb-1">{{ product.source }}</p>
                <p class="mb-3"><strong> <span class="text-success">{{ product.price }}</span> </strong></p>
                <a class="btn btn-primary w-100" :href=product.product_link target="_blank">Ver producto</a>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </section>
    <!-- Microetiquetado JSON-LD dinámico -->
  
  </main>
</template>

<script>
import { catalog } from './catalog';

export default {
  data() {
    return {
      catalog
    }
  },
  computed: {
    jsonLd() {
      return {
        "@context": "https://schema.org",
        "@type": "Store",
        "name": "SmartChoice",
        "description": "Encuentra lo mejor en un solo lugar. Catálogo de productos de tecnología a los mejores precios.",
        "url": "https://tusitio.com",
        "brand": {
          "@type": "Brand",
          "name": "SmartChoice"
        },
        "mainEntity": {
          "@type": "ItemList",
          "name": "Catálogo de productos",
          "itemListElement": this.catalog.map((product, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Product",
              "name": product.title,
              "image": product.thumbnail,
              "description": product.source,
              "offers": {
                "@type": "Offer",
                "price": product.price.replace(/[^\d.]/g, ""),
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "url": product.product_link
              }
            }
          }))
        }
      };
    }
  },
  methods: {
    renderJsonLd() {
      return JSON.stringify(this.jsonLd, null, 2);
    }
  },
  mounted() {
    // Eliminar si ya existe (por si el componente se monta/desmonta)
    const oldScript = document.getElementById('jsonld-catalog');
    if (oldScript) oldScript.remove();

    // Crear nuevo script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'jsonld-catalog';
    script.text = this.renderJsonLd();

    // Añadir a head
    document.head.appendChild(script);
  }
}
</script>



<style scoped>
/* Hero styles */
.hero {
  height: 50vh;
  background-color: #1A1919;
}

.hero h1,
.hero p {
  color: white;
}

/* Button primary customization */
.card .btn-primary {
  background-color: #8837EA;
  border-color: #8837EA;
}

.card .btn-primary:hover {
  background-color: #7329c9;
  border-color: #7329c9;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-slide-enter-active {
  transition: all 0.8s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-card-enter-active {
  transition: all 0.6s ease;
}

.fade-card-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.catalogo-img {
  height: 200px; /* o el alto que desees */
  object-fit: cover;
  width: 100%;
  border-top-left-radius: 0.375rem; /* opcional: bordes redondeados si usas Bootstrap */
  border-top-right-radius: 0.375rem;
}
</style>
