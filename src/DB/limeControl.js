/*
By Ahmed Al-Ghezi
 */

import http from "./httpCommon";
export default class LimeControl {

    static addParticipants(data){
        return http.post("/reg/lime/addParticipants", data);
    }

}