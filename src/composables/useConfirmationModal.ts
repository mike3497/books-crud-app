import { ref } from 'vue';

export const useConfirmationModal = () => {
  const isConfirmationModalOpen = ref<boolean>(false);

  const openConfirmationModal = () => {
    isConfirmationModalOpen.value = true;
  };

  const closeConfirmationModal = () => {
    isConfirmationModalOpen.value = false;
  };

  return {
    isConfirmationModalOpen,
    openConfirmationModal,
    closeConfirmationModal,
  };
};
