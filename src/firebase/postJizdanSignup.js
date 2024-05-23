
import axios from "axios";

export default class PostSignup {

    static setSignUP(data) {
        return axios.post("https://inprove-sport.info"+"/jizdan/setReg", data);
    }

    static setPhoneOwnership(data) {
        return axios.post("https://inprove-sport.info"+"/jizdan/product/setPhoneOwnership", data);
    }
}
