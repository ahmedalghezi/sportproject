
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
        axios.post('http://localhost:8080/api/tutorials/csv/dump_performance', article)
            .then(response => this.setState({ articleId: response.data.id }));
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


    /**
     *
     * @param data= {}
     * @returns {Promise<AxiosResponse<any>>} {res:"ok,no,error",data:{space:"space1":features:[{ID:"id1",name:"feat1"},{ID:"id2",name:"feat2"}...]}}
     */
    static getFeatures(data){
        return http.post("/csv/getFeatures", data);
    }

    /**
     *
     * @param data ={space:"selected_space",features:[{ID:"slec_id1"},{ID:"selec_id2"}...]}}
     * @returns {Promise<AxiosResponse<any>>} {res:"ok,no,error",data: similar to download data from Ayman}
     */
    static getFeaturesData(data){
        return http.post("/csv/getFeaturesData", data);
    }
}