/*
By Ahmed Al-Ghezi
 */
import http from "./httpCommon";
export default class HandelTrainer{

    static createTest(data){
        return http.post("/trainer/createTest", data);
    }


    //todo remove
    static getTestsAthletes() {
        return http.get("/trainer/getTestAthletes");
    }

    static getAllTests(discipline) {
        return http.post("/trainer/getTests",discipline);
    }

    static getMyTests() {
        return http.get("/trainer/getMyTests");
    }

    static postMyTests(myTestsArr) {
        return http.post("/trainer/setMyTests",myTestsArr);
    }

    static getMyAthletes() {
        return http.get("/trainer/getMyAthletes");
    }

    static findAthletesEmail(email) {
        return http.post("/trainer/findAthletesEmail",{"email":email});
    }

    static postMyAthlete(data) {
        return http.post("/trainer/setMyAthletes",data);
    }

    static postTestResults(data) {
        return http.post("/trainer/postTestResults",data);
    }

    static readHistory(){
        return http.get("/trainer/getHistory");
    }

    static getAllTrainers() {
        return http.get("/trainer/getTrainers");
    }

    static makeCoach(data) {
        return http.post("/trainer/makeTrainer",data);
    }

    static deleteTest(data) {
        return http.post("/trainer/deleteTest",data);
    }


    /**
     *
     * @param data {name:""}
     * @returns {Promise<AxiosResponse<any>>} {res:"ok,no,error"}
     */
    static createTrainerGroup(data){
        return http.post("/trainer/createGroup",data);
    }

    /**
     *
     * @param data {ID:""}
     * @returns {Promise<AxiosResponse<any>>} {res:"ok,no,error"}
     */
    static removeTrainerGroup(data){
        return http.post("/trainer/deleteGroup",data);
    }

    /**
     *
     * @param
     * @returns {Promise<AxiosResponse<any>>} {res:"ok,no,error", data:[{ID:1,name:""},...]}
     */
    static getGroups(){
        return http.get("/trainer/getGroups");
    }


    /**
     *
     * @param data = {ID:1}
     * @returns {Promise<AxiosResponse<any>>} {res:"ok,no,error", data:[{ID:1,name:""}...]}
     */
    static getGroupMembers(data){
        return http.post("/trainer/getGroupMembers",data);
    }



    /**
     *
     * @param data = {groupID:1,trainerID:1}
     * @returns {Promise<AxiosResponse<any>>} {res:"ok,no,error,duplicate"}
     */
    static addToGroup(data){
        return http.post("/trainer/addToGroup",data);
    }


    /**
     *
     * @param data = {groupID:1,trainerID:1}
     * @returns {Promise<AxiosResponse<any>>} {res:"ok,no,error"}
     */
    static removeFromGroup(data){
        return http.post("/trainer/removeFromGroup",data);
    }


    static getVideos(){
        return http.post("/trainer/getVideos",{});
    }

    static sendVideoTitle(data){
        return http.post("/trainer/updateVideoTitle",data);
    }

}