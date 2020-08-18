import axios from "axios";
import HelperService from "../helperService/helperService";

class AuthService {    
    login(userName, password) {
        return axios
            .post(HelperService.getAPIURL() + "/auth/login", {
                userName,
                password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }

    isAuthUser() {
        var user = JSON.parse(localStorage.getItem('user'));
        if (user === null) {
            return false;
        } else {
            var token = user.token;
            if (token === null) {
                return false;
            } else {
                return true;
            }
        }
    }

    logout() {
        localStorage.removeItem("user");
    }
}

export default new AuthService();