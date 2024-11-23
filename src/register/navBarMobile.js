/*
By Ahmed Al-Ghezi
 */

import React, { Component } from "react";
import PostSignup from "../DB/postSignup";
import { Link } from "react-router-dom";
import image from "../images/inprove_logo-400x103.png";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default class NavBarMobile extends Component {
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

  submitReport() {
    const { reportEmail, reportDescription } = this.state;
    const currentPath = window.location.pathname;

    // Example: Sending data to backend
    axios.post('/api/report_issue', {
      email: reportEmail,
      description: reportDescription,
      path: currentPath
    })
    .then(response => {
      alert("Report submitted successfully.");
      this.handleCloseReportModal();
    })
    .catch(error => {
      console.error("Error submitting report:", error);
      alert("Failed to submit report.");
    });
  }

  
  render() {
    return (
      <div>

        <Navbar bg="light" expand="lg">
          <a href="https://www.inprove.info/" target="_blank">
            {" "}
            <img className="image" src={image} />
          </a>
          <Container>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
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
                  <Link className="nav-link" to={"/avatar/admin"}>
                    Avatar manger
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
                    hidden={!this.state.showAdminTrainer && !this.state.showAdmin}
                >
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
                      Videos
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

              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

         {/* Report Issue Modal */}
         <Modal show={this.state.showReportModal} onHide={this.handleCloseReportModal}>
          <Modal.Header closeButton>
            <Modal.Title>Report a Problem</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={this.state.reportEmail}
                  onChange={(e) => this.setState({ reportEmail: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>What has gone wrong?</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Describe the issue"
                  value={this.state.reportDescription}
                  onChange={(e) => this.setState({ reportDescription: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseReportModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.submitReport}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}
