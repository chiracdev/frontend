import DataService from './DataService'; 

const CONTACTS_API_URL = '/api/contacts'; 

const ContactsService = {
    // Créer un nouveau contact
    createContact: async (contactData) => {
        try {
            const response = await DataService.post(CONTACTS_API_URL, contactData);
            return response.data;
        } catch (error) {
            throw error.response.data; 
        }
    },

    // Obtenir tous les contacts
    getAllContacts: async () => {
        try {
            const response = await DataService.get(CONTACTS_API_URL);
            return response.data;
        } catch (error) {
            throw error.response.data; 
        }
    },

    // Obtenir un contact par ID
    getContactById: async (id) => {
        try {
            const response = await DataService.get(`${CONTACTS_API_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    // Supprimer un contact
    deleteContact: async (id) => {
        try {
            const response = await DataService.delete(`${CONTACTS_API_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw error.response.data; 
        }
    },

    // Marquer un contact comme lu
    markContactAsRead: async (id) => {
        try {
            const response = await DataService.put(`${CONTACTS_API_URL}/${id}/read`);
            return response.data;
        } catch (error) {
            throw error.response.data; 
        }
    },

    // Répondre à un contact
    replyToContact: async (id, replyData) => {
        try {
            const response = await DataService.put(`${CONTACTS_API_URL}/${id}/reply`, replyData);
            return response.data;
        } catch (error) {
            throw error.response.data; 
        }
    },

    // Obtenir les sujets valides
    getSubjects: async () => {
        try {
            const response = await DataService.get('/api/subjects');
            return response.data;
        } catch (error) {
            throw error.response.data; 
        }
    }
};

export default ContactsService;
