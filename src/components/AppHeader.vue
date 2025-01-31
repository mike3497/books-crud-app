<template>
  <header class="bg-white border-b border-gray-300">
    <div class="container mx-auto px-4 h-16 flex flex-row items-center justify-between">
      <RouterLink :to="{ name: 'home' }">
        <h1 class="font-bold text-2xl">Books CRUD App</h1>
      </RouterLink>
    </div>
  </header>
</template>
