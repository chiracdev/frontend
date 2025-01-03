<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <img
        src="/no-results.png"
        alt="Page not found"
        class="transition-transform transform rounded-lg shadow-lg not-found-image hover:scale-110"
      />
      <h1 class="mt-6 text-4xl font-bold text-gray-800">Page non trouvée</h1>
      <p class="mt-4 text-lg text-gray-600">
        La page que vous recherchez n'existe pas. Veuillez vérifier l'URL ou
        revenir à la page d'accueil.
      </p>
      <router-link
        to="/"
        class="inline-block px-4 py-2 mt-6 text-white transition-colors duration-300 bg-yellow-500 rounded-lg shadow hover:bg-yellow-600"
        >Retour à la page d'accueil</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Prend toute la hauteur de la fenêtre */
  background-color: #f4f4f4;
  flex-direction: column;
  text-align: center; /* Assurez-vous que tout est centré */
}

.not-found-content {
  max-width: 100%;
  padding: 20px;
}

.not-found-image {
  width: 70%; /* Réduit encore la largeur de l'image */
  max-width: 500px; /* Taille maximale de l'image réduite */
  height: auto;
  max-height: 300px; /* Réduit la hauteur maximale de l'image */
  margin-bottom: 20px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

p {
  font-size: 1rem;
  margin-bottom: 20px;
}

.home-link {
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
}

.home-link:hover {
  text-decoration: underline;
  background-color: #f59e0b; /* Changement de couleur au survol */
}
</style>
