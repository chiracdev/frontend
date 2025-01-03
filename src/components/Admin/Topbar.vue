<template>
  <header
    class="sticky top-0 z-40 w-full transition-shadow duration-300 bg-emerald-600"
    :class="{ 'shadow-lg': scrolled }"
  >
    <div class="px-4 mx-auto max-w-7xl">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center md:ml-64 xl:ml-72">
          <i class="text-2xl text-white fas fa-tachometer-alt"></i>
          <span class="ml-2 text-white">Dashboard</span>
        </div>
        <div class="flex items-center space-x-4">
          <div class="relative">
            <button
              @click="toggleNotifications"
              class="p-2 text-white transition duration-200 rounded-full hover:bg-emerald-700"
              aria-label="Notifications"
            >
              <i class="text-xl fas fa-bell"></i>
              <span
                v-if="unreadNotifications"
                class="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white transform translate-x-1 -translate-y-1 bg-red-500 rounded-full"
                >{{ unreadNotifications }}</span
              >
            </button>
            <div
              v-if="showNotifications"
              class="absolute right-0 mt-2 overflow-hidden bg-white rounded-lg shadow-lg w-80"
            >
              <div class="p-2 font-medium text-gray-900 bg-gray-50">
                Notifications
              </div>
              <div class="divide-y divide-gray-100">
                <div
                  v-for="notification in notifications"
                  :key="notification.id"
                  class="p-4 transition-colors duration-200 hover:bg-gray-50"
                >
                  <p class="font-medium text-gray-900">
                    {{ notification.title }}
                  </p>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ notification.message }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <div class="hidden text-right md:block">
              <p class="text-sm font-medium text-white">{{ userName }}</p>
              <p class="text-xs text-emerald-100">{{ userType }}</p>
            </div>
            <img
              :src="userAvatar"
              alt="Profile"
              class="w-10 h-10 rounded-full ring-2 ring-white"
            />
          </div>
          <button
            @click="handleLogout"
            class="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-orange-500 rounded-lg hover:bg-orange-600"
            aria-label="Logout"
          >
            <span class="hidden md:inline">Déconnexion</span>
            <i class="fas fa-sign-out-alt md:ml-2"></i>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth"; // Import the auth store
import { useToast } from "vue-toastification";

const toast = useToast();
const router = useRouter();
const authStore = useAuthStore(); // Initialize the store
const scrolled = ref(false);
const showNotifications = ref(false);
const unreadNotifications = ref(0); // Initialize unread notifications count
const userName = ref(""); // To hold the user's name
const userType = ref(""); // To hold the user's type
const userAvatar = ref("/images/avatar.avif"); // Chemin vers l'avatar dans le dossier public
const notifications = ref([]); // Store notifications

const handleScroll = () => {
  scrolled.value = window.scrollY > 20;
};

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
};

const handleLogout = async () => {
  try {
    await authStore.logout(); // Call the logout method from the store
    toast.success(" deconnexion réussie !");
    await router.push("/loginadmin");
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
  }
};

const addNotification = (notification) => {
  notifications.value.push(notification);
  unreadNotifications.value += 1; // Increment unread notifications count
};

onMounted(async () => {
  window.addEventListener("scroll", handleScroll);
  try {
    await authStore.fetchUser(); // Fetch user information on mount
    if (authStore.user) {
      userName.value = authStore.user.name; // Update user name
      userType.value = authStore.user.type_user; // Update user type
      userAvatar.value = authStore.user.avatar || "/images/avatar.avif"; // Update user avatar
    }

    // Simulate receiving a new notification (replace with actual API/WebSocket logic)
    const newParticipantNotification = {
      id: Date.now(), // Unique ID for the notification
      title: "Nouvelle inscription",
      message: "Un nouvel utilisateur s'est inscrit",
    };
    addNotification(newParticipantNotification); // Add the new notification
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations de l'utilisateur:",
      error
    );
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
