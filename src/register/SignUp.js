/*
By Ahmed Al-Ghezi
 */

import React, {Component, useState} from "react";
//import {Navigation} from 'react-router';
import "./style.css";
import PostSignup from "../DB/postSignup";
import {useNavigate, useSearchParams} from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import ApproveTestsCNew from "./approveTests";
import WelcomeReg from "./WelcomeReg";
class SignUpC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      discipline: "",
      gender: "M",
      birthdate: "",
      readTerms: false,
      disciplinesList: [],
      showParentAccept: false,
      parentAccept: false,
      adminReg:'',
      captchaToken:'',
      tempReg:false,
      askAgain:false,
      working:false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getDisciplines();
    this.setState({adminReg:this.props.adminReg});
    this.setState({tempReg:this.props.tempReg});
    if(this.props.tempReg){
      this.setRandomPassword();
    }
    this.iniReCapcha();
  }


  setRandomPassword = () =>{
    const pwdChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%^&*()+=!";
    const pwdLen = Math.floor(Math.random() * (Math.floor(21) - Math.ceil(10)) + Math.ceil(10));
    const randPassword = Array(pwdLen).fill(pwdChars).map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');
    console.log(randPassword);
    this.setState({password:randPassword});
    }



  iniReCapcha = () =>{
    const key = "6LcDa3khAAAAAIN_Wm1BS0Kanirc-ldQBJeXvrOz";
    const handleLoaded = _ => {
      window.grecaptcha.ready(_ => {
        window.grecaptcha
            .execute(key, { action: "homepage" })
            .then(token => {
              console.log(token);
              this.setState({captchaToken:token})
            })
      })
    }
    const script = document.createElement("script")
    script.src = "https://www.google.com/recaptcha/api.js?render="+key
    script.addEventListener("load", handleLoaded)
    document.body.appendChild(script)
  }

  getDisciplines() {
    PostSignup.getAllDisciplines()
      .then((response) => {
        if (response.data.res === "error") {
          const arr = ["connection error"];
          this.setState({ disciplinesList: arr });
          return;
        } else {
          this.setState({ disciplinesList: response.data.res });
          this.setState({ discipline: response.data.res[0] });
          this.props.setDiscipline(response.data.res[0]);
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Es ist ein Fehler aufgetreten.");
      });
  }

  handleChange(event) {
    const target = event.target;
    let value = target.value;
    const name = target.name;
    if (name === "readTerms") value = target.checked;
    if (name === "parentAccept") value = target.checked;
    if(name === "askAgain") value = target.checked;
    if(name == "email") this.props.setEmail(value);
    if(name == "discipline") this.props.setDiscipline(value);
    this.setState({
      [name]: value,
    });

  }


  setBirthDate = (event) => {
    event.preventDefault();
    this.setState({ birthdate: event.target.value });
    const date = new Date(event.target.value);
    date.getDate();
    const date18 = new Date();
    date18.setFullYear(date18.getFullYear() - 18);
    // check if the date of birth is before that date
    if (date > date18) {
      this.setState({ showParentAccept: true });
    }else
      this.setState({ showParentAccept: false });
  }

  checkInput(stateData) {
    if (stateData.firstName === "") {
      alert("Bitte geben Sie Ihren Vornamen ein.");
      return false;
    }

    if (stateData.lastName === "") {
      alert("Bitte geben Sie Ihren Nachnamen ein.");
      return false;
    }

    if (stateData.birthdate === "") {
      alert("Bitte geben Sie Ihr Geburtsdatum ein.");
      return false;
    }

    const date = new Date(stateData.birthdate);
    date.getDate();
    const date13 = new Date();
    date13.setFullYear(date13.getFullYear() - 13);
    // check if the date of birth is before that date
    if (date > date13) {
      alert("Sie müssen älter als 13 Jahre sein, um sich zu registrieren.");
      return false;
    }

    if (stateData.email === "") {
      alert("Bitte geben Sie Ihre Email-Adresse ein.");
      return false;
    }

    if (stateData.password === "") {
      alert("pWählen Sie ein Passwort.");
      return false;
    }

    if (!stateData.readTerms) {
      alert("Bitte lesen und akzeptieren Sie die Bedingungen.");
      return false;
    }
    if (!stateData.parentAccept && stateData.showParentAccept) {
      alert("Bitte die Einverständnis der Eltern bestätigen.");
      return false;
    }
    return this.checkPassword(stateData.password);
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

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.working)
      return;
    this.setState({working:true});
    if (!this.checkInput(this.state)) return;
    PostSignup.setSignUP(this.state)
      .then((response) => {
        this.setState({working:false});
        if (response.data.res === "error")
          alert("Es ist ein Fehler aufgetreten.");
        else if (response.data.res === "duplicate key")
          alert("Diese Email-Adresse ist bereits registriert.");
        //this.props.history.push('./AfterReg');
        else {
          if(!this.state.askAgain)
            //this.props.showStudies(true);
            this.props.showWelcome(true,this.state);
          else{
            alert("Registration is successful! " +
                "When you click on the link sent to your email, you'd be asked again to accept the terms and conditions. " +
                "You may refresh the page to register another account");
          }
          //this.props.navigate("/reg/regSuc");
        }

      })
      .catch((e) => {
        this.setState({working:false});
        console.log(e);
        alert("Es ist ein Fehler aufgetreten.");
      });
    //event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Registrieren</h3>
        <div className="form-group">
          <label>Vorname</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            placeholder="Vorname"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label>Nachname</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nachname"
            name="lastName"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email-Adresse</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email-Adresse"
            name="email"
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label>Geburtsdatum</label>
          <input
            type="date"
            className="form-control"
            name="birthdate"
            onChange={this.setBirthDate}
          />
        </div>

        <div className="form-group">
          <label>Disziplin</label>
          <br></br>
          <select onChange={this.handleChange} name="discipline">
            {this.state.disciplinesList.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Geschlecht</label>
          <br></br>
          <select onChange={this.handleChange} name="gender">
            <option value="M">M</option>
            <option value="F">F</option>
          </select>
        </div>

        <div className="form-group">
          <label>Passwort</label>
          <input
            type="password"
            className="form-control"
            placeholder="Passwort"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
          />
        </div>

        <p></p>

        <div
            className="g-recaptcha"
            data-sitekey="_reCAPTCHA_site_key_"
            data-size="invisible"
        ></div>


        <div className="form-group">
          <label htmlFor="checkid">
            <input
              name="readTerms"
              type="checkbox"
              onChange={this.handleChange}
              defaultChecked={this.state.readTerms}
            />{" "}
           Ich habe die <a target="_blank" rel="noopener noreferrer" href={"https://inprove-sport.info/privacy_policy_inprove.pdf"}>Datenschutzbestimmungen und die 
          Bedingungen für die Datenspeicherung und -nutzung</a> gelesen und akzeptiere sie.
          </label>
        </div>

        <div className="form-group" hidden={!this.state.showParentAccept}>
          <label htmlFor="checkid">
            <input
              name="parentAccept"
              type="checkbox"
              onChange={this.handleChange}
            />{" "}
            Ich bestätige, dass ich das Einverständnis meiner Eltern habe, mich in diesem Portal zu registrieren.
          </label>
        </div>


        <div className="form-group" hidden={!this.props.tempReg}>
          <label htmlFor="checkid">
            <input
                name="askAgain"
                type="checkbox"
                onChange={this.handleChange}
            />{" "}
            Ask me to confirm again
          </label>
        </div>

        <button type="submit" className="btn btn-primary btn-block" disabled={this.state.working}>
          Registrieren
        </button>
        <p className="forgot-password text-right">
        Schon registriert? <a href="/reg/sign-in">Login</a>
        </p>
      </form>
    );
  }
}

function SignUp(props) {

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

  if(st === "" || st == null) {
    return <div>
      <div hidden={showStudies || showWelcome}>
        <SignUpC {...props} navigate={navigate} tempReg={isTemp} showStudies={setShowStudies} showWelcome={handleShowWelcome}
                 setEmail={setEmail} setDiscipline={setDiscipline} />
      </div>
      <div hidden={!showStudies}>
        <ApproveTestsCNew {...props} navigate={navigate} signUpData={signUpData} showStudies={setShowStudies} onSent={onSentF} email={email} discipline={discipline}/>
      </div>

      <div hidden={!showWelcome}>
        <WelcomeReg done={welcomeDone}/>
      </div>

    </div>;
  }
  else
    return <SignUpC {...props} navigate={navigate} adminReg={st} tempReg={isTemp}/>;
}

export default SignUp;
