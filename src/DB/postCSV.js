
/*
By Ahmed Al-Ghezi
 */

import http from "./httpCommon";
import axios from "axios";
import baseUrl from "./httpCommon";

export default class PostCSVData {

    static setPerformanceDump(data){
        return http.post("/csv/dump_performance", data);
    }

    static componentDidMount() {
        // Simple POST request with a JSON body using axios
        const article = { title: 'React POST Request Example' };
    }


    static setPerformanceAthlete(data){
        return http.post("/csv/set_performance_athlete", data);
    }


    static checkTests(data) {
        return http.post("/csv/check_tests", data);
    }

    static sendTestsInitial(data){
        return http.post("/csv/send_tests_1", data);
    }


    static getMyFiles(){
        return http.get("/files/getMyFilesLinks");
    }
    static getMySurveys(){
        return http.get("/files/getMySurveyLinks");
    }


    static uploadToAthlete(data) {
        return axios.post("https://inprove-sport.info"+"/files/sendFileToAthlete", data);
    }

    static saveFileNameToAthlete(param) {
        return http.post("/files/saveFileNameToAthlete", param);
    }
    static deleteFile(param) {
        return http.post("/files/deleteFile", param);
    }


    //  ##### general file upload Vanessa #####
    static getMyOwnFiles(){
        return http.get("/files/getMyOwnFilesLinks");
    }


    static myFileUpload(data) {
        return axios.post("https://inprove-sport.info"+"/files/sendMyFile", data);
    }

    static saveMyFileName(param) {
        return http.post("/files/saveMyFileName", param);
    }
    static deleteMyFile(param) {
        return http.post("/files/deleteMyFile", param);
    }
    //  ##### general file upload - END Vanessa #####



    /**
     *
     * @param data= {}
     * @returns {Promise<AxiosResponse<any>>} {res:"ok,no,error",data:[{space:"space1":features:[{ID:"id1",name:"feat1"},{ID:"id2",name:"feat2"}...]} , ...]}
     */
    static getFeatures(data){
        return http.post("/csv/getFeatures", data);
    }

    /**
     *
     * @param data =[{space:"selected_space",features:[{ID:"slec_id1"},{ID:"selec_id2"}...]}} , .....]
     * @returns {Promise<AxiosResponse<any>>} {res:"ok,no,error",data: similar to download data from Ayman}
     */
    static getFeaturesData(data){
        return http.post("/csv/getFeaturesData", data);
    }

    static deleteCSVRow(data) {
        return http.post("/csv/deleteSelectedRow", data);
    }

    static getSpaces() {
        return http.get("/csv/getSpaces");
    }


    /**
     * loads 10 tests to fill their metadata fields
     * @param data {discipline:"xxx",space:"xxx"}
     * @returns {res:"ok"} , {res:"no"} or {res:"error"}
     */
    static getMetadata(data) {
        return http.post("/csv/getMetadata", data);
    }


    /**
     * Sets the description of metadata in the DB
     * @param data   {tests:[{testId:"xx", desc:"xxx"} , .... ]}
     * @returns {res:"ok"} , {res:"no"} or {res:"error"}
     */
    static sendMeta(data) {
        return http.post("/csv/setMetadata", data);
    }

    static getCharts(){
        return http.get("/csv/getCharts");
    }
}
