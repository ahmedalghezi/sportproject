/*
By Ahmed Al-Ghezi
 */


import React, {Component} from "react";
import HandelTrainer from "../../DB/handelTrainer";
import PostSignup from "../../DB/postSignup";



const convertToCsv = (arr) => {
    let testsData = arr['athletes'];
    if(!testsData)
        return null;
    const keys = Object.keys(testsData[0]);
    const replacer = (_key, value) => value === null ? '' : value;
    const processRow = row => keys.map(key => JSON.stringify(row[key], replacer)).join(',');
    return [ keys.join(','), ...testsData.map(processRow) ].join('\r\n');
};

function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

export default class EditCoach extends Component {


    constructor(props) {
        super(props);
        this.state = {trainersList: [], selectedTrainer: '', email: '', preEvArr: [], selectedTrainerID: undefined};
        this.handleChange = this.handleChange.bind(this);
        this.handleTrainersListClick = this.handleTrainersListClick.bind(this);
        this.handleDisguisedLogin = this.handleDisguisedLogin.bind(this);
        this.getTrainers = this.getTrainers.bind(this);
        this.makeCoach = this.makeCoach.bind(this);
        this.makeCompetence = this.makeCompetence.bind(this);
        this.downloadCoach = this.downloadCoach.bind(this);
    }


    componentDidMount() {
        this.getTrainers();
    }


    getTrainers() {
        HandelTrainer.getAllTrainers().then(response => {
            if (response.data.res === "error") {
                const arr = ["connection error"];
                this.setState({trainersList: arr});
                return;
            }
            if (response.data.res === "error") {
                alert("Bitte erst anmelden.");
                return;
            }
            if (response.data.res === "ok") {
                this.setState({trainersList: response.data.trainersList});
            }

        }).catch(e => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten!");
        });
    }

    makeCoach(event) {
        event.preventDefault();
        HandelTrainer.makeCoach({email: this.state.email}).then(response => {
            if (response.data.res === "error") {
                alert("Es ist ein Fehler aufgetreten!");
                return;
            }
            if (response.data.res === "ok") {
                alert("Trainer korrekt erstellt!");
                this.setState({email: ''});
                this.getTrainers();
                return;
            }

        }).catch(e => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten!");
        });
    }

    makeCompetence(event) {
        event.preventDefault();
        HandelTrainer.makeCoach({email: this.state.email, competence: true}).then(response => {
            if (response.data.res === "error") {
                alert("Es ist ein Fehler aufgetreten!");
                return;
            }
            if (response.data.res === "ok") {
                alert("Kompetenz-teammitglied korrekt erstellt!");
                this.setState({email: ''});
                this.getTrainers();
                return;
            }

        }).catch(e => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten!");
        });
    }

    handleTrainersListClick(event) {
        event.preventDefault();

        if (this.state.preEvArr['trainerList']) {
            this.state.preEvArr['trainerList'].target.classList.remove("active");
        }
        event.target.classList.add("active");
        // this.state.preEvArr['testList'] = event;

        const arr = this.state.preEvArr;
        arr['trainerList'] = event;
        this.setState({preEvArr: arr});

        this.setState({selectedTrainer: event.target.name});
        var obj = this.state.trainersList.filter((element) => {
            return element.email === event.target.name
        });
        this.setState({selectedTrainerID: obj[0].ID});
    }

    handleDisguisedLogin(event) {
        event.preventDefault();
        if (this.state.selectedTrainer === '') {
            alert("Bitte Trainer*in auswählen.");
            return;
        }
        HandelTrainer.disguisedTrainerLogin({email: this.state.selectedTrainer}).then(response => {
            if (response.data.res === "ok") {
                //this.props.navigate('/trainer/addAthletes');
                window.location.href = window.location.origin + "/trainer/addAthletes";
            } else {
                alert("Es ist ein Fehler aufgetreten!");
            }
        }).catch(e => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten!");
        });
    }

    downloadCoach(event) {
        event.preventDefault();
       // var csv = convertToCsv(testdata);
       // download(csv, "history.csv", "text/csv");
        if (this.state.selectedTrainer === '') {
            alert("Bitte Trainer*in auswählen.");
            return;
        }
        HandelTrainer.readHistoryAdmin({trainerID: this.state.selectedTrainerID}).then(response => {
            if (response.data.res === "ok") {
                //this.downloadCSVFromJson('history.csv', response.data)
                var csv = convertToCsv(response.data);
                if(csv)
                    download(csv, "history_trainer_"+this.state.selectedTrainerID+".csv", "text/csv");
                else
                    alert("empty dataset");
            } else {
                alert("Es ist ein Fehler aufgetreten!");
            }
        }).catch(e => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten!");
        });
    }



    handleChange(event) {
        const target = event.target;
        let value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    editGroups = (event) =>  {
        event.preventDefault();
        window.location.href = window.location.origin + "/trainer/createGroup";
    }

    render() {
        return (
            <form onSubmit={this.handleDisguisedLogin}>
                <h3>Trainer*in erstellen & bearbeiten</h3>

                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Email eingeben " name="email"
                           onChange={this.handleChange}/>
                </div>
                <button style= {{...{display: 'inline'},...{width: "150px"}}} onClick={this.makeCoach} className="btn btn-secondary btn-block" disabled={false}>erstelle
                    Trainer*in
                </button>
                <button style= {{...{display: 'inline'},...{width: "150px"},...{marginLeft: "20px"}}} onClick={this.makeCompetence} className="btn btn-secondary btn-block" disabled={false}>erstelle
                Kompetenz-teammitglied
                </button>

                <br></br><br></br>

                <table>
                    <tr>
                        <td>
                            <div className="vertical-menu">
                                <a href="src/trainer#" className="active">Trainer*innen</a>
                                {this.state.trainersList.map((option) => (
                                    <a name={option.email} key={option.email}
                                       onClick={this.handleTrainersListClick}>{option.name}</a>
                                ))}
                            </div>
                        </td>

                        <td>
                            &nbsp;&nbsp;&nbsp;&nbsp;<button className={"btn btn-primary btn-block"} onClick={this.editGroups}> Edit Groups</button>
                            &nbsp;&nbsp;&nbsp;&nbsp;<button className={"btn btn-primary btn-block"} onClick={this.downloadCoach}> Download Coachdata</button>
                        </td>
                  </tr>
                </table>


                <button type="submit" className="btn btn-primary btn-block">als Trainer*in anmelden</button>
            </form>
        );
    }



}
