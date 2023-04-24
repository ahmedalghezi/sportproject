/*
By Ahmed Al-Ghezi
 */

import http from "./httpCommon";
import axios from "axios";
export default class PostSignup {

    static setSignUP(data){
        return http.post("/reg/signup", data);
    }




    static getAllDisciplines(){
        return http.get("/reg/getAllDisciplines");
    }

    static login(data) {
        return http.post("/reg/login/",data);
    }




    static isLogin() {
        return http.get("/reg/isLoggedIn");
    }

    static signOut() {
        return http.get("/reg/signOut");
    }


    static getStudies(){
        return http.get("/reg/getStudies");
    }

    static getStudiesParam(data){
        return http.post("/reg/getStudiesParam", data);
    }

    static postStudies(data){
        return http.post("/reg/setStudies",data);
    }


    static requestChangePassword(data){
        return http.post("/reg/requestChangePassword",data);
    }


    static acceptTerms(param) {
        return http.post("/reg/accept_terms" , param);
    }
    static hasAcceptTerms(param) {
        return http.post("/reg/hasAcceptTerms" , param);
    }




    static uploadConsent(data){
        //return axios.post("https://inprove-sport.info:3000"+"/files/sendFileToAthlete", data)
        return axios.post("https://inprove-sport.info"+"/files/sendConsent", data)/*, {
            // receive two parameter endpoint url ,form data
        })
            .then(res => { // then print response status
                console.log(res.statusText)
            });*/
    }


    static requestDell(data){
        return http.post("/reg/request_dell",data);
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


















}
