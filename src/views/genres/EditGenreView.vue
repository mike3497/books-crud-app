<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Edit Genre</h1>
    <nav class="mb-4">
      <ol class="flex flex-row items-center gap-2">
        <li>
          <RouterLink :to="{ name: 'genres' }" class="underline">Genres</RouterLink>
        </li>
        <li>
          <ChevronRight :size="16" />
        </li>
        <li>
          <span class="">Edit Genre</span>
        </li>
      </ol>
    </nav>
    <BaseCard>
      <div v-if="isLoading" class="flex items-center justify-center p-8">
        <LoadingSpinner />
      </div>
      <GenreForm v-else-if="genreDTO" :genreDTO="genreDTO" :isCreateMode="false" />
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import GenreForm from '@/components/genres/GenreForm.vue';
import BaseCard from '@/components/shared/BaseCard.vue';
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue';
import { useToast } from '@/composables/useToast';
import type { GenreDTO } from '@/models/genres/genreDTO';
import { ToastVariant } from '@/models/toast';
import { fetchGenre } from '@/services/genresService';
import { isAxiosError } from 'axios';
import { ChevronRight } from 'lucide-vue-next';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const toast = useToast();
const route = useRoute();
const id = route.params.id as string;

const genreDTO = ref<GenreDTO | null>();
const isLoading = ref<boolean>(false);

const fetchGenreData = async () => {
  try {
    isLoading.value = true;
    const response = await fetchGenre(id);
    genreDTO.value = response;
  } catch (error: any) {
    if (isAxiosError(error)) {
      toast.open(error.response?.data.message, ToastVariant.ERROR);
    }
  } finally {
    isLoading.value = false;
  }
};

fetchGenreData();
</script>
