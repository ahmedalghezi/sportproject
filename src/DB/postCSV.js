


import http from "./httpCommon";
import axios from "axios";
export default class PostCSVData {

    static setPerformanceDump(data){
        return http.post("/csv/dump_performance", data);
    }


    static setPerformanceAthlete(data){
        return http.post("/csv/set_performance_athlete", data);
    }


    static checkTests(data) {
        return http.post("/csv/check_tests", data);
    }
}