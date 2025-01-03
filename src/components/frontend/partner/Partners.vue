<template>
  <section class="py-8 sm:py-12 bg-bg-site overflow-hidden">
    <div class="container mx-auto px-4">
      <div class="relative">
        <!-- Container pour le défilement centré -->
        <div class="scroll-container flex justify-center items-center">
          <div class="flex animate-scroll">
            <div
              v-for="(partner, index) in partners"
              :key="index"
              class="flex-shrink-0 mx-2 sm:mx-4 md:mx-6"
            >
              <!-- Wrapper du logo avec effet au survol -->
              <div class="partner-logo-wrapper rounded-full overflow-hidden bg-white shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
                <img
                  :src="partner.logo"
                  :alt="partner.name"
                  class="w-full h-full object-cover"
                  @error="handleImageError"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Conteneur cachant le débordement */
.scroll-container {
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  height: 100px; /* Ajustez la hauteur selon vos besoins */
}

/* Animation continue pour le défilement */
.animate-scroll {
  display: inline-flex;
  animation: scroll 20s linear infinite;
}

/* Définition de l'animation scroll */
@keyframes scroll {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

/* Style du wrapper de logo avec effet visuel */
.partner-logo-wrapper {
  position: relative;
  width: 80px;
  height: 80px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

/* Effet visuel au survol */
.partner-logo-wrapper:hover {
  transform: scale(1.1);
  border-color: #FFD700;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

/* Animation plus rapide pour les petits écrans */
@media (max-width: 640px) {
  .animate-scroll {
    animation-duration: 15s;
  }
}

/* Animation avec une durée modérée pour les écrans moyens */
@media (min-width: 641px) and (max-width: 1024px) {
  .animate-scroll {
    animation-duration: 20s;
  }
}
</style>

<script>
import { ref } from 'vue';
import partner1 from '@/assets/partner1.png';
import partner2 from '@/assets/partner2.png';
import partner3 from '@/assets/partner3.png';

export default {
  name: 'Partners',
  setup() {
    const partners = ref([
      { name: 'Partner 1', logo: partner1 },
      { name: 'Partner 2', logo: partner2 },
      { name: 'Partner 3', logo: partner3 },
      // Ajouter d'autres partenaires ici
    ]);

    // Gestion d'erreur d'image (image par défaut si chargement échoue)
    const handleImageError = (event) => {
      event.target.src = '/images/default-partner.png';
    };

    return {
      partners,
      handleImageError,
    };
  },
};
</script>
