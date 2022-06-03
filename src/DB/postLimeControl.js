/*
By Ahmed Al-Ghezi
 */

import http from "./httpCommon";
export default class PostLimeControl {

    static addParticipants(data){
        return http.post("/lime/addParticipants", data);
    }

    static removeParticipants(data) {
        return http.post("/lime/removeParticipants", data);
    }
}