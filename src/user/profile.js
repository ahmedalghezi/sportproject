/*
Vanessa Meyer
Ahmed Al-Ghezi
Chaithra KB
*/

import React, { Component } from "react";
import "./profile.css";
import PostCSVData from "../DB/postCSV";
import LinkList from "../user/LinkList";

//Profile Template

class ProfileC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filesList: [],
      surveyList: [],
      emptyMsg: "",
      showEmptyMsg: false,
      hideSurvey: false,
      admin: false,
      role: "",
      isTrainer: false,
      links: [],
      hideAllMsgs: true,
      searchQuery: "",
      searchQueryMeineDateien: "",
      searchQueryUploads: "",
      unopenedFiles: [],
      totalUnopenedFilesCount: 0,
      visibleFilesCount: 5,
    };
  }

  componentDidMount() {
    this.getFiles();
    this.getMyOwnFiles();
    this.getSurveys();
  }

  // handleSearchInputChange = (event) => {
  //   const searchQuery = event.target.value.toLowerCase(); // Convert search query to lowercase for case-insensitive matching
  //   this.setState({ searchQuery });
  // };

  // handleSearchInputChangeMeineDateien = (event) => {
  //   const searchQueryMeineDateien = event.target.value.toLowerCase();
  //   this.setState({ searchQueryMeineDateien });
  // };

  // handleSearchInputChangeUploads = (event) => {
  //   const searchQueryUploads = event.target.value.toLowerCase();
  //   this.setState({ searchQueryUploads });
  // };

  // filteredFiles = () => {
  //   const { searchQuery } = this.state;

  //   // Filter files based on search query
  //   const filteredFiles = [];

  //   // Filter files from "Meine Dateien"
  //   this.state.links.forEach(folder => {
  //     Object.values(folder).forEach(files => {
  //       files.forEach(file => {
  //         if (file.name.toLowerCase().includes(searchQuery)) {
  //           filteredFiles.push(file);
  //         }
  //       });
  //     });
  //   });

  //   // Filter files from "Uploads"
  //   this.state.filesList.forEach(folder => {
  //     Object.values(folder).forEach(files => {
  //       files.forEach(file => {
  //         if (file.name.toLowerCase().includes(searchQuery)) {
  //           filteredFiles.push(file);
  //         }
  //       });
  //     });
  //   });

  //   return filteredFiles;
  // };

//   filteredFiles = (searchQueryMeineDateien, searchQueryUploads) => {
//     const filteredFiles = [];

//     // Filter files from "Meine Dateien" if searchQueryMeineDateien is present
//   if (searchQueryMeineDateien) {
//     this.state.links.forEach(folder => {
//       Object.values(folder).forEach(files => {
//         files.forEach(file => {
//           if (file.name.toLowerCase().includes(searchQueryMeineDateien)) {
//             filteredFiles.push(file);
//           }
//         });
//       });
//     });
//     return filteredFiles; // Return filtered files for "Meine Dateien"
//   }

//   // Filter files from "Uploads" if searchQueryUploads is present
//   if (searchQueryUploads) {
//     this.state.filesList.forEach(folder => {
//       Object.values(folder).forEach(files => {
//         files.forEach(file => {
//           if (file.name.toLowerCase().includes(searchQueryUploads)) {
//             filteredFiles.push(file);
//           }
//         });
//       });
//     });
//     return filteredFiles; // Return filtered files for "Uploads"
//   }

//   return filteredFiles; // Return empty array if neither search query is present
// };



//   clearSearch = () => {
//     this.setState({ searchQueryMeineDateien: "" });
//     this.setState({ searchQueryUploads: "" });
//   };

handleSearchInputChange = (event) => {
  const searchQuery = event.target.value.toLowerCase();
  this.setState({ searchQuery });
};

 loadMoreFiles = () => {
    this.setState((prevState) => ({
      visibleFilesCount: prevState.visibleFilesCount + 5, // Load 5 more files each time
    }));
  };

filteredFiles = () => {
  const { searchQuery } = this.state;
  const filteredFiles = [];

  // Filter files from both "Meine Dateien" and "Uploads"
  if (searchQuery)
  {
  [this.state.links, this.state.filesList].forEach((fileLists) => {
    fileLists.forEach((folder) => {
      Object.values(folder).forEach((files) => {
        files.forEach((file) => {
          if (file.name.toLowerCase().includes(searchQuery)) {
            filteredFiles.push(file);
          }
        });
      });
    });
  });

  return filteredFiles;
}
  return filteredFiles;

};

