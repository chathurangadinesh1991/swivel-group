const API_URL = 'https://localhost:44328/api';

class HelperService {    
    getAPIURL() {
        return API_URL;
    }
}

export default new HelperService();