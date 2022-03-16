

import http from "./httpCommon";
class CoachInputDataService {

    registerCoach(data){
        return http.post("/register_coach", data);
    }


}
export default new CoachInputDataService();