/*
By Ahmed Al-Ghezi
 */

import React, { Component } from "react";
import './style.css';
import '../DB/postLimeControl';
import PostLimeControl from "../DB/postLimeControl";
import PostSignup from "../DB/postSignup";
import alert from "bootstrap/js/src/alert";




class LimeControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displs: [],
            participants_added : "",
            discipline:'',
            password:'',
            surveyNumber:'',
            disciplinesList:[],
            approvedStudies:[],
            selectedStudyID:''
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


    componentDidMount() {
        if(this.state.disciplinesList.length === 0){
            this.getApprovedStudies();
            this.getDisplines();
        }

    }



    getApprovedStudies = () => {
        PostSignup.getStudies().then(response => {
            if(response.data.res === "error") {
                alert("Error getting disciplines from server");
                return;
            }
            else if(response.data.res && response.data.res.length > 0){
                this.setState({approvedStudies:response.data.res});
                this.setState({selectedStudyID:response.data.res[0]});
            }

        }).catch(e => {
            console.log(e);
            alert("some error has happened");
        });
    }


    getDisplines = () => {
        PostSignup.getAllDisciplines().then(response => {
            if(response.data.res === "error") {
                const arr = ["connection error"];
                this.setState({disciplinesList: arr});
                return;
            }
            else {
                this.setState({disciplinesList: response.data.res});
                this.setState({discipline:response.data.res[0]});
            }

        }).catch(e => {
            console.log(e);
            alert("some error has happened");
        });
    }

    handleRemove = (event) =>{
        event.preventDefault();
        PostLimeControl.removeParticipants(this.state).then(response => {
            console.log(response);
            if(response.data.res === "error")
                return;
            //alert("some error has happened");
            if(response.data.res === "no"){
                //alert("Please sign in to continue");
                window.location.href = window.location.origin+"/reg/sign-in?org=$lime$control";
                return;
            }
            else if(response.data.res === "ok") {
                let msg =  " participants removed";
                this.setState({participants_added:msg});
                setTimeout(function(){
                    this.setState({participants_added:""});
                }.bind(this),2000);

            }
        }).catch(e => {
            console.log(e);
            //alert("some error has happened");
        });
    }

    handleStudySele =  (event) =>{
        event.preventDefault();
        //TODO
    }

    handleAdd(event){
        event.preventDefault();
        //this.setState({ participants_added:"working ..."});
        PostLimeControl.addParticipants(this.state).then(response => {
            console.log(response);
            if(response.data.res === "error")
                return;
                //alert("some error has happened");
            if(response.data.res === "no"){
                //alert("Please sign in to continue");
                window.location.href = window.location.origin+"/reg/sign-in?org=$lime$control";
                return;
            }
            else {
                let msg = response.data.insert+ " participants added";
                if(response.data.exist > 0)
                    msg = msg + ", "+response.data.exist+ " skipped (already exist) ";
                this.setState({participants_added:msg});
                setTimeout(function(){
                    this.setState({participants_added:""});
                }.bind(this),4000);

            }
        }).catch(e => {
            console.log(e);
            //alert("some error has happened");
        });
    }


    handleDispSele = (event) =>{
        event.preventDefault();
        this.setState({discipline:event.target.value})
    }

    render() {
        return (
            <form>
                <h3>LimeSurvey: Participant Control Panel</h3>

                <div className="form-group" hidden={true}>
                    <label>Key</label>
                    <input onChange={this.handleChange} type="password" className="form-control" placeholder="Enter key" />
                </div>

                <table>
                    <tr>
                    <td>
                    <div className="form-group">
                        <label>Discipline</label>
                        <br></br>
                        <select onChange={this.handleDispSele}  name="discipline">
                            {this.state.disciplinesList.map((item) => (
                                <option key={item}>{item}</option>
                            ))}
                        </select>
                    </div>

                    </td>

                    <td width="20px">     </td>
                    <td>
                        <div className="form-group" hidden={true}>
                            <label>Approved data category</label>
                            <br></br>
                            <select onChange={this.handleStudySele}  name="approved_studies">
                                {this.state.approvedStudies.map((item) => (
                                    <option key={item.ID}>{item.title}</option>
                                ))}
                            </select>
                        </div>
                    </td>

                    </tr>


                </table>



                <div className="form-group">
                    <label>Survey ID</label>
                    <input onChange={this.handleChange} type="number" className="form-control" placeholder="Enter survey number"
                           name="surveyNumber"/>
                </div>
                <p></p>


                <div>
                    <p className="blue">{this.state.participants_added}</p>
                </div>


                <div>
                    <button className="btn btn-primary btn-block" onClick={this.handleAdd}>Add participants</button>
                    <button className="btn btn-primary btn-block paddingBtn" onClick={this.handleRemove}>Remove participants</button>
                </div>
                <div className="form-group">

                </div>
            </form>
        );
    }
}

export default LimeControl;