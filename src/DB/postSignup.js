/*
By Ahmed Al-Ghezi
 */

import http from "./httpCommon";
export default class PostSignup {

    static setSignUP(data){
        return http.post("/reg/signup", data);
    }
    static updateProfile(data) {
        return http.post("/reg/updateProfile", data);
    }

    static getAllDisciplines(){
        return http.get("/reg/getAllDisciplines");
    }

    static login(data) {
        return http.post("/reg/login/",data);
    }



    static getSignUpData() {
        return http.get("/reg/getProfile");
    }

    static deleteMyProfile() {
        return http.get("/reg/dellProfile");
    }

    static isLogin() {
        return http.get("/reg/isLoggedIn");
    }

    static isTrainer(role) {
        return role === "trainer";
    }

    static isAdminTrainer(role) {
        return role === "trainerAdmin";
    }

    static signOut() {
        return http.get("/reg/signOut");
    }

    static disguisedTrainerLogin(selectedTrainer) {
        return http.post("/reg/trainerDisguisedLogin",{email:selectedTrainer});
    }

}