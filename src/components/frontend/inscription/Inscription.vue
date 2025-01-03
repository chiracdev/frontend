<template>
  <Separator />
  <br />
  <div
    class="min-h-screen bg-gradient-to-r from-[#E8F5E9] to-[#FFF3E0] flex items-center justify-center p-6 relative z-0"
  >
    <div
      class="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 transform hover:scale-[1.01] transition-transform duration-300"
    >
      <!-- Barre de progression -->
      <div class="w-full px-6 pt-6">
        <div class="flex justify-between mb-4">
          <div
            v-for="step in totalSteps"
            :key="step"
            class="flex flex-col items-center"
          >
            <div
              class="flex items-center justify-center w-8 h-8 rounded-full"
              :class="{
                'bg-[#06AE16] text-white': currentStep >= step,
                'bg-gray-200': currentStep < step,
              }"
            >
              {{ step }}
            </div>
            <div
              class="mt-1 text-sm"
              :class="{
                'text-[#06AE16] font-semibold': currentStep >= step,
                'text-gray-400': currentStep < step,
              }"
            >
              Étape {{ step }}
            </div>
          </div>
        </div>
        <div class="w-full h-2 bg-gray-200 rounded-full">
          <div
            class="bg-[#06AE16] h-2 rounded-full transition-all duration-500"
            :style="{
              width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
            }"
          ></div>
        </div>
      </div>

      <div class="flex flex-col md:flex-row">
        <!-- Section de gauche -->
        <div
          class="relative w-full p-8 overflow-hidden bg-white md:w-1/2 rounded-l-3xl"
        >
          <div class="relative z-20">
            <h1
              class="mb-4 text-4xl font-bold text-gray-800 transition-all duration-500"
            >
              <span class="typed-text">{{ displayText }}</span>
              <span class="animate-blink">|</span>
            </h1>
            <p class="mb-6 text-gray-600 animate-fade-in">
              Nous sommes ravis de vous accueillir ! Inscrivez-vous dès
              maintenant pour participer à cet événement exceptionnel et
              rejoignez-nous pour partager des idées et des expériences
              enrichissantes.
            </p>
          </div>
          <!-- Bulles décoratives -->
          <div
            class="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 h-64 rounded-full bg-[#06AE16] opacity-20 animate-pulse"
              :class="{ 'animate-pulse-short': showPulse }"
          ></div>
          <div
            class="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-64 h-64 rounded-full bg-[#FDA304] opacity-20 animate-pulse"
               :class="{ 'animate-pulse-short': showPulse }"
          ></div>
        </div>

        <!-- Section droite - Formulaire par étapes -->
        <div
          class="relative z-20 w-full p-6 lg:w-1/2 md:p-10 bg-gray-50 rounded-r-3xl"
        >
          <form @submit.prevent="handleSubmit" class="space-y-8">
            <!-- Étape 1: Informations de base -->
            <div v-if="currentStep === 1" class="space-y-4">
              <div class="form-group">
                <label>Nom complet</label>
                <input
                  v-model="formData.name"
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
                  v-model="formData.Prénom"
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
                  v-model="formData.email"
                  type="email"
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
                  v-model="formData.numeroTelephone"
                  type="tel"
                  class="form-input"
                  required
                />
                <span
                  v-if="errors.numeroTelephone"
                  class="text-sm text-red-500"
                  >{{ errors.numeroTelephone }}</span
                >
              </div>
            </div>
            <!-- Étape 2: Détails de contact -->
            <div v-if="currentStep === 2" class="space-y-4">
              <div class="form-group">
                <label>Pays</label>
                <select
                  v-model="selectedPaysId"
                  @change="handlePaysChange"
                  class="form-input"
                  required
                >
                  <option value="">Sélectionnez un pays</option>
                  <option
                    v-for="pays in paysList"
                    :key="pays.id"
                    :value="pays.id"
                  >
                    {{ pays.nom }}
                  </option>
                </select>
                <span v-if="errors.pays" class="text-sm text-red-500">{{
                  errors.pays
                }}</span>
              </div>
              <div class="form-group">
                <label>Ville</label>
                <select
                  v-model="selectedVilleId"
                  class="form-input"
                  required
                  :disabled="!selectedPaysId"
                >
                  <option value="">Sélectionnez une ville</option>
                  <option
                    v-for="ville in villesList"
                    :key="ville.id"
                    :value="ville.id"
                  >
                    {{ ville.nom }}
                  </option>
                </select>
                <span v-if="errors.ville" class="text-sm text-red-500">{{
                  errors.ville
                }}</span>
              </div>
            </div>

            <!-- Étape 3: Localisation -->
            <div v-if="currentStep === 3" class="space-y-4">
              <div class="form-group">
                <label> Êtes-vous du Canton NDOGBATJECK?</label>
                <select
                  v-model="formData.estCantonNonParlant"
                  @change="handleCantonChange"
                  class="form-input"
                  required
                >
                  <option value="">Sélectionnez</option>
                  <option value="oui">Oui</option>
                  <option value="non">Non</option>
                </select>
                <span
                  v-if="errors.estCantonNonParlant"
                  class="text-sm text-red-500"
                  >{{ errors.estCantonNonParlant }}</span
                >
              </div>
              <div
                v-if="formData.estCantonNonParlant === 'oui'"
                class="form-group"
              >
                <label>Village</label>
                <select
                  v-model="formData.village_id"
                  class="form-input"
                  required
                >
                  <option value="">Sélectionnez un village</option>
                  <option
                    v-for="village in villageList"
                    :key="village.id"
                    :value="village.id"
                  >
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
                  v-model="formData.estMembreAssociation"
                  class="form-input"
                  required
                >
                  <option value="">Sélectionnez</option>
                  <option value="oui">Oui</option>
                  <option value="non">Non</option>
                </select>
                <span
                  v-if="errors.estMembreAssociation"
                  class="text-sm text-red-500"
                  >{{ errors.estMembreAssociation }}</span
                >
              </div>
            </div>

            <!-- Étape 4: Activités et Thèmes -->
            <div v-if="currentStep === 4" class="space-y-4">
                <div class="form-group">
                    <label class="block mb-1 text-sm font-medium text-gray-700">
                        Souhaitez-vous participer à une activité au congrès ?
                    </label>
                    <select
                        v-model="selectedActivites"
                        class="form-input"
                        @change="handleActivityChange"
                    >
                        <option value="">Sélectionner une activité</option>
                        <option
                            v-for="activite in activitesList"
                            :key="activite.id"
                            :value="activite.id"
                        >
                            {{ activite.NomActivite }} ({{ activite.DateDebut }} -
                            {{ activite.Lieu }})
                        </option>
                    </select>
                </div>
              <div class="form-group">
                <label>Êtes-vous conférencier ?</label>
                <select
                  v-model="formData.estConferencier"
                  @change="handleConferencierChange"
                  class="form-input"
                  required
                >
                  <option value="">Sélectionnez</option>
                  <option value="oui">Oui</option>
                  <option value="non">Non</option>
                </select>
              </div>
              <!-- Themes Selection -->
              <div v-if="showThemes" class="form-group">
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
                      v-model="formData.themes"
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
            </div>

            <!-- Boutons de navigation -->
            <div class="flex flex-wrap justify-between gap-4 mt-8">
              <button
                type="button"
                v-if="currentStep > 1"
                @click="prevStep"
                class="flex items-center gap-2 px-6 py-3 font-medium text-gray-700 transition-all duration-300 bg-gray-200 hover:bg-gray-300 rounded-xl"
              >
                <span>←</span> Retour
              </button>

              <button
                type="button"
                v-if="currentStep < totalSteps"
                @click="nextStep"
                class="px-6 py-3 bg-[#06AE16] hover:bg-[#058512] text-white rounded-xl font-medium transition-all duration-300 flex items-center gap-2"
              >
                Suivant <span>→</span>
              </button>

               <button
                v-if="currentStep === totalSteps"
                type="submit"
                :disabled="isSubmitting"
                class="px-6 py-3 bg-[#06AE16] hover:bg-[#058512] text-white rounded-xl font-medium transition-all duration-300 flex items-center gap-2 relative"
              >
                  <span v-if="!isSubmitting">Terminer ✓</span>
                  <span v-if="isSubmitting" class="absolute inset-0 flex items-center justify-center">
                      <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                  </span>
              </button>


              <button
                type="button"
                @click="saveForLater"
                class="flex items-center gap-2 px-6 py-3 font-medium text-white transition-all duration-300 bg-amber-500 hover:bg-amber-600 rounded-xl"
              >
                <span>💾</span> Sauvegarder
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
         <!-- Confirmation Pop-up -->
         <div v-if="showConfirmation" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="bg-white p-8 rounded-lg shadow-xl text-center">
                <h3 class="text-xl font-semibold mb-4">Merci pour votre inscription au congrès!</h3>
                <p class="mb-6">
                    Veuillez consulter votre adresse e-mail pour votre code QR.
                </p>
                <button @click="closeConfirmation" class="btn-submit">Ok</button>
            </div>
         </div>
          <!-- Fireworks Container -->
        <div v-if="showFireworks" class="fireworks-container">
          <div class="firework"></div>
          <div class="firework"></div>
          <div class="firework"></div>
            <div class="firework"></div>
          <div class="firework"></div>
          <div class="firework"></div>
           <div class="firework"></div>
          <div class="firework"></div>
             <div class="confetti-container">
                <canvas ref="confettiCanvas" class="confetti-canvas"></canvas>
            </div>
        </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import PaysService from "@/services/PaysService";
