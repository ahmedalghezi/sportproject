/*
By Ahmed Al-Gehzi
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
        return http.get("/reg/signup/getAllDisciplines");
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

    static signOut() {
        return http.get("/reg/signOut");
    }
}