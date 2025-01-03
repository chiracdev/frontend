<template>
  <main class="p-4 md:p-6">
    <div class="mx-auto max-w-7xl">
      <div class="mb-6 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Liste des Sponsors</h1>
        <div class="flex space-x-4">
          <select
            v-model="selectedSponsorType"
            @change="fetchSponsors"
            class="mt-1 block border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
          >
            <option value="entreprise">Entreprise</option>
            <option value="particulier">Particulier</option>
          </select>
          <button
            @click="handleAdd"
            class="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            Ajouter un sponsor
          </button>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm">
        <SponsorTable
          :sponsors="sponsors"
          :sponsorType="selectedSponsorType"
          @edit="handleEdit"
          @delete="handleDelete"
          @update-status="handleStatusUpdate"
          @export-pdf="handleExportPdf"
          @export-excel="handleExportExcel"
        />
      </div>
    </div>
    <Teleport to="body">
      <div
        v-if="showConfirmationModal"
        class="fixed inset-0 z-50 bg-gray-500 bg-opacity-75 flex items-center justify-center"
      >
        <div class="bg-white rounded-lg p-6 shadow-xl">
          <p class="mb-4 text-lg font-medium text-gray-800">
            Êtes-vous sûr de vouloir supprimer ce sponsor ?
          </p>
          <div class="flex justify-end space-x-2">
            <button
              @click="showConfirmationModal = false"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Annuler
            </button>
            <button
              @click="confirmDelete"
              class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SponsorService from '../../../services/SponsorService';
import SponsorTable from '../../../components/Admin/sponsors/SponsorTable.vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';


const router = useRouter();
const toast = useToast();

const sponsors = ref([]);
const selectedSponsorType = ref('entreprise');
const selectedSponsorId = ref(null);
const showConfirmationModal = ref(false);

const fetchSponsors = async () => {
  try {
    const data = await SponsorService.getAllSponsors(selectedSponsorType.value);
    sponsors.value = data.data;
  } catch (error) {
    console.error('Failed to fetch sponsors:', error);
    toast.error('Erreur lors du chargement des sponsors.');
  }
};
const handleAdd = () => {
  router.push({ path: `/Admin/sponsors/create?type=${selectedSponsorType.value}` });
};
const handleEdit = (id) => {
  router.push({ path: `/Admin/sponsors/${id}/edit?type=${selectedSponsorType.value}` });
};
const handleDelete = (id) => {
  selectedSponsorId.value = id;
  showConfirmationModal.value = true;
};
const confirmDelete = async () => {
  try {
    await SponsorService.deleteSponsor(selectedSponsorId.value);
    toast.success('Sponsor supprimé avec succès.');
    showConfirmationModal.value = false;
    await fetchSponsors();
  } catch (error) {
    console.error('Failed to delete sponsor:', error);
    toast.error('Erreur lors de la suppression du sponsor.');
  }
};
const handleStatusUpdate = async (payload) => {
  try {
    await SponsorService.updateSponsor(payload.id, { est_approuve: payload.est_approuve });
    toast.success('Statut du sponsor mis à jour avec succès.');
    await fetchSponsors();
  } catch (error) {
    console.error('Failed to update sponsor status:', error);
    toast.error('Erreur lors de la mise à jour du statut du sponsor.');
  }
};

const handleExportPdf = () => {
      if (!sponsors.value || sponsors.value.length === 0) {
          toast.warning('Aucune donnée à exporter.');
          return;
       }
       const doc = new jsPDF();
       const headers = [
           'Type',
           'Nom',
            'Email',
             'Téléphone',
            'Niveau',
              'Approuvé',
            'Commentaires'
        ];
          const data = sponsors.value.map(sponsor => {
                const sponsorName = sponsor.type_sponsor === 'entreprise' ? sponsor.nom_entreprise : `${sponsor.nom} ${sponsor.prenom}`;

              return [
               sponsor.type_sponsor,
                sponsorName,
                 sponsor.user.email,
                 sponsor.telephone,
                 sponsor.niveau_sponsoring,
                  sponsor.est_approuve ? 'Oui' : 'Non',
                  sponsor.commentaires,
            ];
         });

          doc.autoTable({
             head: [headers],
            body: data
         });

        doc.save('liste_sponsors.pdf');
};

const handleExportExcel = () => {
        if (!sponsors.value || sponsors.value.length === 0) {
            toast.warning('Aucune donnée à exporter.');
          return;
        }
       const headers = [
           'Type',
            'Nom',
           'Email',
             'Téléphone',
             'Niveau',
            'Approuvé',
            'Commentaires'
        ];
        const data = sponsors.value.map(sponsor => {
            const sponsorName = sponsor.type_sponsor === 'entreprise' ? sponsor.nom_entreprise : `${sponsor.nom} ${sponsor.prenom}`;

             return {
              Type: sponsor.type_sponsor,
               Nom: sponsorName,
               Email: sponsor.user.email,
                Téléphone: sponsor.telephone,
               Niveau: sponsor.niveau_sponsoring,
                 Approuvé: sponsor.est_approuve ? 'Oui' : 'Non',
                 Commentaires: sponsor.commentaires,
        };
     });


      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(data, { header: headers });

      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sponsors');
      XLSX.writeFile(workbook, 'liste_sponsors.xlsx');
    };

onMounted(() => {
  fetchSponsors();
});
</script>