<template>
    <div class="space-y-4">
        <div class="form-group">
            <label>Nom complet</label>
            <input
                v-model="form.name"
                type="text"
                class="form-input"
                required
            />
            <span v-if="errors.name" class="text-sm text-red-500">{{
                    errors.name
                }}</span>
        </div>
        <div class="form-group">
            <label>Prénom</label>
            <input
                v-model="form.Prénom"
                type="text"
                class="form-input"
                required
            />
            <span v-if="errors.Prénom" class="text-sm text-red-500">{{
                    errors.Prénom
                }}</span>
        </div>
         <div class="form-group">
            <label>Email</label>
            <input
                v-model="form.email"
                type="email"
                 :disabled="isEdit"
                class="form-input"
                required
            />
            <span v-if="errors.email" class="text-sm text-red-500">{{
                    errors.email
                }}</span>
        </div>
        <div class="form-group">
            <label>Numéro de téléphone</label>
            <input
                v-model="form.numeroTelephone"
                type="tel"
                class="form-input"
                required
            />
            <span v-if="errors.numeroTelephone" class="text-sm text-red-500">{{
                    errors.numeroTelephone
                }}</span>
        </div>

        <div class="form-group">
            <label>Pays</label>
            <select
                v-model="form.pays_id"
                @change="handlePaysChange"
                class="form-input"
                required
            >
                <option value="">Sélectionnez un pays</option>
                <option v-for="pays in paysList" :key="pays.id" :value="pays.id">
                    {{ pays.nom }}
                </option>
            </select>
            <span v-if="errors.pays_id" class="text-sm text-red-500">{{
                    errors.pays_id
                }}</span>
        </div>
        <div class="form-group">
            <label>Ville</label>
            <select
                v-model="form.ville_id"
                class="form-input"
                required
                :disabled="!form.pays_id"
            >
                <option value="">Sélectionnez une ville</option>
                <option v-for="ville in villesList" :key="ville.id" :value="ville.id">
                    {{ ville.nom }}
                </option>
            </select>
            <span v-if="errors.ville_id" class="text-sm text-red-500">{{
                    errors.ville_id
                }}</span>
        </div>
        <div class="form-group">
            <label> Êtes-vous du Canton NDOGBATJECK?</label>
            <select
                v-model="form.estCantonNonParlant"
                @change="handleCantonChange"
                class="form-input"
                required
            >
                <option value="">Sélectionnez</option>
                <option value="1">Oui</option>
                <option value="0">Non</option>
            </select>
            <span v-if="errors.estCantonNonParlant" class="text-sm text-red-500">{{
                    errors.estCantonNonParlant
                }}</span>
        </div>
        <div v-if="form.estCantonNonParlant === '1'" class="form-group">
            <label>Village</label>
            <select v-model="form.village_id" class="form-input" required>
                <option value="">Sélectionnez un village</option>
                <option v-for="village in villageList" :key="village.id" :value="village.id">
                    {{ village.nom }}
                </option>
            </select>
              <span v-if="errors.village_id" class="text-sm text-red-500">{{
                    errors.village_id[0]
                }}</span>
        </div>
        <div class="form-group">
            <label>Êtes-vous membre de l'association?</label>
            <select
                v-model="form.estMembreAssociation"
                class="form-input"
                required
            >
                <option value="">Sélectionnez</option>
                <option value="1">Oui</option>
                <option value="0">Non</option>
            </select>
            <span v-if="errors.estMembreAssociation" class="text-sm text-red-500">{{
                    errors.estMembreAssociation
                }}</span>
        </div>
         <div class="form-group">
            <label>Êtes-vous conférencier ?</label>
            <select
              v-model="form.estConferencier"
               class="form-input"
              required
            >
               <option value="">Sélectionnez</option>
              <option value="1">Oui</option>
              <option value="0">Non</option>
            </select>
               <span v-if="errors.estConferencier" class="text-sm text-red-500">{{
               errors.estConferencier
             }}</span>
        </div>
          <div class="form-group">
                    <label class="block mb-1 text-sm font-medium text-gray-700">
                        Souhaitez-vous participer à une activité au congrès ?
                    </label>
                    <div class="space-y-2">
                       <div
                         v-for="activite in activitesList"
                         :key="activite.id"
                        class="flex items-center"
                    >
                       <input
                      type="checkbox"
                       :id="`activite-${activite.id}`"
                      v-model="form.activite_id"
                     :value="activite.id"
                    class="w-4 h-4 text-[#06AE16] border-gray-300 rounded focus:ring-[#06AE16]"
                />
                     <label
                     :for="`activite-${activite.id}`"
                      class="ml-2 text-gray-700"
                    >
                            {{ activite.NomActivite }} ({{ activite.DateDebut }} -
                            {{ activite.Lieu }})
                        </label>
                    </div>

                    </div>
                </div>
           <!-- Themes Selection -->
            <div v-if="form.estConferencier === '1'" class="form-group">
                <label class="block mb-1 text-sm font-medium text-gray-700">
                    Veuillez sélectionner un ou plusieurs thèmes
                </label>
                <div class="space-y-2">
                    <div
                        v-for="theme in themeList"
                        :key="theme.id"
                        class="flex items-center"
                    >
                        <input
                            type="checkbox"
                            :id="`theme-${theme.id}`"
                            v-model="form.themes"
                            :value="theme.id"
                            class="w-4 h-4 text-[#06AE16] border-gray-300 rounded focus:ring-[#06AE16]"
                        />
                        <label
                            :for="`theme-${theme.id}`"
                            class="ml-2 text-gray-700"
                        >{{ theme.nom }}</label
                        >
                    </div>
                </div>
            </div>
        <div class="mt-6">
            <button
                @click="submitForm"
                :disabled="isSubmitting"
                class="btn-primary"
            >
                <span v-if="!isSubmitting">{{ submitText }}</span>
                <span v-else>
          <i class="fas fa-spinner animate-spin"></i> En cours...
        </span>
            </button>
            <button type="button" @click="$emit('cancel')" class="ml-2 btn-secondary">Annuler</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, nextTick } from 'vue';
