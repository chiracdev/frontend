<template>
    <div class="bg-gray-100">
      <!-- Bannière héroïque -->
      <div class="relative bg-gradient-to-b from-[#4CAF50] to-[#A8E6A1] text-white">
        <div class="container mx-auto px-6 py-20 text-center">
          <h1 class="text-4xl font-bold md:text-5xl">
            Decouvrer notre agenda culturel 
          </h1>
          <p class="mt-4 text-lg">
            Explorez une sélection d'événements actifs et de nombreux autres événements à venir.
          </p>
        </div>
      </div>
  
      <!-- Zone de recherche -->
      <div class="container mx-auto px-6 py-6">
        <div class="relative flex justify-center">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher un événement..."
            class="w-3/4 md:w-1/2 py-3 pl-10 pr-4 rounded-full shadow-md border focus:ring-blue-500 focus:border-blue-500"
            @input="handleSearch"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="absolute w-5 h-5 text-gray-400 left-3 top-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 21h4M10 3h4m-4 9h4m5 4.5L8.5 21H3v-3.5M12 12V3m0 18v-3.5"
            />
          </svg>
        </div>
      </div>
  
      <!-- Liste des événements actifs -->
    

      <h2 class="text-3xl font-bold text-gray-800 ms-24 text-start">Tous les événements</h2>
  
      <!-- Liste de tous les événements -->
      <div class="container mx-auto px-6 py-6 grid grid-cols-3 gap-6">
  
        <div
  v-for="evenement in allEvenements"
  :key="evenement.id"
  class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 mb-6 cursor-pointer"
  @click="goToEvenementDetail(evenement.id)"
>
  <!-- Image de l'événement en haut -->
  <div class="w-full h-64">
    <img
      :src="`https://picsum.photos/600/400?random=${evenement.id}`"
      alt="Image de l'événement"
      class="w-full h-full object-cover rounded-t-lg hover:scale-105"
    />
  </div>

  <!-- Contenu sous l'image -->
  <div class="p-4">
    <h2 class="text-2xl font-bold text-green-600">{{ evenement.nom }}</h2>
    
    <!-- Ligne séparatrice -->
    <hr class="my-4 border-t-2 border-gray-300" />
    
    <p class="text-lg text-gray-600 mt-2">
      <span class="font-bold">Date :</span> du {{ evenement.DateDebut }} au {{ evenement.DateFin  }}
    </p>
    
    <p class="text-lg text-gray-600 mt-2">
      {{ evenement.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet.' }}
    </p>
    <p class="text-lg text-gray-600 mt-2">
      {{ evenement.typeEvenement || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet.' }}
    </p>
    
    <p class="text-lg text-gray-600 mt-2">
      <span class="font-bold">Lieu :</span> {{ evenement.Lieu || 'Lieu à définir' }}
    </p>
  </div>
</div>

      </div>
  
      <!-- Message lorsque aucun événement n'est trouvé -->
      <div v-if="allEvenements.length === 0" class="text-center py-10">
        <p class="text-gray-600">Aucun événement trouvé. Essayez une autre recherche.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import EvenementService from "@/services/EvenementService";
  import { useToast } from "vue-toastification";
  
  const toast = useToast();
  
  export default {
    setup() {
      const loading = ref(false);
      const activeEvenements = ref([]);
      const allEvenements = ref([]);
      const searchQuery = ref("");
  
      // Charger les événements actifs et tous les événements
      const loadEvenements = async () => {
        try {
          loading.value = true;
          const response = await EvenementService.getAllEvenements(searchQuery.value);
          activeEvenements.value = response.filter(evenement => evenement.isActive);
          allEvenements.value = response;
        } catch (error) {
          toast.error("Une erreur est survenue lors du chargement des événements");
        } finally {
          loading.value = false;
        }
      };
  
      // Gérer la recherche avec debounce
      let searchTimeout;
      const handleSearch = () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          loadEvenements();
        }, 300);
      };
  
      // Rediriger vers la page de détails de l'événement
      const goToEvenementDetail = (id) => {
        // Logic to navigate to event detail page (e.g., using Vue Router)
        // this.$router.push({ name: 'evenement-detail', params: { id } });
      };
  
      // Charger les événements au montage du composant
      onMounted(loadEvenements);
  
      return {
        loading,
        activeEvenements,
        allEvenements,
        searchQuery,
        handleSearch,
        goToEvenementDetail,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Style similaire à votre template original pour les cartes cliquables */
  .bg-white {
    cursor: pointer;
  }
  .bg-white:hover {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
  </style>
  