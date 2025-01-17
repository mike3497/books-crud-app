<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Create Book</h1>
    <nav class="mb-4">
      <ol class="flex flex-row items-center gap-2">
        <li>
          <RouterLink :to="{ name: 'home' }" class="underline">Home</RouterLink>
        </li>
        <li>
          <ChevronRight :size="16" />
        </li>
        <li>
          <span class="">Create Book</span>
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
      <BaseButton type="submit"><Plus :size="16" /><span>Create</span></BaseButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { CreateBookRequestDTO } from '@/models/createBookRequestDTO';
import { createBook } from '@/services/booksService';
import { ref } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import { Plus } from 'lucide-vue-next';
import { ChevronRight } from 'lucide-vue-next';

const model = ref<CreateBookRequestDTO>({
  author: '',
  title: '',
});

const onFormSubmit = async () => {
  try {
    const response = await createBook(model.value);
    console.log(response);
  } catch (error: any) {
    console.error(error);
  }
};
</script>
