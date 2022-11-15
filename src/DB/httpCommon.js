/*
By Ahmed Al-Ghezi
 */
import axios from "axios";
const baseUrl = "https://inprove-sport.info/";
//baseURL:window.location.origin,
const http = axios.create({
    baseURL: baseUrl,
    json: true,
    headers: {
        "Content-type": "application/json"
    }
});
export default http;

