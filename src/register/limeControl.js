/*
By Ahmed Al-Ghezi
 */

import React, { Component } from "react";
import './style.css';
import '../DB/postLimeControl';
import PostLimeControl from "../DB/postLimeControl";



export default class LimeControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displs: [],
            participants_added : "",
            discipline:'Basketball',
            password:'',
            surveyNumber:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleAdd(){
        //this.setState({ participants_added:"working ..."});
        PostLimeControl.addParticipants(this.state).then(response => {
            console.log(response);
            if(response.data.res === "error")
                alert("some error has happened");
            else {
                this.setState({ participants_added: response.data.res });
                alert("Participants added!");
                //this.state.participants_added = response.data.res;
            }
        }).catch(e => {
            console.log(e);
            alert("some error has happened");
        });
    }

    /*addParticipants = () =>  {
        //this.setState({ participants_added:"working ..."});
        LimeControl.addParticipants(this.state).then(response => {
            console.log(response);
            if(response.data.res === "error")
                alert("some error has happened");
            else {
                this.setState({ participants_added: response.data.res });
                //this.state.participants_added = response.data.res;
            }
        }).catch(e => {
            console.log(e);
            alert("some error has happened");
        });
    }*/

    render() {
        let displs = this.state.displs;
        let optionItems = displs.map((disp) =>
            <option key={disp.name}>{disp.name}</option>
        );
        return (
            <form>
                <h3>LimeSurvey: Participant Control Panel</h3>

                <div className="form-group">
                    <label>Key</label>
                    <input onChange={this.handleChange} type="password" className="form-control" placeholder="Enter key" />
                </div>


                <div className="form-group">
                    <label>Survey ID</label>
                    <input onChange={this.handleChange} type="number" className="form-control" placeholder="Enter survey number"
                           name="surveyNumber"/>
                </div>
                <p></p>
                <div className="form-group">
                    <label>Discipline</label>
                    <select onChange={this.handleChange}  name="discipline">
                        <option value="basketball" >Basketball</option>
                        <option value="iceHokey">Ice hokey</option>
                    </select>
                </div>
                <p>
                    {this.state.participants_added}
                </p>
                <div>
                    <button className="btn btn-primary btn-block" onClick={this.handleAdd}>Add participants</button>
                    <button className="btn btn-primary btn-block paddingBtn" >Remove participants</button>
                </div>
                <div className="form-group">

                </div>
            </form>
        );
    }
}