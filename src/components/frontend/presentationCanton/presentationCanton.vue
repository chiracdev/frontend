<template>
    <Separator />
  
    <div class="min-h-screen text-white  bg-gradient-to-b from-[#9C7C13]">
      <div class="container px-4 py-12 mx-auto md:py-20">
        <h3 class="mb-8 text-4xl font-bold text-center text-gray-50 md:text-4xl animate-fade-in-down drop-shadow-lg">
          Présentation du Canton Ndogbatjeck
        </h3>
  
        <div class="flex flex-col items-center md:flex-row md:space-x-8">
          <!-- Section d'image -->
          <div class="w-full mb-8 md:w-1/2 md:mb-0">
            <div class="relative overflow-hidden transition-all duration-700 rounded-lg shadow-2xl group">
              <img 
                src="@/assets/images/blog/ev3.jpg" 
                alt="Illustration du canton Ndogbatjeck" 
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
              Le <span class="font-semibold text-yellow-400">Canton Ndogbatjeck</span> est un lieu historique riche de
              traditions et de culture. Situé dans la région du Littoral, il regroupe plusieurs villages
              emblématiques et est connu pour sa contribution au développement communautaire et à la conservation des
              valeurs ancestrales. Ce canton incarne une union forte et une identité culturelle unique.
            </p>
  
            <div class="p-6 transition-all transform bg-gray-800 rounded-lg shadow-inner hover:bg-gray-700 hover:shadow-2xl hover:-translate-y-2">
              <h2 class="mb-4 text-2xl font-bold text-yellow-400">Répartition et Structure</h2>
              <p class="text-gray-300">
                Le canton est constitué de plusieurs villages, chacun ayant une histoire unique et des
                traditions propres. Les villages travaillent en harmonie pour le progrès et la prospérité de la
                communauté tout en préservant les racines culturelles.
              </p>
            </div>
  
            <div>
              <h2 class="mb-4 text-2xl font-bold text-yellow-400">Patrimoine Culturel</h2>
              <ul class="space-y-2">
                <li 
                  v-for="(item, index) in heritageItems" 
                  :key="index"
                  class="flex items-center p-4 transition-all duration-300 bg-gray-800 rounded-md hover:bg-gray-700 hover:shadow-lg hover:scale-105"
                >
                  <span class="mr-2 text-yellow-400">{{ item.title }}</span>
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
  import { ref } from 'vue';
  import Separator from '@/components/frontend/separator/Separator.vue';
  
  export default {
    name: 'presentationCanton',
    components: {
      Separator // Enregistrement du composant Separator
    },
    setup() {
      const heritageItems = ref([
        { title: 'Danse traditionnelle', description: 'Représentant l’âme culturelle du canton.' },
        { title: 'Artisanat', description: 'Objets et outils fabriqués par les membres de la communauté.' },
        { title: 'Sites historiques', description: 'Endroits marquant l’histoire du canton et des villages.' },
        { title: 'Festivaux locaux', description: 'Moments de célébration et d’échange.' }
      ]);
  
      return {
        heritageItems
      };
    }
  };
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
  