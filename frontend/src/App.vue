<script setup>
import LanguageComponent from './components/LanguageComponent.vue';
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <LanguageComponent class = "language-choose" />
  <RouterView />
</template>

<style scoped>
.language-choose {
  position: absolute;
  right: 1rem;
  top: 1rem;
  z-index: 1000;
}
</style>
