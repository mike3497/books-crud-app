<template>
  <div class="flex flex-col gap-2" :class="{ 'has-error': !!errorMessage }">
    <label class="font-bold" :for="name"
      >{{ label
      }}<span v-if="isRequired" class="text-red-600 dark:text-red-300 ml-1">*</span></label
    >
    <input
      class="appearance-none block w-full px-2 h-[42px] bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus-visible:outline-none focus-visible:border-blue-500 rounded-lg transition-colors duration-300"
      type="text"
      :id="name"
      :name="name"
      :value="inputValue"
      @input="handleChange"
      @blur="handleBlur"
    />
    <p class="text-red-600 dark:text-red-300" v-show="errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
import { toRef } from 'vue';

const props = defineProps<{
  label: string;
  isRequired: boolean;
  name: string;
  value?: string;
}>();

const name = toRef(props, 'name');

const { value: inputValue, errorMessage, handleBlur, handleChange } = useField(name);
</script>
