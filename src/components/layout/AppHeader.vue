<template>
  <header class="bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
    <div class="container mx-auto px-4 h-16 flex flex-row items-center justify-between">
      <div class="flex gap-8 items-center">
        <RouterLink :to="{ name: 'books' }">
          <h1 class="font-bold text-2xl">Books CRUD App</h1>
        </RouterLink>
        <nav class="flex gap-4">
          <RouterLink :to="{ name: 'books' }" activeClass="font-bold">Books</RouterLink>
          <RouterLink :to="{ name: 'genres' }" activeClass="font-bold">Genres</RouterLink>
        </nav>
      </div>
      <div>
        <button
          @click="toggleDark()"
          class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <span v-if="isDark" class="flex items-center gap-2">
            <Sun />
            <span class="sr-only">Light Mode</span>
          </span>
          <span v-else class="flex items-center gap-2">
            <Moon />
            <span class="sr-only">Dark Mode</span>
          </span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import { Moon, Sun } from 'lucide-vue-next';

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
