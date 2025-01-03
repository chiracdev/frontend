<template>
  <div class="home">
    <!-- Loader component for displaying loading state -->
    <Loader :isLoading="isLoading" />
   
    <!-- Separator between sections -->
    <Separator />
    <br>
    <!-- Hero Banner section -->
    <HeroBanner />
    <br> 
    <!-- Another separator for visual clarity -->
    <Separator />
    
    <!-- Blog section header -->
    <div class="bg-section p-4 rounded-full text-white text-center mt-8 w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4 mx-auto flex items-center justify-center text-lg font-bold">
      Blog
    </div> 

    <!-- News component to display the latest updates -->
    <News />
    
    <!-- Separator between News and Partners sections -->
 <!-- <Separator />   -->
 
    <!-- Partners section header -->
  <!-- <div class="bg-section p-4 rounded-full text-white text-center mt-8 w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4 mx-auto flex items-center justify-center text-lg font-bold">
      Nos Partenaires
    </div>  -->

    <!-- Partners component to display partnership information -->
  <!-- <Partners />  -->
    
    <!-- Additional separator for visual separation -->
   <!-- <Separator /> 
     -->
    <!-- Testimonials section header -->
   <!-- <div class="bg-section p-4 rounded-full text-white text-center mt-8 w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4 mx-auto flex items-center justify-center text-lg font-bold">
      TEMOIGNAGES
    </div>   -->
    
    <!-- Testimonials component to showcase user feedback -->
    <!-- <TempsFort />     -->
  </div>
</template>

<script>
import Loader from '@/components/frontend/loader/Loader.vue'; 
import HeroBanner from '@/components/frontend/heroBanner/HeroBanner.vue';
 import News from '@/components/frontend/new/News.vue';
// import Partners from '@/components/frontend/partner/Partners.vue';
// import TempsFort from '@/components/frontend/tempsFort/TempsFort.vue';
import Separator from '@/components/frontend/separator/Separator.vue';

export default {
  name: 'Home',
  components: {
    Loader,
    HeroBanner,
    News,
    // Partners,
    // TempsFort,
    Separator
  },
  data() {
    return {
      isLoading: true, // Define loading state for the Loader component
    };
  },
  methods: {
    // Additional methods can be added here as needed
  },
  mounted() {
    // Logic to manage loading state can be added here
    this.isLoading = false; // Set loading to false after data is fetched
  }
}
</script>

<style scoped>
/* You can add component-specific styles here */
</style>
