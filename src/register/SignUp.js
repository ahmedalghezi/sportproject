import React, { Component } from "react";
import './style.css';
export default class SignUp extends Component {


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







