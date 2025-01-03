import DataService from "./DataService";

const PhotothequeService = {
  // Récupérer la liste de toutes les images (route publique)
  async getAllPhototheques(search = "") {
    try {
      const response = await DataService.get("/api/phototheques", {
        params: { search },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des images:", error);
      throw error;
    }
  },

  // Récupérer les détails d'une image par ID (route publique)
  async getPhotothequeById(id) {
    try {
      const response = await DataService.get(`/api/phototheques/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la récupération de l'image avec ID ${id}:`,
        error.response ? error.response.data : error
      );
      throw error;
    }
  },

  // Créer une nouvelle image (route protégée)
  async createPhototheque(photothequeData) {
    try {
      const response = await DataService.post(
        "/api/phototheques",
        photothequeData
      );
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la création de l'image:",
        error.response ? error.response.data : error
      );
      throw error;
    }
  },

  // Mettre à jour une image par ID (route protégée)
  async updatePhototheque(id, photothequeData) {
    try {
      const response = await DataService.put(
        `/api/phototheques/${id}`,
        photothequeData
      );
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la mise à jour de l'image avec ID ${id}:`,
        error.response ? error.response.data : error
      );
      throw error;
    }
  },

  // Supprimer une image par ID (route protégée)
  async deletePhototheque(id) {
    try {
      const response = await DataService.delete(`/api/phototheques/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la suppression de l'image avec ID ${id}:`,
        error.response ? error.response.data : error
      );
      throw error;
    }
  },
};

export default PhotothequeService;
