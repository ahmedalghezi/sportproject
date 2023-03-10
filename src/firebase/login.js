

import getApp from "./firebase";
import { getAuth, signInWithPhoneNumber ,RecaptchaVerifier} from "firebase/auth";
import React, {Component} from "react";




class Login extends Component {


    constructor(props) {
        super(props);
    }


    componentDidMount() {
       // this.onFormSubmit();
      //  this.signIn();
    }









     onFormSubmit = (event) => {
        //register with firebase
        console.log("signing in ");
        // signIn();
        this.checkBot();
        //alert(JSON.stringify(values, null, 2));
    }

     checkBot() {
        console.log("signing in with firebase");
        const auth = getAuth();
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
        /*window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                onSignInSubmit();
            }
        }, auth);*/

    }


     signIn(){
        console.log("signing in with firebase");
        const auth = getAuth(getApp());
        // const auth = getAuth();
        auth.languageCode = 'iq';
        const phoneNumber = "+964 9990564977";
        window.recaptchaVerifier = new RecaptchaVerifier('cont_cap_id', {}, auth);
        const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                console.log("code send");
                signInWithCode(confirmationResult,phoneNumber);
                // ...
            }).catch((error) => {
            // Error; SMS not sent
            // ...
            console.log("Error; SMS not sent");
            console.log("kkk"+error);
        });
    }









    /*

     registerServer(){
        Post.register(values).then(response => {
            if(response.data.res === "error") {
                alert("error code surve151");
                return;
            }
            if(response.data.res === "no"){
                alert("Bitte erst anmelden.");
                return;
            }
            if(response.data.res === "ok") {
                alert("تم التسجيل بنجاح")
            }

        }).catch(e => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten!");
        });
    }

*/





    render() {
        return (
            <div>
                <p>Hello, this is login!</p>
                <div id={"cont_cap_id"}></div>
                <button onClick={this.signIn} id={"contai"}> click me</button>
            </div>
        );
    }
}



const signInWithCode = (confirmationResult,phone) => {
    //const code = "123321";
    const code = this.state.code;
    if(code === ""){
        this.setState({working:false});
        return;
    }
    confirmationResult.confirm(code).then((result) => {
        // User signed in successfully.
        const user = result.user;
        const uid = user.uid;
        this.setState({working:false});
        sendDataToReactNativeApp(phone);
        return;
        // ...
    }).catch((error) => {
        this.setState({working:false});
        alert("خطأ.. كود التفعيل غير صحيح!");
        return;
        // User couldn't sign in (bad verification code?)
        // ...
        //grecaptcha.reset(window.recaptchaWidgetId);
    });
}
function sendDataToReactNativeApp(msg) {
    window.ReactNativeWebView.postMessage(msg);
};
export default Login;
