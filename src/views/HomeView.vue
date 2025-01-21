<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Books</h1>
    <BaseButton class="mb-4" :variant="ButtonVariant.PRIMARY" @click="onCreateClick"
      >Create Book</BaseButton
    >
    <BooksTable />
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import BooksTable from '@/components/BooksTable.vue';
import { ButtonVariant } from '@/types/buttonVariant';
import { useRouter } from 'vue-router';

const router = useRouter();

const onCreateClick = () => {
  router.push({
    name: 'create',
  });
};
</script>
