<template>
    <form @submit.prevent="submitForm" class="space-y-6">
        <!-- Type de sponsor -->
        <div>
             <label for="type_sponsor" class="block text-sm font-medium text-gray-700">Type de Sponsor</label>
                <select id="type_sponsor" v-model="sponsor.type_sponsor" required
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
                    <option value="" disabled>Sélectionner le type de sponsor</option>
                    <option value="entreprise">Entreprise</option>
                     <option value="particulier">Particulier</option>
                </select>
        </div>

         <!-- Champs pour entreprise -->
         <div v-if="sponsor.type_sponsor === 'entreprise'">
             <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label for="nom_entreprise" class="block text-sm font-medium text-gray-700">Nom de l'entreprise</label>
                   <input type="text" id="nom_entreprise" v-model="sponsor.nom_entreprise" required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
                    </div>
                 <div>
                    <label for="nom_dirigeant" class="block text-sm font-medium text-gray-700">Nom du dirigeant</label>
                    <input type="text" id="nom_dirigeant" v-model="sponsor.nom_dirigeant" required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
                  </div>
             </div>
             <div>
                  <label for="email_dirigeant" class="block text-sm font-medium text-gray-700">Email du dirigeant</label>
                  <input type="email" id="email_dirigeant" v-model="sponsor.email_dirigeant" required
                     class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
             </div>
           <div>
               <label for="site_web" class="block text-sm font-medium text-gray-700">Site web</label>
               <input type="url" id="site_web" v-model="sponsor.site_web"
                     class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
          </div>
        </div>

        <!-- Champs pour particulier -->
       <div v-if="sponsor.type_sponsor === 'particulier'">
           <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                 <label for="nom" class="block text-sm font-medium text-gray-700">Nom</label>
                <input type="text" id="nom" v-model="sponsor.nom" required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
                 </div>
                <div>
                 <label for="prenom" class="block text-sm font-medium text-gray-700">Prénom</label>
                 <input type="text" id="prenom" v-model="sponsor.prenom" required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
               </div>
           </div>
        <div>
            <label for="secteur_activite_id" class="block text-sm font-medium text-gray-700">Secteur d'activité</label>
             <select id="secteur_activite_id" v-model.number="sponsor.secteur_activite_id" required
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
                 <option value="" disabled>Sélectionner un secteur d'activité</option>
                <option v-for="secteur in secteursActiviteList" :key="secteur.id" :value="secteur.id">{{ secteur.nom }}</option>
               </select>
         </div>
       </div>

        <!-- Champs communs -->
            <div v-if="sponsor.type_sponsor === 'particulier'">
               <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" v-model="sponsor.email" required
                     class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
             </div>
            <div>
                <label for="telephone" class="block text-sm font-medium text-gray-700">Téléphone</label>
                <input type="tel" id="telephone" v-model="sponsor.telephone" required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
            </div>
            <div>
              <label for="niveau_sponsoring" class="block text-sm font-medium text-gray-700">Niveau de sponsoring</label>
                <select id="niveau_sponsoring" v-model="sponsor.niveau_sponsoring" required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
                   <option value="" disabled>Sélectionner un niveau de sponsoring</option>
                  <option value="bronze">Bronze</option>
                  <option value="argent">Argent</option>
                  <option value="or">Or</option>
               </select>
            </div>
         <div>
              <label for="commentaires" class="block text-sm font-medium text-gray-700">Commentaires</label>
              <textarea id="commentaires" v-model="sponsor.commentaires"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"></textarea>
         </div>
       <div v-if="$route.name === 'SponsorEdit'" >
           <label for="est_approuve" class="block text-sm font-medium text-gray-700">Approuvé</label>
           <select id="est_approuve" v-model="sponsor.est_approuve"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
                <option :value="true">Oui</option>
                <option :value="false">Non</option>
            </select>
       </div>
        <div>
            <button type="submit"
              class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                {{ submitButtonText }}
           </button>
        </div>
    </form>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useToast } from 'vue-toastification';
import SecteurActiviteService from '../../../services/SecteurActiviteService';
import { useRoute } from 'vue-router';
const route = useRoute();

const toast = useToast();
const props = defineProps({
    sponsor: {
        type: Object,
        default: () => ({
            type_sponsor: '',
             nom_entreprise: '',
             nom_dirigeant: '',
             email_dirigeant: '',
             site_web: '',
            nom: '',
            prenom: '',
            secteur_activite_id: null,
            email: '',
             telephone: '',
            niveau_sponsoring: '',
            commentaires: '',
            est_approuve: false,
        }),
    },
    submitButtonText: { type: String, default: 'Enregistrer' },
});

const emit = defineEmits(['form-submitted']);

const sponsor = ref({ ...props.sponsor });
const secteursActiviteList = ref([]);

const fetchSecteursActivite = async () => {
    try {
        const data = await SecteurActiviteService.getAllSecteurActivites();
        secteursActiviteList.value = data.data;
    } catch (error) {
        console.error('Error fetching secteurs d\'activités:', error);
        toast.error('Erreur lors du chargement des secteurs d\'activités.');
    }
};


const submitForm = async () => {
    emit('form-submitted', sponsor.value);
};

watch(() => props.sponsor, (newSponsor) => {
    if (newSponsor) {
        sponsor.value = { ...newSponsor };
        if (newSponsor.user) {
         if(newSponsor.type_sponsor === 'entreprise'){
           sponsor.value.nom_entreprise = newSponsor.user.name
            sponsor.value.email_dirigeant = newSponsor.user.email
        }else{
          sponsor.value.nom = newSponsor.user.name.split(' ')[0]
           sponsor.value.prenom = newSponsor.user.name.split(' ')[1]
           sponsor.value.email = newSponsor.user.email
        }
       }
         if (newSponsor.secteurActivite) {
             sponsor.value.secteur_activite_id = newSponsor.secteurActivite.id;
         }
    }
});
onMounted(() => {
    fetchSecteursActivite();
});
</script>