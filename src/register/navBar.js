/*
By Ahmed Al-Ghezi
 */

import React, { Component } from "react";
import PostSignup from "../DB/postSignup";
import { Link } from "react-router-dom";
import image from "../images/inprove_logo-400x103.png";

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
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
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
                    Sign in
                  </Link>
                </li>

                <li className="nav-item" hidden={this.state.showSignIn}>
                  <Link className="nav-link" to={"/reg/sign-out"}>
                    Sign out
                  </Link>
                </li>

                <li className="nav-item" hidden={!this.state.showSignUp}>
                  <Link className="nav-link" to={"/reg/sign-up-van"}>
                    Sign up
                  </Link>
                </li>

                <li
                  className="nav-item"
                  hidden={!this.state.showAdminTrainer && !this.state.showAdmin}
                >
                  <Link className="nav-link" to={"/csv/reader"}>
                    Upload Files
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
                  <Link className="nav-link" to={"/csv/athleteInfo"}>
                    Athletes Info
                  </Link>
                </li>

                <li className="nav-item" hidden={!this.state.showTrainer}>
                  <Link className="nav-link" to={"/trainer/addMyTests"}>
                    Trainings List
                  </Link>
                </li>
                <li className="nav-item" hidden={!this.state.showTrainer}>
                  <Link className="nav-link" to={"/trainer/addAthletes"}>
                    Athletes List
                  </Link>
                </li>
                <li className="nav-item" hidden={!this.state.showTrainer}>
                  <Link className="nav-link" to={"/trainer/sheet"}>
                    Evaluation
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
              </ul>
            </div>
          </div>
        </nav>

        <div className="footer">
          <div id="beside">
            <div className="ldi">
              <a href="https://www.inprove.info/" target="_blank">
                {" "}
                <img src="https://www.inprove.info/wp-content/uploads/2022/03/inprove_logo_weiss-200x52.png" />
              </a>
            </div>{" "}
            <div className="ldi">
              <p>
                © <span className="numbers">2022</span>&nbsp;in:prove
                <br />
                <a href="https://www.inprove.info/datenschutz/">
                  Daten­schutz
                </a>{" "}
                | <a href="https://www.inprove.info/impressum/">Impressum</a>
              </p>
            </div>
            <div className="icondiv">
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
                integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
                crossorigin="anonymous"
                referrerpolicy="no-referrer"
              />
              <div className="container">
                <p>
                  <a
                    className="icon"
                    href="https://twitter.com/inprove_info"
                    target="_blank"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    className="icon"
                    href="https://www.instagram.com/inprove.info/"
                    target="_blank"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    className="icon"
                    href="https://www.linkedin.com/company/inprove-info"
                    target="_blank"
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                </p>
              </div>{" "}
            </div>
            <div className="bisp">
              <a
                href="https://www.bisp.de"
                target="_blank"
                aria-label="Gefoerdert_durch_BISp_rgb"
                rel="noopener noreferrer"
              >
                <img
                  width="100"
                  height="90"
                  src="https://www.inprove.info/wp-content/uploads/2022/04/Gefoerdert_durch_BISp_rgb.png"
                  data-orig-src="https://www.inprove.info/wp-content/uploads/2022/04/Gefoerdert_durch_BISp_rgb.png"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
