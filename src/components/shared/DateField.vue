<template>
  <div class="flex flex-col gap-2" :class="{ 'has-error': !!errorMessage }">
    <label class="font-bold" :for="name"
      >{{ label
      }}<span v-if="isRequired" class="text-red-600 dark:text-red-300 ml-1">*</span></label
    >
    <input
      class="appearance-none block w-full px-2 h-[42px] bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus-visible:outline-none focus-visible:border-blue-500 rounded-lg"
      type="date"
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

<style scoped>
input::-webkit-datetime-edit {
  display: flex;
  justify-content: start;
  align-items: center;
  height: 100%;
}

input::-webkit-date-and-time-value {
  text-align: left;
  margin-top: 8px;
}

input[type='date']::-webkit-calendar-picker-indicator {
  filter: invert(0);
}

.dark input[type='date']::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
</style>
