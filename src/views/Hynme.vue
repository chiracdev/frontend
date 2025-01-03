<template>
  <Separator />
  <br />

  <div
    class="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-900 to-yellow-700 animate-gradient-bg"
  >
    <div
      class="w-full max-w-sm md:max-w-lg lg:max-w-xl overflow-hidden transition-all duration-500 transform bg-black bg-opacity-60 shadow-2xl rounded-3xl hover:bg-opacity-70 hover:shadow-yellow-400/50 hover:scale-102"
    >
      <div class="p-6 space-y-4">
        <h1
          class="text-2xl md:text-3xl lg:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 animate-title"
        >
          Hymne Ndogbatjeck
        </h1>

        <!-- Audio controls -->
        <div
          class="flex items-center justify-around bg-gray-800 bg-opacity-50 rounded-full p-2"
        >
          <button
            @click="skipBackward"
            class="transition-all duration-300 transform focus:outline-none hover:scale-110 hover:text-yellow-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
              />
            </svg>
          </button>
          <button
            @click="togglePlayPause"
            class="transition-all duration-300 transform focus:outline-none hover:scale-110 animate-pulse-slow"
          >
            <svg
              v-if="isPlaying"
              xmlns="http://www.w3.org/2000/svg"
              class="w-12 h-12 text-yellow-400 hover:text-yellow-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="w-12 h-12 text-yellow-400 hover:text-yellow-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <button
            @click="skipForward"
            class="transition-all duration-300 transform focus:outline-none hover:scale-110 hover:text-yellow-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
              />
            </svg>
          </button>
        </div>

        <div
          class="text-sm text-center text-yellow-200 animate-fade-in font-medium"
        >
          {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
        </div>

        <!-- Progress bar -->
        <div class="w-full h-2 overflow-hidden bg-gray-700 rounded-full">
          <div
            class="h-full transition-all duration-300 ease-out bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
            :style="{ width: `${(currentTime / duration) * 100}%` }"
          ></div>
        </div>

        <!-- Hymn lyrics -->
        <div
          class="h-48 pr-3 space-y-3 overflow-y-auto custom-scrollbar no-select"
          @contextmenu.prevent
        >
          <div
            v-for="(line, index) in hymnLyrics"
            :key="index"
            class="animate-fadeIn"
          >
            <p
              class="text-lg leading-snug text-yellow-200 font-semibold"
              :style="{ animationDelay: `${index * 200}ms` }"
            >
              {{ line.basaa }}
            </p>
            <p
              class="text-sm leading-snug text-gray-300 italic"
              :style="{ animationDelay: `${index * 200}ms` }"
            >
              {{ line.french }}
            </p>
          </div>
        </div>

        <!-- Production information -->
        <div
          class="mt-4 p-4 bg-gray-800 bg-opacity-50 rounded-xl text-yellow-100 no-select text-xs"
          @contextmenu.prevent
        >
          <h2 class="text-base font-bold text-center mb-2 text-yellow-300">
            Informations de Production
          </h2>
          <div class="grid grid-cols-2 gap-2 leading-relaxed text-white">
            <div>
              <span class="font-semibold">Réalisateur:</span>
              <span class="text-yellow-100">ADNA NDOG BATJECK</span>
            </div>
            <div>
              <span class="font-semibold">Auteur - compositeur:</span>
              <span class="text-yellow-100">Gweth Gweth Emmanuel</span>
            </div>
            <div>
              <span class="font-semibold">Direction artistique:</span>
              <span class="text-yellow-100">Studio LA BELLE Pk10-Douala</span>
            </div>
            <div>
              <span class="font-semibold">Assistante (choeur):</span>
              <span class="text-yellow-100">Nyama Mirabelle</span>
            </div>
            <div>
              <span class="font-semibold">Arrangement & Musique:</span>
              <span class="text-yellow-100">Robinson</span>
            </div>
            <div>
              <span class="font-semibold">Coordonnateur:</span>
              <span class="text-yellow-100">Marc Makong ma Sê</span>
            </div>
            <div>
              <span class="font-semibold">Censure:</span>
              <span class="text-yellow-100"
                >Bureau Exécutif ADNA - NDOG BATJECK 2017-2022</span
              >
            </div>
            <div>
              <span class="font-semibold">Production:</span>
              <span class="text-yellow-100">ADNA NDOG BATJECK</span>
            </div>
            <div>
              <span class="font-semibold">Partenaire financier:</span>
              <span class="text-yellow-100">Lock Luc Pergaud</span>
            </div>
            <div>
              <span class="font-semibold">Remerciements:</span>
              <span class="text-yellow-100"
                >Comité de sages, Congrès Adna- Ndog Batjeck</span
              >
            </div>
            <div>
              <span class="font-semibold">Réalisation:</span>
              <span class="text-yellow-100">2020</span>
            </div>
            <div class="col-span-2 text-center mt-2 text-yellow-200">
              ©ADNA NDOG BATJECK
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes title {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-title {
  animation: title 1s ease-in-out;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-in;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 215, 0, 0.5);
  border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
}

.no-select {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.animate-pulse-slow {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes gradient-bg {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient-bg {
  background-size: 200% 200%;
  animation: gradient-bg 15s ease infinite;
}

.hover\:scale-102:hover {
  transform: scale(1.02);
}
</style>
<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import Separator from "@/components/frontend/separator/Separator.vue";
const audio = ref(new Audio("/audio/hymne.mp3"));
const isPlaying = ref(true);
const currentTime = ref(0);
const duration = ref(0);

const hymnLyrics = [
  {
    basaa: "HÌJÌBÒ HI ÂDNÀ NDÒK ƁACEK",
    french: "HYMNE DE ADNA NDÒK ƁACEK",
  },
  {
    basaa: "Ǹtoo u man Jǒy lɛ Ɓacek ɓa Joy",
    french: "Un des Princes de l'ancêtre Jǒy dénommé́ Ɓacek ɓa Joy",
  },
  {
    basaa: "À nyɔ̀dnɛ ī ŋgɔ̀k lìtuba – à yap lɔɔ̀m",
    french: "Partit de Ŋgɔ̀klìtuba et traversa le fleuve",
  },
  {
    basaa: "À ɓa nì Ǹlèt, nì Ɓèya - lòk nyaŋ yee",
    french: "Il était avec Ǹlèt et Ɓèya – ses frères",
  },
  {
    basaa: "Cày cee di mɓòl ndigi ɓòl nì ɓòl",
    french: "Ses paliers généalogiques se multiplient de plus en plus",
  },
  {
    basaa:
      "Èkòaŋgombɛ̀, Màholo- Màŋgèndà, Màndɔ̀yi, Mànòyoy- Ŋ̀kùmisee nì Màɓòbòl",
    french: "Ŋgɔ̀gtòs- Pùtkèlè; Ɛkùm- Ŋgwàŋgwàndà; Lɛlɛp nì Hɛ̀gɓà",
  },
  {
    basaa: "ŋgɔ ɛmblana Hìkuu hi bikiŋɛ̂ nì ɓàmbɔmbɔ̀k hi mpɔ̄t",
    french: "Mais écoutez ! Le message du tam-tam des chefs et Mbombok",
  },
  {
    basaa: "Hi nsèbel ɓes inyùu àdnà i Ndôk Ɓacek",
    french: "Il nous appelle pour l'Unité́ des Ndog Batjek",
  },
  {
    basaa: "Di tɛlɛp hǔm, lòŋnì ŋ̀ŋɛm wada",
    french: "Levons-nous d'un trait, avec un même Cœur",
  },
  {
    basaa: "I nyǔlɛ̄ wɔ̀ɔ̀ wada u ŋkàŋ ɓe jɔmb",
    french: "Parce que une seule main ne ficelle pas le paquet",
  },
  {
    basaa: "Hikìkìi mùt a lɔnā ŋgàbà yèe",
    french: "Que chacun apporte sa contribution",
  },
  {
    basaa: "Inyùu màhɔ̂l ma Âdnà Ndòk Ɓacek",
    french: "Pour l'évolution de ADNA NDOG BATJECK. (Ndììmbà x 2)",
  },
  {
    basaa: "Ŋ̀kaa (u)bitɛl - Ŋ̀kaa (u)liŋgwelês",
    french: "Conflit des responsabilités – Hégémonie de lignées",
  },
  {
    basaa: "Mbagla lòŋnì dìun bi weha wɛ̀ nyùu",
    french: "Que ségrégation et courroux te couvrent de honte",
  },
  {
    basaa: "À Ndôk Ɓacek: di hyɛl mìŋɛm, di gwɛlna ī wɔ̀ɔ",
    french:
      "À L'ensemble des Ndog batjeck (A Ndòk ɓacek !), transformons nos cœurs : tenons-nous main dans la main pour l'évolution de notre peuple ; (bis x 2)",
  },
];

const togglePlayPause = () => {
  if (isPlaying.value) {
    audio.value.pause();
  } else {
    audio.value.play();
  }
  isPlaying.value = !isPlaying.value;
};

const skipForward = () => {
  audio.value.currentTime = Math.min(
    audio.value.currentTime + 10,
    audio.value.duration
  );
};

const skipBackward = () => {
  audio.value.currentTime = Math.max(audio.value.currentTime - 10, 0);
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const updateTime = () => {
  currentTime.value = audio.value.currentTime;
  duration.value = audio.value.duration;
};

watch(isPlaying, (newValue) => {
  if (newValue) {
    audio.value.play();
  } else {
    audio.value.pause();
  }
});

onMounted(() => {
  audio.value.addEventListener("timeupdate", updateTime);
  audio.value.addEventListener("loadedmetadata", () => {
    duration.value = audio.value.duration;
    audio.value.play(); // Auto-play on mount
  });
  audio.value.addEventListener("ended", () => {
    isPlaying.value = false;
  });
  audio.value.addEventListener("play", () => {
    isPlaying.value = true;
  });
  audio.value.addEventListener("pause", () => {
    isPlaying.value = false;
  });
});

onUnmounted(() => {
  audio.value.removeEventListener("timeupdate", updateTime);
  audio.value.removeEventListener("ended", () => {
    isPlaying.value = false;
  });
});
</script>
