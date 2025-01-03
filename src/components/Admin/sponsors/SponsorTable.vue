<template>
    <div class="overflow-x-auto">
        <table class="min-w-full leading-normal border-collapse">
            <thead>
            <tr>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Type de Sponsor
                </th>
                <th v-if="sponsorType === 'entreprise'" class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                     Nom de l'entreprise
                </th>
                 <th  v-if="sponsorType === 'entreprise'" class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nom du dirigeant
                </th>
               <th v-if="sponsorType === 'particulier'" class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nom
                </th>
                <th v-if="sponsorType === 'particulier'" class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Prénom
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                </th>
                 <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                   Téléphone
                </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                   Niveau Sponsoring
                </th>
                 <th v-if="sponsorType === 'particulier'" class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Secteur d'activité
                </th>
                 <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                </th>
                 <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Approuvé
                </th>
                   <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Commentaires
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="sponsor in sponsors" :key="sponsor.id" class="hover:bg-gray-50">
                  <td class="px-5 py-5 border-b border-gray-200 text-sm">{{ sponsor.type_sponsor }}</td>
                   <td v-if="sponsorType === 'entreprise'" class="px-5 py-5 border-b border-gray-200 text-sm">{{ sponsor.nom_entreprise }}</td>
                   <td v-if="sponsorType === 'entreprise'" class="px-5 py-5 border-b border-gray-200 text-sm">{{ sponsor.nom_dirigeant }}</td>
                  <td v-if="sponsorType === 'particulier'" class="px-5 py-5 border-b border-gray-200 text-sm">{{ sponsor.nom }}</td>
                  <td v-if="sponsorType === 'particulier'" class="px-5 py-5 border-b border-gray-200 text-sm">{{ sponsor.prenom }}</td>
                <td class="px-5 py-5 border-b border-gray-200 text-sm">{{ sponsor.user.email }}</td>
                <td class="px-5 py-5 border-b border-gray-200 text-sm">{{ sponsor.telephone }}</td>
                 <td class="px-5 py-5 border-b border-gray-200 text-sm">{{ sponsor.niveau_sponsoring }}</td>
                  <td v-if="sponsorType === 'particulier'" class="px-5 py-5 border-b border-gray-200 text-sm">{{ sponsor.secteurActivite ? sponsor.secteurActivite.nom : 'N/A' }}</td>
                 <td class="px-5 py-5 border-b border-gray-200 text-sm">
                      <div class="flex items-center space-x-2">
                       <button @click="$emit('edit', sponsor.id)"
                               class="px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                          Modifier
                       </button>
                        <button @click="$emit('delete', sponsor.id)"
                                class="px-3 py-1 text-xs font-medium text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300">
                           Supprimer
                        </button>
                      </div>
                  </td>
                     <td class="px-5 py-5 border-b border-gray-200 text-sm">
                        <select v-model="sponsor.est_approuve" @change="handleStatusChange(sponsor)"
                                class="block w-full px-3 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500">
                            <option :value="true">Oui</option>
                            <option :value="false">Non</option>
                        </select>
                     </td>
                     <td class="px-5 py-5 border-b border-gray-200 text-sm">
                           {{ sponsor.commentaires }}
                   </td>
            </tr>
            </tbody>
        </table>
    </div>
    <div v-if="!sponsors.length" class="text-center py-6 text-gray-500">
        Aucun sponsor trouvé.
    </div>
        <!-- Boutons pour exporter -->
    <div class="flex justify-end mt-4 space-x-2" v-if="sponsors.length">
        <button @click="$emit('export-pdf')"
            class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                Exporter en PDF
        </button>
        <button @click="$emit('export-excel')"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Exporter en Excel
        </button>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
const props = defineProps({
  sponsors: { type: Array, required: true },
  sponsorType: { type: String, required: true },
});
const emit = defineEmits(['edit', 'delete', 'update-status', 'export-pdf', 'export-excel']);

const handleStatusChange = (sponsor) => {
  emit('update-status', { id: sponsor.id, est_approuve: sponsor.est_approuve });
};
</script>