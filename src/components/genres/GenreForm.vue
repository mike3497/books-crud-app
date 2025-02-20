<template>
  <form class="flex flex-col gap-4" @submit="onSubmit">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <TextInput name="name" label="Name" :isRequired="true" />
    </div>
    <div v-if="!isCreateMode" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="flex flex-col gap-2">
        <span class="font-bold">Created Date</span>
        <DateDisplay :value="createdAt" />
      </div>
      <div class="flex flex-col gap-2">
        <span class="font-bold">Updated Date</span>
        <DateDisplay :value="updatedAt" />
      </div>
    </div>
    <div>
      <BaseButton v-if="isCreateMode" type="submit" :variant="ButtonVariant.PRIMARY"
        ><Plus />Create</BaseButton
      >
      <BaseButton v-else type="submit" :variant="ButtonVariant.PRIMARY"><Save />Save</BaseButton>
    </div>
  </form>
  <ConfirmationModal
    message="Are you sure you want to save changes? This action cannot be undone."
    noText="Cancel"
    title="Save Changes?"
    yesText="Save"
    :isOpen="isConfirmationModalOpen"
    @close="closeConfirmationModal"
    @yes="updateGenreHandler"
  />
</template>

<script setup lang="ts">
import BaseButton from '@/components/shared/BaseButton.vue';
import ConfirmationModal from '@/components/shared/ConfirmationModal.vue';
import DateDisplay from '@/components/shared/DateDisplay.vue';
import TextInput from '@/components/shared/TextField.vue';
import { useConfirmationModal } from '@/composables/useConfirmationModal';
import { useToast } from '@/composables/useToast';
import { deepClone } from '@/helpers/generalUtils';
import type { CreateGenreRequestDTO } from '@/models/genres/createGenreRequestDTO';
import type { GenreDTO } from '@/models/genres/genreDTO';
import type { GenreForm } from '@/models/genres/genreForm';
import type { UpdateGenreRequestDTO } from '@/models/genres/updateGenreRequestDTO';
import { ToastVariant } from '@/models/toast';
import { createGenre, updateGenre } from '@/services/genresService';
import { ButtonVariant } from '@/types/buttonVariant';
import { isAxiosError } from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Plus, Save } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import * as Yup from 'yup';

dayjs.extend(utc);

const props = defineProps<{
  genreDTO?: GenreDTO;
  isCreateMode: boolean;
}>();

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
});

const { handleSubmit, setFieldValue } = useForm<GenreForm>({ validationSchema });
const router = useRouter();
const toast = useToast();
const { isConfirmationModalOpen, openConfirmationModal, closeConfirmationModal } =
  useConfirmationModal();

const createdAt = ref<Date>();
const updatedAt = ref<Date>();
const genreFormEditValues = ref<GenreForm>();

const onSubmit = handleSubmit(async (values: GenreForm) => {
  if (props.isCreateMode) {
    createGenreHandler(values);
  } else {
    genreFormEditValues.value = deepClone(values);
    openConfirmationModal();
  }
});

const createGenreHandler = async (values: GenreForm) => {
  try {
    const createGenreRequestDTO: CreateGenreRequestDTO = {
      name: values.name,
    };
    await createGenre(createGenreRequestDTO);
    toast.open('Genre successfully created!', ToastVariant.SUCCESS);
    router.push({ name: 'genres' });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      toast.open(error.response?.data.message, ToastVariant.ERROR);
    }
  }
};

const updateGenreHandler = async () => {
  try {
    const updateGenreRequestDTO: UpdateGenreRequestDTO = {
      id: props.genreDTO!.id,
      name: genreFormEditValues.value!.name,
    };
    const response = await updateGenre(updateGenreRequestDTO);
    setFieldValues(response);
    toast.open('Genre successfully updated!', ToastVariant.SUCCESS);
    genreFormEditValues.value = undefined;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      toast.open(error.response?.data.message, ToastVariant.ERROR);
    }
  } finally {
    closeConfirmationModal();
  }
};

const setFieldValues = (genreDTO: GenreDTO) => {
  createdAt.value = genreDTO.createdAt;
  setFieldValue('name', genreDTO.name);
  updatedAt.value = genreDTO.updatedAt;
};

onMounted(() => {
  if (props.genreDTO) {
    setFieldValues(props.genreDTO);
  }
});
</script>
