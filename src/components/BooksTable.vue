<template>
  <div v-if="isLoading" class="flex flex-col items-center justify-center p-8">
    <LoadingSpinner />
  </div>
  <div v-else class="overflow-auto">
    <table class="border-collapse w-full text-sm">
      <thead>
        <tr>
          <th class="px-4 py-2 border-b border-gray-300 text-left">Title</th>
          <th class="px-4 py-2 border-b border-gray-300 text-left">Author</th>
          <th class="px-4 py-2 border-b border-gray-300 text-left">Genre</th>
          <th class="px-4 py-2 border-b border-gray-300 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id" class="bg-white border-b border-gray-300">
          <td class="px-4 py-2 border-b border-gray-300">{{ book.title }}</td>
          <td class="px-4 py-2 border-b border-gray-300">{{ book.author }}</td>
          <td class="px-4 py-2 border-b border-gray-300">{{ book.genre }}</td>
          <td class="px-4 py-2 border-b border-gray-300">
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
  </div>
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
