/*
By Ahmed Al-Ghezi
 */

import React, {Component} from "react";

import './style.css';
import PostSignup from '../DB/postSignup';
import {useNavigate} from 'react-router-dom';
import AlertDialog from "../utli/alertDialog";
import SignUp from "./SignUp";
import LoggedHandler from "../DB/loggedHandler";

class UpdateProfileC extends Component {


    constructor(props) {
        super(props);
        this.state = {
            firstName: '', oldFirstName: '', lastName: '', oldLastName: '', email: '', oldEmail: '', password: '',
            discipline: '', gender: '', birthdate: '', oldBirthdate: '', readTerms: false,openDeleteDialog:false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }


    componentDidMount() {
        this.getProfileData();
    }

    handleChange(event) {
        const target = event.target;
        let value = target.value;
        const name = target.name;
        if (name === "readTerms")
            value = target.checked;
        this.setState({
            [name]: value
        });
    }


    getProfileData() {
        LoggedHandler.getSignUpData().then(response => {
            //console.log(response.data);
            //navigate("./AfterReg");
            //this.transitionTo('/');
            if (response.data.res === "error")
                alert("some error has happened");
            else if (response.data.res === "no")
                alert("Please sign in first!");
            else {
                this.setState({firstName: response.data.firstName});
                this.setState({oldFirstName: response.data.firstName});
                this.setState({lastName: response.data.lastName});
                this.setState({oldLastName: response.data.lastName});
                this.setState({discipline: response.data.discipline});
                this.setState({oldDiscipline: response.data.discipline});
                this.setState({oldBirthdate: response.data.birthdate});
                this.setState({birthdate: response.data.birthdate});
                this.setState({oldEmail: response.data.email});
                this.setState({email: response.data.email});
            }

        }).catch(e => {
            console.log(e);
            alert("some error has happened");
        });
    }


    checkInput(stateData){
        if(stateData.firstName === ""){
            alert("please input your First Name");
            return false;
        }

        if(stateData.lastName === ""){
            alert("please input your Last Name");
            return false;
        }

        if(stateData.birthdate === ""){
            alert("please input your date of birth");
            return false;
        }

        const date = new Date(stateData.birthdate);
        date.getDate();
        const date16 = new Date();
        date16.setFullYear(date16.getFullYear() - 16);
        // check if the date of birth is before that date
        if(date > date16){
            alert("You must be over 16 years old to register");
            return false;
        }



        if(stateData.email === ""){
            alert("please input your email");
            return false;
        }



        if(!stateData.readTerms){
            alert("please read and accept the terms and conditions");
            return false;
        }
        return true;
    }



    handleSubmit(event) {
        event.preventDefault();
         if(!this.checkInput(this.state))
             return;
        LoggedHandler.updateProfile(this.state).then(response => {
            if (response.data.res === "error")
                alert("some error has happened");
            else
                this.props.navigate('/reg/regSuc');//show dialog
        }).catch(e => {
            console.log(e);
            alert("some error has happened");
        });
    }


    performDelete = () =>{
        LoggedHandler.deleteMyProfile().then(response => {
            if (response.data.res === "error")
                alert("some error has happened");
            if (response.data.res === "no")
                alert("please login first");
            else if(response.data.res === "ok")
                alert("Your profile is deleted successfully!")
        }).catch(e => {
            console.log(e);
            alert("some error has happened");
        });
    }




    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Update your Profile</h3>
                <div className="form-group">
                    <label>First name</label>
                    <input value={this.state.firstName} type="text" className="form-control" name="firstName"
                           placeholder="First name" onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label>Last name</label>
                    <input value={this.state.lastName} type="text" className="form-control" placeholder="Last name"
                           name="lastName" onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input value={this.state.email} type="email" className="form-control" placeholder="Enter email"
                           name="email" onChange={this.handleChange}/>
                </div>

                <div className="form-group">
                    <label>Birthdate</label>
                    <input value={this.state.birthdate} type="date" className="form-control" name="birthdate"
                           onChange={this.handleChange}/>
                </div>


                <div className="form-group">
                    <label>Discipline</label>
                    <br></br>
                    <select onChange={this.handleChange} name="discipline">
                        <option value="basketball">Basketball</option>
                        <option value="iceHokey">Ice hokey</option>
                    </select>
                </div>


                <p></p>

                <div className="form-group">
                    <label htmlFor="checkid">
                        <input name="readTerms" type="checkbox" onChange={this.handleChange}/> I have read and accept
                        the privacy policy and the terms of data storage and usage
                    </label>
                </div>


                <button type="submit" className="btn btn-primary btn-block" disabled={true}>Update</button>
                <p className="forgot-password text-right">
                    <a href="#" onClick={this.handleDeleteClick}>Delete your profile</a>
                </p>

                <div>
                    <AlertDialog open = {this.state.openDeleteDialog} message={"Do you rally want to delete your profile? this operation cannot be undone!"} onOk={this.deleteALLProfile} onCancel={this.cancelDelete}/>
                </div>

            </form>
        );
    }

    handleDeleteClick = (event) => {
        this.setState({openDeleteDialog:true});
        event.preventDefault();
    }

    deleteALLProfile = () => {
        this.setState({openDeleteDialog:false});
        this.performDelete();
    }


    cancelDelete = () => {
        this.setState({openDeleteDialog:false});
    }

}




function UpdateProfile(props) {
    let navigate = useNavigate();
    return <UpdateProfileC {...props} navigate={navigate}/>
}

export default UpdateProfile;



