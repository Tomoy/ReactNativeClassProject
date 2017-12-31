import axios from 'axios'
import * as Constanst from './Constants'

export function configureAxios() {
    axios.defaults.baseURL = BASE_URL;
    //axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    axios.defaults.headers.post['Content-Type'] = 'application/json'
}