import React, { Component } from "react";
//import {Navigation} from 'react-router';
import "../register/style.css";
import PostSignup from "../DB/postSignup";
import { useNavigate } from "react-router-dom";

import PersonalInfo from "../register/personalInfo";
import ApproveTests_todelete from "../register/approveTests_todelete";

class FormParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      discipline: "basketball",
      gender: "M",
      birthdate: "",
      readTerms: false,
      //disciplinesList: [],
      disciplinesList: ["Basketball","Volleyball","Gerätturnen","Sportgymnastik","Trampolin","Moderner Fünfkampf","Tischtennis","Eishockey","Bob","Rodeln","Skeleton"],
      showParentAccept: false,
      showFileUpload: false,
      selectedFile: null,
      parentAccept: false,
      switchId: "",
      isToggleOn: true,
      disallowedStudies: [],
      
      
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //#########################################################################################

  
/*
  componentDidMount() {
    this.getDisciplines();
    this.getStudies();
    //this.getSportAssociations();
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
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Es ist ein Fehler aufgetreten.");
      });
  }

  getStudies() {
    PostSignup.getStudies()
      .then((response) => {
        if (response.data.res === "error") {
          const arr = ["connection error"];
          this.setState({ studiesList: arr });
          return;
        } else {
          this.setState({ studiesList: response.data.res });
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Es ist ein Fehler aufgetreten.");
      });
  }
  /*
  getSportsAssociations(){
    PostSignup.getAllSportsAssociations()
      .then((response) => {
        if (response.data.res === "error") {
          const arr = ["connection error"];
          this.setState({ sportsAssociationList: arr });
          return;
        } else {
          this.setState({ sportsAssociationList: response.data.res });
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Es ist ein Fehler aufgetreten.");
      });
  }
*/
  // ##############################################################################
  setBirthDate(event) {
    event.preventDefault();
    this.setState({ birthdate: event.target.value });
    const date = new Date(event.target.value);
    date.getDate();
    const date18 = new Date();
    date18.setFullYear(date18.getFullYear() - 18);
    // check if the date of birth is before that date
    if (date > date18) {
      //this.setState({ showParentAccept: true });
      this.setState({ showFileUpload: true });
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
    const date16 = new Date();
    date16.setFullYear(date16.getFullYear() - 13);
    // check if the date of birth is before that date
    if (date > date16) {
      alert("Sie müssen älter als 13 Jahre sein, um sich zu registrieren.");
      return false;
    }

    if (stateData.email === "") {
      alert("Bitte geben Sie Ihre Email-Adresse ein.");
      return false;
    }

    if (stateData.password === "") {
      alert("Wählen Sie ein Passwort.");
      return false;
    }

    if (!stateData.readTerms && stateData.step === 2) {
      alert("Bitte lesen und akzeptieren Sie die Bedingungen.");
      return false;
    }
    if (
      !stateData.parentAccept &&
      stateData.showParentAccept &&
      stateData.step === 2
    ) {
      alert("Bitte die Einverständnis der Eltern bestätigen.");
      return false;
    }
    const date2 = new Date(stateData.birthdate);
    date.getDate();
    const date18 = new Date();
    date18.setFullYear(date18.getFullYear() - 18);
    if (date > date18 && stateData.selectedFile === null) {
      alert("Eine Einverständniserklärung der Eltern wird benötigt!");
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
    if (this.state.step === 1) {
      event.preventDefault();
      if (!this.checkInput(this.state)) return;
      this.nextStep();
    } else {
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
      console.log(this.state);
    }
  }

  //#########################################################################################

  // go back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  // proceed to the next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  // handle field change
  handleChange = (input) => (e) => {
    const target = e.target;
    let value = target.value;
    const name = target.name;
    const id = target.id;

    if (name === "readTerms") {
      value = target.checked;
      //print to console for testing
      // console.log("readTerms clicked " + value);
    }
    if (name === "parentAccept") {
      value = target.checked;
      //print to console for testing
      //console.log("parentAccept clicked " + value);
    }

    if (name === "switchId") {
      value = target.checked;

      const arr = this.state.disallowedStudies;
      arr[id] = value;

      this.setState({
        disallowedStudies: arr,
      });
      //print to console for testing
       console.log("switch " + id + " clicked " + value);
    }
    if (name === "birthdate") {
      this.setState({ birthdate: value });
      const date = new Date(value);
      date.getDate();
      const date18 = new Date();
      date18.setFullYear(date18.getFullYear() - 18);
      // check if the date of birth is before that date
      if (date > date18) {
        //show file upload button, if age is under 18
        this.setState({ showFileUpload: true });
      }
      //print to console for testing
      //console.log(this.state.showFileUpload + this.state.birthdate);
    }
    if (name === "file") {
      this.setState({ selectedFile: e.target.files[0] });
    }
    

    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const {
      firstName,
      lastName,
      email,
      password,
      discipline,
      gender,
      birthdate,
      readTerms,
      disciplinesList,
      showParentAccept,
      showFileUpload,
      parentAccept,
      switchId,
      isToggleOn,
      
     
    } = this.state;
    const values = {
      firstName,
      lastName,
      email,
      password,
      discipline,
      gender,
      birthdate,
      readTerms,
      disciplinesList,
      showParentAccept,
      showFileUpload,
      parentAccept,
      switchId,
      isToggleOn,
      
    
    };
    switch (step) {
      case 1:
        return (
          <PersonalInfo
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            values={values}
          />
        );
      case 2:
        return (
          <ApproveTests_todelete
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            values={values}
          />
        );

      default:
      // do nothing
    }
  }
}

function SignUPVan(props) {
  let navigate = useNavigate();

  return <FormParent {...props} navigate={navigate} />;
}

export default SignUPVan;
