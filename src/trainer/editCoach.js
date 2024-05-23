/*
By Ahmed Al-Ghezi
 */


import React, {Component} from "react";
import HandelTrainer from "../DB/handelTrainer";



const testdata = {"res":"ok","athletes":[{"name":"Mark","title":"Technik/Individualtraining mit Ball","quality":"2","planned":"3","achieved":"2","comments":"","start_time":"17:52:00","end_time":"17:53:00","date":"2022-05-15T22:00:00.000Z","as_planned":true,"difference":"1"},{"name":"John","title":"Technik/Individualtraining mit Ball","quality":"5","planned":"5","achieved":"5","comments":"good","start_time":"17:58:00","end_time":"17:58:00","date":"2022-05-15T22:00:00.000Z","as_planned":true,"difference":"0"},{"name":"John","title":"Technik/Individualtraining mit Ball","quality":"3","planned":"2","achieved":"2","comments":"he is too tired","start_time":"17:46:00","end_time":"17:46:00","date":"2022-05-15T22:00:00.000Z","as_planned":false,"difference":"0"},{"name":"Mark","title":"Gruppentraining mit Ball","quality":"2","planned":"2","achieved":"3","comments":"came too late","start_time":"13:23:00","end_time":"10:21:00","date":"2022-05-17T22:00:00.000Z","as_planned":true,"difference":"-1"},{"name":"Mark","title":"Athletik-/Krafttraining ","quality":"5","planned":"2","achieved":"3","comments":"","start_time":"14:57:00","end_time":"16:58:00","date":"2022-05-24T22:00:00.000Z","as_planned":true,"difference":"-1"},{"name":"Mark","title":"Athletik-/Krafttraining ","quality":"5","planned":"6","achieved":"4","comments":"","start_time":"12:13:00","end_time":"14:10:00","date":"2022-05-31T22:00:00.000Z","as_planned":true,"difference":"2"},{"name":"John","title":"Athletik-/Krafttraining ","quality":"3","planned":"3","achieved":"3","comments":"he is too tired","start_time":"12:13:00","end_time":"14:10:00","date":"2022-05-31T22:00:00.000Z","as_planned":false,"difference":"0"},{"name":"John","title":"Gruppentraining mit Ball","quality":"3","planned":"5","achieved":"2","comments":"tired","start_time":"13:00:00","end_time":"14:00:00","date":"2022-06-01T22:00:00.000Z","as_planned":false,"difference":"3"},{"name":"Mark","title":"Gruppentraining mit Ball","quality":"5","planned":"4","achieved":"4","comments":"","start_time":"13:00:00","end_time":"14:00:00","date":"2022-06-01T22:00:00.000Z","as_planned":true,"difference":"0"},{"name":"Mark","title":"Athletik-/Krafttraining ","quality":"5","planned":"4","achieved":"4","comments":"jk","start_time":"14:30:00","end_time":"18:30:00","date":"2022-06-01T22:00:00.000Z","as_planned":true,"difference":"0"},{"name":"John","title":"Gruppentraining mit Ball","quality":"3","planned":"5","achieved":"3","comments":"","start_time":"14:30:00","end_time":"18:30:00","date":"2022-06-01T22:00:00.000Z","as_planned":false,"difference":"2"},{"name":"Mark","title":"Athletik-/Krafttraining ","quality":"3","planned":"4","achieved":"5","comments":"","start_time":"03:20:00","end_time":"03:15:00","date":"2022-06-02T22:00:00.000Z","as_planned":false,"difference":"-1"},{"name":"John","title":"Athletik-/Krafttraining ","quality":"4","planned":"4","achieved":"3","comments":"","start_time":"12:41:00","end_time":"13:41:00","date":"2022-06-12T22:00:00.000Z","as_planned":true,"difference":"1"},{"name":"John","title":"Technik/Individualtraining mit Ball","quality":"5","planned":"5","achieved":"5","comments":"","start_time":"11:26:00","end_time":"00:28:00","date":"2022-06-25T22:00:00.000Z","as_planned":true,"difference":"0"},{"name":"John","title":"Technik/Individualtraining mit Ball","quality":"2","planned":"3","achieved":"4","comments":"","start_time":"06:30:00","end_time":"02:30:00","date":"2022-06-28T22:00:00.000Z","as_planned":true,"difference":"-1"},{"name":"John","title":"Gruppentraining mit Ball","quality":"5","planned":"3","achieved":"5","comments":"","start_time":"05:10:00","end_time":"05:50:00","date":"2022-07-03T22:00:00.000Z","as_planned":true,"difference":"-2"},{"name":"John","title":"Technik/Individualtraining mit Ball","quality":"1","planned":"2","achieved":"1","comments":"","start_time":"17:26:00","end_time":"17:27:00","date":"2022-07-04T22:00:00.000Z","as_planned":false,"difference":"1"},{"name":"John","title":"Technik/Individualtraining mit Ball","quality":"1","planned":"2","achieved":"3","comments":"éœ“è™¹","start_time":"17:26:00","end_time":"17:27:00","date":"2022-07-04T22:00:00.000Z","as_planned":true,"difference":"-1"},{"name":"John","title":"Technik/Individualtraining mit Ball","quality":"1","planned":"1","achieved":"1","comments":"11","start_time":"17:26:00","end_time":"17:27:00","date":"2022-07-04T22:00:00.000Z","as_planned":true,"difference":"0"},{"name":"John","title":"Technik/Individualtraining mit Ball","quality":"5","planned":"5","achieved":"3","comments":"","start_time":"20:44:00","end_time":"22:42:00","date":"2022-07-06T22:00:00.000Z","as_planned":false,"difference":"2"},{"name":"Mark","title":"Technik/Individualtraining mit Ball","quality":"2","planned":"2","achieved":"2","comments":"111","start_time":"18:29:00","end_time":"19:29:00","date":"2022-07-07T22:00:00.000Z","as_planned":true,"difference":"0"},{"name":"John","title":"Gruppentraining mit Ball","quality":"5","planned":"4","achieved":"4","comments":"all good","start_time":"13:30:00","end_time":"14:30:00","date":"2022-07-31T22:00:00.000Z","as_planned":true,"difference":"0"},{"name":"John","title":"Gruppentraining mit Ball","quality":"5","planned":"4","achieved":"4","comments":"asd","start_time":"13:30:00","end_time":"14:30:00","date":"2022-07-31T22:00:00.000Z","as_planned":true,"difference":"0"},{"name":"John","title":"Technik/Individualtraining mit Ball","quality":"4","planned":"4","achieved":"4","comments":"ok","start_time":"13:30:00","end_time":"14:30:00","date":"2022-08-01T22:00:00.000Z","as_planned":true,"difference":"0"},{"name":"John","title":"Techniktraining mit Ball","quality":"4","planned":"5","achieved":"4","comments":"","start_time":"14:07:00","end_time":"15:07:00","date":"2022-08-31T22:00:00.000Z","as_planned":true,"difference":"1"},{"name":"Mark","title":"Techniktraining mit Ball","quality":"3","planned":"3","achieved":"6","comments":"","start_time":"14:07:00","end_time":"15:07:00","date":"2022-08-31T22:00:00.000Z","as_planned":true,"difference":"-3"},{"name":"John","title":"Techniktraining mit Ball","quality":"3","planned":"4","achieved":"5","comments":"","start_time":"13:15:00","end_time":"15:17:00","date":"2022-08-31T22:00:00.000Z","as_planned":true,"difference":"-1"},{"name":"Mark","title":"Athletik-/Krafttraining ","quality":"2","planned":"2","achieved":"4","comments":"","start_time":"19:22:00","end_time":"23:59:00","date":"2022-08-31T22:00:00.000Z","as_planned":true,"difference":"-2"},{"name":"John","title":"Athletik-/Krafttraining ","quality":"3","planned":"3","achieved":"3","comments":"","start_time":"20:35:00","end_time":"19:36:00","date":"2022-08-31T22:00:00.000Z","as_planned":true,"difference":"0"},{"name":"John","title":"Athletik-/Krafttraining ","quality":"2","planned":"3","achieved":"3","comments":"","start_time":"17:43:00","end_time":"17:44:00","date":"2022-08-31T22:00:00.000Z","as_planned":true,"difference":"0"},{"name":"Mark","title":"Gruppentraining mit Ball","quality":"3","planned":"4","achieved":"5","comments":"","start_time":"14:40:00","end_time":"14:40:00","date":"2022-10-17T22:00:00.000Z","as_planned":true,"difference":"-1"},{"name":"John","title":"Techniktraining mit Ball","quality":"4","planned":"5","achieved":"5","comments":"","start_time":"00:00:00","end_time":"00:00:00","date":"2022-12-21T23:00:00.000Z","as_planned":true,"difference":"0"}]}

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
        this.downloadCoach = this.downloadCoach.bind(this);
        this.makeCompetence = this.makeCompetence.bind(this);
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


    makeCompetence(event){
        event.preventDefault();
        HandelTrainer.makeCompetence({email: this.state.email}).then(response => {
            if (response.data.res === "error") {
                alert("Es ist ein Fehler aufgetreten!");
                return;
            }
            if (response.data.res === "ok") {
                alert("Operation is successful!");
                this.setState({email: ''});
                //this.getTrainers();
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
                <button onClick={this.makeCoach} className="btn btn-secondary btn-block" disabled={false}>erstelle
                    Trainer*in
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={this.makeCompetence} className="btn btn-secondary btn-block" disabled={false}>Make competence
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
