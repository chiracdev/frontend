<template>
  <header class="py-4 shadow-md bg-separator">
    <div class="container px-4 mx-auto">
      <div
        class="flex flex-col items-center justify-between p-6 bg-gray-50 rounded-lg shadow-lg md:flex-row hover:shadow-xl"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div
            v-for="(section, index) in footerSections"
            :key="index"
            class="space-y-4"
          >
            <h3
              class="text-2xl font-bold text-green-800 border-b-2 border-green-600 pb-2 transition-transform transform hover:scale-105 hover:text-green-600"
            >
              {{ section.title }}
            </h3>

            <ul class="space-y-2">
              <li
                v-for="item in section.items"
                :key="item"
                class="flex items-center transition-transform transform hover:translate-x-1 hover:text-green-700"
              >
                <i class="fas fa-chevron-right text-green-500 mr-2"></i>
                <router-link
                  v-if="item === 'Nous contacter'"
                  to="/contact"
                  class="text-gray-600 hover:text-green-700 transition-colors duration-200 ease-in-out"
                  >{{ item }}</router-link
                >
                <a
                  v-else
                  href="#"
                  class="text-gray-600 hover:text-green-700 transition-colors duration-200 ease-in-out"
                  >{{ item }}</a
                >
              </li>
            </ul>
          </div>
          <div class="space-y-4">
            <h3
              class="text-2xl font-bold text-green-800 border-b-2 border-green-600 pb-2 transition-transform transform hover:scale-105 hover:text-green-600"
            >
              Newsletter
            </h3>
            <form
              @submit.prevent="submitNewsletter"
              class="flex flex-col space-y-2"
            >
              <input
                v-model="email"
                type="email"
                placeholder="Votre email"
                class="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <button
                type="submit"
                class="px-4 py-3 text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>
        <div class="mt-12 pt-8 border-t border-gray-200">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <p class="text-gray-600 mb-4 md:mb-0">
              &copy; {{ currentYear }} Congrès Ndogbatjeck. Tous droits
              réservés.
            </p>
            <div class="flex space-x-6">
              <a
                v-for="social in socialMedia"
                :key="social.name"
                :href="social.link"
                :aria-label="social.name"
                class="text-gray-600 hover:text-green-700 transition-colors duration-200 ease-in-out"
              >
                <i :class="social.icon + ' text-2xl'" :style="social.style"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Transition name="fade">
        <div v-show="showBackToTop" class="fixed bottom-16 right-5 z-50">
          <div class="relative w-16 h-16">
            <svg class="w-full h-full" viewBox="0 0 100 100">
              <circle
                class="progress-background"
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e0e0e0"
                stroke-width="8"
              />
              <circle
                class="progress-circle"
                cx="50"
                cy="50"
                r="45"
                fill="none"
                :stroke="gradientColor"
                stroke-width="8"
                :style="{
                  strokeDasharray: circleLength,
                  strokeDashoffset: circleOffset,
                }"
              />
            </svg>
            <button
              @click="scrollToTop"
              class="back-to-top absolute inset-0 flex items-center justify-center bg-white rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              aria-label="Retour en haut"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";

export default {
  setup() {
    const showBackToTop = ref(false);
    const scrollProgress = ref(0);
    const email = ref("");

    const footerSections = [
      {
        title: "Pages",
        items: [
          "Accueil",
          "Congrès",
          "Participer",
          "Mediatheque",
          "Association",
          "Hymne",
        ],
      },
      { title: "Support", items: ["FAQ", "Nous contacter"] },
      {
        title: "Légal",
        items: ["Conditions d'utilisation", "Politique de confidentialité"],
      },
    ];

    const socialMedia = [
      {
        name: "Facebook",
        icon: "fab fa-facebook-f",
        link: "https://web.facebook.com/profile.php?id=100080155724751&sk=about",
        style: "color: #3b5998;",
      }, // Bleu Facebook
      {
        name: "Instagram",
        icon: "fab fa-instagram",
        link: "https://www.instagram.com/adna.ndogbatjeck/",
        style: "color: #E1306C;",
      }, // Rose Instagram
      {
        name: "YouTube",
        icon: "fab fa-youtube",
        link: "#",
        style: "color: #FF0000;",
      }, // Rouge YouTube
    ];

    const currentYear = computed(() => new Date().getFullYear());

    const circleLength = 2 * Math.PI * 45;
    const gradientColor = computed(() => {
      const percentage = scrollProgress.value * 100;
      return `hsl(${percentage}, 70%, 50%)`;
    });

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      showBackToTop.value = scrollTop > 300;
      scrollProgress.value = Math.min(scrollTop / scrollHeight, 1);
    };

    const circleOffset = computed(() => {
      return circleLength * (1 - scrollProgress.value);
    });

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const submitNewsletter = () => {
      console.log("Inscription à la newsletter :", email.value);
      alert("Merci de vous être inscrit à notre newsletter !");
      email.value = "";
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      showBackToTop,
      scrollProgress,
      scrollToTop,
      submitNewsletter,
      currentYear,
      footerSections,
      socialMedia,
      email,
      circleOffset,
      circleLength,
      gradientColor,
    };
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

.back-to-top {
  color: #4caf50;
  animation: bounce 2s ease infinite;
}

.back-to-top:hover {
  animation: none;
  transform: translateY(-3px);
}

.progress-circle {
  transition: stroke-dashoffset 0.3s ease, stroke 0.3s ease;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}
</style>
