<template>
  <div class="">
    <!-- Hero Banner -->
    <div class="relative bg-yellow-200 text-white -z-0 ">
      <div class="absolute inset-0 bg-opacity-50"></div>
      <div class="container mx-auto px-6 py-20 text-center relative z-10">
        <h1 class="text-4xl font-bold leading-tight animate-fade-in-down md:text-5xl text-gray-800">Explorer les Activités du Congrès</h1>
        <p class="mt-4 text-lg animate-fade-in-down font-bold text-gray-800">
          Découvrez {{ activites.length }} activités passionnantes, riches en savoirs et en discussions.
        </p>
      </div>
    </div>

    <Separator />
    <br />
<!--     
    Zone de recherche des activités -->
    <!-- <div class="container mx-auto px-6 py-6">
      <div class="relative flex justify-center">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher une activité..."
          class="w-1/2 py-3 pl-10 pr-4 transition duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          @input="handleSearch"
        />
        <MagnifyingGlassIcon class="absolute w-5 h-5 text-gray-400 left-3 top-3" />
      </div>
    </div> -->

    <!-- Liste des activités -->
    <div class="container mx-auto px-6 py-6 flex flex-col gap-6">
      <div
        v-for="activite in activites"
        :key="activite.id"
        class="p-6 rounded-lg shadow-lg group hover:shadow-xl transition w-full"
      >
        <!-- Image de l'activité -->
        <div class="overflow-hidden rounded-lg mb-4">
          <img
           :src="`https://picsum.photos/600/400?random=${activite.id}`"
            :alt="'Image de l\'activité ' + activite.nom"
            class="w-full h-48 object-cover transition-transform duration-200 group-hover:scale-110"
          />
        </div>
        <!-- Nom de l'activité -->
        <h2 class="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600">
          {{ activite.NomActivite }}
        </h2>
        <h3 class="text-md font-medium text-gray-700 mb-2">
          Lieu: {{ activite.Lieu }}
        </h3>
        <h3 class="text-md font-medium text-gray-700 mb-2">
          Du {{ activite.DateDebut }} au  {{ activite.DateFin }}
        </h3>
        <h3 class="text-md font-medium text-gray-700 mb-2">
          {{ activite.TypeActivite }}
        </h3>
      
        <!-- Description brève -->
        <p class="text-gray-600 text-sm">
          {{ activite.description || "Venez découvrir cette activité passionnante lors du congrès." }}
        </p>
        <div class="justify-end">
          <button
          class="mt-4 w-1/3  py-2 bg-green-700 text-white font-semibold rounded-lg flex items-center justify-center hover:bg-green-300"
        >
          Lire Plus
        </button>
        </div>
       
      </div>
    </div>

    <!-- Message lorsque aucune activité n'est trouvée -->
    <div v-if="activites.length === 0" class="flex flex-col items-center justify-center p-10">
      <img
        src="/public/no-results.png"
        alt="Aucune activité trouvée"
        class="w-1/2 mb-4"
      />
      <p class="text-lg text-gray-600">Aucune activité trouvée. Essayez une autre recherche.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import ActiviteService from "@/services/ActiviteService";
import { useToast } from "vue-toastification";
import Separator from "@/components/frontend/separator/Separator.vue";

const toast = useToast();

export default {
  components: {
    Separator,
  },
  setup() {
    const loading = ref(false);
    const activites = ref([]);
    const searchQuery = ref("");

    // Charger les activités
    const loadActivites = async () => {
      try {
        loading.value = true;
        const response = await ActiviteService.getAllActivites(searchQuery.value);
        activites.value = response.map((activite) => ({
          ...activite,
          description: activite.description || "Venez découvrir cette activité passionnante lors du congrès.",
        }));
      } catch (error) {
        toast.error("Une erreur est survenue lors du chargement des activités");
      } finally {
        loading.value = false;
      }
    };

    // Gérer la recherche avec debounce
    let searchTimeout;
    const handleSearch = () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        loadActivites();
      }, 300);
    };

    // Charger les activités au montage du composant
    onMounted(loadActivites);

    return {
      loading,
      activites,
      searchQuery,
      handleSearch,
    };
  },
};
</script>

<style scoped>
/* Palette bleue */
.group:hover .group-hover\:text-blue-600 {
  color: #2563eb; /* Bleu foncé */
}

.group:hover .group-hover\:shadow-xl {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
}

img {
  transition: transform 0.2s ease-in-out;
}

button:hover {
  background-color: #3b82f6; /* Bleu plus foncé au survol */
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fadeInDown 1.2s ease-out;
}

.animate-fade-in-up {
  animation: fadeInUp 1.2s ease-out;
}

.relative {
  background-image: url('/public/hero-banner.jpg'); 
  background-size: cover;
  background-position: center;
}
</style>
