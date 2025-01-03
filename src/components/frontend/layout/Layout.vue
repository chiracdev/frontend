<template>
  <div class="min-h-screen bg-site-bg">
    <Header />
    <Navigation />
    <main class="flex-grow">
      <slot></slot>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "../header/Header.vue";
import Navigation from "../navigation/Navigation.vue";
import Footer from "../footer/Footer.vue";

export default {
  name: "Layout",
  components: {
    Header,
    Navigation,
    Footer,
  },
};
</script>
