import http from "./httpCommon";




import http from "./httpCommon";
class PostCSVData {

    setPerformanceDump(data){
        return http.post("/csv/dump_performance", data);
    }


    setPerformanceAthlete(data){
        return http.post("/csv/set_performance_athlete", data);
    }



}
export default new PostCSVData();