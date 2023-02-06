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


const debug = false;

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
    if(name === "phone"){
      value = this.a2e(value);
      if(value === "999")
        value = "9990564977";
      if(value.startsWith("0"))
        value = "+964"+this.state.phone.substring(1);
      value = "+964"+value;
    }
    if(name === "code"){
      value = this.a2e(value);
    }
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

  a2e = s => s.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));

  signInWithPhone(){
    console.log("signing in with firebase");
    const auth = getAuth(getApp());
    // const auth = getAuth();
    auth.languageCode = 'iq';
    this.setState({showCapcha:true});
    window.recaptchaVerifier = new RecaptchaVerifier('cont_cap_id', {}, auth);
    const appVerifier = window.recaptchaVerifier;
    const phoneNumber = this.state.phone;
    if(debug)
      alert("pereparing to sign in with phone");
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          if(debug)
            alert("got res sign in with phone");
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
      alert("رقم الموبايل المعطى غير صالح");
      // Error; SMS not sent
      // ...
      console.log("Error; SMS not sent");
      console.log("kkk"+error);
    });
  }



  informServer = (userID) =>{
    PostJizdanSignup.setSignUP({ID:this.state.ID,phone:this.state.phone,name:this.state.name,userID:userID})
        .then((response) => {
          this.setState({working:false});
          if (response.data.res === "error")
            alert("حصل خطأ ... رمز س91");
          else if (response.data.res === "duplicate key")
            alert("Diese Email-Adresse ist bereits registriert.");
          //this.props.history.push('./AfterReg');
          else {
            sendDataToReactNativeApp(this.state.phone+"code:"+response.data.code);
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
      alert("يرجى ادخال الكود الذي وصلك بالرسالة القصيرة")
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
          <label>تم ارسال كود الى جهازك لتأكيد الرقم عبر رسالة قصيرة</label>
          <input
              type="ادخل كود التفعيل"
              className="form-control"
              placeholder="SMS code"
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
  ref.setState({working:true});
  confirmationResult.confirm(code).then((result) => {
    ref.setState({working:false});
    // User signed in successfully.
    const user = result.user;
    alert("تم التسجيل");
    ref.informServer(user.uid);
    // ...
  }).catch((error) => {
    ref.setState({working:false});
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
