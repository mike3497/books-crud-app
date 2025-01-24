<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Edit Book</h1>
    <nav class="mb-4">
      <ol class="flex flex-row items-center gap-2">
        <li>
          <RouterLink :to="{ name: 'home' }" class="underline">Home</RouterLink>
        </li>
        <li>
          <ChevronRight :size="16" />
        </li>
        <li>
          <span class="">Edit Book</span>
        </li>
      </ol>
    </nav>
    <BaseCard>
      <div v-if="isLoading" class="flex items-center justify-center p-8">
        <LoadingSpinner />
      </div>
      <EditBookForm v-else-if="bookDTO" :bookDTO="bookDTO" />
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import EditBookForm from '@/components/EditBookForm.vue';
import BaseCard from '@/components/shared/BaseCard.vue';
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue';
import { useToast } from '@/composables/useToast';
import type { BookDTO } from '@/models/bookDTO';
import { ToastVariant } from '@/models/toast';
import { fetchBook } from '@/services/booksService';
import { isAxiosError } from 'axios';
import { ChevronRight } from 'lucide-vue-next';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const toast = useToast();
const route = useRoute();
const id = route.params.id as string;

const bookDTO = ref<BookDTO | null>();
const isLoading = ref<boolean>(false);

const fetchBookData = async () => {
  try {
    isLoading.value = true;
    const response = await fetchBook(id);
    bookDTO.value = response;
  } catch (error: any) {
    if (isAxiosError(error)) {
      toast.open(error.response?.data.message, ToastVariant.ERROR);
    }
  } finally {
    isLoading.value = false;
  }
};

fetchBookData();
</script>
