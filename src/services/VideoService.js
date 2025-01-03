import DataService from './DataService';

const VideoService = {
  // Récupérer la liste des vidéos
  async getAllVideos() {
    try {
      const response = await DataService.get('/api/videos');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des vidéos:', error);
      throw error;
    }
  },

  // Route protégée pour créer une nouvelle vidéo
  async createVideo(videoData) {
    try {
      const response = await DataService.post('/api/videos', videoData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de la vidéo:', error.response ? error.response.data : error);
      throw error;
    }
  },

  // Route protégée pour récupérer une vidéo par ID
  async getVideoById(id) {
    try {
      const response = await DataService.get(`/api/videos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la vidéo avec ID ${id}:`, error.response ? error.response.data : error);
      throw error;
    }
  },

  // Route protégée pour mettre à jour une vidéo
  async updateVideo(id, videoData) {
    try {
      const response = await DataService.put(`/api/videos/${id}`, videoData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la vidéo avec ID ${id}:`, error.response ? error.response.data : error);
      throw error;
    }
  },

  // Route protégée pour supprimer une vidéo
  async deleteVideo(id) {
    try {
      const response = await DataService.delete(`/api/videos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la vidéo avec ID ${id}:`, error.response ? error.response.data : error);
      throw error;
    }
  },
};

export default VideoService;