import VilleService from "@/services/VilleService";
import VillageService from "@/services/VillageService";
import ThemeService from "@/services/ThemeService";
import ActiviteService from "@/services/ActiviteService";
import { useAuthStore } from "@/stores/auth";
import Swal from "sweetalert2";
import { nanoid } from "nanoid";
import Separator from "@/components/frontend/separator/Separator.vue";
import { useRouter } from "vue-router";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/solid"; // Pour les icônes pleines
import confetti from 'canvas-confetti';

export default {
  name: "Inscription",
  components: {
    EyeIcon,
    EyeSlashIcon,
    Separator,
  },
  setup() {
      const confettiCanvas = ref(null);
    const router = useRouter();
    const authStore = useAuthStore();
    const paysList = ref([]);
    const villesList = ref([]);
    const villageList = ref([]);
    const themeList = ref([]);
    const activitesList = ref([]);
    const isLoading = ref(false);
    const errors = ref({});
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\+[1-9]\d{1,3}[0-9]{6,12}$/;

    const showPassword = ref(false);
    const showPasswordConfirmation = ref(false);
    const displayText = ref("");
    const typedIndex = ref(0);
    const typedStrings = ref([
      "Inscrivez-vous maintenant au Congrès NDOGBATJECK!",
      "Rejoignez-nous pour une expérience inoubliable!",
      "Venez célébrer et partager nos valeurs!",
      "Participez au Congrès et faites entendre votre voix!",
      "Soyez acteur du changement, rejoignez-nous!",
      "Unissons nos forces au Congrès NDOGBATJECK!",
    ]);
      const isSubmitting = ref(false);
      const showConfirmation = ref(false);
        const showFireworks = ref(false);
    const selectedPaysId = ref("");
    const selectedVilleId = ref("");
    const showVillages = ref(false);
    const showThemes = ref(false);
     const selectedActivites = ref("");
     const confettiLaunched = ref(false);
       const showPulse = ref(true); // Ajout de la variable showPulse
        let pulseTimeout = null;
    const formData = ref({
      name: "",
      email: "",
      Prénom: "",
      numeroTelephone: "",
      pays_id: "",
      ville_id: "",
      estMembreAssociation: false,
      estCantonNonParlant: false,
      estConferencier: false,
      village_id: null,
      activite_id: [],
      themes: [],
    });
    const currentStep = ref(1);
    const totalSteps = 4;

    onMounted(async () => {
      try {
        const response = await PaysService.getAllPays();
        paysList.value = response.data?.data || response.data || [];
        startTypedText();
        await getActivites();
        startPulseAnimation();
      } catch (error) {
        console.error("Erreur lors du chargement des pays:", error);
      }
    });
    onUnmounted(() => {
      clearTimeout(pulseTimeout);
    });

    const startTypedText = () => {
      setInterval(() => {
        typedIndex.value = (typedIndex.value + 1) % typedStrings.value.length;
        displayText.value = typedStrings.value[typedIndex.value];
      }, 3000);
    };
 const startPulseAnimation = () => {
      pulseTimeout = setTimeout(() => {
            showPulse.value = false; // Stop the animation after 5 seconds
        }, 5000);
 };
    const handlePaysChange = async () => {
      selectedVilleId.value = "";
      villesList.value = [];

      if (selectedPaysId.value) {
        try {
          isLoading.value = true;
          const response = await VilleService.getVillesByPays(
            selectedPaysId.value
          );
          villesList.value = Array.isArray(response)
            ? response
            : response.data || [];
          formData.value.pays_id = selectedPaysId.value;
        } catch (error) {
          console.error("Erreur lors du chargement des villes:", error);
        } finally {
          isLoading.value = false;
        }
      }
    };

    const fetchVillages = async () => {
      try {
        villageList.value = await VillageService.getAllVillages();
      } catch (error) {
        console.error("Erreur lors de la récupération des villages:", error);
      }
    };

    const handleCantonChange = () => {
      if (formData.value.estCantonNonParlant === "oui") {
        fetchVillages();
      } else {
        formData.value.village_id = null;
      }
    };

    const getActivites = async () => {
      try {
        const activities = await ActiviteService.getAllActivites();
        activitesList.value = Array.isArray(activities) ? activities : [];
      } catch (error) {
        console.error("Erreur lors de la récupération des activités:", error);
      }
    };

    const handleConferencierChange = () => {
      showThemes.value = formData.value.estConferencier === "oui";
      if (showThemes.value) {
        getThemes();
      } else {
        formData.value.themes = [];
      }
    };
    const handleActivityChange = () => {
        formData.value.activite_id = selectedActivites.value ? [selectedActivites.value] : [];
      };

    const getThemes = async () => {
      try {
        themeList.value = await ThemeService.getAllThemes();
      } catch (error) {
        console.error("Erreur lors de la récupération des thèmes:", error);
      }
    };

    const validateCurrentStep = () => {
      errors.value = {}; // Réinitialiser les erreurs
      let isValid = true;

      // Validation pour l'étape 1
      if (currentStep.value === 1) {
        if (!formData.value.name) {
          errors.value.name = "Le nom est requis";
          isValid = false;
        }
        if (!formData.value.email) {
          errors.value.email = "L'email est requis";
          isValid = false;
        } else if (!emailRegex.test(formData.value.email)) {
          errors.value.email =
            "L'email doit être au format valide (ex: exemple@gmail.com)";
          isValid = false;
        }
      }

      // Validation pour l'étape 2
      if (currentStep.value === 2) {
        if (!formData.value.Prénom) {
          errors.value.Prénom = "Le Prénom est requis";
          isValid = false;
        }
        if (!formData.value.numeroTelephone) {
          errors.value.numeroTelephone = "Le numéro de téléphone est requis";
          isValid = false;
        } else if (!phoneRegex.test(formData.value.numeroTelephone)) {
          errors.value.numeroTelephone =
            "Le numéro de téléphone doit être au format +237XXXXXXXX";
          isValid = false;
        }
        if (!formData.value.pays_id) {
          errors.value.pays = "Le pays est requis";
          isValid = false;
        }
      }

      // Validation pour l'étape 3
      if (currentStep.value === 3) {
        if (!formData.value.estCantonNonParlant) {
          errors.value.estCantonNonParlant = "Cette question est requise";
          isValid = false;
        }
        if (
          formData.value.estCantonNonParlant === "oui" &&
          !formData.value.village_id
        ) {
          errors.value.village_id =
            "Le village est requis si vous êtes du canton NDOGBATJECK";
          isValid = false;
        }
        if (!formData.value.estMembreAssociation) {
          errors.value.estMembreAssociation = "Cette question est requise";
          isValid = false;
        }
      }

      // Validation pour l'étape 4
      if (currentStep.value === 4) {
        if (!formData.value.estConferencier) {
          errors.value.estConferencier = "Cette question est requise";
          isValid = false;
        }
          if (!selectedActivites.value) {
           errors.value.selectedActivites = "Selectionez une activite ";
             isValid = false;
         }
        if (
          formData.value.estConferencier === "oui" &&
          formData.value.themes.length === 0
        ) {
          errors.value.themes =
            "Veuillez sélectionner au moins un thème si vous êtes conférencier";
          isValid = false;
        }
      }

      if (!isValid) {
        Swal.fire({
          title: "Erreur",
          text: "Veuillez remplir tous les champs obligatoires.",
          icon: "warning",
          confirmButtonText: "OK",
        });
      }

      return isValid;
    };
     const closeConfirmation = () => {
        showConfirmation.value = false;
        router.push("/");
    };

     const triggerFireworks = () => {
        if(!confettiLaunched.value){
              confettiLaunched.value = true;
              const fireworkDuration = 20 * 1000; // Durée des feux d'artifice en millisecondes
            showFireworks.value = true;
              const interval = 300
           const confettiInterval = setInterval(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff0', '#0ff', '#f0f'],
        });
         }, interval)

              setTimeout(() => {
                clearInterval(confettiInterval)
                 showFireworks.value = false;
                  if (confettiCanvas.value) {
            confettiCanvas.value.getContext('2d').clearRect(0, 0, confettiCanvas.value.width, confettiCanvas.value.height);
        }

             }, fireworkDuration)
        }
    };

     const handleSubmit = async () => {
        if (!validateCurrentStep()) return;

        let dataToSubmit = { ...formData.value };
        dataToSubmit.ville_id = selectedVilleId.value;
        dataToSubmit.estMembreAssociation =
            dataToSubmit.estMembreAssociation === "oui";
        dataToSubmit.estCantonNonParlant =
            dataToSubmit.estCantonNonParlant === "oui";
        dataToSubmit.estConferencier = dataToSubmit.estConferencier === "oui";
         dataToSubmit.activite_id = selectedActivites.value? [selectedActivites.value] : [];
        if (!dataToSubmit.estCantonNonParlant) {
            delete dataToSubmit.village_id;
        }

        if (dataToSubmit.estConferencier) {
            dataToSubmit.themes = formData.value.themes;
        } else {
            delete dataToSubmit.themes;
        }

        isSubmitting.value = true;
        try {
          await authStore.registerParticipant(dataToSubmit);
             showConfirmation.value = true;
              triggerFireworks();

          /*Swal.fire({
            title: "Succès!",
            text: "Inscription réussie!",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            router.push("/");
          });*/
        } catch (error) {
          console.error("Erreur lors de la pré-inscription:", error);
          if (error.response && error.response.data.errors) {
            errors.value = error.response.data.errors;
          }
          Swal.fire(
            "Erreur",
            "Une erreur s'est produite lors de l'inscription.",
            "error"
          );
        } finally {
            isSubmitting.value = false;
        }
    };


    const prevStep = () => {
      if (currentStep.value > 1) {
        currentStep.value--;
      }
    };
    const saveForLater = async () => {
      try {
        // Générer un ID unique pour la sauvegarde
        const saveId = nanoid(10);

        // Créer l'objet de sauvegarde
        const saveData = {
          formData: formData.value,
          currentStep: currentStep.value,
          timestamp: new Date().toISOString(),
        };

        // Sauvegarder dans le localStorage
        localStorage.setItem(
          `registration_${saveId}`,
          JSON.stringify(saveData)
        );

        // Générer le lien de reprise
        const resumeLink = `${window.location.origin}/inscription?saveId=${saveId}`;

        // Afficher le lien à l'utilisateur
        await Swal.fire({
          title: "Sauvegarde réussie!",
          html: `
        <p>Voici votre lien pour reprendre l'inscription plus tard:</p>
        <div class="p-2 mt-2 bg-gray-100 rounded select-all">
          <code>${resumeLink}</code>
        </div>
        <p class="mt-2 text-sm">Copiez et conservez ce lien précieusement!</p>
      `,
          icon: "success",
          confirmButtonText: "Copier le lien",
          showCancelButton: true,
          cancelButtonText: "Fermer",
        }).then((result) => {
          if (result.isConfirmed) {
            navigator.clipboard.writeText(resumeLink);
            Swal.fire(
              "Copié!",
              "Le lien a été copié dans votre presse-papiers",
              "success"
            );
          }
        });
      } catch (error) {
        console.error("Erreur lors de la sauvegarde:", error);
        Swal.fire(
          "Erreur",
          "Impossible de sauvegarder votre progression",
          "error"
        );
      }
    };

    const nextStep = () => {
      if (validateCurrentStep()) {
        if (currentStep.value < totalSteps) {
          currentStep.value++;
        }
      }
    };

    return {
      formData,
      selectedPaysId,
      selectedVilleId,
      paysList,
      villesList,
      villageList,
      themeList,
      activitesList,
      isLoading,
      errors,
      displayText,
      handleSubmit,
      handlePaysChange,
      handleCantonChange,
      showVillages,
      showThemes,
      handleConferencierChange,
         handleActivityChange,
      selectedActivites,
      currentStep,
      totalSteps,
      prevStep,
      nextStep,
      saveForLater,
        isSubmitting,
        showConfirmation,
        closeConfirmation,
        showFireworks,
        confettiCanvas,
         showPulse
    };
  },
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

