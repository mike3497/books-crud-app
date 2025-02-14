<template>
  <div class="relative z-10">
    <Transition name="backdrop">
      <div v-if="isOpen" class="fixed inset-0 bg-black/50 dark:bg-black/70"></div>
    </Transition>
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-10 flex items-center justify-center px-4"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="title"
      >
        <div
          class="relative bg-white dark:bg-gray-800 w-[512px] p-4 flex flex-col gap-4 rounded-lg border border-gray-300 dark:border-gray-700"
        >
          <div class="flex items-center justify-between">
            <h1 class="font-bold text-xl" :id="title">{{ title }}</h1>
            <BaseButton @click="close">X</BaseButton>
          </div>
          <p>{{ message }}</p>
          <div class="flex flex-row gap-2 justify-end mt-4">
            <BaseButton :variant="noVariant" @click="close">{{ noText }}</BaseButton>
            <BaseButton :variant="yesVariant" @click="yes">{{ yesText }}</BaseButton>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/shared/BaseButton.vue';
import { ButtonVariant } from '@/types/buttonVariant';
import { defineProps } from 'vue';

withDefaults(
  defineProps<{
    isOpen: boolean;
    message: string;
    noText: string;
    noVariant?: ButtonVariant;
    title: string;
    yesText?: string;
    yesVariant?: ButtonVariant;
  }>(),
  {
    noText: 'No',
    noVariant: ButtonVariant.DEFAULT,
    yesText: 'Yes',
    yesVariant: ButtonVariant.PRIMARY,
  },
);

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'yes'): void;
}>();

const close = () => {
  emit('close');
};

const yes = () => {
  emit('yes');
};
</script>

<style scoped>
.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 300ms ease-out;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

.backdrop-leave-active {
  transition: opacity 200ms ease-in;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.modal-enter-active,
.modal-leave-active {
  transition: all 300ms ease-in-out;
}

.modal-leave-active {
  transition: all 200ms ease-in-out;
}
</style>
