<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#9C7C13] to-[#D4AF37] p-6">
    <div class="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
      <h2 class="text-4xl font-bold text-center mb-8 text-[#9C7C13]">Devenir Sponsor</h2>

      <!-- Sélection du type de sponsor -->
      <div class="mb-8" v-if="step === 1">
        <h3 class="text-2xl font-semibold mb-6 text-[#9C7C13]">Type de Sponsor</h3>
        <div class="grid grid-cols-2 gap-4">
          <button
            @click="selectSponsorType('entreprise')"
            :class="['p-6 rounded-lg border-2 transition-all',
              sponsorData.type_sponsor === 'entreprise'
                ? 'border-[#9C7C13] bg-[#9C7C13] bg-opacity-10'
                : 'border-gray-200']"
          >
            <h4 class="text-xl font-semibold mb-2">Entreprise</h4>
            <p class="text-sm text-gray-600">Pour les sociétés et organisations</p>
          </button>
          <button
            @click="selectSponsorType('particulier')"
            :class="['p-6 rounded-lg border-2 transition-all',
              sponsorData.type_sponsor === 'particulier'
                ? 'border-[#9C7C13] bg-[#9C7C13] bg-opacity-10'
                : 'border-gray-200']"
          >
            <h4 class="text-xl font-semibold mb-2">Particulier</h4>
            <p class="text-sm text-gray-600">Pour les personnes individuelles</p>
          </button>
        </div>
      </div>

      <!-- Formulaire Entreprise -->
      <div v-if="step === 2 && sponsorData.type_sponsor === 'entreprise'" class="space-y-6">
        <h3 class="text-2xl font-semibold mb-6 text-[#9C7C13]">Informations de l'Entreprise</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Nom de l'entreprise *</label>
            <input
              v-model="sponsorData.nom_entreprise"
              type="text"
              class="input-field"
              :class="{'border-red-500': validationErrors.nom_entreprise}"
            />
            <p v-if="validationErrors.nom_entreprise" class="text-red-500 text-sm mt-1">
              Le nom de l'entreprise est requis
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Nom du dirigeant *</label>
            <input
              v-model="sponsorData.nom_dirigeant"
              type="text"
              class="input-field"
              :class="{'border-red-500': validationErrors.nom_dirigeant}"
            />
            <p v-if="validationErrors.nom_dirigeant" class="text-red-500 text-sm mt-1">
              Le nom du dirigeant est requis
            </p>
          </div>
           <div>
                <label class="block text-sm font-medium text-gray-700">Email du dirigeant *</label>
                <input
                    v-model="sponsorData.email_dirigeant"
                    type="email"
                    class="input-field"
                    :class="{'border-red-500': validationErrors.email_dirigeant}"
                />
                <p v-if="validationErrors.email_dirigeant" class="text-red-500 text-sm mt-1">
                    Un email valide est requis
                </p>
           </div>
           <div>
              <label class="block text-sm font-medium text-gray-700">Site web</label>
              <input v-model="sponsorData.site_web" type="url" class="input-field"
              :class="{'border-red-500': validationErrors.site_web}"
              @blur="validateWebsite"
              />
              <p v-if="validationErrors.site_web" class="text-red-500 text-sm mt-1">
                  Veuillez entrer une URL valide.
               </p>
           </div>
        </div>
      </div>

      <!-- Formulaire Particulier -->
      <div v-if="step === 2 && sponsorData.type_sponsor === 'particulier'" class="space-y-6">
        <h3 class="text-2xl font-semibold mb-6 text-[#9C7C13]">Informations Personnelles</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Nom *</label>
            <input
              v-model="sponsorData.nom"
              type="text"
              class="input-field"
               :class="{'border-red-500': validationErrors.nom}"
            />
             <p v-if="validationErrors.nom" class="text-red-500 text-sm mt-1">
                Le nom est requis
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Prénom *</label>
            <input
              v-model="sponsorData.prenom"
              type="text"
              class="input-field"
              :class="{'border-red-500': validationErrors.prenom}"
            />
              <p v-if="validationErrors.prenom" class="text-red-500 text-sm mt-1">
                 Le prénom est requis
               </p>
          </div>
          <div>
              <label class="block text-sm font-medium text-gray-700">Secteur d'activité *</label>
              <select
                v-model="sponsorData.secteur_activite_id"
                  class="input-field"
                  :class="{'border-red-500': validationErrors.secteur_activite_id}"
                >
                  <option value="">Sélectionnez un secteur d'activité</option>
                  <option v-for="secteur in secteursActivite" :key="secteur.id" :value="secteur.id">
                      {{ secteur.nom }}
                  </option>
              </select>
             <p v-if="validationErrors.secteur_activite_id" class="text-red-500 text-sm mt-1">
                Le secteur d'activité est requis
              </p>
           </div>
        </div>
      </div>

      <!-- Informations communes -->
      <div v-if="step === 3" class="space-y-6">
          <h3 class="text-2xl font-semibold mb-6 text-[#9C7C13]">Informations de Contact</h3>
        <div class="space-y-4">
            <div v-if="sponsorData.type_sponsor === 'particulier'">
                <label class="block text-sm font-medium text-gray-700">Email *</label>
                <input
                    v-model="sponsorData.email"
                    type="email"
                    class="input-field"
                    :class="{'border-red-500': validationErrors.email}"
                />
                <p v-if="validationErrors.email" class="text-red-500 text-sm mt-1">
                    Un email valide est requis
                </p>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Téléphone *</label>
                <input
                  v-model="sponsorData.telephone"
                  type="tel"
                  class="input-field"
                  :class="{'border-red-500': validationErrors.telephone}"
                />
                <p v-if="validationErrors.telephone" class="text-red-500 text-sm mt-1">
                   Le numéro de téléphone est requis
                </p>
             </div>
           <div>
                <label class="block text-sm font-medium text-gray-700">Niveau de sponsoring *</label>
                <select
                  v-model="sponsorData.niveau_sponsoring"
                  class="input-field"
                  :class="{'border-red-500': validationErrors.niveau_sponsoring}"
                >
                  <option value="">Sélectionnez un niveau</option>
                  <option value="bronze">Bronze</option>
                  <option value="argent">Argent</option>
                  <option value="or">Or</option>
                </select>
                <p v-if="validationErrors.niveau_sponsoring" class="text-red-500 text-sm mt-1">
                  Un niveau de sponsoring doit être sélectionné
                </p>
            </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Commentaires</label>
            <textarea v-model="sponsorData.commentaires" class="input-field h-32"></textarea>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="mt-8 flex justify-between">
        <button
          v-if="step > 1"
          @click="prevStep"
          class="btn-prev"
        >
          Précédent
        </button>
        <button
          v-if="step < 3"
          @click="nextStep"
          class="btn-next"
        >
          Suivant
        </button>
        <button
          v-if="step === 3"
          @click="submitForm"
          :disabled="isSubmitting"
          class="btn-submit relative"
        >
          <span v-if="!isSubmitting">Soumettre</span>
          <span v-if="isSubmitting" class="absolute inset-0 flex items-center justify-center">
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
       <!-- Confirmation Pop-up -->
       <div v-if="showConfirmation" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-8 rounded-lg shadow-xl text-center">
          <h3 class="text-xl font-semibold mb-4">Merci pour votre demande de sponsoring !</h3>
           <p class="mb-6">
                Veuillez consulter votre adresse e-mail pour la suite du processus.
            </p>
          <button @click="closeConfirmation" class="btn-submit">Ok</button>
        </div>
      </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { useToast } from 'vue-toastification';
