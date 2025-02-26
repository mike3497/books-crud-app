<template>
  <AppHeader />
  <div class="mt-16">
    <RouterView />
  </div>
  <AppFooter />
  <ToastsContainer />
</template>

<script setup lang="ts">
import AppFooter from '@/components/layout/AppFooter.vue';
import AppHeader from '@/components/layout/AppHeader.vue';
import ToastsContainer from '@/components/ToastsContainer.vue';
</script>
