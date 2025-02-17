<template>
  <span>{{ formattedValue }}</span>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { computed } from 'vue';

const props = defineProps<{
  value?: string | Date;
}>();

const formattedValue = computed<string>(() => {
  return dayjs(props.value).format('MM/DD/YYYY h:mm:ss A');
});
</script>
