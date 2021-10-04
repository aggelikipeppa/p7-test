import axios from "axios";

import {API_URL} from "../constants"



class AuthService {
    login(email, password){
        return axios
          .post(API_URL + "auth/login", { email, password })
          .then((response) => {
            if (response.data.token) {
              localStorage.setItem("GROUPOMANIA_USER", JSON.stringify(response.data));
            }
    
            return response.data; 
        });
    }
    
    logout() {
        localStorage.removeItem("GROUPOMANIA_USER");
    }
    
    register(username, email, password) {
        return axios.post(API_URL + "auth/register", {
          username,
          email,
          password,
        });
    }
}
  
export default new AuthService();
