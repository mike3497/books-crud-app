<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Create Genre</h1>
    <nav class="mb-4">
      <ol class="flex flex-row items-center gap-2">
        <li>
          <RouterLink :to="{ name: 'genres' }" class="underline">Genres</RouterLink>
        </li>
        <li>
          <ChevronRight :size="16" />
        </li>
        <li>
          <span class="">Create Genre</span>
        </li>
      </ol>
    </nav>
    <BaseCard>
      <GenreForm :isCreateMode="true" />
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import GenreForm from '@/components/genres/GenreForm.vue';
import BaseCard from '@/components/shared/BaseCard.vue';
import { ChevronRight } from 'lucide-vue-next';
</script>
