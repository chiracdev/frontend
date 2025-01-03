<template>
   <Separator />
   <br />
    <div class="min-h-screen p-4 bg-gray-50 md:p-6 lg:p-8">
      <!-- En-tête de la page -->
      <div class="p-6 mb-6 bg-white rounded-lg shadow-sm">
        <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
           


            <h1 class="text-2xl font-bold text-gray-800">Gestion des Vidéos</h1>
       
       <p class="flex items-center gap-2 mt-1 text-gray-600">
         <span class="w-10 h-1 bg-yellow-500 rounded-full"></span>
         Gestionnaire des Vidéos
       </p>
          </div>
        </div>
      </div>
  
      <!-- Zone de recherche -->
      <div class="p-6 mb-6 bg-white rounded-lg shadow-sm">
        <div class="flex flex-col gap-4 md:flex-row">
          <div class="flex-1">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Rechercher une vidéo..."
                class="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                @input="handleSearch"
              />
              <MagnifyingGlassIcon
                class="absolute w-5 h-5 text-gray-400 left-3 top-3"
              />
            </div>
          </div>
        </div>
      </div>
  
      <!-- Tableau des vidéos -->
      <div class="overflow-hidden bg-white rounded-lg shadow-sm">
        <EasyDataTable
          :headers="headers"
          :items="filteredVideos || []"
          :loading="loading"
          alternating
          buttons-pagination
          :rows-items="[10, 25, 50]"
          :rows-per-page="10"
          table-class-name="customize-table"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from "vue";
  import EasyDataTable from "vue3-easy-data-table";
  import "vue3-easy-data-table/dist/style.css";
  import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
  import { useToast } from "vue-toastification";
  import VideoService from "@/services/VideoService";
  import Separator from "@/components/frontend/separator/Separator.vue";
  
  // Définition du toast
  const toast = useToast();
  
  // Déclaration des variables réactives
  const loading = ref(false);
  const videos = ref([]);
  const searchQuery = ref("");
  
  // Définition des en-têtes pour le tableau
  const headers = [
    { text: "ID", value: "id", sortable: true },
    { text: "Titre", value: "title", sortable: true },
    { text: "URL", value: "url", sortable: true },
    { text: "Description", value: "description", sortable: false },
  ];
  
  // Fonction pour charger les vidéos
  const loadVideos = async () => {
    try {
      loading.value = true;
      const response = await VideoService.getAllVideos();
      videos.value = response || [];
    } catch (error) {
      toast.error("Une erreur est survenue lors du chargement des vidéos");
    } finally {
      loading.value = false;
    }
  };
  
  // Gestion de la recherche avec debounce
  let searchTimeout;
  const handleSearch = () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      loadVideos();
    }, 300);
  };
  
  // Calcul des vidéos filtrées
  const filteredVideos = computed(() => {
    if (searchQuery.value) {
      return videos.value.filter((video) =>
        video.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    }
    return videos.value;
  });
  
  // Chargement des vidéos au montage du composant
  onMounted(() => {
    loadVideos();
  });
</script>

  
  <style scoped>
  .customize-table {
    /* Custom styles for the table */
  }
  </style>