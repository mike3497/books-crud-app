<template>
  <div v-if="isSpinnerVisible" class="flex flex-col items-center justify-center p-8">
    <LoadingSpinner />
  </div>
  <div v-else class="overflow-auto">
    <table class="border-collapse w-full text-sm text-gray-900 dark:text-gray-100">
      <thead>
        <tr>
          <th class="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-left" scope="col">
            Name
          </th>
          <th class="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-left" scope="col">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="genres.length === 0">
          <td colspan="2" class="px-4 py-2 text-center text-gray-500 dark:text-gray-400">
            No Genres found
          </td>
        </tr>
        <tr
          v-else
          v-for="genre in genres"
          :key="genre.id"
          class="bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <td class="px-4 py-2 border-b border-gray-300 dark:border-gray-700">{{ genre.name }}</td>
          <td class="px-4 py-2 border-b border-gray-300 dark:border-gray-700">
            <div class="flex flex-row gap-2">
              <BaseButton :variant="ButtonVariant.PRIMARY" @click="onEditClick(genre.id)">
                <Pencil :size="16" />Edit
              </BaseButton>
              <BaseButton :variant="ButtonVariant.DANGER" @click="onDeleteClick(genre.id)">
                <Trash :size="16" />Delete
              </BaseButton>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <ConfirmationModal
    message="Are you sure you want to delete this genre? This action cannot be undone."
    noText="Cancel"
    title="Delete Genre?"
    yesText="Delete"
    :isOpen="isModalOpen"
    @close="onModalClose"
    @yes="onModalYesClick"
  />
</template>

<script setup lang="ts">
import BaseButton from '@/components/shared/BaseButton.vue';
import ConfirmationModal from '@/components/shared/ConfirmationModal.vue';
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue';
import { useToast } from '@/composables/useToast';
import type { GenreDTO } from '@/models/genres/genreDTO';
import { ToastVariant } from '@/models/toast';
import { deleteGenre, fetchGenres } from '@/services/genresService';
import { ButtonVariant } from '@/types/buttonVariant';
import { isAxiosError } from 'axios';
import { Pencil, Trash } from 'lucide-vue-next';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();

const genres = ref<GenreDTO[]>([]);
const isLoading = ref<boolean>(false);
const isSpinnerVisible = ref<boolean>(false);
const isModalOpen = ref<boolean>(false);
const genreToDeleteId = ref<string>('');

const onEditClick = (id: string) => {
  router.push({
    name: 'edit-genre',
    params: {
      id,
    },
  });
};

const onDeleteClick = async (id: string) => {
  isModalOpen.value = true;
  genreToDeleteId.value = id;
};

const onModalClose = () => {
  isModalOpen.value = false;
  genreToDeleteId.value = '';
};

const onModalYesClick = async () => {
  isModalOpen.value = false;
  try {
    await deleteGenre(genreToDeleteId.value);
    genres.value = genres.value.filter((item) => item.id !== genreToDeleteId.value);
    toast.open('Genre successfully deleted!', ToastVariant.SUCCESS);
  } catch (error: any) {
    if (isAxiosError(error)) {
      toast.open(error.response?.data.message, ToastVariant.ERROR);
    }
  }
};

const fetchGenresData = async () => {
  try {
    isLoading.value = true;
    const spinnerTimeout = setTimeout(() => {
      isSpinnerVisible.value = true;
    }, 200);

    const genresData = await fetchGenres();
    clearTimeout(spinnerTimeout);
    genres.value = genresData;
  } catch (error: any) {
    if (isAxiosError(error)) {
      toast.open(error.response?.data.message, ToastVariant.ERROR);
    }
  } finally {
    isLoading.value = false;
    isSpinnerVisible.value = false;
  }
};

fetchGenresData();
</script>
