<template>
  <form class="flex flex-col gap-4" @submit="onSubmit">
    <div class="grid grid-cols-2 gap-2">
      <TextInput name="title" label="Title" />
      <TextInput name="author" label="Author" />
    </div>
    <div class="grid grid-cols-3 gap-2">
      <DateField name="publishedDate" label="Published Date" />
      <SelectField name="genre" label="Genre">
        <option value="Biography/Autobiography">Biography/Autobiography</option>
        <option value="Children's">Children's</option>
        <option value="Contemporary">Contemporary</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Historical Fiction">Historical Fiction</option>
        <option value="Horror">Horror</option>
        <option value="History">History</option>
        <option value="Memoir">Memoir</option>
        <option value="Mystery">Mystery</option>
        <option value="Romance">Romance</option>
        <option value="Science">Science</option>
        <option value="Science Fiction">Science Fiction</option>
        <option value="Self-Help">Self-Help</option>
        <option value="Thriller">Thriller</option>
        <option value="Travel">Travel</option>
        <option value="True Crime">True Crime</option>
        <option value="Young Adult (YA)">Young Adult (YA)</option>
      </SelectField>
      <TextInput name="isbn" label="ISBN" />
    </div>
    <TextAreaInput name="description" label="Description" />
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
import type { CreateBookForm } from '@/models/createBookForm';
import type { CreateBookRequestDTO } from '@/models/createBookRequestDTO';
import { ToastVariant } from '@/models/toast';
import { createBook } from '@/services/booksService';
import { ButtonVariant } from '@/types/buttonVariant';
import { isAxiosError } from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Plus } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import * as Yup from 'yup';

dayjs.extend(utc);

const validationSchema = Yup.object().shape({
  author: Yup.string().required('Author is required'),
  description: Yup.string().required('Description is required'),
  genre: Yup.string().required('Genre is required'),
  isbn: Yup.string().required('ISBN is required'),
  publishedDate: Yup.string().required('Published Date is required'),
  title: Yup.string().required('Title is required'),
});

const { handleSubmit } = useForm<CreateBookForm>({ validationSchema });
const router = useRouter();
const toast = useToast();

const onSubmit = handleSubmit(async (values: CreateBookForm) => {
  try {
    const createBookRequestDTO: CreateBookRequestDTO = {
      author: values.author,
      description: values.description,
      genre: values.genre,
      isbn: values.isbn,
      publishedAt: dayjs(values.publishedDate).utc().toISOString(),
      title: values.title,
    };
    await createBook(createBookRequestDTO);
    toast.open('Book successfully created!', ToastVariant.SUCCESS);
    router.push({ name: 'home' });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      toast.open(error.response?.data.message, ToastVariant.ERROR);
    }
  }
});
</script>
