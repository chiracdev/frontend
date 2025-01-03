<template>
  <div class="min-h-screen p-4 bg-gray-50 md:p-6 lg:p-8">
    <!-- En-tête de la page -->
    <div class="p-6 mb-6 bg-white rounded-lg shadow-sm">
      <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Gestion des Pays</h1>
          <p class="mt-1 text-gray-600">Gérez la liste des pays participants</p>
        </div>
        <button
          @click="openAddModal"
          class="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors duration-200"
        >
          <PlusCircleIcon class="w-5 h-5" />
          Nouveau Pays
        </button>
      </div>
    </div>

    <!-- Zone de recherche et filtres -->
    <div class="p-6 mb-6 bg-white rounded-lg shadow-sm">
      <div class="flex flex-col gap-4 md:flex-row">
        <div class="flex-1">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Rechercher un pays..."
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

    <!-- Tableau des pays -->
    <div class="overflow-hidden bg-white rounded-lg shadow-sm">
      <EasyDataTable
        v-model:items-selected="itemsSelected"
        :headers="headers"
        :items="pays"
        :loading="loading"
        alternating
        buttons-pagination
        :rows-items="[10, 25, 50]"
        :rows-per-page="10"
        table-class-name="customize-table"
      >
        <!-- Template pour le statut -->
        <template #item-status="{ item }">
          <span
            class="px-3 py-1 text-sm rounded-full"
            :class="
              item.active
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            "
          >
            {{ item.active ? "Actif" : "Inactif" }}
          </span>
        </template>

        <!-- Template pour les actions -->
        <template #item-actions="{ item }">
          <div class="flex items-center gap-2">
            <button
              @click="editPays(item)"
              class="p-2 text-blue-600 transition-colors duration-200 rounded-lg hover:bg-gray-100"
              title="Modifier"
            >
              <PencilSquareIcon class="w-5 h-5" />
            </button>
            <button
              @click="confirmDelete(item)"
              class="p-2 text-red-600 transition-colors duration-200 rounded-lg hover:bg-gray-100"
              title="Supprimer"
            >
              <TrashIcon class="w-5 h-5" />
            </button>
          </div>
        </template>
      </EasyDataTable>
    </div>

    <!-- Modal Ajout/Modification -->
    <TransitionRoot appear :show="isModalOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-50">
        <TransitionChild
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex items-center justify-center min-h-full p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 scale-100"
              leave-to="opacity- 0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-lg p-6 overflow-hidden transition-all transform bg-white shadow-xl rounded-2xl"
              >
                <div class="flex items-center justify-between mb-6">
                  <DialogTitle class="text-xl font-semibold text-gray-900">
                    {{
                      editMode ? "Modifier le pays" : "Ajouter un nouveau pays"
                    }}
                  </DialogTitle>
                  <button
                    @click="closeModal"
                    class="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon class="w-6 h-6" />
                  </button>
                </div>

                <form @submit.prevent="handleSubmit" class="space-y-6">
                  <div>
                    <label class="block mb-2 text-sm font-medium text-gray-700">
                      Nom du pays
                    </label>
                    <input
                      v-model="formData.nom"
                      type="text"
                      required
                      class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      :class="{ 'border-red-300': formErrors.nom }"
                      placeholder="Entrez le nom du pays"
                    />
                    <p v-if="formErrors.nom" class="mt-1 text-sm text-red-600">
                      {{ formErrors.nom }}
                    </p>
                  </div>

                  <div class="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      @click="closeModal"
                      class="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      :disabled="loading"
                      class="px-4 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus-green-500 disabled:opacity-50"
                    >
                      <span v-if="loading" class="flex items-center gap-2">
                        <svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                          <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                            fill="none"
                          />
                          <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Chargement...
                      </span>
                      <span v-else>
                        {{ editMode ? "Modifier" : "Ajouter" }}
                      </span>
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Modal de Confirmation de Suppression -->
    <TransitionRoot appear :show="isDeleteModalOpen" as="template">
      <Dialog as="div" @close="closeDeleteModal" class="relative z-50">
        <TransitionChild
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex items-center justify-center min-h-full p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md p-6 overflow-hidden transition-all transform bg-white shadow-xl rounded-2xl"
              >
                <div class="flex items-center justify-between mb-6">
                  <DialogTitle class="text-xl font-semibold text-gray-900">
                    Confirmer la suppression
                  </DialogTitle>
                  <button
                    @click="closeDeleteModal"
                    class="text-gray ```vue
                    -400 hover:text-gray-500"
                  >
                    <XMarkIcon class="w-6 h-6" />
                  </button>
                </div>

                <div class="mt-4">
                  <div
                    class="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 rounded-full"
                  >
                    <ExclamationTriangleIcon class="w-8 h-8 text-red-600" />
                  </div>
                  <p class="mt-4 text-center text-gray-600">
                    Êtes-vous sûr de vouloir supprimer ce pays ? Cette action
                    est irréversible.
                  </p>
                </div>

                <div class="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    @click="closeDeleteModal"
                    class="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Annuler
                  </button>
                  <button
                    @click="deletePays"
                    :disabled="loading"
                    class="px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
                  >
                    <span v-if="loading" class="flex items-center gap-2">
                      <svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                          fill="none"
                        />
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Suppression...
                    </span>
                    <span v-else> Supprimer </span>
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  PlusCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
} from "@heroicons/vue/24/outline";
import { useToast } from "vue-toastification";
import PaysService from "@/services/PaysService";

