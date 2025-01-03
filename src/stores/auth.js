import { defineStore } from "pinia";
import DataService from "../services/DataService";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
  }),
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem("token", token);
      DataService.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },

    async fetchUser () {
      try {
        const response = await DataService.get('/api/me');
        this.user = response.data.data; // Ajustez en fonction de la structure de votre réponse API
      } catch (error) {
        console.error('Failed to fetch user:', error);
        throw error; // Relancer l'erreur pour la gérer dans le composant
      }
    },

    async registerParticipant(participantData) {
      try {
        const response = await DataService.post("/api/register/participant", participantData);
        this.user = response.data.user;
        this.setToken(response.data.access_token);
      } catch (error) {
        console.error("Registration failed:", error);
        throw error; // Propager l'erreur
      }
    },

    async registerSponsor(sponsorData) {
      try {
        const response = await DataService.post("/api/register/sponsor", sponsorData);
        this.user = response.data.user;
        this.setToken(response.data.access_token);
      } catch (error) {
        console.error("Registration failed:", error);
        throw error; // Propager l'erreur
      }
    },

    async login(credentials ) {
      try {
        const response = await DataService.post("/api/login", credentials);
        this.user = response.data.user;
        this.setToken(response.data.access_token);
      } catch (error) {
        console.error("Login failed:", error);
        throw error; // Propager l'erreur
      }
    },

    async logout() {
      try {
        await DataService.post("/api/logout");
        this.user = null;
        this.token = null;
        localStorage.removeItem("token");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    },

    async updateProfile(profileData) {
      try {
        const response = await DataService.put("/api/user/profile", profileData);
        this.user = response.data.user;
        return response.data.message;
      } catch (error) {
        console.error("Profile update failed:", error);
        throw error; // Propager l'erreur
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user && state.user.type === "administrateur", // Ajusté pour correspondre au type d'utilisateur
  },
});