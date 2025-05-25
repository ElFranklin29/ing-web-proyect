<script setup>
import products_catalog from './components/catalog/products_catalog.vue';
import navbar from './components/navbar.vue';
import footer_app from './components/footer.vue';
</script>

<template>
<navbar/>

<router-view/>
<footer_app/>
</template>

<style scoped>

</style>
