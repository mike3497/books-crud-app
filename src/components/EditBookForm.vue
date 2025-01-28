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
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
  <ConfirmationModal
    message="Are you sure you want to save changes? This action cannot be undone."
    noText="Cancel"
    title="Save Changes?"
    yesText="Save"
    :isOpen="isModalOpen"
    @close="onModalClose"
    @yesClick="onModalYesClick"
  />
</template>

<script setup lang="ts">
import BaseButton from '@/components/shared/BaseButton.vue';
import ConfirmationModal from '@/components/shared/ConfirmationModal.vue';
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
  publishedDate: Yup.date().required('Published Date is required'),
  title: Yup.string().required('Title is required'),
});

const { handleSubmit, setFieldValue, values } = useForm<EditBookForm>({ validationSchema });
const toast = useToast();

const isModalOpen = ref<boolean>(false);
const updatedAt = ref<Date>(props.bookDTO.updatedAt);

const onModalClose = () => {
  isModalOpen.value = false;
};

const onModalYesClick = async () => {
  isModalOpen.value = false;
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
};

const onSubmit = handleSubmit(() => {
  isModalOpen.value = true;
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
