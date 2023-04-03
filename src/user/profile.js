/*
Vanessa Meyer
Ahmed Al-Ghezi
*/

import React, { Component } from "react";
import "./profile.css";
import PostCSVData from "../DB/postCSV";
import LinkList from "../user/LinkList";

//Profile Template

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filesList: [],
      surveyList: [],
      emptyMsg: "",
      showEmptyMsg: false,
      hideSurvey: false,
      admin:false,
      role:"",
      isTrainer:false,
      links: [],
      hideAllMsgs:true,
      isCompetence:false,
    };
  }

  componentDidMount() {
    this.getFiles();
    this.getSurveys();
  }

  getFiles = () => {
    PostCSVData.getMyFiles()
        .then((response) => {
          if (response.data.res === "error") {
            alert("Es ist ein Fehler aufgetreten. Code pro 30");
            return;
          } else if (
              response.data.filesP &&
              response.data.res === "ok"
          ) {
            //this.setState({ filesList: response.data.files });
            this.setState({ links: response.data.filesP });
            if(response.data.admin){
              this.setState({admin:true});
            }
            this.setState({role:response.data.role});
            this.setState({isTrainer:response.data.role === "trainer"})
            this.setState({isCompetence:response.data.role === "competence"})
          }
          if (response.data.empty) {
            this.setState({ showEmptyMsg: true });
          }
          if(response.data.hideAllMsgs){
            this.setState({ hideAllMsgs: true });
          }else
            this.setState({ hideAllMsgs: false });
          if (response.data.res === "no") {
            window.location.href =
                window.location.origin + "/reg/sign-in?org=$user$profile";
            return;
            //xxx alert("Bitte melde Dich an.");
          }
        })
        .catch((e) => {
          console.log(e);
          alert("Es ist ein Fehler aufgetreten. Code Pro39");
        });
  };
  getSurveys = () => {
    PostCSVData.getMySurveys()
        .then((response) => {
          if (response.data.res === "error") {
            const arr = ["connection error"];
            this.setState({ surveyList: arr });
            return;
          } else {
            if (response.data.res === "hide") {
              this.setState({ hideSurvey: true });
            } else this.setState({ surveyList: response.data.files }); //todo
          }
        })
        .catch((e) => {
          console.log(e);
          alert("Es ist ein Fehler aufgetreten. Code Pro55");
        });
  };

  handleFileClick = (event) => {
    event.preventDefault();
    if (event.target.name.startsWith("deletevftr5")) {
      this.deleteFile(event.target.name.replace("deletevftr5", ""));
      return;
    }
    window.location.href =
        "https://inprove-sport.info/" + "files/viewMyFiles/" + event.target.name;
  };

  deleteFile = (fileName) => {
    PostCSVData.deleteFile({ fileName: fileName })
        .then((response) => {
          if (response.data.res === "error") {
            alert("Es ist ein Fehler aufgetreten. Code pro 79");
            return;
          } else if (response.data.res === "ok") {
            alert("Datei gelöscht");
            this.getFiles();
          }
          if (response.data.res === "no") {
            alert("Bitte melde Dich an.");
          }
        })
        .catch((e) => {
          console.log(e);
          alert("Es ist ein Fehler aufgetreten. Code Pro93");
        });
  }

  showEmptyMessage() {
    const msg =
        "Hallo,</br>" +
        "<p>willkommen im Projektportal des in:prove Projektes.</p>" +
        "<p>Aktuell können wir Deine Ergebnisse noch nicht für den Abruf bereitstellen." +
        "Wir geben Dir Bescheid, sobald Du diese im Projektportal abrufen kannst.<p/>" +
        "<p>Mit sportlichen Grüßen</br>," +
        "Dein in:prove Team</p>";
  }

  render() {
    return (
        <div id="beside">
          <div className="profile-name" hidden={true}>
            <div>
              <h3> Max Mustermann </h3>
            </div>
          </div>

          <div>
            <h3>Willkommen bei in:prove!</h3>

            <div hidden={true} className="information-content">
              {" "}
              <h4>Information</h4>
              <button
                  onClick={this.handleClick}
                  className="btn btn-primary btn-block"
              >
                {" "}
                update profile
              </button>
            </div>
            <div hidden={this.state.hideAllMsgs}>
              <div hidden={!this.state.showEmptyMsg || this.state.isTrainer}>
              <p>Hallo,</p>
              <p>willkommen im Projektportal des in:prove Projektes.</p>
              <p>
                Aktuell können wir Deine Ergebnisse noch nicht für den Abruf
                bereitstellen. Wir geben Dir Bescheid, sobald Du diese im
                Projektportal abrufen kannst.
              </p>
              <p>
                Mit sportlichen Grüßen,<br></br> Dein in:prove Team
              </p>
            </div>
              <div hidden={this.state.showEmptyMsg || this.state.isTrainer || this.state.isCompetence}>
              <p>Hallo!</p>
              <p>
                Hier in der Projektdatenbank findest Du die Rückmeldungen Deiner
                durchgeführten Diagnostiken als auch alle weiteren relevanten
                Projektinformationen. Zu den Rückmeldungen laden wir Dir auch
                immer eine Verschwiegenheitserklärung hoch. Du darfst frei
                bestimmen, mit wem Du Deine Daten teilen möchtest. Dies kann für
                Dich von Vorteil sein, um so z.B. das Training oder die Ernährung
                besser auf Deine Bedürfnisse anpassen zu können. Wenn Du Deine
                Daten mit jemandem wie z. B. Deinen TrainerInnen,
                ErnährungsberaterInnen, o.ä. teilen möchtest, ist es wichtig, dass
                diese Person die Verschwiegenheitserklärung unterschreibt und uns
                zusendet. So können wir sicherstellen, dass Deine Daten geschützt
                sind.
              </p>
              <p>
                {" "}
                Solltest du Probleme oder Fragen bezüglich der Datenbank oder
                Deiner Daten haben, melde dich gerne jederzeit bei uns. Du
                erreichst uns unter fragen@inprove.info.
              </p>
              <p>
                Mit sportlichen Grüßen,<br></br> Dein in:prove Team
              </p>
            </div>
              <div hidden={!this.state.isTrainer}>
              <p>Hallo!</p>
              <p>
                Hier in der in:prove-Projektdatenbank findest Du die Rückmeldungen Deiner AthletInnen und alle weiteren relevanten Projekt-Informationen.
                Alle Deine AthletInnen erhalten Ihre individuellen Rückmeldungen ebenfalls über Ihr Profil in der Datenbank, sodass Du diese nicht weiterleiten musst.
                Bitte beachte, dass Du diese Daten nicht weiterleiten darfst. Deine AthletInnen haben jedoch die Möglichkeit, ihre Rückmeldungen nach Wunsch und Bedarf
                (z.B. an die HeimtrainerInnen) weiterzuleiten. Hierfür haben sie eine Verschwiegenheitserklärung erhalten.
                Jede Person, der die Einsicht durch die AthletInnen gewährt wird, muss diese Erklärung vorab unterzeichnen und an uns zurücksenden.
                So können wir sicherstellen, dass die Daten optimal geschützt sind.

              </p>
              <p>
                {" "}
                Solltest Du oder Deine SportlerInnen Fragen haben, könnt Ihr Euch jederzeit gerne bei uns melden. Ihr erreicht uns unter fragen@inprove.info.
              </p>
              <p>
                Mit sportlichen Grüßen,<br></br> Dein in:prove Team
              </p>
            </div>




              <div hidden={!this.state.isCompetence}>
                <p>Liebes Kompetenzteammitglied,</p>
                <p>
                  hier in der Datenbank findest Du alle relevanten Projektinformationen und die Protokolle der Kompetenzteamtreffen. Bitte beachte, dass Du diese Daten nicht weiterleiten darfst.<br></br>
                  Solltest Du Probleme oder Fragen bezüglich der Datenbank oder der Daten haben, melde Dich gerne jederzeit bei uns. Du erreichst uns unter fragen@inprove.info.
                </p>

                <p>
                  Mit sportlichen Grüßen,<br></br> Dein in:prove Team
                </p>
              </div>




            </div>


            <hr></hr>

            <div id="beside">
              <div className="list-one" hidden={this.state.hideSurvey}>
                <h4>Meine Umfragen</h4>

                <ul>
                  <ul>
                    {this.state.surveyList.map((item) => (
                        <li key={item.title}>
                          <a href={item.link}>{item.title}</a>
                        </li>
                    ))}
                  </ul>
                </ul>
              </div>
              <div className="list-two">
                <h4>Meine Dateien</h4>
                <LinkList links={this.state.links} admin={this.state.admin} onDeleteFile={this.deleteFile}/>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Profile;
