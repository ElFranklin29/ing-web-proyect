<template>
  <nav class="navbar navbar-expand-lg  " :style="{ backgroundColor: '#141313' }">
    <div class="container-fluid">
      <a class="navbar-brand text-white " href="/">WebSolutions</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link :to="`/catalogo`" class="nav-link active text-white ">
              SmartChoice
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="`/noticias`" class="nav-link active text-white">
              TechNews
            </router-link>
          </li>
          <li class="nav-item">
            <a href="https://elfranklin29.github.io/portafolio-profesional/" target="_blank" class="nav-link active text-white">Portafolio</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>