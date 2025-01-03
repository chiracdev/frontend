<template>
  <div class="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
    <!-- Transition de groupe pour l'effet de fondu -->
    <transition-group name="fade" tag="div" class="absolute inset-0 w-full h-full">
      <img
        v-for="(image, index) in images"
        :key="index"
        :src="image"
        :class="['absolute inset-0 w-full h-full object-cover transition-opacity duration-500', 
                 { 'opacity-100': index === current_index, 'opacity-0': index !== current_index }]"
        :alt="`Slide ${index + 1}`"
      />
    </transition-group>

    <!-- Texte central avec animation -->
    <div class="absolute inset-0 flex flex-col items-center justify-center p-4 text-white bg-black bg-opacity-50 sm:p-8">
  <h1 class="flex items-center justify-center mb-2 text-2xl font-bold text-center sm:mb-4 sm:text-4xl md:text-5xl text-outline"> 
    CONGRÈS NDOGBATJECK 
    <button class="bg-[#FDA304] text-white font-bold px-3 py-1 rounded-md hover:bg-[#e0b62c] transition-all ml-2">
      2025
    </button>
  </h1>

  <!-- Animation de texte -->
  <p class="mb-4 text-sm text-center sm:mb-8 sm:text-xl md:text-2xl text-contour">
    INNOVATION ET AUTONOMISATION POUR<br>
    <span class="text-contour">{{ currentText }}</span>
    <span class="animate-blink">|</span>
  </p>
</div>


    <!-- Boutons de navigation -->
    <button @click="prev_slide" class="absolute p-1 transition-all transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full left-2 sm:left-4 top-1/2 sm:p-2 hover:bg-opacity-75">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 sm:w-6 sm:h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <button @click="next_slide" class="absolute p-1 transition-all transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full right-2 sm:right-4 top-1/2 sm:p-2 hover:bg-opacity-75">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 sm:w-6 sm:h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- Indicateurs de pagination -->
    <div class="absolute flex space-x-1 transform -translate-x-1/2 bottom-2 sm:bottom-4 left-1/2 sm:space-x-2">
      <button
        v-for="(_, index) in images"
        :key="index"
        @click="go_to_slide(index)"
        :class="['w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all', 
                 index === current_index ? 'bg-white' : 'bg-white bg-opacity-50 hover:bg-opacity-75']"
      ></button>
    </div>
  </div>
</template>




<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  name: 'HeroBanner',

  setup() {
    const images = ref([
      '/images/bg.png',  // Remplacez par vos chemins d'images
      '/images/image2.jpg',
      '/images/image3.jpg',
      
    ]);
    const current_index = ref(0);
    const texts = ref(['LE DÉVELOPPEMENT DE LA COMMUNAUTÉ NDOGBATJECK']);
    const currentText = ref('');
    const currentTextIndex = ref(0);
    const isDeleting = ref(false);
    let sliderTimer = null;
    let textTimer = null;

    const typeText = () => {
      const currentWord = texts.value[currentTextIndex.value];
      const typingSpeed = 100;
      const deletingSpeed = 50;
      const pauseBeforeDelete = 2000;

      if (!isDeleting.value && currentText.value === currentWord) {
        textTimer = setTimeout(() => {
          isDeleting.value = true;
          typeText();
        }, pauseBeforeDelete);
      } else if (isDeleting.value && currentText.value === '') {
        isDeleting.value = false;
        currentTextIndex.value = (currentTextIndex.value + 1) % texts.value.length;
        typeText();
      } else {
        currentText.value = currentWord.substring(
          0,
          isDeleting.value ? currentText.value.length - 1 : currentText.value.length + 1
        );
        textTimer = setTimeout(
          () => typeText(),
          isDeleting.value ? deletingSpeed : typingSpeed
        );
      }
    };

    const start_slider = () => {
      sliderTimer = setInterval(() => {
        current_index.value = (current_index.value + 1) % images.value.length;
      }, 5000);
    };

    const reset_timer = () => {
      clearInterval(sliderTimer);
      start_slider();
    };

    const prev_slide = () => {
      current_index.value =
        (current_index.value - 1 + images.value.length) % images.value.length;
      reset_timer();
    };

    const next_slide = () => {
      current_index.value = (current_index.value + 1) % images.value.length;
      reset_timer();
    };

    const go_to_slide = (index) => {
      current_index.value = index;
      reset_timer();
    };

    onMounted(() => {
      start_slider();
      typeText();
    });

    onBeforeUnmount(() => {
      clearInterval(sliderTimer);
      clearTimeout(textTimer);
    });

    return {
      images,
      current_index,
      prev_slide,
      next_slide,
      go_to_slide,
      currentText,
    };
  },
};
</script>



<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.text-contour {
  text-shadow: 2px 2px 0 #0D1C02, -1px -1px 0 #0D1C02, 1px -1px 0 #0D1C02, -1px 1px 0 #0D1C02, 1px 1px 0 #0D1C02;
}

.text-outline {
  text-shadow: 2px 2px 0 #0D1C02, -1px -1px 0 #0D1C02, 1px -1px 0 #0D1C02, -1px 1px 0 #0D1C02, 1px 1px 0 #0D1C02;
}


.animate-blink {
  animation: blink 0.7s infinite;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
