<template>
  <div v-if="isLoading" class="flex flex-col items-center justify-center p-8">
    <LoadingSpinner />
  </div>
  <table v-else class="table-auto border-collapse border border-gray-200 w-full">
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
          Genre
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
        <td class="px-4 py-2 border-b border-gray-200 text-sm">{{ book.genre }}</td>
        <td class="px-4 py-2 border-b border-gray-200 text-sm">
          <div class="flex flex-row gap-2">
            <BaseButton :variant="ButtonVariant.PRIMARY" @click="onEditClick(book.id)">
              <Pencil :size="16" />Edit
            </BaseButton>
            <BaseButton :variant="ButtonVariant.DANGER" @click="onDeleteClick(book.id)">
              <Trash :size="16" />Delete
            </BaseButton>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <ConfirmationModal
    message="Are you sure you want to delete this book? This action cannot be undone."
    noText="Cancel"
    title="Delete Book?"
    yesText="Delete"
    :isOpen="isModalOpen"
    @close="onModalClose"
    @yesClick="onModalYesClick"
  />
</template>

<script setup lang="ts">
import BaseButton from '@/components/shared/BaseButton.vue';
import ConfirmationModal from '@/components/shared/ConfirmationModal.vue';
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue';
import { useToast } from '@/composables/useToast';
import type { BookDTO } from '@/models/bookDTO';
import { ToastVariant } from '@/models/toast';
import { deleteBook, fetchBooks } from '@/services/booksService';
import { ButtonVariant } from '@/types/buttonVariant';
import { isAxiosError } from 'axios';
import { Pencil, Trash } from 'lucide-vue-next';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();

const books = ref<BookDTO[]>([]);
const isLoading = ref<boolean>(false);
const isModalOpen = ref<boolean>(false);
const bookToDeleteId = ref<string>('');

const onEditClick = (id: string) => {
  router.push({
    name: 'edit',
    params: {
      id,
    },
  });
};

const onDeleteClick = async (id: string) => {
  isModalOpen.value = true;
  bookToDeleteId.value = id;
};

const onModalClose = () => {
  isModalOpen.value = false;
  bookToDeleteId.value = '';
};

const onModalYesClick = async () => {
  isModalOpen.value = false;
  try {
    await deleteBook(bookToDeleteId.value);
    books.value = books.value.filter((item) => item.id !== bookToDeleteId.value);
    toast.open('Book successfully deleted!', ToastVariant.SUCCESS);
  } catch (error: any) {
    if (isAxiosError(error)) {
      toast.open(error.response?.data.message, ToastVariant.ERROR);
    }
  }
};

const fetchBooksData = async () => {
  try {
    isLoading.value = true;
    books.value = await fetchBooks();
  } catch (error: any) {
    if (isAxiosError(error)) {
      toast.open(error.response?.data.message, ToastVariant.ERROR);
    }
  } finally {
    isLoading.value = false;
  }
};

fetchBooksData();
</script>
