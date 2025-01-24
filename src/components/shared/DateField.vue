<template>
  <div class="flex flex-col gap-2" :class="{ 'has-error': !!errorMessage }">
    <label class="font-bold" :for="name">{{ label }}</label>
    <input
      class="block w-full px-4 py-2 border border-gray-300 focus-visible:outline-none focus-visible:border-blue-500 rounded-lg"
      type="date"
      :id="name"
      :name="name"
      :value="inputValue"
      @input="handleChange"
      @blur="handleBlur"
    />
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
  name: string;
  value?: string;
}>();

const name = toRef(props, 'name');

const { value: inputValue, errorMessage, handleBlur, handleChange } = useField(name);
</script>
