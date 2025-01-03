<template>
  <div class="relative">
    <!-- Mobile Toggle Button -->
    <button
      @click="toggleSidebar"
      class="fixed z-50 p-2 text-white rounded-lg md:hidden top-4 left-4 bg-emerald-600 hover:bg-emerald-700 focus:outline-none"
      aria-label="Toggle Menu"
    >
      <i :class="['fas', isSidebarOpen ? 'fa-times' : 'fa-bars']"></i>
    </button>

    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-40 flex flex-col h-full transition-transform duration-300 transform bg-white border-r md:translate-x-0"
      :class="[
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'w-64 xl:w-72',
      ]"
    >
      <!-- Logo Section -->
      <div class="p-4 space-y-4">
        <div class="flex items-center justify-center">
          <img
            src="/images/logo/logo-adna.png"
            alt="Logo ADNA"
            class="w-24 h-auto transition-transform duration-300 hover:scale-105"
          />
        </div>
        <h2 class="text-lg font-bold text-center text-gray-800">
          Congrès NDOGBATJECK
        </h2>
        <div
          class="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-emerald-500 to-green-500"
        ></div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-4 pb-4 mt-5 overflow-y-auto">
        <ul class="space-y-2">
          <li v-for="item in menuItems" :key="item.path">
            <router-link
              :to="item.path"
              class="flex items-center px-4 py-3 space-x-3 transition-colors duration-200 rounded-lg group hover:bg-emerald-50"
              :class="{
                'bg-emerald-100 text-emerald-600': $route.path === item.path,
              }"
            >
              <div
                class="flex items-center justify-center w-10 h-10 transition-colors duration-200 rounded-lg"
                :class="[
                  $route.path === item.path
                    ? 'bg-emerald-200'
                    : 'bg-gray-100 group-hover:bg-emerald-100',
                ]"
              >
                <i :class="[item.icon, 'text-lg']"></i>
              </div>
              <span class="font-medium">{{ item.name }}</span>
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Version Info -->
      <div class="p-4 mx-4 mb-4 rounded-lg bg-emerald-50">
        <p class="text-sm font-medium text-gray-600">Version</p>
        <p class="text-xs text-gray-500">v1.0.0</p>
      </div>
    </aside>

    <!-- Overlay -->
    <div
      v-show="isSidebarOpen"
      class="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
      @click="toggleSidebar"
    ></div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isSidebarOpen = ref(false);

const menuItems = ref([
  {
    name: "Tableau de bord",
    path: "/Admin/dashboard",
    icon: "fas fa-chart-line",
  },
  {
    name: "Congrès",
    path: "/Admin/congres",
    icon: "fas fa-calendar-alt",
  },
  {
    name: "Participer",
    path: "/Admin/participer",
    icon: "fas fa-user-check",
  },
  {
    name: "Médiathèque",
    path: "/Admin/mediatheque",
    icon: "fas fa-photo-video",
  },
  {
    name: "Hymne",
    path: "/Admin/hymne",
    icon: "fas fa-music",
  },
  {
    name: "Pays",
    path: "/Admin/pays",
    icon: "fas fa-globe",
  },
  {
    name: "Ville",
    path: "/Admin/villes",
    icon: "fas fa-map-marker-alt",
  },
  {
    name: "Villages",
    path: "/Admin/villages",
    icon: "fas fa-tree",
  },
  {
    name: "Vidéos",
    path: "/Admin/videos",
    icon: "fas fa-video",
  },
  {
    name: "Photothèque",
    path: "/Admin/phototheque",
    icon: "fas fa-images",
  },
  {
    name: "Activités",
    path: "/Admin/activites",
    icon: "fas fa-tasks",
  },
]);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

watch(
  () => route.path,
  () => {
    isSidebarOpen.value = false;
  }
);
</script>
