<template>
    <Separator />
  
    <div class=" text-white bg-gradient-to-b from-[#9C7C13]">
      <div class="container px-4 py-12 mx-auto md:py-20">
        <h3 class="mb-8 text-4xl font-bold text-center text-gray-50 md:text-5xl animate-fade-in-down drop-shadow-lg">
          Mot du Président de l'Association ADNA
        </h3>
  
        <div class="flex flex-col items-center md:flex-row md:space-x-8">
          <!-- Section d'image -->
          <div class="w-full mb-8 md:w-1/2 md:mb-0">
            <div class="relative overflow-hidden transition-all duration-700 rounded-lg shadow-2xl group">
              <img 
                src="@/assets/images/blog/ev2.jpg" 
                alt="Portrait du Président de l'Association ADNA" 
                class="w-full h-auto transition-transform duration-700 ease-in-out transform group-hover:scale-110"
              />
              <div class="absolute inset-0 flex items-center justify-center transition-opacity duration-500 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
                <!-- Optionnel : Ajoutez un texte ou des icônes -->
              </div>
            </div>
          </div>
  
          <!-- Section de texte -->
          <div class="w-full space-y-6 md:w-1/2 animate-fade-in-up">
            <p class="text-lg leading-relaxed">
              <span class="font-semibold text-yellow-400">Chers membres, chers partenaires,</span> 
              l’Association pour le Développement des Ndogbatjeck et Alliés (ADNA) vous souhaite la bienvenue au 
              <span class="font-semibold text-yellow-400">Congrès Ndogbatjeck 2025</span>. Cet événement marque une étape importante 
              dans notre engagement pour le développement et l’unité de notre communauté.
            </p>
  
            <div class="p-6 transition-all transform bg-gray-800 rounded-lg shadow-inner hover:bg-gray-700 hover:shadow-2xl hover:-translate-y-2">
              <h2 class="mb-4 text-2xl font-bold text-yellow-400">Engagement de l'ADNA</h2>
              <p class="text-gray-300">
                «&nbsp;Notre vision est de créer un espace où chacun peut contribuer à l'épanouissement de notre communauté. 
                En œuvrant ensemble, nous renforcerons nos bases sociales, économiques et culturelles pour un futur prospère.&nbsp;»
              </p>
            </div>
  
            <div class="p-6 transition-all transform bg-gray-800 rounded-lg shadow-inner hover:bg-gray-700 hover:shadow-2xl hover:-translate-y-2">
              <h2 class="mb-4 text-2xl font-bold text-yellow-400">Appel à la mobilisation</h2>
              <p class="text-gray-300">
                En tant que président, je vous invite à prendre part activement aux activités de ce congrès. 
                Votre soutien, vos idées et vos contributions seront les pierres angulaires de notre succès collectif.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Separator from '@/components/frontend/separator/Separator.vue';
  
  export default {
    name: 'MotDuPresident',
    components: {
      Separator, // Enregistrement du composant Separator
    },
  };
  </script>
  
  <style>
  /* Reprise des animations et styles depuis MotDuChef.vue */
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
  
  /* Styles pour le titre et les transitions */
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
  