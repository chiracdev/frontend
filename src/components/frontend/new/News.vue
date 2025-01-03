<template>
  <section class="max-w-6xl px-4 py-16 mx-auto">
    <div class="relative">
      <!-- Slider principal -->
      <div class="overflow-hidden shadow-lg rounded-2xl">
        <div
          class="flex transition-transform duration-700 ease-out"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
        >
          <div
            v-for="(post, index) in posts"
            :key="index"
            class="flex-shrink-0 w-full"
          >
            <div class="relative group h-[70vh]">
              <img
                :src="post.image"
                :alt="post.title"
                class="object-cover w-full h-full transition-transform duration-700 transform group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-black bg-opacity-50"></div>
              <div class="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 class="mb-3 text-4xl font-bold transition-colors duration-500 group-hover:text-[#FDA304]">
                  {{ post.title }}
                </h3>
                <p class="mb-6 text-lg">{{ post.excerpt }}</p>
                <router-link 
  :to="`/blog/${post.id}`" 
  class="inline-block px-6 py-2 text-sm font-semibold transition-all duration-300 bg-green-500 rounded-full hover:bg-green-700 hover:shadow-lg"
>
  Lire la suite
</router-link>

              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Boutons de navigation -->
      <button
        @click="prevSlide"
        class="absolute z-10 p-2 text-white transition-all duration-300 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full left-4 top-1/2 hover:bg-opacity-75 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        @click="nextSlide"
        class="absolute z-10 p-2 text-white transition-all duration-300 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full right-4 top-1/2 hover:bg-opacity-75 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Indicateurs de pagination -->
      <div class="absolute left-0 right-0 bottom-4">
        <div class="flex justify-center space-x-2">
          <button
            v-for="(_, index) in posts"
            :key="index"
            @click="goToSlide(index)"
            class="w-4 h-4 transition-all duration-300 rounded-full focus:outline-none"
            :class="currentSlide === index ? 'bg-white scale-150 shadow-lg' : 'bg-gray-400 hover:bg-gray-300'"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
  name: 'BlogSlider',
  setup() {
    const currentSlide = ref(0);
    const autoSlideInterval = ref(null);
    const posts = ref([
      {
        id: 1,
        title: 'Bienvenue au Congrès ADNA 2024',
        excerpt: 'Découvrez les dernières informations et mises à jour sur le congrès ADNA de cette année.',
        image: '/images/blog/ev1.jpg',
      },
      {
        id: 2,
        title: 'Conférenciers et Thèmes',
        excerpt: 'Rencontrez nos conférenciers invités et explorez les thèmes qui seront abordés.',
        image: '/images/blog/ev2.jpg',
      },
      {
        id: 3,
        title: 'Inscription et Tarification',
        excerpt: 'Tous les détails concernant l\'inscription au congrès et les options de tarification.',
        image: '/images/blog/ev3.jpg',
      },
    ]);

    const nextSlide = () => {
      currentSlide.value = (currentSlide.value + 1) % posts.value.length;
    };

    const prevSlide = () => {
      currentSlide.value = (currentSlide.value - 1 + posts.value.length) % posts.value.length;
    };

    const goToSlide = (index) => {
      currentSlide.value = index;
    };

    const startAutoSlide = () => {
      stopAutoSlide();
      autoSlideInterval.value = setInterval(nextSlide, 5000);
    };

    const stopAutoSlide = () => {
      if (autoSlideInterval.value) {
        clearInterval(autoSlideInterval.value);
      }
    };

    onMounted(() => {
      startAutoSlide();
    });

    onBeforeUnmount(() => {
      stopAutoSlide();
    });

    return {
      currentSlide,
      posts,
      nextSlide,
      prevSlide,
      goToSlide,
    };
  },
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

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
  animation: fadeInUp 0.5s ease-out;
}
</style>
