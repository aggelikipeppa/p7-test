import axios from "axios";

import { API_URL } from '../constants';
import authHeader from './auth-header';


class PostService{

    postMessage(content,file){
        let formData = new FormData();
        formData.append('image', file);
        formData.append('content', content);
        return axios.post(API_URL + 'posts',formData, { headers: authHeader() });
    }

    gettAllPosts(){
        return axios.get(API_URL + 'posts', { headers: authHeader() });
    }
}

export default new PostService()