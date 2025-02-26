<template>
  <header
    ref="target"
    class="fixed top-0 left-0 w-full h-16 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center px-4 z-20"
  >
    <RouterLink class="font-bold" :to="{ name: 'books' }">Books CRUD App</RouterLink>
    <nav v-if="!small" class="flex items-center gap-4">
      <RouterLink activeClass="font-bold" :to="{ name: 'books' }">Books</RouterLink>
      <RouterLink activeClass="font-bold" :to="{ name: 'genres' }">Genres</RouterLink>
      <LightDarkModeToggle />
    </nav>
    <div v-else class="flex items-center gap-2">
      <LightDarkModeToggle />
      <BaseButton
        ariaLabel="Toggle navigation menu"
        :ariaExpanded="isMenuOpen.toString()"
        @click="onMenuClick"
      >
        <Menu v-if="!isMenuOpen" class="fa-solid fa-bars" />
        <X v-else class="fa-solid fa-xmark" />
      </BaseButton>
    </div>
    <Transition name="slide-in-right">
      <div
        v-if="isMenuOpen"
        class="fixed top-16 right-0 w-64 h-svh bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 p-6 border-l z-20"
        role="navigation"
        ariaLabel="mobile navigation"
      >
        <nav class="flex flex-col items-start gap-4">
          <RouterLink
            activeClass="font-bold text-lg"
            :to="{ name: 'books' }"
            @click="onRouterLinkClick"
            >Books</RouterLink
          >
          <hr class="w-full border-t border-gray-300 dark:border-gray-700" />
          <RouterLink
            activeClass="font-bold text-lg"
            :to="{ name: 'genres' }"
            @click="onRouterLinkClick"
            >Genres</RouterLink
          >
        </nav>
      </div>
    </Transition>
  </header>
  <Transition name="fade">
    <div
      v-if="isMenuOpen"
      class="fixed left-0 top-0 w-full h-svh bg-black/50 dark:bg-black/70 backdrop-blur-sm z-10"
    ></div>
  </Transition>
</template>

<script setup lang="ts">
import BaseButton from '@/components/shared/BaseButton.vue';
import LightDarkModeToggle from '@/components/shared/LightDarkModeToggle.vue';
import { breakpointsTailwind, onClickOutside, useBreakpoints } from '@vueuse/core';
import { Menu, X } from 'lucide-vue-next';
import { onUnmounted, ref, watch } from 'vue';

const breakpoints = useBreakpoints(breakpointsTailwind, { ssrWidth: 768 });

const isMenuOpen = ref<boolean>(false);
const target = ref(null);

const small = breakpoints.smallerOrEqual('sm');

const onMenuClick = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const onRouterLinkClick = () => {
  isMenuOpen.value = false;
};

onClickOutside(target, () => {
  isMenuOpen.value = false;
});

const preventScroll = () => {
  document.body.style.overflow = 'hidden';
};

const allowScroll = () => {
  document.body.style.overflow = '';
};

watch(isMenuOpen, (newValue) => {
  if (newValue) {
    preventScroll();
  } else {
    allowScroll();
  }
});

onUnmounted(() => {
  allowScroll();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-in-right-enter-active,
.slide-in-right-leave-active {
  transition: transform 0.3s ease;
}
.slide-in-right-enter-from {
  transform: translateX(100%);
}
.slide-in-right-enter-to {
  transform: translateX(0);
}
.slide-in-right-leave-from {
  transform: translateX(0);
}
.slide-in-right-leave-to {
  transform: translateX(100%);
}
</style>
