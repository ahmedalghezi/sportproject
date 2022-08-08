/*
By Ahmed Al-Ghezi
 */

import React, { Component } from "react";
import './style.css';
import PostSignup from '../DB/postSignup';
import {useNavigate} from "react-router-dom";

class ForgetPasswordC extends Component {


    constructor(props) {
        super(props);
        this.state = {email:''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        const target = event.target;
        let value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        PostSignup.requestChangePassword(this.state).then(response => {
            if(response.data.res === "error")
                alert("some error has happened");
            else if(response.data.res === "ok"){
                alert("Check your email for further instructions");
            }
        }).catch(e => {
            console.log(e);
            alert("some error has happened");
        });
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Request Changing Your Password </h3>
                <div className="form-group">
                    <label>Email-Adresse</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email-Adresse"
                        name="email"
                        onChange={this.handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
        );
    }
}

function ForgetPassword(props) {
    let navigate = useNavigate();
    return <ForgetPasswordC {...props} navigate={navigate} />
}

export default ForgetPassword;