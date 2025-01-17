<template>
  <div :class="backgroundClass" class="flex flex-row items-center gap-4 p-4" role="alert">
    <div>
      <component :is="icon" :size="32" />
    </div>
    <div class="flex flex-col gap-1">
      <h1 class="font-bold text-xl">{{ heading }}</h1>
      <p>{{ toast.message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ToastVariant, type Toast } from '@/models/toast';
import { type Component, computed, type PropType } from 'vue';
import { CircleCheck, TriangleAlert, CircleAlert, CircleX } from 'lucide-vue-next';

const props = defineProps({
  toast: {
    type: Object as PropType<Toast>,
    required: true,
  },
});

const backgroundClass = computed<string>(() => {
  switch (props.toast.variant) {
    case ToastVariant.ERROR:
      return 'bg-red-400';
    case ToastVariant.INFO:
      return 'bg-blue-400';
    case ToastVariant.SUCCESS:
      return 'bg-green-400';
    case ToastVariant.WARNING:
      return 'bg-yellow-400';
    default:
      return '';
  }
});

const heading = computed<string>(() => {
  switch (props.toast.variant) {
    case ToastVariant.ERROR:
      return 'Error';
    case ToastVariant.INFO:
      return 'Info';
    case ToastVariant.SUCCESS:
      return 'Success';
    case ToastVariant.WARNING:
      return 'Warning';
    default:
      return '';
  }
});

const icon = computed<Component>(() => {
  switch (props.toast.variant) {
    case ToastVariant.ERROR:
      return CircleX;
    case ToastVariant.INFO:
      return CircleAlert;
    case ToastVariant.SUCCESS:
      return CircleCheck;
    default:
      return TriangleAlert;
  }
});
</script>
