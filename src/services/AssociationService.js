import DataService from './DataService';

const AssociationService = {
  // Récupérer la liste des associations (avec option de recherche)
  async getAllAssociations(search = '') {
    try {
      const response = await DataService.get('/api/associations', { params: { search } });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des associations:', error);
      throw error;
    }
  },

  // Route protégée pour créer une nouvelle association
  async createAssociation(associationData) {
    try {
      const response = await DataService.post('/api/associations', associationData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'association:', error.response ? error.response.data : error);
      throw error;
    }
  },

  // Route protégée pour récupérer une association par ID
  async getAssociationById(id) {
    try {
      const response = await DataService.get(`/api/associations/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'association avec ID ${id}:`, error.response ? error.response.data : error);
      throw error;
    }
  },

  // Route protégée pour mettre à jour une association
  async updateAssociation(id, associationData) {
    try {
      const response = await DataService.put(`/api/associations/${id}`, associationData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'association avec ID ${id}:`, error.response ? error.response.data : error);
      throw error;
    }
  },

  // Route protégée pour supprimer une association
  async deleteAssociation(id) {
    try {
      const response = await DataService.delete(`/api/associations/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'association avec ID ${id}:`, error.response ? error.response.data : error);
      throw error;
    }
  },
};

export default AssociationService;
