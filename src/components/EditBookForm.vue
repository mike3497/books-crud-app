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
    <div class="grid grid-cols-2 gap-4">
      <div class="flex flex-col gap-2">
        <span class="font-bold">Created Date</span>
        <DateDisplay :value="bookDTO.createdAt" />
      </div>
      <div class="flex flex-col gap-2">
        <span class="font-bold">Updated Date</span>
        <DateDisplay :value="updatedAt" />
      </div>
    </div>
    <div>
      <BaseButton type="submit" :variant="ButtonVariant.PRIMARY"><Save />Save</BaseButton>
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
import type { BookDTO } from '@/models/bookDTO';
import type { EditBookForm } from '@/models/editBookForm';
import { ToastVariant } from '@/models/toast';
import type { UpdateBookRequestDTO } from '@/models/updateBookRequestDTO';
import { updateBook } from '@/services/booksService';
import { ButtonVariant } from '@/types/buttonVariant';
import { isAxiosError } from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Save } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { onMounted, ref } from 'vue';
import * as Yup from 'yup';
import DateDisplay from './shared/DateDisplay.vue';

dayjs.extend(utc);

const props = defineProps<{
  bookDTO: BookDTO;
}>();

const validationSchema = Yup.object().shape({
  author: Yup.string().required('Author is required'),
  description: Yup.string().required('Description is required'),
  genre: Yup.string().required('Genre is required'),
  isbn: Yup.string().required('ISBN is required'),
  publishedDate: Yup.date().required('Published Date is required'),
  title: Yup.string().required('Title is required'),
});

const { handleSubmit, setFieldValue } = useForm<EditBookForm>({ validationSchema });
const toast = useToast();

const updatedAt = ref<Date>(props.bookDTO.updatedAt);

const onSubmit = handleSubmit(async (values: EditBookForm) => {
  try {
    const updateBookRequestDTO: UpdateBookRequestDTO = {
      author: values.author,
      description: values.description,
      genre: values.genre,
      id: props.bookDTO.id,
      isbn: values.isbn,
      publishedAt: dayjs(values.publishedDate).utc().toISOString(),
      title: values.title,
    };
    const response = await updateBook(updateBookRequestDTO);
    setFieldValue('author', response.author);
    setFieldValue('description', response.description);
    setFieldValue('genre', response.genre);
    setFieldValue('isbn', response.isbn);
    setFieldValue('publishedDate', dayjs(response.publishedAt).format('YYYY-MM-DD'));
    setFieldValue('title', response.title);
    updatedAt.value = response.updatedAt;
    toast.open('Book successfully updated!', ToastVariant.SUCCESS);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      toast.open(error.response?.data.message, ToastVariant.ERROR);
    }
  }
});

onMounted(() => {
  setFieldValue('author', props.bookDTO.author);
  setFieldValue('description', props.bookDTO.description);
  setFieldValue('genre', props.bookDTO.genre);
  setFieldValue('isbn', props.bookDTO.isbn);
  setFieldValue('publishedDate', dayjs(props.bookDTO.publishedAt).format('YYYY-MM-DD'));
  setFieldValue('title', props.bookDTO.title);
});
</script>
