import DataService from './DataService';

const VillageService = {
  // Récupérer la liste des villages
  async getAllVillages(search = '') {
    try {
      const response = await DataService.get('/api/villages', { params: { search } });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des villages:', error);
      throw error;
    }
  },

  // Route protégée pour créer un nouveau village
  async createVillage(villageData) {
    try {
      const response = await DataService.post('/api/villages', villageData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du village:', error.response ? error.response.data : error);
      throw error;
    }
  },

  // Route protégée pour récupérer un village par ID
  async getVillageById(id) {
    try {
      const response = await DataService.get(`/api/villages/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du village avec ID ${id}:`, error.response ? error.response.data : error);
      throw error;
    }
  },

  // Route protégée pour mettre à jour un village
  async updateVillage(id, villageData) {
    try {
      const response = await DataService.put(`/api/villages/${id}`, villageData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du village avec ID ${id}:`, error.response ? error.response.data : error);
      throw error;
    }
  },

  // Route protégée pour supprimer un village
  async deleteVillage(id) {
    try {
      const response = await DataService.delete(`/api/villages/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression du village avec ID ${id}:`, error.response ? error.response.data : error);
      throw error;
    }
  },
};

export default VillageService;