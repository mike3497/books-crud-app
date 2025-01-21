<template>
  <form class="flex flex-col gap-4" @submit="onSubmit">
    <TextInput name="title" label="Title" />
    <TextInput name="author" label="Author" />
    <div>
      <BaseButton type="submit" :variant="ButtonVariant.PRIMARY"><Save />Save</BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import TextInput from '@/components/TextInput.vue';
import { useToast } from '@/composables/useToast';
import type { BookDTO } from '@/models/bookDTO';
import type { EditBookForm } from '@/models/editBookForm';
import { ToastVariant } from '@/models/toast';
import type { UpdateBookRequestDTO } from '@/models/updateBookRequestDTO';
import { updateBook } from '@/services/booksService';
import { ButtonVariant } from '@/types/buttonVariant';
import { isAxiosError } from 'axios';
import { Save } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { onMounted } from 'vue';
import * as Yup from 'yup';

const props = defineProps<{
  bookDTO: BookDTO;
}>();

const validationSchema = Yup.object().shape({
  author: Yup.string().required('Author is required'),
  title: Yup.string().required('Title is required'),
});

const { handleSubmit, setFieldValue } = useForm<EditBookForm>({ validationSchema });
const toast = useToast();

const onSubmit = handleSubmit(async (values: EditBookForm) => {
  try {
    const updateBookRequestDTO: UpdateBookRequestDTO = {
      author: values.author,
      id: props.bookDTO.id,
      title: values.title,
    };
    await updateBook(updateBookRequestDTO);
    toast.open('Book successfully updated!', ToastVariant.SUCCESS);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      toast.open(error.response?.data.message, ToastVariant.ERROR);
    }
  }
});

onMounted(() => {
  setFieldValue('title', props.bookDTO.title);
  setFieldValue('author', props.bookDTO.author);
});
</script>
