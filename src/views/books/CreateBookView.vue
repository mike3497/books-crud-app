<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Create Book</h1>
    <nav class="mb-4">
      <ol class="flex flex-row items-center gap-2">
        <li>
          <RouterLink :to="{ name: 'books' }" class="underline">Books</RouterLink>
        </li>
        <li>
          <ChevronRight :size="16" />
        </li>
        <li>
          <span class="">Create Book</span>
        </li>
      </ol>
    </nav>
    <BaseCard>
      <BookForm :isCreateMode="true" />
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import BookForm from '@/components/books/BookForm.vue';
import BaseCard from '@/components/shared/BaseCard.vue';
import { ChevronRight } from 'lucide-vue-next';
</script>
