<template>
   <Separator />
   <br />
  <div class="min-h-screen p-6 bg-gray-50">
    <!-- En-tête de la page -->
    <div
      class="flex items-center justify-between p-6 mb-6 bg-white rounded-lg shadow-lg"
    >
      <div>
        <h1 class="text-3xl font-bold text-gray-800">Liste des Villages</h1>
        <p class="flex items-center gap-2 mt-1 text-gray-600">
          <span class="w-10 h-1 bg-yellow-500 rounded-full"></span>
          Gestionnaire des villages
        </p>
      </div>
      <div
        class="p-2 text-lg font-bold text-green-600 bg-green-100 rounded-lg shadow"
      >
        Total {{ villages.length }}
      </div>
    </div>

    <!-- Zone de recherche -->
    <div class="p-6 mb-6 bg-white rounded-lg shadow-lg">
      <div class="relative flex">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher un village..."
          class="w-full py-3 pl-10 pr-4 transition duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          @input="handleSearch"
        />
        <MagnifyingGlassIcon
          class="absolute w-5 h-5 text-gray-400 left-3 top-3"
        />
      </div>
    </div>

    <!-- Tableau des villages -->
    <div class="overflow-hidden bg-white rounded-lg shadow-lg">
      <EasyDataTable
        v-if="villages.length > 0"
        :items="villages"
        :loading="loading"
        :headers="headers"
        :rows-per-page="10"
        :rows-items="[10, 25, 50]"
        table-class-name="customize-table"
      >
        <!-- Template pour les actions -->
        <template #item-actions="{ item }">
          <div class="flex items-center gap-2">
            <button
              @click="viewVillage(item)"
              class="p-2 text-blue-600 transition-colors duration-200 rounded-lg hover:bg-gray-100"
              title="Voir les détails"
            >
              <EyeIcon class="w-5 h-5" />
            </button>
          </div>
        </template>
      </EasyDataTable>

      <!-- Message lorsque aucun village n'est trouvé -->
      <div v-else class="flex flex-col items-center justify-center p-10">
        <img
          src="/public/no-results.png"
          alt="Aucun village trouvé"
          class="w-1/2 mb-4"
        />
        <p class="text-lg text-gray-600">
          Aucun village trouvé. Essayez une autre recherche.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import { MagnifyingGlassIcon, EyeIcon } from "@heroicons/vue/24/outline";
import VillageService from "@/services/VillageService"; // Assurez-vous que le chemin est correct
import { useToast } from "vue-toastification";
import Separator from "@/components/frontend/separator/Separator.vue";

const toast = useToast();

export default {
  components: {
    Separator,
  },
  setup() {
    const loading = ref(false);
    const villages = ref([]);
    const searchQuery = ref("");
    
    const headers = [
      { text: "ID", value: "id", sortable: true },
      { text: "Nom du Village", value: "nom", sortable: true },
      { text: "Actions", value: "actions", width: 100, sortable: false },
    ];

    // Charger les villages
    const loadVillages = async () => {
      try {
        loading.value = true;
        const response = await VillageService.getAllVillages(searchQuery.value);
        villages.value = response;
      } catch (error) {
        toast.error("Une erreur est survenue lors du chargement des villages");
      } finally {
        loading.value = false;
      }
    };

    // Gérer la recherche avec debounce
    let searchTimeout;
    const handleSearch = () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        loadVillages();
      }, 300);
    };

    // Charger les villages au montage du composant
    onMounted(loadVillages);

    return {
      loading,
      villages,
      searchQuery,
      headers,
      handleSearch,
    };
  },
};
</script>

<style scoped>
.customize-table {
  /* Custom styles for the table */
}

.table-header {
  background-color: #f9f9f9; /* Couleur d'ar rière-plan pour l'en-tête */
}

.table-row:hover {
  background-color: #f1f1f1; /* Couleur de survol pour les lignes */
}

.table-row:nth-child(even) {
  background-color: #f9f9f9; /* Couleur de fond pour les lignes paires */
}

.table-row:nth-child(odd) {
  background-color: #ffffff; /* Couleur de fond pour les lignes impaires */
}

.table-header th {
  background-color: #ffeb3b; /* Couleur jaune pour l'en-tête */
  color: #333; /* Couleur du texte de l'en-tête */
}

.table-header th:hover {
  background-color: #fdd835; /* Couleur de survol pour l'en-tête */
}
</style>
