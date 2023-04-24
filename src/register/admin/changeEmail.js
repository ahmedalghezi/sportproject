/*
By Ahmed Al-Ghezi
 */

import React, { Component } from "react";
import "../../register/style.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoggedHandler from "../../DB/loggedHandler";

class LoginC extends Component {
  constructor(props) {
    super(props);
    this.state = { emailCurrent: "", emailNew: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
      this.handleVerify = this.handleVerify.bind(this);
  }


    componentDidMount() {
        //alert("System is under maintenance until today 6:00 pm");
        //this.iniReCapcha();
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
    let value = target.value.trim();
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

      LoggedHandler.changeEmail(this.state)
      .then((response) => {
        if (response.data.res === "error")
          alert("Es ist ein Fehler aufgetreten. Error code chan57");
        else if (response.data.res === "ok"){
            alert("Email changed !");
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Es ist ein Fehler aufgetreten.");
      });
  }


    handleVerify(event) {
        event.preventDefault();

        if(this.state.emailCurrent === ""){
            alert("please set a current email to verify!");
            return;
        }
        if(this.state.emailNew !== ""){
            alert("please clear the 'new email' field in order to verify the 'current email' field !");
            return;
        }

        LoggedHandler.verifyChangeEmail(this.state)
            .then((response) => {
                if (response.data.res === "error")
                    alert("Es ist ein Fehler aufgetreten. Error code chan74: "+response.data.msg);
                else if (response.data.res === "ok"){
                    alert("everything is ok!");
                }
            })
            .catch((e) => {
                console.log(e);
                alert("Es ist ein Fehler aufgetreten. Error code chane81");
            });
    }




  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Change Email</h3>

        <div className="form-group">
          <label>Current email </label>
          <input
            type="email"
            className="form-control"
            placeholder="Email-Adresse"
            name="emailCurrent"
            onChange={this.handleChange}
          />
        </div>

          <div className="form-group">
              <label>New email</label>
              <input
                  type="email"
                  className="form-control"
                  placeholder="Neue E-mail-Adresse"
                  name="emailNew"
                  onChange={this.handleChange}
              />
          </div>

        <button type="submit" className="btn btn-primary btn-block">
          Change
        </button>
            <br/>

          <button  className="btn btn-primary btn-block" onClick={this.handleVerify}>
              Verify the current email
          </button>



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
