<template>
  <form class="flex flex-col gap-4" @submit="onSubmit">
    <TextInput name="title" label="Title" />
    <TextInput name="author" label="Author" />
    <div>
      <BaseButton type="submit" :variant="ButtonVariant.PRIMARY"><Plus />Create</BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import BaseButton from '@/components/shared/BaseButton.vue';
import TextInput from '@/components/shared/TextInput.vue';
import { useToast } from '@/composables/useToast';
import type { CreateBookForm } from '@/models/createBookForm';
import type { CreateBookRequestDTO } from '@/models/createBookRequestDTO';
import { ToastVariant } from '@/models/toast';
import { createBook } from '@/services/booksService';
import { ButtonVariant } from '@/types/buttonVariant';
import { isAxiosError } from 'axios';
import { Plus } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  author: Yup.string().required('Author is required'),
  title: Yup.string().required('Title is required'),
});

const { handleSubmit, setFieldValue } = useForm<CreateBookForm>({ validationSchema });
const router = useRouter();
const toast = useToast();

const onSubmit = handleSubmit(async (values: CreateBookForm) => {
  try {
    const createBookRequestDTO: CreateBookRequestDTO = {
      author: values.author,
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
