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

    static passwordChangeLinkClicked(param) {
        return http.post("/reg/passwordLinkClicked",param);
    }



    static changePassword(data) {
        return http.post("/reg/changePassword",data);
    }

    static getStudyResult(data) {
        return http.post("/reg/displayStudiesResultB",data);
    }

    static changeEmail(data) {
        return http.post("/reg/changeEmail",data);
    }
}
