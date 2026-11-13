import axios from 'axios';

const API = axios.create({
    baseURL: "https://hackathon-registration-portal-hc79.onrender.com",
    withCredentials:true
});

export default API;