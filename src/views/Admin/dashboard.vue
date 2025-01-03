<template>
    <main class="p-4 md:p-6">
        <div class="mx-auto max-w-7xl">
           <!-- Breadcrumb Navigation -->
           <nav class="mb-6 flex" aria-label="Breadcrumb">
               <ol class="inline-flex items-center space-x-1 md:space-x-3">
                  <li class="inline-flex items-center">
                     <router-link to="/admin/dashboard"
                          class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-white"
                     >
                     <i class="fas fa-home mr-2"></i>
                       Tableau de bord
                    </router-link>
                  </li>
               </ol>
           </nav>
            <!-- Welcome Section -->
            <div class="mb-6 flex justify-between items-center">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900">Tableau de bord</h1>
                    <p class="mt-1 text-sm text-gray-500">
                        Bienvenue sur votre espace d'administration
                    </p>
                </div>
                <!-- Site Status Indicator -->
                <div class="flex items-center space-x-2">
                    <span class="text-sm font-medium text-gray-600">État du Site:</span>
                    <span
                        :class="[
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
              isSiteOnline ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
            ]"
                    >
            <i :class="['fas', isSiteOnline ? 'fa-check-circle' : 'fa-times-circle', 'mr-1']"></i>
                        {{ isSiteOnline ? 'En ligne' : 'Hors ligne' }}
          </span>
                </div>
            </div>
             <!-- Real Time Visitors -->
             <div class="mb-6 flex items-center space-x-4">
                    <span class="text-lg font-semibold text-gray-800">
                       Visiteurs en temps réel:
                    </span>
                    <span class="text-2xl font-bold text-emerald-600">
                        {{ realTimeVisitors }}
                     </span>
            </div>

            <!-- Stats Grid -->
            <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                <div
                    v-for="stat in stats"
                    :key="stat.name"
                    class="overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-sm hover:shadow-md cursor-pointer"
                    @click="navigateTo(stat.name)"
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
                        <div class="h-32 relative mt-4">
                            <!-- Container for the chart -->
                            <canvas :ref="(el) => chartRefs[stat.name] = el" class="absolute top-0 left-0 w-full h-full"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="loading" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-75">
            <div class="loader"></div>
        </div>
        <div v-if="error" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-75">
            <div class="bg-white p-6 rounded-md shadow-xl">
                <p class="text-lg text-red-600 font-semibold mb-4">Une erreur est survenue:</p>
                <p class="text-gray-700">{{ error }}</p>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import DataService from "@/services/DataService";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
const router = useRouter();

const loading = ref(false);
const error = ref(null);
const stats = ref([]);
const chartRefs = ref({});
const chartInstances = ref({});
const chartData = ref({});
const isSiteOnline = ref(true); // Start with assuming site is online
const checkInterval = ref(null);
const realTimeVisitors = ref(0); // Initialize real-time visitors
const visitorsInterval = ref(null);

const navigateTo = (statName) => {
    if (statName === "Total Participants") {
        router.push({ name: 'ParticipantList' });
    } else if (statName === "Sponsors") {
        router.push({ name: 'SponsorList' });
    } else if (statName === "Messages") {
        router.push({ name: 'ContactList' });
    }
};

const fetchDashboardData = async () => {
    loading.value = true;
    error.value = null;

    try {
        const response = await DataService.get("/api/dashboard");
        console.log("API Response:", response.data); // Log pour vérification des données

        stats.value = [
            {
                name: "Total Participants",
                value: response.data.totalParticipants,
                icon: "fas fa-users",
            },
            {
                name: "Sponsors",
                value: response.data.totalSponsors,
                icon: "fas fa-hand-holding-heart",
            },
            {
                name: "Messages",
                value: response.data.totalContacts,
                icon: "fas fa-envelope",
            },
        ];
        chartData.value = response.data.monthlyData;
    } catch (e) {
        console.error('Error fetching dashboard data', e);
        error.value = "Une erreur s'est produite lors du chargement des données.";
    } finally {
        loading.value = false;
    }
};

const checkSiteStatus = async () => {
    try {
        // Envoyer une requête GET simple à une route de l'API
        await DataService.get('/api/status');
        isSiteOnline.value = true;
    } catch (e) {
        console.error("Site seems to be offline:", e);
        isSiteOnline.value = false;
    }
};

const fetchRealTimeVisitors = async () => {
    try {
        const response = await DataService.get('/api/visitors');
        realTimeVisitors.value = response.data.visitors;
        console.log('visitor :',response.data.visitors)
    } catch (e) {
        console.error('Error fetching real-time visitors:', e);
    }
}

const createCharts = () => {
    stats.value.forEach(stat => {
        const ctx = chartRefs.value[stat.name];
        if (ctx) {
            console.log(`Creating chart for: ${stat.name}`, ctx); // Ajout du log ici
            const labels = chartData.value ? chartData.value.map(item => {
                return new Date(item.month).toLocaleString('default', { month: 'short' });
            }) : [];

            const dataValues = chartData.value ? chartData.value.map(item => {
                if (stat.name === "Total Participants") {
                    return item.totalParticipants;
                } else if (stat.name === "Sponsors") {
                    return item.totalSponsors;
                }
                return item.totalContacts;
            }) : [];
             if(dataValues.length > 0 && labels.length > 0){
                const chart = new Chart(ctx, {
                   type: 'line',
                     data: {
                         labels: labels,
                           datasets: [{
                             label: `Evolution Mensuelle`,
                             data: dataValues,
                             backgroundColor: 'rgba(10, 150, 130,0.2)',
                             borderColor: 'rgba(10, 150, 130,1)',
                              borderWidth: 2,
                             tension: 0.4
                              }]
                         },
                      options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: false
                                  }
                            },
                          scales: {
                             y: {
                              beginAtZero: true,
                                display : false,
                              },
                             x:{
                                 display : false
                             }
                          }
                       }
                 });
               chartInstances.value[stat.name] = chart;
              } else {
                console.warn(`No chart data available for ${stat.name}`)
              }
        } else {
            console.warn(`Canvas element not found for: ${stat.name}`);
        }
    });
};

onMounted(async () => {
    await fetchDashboardData();
    createCharts();
    checkSiteStatus();
    checkInterval.value = setInterval(checkSiteStatus, 60000); // Check every minute
    await fetchRealTimeVisitors();
    visitorsInterval.value = setInterval(fetchRealTimeVisitors, 10000);
});

onBeforeUnmount(() => {
    if (checkInterval.value) {
        clearInterval(checkInterval.value);
    }
   if (visitorsInterval.value) {
        clearInterval(visitorsInterval.value);
    }
});

onUnmounted(() => {
    for (const chartName in chartInstances.value) {
        if (chartInstances.value[chartName]) {
            chartInstances.value[chartName].destroy();
            delete chartInstances.value[chartName];
        }
    }
});

</script>
<style scoped>
  .loader {
    border: 4px solid #f3f3f3; /* Light grey */
    border-top: 4px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>