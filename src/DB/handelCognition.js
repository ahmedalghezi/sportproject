/*
By Ahmed Al-Ghezi
 */
import http from "./httpCommon";
import axios from "axios";
export default class HandelCognition{

    /**
     *
     * @param data {id:testID}
     * @returns res = [ {videoID:1, sportVideo:{ID:1,url:"http://.."}, questionVideo:{ID:2,url:"http://.."}}  ,
     *                  {sportVideo:{ID:1,url:"http://.."}, questionVideo:{ID:2,url:"http://.."}} ,
     *                  {sportVideo:{ID:1,url:"http://.."}, questionVideo:{ID:2,url:"http://.."}} ,
     *                  ....
     *                  ]
     */
    static getTests(data){
        return http.post("/lime/getCognitionTests", data);
    }



    /**
     *  see PostSignup.uploadConsent() and its usage in handleSubmit() within uploadConsent.js
     * @param data {file...}
     * @returns {filenmae:"somename"}
     */

    static uploadRecordFiles(data){
        return axios.post("https://inprove-sport.info"+"/files/uploadCognitionRecords", data)
    }


    /**
     *
     * @param data {{videoID:1, recFileName:"fileName1"} , {videoID:2, recFileName:"fileName2"} ,  }
     * @returns {Promise<AxiosResponse<any>>}
     */

    static postTestRes(data){
        return http.post("/lime/postCognitionTestsRes", data);
    }
}