import PaysService from '@/services/PaysService';
import VilleService from '@/services/VilleService';
import VillageService from '@/services/VillageService';
import ThemeService from '@/services/ThemeService';
import ActiviteService from '@/services/ActiviteService'
const props = defineProps({
    participant: {
        type: Object,
         default: () => ({
            name: '',
            email: '',
            Prénom: '',
            numeroTelephone: '',
            pays_id: '',
            ville_id: '',
            estMembreAssociation: false,
            estCantonNonParlant: false,
            estConferencier: false,
             village_id: null,
             activite_id : [],
              themes : []
        }),
    },
    submitText: {
        type: String,
        default: 'Enregistrer',
    },
     isEdit: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['submit', 'cancel']);
const form = ref({ ...props.participant });
const paysList = ref([]);
const villesList = ref([]);
const villageList = ref([]);
const errors = ref({});
const isSubmitting = ref(false);
const themeList = ref([]);
const activitesList = ref([]);


onMounted(async () => {
    try {
        const response = await PaysService.getAllPays();
        paysList.value = response.data?.data || response.data || [];
        if (props.participant.pays_id) {
            await fetchVilles();
            if (props.participant.village_id) {
                await fetchVillages();
            }
             if(props.participant.estConferencier === '1'){
               await fetchThemes()
            }

        }
          await fetchActivites();
        await nextTick()
          if(props.participant.activite_id){
              if (!Array.isArray(form.value.activite_id)) {
                 form.value.activite_id = [form.value.activite_id]
              }
           }
           if(props.participant.themes){
                if (!Array.isArray(form.value.themes)) {
                     form.value.themes = [form.value.themes]
                }
          }
          if(props.participant.name){
            form.value.name = props.participant.user.name
          }
           if(props.participant.email){
            form.value.email = props.participant.user.email
          }
    } catch (error) {
        console.error("Erreur lors du chargement des pays:", error);
    }
});
 watch(() => form.value.pays_id, async (newPaysId) => {
    if (newPaysId) {
       await fetchVilles();
    } else {
      villesList.value = [];
    }
});
watch(() => form.value.estCantonNonParlant, async (newCantonValue) => {
    if(newCantonValue === '1'){
       await  fetchVillages();
    } else {
      form.value.village_id = null;
    }

})
 watch(() => form.value.estConferencier, async (newConferencier) => {
     if(newConferencier === '1'){
           await fetchThemes()
     }else {
          form.value.themes = []
      }
 })
 const handlePaysChange = async () => {
    form.value.ville_id = null
      villesList.value = [];
      if (form.value.pays_id) {
        await fetchVilles()
      }
    };

    const fetchVilles = async () => {
        try {
             const response = await VilleService.getVillesByPays(form.value.pays_id);
            villesList.value = Array.isArray(response) ? response : response.data || [];

            } catch (error) {
             console.error("Erreur lors du chargement des villes:", error);
        }
    }
    const fetchVillages = async () => {
        try {
           const response = await VillageService.getAllVillages();
              villageList.value = Array.isArray(response) ? response : response.data || [];
        } catch (error) {
           console.error("Erreur lors de la récupération des villages:", error);
        }
    };
    const fetchThemes = async () => {
         try {
            const response = await ThemeService.getAllThemes();
            themeList.value = Array.isArray(response) ? response : response.data || [];
         } catch (error) {
               console.error("Erreur lors de la récupération des themes:", error);
         }
    }

    const fetchActivites = async () => {
        try {
             const response = await ActiviteService.getAllActivites();
            activitesList.value = Array.isArray(response) ? response : response.data || [];
         } catch (error) {
               console.error("Erreur lors de la récupération des activites:", error);
        }
    }
 const handleCantonChange = async () => {
      if(form.value.estCantonNonParlant === '1'){
          await fetchVillages()
      }
      else{
          form.value.village_id = null
      }
 }

const validateForm = () => {
    errors.value = {};
    let isValid = true;

     if (!form.value.name) {
          errors.value.name = 'Le nom est requis';
          isValid = false;
        }
     if (!form.value.Prénom) {
          errors.value.Prénom = 'Le Prénom est requis';
          isValid = false;
        }
      if (!form.value.email) {
        errors.value.email = 'L\'email est requis';
        isValid = false;
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.value.email)) {
        errors.value.email = "L'email doit être au format valide (ex: exemple@gmail.com)";
        isValid = false;
      }
       if (!form.value.numeroTelephone) {
        errors.value.numeroTelephone = 'Le numéro de téléphone est requis';
        isValid = false;
      } else if (!/^\+[1-9]\d{1,3}[0-9]{6,12}$/.test(form.value.numeroTelephone)) {
        errors.value.numeroTelephone = "Le numéro de téléphone doit être au format +237XXXXXXXX";
        isValid = false;
      }
      if (!form.value.pays_id) {
        errors.value.pays_id = 'Le pays est requis';
        isValid = false;
      }
    if (!form.value.ville_id) {
        errors.value.ville_id = 'La ville est requise';
          isValid = false;
      }
     if (form.value.estCantonNonParlant === '') {
          errors.value.estCantonNonParlant = 'Cette question est requise';
          isValid = false;
        }
        if (
          form.value.estCantonNonParlant === '1' &&
          !form.value.village_id
        ) {
          errors.value.village_id =
            'Le village est requis si vous êtes du canton NDOGBATJECK';
          isValid = false;
        }
    if (form.value.estMembreAssociation === '') {
           errors.value.estMembreAssociation = "Cette question est requise";
           isValid = false;
        }
    if (form.value.estConferencier === '') {
       errors.value.estConferencier = "Cette question est requise";
        isValid = false;
    }


    return isValid;
  }


