/*
By Ahmed Al-Ghezi
 */

import React, {Component} from "react";
import HandelTrainer from "../DB/handelTrainer";
import PostSignup from "../DB/postSignup";

export default class CreateTest extends Component {


    constructor(props) {
        super(props);
        this.state = {title: '', discipline: 'Basketball',disciplinesList:[]};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        this.getDisciplines();
    }

    getDisciplines(){
        PostSignup.getAllDisciplines().then(response => {
            if(response.data.res === "error") {
                const arr = ["connection error"];
                this.setState({disciplinesList: arr});
                return;
            }
            else {
                this.setState({disciplinesList: response.data.res});
            }

        }).catch(e => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten!");
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.title === ""){
            alert("Titel kann nicht leer sein!")
            return;
        }
        HandelTrainer.createTest(this.state).then(response => {
            //console.log(response.data);
            //navigate("./AfterReg");
            //this.transitionTo('/');
            if(response.data.res === "no")
                this.props.navigate('/reg/sign-in');
            if(response.data.res === "ok")
                alert("Test erfolgreich hinzugefügt!");
            if(response.data.res === "error")
                alert("Es ist ein Fehler aufgetreten!");
            else if(response.data.res.includes("duplicate"))
                alert("Dieser Test existiert bereits.");
        }).catch(e => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten!");
        });
        //event.preventDefault();
    }

    handleChange(event) {
        const target = event.target;
        let value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    deleteTest = (event) => {
        event.preventDefault();

        HandelTrainer.deleteTest(this.state).then(response => {
            //console.log(response.data);
            //navigate("./AfterReg");
            //this.transitionTo('/');
            if(response.data.res === "no")
                this.props.navigate('/reg/sign-in');
            if(response.data.res === "ok")
                alert("Test erfolgreich gelöscht.");
            if(response.data.res === "error")
                alert("Es ist ein Fehler aufgetreten!");
            if(response.data.res === "already_used")
                alert("Dieser Test kann nicht gelöscht werden. Es wird bereits von mindestens einem Trainer genutzt. Bitte wenden Sie sich an den DB-Administrator.");
        }).catch(e => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten!");
        });

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Neuen Trainingstypen erstellen</h3>
                <div className="form-group">
                    <label>Testtitel</label>
                    <input type="text" className="form-control" name="title" placeholder="Testtitel" onChange={this.handleChange} />
                </div>

                <div className="form-group">
                    <label>Disziplin</label>
                    <br></br>
                    <select onChange={this.handleChange}  name="discipline">
                        {this.state.disciplinesList.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary btn-block">erstellen</button>
                &nbsp;&nbsp;&nbsp;
                <button type="submit" className="btn btn-primary btn-block" onClick={this.deleteTest}>löschen</button>
            </form>
        );
    }


}