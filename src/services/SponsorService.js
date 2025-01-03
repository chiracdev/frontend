import DataService from './DataService';

const SponsorService = {
    getAllSponsors(type = null) {
        let url = '/api/sponsors';
        if (type) {
            url += `?type=${type}`;
        }
        return DataService.get(url);
    },
    getSponsor(id) {
        return DataService.get(`/api/sponsors/${id}`);
    },
    createSponsor(sponsorData) {
        return DataService.post('/api/sponsors', sponsorData);
    },
    updateSponsor(id, sponsorData) {
        return DataService.put(`/api/sponsors/${id}`, sponsorData);
    },
    deleteSponsor(id) {
        return DataService.delete(`/api/sponsors/${id}`);
    },
};

export default SponsorService;