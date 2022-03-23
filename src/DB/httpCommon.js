import axios from "axios";
export default axios.create({
   // baseURL: "http://localhost:8080/api",
    baseURL: "http://localhost:3010/",
    json: true,
    headers: {
        "Content-type": "application/json"
    }
});

