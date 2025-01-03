<template>
    <div class="relative min-h-screen bg-gray-50">
      <Sidebar />
      <div class="md:ml-64 xl:ml-72 flex-1 flex flex-col">
        <Topbar />
        <main class="p-4 md:p-6">
          <slot></slot> <!-- This slot will render the content of the child components -->
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import Sidebar from './Sidebar.vue';
  import Topbar from './Topbar.vue';
  </script>
  
  <style scoped>
  /* Ajoutez ici les styles nécessaires */
  </style>