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
                <th class="px-4 py-2 border-b">Name</th>
                <th class="px-4 py-2 border-b">Email</th>
                 <th class="px-4 py-2 border-b">Subject</th>
                <th class="px-4 py-2 border-b">Message</th>
                <th class="px-4 py-2 border-b">Statut</th>
                <th class="px-4 py-2 border-b">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="contact in contacts" :key="contact.id" class="border-b hover:bg-gray-50">
                <td class="px-4 py-2">{{ contact.name }}</td>
                <td class="px-4 py-2">{{ contact.email }}</td>
                 <td class="px-4 py-2">{{ contact.subject }}</td>
                <td class="px-4 py-2 max-w-[250px] whitespace-normal">{{ contact.message }}</td>
                 <td class="px-4 py-2">
                     <span v-if="contact.reply">
                        <span class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">Répondu</span>
                    </span>
                    <span v-else>
                         <span class="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">Non Répondu</span>
                   </span>
                 </td>
                <td class="px-4 py-2">
                    <div class="space-x-2">
                        <button @click="$emit('edit', contact.id)" class="text-blue-500 hover:text-blue-700">
                           <i class="fas fa-eye"></i>
                        </button>
                        <button @click="deleteContact(contact)" class="text-red-500 hover:text-red-700">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </td>
            </tr>
            <tr v-if="contacts.length === 0">
                <td colspan="6" class="px-4 py-2 text-center">
                    Aucun contact trouvé.
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
import ContactsService from '@/services/ContactsService';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';

const props = defineProps({});
const emit = defineEmits(['edit', 'delete']);

const contacts = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const lastPage = ref(1);
const perPage = ref(10);
const loading = ref(false);

onMounted(async () => {
  await fetchContacts();
});

const fetchContacts = async () => {
    try {
        loading.value = true;
        const response = await ContactsService.getAllContacts(searchQuery.value, currentPage.value, perPage.value);
         contacts.value = response.data.contacts.data;
          lastPage.value = response.data.contacts.last_page;
    } catch (error) {
        console.error("Error fetching contacts", error);
    } finally {
        loading.value = false;
    }
};

const handleSearch = () => {
    currentPage.value = 1;
    fetchContacts();
};
const deleteContact = async (contact) => {
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
                   await ContactsService.deleteContact(contact.id);
                   contacts.value = contacts.value.filter(c => c.id !== contact.id);
                  Swal.fire(
                       'Supprimé!',
                       'Le contact a été supprimé.',
                       'success'
                   );
                  await fetchContacts();
            } catch (error) {
                 console.error("Error delete contacts", error)
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
         fetchContacts()
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
            'Email',
            'Sujet',
            'Message',
            'Statut'
       ],
       ...contacts.value.map(contact => [
          contact.name,
           contact.email,
            contact.subject,
           contact.message,
           contact.reply ? 'Répondu' : 'Non Répondu'
        ])
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'Contacts');
    XLSX.writeFile(wb, 'contacts.xlsx');
};

const generatePDF = () => {
    const doc = new jsPDF();
    const headers = [
         'Nom',
         'Email',
         'Sujet',
         'Message',
         'Statut'
    ];
    const data = contacts.value.map(contact => [
        contact.name,
        contact.email,
        contact.subject,
       contact.message,
       contact.reply ? 'Répondu' : 'Non Répondu'
    ]);

    doc.autoTable({ head: [headers], body: data });
    doc.save('contacts.pdf');
};
watch(searchQuery, () => {
  currentPage.value = 1
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