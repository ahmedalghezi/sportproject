/*
By Ahmed Al-Ghezi
 */

import React, {Component} from "react";
//import './trainerStyle.css';

import '../style.css';
import HandelTrainer from "../../DB/handelTrainer";

export default class Sheet extends Component {


    constructor(props) {
        super(props);
        this.state = {comments:"", added_succ:"",preEvArr:[], prevEventAs:null, prevEventP:null, prevEventA:null, prevEventQ: null, quality: -1, planned:-1,
            as_planned:'',achieved:-1, athletes: '', tests: '',tempTestsArr:[], tempAthletesArr:[], testsArr:[], athletesArr:[],
            collapseIcon:">>",expanded:true,evaluatedArr:[],start_time:'',end_time:'',date:new Date().toJSON().slice(0,10).replace(/-/g,'-')};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCollapseEvent = this.handleCollapseEvent.bind(this);
        this.nextTest = this.nextTest.bind(this);

    }


    componentDidMount() {
        this.getMyTests();
        this.getMyAthletes();
    }

    handleChange(event) {
        const target = event.target;
        let value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    checkInput(data) {
        if (data.quality === -1 || data.as_planned === '') {
            alert("Bitte alle Werte eingeben!")
            return false;
        }
        if(data.athletes === ''){
            alert("Error: Es muss ein Athlet ausgewählt sein!")
            return false;
        }

        if(data.tests === ''){
            alert("Error: Es muss ein Test ausgewählt sein!")
            return false;
        }

        if(data.start_time === "" || data.end_time === ""){
            alert("Error: Es wurde kein Zeitraum gewählt!")
            return false;
        }

        return true;
    }

    recordEvaluation(){
        const evId = this.state.athletes+""+this.state.tests;
        const mEvaluatedArr = this.state.evaluatedArr;
        mEvaluatedArr[evId] = true;
        this.setState({evaluatedArr:mEvaluatedArr})
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!this.checkInput(this.state))
            return;

        const data = {quality:this.state.quality , planned:this.state.planned, achieved:this.state.achieved,
            athlete_id:this.state.athletes, test_id:this.state.tests, comments:this.state.comments,
            start_time:this.state.start_time, end_time:this.state.end_time , as_planned:this.state.as_planned,
        date:this.state.date};
        HandelTrainer.postTestResults(data).then(response => {
            if (response.data.res === "error")
                alert("Es ist ein Fehler aufgetreten!");
            if (response.data.res === "wrong")
                alert("Benutzername oder Passwort nicht korrekt!");
            if (response.data.res === "no") {
                alert("Du bist nicht angemeldet, bitte melde dich an.");
                return
            }
            if (response.data.res === "ok") {
                this.recordEvaluation();
                this.nextTest();
            }



        }).catch(e => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten!");
        });
    }




    getMyTests() {
        HandelTrainer.getMyTests().then(response => {
            if (response.data.res === "error")
                alert("Es ist ein Fehler aufgetreten!");
            else if (response.data.res === "wrong")
                alert("Bitte erst anmelden.");
            else if (response.data.res === "empty"){
                this.setState({testsArr: []});
            }
            if (response.data.res === "ok") {
                this.setState({testsArr: response.data.tests});
                console.log(response.data.tests);
            }

        }).catch(e => {
            console.log(e);
            alert("Fehler beim Abrufen der Testliste vom Server.");
        });
    }



    getMyAthletes() {

        HandelTrainer.readHistory();


        HandelTrainer.getMyAthletes().then(response => {
            if (response.data.res === "error")
                alert("Es ist ein Fehler aufgetreten.");
            else if (response.data.res === "wrong")
                alert("Bitte erst anmelden.");
            else if (response.data.res === "empty"){
                this.setState({athletesArr: []});
            }
            if (response.data.res === "ok") {
                this.setState({athletesArr: response.data.athletes});
            }
        }).catch(e => {
            console.log(e);
            alert("Fehler beim Abrufen der Testliste vom Server.");
        });
    }




    nextTest() {
        this.setState({added_succ:"evaluation sent successfully"});
        setTimeout(function(){
            this.setState({added_succ:""});
        }.bind(this),2000);
        this.clearPrevEvents();
        this.setState({athletes:'',tests:'',duration:'',comments:''})
        this.expandMenus();
    }

    clearPrevEvents(){
        if (this.state.prevEventQ) {
            this.state.prevEventQ.target.classList.remove("btn-info");
            this.state.prevEventQ.target.classList.add("btn-outline-info");
        }
        if (this.state.prevEventA) {
            this.state.prevEventA.target.classList.remove("btn-info");
            this.state.prevEventA.target.classList.add("btn-outline-info");
        }
        if (this.state.prevEventAs) {
            this.state.prevEventAs.target.classList.remove("btn-info");
            this.state.prevEventAs.target.classList.add("btn-outline-info");
        }
        if (this.state.prevEventP) {
            this.state.prevEventP.target.classList.remove("btn-info");
            this.state.prevEventP.target.classList.add("btn-outline-info");
        }

        if (this.state.preEvArr['testList']) {
            this.state.preEvArr['testList'].target.classList.remove("active");
        }

        if (this.state.preEvArr['athList']) {
            this.state.preEvArr['athList'].target.classList.remove("active");
        }
    }

    handleQualityClick = (event) => {
        if (this.state.prevEventQ) {
            this.state.prevEventQ.target.classList.remove("btn-info");
            this.state.prevEventQ.target.classList.add("btn-outline-info");
        }
        this.setState({prevEventQ: event});
        event.target.classList.remove("btn-outline-info")
        event.target.classList.add("btn-info");

        this.setState({quality: event.target.name});
        event.preventDefault();
    }

    handlePlannedClick = (event) => {
        if (this.state.prevEventP) {
            this.state.prevEventP.target.classList.remove("btn-info");
            this.state.prevEventP.target.classList.add("btn-outline-info");
        }
        this.setState({prevEventP: event});
        event.target.classList.remove("btn-outline-info")
        event.target.classList.add("btn-info");

        this.setState({planned: event.target.name});
        event.preventDefault();
    }

    handleAchievedClick = (event) => {
        if (this.state.prevEventA) {
            this.state.prevEventA.target.classList.remove("btn-info");
            this.state.prevEventA.target.classList.add("btn-outline-info");
        }
        this.setState({prevEventA: event});
        event.target.classList.remove("btn-outline-info")
        event.target.classList.add("btn-info");

        this.setState({achieved: event.target.name});
        event.preventDefault();
    }


    handleAsPlanned = (event) => {
        if (this.state.prevEventAs) {
            this.state.prevEventAs.target.classList.remove("btn-info");
            this.state.prevEventAs.target.classList.add("btn-outline-info");
        }
        this.setState({prevEventAs: event});
        event.target.classList.remove("btn-outline-info")
        event.target.classList.add("btn-info");

        if(event.target.name === "yes")
            this.setState({as_planned: true});

        if(event.target.name === "no")
            this.setState({as_planned: false});

        event.preventDefault();
    }



    handleAthListClick = (event) => {
        event.preventDefault();
        if (this.state.preEvArr['athList']) {
            this.state.preEvArr['athList'].target.classList.remove("active");
        }
        event.target.classList.add("active");
        const arr = this.state.preEvArr;
        arr['athList'] = event;
        this.setState({preEvArr:arr});
        //this.state.preEvArr['athList'] = event;
        this.setState({athletes:event.target.name});

        if(this.state.tests)
            this.collapseMenus(event.target.name,this.state.tests);

    }



    handleTestListClick = (event) => {
        event.preventDefault();
        if (this.state.preEvArr['testList']) {
            this.state.preEvArr['testList'].target.classList.remove("active");
        }
        event.target.classList.add("active");
       // this.state.preEvArr['testList'] = event;

        const arr = this.state.preEvArr;
        arr['testList'] = event;
        this.setState({preEvArr:arr});

       // this.setState({tests:{"id":event.target.name, "title":event.target.text}});
        this.setState({tests:event.target.name});

        if(this.state.athletes)
            this.collapseMenus(this.state.athletes,event.target.name);
    }






    collapseMenus(selectedAthleteID,selectedTestID){
        if(this.state.athletesArr === '' || this.state.testsArr === '' )
            return;
        this.setState({tempTestsArr:this.state.testsArr});
        this.setState({tempAthletesArr:this.state.athletesArr});

        for(let i = 0 ; i < this.state.testsArr.length ; i++){
            if(this.state.testsArr[i].id === selectedTestID){
                this.setState({testsArr:[this.state.testsArr[i]]});
                break;
            }
        }
        for(let i = 0 ; i < this.state.athletesArr.length ; i++){
            if(this.state.athletesArr[i].ID+"" === selectedAthleteID+""){
                this.setState({athletesArr:[this.state.athletesArr[i]]});
                break;
            }
        }
        this.setState({expanded:false});
    }

    expandMenus(){
        if(this.state.tempTestsArr === '')
            return;
        this.setState({testsArr:this.state.tempTestsArr});
        this.setState({athletesArr:this.state.tempAthletesArr});

        this.setState({tempTestsArr:''});
        this.setState({tempAthletesArr:''});
        this.setState({expanded:true});
    }

    handleCollapseEvent(event){
        event.preventDefault();
        if(this.state.expanded)
            this.collapseMenus();
        else
            this.expandMenus();
        this.setState({expanded:!this.state.expanded})
    }


    render() {
        //some are adapted from <!-- Adapted from https://stackoverflow.com/a/16243163 -->
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Trainingseinschätzung</h3>
                <table>
                    <tr>
                        <td>
                <label>Startzeit</label>
                <div><input className="col-xs-4" type="time" id="start_time" name="start_time" min="1" max="200" onChange={this.handleChange} value={this.state.start_time}/></div>
                        </td>
                        <td width="20px">
                        </td>
                        <td>
                <label>Endzeit</label><br></br>
                <div><input className="col-xs-4" type="time" id="end_time" name="end_time" min="1" max="200" onChange={this.handleChange} value={this.state.end_time}/></div>
                            </td>

                        <td width="40px">
                        </td>
                        <td>
                            <label>Datum</label><br></br>
                            <div><input className="col-xs-4" type="date" id="date" name="date" min="1" max="200" onChange={this.handleChange} value={this.state.date}/></div>
                        </td>

                        </tr>
                </table>


                <div className="form-group">

                    <table>
                        <tbody>
                        <tr>
                            <td>
                            </td>
                            <td></td>
                            <td>
                            </td>
                        </tr>

                        <tr>
                            <td><button hidden={this.state.expanded}  onClick={this.handleCollapseEvent}>{this.state.collapseIcon}</button></td>
                            <td>
                                <div className="vertical-menu mid">
                                    <div><a href="#" className="active">Athlet*innen</a></div>
                                    {this.state.athletesArr.map((option) => (
                                        !this.state.evaluatedArr[option.ID+""+this.state.tests]
                                            ? (<a name={option.ID} key={option.ID}
                                                  onClick={this.handleAthListClick}>{option.firstname}</a>)
                                            : (<s><a name={option.ID} key={option.ID}
                                                  onClick={this.handleAthListClick}>{option.firstname}</a></s>)
                                    ))}
                                </div>
                            </td>





                            <td></td>
                            <td>
                                <div className="vertical-menu">
                                    <a href="#" className="active">Trainings</a>
                                    {this.state.testsArr.map((option) => (
                                        <a name={option.id} key={option.id}
                                           onClick={this.handleTestListClick}>{option.title}</a>
                                    ))}
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>


                <div className="form-group">
                    <label>Dauer und Inhalte wie geplant?</label><br></br>
                    <button name="yes" className="btn btn-outline-info paddingBtn" onClick={this.handleAsPlanned}>Ja</button>
                    <button name="no" className="btn btn-outline-info paddingBtn" onClick={this.handleAsPlanned}>Nein
                    </button>
                </div>
                <p></p>



                <div className="form-group">
                    <input type="text" className="form-control" name="comments" placeholder="Kommentare" value={this.state.comments} onChange={this.handleChange} />
                </div>
                <p></p>
                <div></div>






                <div className="form-group">
                    <label>Qualitätsskala</label><br></br>
                    <button name="1" className="btn btn-outline-info" onClick={this.handleQualityClick}>1</button>
                    <button name="2" className="btn btn-outline-info" onClick={this.handleQualityClick}>2</button>
                    <button name="3" className="btn btn-outline-info" onClick={this.handleQualityClick}>3</button>
                    <button name="4" className="btn btn-outline-info" onClick={this.handleQualityClick}>4</button>
                    <button name="5" className="btn btn-outline-info" onClick={this.handleQualityClick}>5</button>
                    <button name="6" className="btn btn-outline-info" onClick={this.handleQualityClick}>6</button>
                </div>

                <div className="form-group">
                    <label>Geplante Intensität</label><br></br>
                    <button name="1" className="btn btn-outline-info" onClick={this.handlePlannedClick}>1</button>
                    <button name="2" className="btn btn-outline-info" onClick={this.handlePlannedClick}>2</button>
                    <button name="3" className="btn btn-outline-info" onClick={this.handlePlannedClick}>3</button>
                    <button name="4" className="btn btn-outline-info" onClick={this.handlePlannedClick}>4</button>
                    <button name="5" className="btn btn-outline-info" onClick={this.handlePlannedClick}>5</button>
                    <button name="6" className="btn btn-outline-info" onClick={this.handlePlannedClick}>6</button>
                </div>

                <div className="form-group">
                    <label>Erreichte Intensität</label><br></br>
                    <button name="1" className="btn btn-outline-info" onClick={this.handleAchievedClick}>1</button>
                    <button name="2" className="btn btn-outline-info" onClick={this.handleAchievedClick}>2</button>
                    <button name="3" className="btn btn-outline-info" onClick={this.handleAchievedClick}>3</button>
                    <button name="4" className="btn btn-outline-info" onClick={this.handleAchievedClick}>4</button>
                    <button name="5" className="btn btn-outline-info" onClick={this.handleAchievedClick}>5</button>
                    <button name="6" className="btn btn-outline-info" onClick={this.handleAchievedClick}>6</button>
                </div>
                <p></p>


                <div>
                    <p className="blue">{this.state.added_succ}</p>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Weiter</button>


            </form>
        );
    }


}