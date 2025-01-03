<template>
  <Separator />
  <br />
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
    <!-- Header avec animation d'entrée -->
    <header
      class="relative py-8 text-white shadow-md bg-gradient-to-r from-green-600 to-yellow-500"
    >
      <div class="absolute inset-0 bg-black opacity-10"></div>
      <div class="container relative px-4 mx-auto">
        <div
          :class="{
            'opacity-100 translate-y-0': isVisible,
            'opacity-0 translate-y-4': !isVisible,
          }"
          class="text-center transition-all duration-1000 ease-out"
        >
          <p class="mb-1 text-xs sm:text-sm">
            Récépissé Préfecture Eséka N° 17/RDA/JO8/SAAJP
          </p>
          <p class="mb-1 text-xs sm:text-sm">
            Notification préfecture Eséka N° 919/L/J08/A2/SAAJP
          </p>
          <p class="mb-4 text-xs sm:text-sm">
            Récépissé ministère des Arts et de la culture
            N°054/AC/MINAC/SG/DSIC/SDIC/019
          </p>
          <h1 class="mb-2 text-3xl font-bold md:text-5xl">
            Congrès NDOGBATJECK 2025
          </h1>
          <p class="mt-2 text-lg">
            Association familiale apolitique, laïque, à caractère social et
            culturel
          </p>
          <h2 class="mt-4 text-xl font-bold">
            Dossier de Demande de Sponsoring
          </h2>
          <h2 class="mb-4 text-lg md:text-xl">
            THEME: Innovation et Autonomisation pour le Développement
          </h2>
          <div
            class="flex flex-col justify-center space-y-2 text-sm sm:flex-row sm:space-y-0 sm:space-x-4 md:text-base"
          >
            <div class="flex items-center">
              <Calendar class="w-5 h-5 mr-2" />
              <span>23-26 Janvier 2024</span>
            </div>
            <div class="flex items-center">
              <MapPin class="w-5 h-5 mr-2" />
              <span>EKOANGOMBE SUD à BOT MAKAK</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="container px-4 py-12 mx-auto">
      <section class="mb-16">
        <div class="p-8 bg-white shadow-xl rounded-2xl">
          <h2 class="mb-6 text-3xl font-bold text-green-700">Introduction</h2>
          <p>
            Le Congrès NDOGBATJECK 2025 est un événement majeur visant à
            rassembler la communauté NDOGBATJECK autour de thématiques
            essentielles pour notre développement et notre cohésion. Ce dossier
            a pour but de solliciter votre entreprise en tant que sponsor
            officiel de cet événement, afin de bénéficier d'une visibilité
            accrue au sein de notre communauté et au-delà.
          </p>
        </div>
      </section>
      <!-- Introduction avec effet parallaxe -->
      <section class="mb-16">
        <div
          class="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300"
        >
          <div class="p-8">
            <h2 class="mb-6 text-3xl font-bold text-green-700">
              À Propos du Congrès
            </h2>
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3 class="mb-4 text-xl font-semibold text-yellow-600">
                  Participants Attendus
                </h3>
                <ul class="space-y-2">
                  <li
                    v-for="participant in eventDetails.participants"
                    class="flex items-center space-x-2"
                  >
                    <Users class="w-4 h-4 text-green-600" />
                    <span>{{ participant }}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 class="mb-4 text-xl font-semibold text-yellow-600">
                  Bénéfices du Sponsoring
                </h3>
                <ul class="space-y-2">
                  <li
                    v-for="benefit in eventDetails.benefits"
                    class="flex items-center space-x-2"
                  >
                    <Target class="w-4 h-4 text-green-600" />
                    <span>{{ benefit }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Niveaux de Sponsoring avec animations au survol -->
      <section class="mb-16">
        <h2 class="mb-8 text-3xl font-bold text-center text-green-700">
          Offres de Sponsoring
        </h2>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div
            v-for="sponsor in sponsors"
            :key="sponsor.level"
            class="overflow-hidden transition-all duration-300 transform bg-white shadow-lg rounded-2xl hover:scale-105"
          >
            <div class="p-6">
              <div class="mb-4 text-4xl text-center">{{ sponsor.icon }}</div>
              <h3 class="mb-2 text-2xl font-bold text-center">
                Sponsor {{ sponsor.level }}
              </h3>
              <div
                class="mb-6 text-xl font-semibold text-center text-yellow-600"
              >
                {{ sponsor.contribution }}
              </div>
              <ul class="space-y-3">
                <li
                  v-for="(advantage, idx) in sponsor.advantages"
                  :key="idx"
                  class="flex items-start space-x-2"
                >
                  <ArrowRight
                    class="flex-shrink-0 w-5 h-5 mt-1 text-green-500"
                  />
                  <span>{{ advantage }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Programme avec timeline animée -->
      <section class="mb-16">
        <h2 class="mb-8 text-3xl font-bold text-center text-green-700">
          Programme du Congrès
        </h2>
        <div class="space-y-6">
          <div
            v-for="(day, idx) in programDays"
            :key="idx"
            class="bg-white rounded-xl shadow-lg p-6 transform hover:scale-[1.02] transition-all duration-300"
          >
            <div class="flex flex-col md:flex-row md:items-center md:space-x-6">
              <div class="md:w-1/4">
                <h3 class="text-xl font-bold text-yellow-600">{{ day.day }}</h3>
                <p class="text-gray-600">{{ day.date }}</p>
              </div>
              <div class="mt-4 md:w-3/4 md:mt-0">
                <ul class="space-y-2">
                  <li
                    v-for="activity in day.activities"
                    class="flex items-center space-x-2"
                  >
                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{{ activity }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contacts avec cartes interactives -->
      <section class="mb-16">
        <h2 class="mb-8 text-3xl font-bold text-center text-green-700">
          Contacts
        </h2>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div
            v-for="contact in contacts"
            :key="contact.name"
            class="p-6 transition-all duration-300 transform bg-white shadow-lg rounded-xl hover:scale-105"
          >
            <h3 class="mb-2 text-xl font-bold">{{ contact.name }}</h3>
            <p class="mb-4 text-gray-600">{{ contact.role }}</p>
            <!-- <div class="space-y-2">
                <a :href="'tel:' + contact.phone"
                   class="flex items-center space-x-2 text-green-600 hover:text-green-700">
                  <Phone class="w-4 h-4" />
                  <span>{{ contact.phone }}</span>
                </a>
                <a :href="'mailto:' + contact.email"
                   class="flex items-center space-x-2 text-green-600 hover:text-green-700">
                  <Mail class="w-4 h-4" />
                  <span>{{ contact.email }}</span>
                </a>
              </div> -->
          </div>
        </div>
      </section>

      <!-- Bouton d'enroulement -->
      <div class="flex justify-center mb-8">
        <button
          @click="goToSponsorForm"
          class="px-8 py-4 text-white transition-all duration-300 bg-green-600 rounded-full shadow-lg hover:bg-green-700 bounce"
        >
          Cliquer ici pour accéder au formulaire d'enroulement du sponsor
        </button>
      </div>
    </main>

    <!-- Footer avec effet de gradient -->
    <footer
      class="py-8 text-white bg-gradient-to-r from-green-700 to-yellow-600"
    >
      <div class="container px-4 mx-auto">
        <div class="text-center">
          <h2 class="mb-4 text-2xl font-bold">ADNA NDOG – BATJECK</h2>
          <p class="mb-4">
            Association familiale apolitique, laïque, à caractère social et
            culturel
          </p>
          <div class="flex justify-center space-x-4">
            <Share2 class="w-6 h-6" />
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  ArrowRight,
  Users,
  Target,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Share2,
} from "lucide-vue-next";
import Separator from "@/components/frontend/separator/Separator.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isVisible = ref(false);

onMounted(() => {
  isVisible.value = true;
});

const goToSponsorForm = () => {
  router.push("/sponsor");
};

const sponsors = ref([
  {
    level: "Principal",
    contribution: "",
    icon: "👑",
    advantages: [
      "Présence en tant que sponsor principal sur tous les supports de communication",
      "Présence sur les banderoles de l'entrée de l'arrondissement jusqu'au lieu de l'évènement",
      "Un discours dans la phase d'ouverture par un représentant de votre entreprise",
      "Stand premium à l'entrée du congrès",
      "10 invitations VIP",
      "Interview exclusive dans le magazine du congrès",
      "Logo sur tous les supports vidéo",
      "Mention premium sur le site web",
    ],
  },
  {
    level: "Gold",
    contribution: "",
    icon: "🌟",
    advantages: [
      "Logo sur les supports de communication affiche, réseaux sociaux et site web",
      "Stand au cœur de l'événement",
      "5 invitations VIP",
      "Mention dans les discours d'ouverture et de clôture",
      "Page dédiée dans le magazine du congrès",
      "Participation aux sessions networking VIP",
    ],
  },
  {
    level: "Silver",
    contribution: "",
    icon: "✨",
    advantages: [
      "Logo sur les supports de communication affiche et site web",
      "Stand standard",
      "2 invitations VIP",
      "Mention dans les discours d'ouverture et de clôture",
      "Présence dans le magazine du congrès",
    ],
  },
]);

const eventDetails = ref({
  participants: [
    "Autochtones",
    "Mbombog",
    "Chefs traditionnels",
    "Elites",
    "Diaspora Ndogbatjeck",
    "Hauts cadres administratifs",
    "Représentation étrangère (ambassade)",
  ],
  benefits: [
    "Visibilité médiatique nationale",
    "Networking avec les décideurs",
    "Impact communautaire direct",
    "Association avec le développement culturel",
    "Exposition à un public ciblé et influent",
  ],
});

const contacts = ref([
  {
    name: "LOCK LUC PERGAUD",
    role: "Président de l'Association ADNA NDOGBATJECK",
    phone: "6 99 90 31 33",
    email: "contact@congresndogbatjeck.cm",
  },
  {
    name: "NSOCK BIKUN JEAN",
    role: "Président Comité Organisation du CONGRES NDOGBATJECK 2025",
    phone: "+228 98 09 73 86",
    email: "organisation@congresndogbatjeck.cm",
  },
  {
    name: "Colonel Dr. DIDIER BADJECK",
    role: "Président Commission Stratégie et Communication",
    phone: "6 99 91 46 50",
    email: "communication@congresndogbatjeck.cm",
  },
]);

const programDays = ref([
  {
    day: "Journée 1",
    date: "23 Janvier 2024",
    activities: [
      "Accueil des Congressistes",
      "Cérémonie d'ouverture traditionnelle",
      "Cocktail de bienvenue",
    ],
  },
  {
    day: "Journée 2",
    date: "24 Janvier 2024",
    activities: [
      "Installation du Bureau du Congrès",
      "Lancement des activités culturelles",
      "Exposition artisanale",
      "Soirée culturelle",
    ],
  },
  {
    day: "Journée 3",
    date: "25 Janvier 2024",
    activities: [
      "Lancement des travaux de commissions",
      "Conférences thématiques",
      "Ateliers de développement",
      "Dîner de gala",
    ],
  },
  {
    day: "Journée 4",
    date: "26 Janvier 2024",
    activities: [
      "Présentation des résolutions",
      "Installation du Nouveau Bureau",
      "Cérémonie de clôture",
      "Photo de famille",
    ],
  },
]);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Ajout d'effets de survol sur les cartes */
.card-hover {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.bounce {
  animation: bounce 1s infinite;
}
</style>
