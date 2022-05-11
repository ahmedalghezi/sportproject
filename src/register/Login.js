/*
By Ahmed Al-Gehzi
 */

import React, { Component } from "react";
import './style.css';
import PostSignup from '../DB/postSignup';
import {useNavigate} from "react-router-dom";

class LoginC extends Component {


    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};
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
        // alert('A name was submitted: ' + this.state.firstName);
        //this.props.history.push('/');
        event.preventDefault();
        // this.props.navigate('/reg/regSuc');
        PostSignup.login(this.state).then(response => {
            //console.log(response.data);
            //navigate("./AfterReg");
            //this.transitionTo('/');
            if(response.data.res === "error")
                alert("some error has happened");
            else if(response.data.res === "wrong")
                alert("user name or password are not correct");
            else {
                if(response.data.role && PostSignup.isTrainer(response.data.role))
                    window.location.href = "https://inprove-sport.info:3000/trainer/sheet";
                else if(response.data.role && PostSignup.isAdminTrainer(response.data.role))
                    window.location.href = "https://inprove-sport.info:3000/trainer/createTest";
                else
                    window.location.href = "https://inprove-sport.info:3000/reg/profile";
            }
                //this.props.history.push('./AfterReg');

        }).catch(e => {
            console.log(e);
            alert("some error has happened");
        });
        //event.preventDefault();
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign In</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }
}

function Login(props) {
    let navigate = useNavigate();
    return <LoginC {...props} navigate={navigate} />
}

export default Login;