<template>
  <AppHeader />
  <RouterView class="mb-auto" />
  <AppFooter />
  <ToastsContainer />
</template>

<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue';
import AppHeader from '@/components/AppHeader.vue';
import ToastsContainer from '@/components/ToastsContainer.vue';
</script>