const submitForm = async () => {
     if(!validateForm()) return;

    isSubmitting.value = true;
    try {
       let submitData = {...form.value};
        submitData.estMembreAssociation =
           submitData.estMembreAssociation === '1'
            ? true
            : false;
         submitData.estCantonNonParlant =
              submitData.estCantonNonParlant === '1'
              ? true
              : false;
         submitData.estConferencier =
               submitData.estConferencier === '1'
                   ? true
                   : false;
         if(!submitData.estCantonNonParlant) {
            delete submitData.village_id
         }
          if (submitData.estConferencier === false){
                delete submitData.themes
         }
          if(submitData.activite_id.length === 0) {
              delete submitData.activite_id
         }
          let userProfile = {
             name : submitData.name,
            email : submitData.email
          }
         delete submitData.name
         delete submitData.email

       await emit('submit', submitData, userProfile);

    } catch (error) {
      console.error('Error submitting form:', error);
     if (error.response && error.response.data.errors) {
          errors.value = error.response.data.errors;
        }
        Swal.fire(
          "Erreur",
          "Une erreur s'est produite lors de l'enregistrement.",
          "error"
        );
    } finally {
     isSubmitting.value = false;
    }
};
</script>


<style scoped>
.form-input {
  @apply w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2
       focus:ring-[#06AE16] focus:border-transparent transition-all duration-300;
}

.form-group {
  @apply space-y-2;
}

.form-group label {
  @apply block text-sm font-medium text-gray-700;
}
.btn-primary {
  @apply bg-[#06AE16] hover:bg-[#058512] text-white px-6 py-3 rounded-xl
       font-medium transition-all duration-300 transform hover:scale-105
       focus:outline-none focus:ring-2 focus:ring-[#06AE16] focus:ring-offset-2;
}
.btn-secondary {
  @apply bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl
       font-medium transition-all duration-300 transform hover:scale-105
       focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2;
}
</style>