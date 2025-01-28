<template>
  <div class="flex flex-col gap-2" :class="{ 'has-error': !!errorMessage }">
    <label class="font-bold" :for="name"
      >{{ label }}<span v-if="isRequired" class="text-red-700 ml-1">*</span></label
    >
    <div class="relative">
      <select
        class="appearance-none block w-full px-2 h-[42px] border border-gray-300 focus-visible:outline-none focus-visible:border-blue-500 rounded-lg appearance-none"
        :id="name"
        :name="name"
        :value="inputValue"
        @input="handleChange"
        @blur="handleBlur"
      >
        <option disabled value="">Select an option</option>
        <slot></slot>
      </select>
      <div class="absolute top-1/2 right-2 transform -translate-y-1/2">
        <ChevronDown />
      </div>
    </div>
    <p class="text-red-700" v-show="errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next';
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
