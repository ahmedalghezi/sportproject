/*
By Ahmed Al-Ghezi
 */

import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import PostSignup from "../DB/postSignup";
import {Link, Route} from "react-router-dom";
import image from "../images/inprove_logo-400x103.png";
import Footer from "./footer";
import SectionAndEntryManager from "./admin/avatarManger";
import axios from "axios";

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
      showReportModal: false, // State to control modal visibility
      reportEmail: "",
      reportDescription: ""
    };
    this.checkLogin = this.checkLogin.bind(this);
    this.handleReportIssue = this.handleReportIssue.bind(this);
    this.submitReport = this.submitReport.bind(this);
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

  handleReportIssue() {
    this.setState({ showReportModal: true });
  }

  handleCloseReportModal = () => {
    this.setState({ showReportModal: false });
  }

  // submitReport() {
  //   const { reportEmail, reportDescription } = this.state;
  //   const currentPath = window.location.pathname;

  //   axios.post('/api/report_issue', {
  //     email: reportEmail,
  //     description: reportDescription,
  //     path: currentPath
  //   })
  //   .then(response => {
  //     alert("Report submitted successfully.");
  //     this.handleCloseReportModal();
  //   })
  //   .catch(error => {
  //     console.error("Error submitting report:", error);
  //     alert("Failed to submit report.");
  //   });
  // }

  submitReport() {
    const { reportEmail, reportDescription } = this.state;
    const currentPath = window.location.pathname;
  
    // Assuming athlete_id is stored in a session or cookie
    // const athleteId = sessionStorage.getItem("athlete_id"); // Or `localStorage.getItem`
    
    // console.log("athlete_id : ", athleteId)
    // console.log("reportEmail : ", reportEmail)
    // console.log("reportDescription : ", reportDescription)
    // console.log("currentPath : ", currentPath)

    if (!reportEmail || !reportDescription) {
      alert("Alle Felder sind erforderlich.");
      return;
    }
  
    axios.post('https://inprove-sport.info/reg/report-problem', {
      // athlete_id: athleteId,
      email: reportEmail,
      issue: reportDescription,
      path: currentPath,
    })
      .then(response => {
        if (response.status === 201) {
          console.log("Success")
          alert("Problem erfolgreich gemeldet."); // "Problem reported successfully."
          this.handleCloseReportModal();
        }
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 400) {
            alert("Ungültige Anfrage. Bitte überprüfen Sie Ihre Eingabe.");
          } else if (error.response.status === 500) {
            alert("Server-Fehler. Bitte versuchen Sie es später noch einmal.");
          }
        } else {
          console.error("Error submitting report:", error);
          alert("Der Bericht wurde nicht eingereicht. Bitte überprüfen Sie Ihre Verbindung.");
        }
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
                  hidden={!this.state.showSignIn}
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
                  <Link className="nav-link" to={"/avatar/admin"}>
                    Avatar manager
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

                <li
                    className="nav-item"
                    hidden={this.state.showSignIn}>
                  <button className="nav-link" onClick={this.handleReportIssue}>
                      Report Issue
                    </button>
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

        {/* Report Issue Modal */}
        <Modal show={this.state.showReportModal} onHide={this.handleCloseReportModal}>
          <Modal.Header closeButton>
            <Modal.Title> Ein Problem melden </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formEmail">
                <Form.Label> Email </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ihre E-Mail eingeben"
                  value={this.state.reportEmail}
                  onChange={(e) => this.setState({ reportEmail: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label> Was ist schief gelaufen?  </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Beschreiben Sie das Problem"
                  value={this.state.reportDescription}
                  onChange={(e) => this.setState({ reportDescription: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseReportModal}>
            Abbrechen
            </Button>
            <Button variant="primary" onClick={this.submitReport}>
            Einreichen
            </Button>
          </Modal.Footer>
        </Modal>


      </div>
    );
  }
}
