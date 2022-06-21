
/*
By Ahmed Al-Ghezi
 */

import http from "./httpCommon";
import axios from "axios";
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


}