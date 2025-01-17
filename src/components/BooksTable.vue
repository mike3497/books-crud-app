<template>
  <table class="table-auto border-collapse border border-gray-200 w-full">
    <thead>
      <tr>
        <th
          class="px-4 py-2 bg-gray-50 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
        >
          Title
        </th>
        <th
          class="px-4 py-2 bg-gray-50 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
        >
          Author
        </th>
        <th
          class="px-4 py-2 bg-gray-50 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
        >
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="book in books" :key="book.id" class="bg-white border-b border-gray-200">
        <td class="px-4 py-2 border-b border-gray-200 text-sm">{{ book.title }}</td>
        <td class="px-4 py-2 border-b border-gray-200 text-sm">{{ book.author }}</td>
        <td class="px-4 py-2 border-b border-gray-200 text-sm">
          <div class="flex flex-row gap-2">
            <BaseButton @click="onEditClick(book.id)"
              ><Pencil :size="16" /><span>Edit</span></BaseButton
            >
            <BaseButton @click="onDeleteClick(book.id)"
              ><Trash :size="16" /><span>Delete</span></BaseButton
            >
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { BookDTO } from '@/models/bookDTO';
import { deleteBook, fetchBooks } from '@/services/booksService';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseButton from './BaseButton.vue';
import { Pencil } from 'lucide-vue-next';
import { Trash } from 'lucide-vue-next';

const router = useRouter();

const books = ref<BookDTO[]>([]);

const onEditClick = (id: string) => {
  router.push({
    name: 'edit',
    params: {
      id,
    },
  });
};

const onDeleteClick = async (id: string) => {
  try {
    await deleteBook(id);

    books.value = books.value.filter((item) => item.id !== id);
  } catch (error: any) {
    console.error(error);
  }
};

const fetchBooksData = async () => {
  try {
    books.value = await fetchBooks();
  } catch (error: any) {
    console.error(error);
  }
};

fetchBooksData();
</script>
