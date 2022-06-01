/*
By Ahmed Al-Ghezi
 */

import http from "./httpCommon";
export default class PostLimeControl {

    static addParticipants(data){
        return http.post("/reg/lime/addParticipants", data);
    }

}