import DataService from "@/services/DataService";
import {ref, onMounted} from 'vue';


export default {
  name: 'SponsorForm',
  setup() {
    const toast = useToast();
    const secteursActivite = ref([]);
    const fetchSecteursActivite = async () => {
          try {
              const response = await DataService.get('/api/secteur-activite');
              secteursActivite.value = response.data;
          } catch (error) {
              console.error('Failed to fetch secteurs activite:', error);
          }
    }
      onMounted(fetchSecteursActivite);

    return { toast, secteursActivite };
  },
  data() {
    return {
      step: 1,
      isSubmitting: false,
      validationErrors: {},
        showConfirmation: false,
      sponsorData: {
        type_sponsor: '',
        nom_entreprise: '',
        nom_dirigeant: '',
        email_dirigeant: '',
        site_web: '',
        nom: '',
        prenom: '',
        secteur_activite_id: '',
        email: '',
        telephone: '',
        niveau_sponsoring: '',
        commentaires: ''
      }
    };
  },
  methods: {
    selectSponsorType(type) {
      this.sponsorData.type_sponsor = type;
      this.nextStep();
    },
    nextStep() {
      if (this.validateCurrentStep()) {
        this.step++;
        this.validationErrors = {}; // Reset validation errors
      }
    },
    prevStep() {
      this.step--;
      this.validationErrors = {}; // Reset validation errors
    },
     validateWebsite() {
        if (this.sponsorData.site_web && !this.isValidUrl(this.sponsorData.site_web)) {
        this.validationErrors.site_web = true;
        }else{
          this.validationErrors.site_web = false;
        }
    },
    validateCurrentStep() {
      // Reset previous validation errors
      this.validationErrors = {};

      // Validation for different steps and sponsor types
     if (this.step === 2) {
         if (this.sponsorData.type_sponsor === 'entreprise') {
            if (!this.sponsorData.nom_entreprise) {
                 this.validationErrors.nom_entreprise = true;
            }
             if (!this.sponsorData.nom_dirigeant) {
                this.validationErrors.nom_dirigeant = true;
            }
            if (!this.isValidEmail(this.sponsorData.email_dirigeant)) {
               this.validationErrors.email_dirigeant = true;
              }

              if (this.sponsorData.site_web && !this.isValidUrl(this.sponsorData.site_web)) {
              this.validationErrors.site_web = true;
              }
          } else if (this.sponsorData.type_sponsor === 'particulier') {
            if (!this.sponsorData.nom) {
               this.validationErrors.nom = true;
               }
             if (!this.sponsorData.prenom) {
                   this.validationErrors.prenom = true;
            }
            if (!this.sponsorData.secteur_activite_id) {
                 this.validationErrors.secteur_activite_id = true;
              }
          }
      }

      // Validation for final step
      if (this.step === 3) {
          if (this.sponsorData.type_sponsor === 'particulier') {
              if (!this.isValidEmail(this.sponsorData.email)) {
                 this.validationErrors.email = true;
                 }
          }
         if (!this.sponsorData.telephone) {
               this.validationErrors.telephone = true;
            }
         if (!this.sponsorData.niveau_sponsoring) {
                this.validationErrors.niveau_sponsoring = true;
            }
      }

      // Return true if no validation errors
      return Object.keys(this.validationErrors).length === 0;
    },
     isValidUrl(string) {
        try {
            new URL(string);
             return true
            }
            catch (e) {
            return false
         }
    },
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return email && emailRegex.test(email);
    },
        closeConfirmation() {
         this.showConfirmation = false;
          this.$router.push({ name: 'home' });
       },
    async submitForm() {
      const authStore = useAuthStore();

      // Ensure all validations pass before submitting
      if (this.validateCurrentStep()) {
          this.isSubmitting = true;
          try {
              await authStore.registerSponsor(this.sponsorData);
                 this.showConfirmation = true;
          } catch (error) {
              this.toast.error(error.response?.data?.message || 'Une erreur est survenue');
          } finally {
            this.isSubmitting = false;
          }
      }
    }
  }
};
</script>

<style scoped>
.input-field {
  @apply w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9C7C13] focus:border-transparent transition duration-200 ease-in-out;
}

.btn-prev, .btn-next, .btn-submit {
  @apply px-6 py-3 rounded-lg text-white font-semibold transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg;
}

.btn-prev {
  @apply bg-gray-500 hover:bg-gray-600;
}

.btn-next, .btn-submit {
  @apply bg-[#9C7C13] hover:bg-[#7a6210];
}
</style>