

import React, {Component} from "react";
//import './trainerStyle.css';

import '../style.css';
import HandelTrainer from "../../DB/handelTrainer";
import {useNavigate} from 'react-router-dom';
import SignOut from "../sign-out";

class AddAthleteC extends Component {


    constructor(props) {
        super(props);
        this.state = {changed:false, selectedAthlete:'', athletesArr:[],code:'',saving:false,added_succ:'' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getMyAthletes= this.getMyAthletes.bind(this);
        this.findByEmail= this.findByEmail.bind(this);
        this.findByCode= this.findByCode.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        this.getMyAthletes();
    }



    handleChange(event) {
        const target = event.target;
        let value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        if(name === "email")
            this.setState({saving:false});
    }



    handleSubmit(event) {
        event.preventDefault();
        this.setState({saving:true});
        HandelTrainer.postMyAthlete({"athletes":this.state.athletesArr}).then(response => {
            if (response.data.res === "error") {
                alert("some error has happened");
                this.setState({saving:false});
            }
            else if (response.data.res === "wrong") {
                alert("user name or password are not correct");
                this.setState({saving:false});
            }
            if(response.data.res === "no"){
                alert("Please sign in first");
                SignOut.forwardSignIn();
                return;
            }
            if (response.data.res === "ok")
                alert("Your athlete list is updated successfully");
        }).catch(e => {
            console.log(e);
            alert("some error has happened");
            this.setState({saving:false});
        });
    }


    findByEmail(event) {
        event.preventDefault();
        if(this.state.email === ''){
            return;
        }
        HandelTrainer.findAthletesEmail(this.state.email).then(response => {
            if (response.data.res === "error")
                alert("some error has happened");
            else if (response.data.res === "wrong")
                alert("Please login first");
            else if (response.data.res === "empty"){
                this.setState({athletesArr: []});
            }
            if (response.data.res === "ok") {
                const  arr = this.state.athletesArr;
                for(let i = 0 ; i < arr.length; i++){
                    if(arr[i].ID === response.data.athlete.ID){
                        alert("athlete already exist in your list");
                        return;
                    }
                }
                arr.unshift(response.data.athlete);
                this.setState({athletesArr: arr});
                this.setState({added_succ:"Athlete added successfully"});
                setTimeout(function(){
                    this.setState({added_succ:""});
                }.bind(this),2000);
            }
        }).catch(e => {
            console.log(e);
            alert("Error getting trainings list form server.");
        });
    }

    findByCode() {

    }


    handleRemove = (event) => {
        event.preventDefault();
        const arr  = this.state.myTestsArr;
        const arr2 = [];
        for(let i =0 ; i < arr.length ; i++){
            if(arr[i].title !==this.state.selectedMyTest){
                arr2.push(arr[i]);
            }
        }
        this.setState({changed:true});
        this.setState({myTestsArr:arr2});
    }


    getMyAthletes() {
        HandelTrainer.getMyAthletes().then(response => {
            if (response.data.res === "error")
                alert("some error has happened");
            else if (response.data.res === "wrong")
                alert("Please login first");
            else if (response.data.res === "empty"){
                this.setState({athletesArr: []});
            }
            if (response.data.res === "ok") {
                this.setState({athletesArr: response.data.athletes});
            }
            if(response.data.res === "no")
                alert("Not signed in!");
        }).catch(e => {
            console.log(e);
            alert("Error getting trainings list form server.");
        });
    }

    goBack(){
        this.props.navigate('/trainer/sheet');
    }



    render() {
        //some are adapted from <!-- Adapted from https://stackoverflow.com/a/16243163 -->
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Add athletes to my list</h3>
                <div className="form-group">
                    <label>My Athlete List</label>
                    <br></br>
                    <select  onChange={this.handleChange} name="selectedAthlete" multiple={true}>
                        {this.state.athletesArr.map((option) => (
                            <option key={option.ID}  value={option.firstname}>{option.firstname}</option>
                        ))}
                    </select>
                </div>


                <div className="form-group">
                    <label>Find by personal code</label>
                    <input className="form-control" placeholder="Enter athlete's personal code" name="code" onChange={this.handleChange} />
                </div>
                <button onClick={this.findByCode} className="btn btn-secondary btn-block" disabled={false}>find</button>

                <p></p><p></p>
                <div className="form-group">
                    <label>Find by email address</label>
                    <input type="email" className="form-control" placeholder="Enter email " name="email" onChange={this.handleChange} />
                </div>
                <button onClick={this.findByEmail} className="btn btn-secondary btn-block" disabled={false}>find</button>

                <p></p><p></p>

                <div>
                    <p className="blue">{this.state.added_succ}</p>
                </div>
                <button type="submit" className="btn btn-primary btn-block" disabled={this.state.saving}>save</button>
                <button onClick={this.goBack} className="btn btn-primary btn-block paddingBtn">continue</button>


            </form>
        );
    }


}

function AddAthlete(props) {
    let navigate = useNavigate();
    return <AddAthleteC {...props} navigate={navigate} />
}

export default AddAthlete;