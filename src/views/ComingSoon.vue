<template>
    <div class="coming-soon-container">
      <div class="coming-soon-content">
        <img
          src="@/assets/images/comingsoon.png"
          alt="Disponible bientôt"
          class="transition-transform transform rounded-lg shadow-lg coming-soon-image hover:scale-110"
        />
        <h1 class="mt-6 text-4xl font-bold text-gray-800"> Bientôt Disponible</h1>
        <p class="mt-4 text-4xl text-gray-600">
          Revenez nous voir plus tard !
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
    name: "ComingSoon",
  };
  </script>
  
  <style scoped>
  .coming-soon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Prend toute la hauteur de la fenêtre */
    background-color: #f4f4f4;
    flex-direction: column;
    text-align: center; /* Assurez-vous que tout est centré */
  }
  
  .coming-soon-content {
    max-width: 100%;
    padding: 20px;
  }
  
  .coming-soon-image {
    width:400px ;
    height: 900px;
    max-height: 300px; /* Réduit la hauteur maximale de l'image */
    margin: 0 auto;
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
  