clearSearch = () => {
  this.setState({ searchQuery: "" });
};

  getFiles = () => {
    PostCSVData.getMyFiles()
        .then((response) => {
            /* console.log("getFiles response:", response);*/
          if (response.data.res === "error") {
            alert("Es ist ein Fehler aufgetreten. Code pro 30");
            return;
          } else if (response.data.files && response.data.filesP && response.data.res === "ok") {
            const unopenedFiles = this.filterUnopenedFiles(response.data.files);
            this.setState({ links: response.data.filesP });
           /* console.log("links : ", response.data.filesP)*/
            this.setState({ unopenedFiles });
            this.setState({ totalUnopenedFilesCount: response.data.files.length });
             /*console.log("unopenedFiles in getFiles : ", unopenedFiles)*/
            if (response.data.admin) {
              this.setState({ admin: true });
            }
            this.setState({ role: response.data.role });
            this.setState({ isTrainer: response.data.role === "trainer" });
          }
          if (response.data.empty) {
            this.setState({ showEmptyMsg: true });
          }
          if (response.data.hideAllMsgs) {
            this.setState({ hideAllMsgs: true });
          } else this.setState({ hideAllMsgs: false });
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

filterUnopenedFiles = (files) => {
  return files.filter(file => file.time_seen === null); // Return all unopened files
};


  // added by Vanessa
  getMyOwnFiles = () => {
    PostCSVData.getMyOwnFiles()
        .then((response) => {
        console.log("getMyOwnFiles response:", response);
          if (response.data.res === "error") {
            alert("Es ist ein Fehler aufgetreten. Code pro 30");
            return;
          } else if (response.data.files && response.data.filesP && response.data.res === "ok") {
            //this.setState({ filesList: response.data.files });
            //const unopenedFiles = this.filterUnopenedFiles(response.data.files);
            this.setState({ filesList: response.data.filesP });
            //this.setState({ unopenedFiles });
            //this.setState({ totalUnopenedFilesCount: response.data.files.length });
           // console.log("unopenedFiles in getmyOwnFiles : ", unopenedFiles)
            console.log("filesList : ", response.data.filesP )
            if (response.data.admin) {
              this.setState({ admin: true });
            }
            this.setState({ role: response.data.role });
            this.setState({ isTrainer: response.data.role === "trainer" });
          }
          if (response.data.empty) {
            this.setState({ showEmptyMsg: true });
          }
          if (response.data.hideAllMsgs) {
            this.setState({ hideAllMsgs: true });
          } else this.setState({ hideAllMsgs: false });
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
            console.log("surveyList : ", arr)
            return;
          } else {
            if (response.data.res === "hide") {
              this.setState({ hideSurvey: true });
              console.log("hideSurvey : ", true)
            } else this.setState({ surveyList: response.data.files });
            console.log("surveyList : ", response.data.files)
            //todo
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
  window.location.href = "https://inprove-sport.info/" + "files/viewMyFiles/" + event.target.name;
  this.getFiles(); // Refresh unopened files
};


  // added by Vanessa
  handleMyFileClick = (event) => {
    event.preventDefault();
    if (event.target.name.startsWith("deletevftr5")) {
      this.deleteMyFile(event.target.name.replace("deletevftr5", ""));
      return;
    }
    window.location.href =
        "https://inprove-sport.info/" + "files/viewMyOwnFiles/" + event.target.name;

    this.getMyOwnFiles();
  };

  // added by Vanessa
  deleteMyFile = (fileName) => {
    PostCSVData.deleteMyFile({ fileName: fileName })
        .then((response) => {
          if (response.data.res === "error") {
            alert("Es ist ein Fehler aufgetreten. Code pro 79");
            return;
          } else if (response.data.res === "ok") {
            alert("Datei gelöscht");
            this.getMyOwnFiles();
          }
          if (response.data.res === "no") {
            alert("Bitte melde Dich an.");
          }
        })
        .catch((e) => {
          console.log(e);
          alert("Es ist ein Fehler aufgetreten. Code Pro93");
        });
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
  };

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
  const { searchQuery, unopenedFiles, links, filesList } = this.state;
  const filteredFiles = this.filteredFiles();
  const showClearButton = searchQuery !== "";

  // Determine how many unopened files to display
  const visibleFilesCount = this.state.visibleFilesCount || 5; // Default to showing 5 files initially
  const visibleFiles = unopenedFiles.slice(0, visibleFilesCount);
  const hasMoreFiles = unopenedFiles.length > visibleFilesCount;

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
          <h4>Information</h4>
          <button
            onClick={this.handleClick}
            className="btn btn-primary btn-block"
          >
            Update Profile
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
              Mit sportlichen Grüßen,<br /> Dein in:prove Team
            </p>
          </div>
          <div hidden={this.state.showEmptyMsg || this.state.isTrainer}>
            <p>Hallo!</p>
            <p>
              Hier in der Projektdatenbank findest Du die Rückmeldungen Deiner
              durchgeführten Diagnostiken als auch alle weiteren relevanten
              Projektinformationen. Zu den Rückmeldungen laden wir Dir auch
              immer eine Verschwiegenheitserklärung hoch. Du darfst frei
              bestimmen, mit wem Du Deine Daten teilen möchtest. Dies kann für
              Dich von Vorteil sein, um so z.B. das Training oder die
              Ernährung besser auf Deine Bedürfnisse anpassen zu können. Wenn
              Du Deine Daten mit jemandem wie z. B. Deinen TrainerInnen,
              ErnährungsberaterInnen, o.ä. teilen möchtest, ist es wichtig,
              dass diese Person die Verschwiegenheitserklärung unterschreibt
              und uns zusendet. So können wir sicherstellen, dass Deine Daten
              geschützt sind.
            </p>
            <p>
              Solltest du Probleme oder Fragen bezüglich der Datenbank oder
              Deiner Daten haben, melde dich gerne jederzeit bei uns. Du
              erreichst uns unter fragen@inprove.info.
            </p>
            <p>
              Mit sportlichen Grüßen,<br /> Dein in:prove Team
            </p>
          </div>
          <div hidden={!this.state.isTrainer}>
            <p>Hallo!</p>
            <p>
              Hier in der in:prove-Projektdatenbank findest Du die
              Rückmeldungen Deiner AthletInnen und alle weiteren relevanten
              Projekt-Informationen. Alle Deine AthletInnen erhalten Ihre
              individuellen Rückmeldungen ebenfalls über Ihr Profil in der
              Datenbank, sodass Du diese nicht weiterleiten musst. Bitte
              beachte, dass Du diese Daten nicht weiterleiten darfst. Deine
              AthletInnen haben jedoch die Möglichkeit, ihre Rückmeldungen
              nach Wunsch und Bedarf (z.B. an die HeimtrainerInnen)
              weiterzuleiten. Hierfür haben sie eine
              Verschwiegenheitserklärung erhalten. Jede Person, der die
              Einsicht durch die AthletInnen gewährt wird, muss diese
              Erklärung vorab unterzeichnen und an uns zurücksenden. So können
              wir sicherstellen, dass die Daten optimal geschützt sind.
            </p>
            <p>
              Solltest Du oder Deine SportlerInnen Fragen haben, könnt Ihr
              Euch jederzeit gerne bei uns melden. Ihr erreicht uns unter
              fragen@inprove.info.
            </p>
            <p>
              Mit sportlichen Grüßen,<br /> Dein in:prove Team
            </p>
          </div>
        </div>

        <hr />

        <div>
          <input
            type="text"
            placeholder="Dateien suchen..."
            value={searchQuery}
            onChange={this.handleSearchInputChange}
          />
          {showClearButton && <button onClick={this.clearSearch}>X</button>}

          <ul>
            {filteredFiles.map((file, index) => (
              <li key={index}>
                <a
                  href={file.url}
                  name={file.name}
                  onClick={this.handleFileClick}
                  title={file.name}
                >
                  {file.name.split('_')[1]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="profile-content">
          <div className="profile-section list-one">
            <h4>Meine Dateien</h4>
            <LinkList
              links={links}
              admin={this.state.admin}
              onDeleteFile={this.deleteFile}
            />
          </div>
          <div className="profile-section list-two">
            <h4>Uploads</h4>
            <LinkList
              links={filesList}
              admin={this.state.admin}
              onDeleteFile={this.deleteMyFile}
            />
          </div>

          {/* Updated Unopened Files Section */}
          {visibleFiles.length > 0 && (
            <div
              className="profile-section list-three unopened-files-section"
            >
              <h4>Unopened Files</h4>
              <ul>
                {visibleFiles.map((file, index) => (
                  <li key={index} style={{ marginBottom: '10px' }}>
                    <a
                      href={file.url}
                      name={file.file_name}
                      onClick={this.handleFileClick}
                      title={file.file_name}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {file.file_name.includes('_')
                        ? file.file_name.split('_')[1]
                        : file.file_name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

}

export default ProfileC;
