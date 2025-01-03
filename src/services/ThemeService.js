import DataService from './DataService';

const ThemeService = {
  // Récupérer la liste de tous les thèmes (route publique)
  async getAllThemes(search = '') {
    try {
      const response = await DataService.get('/api/themes', { params: { search } });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des thèmes:', error);
      throw error;
    }
  },

  // Récupérer les détails d'un thème par ID (route publique)
  async getThemeById(id) {
    try {
      const response = await DataService.get(`/api/themes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du thème avec ID ${id}:`, error.response ? error.response.data : error);
      throw error;
    }
  },

  // Créer un nouveau thème (route protégée)
  async createTheme(themeData) {
    try {
      const response = await DataService.post('/api/themes', themeData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du thème:', error.response ? error.response.data : error);
      throw error;
    }
  },

  // Mettre à jour un thème par ID (route protégée)
  async updateTheme(id, themeData) {
    try {
      const response = await DataService.put(`/api/themes/${id}`, themeData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du thème avec ID ${id}:`, error.response ? error.response.data : error);
      throw error;
    }
  },

  // Supprimer un thème par ID (route protégée)
  async deleteTheme(id) {
    try {
      const response = await DataService.delete(`/api/themes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression du thème avec ID ${id}:`, error.response ? error.response.data : error);
      throw error;
    }
  },
};

export default ThemeService;
