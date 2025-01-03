<template>
  <div class="overflow-x-auto bg-white rounded shadow">
    <div class="flex items-center justify-between px-4 py-2">
      <div class="flex items-center">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher..."
          class="form-input mr-2"
           @input="handleSearch"
        />
      </div>
        <div class="space-x-2">
         <button @click="generatePDF" class="btn-primary">
            <i class="fas fa-file-pdf"></i> PDF
         </button>
         <button @click="generateExcel" class="btn-secondary">
             <i class="fas fa-file-excel"></i> Excel
          </button>
        </div>
    </div>
    <table class="w-full table-auto">
      <thead>
        <tr class="bg-gray-100">
          <th class="px-4 py-2 border-b">Nom</th>
          <th class="px-4 py-2 border-b">Prénom</th>
          <th class="px-4 py-2 border-b">Email</th>
             <th class="px-4 py-2 border-b">Téléphone</th>
          <th class="px-4 py-2 border-b">Pays</th>
          <th class="px-4 py-2 border-b">Ville</th>
              <th class="px-4 py-2 border-b">Canton</th>
            <th class="px-4 py-2 border-b">Activités</th>
                <th class="px-4 py-2 border-b">Thèmes</th>
            <th class="px-4 py-2 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="participant in participants" :key="participant.id" class="border-b hover:bg-gray-50">
          <td class="px-4 py-2">{{ participant.user?.name }}</td>
          <td class="px-4 py-2">{{ participant.Prénom }}</td>
          <td class="px-4 py-2">{{ participant.user?.email }}</td>
          <td class="px-4 py-2">{{ participant.numeroTelephone }}</td>
            <td class="px-4 py-2">{{ participant.pays?.nom }}</td>
            <td class="px-4 py-2">{{ participant.ville?.nom }}</td>
             <td class="px-4 py-2">{{ participant.estCantonNonParlant ? 'Oui' : 'Non' }}</td>
            <td class="px-4 py-2">
                <ul v-if="participant.activites && participant.activites.length > 0" class="list-disc list-inside">
                    <li v-for="activite in participant.activites" :key="activite.id">
                        {{ activite.NomActivite }}
                    </li>
                </ul>
                 <span v-else>Aucune</span>
            </td>
             <td class="px-4 py-2">
                    <ul v-if="participant.themes && participant.themes.length > 0" class="list-disc list-inside">
                        <li v-for="theme in participant.themes" :key="theme.id">
                            {{ theme.nom }}
                        </li>
                    </ul>
                     <span v-else>Aucun</span>
                </td>
          <td class="px-4 py-2">
            <div class="space-x-2">
                <button @click="$emit('edit', participant.id)" class="text-blue-500 hover:text-blue-700">
                 <i class="fas fa-edit"></i>
              </button>
                <button @click="deleteParticipant(participant.id)" class="text-red-500 hover:text-red-700">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
          </td>
        </tr>
          <tr v-if="participants.length === 0">
                <td colspan="10" class="px-4 py-2 text-center">
                    Aucun participant trouvé.
                </td>
            </tr>
      </tbody>
    </table>
       <div class="flex justify-center px-4 py-3">
          <nav v-if="lastPage > 1" class="flex">
             <button
                @click="changePage(currentPage - 1)"
                :disabled="currentPage <= 1"
                class="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
             >
                 <i class="fas fa-angle-left"></i>
             </button>
              <button
                v-for="page in pageRange"
                :key="page"
                @click="changePage(page)"
               class="flex items-center justify-center px-3 h-8 text-sm font-medium border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  :class="{ 'bg-emerald-100 text-emerald-600': currentPage === page }"
            >
               {{ page }}
              </button>
             <button
                @click="changePage(currentPage + 1)"
               :disabled="currentPage >= lastPage"
                class="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
             >
                <i class="fas fa-angle-right"></i>
            </button>
          </nav>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import ParticipantService from '@/services/ParticipantService';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';
const props = defineProps({

})
const emit = defineEmits(['edit', 'delete'])
const participants = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const lastPage = ref(1);
const perPage = ref(10);
const loading = ref(false);


