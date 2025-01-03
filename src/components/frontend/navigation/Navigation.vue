

<template>
  <nav class="py-4 text-white bg-site-bg">
    <div class="container px-4 mx-auto">
      <div class="flex items-center justify-center">
        <!-- Menu Desktop -->
        <div class="hidden space-x-8 md:flex">
          <div v-for="(item, index) in menuItems" :key="index" class="relative group">
            <div 
              @click.stop="toggleSubmenu(item.key)" 
              :aria-expanded="openSubmenu === item.key"
              class="flex flex-col items-center px-4 py-2 cursor-pointer hover:bg-[#FDA304] rounded-lg transition-all duration-300">
              <div class="p-2 mb-1 rounded-full bg-separator"> <!-- Ajustement de la taille du cercle -->
                <img :src="item.icon" :alt="item.label" class="w-8 h-8" /> <!-- Taille de l'icône uniforme -->
              </div>
              <span class="font-semibold text-separator">{{ item.label }}</span>
              <img v-if="item.items" 
                   src="/images/menu/dropdown-arrow.svg" 
                   alt="Dropdown" 
                   class="w-4 h-4 transition-transform duration-300 mtext-separator t-1"
                   :class="{ 'rotate-180': openSubmenu === item.key }" />
            </div>
            <transition name="fade">
              <div v-if="openSubmenu === item.key" class="absolute left-0 z-10 w-56 mt-2 bg-transparent rounded-lg shadow-lg">
                <ul class="py-2 bg-white rounded-md bg-opacity-70 backdrop-blur-sm">
                  <li v-for="(subItem, subIndex) in item.items" :key="subIndex">
                    <router-link 
                      :to="subItem.route"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-[#FDA304] hover:text-white rounded-lg transition-colors duration-300"
                      @click="closeMobileMenu"> <!-- Appel à closeMobileMenu ici -->
                      {{ subItem.label }}
                    </router-link>
                  </li>
                </ul>
              </div>
            </transition>
          </div>

          <!-- Menu Hymne -->
          <router-link to="/hymne" class="relative group flex flex-col items-center px-4 py-2 cursor-pointer hover:bg-[#FDA304] rounded-lg transition-all duration-300">
            <div class="p-2 mb-1 rounded-full bg-separator"> <!-- Ajustement de la taille du cercle -->
              <img src="/images/menu/hymne.svg" alt="Hymne" class="w-8 h-8" /> <!-- Taille de l'icône uniforme -->
            </div>
            <span class="font-semibold text-separator">Hymne</span> <!-- Mise en gras -->
          </router-link>

          <!-- Menu Langue -->
          <div class="relative group">
            <div class="flex flex-col items-center px-4 py-2 cursor-pointer hover:bg-[#FDA304] rounded-lg transition-all duration-300">
              <div class="p-2 mb-1 rounded-full bg-separator"> <!-- Ajustement de la taille du cercle -->
                <img src="/images/menu/langue.svg" alt="Langue" class="w-8 h-8" /> <!-- Taille de l'icône uniforme -->
              </div>
             
              <select v-model="selectedLanguage" @change="handleLanguageChange" 
                      class="mt-1 bg-transparent appearance-none cursor-pointer text-separator">
                <option value="fr">Français</option> 
                <option value="en">English</option> 
              </select>
            </div>
          </div>
        </div>

        <!-- Bouton Menu Mobile -->
     <!-- Bouton Menu Mobile -->
<button @click="toggleMobileMenu" class="md:hidden text-separator focus:outline-none">
  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
</button>


      </div>

      <!-- Menu Mobile -->
      <transition name="slide">
        <div v-if="isMobileMenuOpen" class="mt-4 space-y-4 md:hidden">
          <div v-for="(item, index) in menuItems" :key="index">
            <div 
              @click.stop="toggleSubmenu(item.key)" 
              :aria-expanded="openSubmenu === item.key"
              class="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-[#FDA304] rounded-lg transition-all duration-300">
              <div class="flex items-center">
                <div class="p-2 rounded-full bg-separator"> <!-- Ajustement de la taille du cercle -->
                  <img :src="item.icon" :alt="item.label" class="w-8 h-8" /> <!-- Taille de l'icône uniforme -->
                </div>
                <span class="ml-3 text-separator ">{{ item.label }}</span>
              </div>
              <img v-if="item.items" 
                   src="/images/menu/dropdown-arrow.svg" 
                   alt="Dropdown" 
                   class="w-4 h-4 transition-transform duration-300"
                   :class="{ 'rotate-180': openSubmenu === item.key }" />
            </div>
            <transition name="fade">
              <ul v-if="openSubmenu === item.key" class="mt-2 bg-white rounded-lg bg-opacity-70 backdrop-blur-sm">
                <li v-for="(subItem, subIndex) in item.items" :key="subIndex">
                  <router-link 
                    :to="subItem.route"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-[#FDA304] hover:text-white rounded-lg transition-colors duration-300"
                    @click="closeMobileMenu"> <!-- Appel à closeMobileMenu ici -->
                    {{ subItem.label }}
                  </router-link>
                </li>
              </ul>
            </transition>
          </div>

          <!-- Menu Hymne Mobile -->
          <router-link to="/hynme" class="relative group flex flex-col items-center px-4 py-2 cursor-pointer hover:bg-[#FDA304] rounded-lg transition-all duration-300">
            <div class="p-2 mb-1 rounded-full bg-separator"> <!-- Ajustement de la taille du cercle -->
              <img src="/images/menu/hymne.svg" alt="Hymne" class="w-8 h-8" /> <!-- Taille de l'icône uniforme -->
            </div>
            <span class="font-semibold text-separator">Hymne</span> <!-- Mise en gras -->
          </router-link>

          <!-- Menu Langue Mobile -->
          <div class="relative group">
            <div class="flex flex-col items-center px-4 py-2 cursor-pointer hover:bg-[#FDA304] rounded-lg transition-all duration-300">
              <div class="p-2 mb-1 rounded-full bg-separator"> <!-- Ajustement de la taille du cercle -->
                <img src="/images/menu/langue.svg" alt="Langue" class="w-8 h-8" /> <!-- Taille de l'icône uniforme -->
              </div>
             
              <select v-model="selectedLanguage" @change="handleLanguageChange" 
                      class="mt-1 bg-transparent appearance-none cursor-pointer text-separator">
                <option value="fr">Français</option>
                <option value="en"> English</option> 
              </select>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>




<script>
export default {
  data() {
    return {
      isMobileMenuOpen: false,
      openSubmenu: null,
      selectedLanguage: 'fr',
      menuItems: [
        {
          key: 'accueil',
          icon: "/images/menu/accueil.svg",
          label: "Accueil",
          items: [
            { label: 'A propos', route: '/about-congress' },
            { label: 'Mot du Président ADNA NDOGBATJECK', route: '/motPresident' },
            { label: "Mot du chef du village d'Ekoangombè-Sud", route: '/motChef' },
            { label: 'Listes des villages NDOGBATJECK', route: '/liste-villages' },
            { label: 'Listes des Associations NDOGBATJECK', route: '/liste-associations' },
            { label: "L'Hôte du congrès NDOGBATJECK", route: '/hote-congres' }
          ]
        },
        {
          key: 'congres',
          icon: "/images/menu/congres.svg",
          label: "Congrès",
          items: [
            { label: 'Organigramme du comité d\'organisation du congrès', route: '/organigramme-comite' },
            { label: "Organigramme du bureau du congrès", route: '/bureau' },
            { label: "Les Activités au Congrès", route: '/activites' },
            { label: "Programme détaillé du congrès", route: '/programme' },
            { label: "Boutique congrès", route: '/boutique' },
            { label: "Evènements", route: '/evenements' },
            { label: "Nous contacter", route: '/contact' }
          ]
        },
        {
          key: 'participer',
          icon: "/images/menu/participer.svg",
          label: "Participer",
          items: [
            { label: "S'inscrire au Congrès", route: '/inscription' },
            { label: "Devenir Sponsor et ou Partenaire du Congrès", route: '/introduction' },
            { label: "Liste des Sponsors et Partenaire du Congrès", route: '/sponsors' }
          ]
        },
        {
          key: 'mediatheque',
          icon: "/images/menu/Médiathèque.svg",
          label: "Médiathèque",
          items: [
            { label: 'Vidéothèque', route: '/videotheque' },
            { label: 'Photothèque', route: '/phototheque' }
          ]
        },
        {
          key: 'association',
          icon: "/images/menu/association.svg",
          label: "Association",
          route: '/association'
        }
      ]
    };
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    toggleSubmenu(key) {
      this.openSubmenu = this.openSubmenu === key ? null : key;
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false; // Ferme le menu mobile
    },
    handleLanguageChange() {
      // Logique pour changer la langue ici
    }
    
  }
};
</script>

<style scoped>
.bg-site-bg {
  background-image: url('/images/background.jpg');
  background-size: cover;
  background-position: center;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s ease-in-out;
}

.slide-enter, .slide-leave-to {
  transform: translateY(-20px);
}


</style>
