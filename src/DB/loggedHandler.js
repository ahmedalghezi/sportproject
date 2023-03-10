import axios from "axios";
import http from "./httpCommon";


export default class LoggedHandler{

    static uploadVideo(data){
        return axios.post("https://inprove-sport.info"+"/files/saveVideo", data);
    }
    static updateProfile(data) {
        return http.post("/reg/updateProfile", data);
    }
    static getSignUpData() {
        return http.get("/reg/getProfile");
    }

    static getAthletesID(data) {
        return http.post("/reg/getAthleteIDs", data);
    }

    static deleteMyProfile() {
        return http.get("/reg/dellProfile");
    }

    static requestDell(data){
        return http.post("/reg/request_dell",data);
    }
    static openReg(data){
        return http.post("/reg/openRegis",data);
    }

}