const toast = useToast();
const loading = ref(false);
const pays = ref([]);
const searchQuery = ref("");
const isModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const editMode = ref(false);
const selectedPays = ref(null);
const itemsSelected = ref([]);
const formErrors = ref({});
const formData = ref({ nom: "" });
const headers = [
  { text: "ID", value: "id", sortable: true },
  { text: "Nom du Pays", value: "nom", sortable: true },
  { text: "Actions", value: "actions", width: 100, sortable: false },
];

// Charger les pays
const loadPays = async () => {
  try {
    loading.value = true;
    const response = await PaysService.getAllPays(searchQuery.value);
    pays.value = response.data;
  } catch (error) {
    toast.error("Une erreur est survenue lors du chargement des pays");
  } finally {
    loading.value = false;
  }
};

// Gérer la recherche avec debounce
let searchTimeout;
const handleSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    loadPays();
  }, 300);
};

// Validation du formulaire
const validateForm = () => {
  const errors = {};
  if (!formData.value.nom) {
    errors.nom = "Le nom du pays est requis";
  }
  formErrors.value = errors;
  return Object.keys(errors).length === 0;
};

// Ouvrir le modal d'ajout
const openAddModal = () => {
  editMode.value = false;
  formData.value = { nom: "" };
  formErrors.value = {};
  isModalOpen.value = true;
};

// Ouvrir le modal d'édition
const editPays = (item) => {
  editMode.value = true;
 selectedPays.value = item;
  formData.value = { ...item };
  formErrors.value = {};
  isModalOpen.value = true;
};

// Fermer le modal
const closeModal = () => {
  isModalOpen.value = false;
  formData.value = { nom: "" };
  formErrors.value = {};
  selectedPays.value = null;
};

// Gérer la soumission du formulaire
const handleSubmit = async () => {
  if (!validateForm()) return;
  try {
    loading.value = true;
    if (editMode.value) {
      await PaysService.updatePays(selectedPays.value.id, formData.value);
      toast.success("Pays mis à jour avec succès");
    } else {
      await PaysService.createPays(formData.value);
      toast.success("Nouveau pays ajouté avec succès");
    }
    loadPays();
    closeModal();
  } catch (error) {
    toast.error("Une erreur est survenue lors de la sauvegarde du pays");
  } finally {
    loading.value = false;
  }
};

// Gérer la confirmation de suppression
const confirmDelete = (item) => {
  selectedPays.value = item;
  isDeleteModalOpen.value = true;
};

// Fermer le modal de suppression
const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
  selectedPays.value = null;
};

// Gérer la suppression du pays
const deletePays = async () => {
  try {
    loading.value = true;
    await PaysService.deletePays(selectedPays.value.id);
    toast.success("Pays supprimé avec succès");
    loadPays();
    closeDeleteModal();
  } catch (error) {
    toast.error("Une erreur est survenue lors de la suppression du pays");
  } finally {
    loading.value = false;
  }
};

// Charger les pays au montage du composant
onMounted(loadPays);
</script>

<style scoped>
.customize-table {
  /* Custom styles for the table */
}
</style>