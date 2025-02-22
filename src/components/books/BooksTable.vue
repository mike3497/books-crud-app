<template>
  <div v-if="isSpinnerVisible" class="flex flex-col items-center justify-center p-8">
    <LoadingSpinner />
  </div>
  <div v-else class="overflow-auto">
    <table class="border-collapse w-full text-sm text-gray-900 dark:text-gray-100">
      <thead>
        <tr>
          <th class="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-left">Title</th>
          <th class="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-left">Author</th>
          <th class="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-left">Genre</th>
          <th class="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="books.length === 0">
          <td colspan="4" class="px-4 py-2 text-center text-gray-500 dark:text-gray-400">
            No Books found
          </td>
        </tr>
        <tr
          v-else
          v-for="book in books"
          :key="book.id"
          class="bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <td class="px-4 py-2 border-b border-gray-300 dark:border-gray-700">{{ book.title }}</td>
          <td class="px-4 py-2 border-b border-gray-300 dark:border-gray-700">{{ book.author }}</td>
          <td class="px-4 py-2 border-b border-gray-300 dark:border-gray-700">
            {{ book.genre.name }}
          </td>
          <td class="px-4 py-2 border-b border-gray-300 dark:border-gray-700">
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
    :isOpen="isConfirmationModalOpen"
    @close="onModalClose"
    @yes="onModalYesClick"
  />
</template>

<script setup lang="ts">
import BaseButton from '@/components/shared/BaseButton.vue';
import ConfirmationModal from '@/components/shared/ConfirmationModal.vue';
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue';
import { useConfirmationModal } from '@/composables/useConfirmationModal';
import { useToast } from '@/composables/useToast';
import type { BookDTO } from '@/models/books/bookDTO';
import { ToastVariant } from '@/models/toast';
import { deleteBook, fetchBooks } from '@/services/booksService';
import { ButtonVariant } from '@/types/buttonVariant';
import { isAxiosError } from 'axios';
import { Pencil, Trash } from 'lucide-vue-next';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();
const { isConfirmationModalOpen, openConfirmationModal, closeConfirmationModal } =
  useConfirmationModal();

const books = ref<BookDTO[]>([]);
const isLoading = ref<boolean>(false);
const isSpinnerVisible = ref<boolean>(false);
const bookToDeleteId = ref<string>();

const onEditClick = (id: string) => {
  router.push({
    name: 'edit-book',
    params: {
      id,
    },
  });
};

const onDeleteClick = async (id: string) => {
  openConfirmationModal();
  bookToDeleteId.value = id;
};

const onModalClose = () => {
  closeConfirmationModal();
  bookToDeleteId.value = undefined;
};

const onModalYesClick = async () => {
  try {
    await deleteBook(bookToDeleteId.value!);
    books.value = books.value.filter((item) => item.id !== bookToDeleteId.value);
    toast.open('Book successfully deleted!', ToastVariant.SUCCESS);
  } catch (error: any) {
    if (isAxiosError(error)) {
      toast.open(error.response?.data.message, ToastVariant.ERROR);
    }
  } finally {
    closeConfirmationModal();
  }
};

const fetchBooksData = async () => {
  try {
    isLoading.value = true;
    const spinnerTimeout = setTimeout(() => {
      isSpinnerVisible.value = true;
    }, 200);

    const booksData = await fetchBooks();
    clearTimeout(spinnerTimeout);
    books.value = booksData;
  } catch (error: any) {
    if (isAxiosError(error)) {
      toast.open(error.response?.data.message, ToastVariant.ERROR);
    }
  } finally {
    isLoading.value = false;
    isSpinnerVisible.value = false;
  }
};

fetchBooksData();
</script>
