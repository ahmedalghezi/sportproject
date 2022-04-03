import React, { Component } from "react";
import {Navigation} from 'react-router';
import './style.css';
import PostSignup from '../DB/postSignup';
import {afterReg} from './AfterReg';
import { withRouter } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
class SignUpC extends Component {


    constructor(props) {
        super(props);
        this.state = {firstName: 'aaa', lastName: '', email:'', password:'', discipline:''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }


    handleSubmit(event) {
       // alert('A name was submitted: ' + this.state.firstName);
        //this.props.history.push('/');
        this.props.navigate('/reg/regSuc');
        PostSignup.setSignUP(this.state).then(response => {
            console.log(response.data);
            //navigate("./AfterReg");
            //this.transitionTo('/');
            if(response.data.res === "error")
                alert("some error has happened");
            if(response.data.res === "duplicate key")
                alert("This email is already registered");
            //reg successful navigate to other page?
            this.props.history.push('./AfterReg')
        }).catch(e => {
            console.log(e);
            alert("some error has happened");
            });
        event.preventDefault();
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>
                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" name="firstName" placeholder="First name" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" name="lastName" onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={this.handleChange}/>
                </div>

                <div className="form-group box">
                    <label>Discipline</label>
                    <select onChange={this.handleChange}  name="discipline">
                        <option value="basketball" >Basketball</option>
                        <option value="iceHokey">Ice hokey</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/sign-in">sign in?</a>
                </p>
            </form>
        );
    }


}

function SignUp(props) {
    let navigate = useNavigate();
    return <SignUpC {...props} navigate={navigate} />
}

export default SignUp;



