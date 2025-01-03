import DataService from "./DataService";

const ActiviteService = {
  // Récupérer la liste de toutes les activités (route publique)
  async getAllActivites(search = "") {
    try {
      const response = await DataService.get("/api/activites", {
        params: { search },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des activités:", error);
      throw error;
    }
  },

  // Récupérer les détails d'une activité par ID (route publique)
  async getActiviteById(id) {
    try {
      const response = await DataService.get(`/api/activites/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la récupération de l'activité avec ID ${id}:`,
        error.response ? error.response.data : error
      );
      throw error;
    }
  },

  // Créer une nouvelle activité (route protégée)
  async createActivite(activiteData) {
    try {
      const response = await DataService.post("/api/activites", activiteData);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la création de l'activité:",
        error.response ? error.response.data : error
      );
      throw error;
    }
  },

  // Mettre à jour une activité par ID (route protégée)
  async updateActivite(id, activiteData) {
    try {
      const response = await DataService.put(
        `/api/activites/${id}`,
        activiteData
      );
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la mise à jour de l'activité avec ID ${id}:`,
        error.response ? error.response.data : error
      );
      throw error;
    }
  },

  // Supprimer une activité par ID (route protégée)
  async deleteActivite(id) {
    try {
      const response = await DataService.delete(`/api/activites/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la suppression de l'activité avec ID ${id}:`,
        error.response ? error.response.data : error
      );
      throw error;
    }
  },
};

export default ActiviteService;