.loader {
  border: 2px solid white;
  border-top: 2px solid #06ae16;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.animate-blink {
  animation: blink-animation 1s steps(5, start) infinite;
}

@keyframes blink-animation {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: #06ae16;
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-in-out forwards;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slide-up 0.5s ease-in-out forwards;
}

@keyframes slide-up {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.bulle {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-25%, -25%);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #06ae16;
  opacity: 0.2;
  animation: pulse 2s infinite;
}
.animate-pulse-short {
  animation: pulse-short 1s ease-in-out;
}

@keyframes pulse-short {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
}
.bulle:nth-child(2) {
  transform: translate(-75%, 25%);
  background-color: #fda304;
}

@keyframes pulse {
  0% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
.fireworks-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}
.firework {
    position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #f7f709;
    box-shadow: 0 0 20px #f7f709, 0 0 40px #ff8400;
    animation: firework-explosion 2s ease-out;
}
.firework:nth-child(1) {
  animation-delay: 0.2s;
  top: 20%;
  left: 10%;
}

.firework:nth-child(2) {
    animation-delay: 0.4s;
    top: 30%;
  left: 80%;
}

.firework:nth-child(3) {
  animation-delay: 0.6s;
   top: 70%;
  left: 20%;
}
.firework:nth-child(4) {
    animation-delay: 0.8s;
    top: 80%;
  left: 90%;
}
.firework:nth-child(5) {
  animation-delay: 1s;
   top: 10%;
  left: 40%;
}
.firework:nth-child(6) {
  animation-delay: 1.2s;
   top: 50%;
  left: 70%;
}
.firework:nth-child(7) {
    animation-delay: 1.4s;
  top: 20%;
  left: 60%;
}
.firework:nth-child(8) {
    animation-delay: 1.6s;
    top: 70%;
  left: 90%;
}

@keyframes firework-explosion {
    0% {
        transform: translate(-50%, -50%) scale(0);
    }
    50% {
        transform: translate(-50%, -50%) scale(1.5);
      opacity: 1;
    }
     80% {
        transform: translate(-50%, -50%) scale(1);
          opacity: 1;
    }
    100%{
         opacity: 0;
       transform: translate(-50%, -50%) scale(0);
    }
}
.confetti-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 10000; /* Ensure confetti is on top */
}

.confetti-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>