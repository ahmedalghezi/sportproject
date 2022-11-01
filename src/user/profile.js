/*
Vanessa Meyer 
Ahmed Al-Ghezi
*/

import React, {Component} from "react";
import "./profile.css";
import PostCSVData from "../DB/postCSV";


//Profile Template

class TestProfileC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filesList: [],
            surveyList: [],
            emptyMsg: "",
            showEmptyMsg: false
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
                } else if (response.data.files && response.data.res === "ok") {
                    this.setState({filesList: response.data.files});
                }
                if (response.data.empty) {
                    this.setState({showEmptyMsg: true})
                }
                if (response.data.res === "no") {
                    alert("Bitte melde Dich an.");
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
                    this.setState({surveyList: arr});
                    return;
                } else {
                    this.setState({surveyList: response.data.files}); //todo
                }
            })
            .catch((e) => {
                console.log(e);
                alert("Es ist ein Fehler aufgetreten. Code Pro55");
            });
    };

    handleFileClick = (event) => {
        event.preventDefault();
        if(event.target.name.startsWith("deletevftr5")){
            this.deleteFile(event.target.name.replace("deletevftr5",""));
            return;
        }
        window.location.href = "https://inprove-sport.info/" + "files/viewMyFiles/" + event.target.name;
    };

    deleteFile(fileName) {
        PostCSVData.deleteFile({"fileName":fileName}).then((response) => {
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
        const msg = "Hallo,</br>" +
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
                        <button onClick={this.handleClick} className="btn btn-primary btn-block">
                            {" "}
                            update profile
                        </button>
                    </div>
                    <div hidden={!this.state.showEmptyMsg}>
                        <p>Hallo,</p><p>willkommen im Projektportal des in:prove Projektes.</p><p>Aktuell können wir
                        Deine Ergebnisse noch nicht für den Abruf bereitstellen.
                        Wir geben Dir Bescheid, sobald Du diese im Projektportal abrufen kannst.</p>
                        <p>Mit sportlichen Grüßen,<br></br> Dein in:prove Team</p>
                    </div>
                    <hr></hr>


                        <div id="beside">
                            <div className="list-one">

                                <h4>Meine Umfragen</h4>

                                <ul>
                                    <ul>
                                        {this.state.surveyList.map((item) => (
                                            <li key={item.title}>
                                                <a href={item.link}>{item.title}</a></li>
                                        ))}
                                    </ul>
                                </ul>
                            </div>
                            <div className="list-two">
                                <h4>Meine Dateien</h4>
                                <ul>
                                    {this.state.filesList.map((item) => (
                                        <li key={item.file_name} onClick={this.handleFileClick}>
                                            <a hidden={!item.admin} name={"deletevftr5"+item.file_name} href={"#" + item.file_name}>(delete)</a>
                                            <a name={item.file_name} href={"#" + item.file_name}>{item.title}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                </div>
            </div>
        );
    }

}

export default TestProfileC;

