import DataService from "./DataService";

const ProduitService = {
  // Récupérer la liste de tous les produits (route publique)
  async getAllProduits(search = "") {
    try {
      const response = await DataService.get("/api/produits", {
        params: { search },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
      throw error;
    }
  },

  // Récupérer les détails d'un produit par ID (route publique)
  async getProduitById(id) {
    try {
      const response = await DataService.get(`/api/produits/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la récupération du produit avec ID ${id}:`,
        error.response ? error.response.data : error
      );
      throw error;
    }
  },

  // Créer un nouveau produit (route protégée)
  async createProduit(produitData) {
    try {
      const response = await DataService.post("/api/produits", produitData);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la création du produit:",
        error.response ? error.response.data : error
      );
      throw error;
    }
  },

  // Mettre à jour un produit par ID (route protégée)
  async updateProduit(id, produitData) {
    try {
      const response = await DataService.put(`/api/produits/${id}`, produitData);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la mise à jour du produit avec ID ${id}:`,
        error.response ? error.response.data : error
      );
      throw error;
    }
  },

  // Supprimer un produit par ID (route protégée)
  async deleteProduit(id) {
    try {
      const response = await DataService.delete(`/api/produits/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la suppression du produit avec ID ${id}:`,
        error.response ? error.response.data : error
      );
      throw error;
    }
  },
};

export default ProduitService;
