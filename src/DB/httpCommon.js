import axios from "axios";
export default axios.create({
   // baseURL: "http://localhost:8080/api",
   baseURL: "http://localhost:3010/",
 //   baseURL: "https://inprove-sport.info:3000/",
    json: true,
    headers: {
        "Content-type": "application/json"
    }
});

