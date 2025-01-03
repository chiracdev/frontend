<template>
 
  <Separator />
  
  <div class="min-h-screen text-white bg-gradient-to-b from-[#9C7C13]">
    <div class="container px-4 py-12 mx-auto md:py-20">
      <h3 class="mb-8 text-4xl font-bold text-center text-gray-50 md:text-6xl animate-fade-in-down drop-shadow-lg">
        Congrès Ndogbatjeck 2026
      </h3>

      <div class="flex flex-col items-center md:flex-row md:space-x-8">
        <!-- Section d'image -->
        <div class="w-full mb-8 md:w-1/2 md:mb-0">
          <div class="relative overflow-hidden transition-all duration-700 rounded-lg shadow-2xl group">
            <img 
              src="@/assets/images/about.jpg" 
              alt="Illustration de l'événement Congrès Ndogbatjeck" 
              class="w-full h-auto transition-transform duration-700 ease-in-out transform group-hover:scale-110"
            />
            <div class="absolute inset-0 flex items-center justify-center transition-opacity duration-500 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
              <!-- Commentaire: Ajoutez du texte ou des éléments si nécessaire -->
            </div>
          </div>
        </div>

        <!-- Section de texte -->
        <div class="w-full space-y-6 md:w-1/2 animate-fade-in-up">
          <p class="text-lg leading-relaxed">
            Le <span class="font-semibold text-yellow-400">Congrès Ndogbatjeck</span> est un évènement annuel visant à
            rassembler notre communauté pour célébrer son riche patrimoine culturel, renforcer les liens sociaux et
            discuter des enjeux communautaires. Depuis 1995, cet évènement permet de préserver nos traditions tout en
            abordant des questions actuelles comme le développement local et la solidarité.
          </p>

          <div class="p-6 transition-all transform bg-gray-800 rounded-lg shadow-inner hover:bg-gray-700 hover:shadow-2xl hover:-translate-y-2">
            <h2 class="mb-4 text-2xl font-bold text-yellow-400">Dates et lieu</h2>
            <p class="text-gray-300">
              Le prochain congrès se déroulera du <span class="font-semibold">23 au 26 janvier 2026</span> dans le
              village Bassa, situé dans la région du Littoral Cameroun. Ce lieu historique accueillera des festivités et
              des échanges enrichissants autour de notre culture et des défis contemporains de notre communauté.
            </p>
          </div>

          <div>
            <h2 class="mb-4 text-2xl font-bold text-yellow-400">Programme</h2>
            <ul class="space-y-2">
              <li 
                v-for="(item, index) in programItems" 
                :key="index"
                class="flex items-center p-4 transition-all duration-300 bg-gray-800 rounded-md hover:bg-gray-700 hover:shadow-lg hover:scale-105"
              >
                <span class="mr-2 text-yellow-400">{{ item.date }}</span>
                <span>{{ item.description }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Separator from '@/components/frontend/separator/Separator.vue';

export default {
  name: 'CongressNdogbatjeck',
  components: {
    Separator // Enregistrement du composant Separator
  },
  setup() {
    const programItems = ref([
      { date: '23 jan.', description: 'Cérémonie d\'ouverture et présentation culturelle' },
      { date: '24 jan.', description: 'Ateliers d\'entrepreneuriat et discussions sur l\'éducation' },
      { date: '25 jan.', description: 'Table ronde sur le développement durable et le rôle des jeunes' },
      { date: '26 jan.', description: 'Cérémonie de clôture et remise de distinctions' }
    ]);

    return {
      programItems
    };
  }
}
</script>

<style>
/* Animations améliorées */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fadeInDown 1.2s ease-out;
}

.animate-fade-in-up {
  animation: fadeInUp 1.2s ease-out;
}

/* Effet d'ombre et de transition sur le titre */
.drop-shadow-lg {
  filter: drop-shadow(0 6px 8px rgba(0, 0, 0, 0.2));
}

.hover\:shadow-2xl:hover {
  filter: drop-shadow(0 12px 16px rgba(0, 0, 0, 0.3));
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:translate-y-2:hover {
  transform: translateY(-0.5rem);
}
</style>