onMounted( async () => {
  await fetchParticipants();

})


const fetchParticipants = async () => {
  try {
    loading.value = true;
      const response = await ParticipantService.getAllParticipants(searchQuery.value, currentPage.value, perPage.value);
        participants.value = response.data.data;
        lastPage.value = response.data.last_page;
    } catch (error) {
      console.error("Error fetching participants", error);
    } finally {
        loading.value = false;
      }
};
const handleSearch = () => {
    currentPage.value = 1;
    fetchParticipants();
};


const deleteParticipant = async (id) => {
   Swal.fire({
        title: 'Êtes-vous sûr?',
        text: "Vous ne pourrez pas revenir en arrière!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer!',
        cancelButtonText: 'Annuler'
    }).then(async (result) => {
        if (result.isConfirmed) {
             try {
                   await ParticipantService.deleteParticipant(id);
                 participants.value = participants.value.filter(participant => participant.id !== id);
                  Swal.fire(
                       'Supprimé!',
                       'Le participant a été supprimé.',
                       'success'
                   );
                    await fetchParticipants()

            } catch (error) {
                 console.error("Error delete participants", error)
                  Swal.fire(
                     'Erreur!',
                      "Une erreur s'est produite lors de la suppression.",
                     'error'
                 );
             }
        }
    });
};

const changePage = (page) => {
    if (page > 0 && page <= lastPage.value) {
        currentPage.value = page;
         fetchParticipants()
    }
};
const pageRange = computed(() => {
    if (lastPage.value <= 5) {
        return Array.from({ length: lastPage.value }, (_, i) => i + 1);
    }
    const start = Math.max(currentPage.value - 2, 1);
    const end = Math.min(start + 4, lastPage.value);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});
const generateExcel = () => {
  const wb = XLSX.utils.book_new();
    const wsData = [
        [
            'Nom',
            'Prénom',
            'Email',
            'Téléphone',
            'Pays',
            'Ville',
            'Canton',
            'Activités',
            'Thèmes'
        ],
         ...participants.value.map(participant => [
              participant.user?.name,
              participant.Prénom,
             participant.user?.email,
              participant.numeroTelephone,
             participant.pays?.nom,
              participant.ville?.nom,
              participant.estCantonNonParlant ? 'Oui' : 'Non',
              participant.activites ? participant.activites.map(act => act.NomActivite).join(', ') : 'Aucune',
                participant.themes ? participant.themes.map(theme => theme.nom).join(', ') : 'Aucun'
            ])
    ];

   const ws = XLSX.utils.aoa_to_sheet(wsData);
  XLSX.utils.book_append_sheet(wb, ws, 'Participants');
  XLSX.writeFile(wb, 'participants.xlsx');
};

const generatePDF = () => {
    const doc = new jsPDF();
    const headers = [
        'Nom',
        'Prénom',
        'Email',
        'Téléphone',
        'Pays',
        'Ville',
        'Canton',
        'Activités',
        'Thèmes'
    ];
     const data = participants.value.map(participant => [
            participant.user?.name,
            participant.Prénom,
            participant.user?.email,
            participant.numeroTelephone,
            participant.pays?.nom,
            participant.ville?.nom,
            participant.estCantonNonParlant ? 'Oui' : 'Non',
             participant.activites ? participant.activites.map(act => act.NomActivite).join(', ') : 'Aucune',
              participant.themes ? participant.themes.map(theme => theme.nom).join(', ') : 'Aucun'
    ]);
    doc.autoTable({ head: [headers], body: data });
    doc.save('participants.pdf');
};

watch(searchQuery, () => {
   currentPage.value = 1;
})
</script>

<style scoped>
.form-input {
  @apply w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500;
}
.btn-primary {
  @apply bg-[#06AE16] hover:bg-[#058512] text-white px-4 py-2 rounded font-medium transition-all duration-300;
}
.btn-secondary {
  @apply bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded font-medium transition-all duration-300;
}
</style>