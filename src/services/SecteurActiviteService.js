import DataService from './DataService';

const SecteurActiviteService = {
  getAllSecteurActivites() {
    return DataService.get('/api/secteur-activite');
  },
};

export default SecteurActiviteService;