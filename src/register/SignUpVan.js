import React, { Component } from "react";
//import {Navigation} from 'react-router';
import "./style.css";
import PostSignup from "../DB/postSignup";
import { useNavigate } from "react-router-dom";

import PersonalInfo from "./personalInfo";
import ApproveTests from "./approveTests";

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
      disciplinesList: [],
      showParentAccept: false,
      parentAccept: false,
      switchId: "",
      isToggleOn: true,
      disallowedStudies: [],
      weight:0,
      height:0,
      armSpan:0,
      heightSpanStand:0,
      heightSpanSit:0,
      heightKnee:0,
      heightSit:0,
      studiesList: [
        { ID: 1, title: "Motorik" },
        { ID: 2, title: "Leistungsphysiologie" },
        { ID: 3, title: "Sportsoziologie" },
        { ID: 4, title: "Leistungspsychologie" },
      ],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
   
  }
  //#########################################################################################

  componentDidMount() {
    this.getDisciplines();
    this.getStudies();
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
  if (!stateData.parentAccept && stateData.showParentAccept && stateData.step === 2) {
    alert("Bitte die Einverständnis der Eltern bestätigen.");
    return false;
  }
  if (stateData.weight < 0 && stateData.step === 2) {
    alert("Negative Zahl für Gewicht ist nicht zulässig.");
    return false;
  }
  if (stateData.height < 0 && stateData.step === 2) {
    alert("Negative Zahl für Körpergröße ist nicht zulässig.");
    return false;
  }
  
  if (stateData.armSpan < 0 && stateData.step === 2) {
    alert("Negative Zahl ist nicht zulässig.");
    return false;
  }
  if (stateData.heightSpanStand < 0 && stateData.step === 2) {
    alert("Negative Zahl ist nicht zulässig.");
    return false;
  }
  if (stateData.heightSpanSit < 0 && stateData.step === 2) {
    alert("Negative Zahl ist nicht zulässig.");
    return false;
  }
  if (stateData.heightKnee < 0 && stateData.step === 2) {
    alert("Negative Zahl ist nicht zulässig.");
    return false;
  }
  if (stateData.heightSit < 0 && stateData.step === 2) {
    alert("Negative Zahl ist nicht zulässig.");
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

        if (this.state.step === 1){
          event.preventDefault();
    if (!this.checkInput(this.state)) return;
    this.nextStep();
        } else {
        event.preventDefault();
        if (!this.checkInput(this.state)) return;
        
        PostSignup.setSignUP(this.state)
          .then((response) => {
            if (response.data.res === "error") alert("Es ist ein Fehler aufgetreten.");
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

      console.log("readTerms clicked " + value);
    }
    if (name === "parentAccept") {
      value = target.checked;

      console.log("parentAccept clicked " + value);
    }

    if (name === "switchId") {
      value = target.checked;

      const arr = this.state.disallowedStudies;
      arr[id] = value;

      this.setState({
        disallowedStudies: arr
      });

      console.log("switch " + id + " clicked " + value);

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
      parentAccept,
      switchId,
      isToggleOn,
      studiesList,
      weight,
      height,
      armSpan,
      heightSpanStand,
      heightSpanSit,
      heightKnee,
      heightSit,
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
      parentAccept,
      switchId,
      isToggleOn,
      studiesList,
      weight,
      height,
      armSpan,
      heightSpanStand,
      heightSpanSit,
      heightKnee,
      heightSit,
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
          <ApproveTests
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
