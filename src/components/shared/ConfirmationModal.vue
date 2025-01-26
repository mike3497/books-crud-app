<template>
  <div class="relative z-10">
    <Transition name="backdrop">
      <div v-if="isOpen" class="fixed inset-0 bg-black/50" @click="$emit('close')"></div>
    </Transition>
    <Transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 z-10 flex items-center justify-center">
        <div
          class="relative bg-white w-[512px] p-4 flex flex-col gap-4 rounded-lg border border-gray-300"
        >
          <div class="flex items-center justify-between">
            <h1 class="font-bold text-xl">{{ title }}</h1>
            <BaseButton @click="$emit('close')">X</BaseButton>
          </div>
          <p>
            {{ message }}
          </p>
          <div class="flex flex-row gap-2 justify-end mt-4">
            <BaseButton @click="$emit('close')">No</BaseButton>
            <BaseButton :variant="ButtonVariant.DANGER" @click="$emit('yesClick')">Yes</BaseButton>
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

defineProps<{
  isOpen: boolean;
  message: string;
  title: string;
}>();

defineEmits<{
  (e: 'close'): void;
  (e: 'yesClick'): void;
}>();
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

.modal-enter-active,
.modal-leave-active {
  transition:
    opacity 300ms ease-out,
    transform 300ms ease-out;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.modal-leave-active {
  transition:
    opacity 200ms ease-in,
    transform 200ms ease-in;
}
</style>
