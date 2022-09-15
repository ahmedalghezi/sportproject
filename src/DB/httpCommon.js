/*
By Ahmed Al-Ghezi
 */
import axios from "axios";
export default axios.create({
    //baseURL: "http://localhost:80",
  // baseURL: "http://localhost:3010/",
   // baseURL: "https://inprove-sport.info:3000/",
    baseURL:window.location.origin,
    json: true,
    headers: {
        "Content-type": "application/json"
    }
});

