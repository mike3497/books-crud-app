<template>
  <form class="flex flex-col gap-4" @submit="onSubmit">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <TextInput name="title" label="Title" :isRequired="true" />
      <TextInput name="author" label="Author" :isRequired="true" />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
      <DateField name="publishedDate" label="Published Date" :isRequired="true" />
      <SelectField name="genre" label="Genre" placeholder="Select a genre" :isRequired="true">
        <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
      </SelectField>
      <TextInput name="isbn" label="ISBN" :isRequired="false" />
    </div>
    <TextAreaInput name="description" label="Description" :isRequired="true" />
    <div>
      <BaseButton type="submit" :variant="ButtonVariant.PRIMARY"><Plus />Create</BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import BaseButton from '@/components/shared/BaseButton.vue';
import DateField from '@/components/shared/DateField.vue';
import SelectField from '@/components/shared/SelectField.vue';
import TextAreaInput from '@/components/shared/TextAreaField.vue';
import TextInput from '@/components/shared/TextField.vue';
import { useToast } from '@/composables/useToast';
import type { CreateBookForm } from '@/models/books/createBookForm';
import type { CreateBookRequestDTO } from '@/models/books/createBookRequestDTO';
import type { GenreDTO } from '@/models/genres/genreDTO';
import { ToastVariant } from '@/models/toast';
import { createBook } from '@/services/booksService';
import { fetchGenres } from '@/services/genresService';
import { ButtonVariant } from '@/types/buttonVariant';
import { isAxiosError } from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Plus } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import * as Yup from 'yup';

dayjs.extend(utc);

const validationSchema = Yup.object().shape({
  author: Yup.string().required('Author is required'),
  description: Yup.string().required('Description is required'),
  genre: Yup.string().required('Genre is required'),
  publishedDate: Yup.string().required('Published Date is required'),
  title: Yup.string().required('Title is required'),
});

const { handleSubmit } = useForm<CreateBookForm>({ validationSchema });
const router = useRouter();
const toast = useToast();

const genres = ref<GenreDTO[]>([]);

const onSubmit = handleSubmit(async (values: CreateBookForm) => {
  try {
    const createBookRequestDTO: CreateBookRequestDTO = {
      author: values.author,
      description: values.description,
      genreId: values.genre,
      isbn: values.isbn,
      publishedAt: dayjs(values.publishedDate).utc().toISOString(),
      title: values.title,
    };
    await createBook(createBookRequestDTO);
    toast.open('Book successfully created!', ToastVariant.SUCCESS);
    router.push({ name: 'books' });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      toast.open(error.response?.data.message, ToastVariant.ERROR);
    }
  }
});

const fetchGenresData = async () => {
  try {
    genres.value = await fetchGenres();
  } catch (error) {
    if (isAxiosError(error)) {
      toast.open(error.response?.data.message, ToastVariant.ERROR);
    }
  }
};

fetchGenresData();
</script>
