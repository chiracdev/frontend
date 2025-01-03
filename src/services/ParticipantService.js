// src/services/ParticipantService.js
import DataService from "./DataService";

const ParticipantService = {
    async getAllParticipants(search = "", page = 1, perPage = 10) {
        try {
          const response = await DataService.get('/api/participants', {
            params: { search, page, perPage },
          });
          return response;
        } catch (error) {
          console.error("Error fetching participants:", error);
          throw error;
        }
      },
  async getParticipantById(id) {
    try {
      const response = await DataService.get(`/api/participants/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching participant with id ${id}`, error);
      throw error;
    }
  },
  async createParticipant(participantData) {
    try {
      const response = await DataService.post("/api/register/participant", participantData);
      return response.data;
    } catch (error) {
       console.error("Error creating participant:", error.response ? error.response.data : error);
        throw error;
    }
  },
  async updateParticipant(id, participantData) {
    try {
    const response = await DataService.put(`/api/participants/${id}`, participantData);
    return response.data;
    } catch (error) {
        console.error(`Error updating participant with ID ${id}:`, error.response ? error.response.data : error);
    throw error;
}
},
  async deleteParticipant(id) {
    try {
      const response = await DataService.delete(`/api/participants/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting participant with ID ${id}:`, error.response ? error.response.data : error);
      throw error;
    }
  },
};

export default ParticipantService;