<template>
  <div class="max-w-6xl mx-auto px-4 py-16">
    <div class="relative overflow-hidden">
      <TransitionGroup
        tag="div"
        :name="transitionName"
        class="flex justify-center gap-4 md:gap-8"
      >
        <div
          v-for="(testimonial, index) in visibleTestimonials"
          :key="testimonial.id"
          class="w-full md:w-1/3"
          :class="{ 'hidden md:block': isMobile && index !== 1 }"
          @click="handleCardClick(index)"
        >
          <div
            :class="[
              'bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full transition-transform duration-300 cursor-pointer',
              {
                'scale-105 z-10 shadow-xl': isActive(index),
                'scale-95 opacity-75': !isActive(index),
                'hover:scale-105 hover:shadow-xl': !isMobile
              }
            ]"
          >
            <div class="relative h-56 md:h-48 bg-gradient-to-r from-green-600 to-green-400 rounded-t-2xl">
              <img
                :src="testimonial.image"
                :alt="testimonial.name"
                class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-28 h-28 md:w-24 md:h-24 rounded-full border-4 border-white object-cover shadow-lg transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div class="p-8 pt-20 md:pt-16 flex-grow flex flex-col rounded-b-2xl">
              <h3 class="font-semibold text-2xl md:text-xl mb-3 text-gray-800">{{ testimonial.name }}</h3>
              <div class="flex items-center mb-4">
                <Star
                  v-for="star in 5"
                  :key="star"
                  :class="[
                    'w-6 h-6 md:w-5 md:h-5',
                    star <= testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  ]"
                />
                <span class="ml-2 text-sm text-gray-600">({{ testimonial.rating }}/5)</span>
              </div>
              <p class="text-gray-700 flex-grow leading-relaxed text-lg md:text-base break-words">{{ testimonial.message }}</p>
            </div>
          </div>
        </div>
      </TransitionGroup>

      <!-- Bouton Précédent -->
      <button
        @click="prev"
        class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 text-gray-800 p-3 rounded-full hover:bg-opacity-75 transition-all duration-300 focus:outline-none shadow-md"
        aria-label="Témoignage précédent"
      >
        <ChevronLeft class="w-8 h-8" />
      </button>
      
      <!-- Bouton Suivant -->
      <button
        @click="next"
        class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 text-gray-800 p-3 rounded-full hover:bg-opacity-75 transition-all duration-300 focus:outline-none shadow-md"
        aria-label="Témoignage suivant"
      >
        <ChevronRight class="w-8 h-8" />
      </button>
    </div>

    <div class="flex justify-center mt-8">
      <button
        v-for="(_, index) in testimonials"
        :key="index"
        @click="goToIndex(index)"
        :class="{
          'bg-green-600 w-8': currentIndex === index,
          'bg-gray-300': currentIndex !== index
        }"
        class="w-3 h-3 rounded-full mx-2 focus:outline-none transition-all duration-300 ease-in-out"
        :aria-label="`Aller au témoignage ${index + 1}`"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { ChevronLeft, ChevronRight, Star } from 'lucide-vue-next';

const testimonials = [
  {
    id: 1,
    name: 'Jean-Claude Mbappe',
    image: '/images/testimonial1.jpg',
    rating: 5,
    message: 'Le Congrès ADNA a surpassé toutes mes attentes. Les échanges et les conférences étaient enrichissants et m\'ont permis de rencontrer des experts du domaine.',
  },
  {
    id: 2,
    name: 'Marie Ndjock',
    image: '/images/testimonial2.jpg',
    rating: 4,
    message: 'C\'était une expérience incroyable de participer au Congrès ADNA cette année. Les ateliers et les discussions ont été une vraie source d\'inspiration pour mon projet.',
  },
  {
    id: 3,
    name: 'Patrice Etoundi',
    image: '/images/testimonial3.jpg',
    rating: 5,
    message: 'La qualité de l\'organisation du Congrès ADNA m\'a impressionné. J\'ai pu réseauter avec des leaders de l\'industrie et découvrir de nouvelles opportunités.',
  },
];

const currentIndex = ref(0);
const direction = ref(1);
const isMobile = ref(false);
const activeCard = ref(null);
const transitionName = computed(() => direction.value > 0 ? 'slide-left' : 'slide-right');

const visibleTestimonials = computed(() => {
  const prev = (currentIndex.value - 1 + testimonials.length) % testimonials.length;
  const next = (currentIndex.value + 1) % testimonials.length;
  return [testimonials[prev], testimonials[currentIndex.value], testimonials[next]];
});

const isActive = (index) => {
  if (isMobile.value) {
    return activeCard.value === index;
  }
  return index === 1 || activeCard.value === index;
};

const next = () => {
  direction.value = 1;
  currentIndex.value = (currentIndex.value + 1) % testimonials.length;
  activeCard.value = null;
};

const prev = () => {
  direction.value = -1;
  currentIndex.value = (currentIndex.value - 1 + testimonials.length) % testimonials.length;
  activeCard.value = null;
};

const goToIndex = (index) => {
  direction.value = index > currentIndex.value ? 1 : -1;
  currentIndex.value = index;
  activeCard.value = null;
};

const handleCardClick = (index) => {
  if (isMobile.value) {
    if (activeCard.value === index) {
      activeCard.value = null;
    } else {
      activeCard.value = index;
    }
  } else {
    if (index === 0) {
      prev();
    } else if (index === 2) {
      next();
    } else {
      activeCard.value = activeCard.value === 1 ? null : 1;
    }
  }
};

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

let intervalId;
onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
  intervalId = setInterval(() => {
    if (!activeCard.value) {
      next();
    }
  }, 5000);
});

onUnmounted(() => {
  clearInterval(intervalId);
  window.removeEventListener('resize', checkMobile);
});
</script>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s ease-in-out;
}

.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Ajouter des styles pour le zoom */
.scale-105 {
  transform: scale(1.1);
}

.scale-95 {
  transform: scale(0.95);
}

/* Styles pour les boutons */
button {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}
</style>
