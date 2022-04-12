/*
By Ahmed Al-Gehzi
 */

import http from "./httpCommon";
import axios from "axios";
export default class LimeControl {

    static addParticipants(data){
        return http.post("/reg/lime/addParticipants", data);
    }

}