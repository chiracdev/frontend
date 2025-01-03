<template>
  <div class="min-h-screen p-4 bg-gray-50 md:p-6 lg:p-8">
    <!-- En-tête de la page -->
    <div class="p-6 mb-6 bg-white rounded-lg shadow-sm">
      <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Gestion des Villes</h1>
          <p class="mt-1 text-gray-600">Liste des villes participantes</p>
        </div>
      </div>
    </div>

    <!-- Zone de recherche et de filtrage -->
    <div class="p-6 mb-6 bg-white rounded-lg shadow-sm">
      <div class="flex flex-col gap-4 md:flex-row">
        <div class="flex-1">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Rechercher une ville..."
              class="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              @input="handleSearch"
            />
            <MagnifyingGlassIcon
              class="absolute w-5 h-5 text-gray-400 left-3 top-3"
            />
          </div>
        </div>
        <div class="flex-1">
          <select
            v-model="selectedPays"
            class="w-full pl-4 pr-10 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            @change="handleFilter"
          >
            <option value="">Tous les pays</option>
            <option v-for="pays in paysList" :key="pays.id" :value="pays.id">
              {{ pays.nom }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Tableau des villes -->
    <div class="overflow-hidden bg-white rounded-lg shadow-sm">
      <EasyDataTable
        :headers="headers"
        :items="filteredVilles || []"
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
import VilleService from "@/services/VilleService";
import PaysService from "@/services/PaysService";

const toast = useToast();
const loading = ref(false);
const villes = ref([]);
const paysList = ref([]);
const searchQuery = ref("");
const selectedPays = ref("");

const headers = [
  { text: "ID", value: "id", sortable: true },
  { text: "Nom de la Ville", value: "nom", sortable: true },
  { text: "Nom du Pays", value: "pays.nom", sortable: true },
];





//Charger les villes
const loadVilles = async () => {
  try {
    loading.value = true;
    const response = await VilleService.getAllVilles(searchQuery.value);
    villes.value = response.data || [];
  } catch (error) {
    toast.error("Une erreur est survenue lors du chargement des villes");
  } finally {
    loading.value = false;
  }
};

// Charger la liste des pays
const loadPays = async () => {
  try {
    const response = await PaysService.getAllPays();
    paysList.value = response.data || [];
  } catch (error) {
    toast.error("Une erreur est survenue lors du chargement des pays");
  }
};

// Gérer la recherche avec debounce
let searchTimeout;
const handleSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    loadVilles();
  }, 300);
};

// Gérer le filtrage par pays
const handleFilter = () => {
  loadVilles();
};

// Calculer les villes filtrées
const filteredVilles = computed(() => {
  if (selectedPays.value) {
    return villes.value.filter((ville) => ville.pays_id === selectedPays.value);
  }
  return villes.value;
});

// Charger les villes et les pays au montage du composant
onMounted(() => {
  loadVilles();
  loadPays();
});
</script>

<style scoped>
.customize-table {
  /* Custom styles for the table */
}
</style>