<template>
  <div v-if="isLoading" class="fixed inset-0 bg-white flex items-center justify-center z-50">
    <div class="loader">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.loader {
  display: flex;
  justify-content: space-between;
  width: 100px; /* Augmentation de la largeur pour plus d'espace */
}

.dot {
  width: 15px; /* Augmentation de la taille des points */
  height: 15px; /* Augmentation de la taille des points */
  border-radius: 50%;
  background-color: #458018;
  animation: bounce 1s infinite cubic-bezier(0.25, 0.1, 0.5, 1); /* Animation plus lente et plus visible */
}

.dot:nth-child(1) {
  animation-delay: 0s;
}
.dot:nth-child(2) {
  animation-delay: 0.2s;
}
.dot:nth-child(3) {
  animation-delay: 0.4s;
}
.dot:nth-child(4) {
  animation-delay: 0.6s;
}

@keyframes bounce {
  0% {
    transform: translateY(0); /* Position initiale */
  }
  50% {
    transform: translateY(-50px); /* Rebond haut plus marqué */
  }
  100% {
    transform: translateY(0); /* Retour à la position initiale */
  }
}
</style>
