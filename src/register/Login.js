/*
By Ahmed Al-Ghezi
 */

import React, { Component } from "react";
import "./style_mobile.css";
import PostSignup from "../DB/postSignup";
import { useNavigate, useSearchParams } from "react-router-dom";

class LoginC extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "",captchaToken:"" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


    componentDidMount() {
        //alert("System is under maintenance until today 6:00 pm");
        this.iniReCapcha();
    }

    iniReCapcha = () =>{
        const key = "6LcDa3khAAAAAIN_Wm1BS0Kanirc-ldQBJeXvrOz";
        const handleLoaded = _ => {
            window.grecaptcha.ready(_ => {
                window.grecaptcha
                    .execute(key, { action: "homepage" })
                    .then(token => {
                        this.setState({captchaToken:token})
                    })
            })
        }
        const script = document.createElement("script")
        script.src = "https://www.google.com/recaptcha/api.js?render="+key
        script.addEventListener("load", handleLoaded)
        document.body.appendChild(script)
    }

  handleChange(event) {
    const target = event.target;
    let value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

      function forwardAthlete(response) {
          if(response.data.missing){
              if(response.data.missing.consent){
                  window.location.href = window.location.origin+"/reg/uploadconsent";
                  return;
              }
              if(response.data.missing.accept){
                  window.location.href = window.location.origin+"/reg/accept";
                  return;
              }
              if(response.data.missing.tests){
                  window.location.href = window.location.origin+"/reg/approveTests";
                  return;
              }

          }else
              window.location.href = window.location.origin+"/user/profile";
      }

      PostSignup.login(this.state)
      .then((response) => {
        if (response.data.res === "error")
          alert("Es ist ein Fehler aufgetreten.");
        else if (response.data.res === "wrong")
          alert("Username oder Passwort falsch!");
        else {
          if (this.props.searchParams.get("org") != null)
            this.props.navigate(
              this.props.searchParams.get("org").replaceAll("$", "/")
            );
          else if (
            response.data.role &&
            PostSignup.isTrainer(response.data.role)
          )
            window.location.href =
                window.location.origin+"/trainer/sheet";
          else if (
            response.data.role &&
            PostSignup.isAdminTrainer(response.data.role)
          )
            window.location.href =
                window.location.origin+"/trainer/createTest";
          else
              forwardAthlete(response);

        }
        this.iniReCapcha();
      })
      .catch((e) => {
        console.log(e);
        alert("Es ist ein Fehler aufgetreten.");
        this.iniReCapcha();
      });
  }


    handlePasswordForget = (event) =>{
        event.preventDefault();
        this.props.navigate("/reg/forgetPassword");
    }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Login</h3>

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
          <label>Passwort</label>
          <input
            type="password"
            className="form-control"
            placeholder="Passwort"
            name="password"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Login-Daten merken
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Einloggen
        </button>
        <p className="forgot-password text-right">
          <a href="#" onClick={this.handlePasswordForget}>Passwort vergessen?</a>
        </p>
      </form>
    );
  }
}

function Login(props) {
  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  return <LoginC {...props} navigate={navigate} searchParams={searchParams} />;
}

export default Login;
