<template>
  <div class="flex flex-col gap-2" :class="{ 'has-error': !!errorMessage }">
    <label class="font-bold" :for="name"
      >{{ label }}<span v-if="isRequired" class="text-red-700 ml-1">*</span></label
    >
    <textarea
      class="appearance-none block w-full px-2 py-2 bg-white border border-gray-300 focus-visible:outline-none focus-visible:border-blue-500 rounded-lg"
      type="text"
      rows="5"
      :id="name"
      :name="name"
      @input="handleChange"
      @blur="handleBlur"
      >{{ inputValue }}</textarea
    >
    <p class="text-red-700" v-show="errorMessage">
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
