<template>
  <form class="flex flex-col gap-4" @submit="onSubmit">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <TextInput name="title" label="Title" :isRequired="true" />
      <TextInput name="author" label="Author" :isRequired="true" />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
      <DateField name="publishedDate" label="Published Date" :isRequired="true" />
      <SelectField name="genre" label="Genre" :isRequired="true">
        <option value="Biography/Autobiography">Biography/Autobiography</option>
        <option value="Children's">Children's</option>
        <option value="Classics">Classics</option>
        <option value="Comedy">Comedy</option>
        <option value="Contemporary">Contemporary</option>
        <option value="Drama">Drama</option>
        <option value="Dystopian">Dystopian</option>
        <option value="Epic Fantasy">Epic Fantasy</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Graphic Novel">Graphic Novel</option>
        <option value="Historical Fiction">Historical Fiction</option>
        <option value="History">History</option>
        <option value="Horror">Horror</option>
        <option value="Magical Realism">Magical Realism</option>
        <option value="Memoir">Memoir</option>
        <option value="Mystery">Mystery</option>
        <option value="Non-Fiction">Non-Fiction</option>
        <option value="Other">Other</option>
        <option value="Paranormal">Paranormal</option>
        <option value="Philosophical">Philosophical</option>
        <option value="Poetry">Poetry</option>
        <option value="Political Thriller">Political Thriller</option>
        <option value="Religious">Religious</option>
        <option value="Romance">Romance</option>
        <option value="Science">Science</option>
        <option value="Science Fiction">Science Fiction</option>
        <option value="Self-Help">Self-Help</option>
        <option value="Short Stories">Short Stories</option>
        <option value="Thriller">Thriller</option>
        <option value="Travel">Travel</option>
        <option value="True Crime">True Crime</option>
        <option value="Western">Western</option>
        <option value="Young Adult (YA)">Young Adult (YA)</option>
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
import type { CreateBookForm } from '@/models/createBookForm';
import type { CreateBookRequestDTO } from '@/models/createBookRequestDTO';
import { ToastVariant } from '@/models/toast';
import { createBook } from '@/services/booksService';
import { ButtonVariant } from '@/types/buttonVariant';
import { isAxiosError } from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useForm } from 'vee-validate';
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
