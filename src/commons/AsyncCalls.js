import axios from 'axios'

export function fetchHousesList() {
    
    const serverUrl = "/casas" //Por que el basepath está definido en el configureaxios en webservices/Webservices.js
    return axios.get(serverUrl)
}