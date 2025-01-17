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
    <form @submit.prevent="onFormSubmit">
      <div class="flex flex-col gap-2">
        <label>Title</label>
        <input v-model="model.title" class="border border-gray-500 px-4 py-2" type="text" />
      </div>
      <div class="flex flex-col gap-2 mb-4">
        <label>Author</label>
        <input v-model="model.author" class="border border-gray-500 px-4 py-2" type="text" />
      </div>
      <BaseButton type="submit"><Save :size="16" /><span>Save</span></BaseButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { CreateBookRequestDTO } from '@/models/createBookRequestDTO';
import { fetchBook, updateBook } from '@/services/booksService';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import BaseButton from '@/components/BaseButton.vue';
import { Save } from 'lucide-vue-next';
import { ChevronRight } from 'lucide-vue-next';
import { ToastVariant } from '@/models/toast';
import { useToast } from '@/composables/useToast';
import { isAxiosError } from 'axios';

const toast = useToast();
const route = useRoute();
const id = route.params.id as string;

const model = ref<CreateBookRequestDTO>({
  author: '',
  title: '',
});

const onFormSubmit = async () => {
  try {
    const response = await updateBook(id, model.value);
    model.value.author = response.author;
    model.value.title = response.title;
    toast.open('Book successfully updated!', ToastVariant.SUCCESS);
  } catch (error: any) {
    if (isAxiosError(error)) {
      toast.open(error.response?.data.message, ToastVariant.ERROR);
    }
  }
};

const fetchBookData = async () => {
  try {
    const response = await fetchBook(id);
    model.value.author = response.author;
    model.value.title = response.title;
  } catch (error: any) {
    if (isAxiosError(error)) {
      toast.open(error.response?.data.message, ToastVariant.ERROR);
    }
  }
};

fetchBookData();
</script>
