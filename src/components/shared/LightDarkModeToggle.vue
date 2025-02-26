<template>
  <div class="flex items-center gap-4">
    <BaseButton @click="toggleDark()">
      <span v-if="isDark" class="flex items-center gap-2">
        <Sun />
        <span class="sr-only">Light Mode</span>
      </span>
      <span v-else class="flex items-center gap-2">
        <Moon />
        <span class="sr-only">Dark Mode</span>
      </span>
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/shared/BaseButton.vue';
import { useDark, useToggle } from '@vueuse/core';
import { Moon, Sun } from 'lucide-vue-next';

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
