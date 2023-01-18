/*
By Ahmed Al-Ghezi
 */

import React, {Component, useState} from "react";
//import {Navigation} from 'react-router';
import "../register/style.css";
import PostSignup from "../DB/postSignup";
import {useNavigate, useSearchParams} from "react-router-dom";
import PostJizdanSignup from "./postJizdanSignup";
import getApp from "./firebase";
import { getAuth, signInWithPhoneNumber ,RecaptchaVerifier} from "firebase/auth";


class SignUpC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone:"",
      askForCode:false,
      code:"",
      confirmationResult:"",
      showCapcha:false,
      ID:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    window.addEventListener("message", message => {
      if(message.data.native)
        this.setState({ID:message.data.ID});
    });

    this.props.onHideNav(true);
   // document.documentElement.dir = "rtl";
  }


  setRandomPassword = () =>{
    const pwdChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%^&*()+=!";
    const pwdLen = Math.floor(Math.random() * (Math.floor(21) - Math.ceil(10)) + Math.ceil(10));
    const randPassword = Array(pwdLen).fill(pwdChars).map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');
    console.log(randPassword);
    this.setState({password:randPassword});
    }






  handleChange(event) {
    const target = event.target;
    let value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }



  checkInput(stateData) {
    if (stateData.name === "") {
      alert("يرجى كتابة الاسم");
      return false;
    }
    if (stateData.phone === "") {
      alert("يرجى كتابة رقم الموبايل");
      return false;
    }
    return true;
  }

  checkPassword(password) {
    const passw =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (password.match(passw)) return true;
    alert(
      "Das Passwort muss zwischen 8 und 15 Zeichen lang sein und mindestens einen Kleinbuchstaben, " +
        ", einen Großbuchstaben, eine Ziffer und ein Sonderzeichen enthalten."
    );
    return false;
  }


  signInWithPhone(){
    console.log("signing in with firebase");
    const auth = getAuth(getApp());
    // const auth = getAuth();
    auth.languageCode = 'iq';
    let phoneNumber = "+964"+this.state.phone;
    if(this.state.phone.startsWith("0"))
      phoneNumber = "+964"+this.state.phone.substring(1);
    if(this.state.phone === "999")
      phoneNumber = "+964 9990564977";
    this.setState({showCapcha:true});
    window.recaptchaVerifier = new RecaptchaVerifier('cont_cap_id', {}, auth);
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          console.log("code send");
          this.setState({confirmationResult:confirmationResult})
          //signInWithCode(confirmationResult);
          this.setState({askForCode:true});
          this.setState({working:false});
          this.setState({showCapcha:false});
          // ...
        }).catch((error) => {
          this.setState({working:false});
      this.setState({showCapcha:false});
      // Error; SMS not sent
      // ...
      console.log("Error; SMS not sent");
      console.log("kkk"+error);
    });
  }



  informServer = () =>{
    PostJizdanSignup.setSignUP({ID:this.state.ID,phone:this.state.phone})
        .then((response) => {
          this.setState({working:false});
          if (response.data.res === "error")
            alert("حصل خطأ ... رمز س91");
          else if (response.data.res === "duplicate key")
            alert("Diese Email-Adresse ist bereits registriert.");
          //this.props.history.push('./AfterReg');
          else {
            sendDataToReactNativeApp("ok");
            //this.props.navigate("/reg/regSuc");
          }
        })
        .catch((e) => {
          this.setState({working:false});
          console.log(e);
          alert("حصل خطأ ما");
          sendDataToReactNativeApp(this.state.phone);
        });
  }





  handleSubmit(event) {
    event.preventDefault();
    if (!this.checkInput(this.state))
      return;
    if(this.state.working)
      return;
    this.setState({working:true});
    if(!this.state.askForCode)
      this.signInWithPhone();
    else if(this.state.code != "") {
      let code = "123321";
      if(this.state.phone !== "999")
        code = this.state.code;
      signInWithCode(code, this.state.confirmationResult,this);
    }
    else
    {
      this.setState({working:false});
      //TODO make it red!!
    }
    //event.preventDefault();
  }




  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>التسجيل</h3>
        <div className="form-group">
          <label className={"float-end"}>الاسم</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Name"
            onChange={this.handleChange}
          />
        </div>





        <label className={"float-end"}>رقم الموبايل</label>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">+964</span>
          </div>
          <input type="phone" placeholder="Mobile phone" className="form-control" id="phone"  name="phone"  onChange={this.handleChange}/>
        </div>


        <br></br>

        <div className="form-group" hidden={!this.state.askForCode}>
          <label>سيتم ارسال كود الى جهازك لتأكيد الرقم عبر رسالة قصيرة</label>
          <input
              type="ادخل كود التفعيل"
              className="form-control"
              placeholder="number"
              name="code"
              onChange={this.handleChange}
          />
        </div>



        <div className="form-group" hidden={true}>
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Passwort"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
          />
        </div>

        <div hidden={!this.state.showCapcha}>
          <div id={"cont_cap_id"}></div>
        </div>

        <div
            className="g-recaptcha"
            data-sitekey="_reCAPTCHA_site_key_"
            data-size="invisible"
        ></div>

        <button type="submit" className="btn btn-primary btn-block" disabled={this.state.working}>
          سجل
        </button>
        <p className="forgot-password text-right">
        Schon registriert? <a href="/reg/sign-in">Login</a>
        </p>
      </form>
    );
  }
}

function SignUpJiz(props) {

  const [searchParams, setSearchParams] = useSearchParams();
  const [showStudies, setShowStudies] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [email, setEmail] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [signUpData, setSignUpData] = useState({});

  const st = searchParams.get("admiregxn");
  let tempParam = searchParams.get("temreg");
  let isTemp = false;
  if(tempParam)
    isTemp = true;
  let navigate = useNavigate();

  function onSentF(approveStudyRes){
    if(signUpData.showParentAccept){
      signUpData.alreadyReg = false;
      const obj = signUpData;
      obj.approveStudyRes = approveStudyRes;
      navigate("/reg/uploadConsent", {state: obj });
    }else
      navigate("/reg/regSuc");
  }

  function handleShowWelcome(result,state) {
    setShowWelcome(result);
    setSignUpData(state);
  }
  function welcomeDone() {
    console.log("welcome done");
    setShowStudies(true);
    setShowWelcome(false);
  }
  function onHideNav() {
    props.onHideNav(true);
  }

    return <SignUpC {...props} navigate={navigate} onHideNav={onHideNav}/>;
}





const signInWithCode= (code,confirmationResult,ref)  =>{
 // const confirmationResult = this.state.confirmationResult
  if(confirmationResult === ""){
    alert("error code Jz288; no confirmation result attached");
    return;
  }
  confirmationResult.confirm(code).then((result) => {
    // User signed in successfully.
    const user = result.user;
    alert("تم التسجيل");
    ref.informServer();
    // ...
  }).catch((error) => {
    alert( "error in code "+error)
    // User couldn't sign in (bad verification code?)
    // ...
    //grecaptcha.reset(window.recaptchaWidgetId);
  });
}


function sendDataToReactNativeApp(msg) {
  window.ReactNativeWebView.postMessage(msg);
};



export default SignUpJiz;
