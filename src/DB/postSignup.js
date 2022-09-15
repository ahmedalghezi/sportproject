/*
By Ahmed Al-Ghezi
 */

import http from "./httpCommon";
import axios from "axios";
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

    static getAthletesID(data) {
        return http.post("/reg/getAthleteIDs", data);
    }

    static deleteMyProfile() {
        return http.get("/reg/dellProfile");
    }

    static requestDell(data){
        return http.post("/reg/request_dell",data);
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

    static isAdmin(role){
        return role === "admin";
    }

    static signOut() {
        return http.get("/reg/signOut");
    }

    static disguisedTrainerLogin(selectedTrainer) {
        return http.post("/reg/trainerDisguisedLogin",{email:selectedTrainer});
    }

    static getStudies(){
        return http.get("/reg/getStudies");
    }

    static requestChangePassword(data){
        return http.post("/reg/requestChangePassword",data);
    }

    static changePassword(data){
        return http.post("/reg/changePassword" , data);
    }

    static acceptTerms(param) {
        return http.post("/reg/accept_terms" , param);
    }


    static passwordChangeLinkClicked(param) {
        return http.post("/reg/passwordLinkClicked" , param);
    }

    static uploadConsent(data){
        return axios.post(window.location.origin+"/files/sendConsent", data)/*, {
            // receive two parameter endpoint url ,form data
        })
            .then(res => { // then print response status
                console.log(res.statusText)
            });*/
    }


}