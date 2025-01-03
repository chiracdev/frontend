<template>

    <main class="p-4 md:p-6">
      <div class="mx-auto max-w-7xl">
        <!-- Welcome Section -->
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p class="mt-1 text-sm text-gray-500">
            Bienvenue sur votre espace d'administration
          </p>
        </div>

        <!-- Stats Grid -->
        <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <div
            v-for="stat in stats"
            :key="stat.name"
            class="overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-sm hover:shadow-md"
          >
            <div class="p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">
                    {{ stat.name }}
                  </p>
                  <p class="mt-2 text-3xl font-semibold text-gray-900">
                    {{ stat.value }}
                  </p>
                </div>
                <div class="p-3 transition-colors duration-200 rounded-lg bg-emerald-50">
                  <i :class="[stat.icon, 'text-xl text-emerald-600']"></i>
                </div>
              </div>
              <div class="flex items-center mt-4 space-x-2">
                <i
                  :class="[
                    'fas',
                    stat.trend > 0
                      ? 'fa-arrow-up text-green-500'
                      : 'fa-arrow-down text-red-500',
                  ]"
                ></i>
                <span
                  :class="[
                    'text-sm font-medium',
                    stat.trend > 0 ? 'text-green-500' : 'text-red-500',
                  ]"
                >
                  {{ Math.abs(stat.trend) }}%
                </span>
                <span class="text-sm text-gray-500">vs le mois dernier</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="p-6 bg-white rounded-lg shadow-sm">
          <h2 class="flex items-center text-lg font-medium text-gray-900">
            <i class="mr-2 text-emerald-500 fas fa-history"></i>
            Activités Récentes
          </h2>
          <div class="mt-6 space-y-4">
            <div
              v-for="activity in recentActivities"
              :key="activity.id"
              class="flex items-center p-4 space-x-4 transition-colors duration-200 rounded-lg hover:bg-gray-50"
            >
              <img
                :src="activity.userImage"
                :alt="activity.user"
                class="w-10 h-10 rounded-full"
              />
              <div class="flex-1 min-w-0">
                <p class="font-medium text-gray-900">{{ activity.user }}</p>
                <p class="mt-1 text-sm text-gray-500">
                  {{ activity.action }}
                </p>
              </div>
              <span class="text-sm text-gray-500">{{ activity.time }}</span>
            </div>
          </div>
          <div class="mt-6">
            <router-link
              to="/admin/activities"
              class="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg text-emerald-600 bg-emerald-50 hover:bg-emerald-100"
            >
              Voir toutes les activités
              <i class="ml-2 fas fa-arrow-right"></i>
            </router-link>
          </div>
        </div>
      </div>
    </main>

</template>

<script setup>
import { ref, onMounted } from "vue";


const stats = ref([
  {
    name: "Total Participants",
    value: "2,651",
    icon: "fas fa-users",
    trend: 12,
  },
  {
    name: "Événements",
    value: "24",
    icon: "fas fa-calendar-check",
    trend: 5,
  },
  {
    name: "Médias",
    value: "156",
    icon: "fas fa-photo-video",
    trend: -2,
  },
  {
    name: "Messages",
    value: "423",
    icon: "fas fa-envelope",
    trend: 8,
  },
]);

// Activités récentes fictives
const recentActivities = ref([
  {
    id: 1 ,
    user: "Marie Dubois",
    action: "a ajouté 5 nouvelles photos à la galerie",
    time: "Il y a 2 heures",
    userImage: "/path-to-avatar1.jpg",
  },
  {
    id: 2,
    user: "Pierre Martin",
    action: "s'est inscrit au prochain événement",
    time: "Il y a 3 heures",
    userImage: "/path-to-avatar2.jpg",
  },
  {
    id: 3,
    user: "Sophie Laurent",
    action: 'a commenté sur l\'article "Préparation du congrès"',
    time: "Il y a 5 heures",
    userImage: "/path-to-avatar3.jpg",
  },
  {
    id: 4,
    user: "Thomas Bernard",
    action: "a mis à jour le programme des activités ",
    time: "Il y a 8 heures",
    userImage: "/path-to-avatar4.jpg",
  },
]);

// Animation des stats au chargement
const animateNumbers = () => {
  stats.value.forEach((stat) => {
    const finalValue = parseInt(stat.value.replace(/,/g, ""));
    let currentValue = 0;
    const duration = 1500;
    const increment = Math.ceil(finalValue / (duration / 16));

    const animate = () => {
      currentValue = Math.min(currentValue + increment, finalValue);
      stat.value = currentValue.toLocaleString();

      if (currentValue < finalValue) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  });
};

// Charger les données et animations au montage
onMounted(() => {
  animateNumbers();
});
</script>