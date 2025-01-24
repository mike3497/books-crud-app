<template>
  <div class="container mx-auto p-4">
    <BaseCard>
      <div class="flex flex-row items-center justify-between gap-2 mb-2">
        <h1 class="text-2xl font-bold">Books</h1>
        <div class="flex flex-row gap-2">
          <!-- <input
            class="px-4 py-2 border border-gray-300 focus-visible:outline-none focus-visible:border-blue-500 rounded-lg"
            placeholder="Search books"
          /> -->
          <BaseButton :variant="ButtonVariant.PRIMARY" @click="onCreateClick"
            >Create Book</BaseButton
          >
        </div>
      </div>
      <BooksTable />
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import BooksTable from '@/components/BooksTable.vue';
import BaseButton from '@/components/shared/BaseButton.vue';
import BaseCard from '@/components/shared/BaseCard.vue';
import { ButtonVariant } from '@/types/buttonVariant';
import { useRouter } from 'vue-router';

const router = useRouter();

const onCreateClick = () => {
  router.push({
    name: 'create',
  });
};
</script>
