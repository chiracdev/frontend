import DataService from "./DataService";

const EvenementService = {
  // Récupérer la liste de tous les événements (route publique)
  async getAllEvenements(search = "") {
    try {
      const response = await DataService.get("/api/evenements", {
        params: { search },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des événements:", error);
      throw error;
    }
  },

  // Récupérer les détails d'un événement par ID (route publique)
  async getEvenementById(id) {
    try {
      const response = await DataService.get(`/api/evenements/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la récupération de l'événement avec ID ${id}:`,
        error.response ? error.response.data : error
      );
      throw error;
    }
  },

  // Créer un nouvel événement (route protégée)
  async createEvenement(evenementData) {
    try {
      const response = await DataService.post("/api/evenements", evenementData);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la création de l'événement:",
        error.response ? error.response.data : error
      );
      throw error;
    }
  },

  // Mettre à jour un événement par ID (route protégée)
  async updateEvenement(id, evenementData) {
    try {
      const response = await DataService.put(
        `/api/evenements/${id}`,
        evenementData
      );
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la mise à jour de l'événement avec ID ${id}:`,
        error.response ? error.response.data : error
      );
      throw error;
    }
  },

  // Supprimer un événement par ID (route protégée)
  async deleteEvenement(id) {
    try {
      const response = await DataService.delete(`/api/evenements/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la suppression de l'événement avec ID ${id}:`,
        error.response ? error.response.data : error
      );
      throw error;
    }
  },
};

export default EvenementService;
