<template>
  <div
    class="min-h-screen bg-gradient-to-r from-[#E8F5E9] to-[#FFF3E0] flex items-center justify-center p-6 relative z-0"
  >
    <div
      class="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 transform hover:scale-[1.01] transition-transform duration-300"
    >
      <div class="flex flex-col md:flex-row">
        <!-- Left Section -->
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
          <div
            class="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 h-64 rounded-full bg-[#06AE16] opacity-20 animate-pulse"
          ></div>
          <div
            class="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-64 h-64 rounded-full bg-[#FDA304] opacity-20 animate-pulse"
          ></div>
        </div>

        <!-- Right Section -->
        <div
          class="relative z-20 w-full p-10 md:w-1/2 bg-gray-50 rounded-r-3xl"
        >
          <div class="max-w-sm mx-auto">
            <h2 class="mb-8 text-3xl font-semibold text-center text-gray-800">
              Inscription
            </h2>
            <form
              @submit.prevent="handleSubmit"
              class="space-y-6 animate-slide-up"
            >

            
              <!-- Name -->
              <div class="form-group">
                <label class="block mb-1 text-sm font-medium text-gray-700"
                  >Nom</label
                >
                <input
                  v-model="formData.name"
                  type="text"
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#06AE16] focus:border-transparent transition-all duration-300"
                  :class="{ 'border-red-500': errors.name }"
                  required
                />
                <span v-if="errors.name" class="text-sm text-red-500">{{
                  errors.name
                }}</span>
              </div>

              <!-- Email -->
              <div class="form-group">
                <label class="block mb-1 text-sm font-medium text-gray-700"
                  >Email</label
                >
                <input
                  v-model="formData.email"
                  type="email"
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#06AE16] focus:border-transparent transition-all duration-300"
                  :class="{ 'border-red-500': errors.email }"
                  required
                />
                <span v-if="errors.email" class="text-sm text-red-500">{{
                  errors.email
                }}</span>
              </div>

              <!-- Password -->
              <div class="form-group">
                <label class="block mb-1 text-sm font-medium text-gray-700"
                  >Mot de passe</label
                >
                <input
                  v-model="formData.password"
                  type="password"
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#06AE16] focus:border-transparent transition-all duration-300"
                  :class="{ 'border-red-500': errors.password }"
                  required
                />
                <span v-if="errors.password" class="text-sm text-red-500">
                  {{ errors.password[0] }}
                </span>
              </div>

              <!-- Confirm Password -->
              <div class="form-group">
                <label class="block mb-1 text-sm font-medium text-gray-700"
                  >Confirmer le mot de passe</label
                >
                <input
                  v-model="formData.password_confirmation"
                  type="password"
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#06AE16] focus:border-transparent transition-all duration-300"
                  :class="{ 'border-red-500': errors.password_confirmation }"
                  required
                />
                <span
                  v-if="errors.password_confirmation"
                  class="text-sm text-red-500"
                >
                  {{ errors.password_confirmation[0] }}
                </span>
              </div>

              <!-- Adresse -->
              <div class="form-group">
                <label class="block mb-1 text-sm font-medium text-gray-700"
                  >Adresse</label
                >
                <input
                  v-model="formData.adresse"
                  type="text"
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#06AE16] focus:border-transparent transition-all duration-300"
                  :class="{ 'border-red-500': errors.adresse }"
                  required
                />
                <span v-if="errors.adresse" class="text-sm text-red-500">{{
                  errors.adresse
                }}</span>
              </div>

              <!-- Numéro de téléphone -->
              <div class="form-group">
                <label class="block mb-1 text-sm font-medium text-gray-700"
                  >Numéro de téléphone</label
                >
                <input
                  v-model="formData.numeroTelephone"
                  type="tel"
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#06AE16] focus:border-transparent transition-all duration-300"
                  :class="{ 'border-red-500': errors.numeroTelephone }"
                  required
                />
                <span
                  v-if="errors.numeroTelephone"
                  class="text-sm text-red-500"
                  >{{ errors.numeroTelephone }}</span
                >
              </div>

              <!-- État civil -->
              <div class="form-group">
                <label class="block mb-1 text-sm font-medium text-gray-700"
                  >État civil</label
                >
                <select
                  v-model="formData.etatCivil"
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#06AE16] focus:border-transparent transition-all duration-300"
                  :class="{ 'border-red-500': errors.etatCivil }"
                  required
                >
                  <option value="" disabled>
                    Sélectionnez votre état civil
                  </option>
                  <option value="celibataire">Célibataire</option>
                  <option value="marie">Marié(e)</option>
                  <option value="divorce">Divorcé(e)</option>
                  <option value="veuf">Veuf/Veuve</option>
                </select>
                <span v-if="errors.etatCivil" class="text-sm text-red-500">{{
                  errors.etatCivil
                }}</span>
              </div>

              <!-- Country Selection -->
              <div class="form-group">
                <label class="block mb-1 text-sm font-medium text-gray-700"
                  >Pays</label
                >
                <select
                  v-model="selectedPaysId"
                  @change="handlePaysChange"
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#06AE16] focus:border-transparent transition-all duration-300"
                  :class="{ 'border-red-500': errors.pays }"
                  required
                >
                  <option value="" disabled>Sélectionnez un pays</option>
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

              <!-- City Selection -->
              <div class="form-group">
                <label class="block mb-1 text-sm font-medium text-gray-700"
                  >Ville</label
                >
                <select
                  v-model="selectedVilleId"
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#06AE16] focus:border-transparent transition-all duration-300"
                  :class="{ 'border-red-500': errors.ville }"
                  :disabled="!selectedPaysId"
                  required
                >
                  <option value="" disabled>
                    {{
                      selectedPaysId
                        ? "Sélectionnez une ville"
                        : "Veuillez d'abord sélectionner un pays"
                    }}
                  </option>
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

              <!-- Canton NDOGBATJECK -->
              <div class="form-group">
                <label class="block mb-1 text-sm font-medium text-gray-700"
                  >Êtes-vous du Canton NDOGBATJECK ?</label
                >
                <select
                  v-model="formData.estCantonNonParlant"
                  @change="handleCantonChange"
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#06AE16] focus:border-transparent transition-all duration-300"
                  required
                >
                  <option value="" disabled>Choisissez une option</option>
                  <option value="oui">Oui</option>
                  <option value="non">Non</option>
                </select>
              </div>

              <!-- Section Village NDOGBATJECK -->
              <div
                v-if="formData.estCantonNonParlant === 'oui'"
                class="form-group"
              >
                <label class="block mb-1 text-sm font-medium text-gray-700"
                  >Sélectionnez votre village</label
                >
                <select
                  v-model="formData.village_id"
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#06AE16] focus:border-transparent transition-all duration-300"
                  required
                >
                  <option value="" disabled>Sélectionnez un village</option>
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
              <!-- Membre Association -->
              <div class="form-group">
                <label class="block mb-1 text-sm font-medium text-gray-700"
                  >Êtes-vous membre d'une association ?</label
                >
                <select
                  v-model="formData.estMembreAssociation"
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#06AE16] focus:border-transparent transition-all duration-300"
                  required
                >
                  <option value="" disabled>Choisissez une option</option>
                  <option value="oui">Oui</option>
                  <option value="non">Non</option>
                </select>
              </div>

              <!-- New Activities Selection -->

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
                      v-model="selectedActivites"
                      :value="activite.id"
                      class="mr-2"
                    />
                    <label :for="`activite-${activite.id}`" class="text-sm">
                      {{ activite.NomActivite }} ({{ activite.DateDebut }} -
                      {{ activite.Lieu }})
                    </label>
                  </div>
                </div>
              </div>

              <!-- Souhaitez-vous être conférencier? -->
              <div class="form-group">
                <label class="block mb-1 text-sm font-medium text-gray-700"
                  >Souhaitez-vous être conférencier ?</label
                >
                <select
                  v-model="formData.estConferencier"
                  @change="handleConferencierChange"
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#06AE16] focus:border-transparent transition-all duration-300"
                  required
                >
                  <option value="" disabled>Choisissez une option</option>
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
                      :value="theme.id"
                      v-model="formData.themes"
                      class="w-4 h-4 text-[#06AE16] border-gray-300 rounded focus:ring-[#06AE16]"
                    />

                    <label class="ml-2 text-gray-700">{{ theme.nom }}</label>
                  </div>
                </div>

                <span v-if="errors.themes" class="text-sm text-red-500">{{
                  errors.themes
                }}</span>
              </div>
              <!-- Submit Button -->
              <div class="form-group">
                <button
                  type="submit"
                  class="w-full px-6 py-3 mt-4 text-white bg-[#06AE16] rounded-lg hover:bg-[#08b71a] focus:outline-none focus:ring-2 focus:ring-[#06AE16] focus:ring-offset-2 transition-all duration-300"
                  :disabled="isLoading"
                >
                  <span v-if="isLoading" class="loader">Chargement...</span>
                  <span v-else>S'inscrire</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import PaysService from "@/services/PaysService";
