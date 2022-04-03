import http from "./httpCommon";
import axios from "axios";
export default class PostSignup {

    static setSignUP(data){
        return http.post("/reg/signup", data);
    }

}