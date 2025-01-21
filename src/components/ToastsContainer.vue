<template>
  <Teleport to="#toast">
    <div class="fixed bottom-0 right-0 m-4">
      <div class="flex flex-col gap-4">
        <TransitionGroup name="list">
          <BaseToast v-for="toast in toastsStore.toasts" :key="toast.id" :toast="toast" />
        </TransitionGroup>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import BaseToast from '@/components/shared/BaseToast.vue';
import { useToastsStore } from '@/stores/toastsStore';

const toastsStore = useToastsStore();
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