import VilleService from "@/services/VilleService";
import VillageService from "@/services/VillageService";
import ThemeService from "@/services/ThemeService";
import ActiviteService from "@/services/ActiviteService";
import { useAuthStore } from "@/stores/auth";

export default {
  name: "Inscription",
  setup() {
    const authStore = useAuthStore();
    const paysList = ref([]);
    const villesList = ref([]);
    const villageList = ref([]);
    const themeList = ref([]);
    const activitesList = ref([]);

    const isLoading = ref(false);
    const errors = ref({});
    const displayText = ref("");
    const typedIndex = ref(0);
    const typedStrings = ref([
      "Inscrivez-vous maintenant!",
      "Rejoignez-nous aujourd'hui!",
      "Faites partie de notre communauté!",
    ]);

    const selectedPaysId = ref("");
    const selectedVilleId = ref("");
    const showVillages = ref(false);
    const showThemes = ref(false);
    const selectedActivites = ref([]);
    const formData = ref({
      name: "",
      email: "",
      password: "",

      password_confirmation: "",
      adresse: "",
      numeroTelephone: "",
      etatCivil: "",
      pays_id: "",
      ville_id: "",
      estMembreAssociation: false,
      estCantonNonParlant: false,
      estConferencier: false,
      village_id: null,
      activite_id: [],
      themes: [],
      type_paiement: "",
    });

    onMounted(async () => {
      try {
        const response = await PaysService.getAllPays();
        paysList.value = response.data?.data || response.data || [];
        startTypedText();
        await getActivites();
      } catch (error) {
        console.error("Erreur lors du chargement des pays:", error);
      }
    });

    const startTypedText = () => {
      setInterval(() => {
        typedIndex.value = (typedIndex.value + 1) % typedStrings.value.length;
        displayText.value = typedStrings.value[typedIndex.value];
      }, 3000);
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
        formData.value.village_id = null; // Réinitialiser à null si non sélectionné
      }
    };

    const getThemes = async () => {
      try {
        themeList.value = await ThemeService.getAllThemes();
      } catch (error) {
        console.error("Erreur lors de la récupération des thèmes:", error);
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
        getThemes(); // Fetch and populate themes
      } else {
        formData.value.themes = []; // Clear themes if not a speaker
      }
    };

    const isValidEmail = (email) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    };

    const validateForm = () => {
      errors.value = {};
      let isValid = true;

      // Vérification des champs requis
      if (!formData.value.name) {
        errors.value.name = "Le nom est requis";
        isValid = false;
      }

      if (!formData.value.email) {
        errors.value.email = "L'email est requis";
        isValid = false;
      } else if (!isValidEmail(formData.value.email)) {
        errors.value.email = "L'email n'est pas valide";
        isValid = false;
      }

      if (!formData.value.password) {
        errors.value.password = ["Le mot de passe est requis"];

        isValid = false;
      } else if (formData.value.password.length < 6) {
        errors.value.password = [
          "Le mot de passe doit contenir au moins 6 caractères",
        ];

        isValid = false;
      }

      if (!formData.value.password_confirmation) {
        errors.value.password_confirmation = [
          "La confirmation du mot de passe est requise",
        ];

        isValid = false;
      } else if (
        formData.value.password !== formData.value.password_confirmation
      ) {
        errors.value.password_confirmation = [
          "Les mots de passe ne correspondent pas",
        ];

        isValid = false;
      }

      if (!formData.value.adresse) {
        errors.value.adresse = "L'adresse est requise";
        isValid = false;
      }

      if (!formData.value.numeroTelephone) {
        errors.value.numeroTelephone = "Le numéro de téléphone est requis";
        isValid = false;
      }

      if (!formData.value.etatCivil) {
        errors.value.etatCivil = "Veuillez sélectionner votre état civil";
        isValid = false;
      }

      if (!selectedPaysId.value) {
        errors.value.pays = "Veuillez sélectionner un pays";
        isValid = false;
      }

      if (!selectedVilleId.value) {
        errors.value.ville = "Veuillez sélectionner une ville";
        isValid = false;
      }

      if (formData.value.estCantonNonParlant === "oui") {
        if (!formData.value.village_id) {
          errors.value.village_id = ["Veuillez sélectionner un village"];

          isValid = false;
        }
      }

      // Validation des thèmes pour les conférenciers

      if (
        formData.value.estConferencier === "oui" &&
        (!formData.value.themes || formData.value.themes.length === 0)
      ) {
        errors.value.themes = "Veuillez sélectionner au moins un thème";

        isValid = false;
      }

      return isValid;
    };

    const handleSubmit = async () => {
      if (!validateForm()) return;

      // Créer une copie des données du formulaire
      let dataToSubmit = { ...formData.value };

      // Mettre à jour les valeurs
      dataToSubmit.ville_id = selectedVilleId.value;
      dataToSubmit.estMembreAssociation =
        dataToSubmit.estMembreAssociation === "oui";
      dataToSubmit.estCantonNonParlant =
        dataToSubmit.estCantonNonParlant === "oui";
      dataToSubmit.estConferencier = dataToSubmit.estConferencier === "oui";
      dataToSubmit.activite_id = selectedActivites.value;

      // Gérer le village_id
      if (!dataToSubmit.estCantonNonParlant) {
        delete dataToSubmit.village_id; // Supprimer complètement le champ si non applicable
      }

      // Si l'utilisateur est un conférencier, inclure les thèmes sélectionnés

      if (dataToSubmit.estConferencier) {
        dataToSubmit.themes = formData.value.themes; // Ceci sera un tableau d'IDs de thèmes
      } else {
        delete dataToSubmit.themes; // Supprimer si non conférencier
      }

      isLoading.value = true;
      try {
        await authStore.registerParticipant(dataToSubmit);
        console.log("Inscription réussie !");
        // Redirection ou message de succès
      } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
        if (error.response && error.response.data.errors) {
          errors.value = error.response.data.errors;
        }
      } finally {
        isLoading.value = false;
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
      selectedActivites,
    };
  },
};
</script>

<style scoped>
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
</style>
