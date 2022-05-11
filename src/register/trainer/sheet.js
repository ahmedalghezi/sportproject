/*
By Ahmed Al-Gehzi
 */

import React, {Component} from "react";
//import './trainerStyle.css';

import '../style.css';
import HandelTrainer from "../../DB/handelTrainer";

export default class Sheet extends Component {


    constructor(props) {
        super(props);
        this.state = {comments:"", added_succ:"",preEvArr:[], prevEventAs:null, prevEventP:null, prevEventA:null, prevEventQ: null, quality: -1, planned:-1,
            as_planned:'',achieved:-1, athletes: '', tests: '', testsArr:[], athletesArr:[],duration:''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            alert("Please fill all the values!")
            return false;
        }
        if(data.athletes === ''){
            alert("Error: one athlete must be chosen!")
            return false;
        }

        if(data.tests === ''){
            alert("Error: one test must be chosen!")
            return false;
        }

        return true;
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!this.checkInput(this.state))
            return;

        const data = {quality:this.state.quality , planned:this.state.planned, achieved:this.state.achieved,
            athlete_id:this.state.athletes, test_id:this.state.tests }
        HandelTrainer.postTestResults(data).then(response => {
            if (response.data.res === "error")
                alert("some error has happened");
            else if (response.data.res === "wrong")
                alert("user name or password are not correct");
            if (response.data.res === "ok")
                this.nextTest();
        }).catch(e => {
            console.log(e);
            alert("some error has happened");
        });
    }




    getMyTests() {
        HandelTrainer.getMyTests().then(response => {
            if (response.data.res === "error")
                alert("some error has happened");
            else if (response.data.res === "wrong")
                alert("Please login please");
            else if (response.data.res === "empty"){
                this.setState({testsArr: []});
            }
            if (response.data.res === "ok") {
                const arr = [];
                /*for (let elem of response.data.tests){
                    arr.push(elem.title);
                }*/
                this.setState({testsArr: response.data.tests});
                console.log(response.data.tests);
            }

        }).catch(e => {
            console.log(e);
            alert("Error getting tests list form server.");
        });
    }



    getMyAthletes() {
        HandelTrainer.getMyAthletes().then(response => {
            if (response.data.res === "error")
                alert("some error has happened");
            else if (response.data.res === "wrong")
                alert("Please login please");
            else if (response.data.res === "empty"){
                this.setState({athletesArr: []});
            }
            if (response.data.res === "ok") {
                this.setState({athletesArr: response.data.athletes});
            }
        }).catch(e => {
            console.log(e);
            alert("Error getting tests list form server.");
        });
    }




    nextTest() {
        this.setState({added_succ:"evaluation sent successfully"});
        setTimeout(function(){
            this.setState({added_succ:""});
        }.bind(this),2000);
        this.clearPrevEvents();
        this.setState({athletes:'',tests:'',duration:'',comments:''})


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
    }





    //remove

    getTestsAthletes() {
        HandelTrainer.getTestsAthletes().then(response => {
            if (response.data.res === "error")
                alert("some error has happened");
            else if (response.data.res === "wrong")
                alert("Please login please");
            if (response.data.res === "ok") {
                this.setState({testsArr: response.data.tests, athletesArr: response.data.athletes});
            }
        }).catch(e => {
            console.log(e);
            alert("Error getting athletes list form server.");
        });
    }



    render() {
        //some are adapted from <!-- Adapted from https://stackoverflow.com/a/16243163 -->
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Coach Sheet</h3>

                <br></br>

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
                            <td>
                                <div className="vertical-menu mid">
                                    <div><a href="#" className="active">Athletes</a></div>
                                    {this.state.athletesArr.map((option) => (
                                        <a name={option.ID} key={option.ID}
                                           onClick={this.handleAthListClick}>{option.firstname}</a>
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
                    <label>Quality scale</label><br></br>
                    <button name="1" className="btn btn-outline-info" onClick={this.handleQualityClick}>1</button>
                    <button name="2" className="btn btn-outline-info" onClick={this.handleQualityClick}>2</button>
                    <button name="3" className="btn btn-outline-info" onClick={this.handleQualityClick}>3</button>
                    <button name="4" className="btn btn-outline-info" onClick={this.handleQualityClick}>4</button>
                    <button name="5" className="btn btn-outline-info" onClick={this.handleQualityClick}>5</button>
                    <button name="6" className="btn btn-outline-info" onClick={this.handleQualityClick}>6</button>
                </div>

                <div className="form-group">
                    <label>Planned Intensity</label><br></br>
                    <button name="1" className="btn btn-outline-info" onClick={this.handlePlannedClick}>1</button>
                    <button name="2" className="btn btn-outline-info" onClick={this.handlePlannedClick}>2</button>
                    <button name="3" className="btn btn-outline-info" onClick={this.handlePlannedClick}>3</button>
                    <button name="4" className="btn btn-outline-info" onClick={this.handlePlannedClick}>4</button>
                    <button name="5" className="btn btn-outline-info" onClick={this.handlePlannedClick}>5</button>
                    <button name="6" className="btn btn-outline-info" onClick={this.handlePlannedClick}>6</button>
                </div>
                <p></p>

                <div className="form-group">
                    <label>Achieved Intensity</label><br></br>
                    <button name="1" className="btn btn-outline-info" onClick={this.handleAchievedClick}>1</button>
                    <button name="2" className="btn btn-outline-info" onClick={this.handleAchievedClick}>2</button>
                    <button name="3" className="btn btn-outline-info" onClick={this.handleAchievedClick}>3</button>
                    <button name="4" className="btn btn-outline-info" onClick={this.handleAchievedClick}>4</button>
                    <button name="5" className="btn btn-outline-info" onClick={this.handleAchievedClick}>5</button>
                    <button name="6" className="btn btn-outline-info" onClick={this.handleAchievedClick}>6</button>
                </div>
                <p></p>
                <label>Duration Minutes</label><br></br>
                <div><input className="col-xs-4" type="number" id="quantity" name="duration" min="1" max="200" onChange={this.handleChange} value={this.state.duration}/></div>

                <div className="form-group">
                    <label>Duration and Contents as Planned?</label><br></br>
                    <button name="yes" className="btn btn-outline-info paddingBtn" onClick={this.handleAsPlanned}>Yes</button>
                    <button name="no" className="btn btn-outline-info paddingBtn" onClick={this.handleAsPlanned}>No
                    </button>
                </div>
                <p></p>



                <div className="form-group">
                    <label>Comments</label>
                    <input type="text" className="form-control" name="comments" placeholder="comments" value={this.state.comments} onChange={this.handleChange} />
                </div>
                <p></p>
                <div></div>

                <div>
                    <p className="blue">{this.state.added_succ}</p>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Continue</button>


            </form>
        );
    }


}