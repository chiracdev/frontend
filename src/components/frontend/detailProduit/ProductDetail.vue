<template>
    <div class="container mx-auto py-12">
      <div class="flex justify-between items-start bg-white rounded-lg shadow-lg p-6">
        <!-- Produit à gauche -->
        <div class="w-1/2 pr-6">
          <img
            :src="product.image || `https://picsum.photos/300/200?random=${index}`"
            :alt="product.nom"
            class="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h1 class="text-4xl font-bold text-gray-800 mb-2">{{ product.nom }}</h1>
          <p class="text-lg font-bold text-gray-800 mb-4">{{ product.prix }} FCFA</p>
          <p class="text-gray-600 mb-4">{{ product.description }}</p>
        </div>
    
        <!-- Informations sur l'artisan à droite -->
        <div class="w-1/2 pl-6">
          <div class="bg-gray-100 p-4 rounded-lg">
            <h2 class="text-2xl font-semibold text-gray-800 mb-2">Informations sur le vendeur</h2>
            <p class="text-gray-600"><strong>Nom :</strong> Artisan X</p>
            <p class="text-gray-600"><strong>Email :</strong> artisan@example.com</p>
            <p class="text-gray-600"><strong>Téléphone :</strong> +123 456 789</p>
          </div>
    
          <button
            class="mt-6 w-full py-3 bg-green-700 text-white font-semibold rounded-lg flex items-center justify-center"
            @click="goBack"
          >
            Retour à la boutique
          </button>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import { ref, onMounted } from "vue";
  import ProduitService from "@/services/ProduitService";
  import { useRoute, useRouter } from "vue-router";
  
  export default {
    name: "ProductDetail",
    setup() {
      const product = ref({});
      const loading = ref(false);
      const error = ref(null);
  
      const route = useRoute();
      const router = useRouter();
  
      const loadProduct = async () => {
        const productId = route.params.id;
        loading.value = true;
        try {
          const response = await ProduitService.getProduitById(productId);
          product.value = response;
        } catch (err) {
          error.value = "Erreur lors de la récupération du produit.";
          console.error(err);
        } finally {
          loading.value = false;
        }
      };
  
      const goBack = () => {
        router.push("/boutique");
      };
  
      onMounted(loadProduct);
  
      return {
        product,
        loading,
        error,
        goBack,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Styles pour le composant */
  </style>
  