// const targetDate = new Date('2025-01-23T00:00:00'); 
// const targetDate = new Date(Date.now() + 3000); // L'événement commence dans 3 secondes


<template>
  <header class="py-2 md:py-4 shadow-md bg-separator"> 
    <div class="container px-2 md:px-4 mx-auto">
      <div class="flex flex-col items-center justify-between p-2 md:p-4 transition-all duration-300 ease-in-out bg-white rounded-lg shadow-lg md:flex-row hover:shadow-xl">

        <!-- Logo et titre -->
        <div class="flex items-center mb-2 md:mb-0 transition-transform duration-300 ease-in-out hover:scale-105">
          <router-link to="/" class="flex-shrink-0">
            <img src="/images/logo/logo-adna.png" alt="Logo ADNA" class="w-12 md:w-16 h-auto mr-2 md:mr-3">
          </router-link>
          <h1 class="text-[#FDA304]  md:text-base lg:text-xl font-bold text-yellow-700 transition-colors duration-300 ease-in-out hover:text-yellow-600 whitespace-normal md:whitespace-nowrap">
            CONGRÈS NDOGBATJECK
          </h1>
        </div>

        <!-- Informations du congrès avec défilement centré -->
        <div class="relative flex items-center justify-center w-full h-8 md:h-10 mb-2 md:mb-0 overflow-hidden md:w-auto">
          <div class="text-center animate-scroll whitespace-nowrap" style="animation-duration: 20s;">
            <p class="inline-block text-xl  font-semibold text-gray-700">📅 23 au 26 Janvier 2025</p>
            <span class="mx-2 md:mx-4">|</span>
            <p class="inline-block text-xl text-gray-600">EKOANGOMBE SUD - MANGOG</p>
          </div>
        </div>

        <!-- Compte à rebours -->
        <div class="flex flex-col items-center">
          <div :class="{'mb-1 md:mb-2 text-base md:text-xl font-bold flex space-x-1 md:space-x-2 animate-pulse text-green-500': isEventStarted, 'mb-1 md:mb-2 text-base md:text-xl font-bold text-red-600 flex space-x-1 md:space-x-2': !isEventStarted}">
            <template v-if="!isEventStarted">
              <!-- Affichage amélioré du compte à rebours -->
              <div class="grid grid-cols-4 gap-4">
                <div class="flex flex-col items-center">
                  <span class="text-2xl font-semibold">{{ timeLeft.days }}</span>
                  <span class="text-xs text-gray-500">Jours</span>
                </div>
                <div class="flex flex-col items-center">
                  <span class="text-2xl font-semibold">{{ timeLeft.hours }}</span>
                  <span class="text-xs text-gray-500">Heures</span>
                </div>
                <div class="flex flex-col items-center">
                  <span class="text-2xl font-semibold">{{ timeLeft.minutes }}</span>
                  <span class="text-xs text-gray-500">Minutes</span>
                </div>
                <div class="flex flex-col items-center">
                  <span class="text-2xl font-semibold">{{ timeLeft.seconds }}</span>
                  <span class="text-xs text-gray-500">Secondes</span>
                </div>
              </div>
            </template>
            <template v-else>
              <span class="text-lg md:text-2xl lg:text-3xl font-bold text-green-600 animate-bounce">🎉 Le congrès a commencé ! 🎉</span>
            </template>
          </div>
        </div>
      </div>

      <!-- Effet de confettis quand l'événement commence -->
      <div v-if="isEventStarted" class="confetti-container"></div>
    </div>
  </header>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import confetti from 'canvas-confetti';

export default {
  name: 'AdvancedCountdownHeader',
  setup() {
    //const targetDate = new Date(Date.now() + 3000);
  const targetDate = new Date('2025-01-23T00:00:00'); 
    const now = ref(Date.now());
    const eventStarted = ref(false);
    const confettiLaunched = ref(false);
    let timer;

    const timeLeft = computed(() => {
      const difference = targetDate - now.value;
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    });

    const isEventStarted = computed(() => {
      return eventStarted.value || (timeLeft.value.days + timeLeft.value.hours + timeLeft.value.minutes + timeLeft.value.seconds <= 0);
    });

    const updateCountdown = () => {
      now.value = Date.now();
      if (isEventStarted.value && !confettiLaunched.value) {
        startConfetti();
      }
    };

    const startConfetti = () => {
      confettiLaunched.value = true;
      eventStarted.value = true;
      localStorage.setItem('eventStarted', 'true');
      
      const confettiInterval = setInterval(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff0', '#0ff', '#f0f'],
        });
      }, 300);

      setTimeout(() => {
        clearInterval(confettiInterval);
        eventStarted.value = false;
      }, 20 * 1000);
    };

    onMounted(() => {
      if (Date.now() >= targetDate.getTime() || localStorage.getItem('eventStarted') === 'true') {
        eventStarted.value = true;
        confettiLaunched.value = true;
      }
      timer = setInterval(updateCountdown, 1000);
    });

    onUnmounted(() => {
      clearInterval(timer);
    });

    return {
      timeLeft,
      isEventStarted,
    };
  }
};
</script>

<style scoped>
@keyframes scroll {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

.animate-scroll {
  display: inline-block;
  animation: scroll linear infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

.animate-bounce {
  animation: bounce 1s infinite;
}

.confetti-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.message-started {
  font-size: 1rem;
}

@media (min-width: 768px) {
  .message-started {
    font-size: 1.5rem;
  }
}
</style>
