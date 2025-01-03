<template>
  <Separator />

  <div class="min-h-screen text-white bg-gradient-to-b from-[#9C7C13] -z-0">
    <div class="container px-4 py-12 mx-auto md:py-20">
      <h3 class="mb-8 text-4xl font-bold text-center text-gray-50 md:text-5xl animate-fade-in-down drop-shadow-lg">
        Village Hôte : Ekoangombè-Sud
      </h3>

      <div class="flex flex-col items-center md:flex-row md:space-x-8">
        <!-- Section d'image -->
        <div class="w-full mb-8 md:w-1/2 md:mb-0">
          <div class="relative overflow-hidden transition-all duration-700 rounded-lg shadow-2xl group">
            <img
              src="https://picsum.photos/600/400" 
              alt="Illustration du village Ekoangombè-Sud"
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
            Ekoangombè-Sud compte <span class="font-semibold text-yellow-400">525 habitants</span> (statistiques de 2014).
          </p>

          <div class="p-6 transition-all transform bg-gray-800 rounded-lg shadow-inner hover:bg-gray-700 hover:shadow-2xl hover:-translate-y-2">
            <h2 class="mb-4 text-2xl font-bold text-yellow-400">Organisation sociale</h2>
            <p class="text-gray-300">
              Le village est administré par un chef de 3<sup>e</sup> degré, désigné selon la lignée de la chefferie traditionnelle datant du XIX<sup>e</sup> au XX<sup>e</sup> siècle. La communauté est encadrée par une autorité morale, la confrérie des Ba Mbombog (Patriarches).
            </p>
          </div>

          <div class=" bg-gray-800 rounded-md hover:bg-gray-700 hover:shadow-lg hover:scale-105 p-6">
            <h2 class="mb-4 text-2xl font-bold text-yellow-400 ">Rôles des genres</h2>
            <p class="text-gray-300">
              Les femmes contrôlent le secteur des cultures vivrières, tandis que les hommes s’occupent de la cacaoculture, du transport, etc.
            </p>
          </div>

          <div class=" bg-gray-800 rounded-md hover:bg-gray-700 hover:shadow-lg hover:scale-105 p-6">
            <h2 class="mb-4 text-2xl font-bold text-yellow-400">Activités économiques principales</h2>
            <p class="text-gray-300">
              L’agriculture est l'activité économique principale, occupant environ 80% de la population et assurant l’essentiel des revenus grâce au cacao et aux cultures vivrières. Le cacao est la culture pérenne dominante, pratiquée majoritairement par les hommes sur des parcelles de 2 à 20 hectares. Les cultures vivrières, notamment le bananier plantain et le manioc, contribuent significativement à l’amélioration des revenus des habitants.
            </p>
          </div>

          <div class=" bg-gray-800 rounded-md hover:bg-gray-700 hover:shadow-lg hover:scale-105 p-6">
            <h2 class="mb-4 text-2xl font-bold text-yellow-400">Services financiers</h2>
            <p class="text-gray-300">
              Il n’existe actuellement aucune compagnie d’assurance ni d’établissement financier dans le village.
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
  name: 'HoteCongres',
  components: {
    Separator
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
