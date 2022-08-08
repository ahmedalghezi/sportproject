/*
By Ahmed Al-Ghezi
 */

import React, {Component} from "react";
import HandelTrainer from "../../DB/handelTrainer";
import PostSignup from "../../DB/postSignup";

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
            alert("some error has happened");
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.title === ""){
            alert("title cannot be empty!")
            return;
        }
        HandelTrainer.createTest(this.state).then(response => {
            //console.log(response.data);
            //navigate("./AfterReg");
            //this.transitionTo('/');
            if(response.data.res === "no")
                this.props.navigate('/reg/sign-in');
            if(response.data.res === "ok")
                alert("Test added successfully");
            if(response.data.res === "error")
                alert("some error has happened");
            else if(response.data.res.includes("duplicate"))
                alert("This test already exists");
        }).catch(e => {
            console.log(e);
            alert("some error has happened");
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
                alert("Test deleted successfully");
            if(response.data.res === "error")
                alert("some error has happened");
            if(response.data.res === "already_used")
                alert("Can't delete this test. It is already used by at least one coach. Please contact DB admin");
        }).catch(e => {
            console.log(e);
            alert("some error has happened");
        });

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Create New Training Type</h3>
                <div className="form-group">
                    <label>Test title</label>
                    <input type="text" className="form-control" name="title" placeholder="Test title" onChange={this.handleChange} />
                </div>

                <div className="form-group">
                    <label>Discipline</label>
                    <br></br>
                    <select onChange={this.handleChange}  name="discipline">
                        {this.state.disciplinesList.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary btn-block">create</button>
                &nbsp;&nbsp;&nbsp;
                <button type="submit" className="btn btn-primary btn-block" onClick={this.deleteTest}>delete</button>
            </form>
        );
    }


}