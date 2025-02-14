<template>
  <div class="container mx-auto p-4">
    <BaseCard>
      <div class="flex flex-row items-center justify-between gap-2 mb-2">
        <h1 class="text-2xl font-bold">Genres</h1>
        <div class="flex flex-row gap-2">
          <BaseButton :variant="ButtonVariant.PRIMARY" @click="onCreateClick"
            >Create Genre</BaseButton
          >
        </div>
      </div>
      <GenresTable />
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import GenresTable from '@/components/genres/GenresTable.vue';
import BaseButton from '@/components/shared/BaseButton.vue';
import BaseCard from '@/components/shared/BaseCard.vue';
import { ButtonVariant } from '@/types/buttonVariant';
import { useRouter } from 'vue-router';

const router = useRouter();

const onCreateClick = () => {
  router.push({
    name: 'create-genre',
  });
};
</script>
