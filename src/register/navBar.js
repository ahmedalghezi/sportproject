/*
By Ahmed Al-Ghezi
 */

import React, { Component } from "react";
import PostSignup from "../DB/postSignup";
import { Link } from "react-router-dom";
import image from "../images/inprove_logo-400x103.png";
import Footer from "./footer";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignIn: true,
      showSignUp: true,
      showTrainer: false,
      showAdminTrainer: false,
      showAdmin: false,
      flag: false,
    };
    this.checkLogin = this.checkLogin.bind(this);
  }

  componentDidMount() {
    this.checkLogin();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.loggedin &&
      this.props.loggedin !== prevProps.loggedin &&
      this.state !== prevState
    )
      this.checkLogin();
  }

  checkLogin() {
    PostSignup.isLogin()
      .then((response) => {
        if (response.data.res === "ok") {
          this.setState({ showSignIn: false });
          this.setState({ showSignUp: false });
          this.setState({
            showTrainer: PostSignup.isTrainer(response.data.role),
          });
          this.setState({
            showAdminTrainer: PostSignup.isAdminTrainer(response.data.role),
          });
          this.setState({ showAdmin: PostSignup.isAdmin(response.data.role) });
        } else {
          this.setState({ showSingIn: true });
          this.setState({ showSingUp: true });
        }
        this.props.navBarUpdated();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    return (
      <div>
        <nav className="navbar  navbar-light fixed-top">
          <a href="https://www.inprove.info/" target="_blank">
            {" "}
            <img className="image" src={image} />
          </a>

          <div className="container">
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li
                  className="nav-item"
                  hidden={!this.state.showSignIn /*|| this.props.loggedin*/}
                >
                  <Link className="nav-link" to={"/reg/sign-in"}>
                    Login
                  </Link>
                </li>




                <li className="nav-item" hidden={this.state.showSignIn || this.state.showAdmin || this.state.showAdminTrainer}>
                  <Link className="nav-link" to={"/user/profile"}>
                    Mein Profil
                  </Link>
                </li>




                <li className="nav-item" hidden={true ||   this.state.showSignIn || this.state.showAdmin || this.state.showAdminTrainer ||this.state.showTrainer}>
                  <Link className="nav-link" to={"/reg/uploadConsent"}>
                    Einwilligungserklärung hochladen
                  </Link>
                </li>



                <li className="nav-item" hidden={this.state.showSignIn || this.state.showAdmin || this.state.showAdminTrainer}>
                  <Link className="nav-link" to={"/csv/athleteFileUpload"}>
                    Datei Hochladen
                  </Link>
                </li>



                <li
                    className="nav-item"
                    hidden={!this.state.showAdminTrainer && !this.state.showAdmin}
                >
                  <Link className="nav-link" to={"/csv/athleteInfo"}>
                    Athletes Info
                  </Link>
                </li>



                <li
                    className="nav-item"
                    hidden={!this.state.showAdminTrainer && !this.state.showAdmin}
                >
                  <Link className="nav-link" to={"/csv/displayAccept"}>
                    Studies Approvals
                  </Link>
                </li>





                <li
                  className="nav-item"
                  hidden={!this.state.showAdminTrainer && !this.state.showAdmin}
                >
                  <Link className="nav-link" to={"/lime/control"}>
                    Control Limesurvey
                  </Link>
                </li>


                <li
                    className="nav-item"
                    hidden={!this.state.showAdminTrainer && !this.state.showAdmin}
                >
                  <Link className="nav-link" to={"/csv/reader"}>
                    Upload Data
                  </Link>
                </li>

                <li
                    className="nav-item"
                    hidden={!this.state.showAdminTrainer && !this.state.showAdmin}
                >
                  <Link className="nav-link" to={"/csv/history"}>
                    Download Data
                  </Link>
                </li>

                <li
                    className="nav-item"
                    hidden={!this.state.showAdminTrainer && !this.state.showAdmin}
                >
                  <Link className="nav-link" to={"/super/athleteControl"}>
                    Manage Athlete
                  </Link>
                </li>

                <li
                    className="nav-item"
                    hidden={!this.state.showAdminTrainer && !this.state.showAdmin}
                >
                  <Link className="nav-link" to={"/avatar/createSection"}>
                    Create Section
                  </Link>
                </li>


                <li
                    className="nav-item"
                    hidden={!this.state.showAdminTrainer && !this.state.showAdmin}
                >
                  <Link className="nav-link" to={"/csv/metabase"}>
                    Metabase
                  </Link>
                </li>








                <li className="nav-item" hidden={!this.state.showTrainer}>
                  <Link className="nav-link" to={"/trainer/addMyTests"}>
                    Trainingsliste
                  </Link>
                </li>
                <li className="nav-item" hidden={!this.state.showTrainer}>
                  <Link className="nav-link" to={"/trainer/addAthletes"}>
                    Athletenliste
                  </Link>
                </li>
                <li className="nav-item" hidden={!this.state.showTrainer}>
                  <Link className="nav-link" to={"/trainer/sheet"}>
                    Einschätzung
                  </Link>
                </li>

                <li className="nav-item" hidden={!this.state.showTrainer}>
                  <Link className="nav-link" to={"/trainer/myhistory"}>
                    Meine Daten
                  </Link>
                </li>

                <li className="nav-item" hidden={!this.state.showTrainer && !this.state.showAdminTrainer}>
                  <Link className="nav-link" to={"/trainer/videos"}>
                    Upload videos
                  </Link>
                </li>

                <li className="nav-item" hidden={true || !this.state.showTrainer && !this.state.showAdmin && !this.state.showAdminTrainer}>
                  <Link className="nav-link" to={"/trainer/VideoUpload/uploadFile"}>
                    Upload videos
                  </Link>
                </li>

                <li className="nav-item" hidden={true || !this.state.showTrainer && !this.state.showAdmin && !this.state.showAdminTrainer}>
                  <Link className="nav-link" to={"/trainer/VideoUpload/videonav"}>
                    Manage videos
                  </Link>
                </li>


                <li className="nav-item" hidden={!this.state.showAdminTrainer}>
                  <Link className="nav-link" to={"/trainer/createTest"}>
                    Create New Training
                  </Link>
                </li>

                <li className="nav-item" hidden={!this.state.showAdminTrainer}>
                  <Link className="nav-link" to={"/trainer/editCoach"}>
                    Edit Coaches
                  </Link>
                </li>

                <li className="nav-item" hidden={this.state.showSignIn}>
                  <Link className="nav-link" to={"/reg/changemypassword"}>
                    Passwort ändern
                  </Link>
                </li>


                <li className="nav-item" hidden={this.state.showSignIn}>
                  <Link className="nav-link" to={"/reg/sign-out"}>
                    Ausloggen
                  </Link>
                </li>

              </ul>
            </div>
          </div>
        </nav>


      </div>
    );
  }
}
