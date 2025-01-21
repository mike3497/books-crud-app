<template>
  <button
    :class="buttonClass"
    class="flex flex-row gap-1 items-center px-4 py-2 rounded-lg"
    type="button"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { ButtonVariant } from '@/types/buttonVariant';
import { computed, withDefaults } from 'vue';

const props = withDefaults(
  defineProps<{
    outline?: boolean;
    variant?: ButtonVariant;
  }>(),
  {
    outline: false,
    variant: ButtonVariant.DEFAULT,
  },
);

const buttonClass = computed<string>(() => {
  if (props.outline) {
    switch (props.variant) {
      case ButtonVariant.DANGER:
        return 'border border-red-500 text-red-500 hover:bg-red-500 hover:text-white';
      case ButtonVariant.INFO:
        return 'border border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-white';
      case ButtonVariant.PRIMARY:
        return 'border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white';
      case ButtonVariant.SUCCESS:
        return 'border border-green-500 text-green-500 hover:bg-green-500 hover:text-white';
      case ButtonVariant.WARNING:
        return 'border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white';
      default:
        return 'border border-gray-200 text-black hover:bg-gray-200';
    }
  } else {
    switch (props.variant) {
      case ButtonVariant.DANGER:
        return 'bg-red-500 text-white hover:bg-red-600';
      case ButtonVariant.INFO:
        return 'bg-blue-300 text-white hover:bg-blue-400';
      case ButtonVariant.PRIMARY:
        return 'bg-blue-500 text-white hover:bg-blue-600';
      case ButtonVariant.SUCCESS:
        return 'bg-green-500 text-white hover:bg-green-600';
      case ButtonVariant.WARNING:
        return 'bg-yellow-500 text-white hover:bg-yellow-600';
      default:
        return 'bg-gray-200 text-black hover:bg-gray-300';
    }
  }
});
</script>
