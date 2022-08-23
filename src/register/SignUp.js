/*
By Ahmed Al-Ghezi
 */

import React, { Component } from "react";
//import {Navigation} from 'react-router';
import "./style.css";
import PostSignup from "../DB/postSignup";
import {useNavigate, useSearchParams} from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
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
      captchaToken:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getDisciplines();
    this.setState({adminReg:this.props.adminReg});
    this.iniReCapcha();
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
    }
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
    if (!this.checkInput(this.state)) return;
    PostSignup.setSignUP(this.state)
      .then((response) => {
        if (response.data.res === "error")
          alert("Es ist ein Fehler aufgetreten.");
        else if (response.data.res === "duplicate key")
          alert("Diese Email-Adresse ist bereits registriert.");
        //this.props.history.push('./AfterReg');
        else this.props.navigate("/reg/regSuc");
      })
      .catch((e) => {
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

        <button type="submit" className="btn btn-primary btn-block">
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
  const st = searchParams.get("admiregxn");
  console.log(st);
  let navigate = useNavigate();
  if(st === "")
    return <SignUpC {...props} navigate={navigate} />;
  else
    return <SignUpC {...props} navigate={navigate} adminReg={st} />;
}

export default SignUp;
