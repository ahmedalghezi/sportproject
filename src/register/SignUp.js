/*
By Ahmed Al-Ghezi
 */


import React, { Component } from "react";
//import {Navigation} from 'react-router';
import './style.css';
import PostSignup from '../DB/postSignup';
import {useNavigate} from 'react-router-dom';
class SignUpC extends Component {


    constructor(props) {
        super(props);
        this.state = {firstName: '', lastName: '', email:'', password:'', discipline:'basketball',gender:'M',
            birthdate:'',readTerms:false, disciplinesList: [],showParentAccept:false,parentAccept:false};
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


    handleChange(event) {
        const target = event.target;
        let value = target.value;
        const name = target.name;
        if(name === "readTerms")
            value = target.checked;
        this.setState({
            [name]: value
        });

    }

    setBirthDate(event){
        event.preventDefault();
        this.setState({birthdate:event.target.value});
        const date = new Date(event.target.value);
        date.getDate();
        const date18 = new Date();
        date18.setFullYear(date18.getFullYear() - 18);
        // check if the date of birth is before that date
        if(date > date18){
            this.setState({showParentAccept:true});
        }

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
        date16.setFullYear(date16.getFullYear() - 13);
        // check if the date of birth is before that date
        if(date > date16){
            alert("You must be over 13 years old to register");
            return false;
        }



        if(stateData.email === ""){
            alert("please input your email");
            return false;
        }

        if(stateData.password === ""){
            alert("password cannot empty!");
            return false;
        }

        if(!stateData.readTerms){
            alert("please read and accept the terms and conditions");
            return false;
        }
        if(!stateData.parentAccept && stateData.showParentAccept){
            alert("Please confirm the parent acceptance");
            return false;
        }
        return this.checkPassword(stateData.password);
    }

    checkPassword(password){
        const passw= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if(password.match(passw))
            return true;
        alert('Password must be between 8 to 15 characters lenght, contains at least one lowercase letter, ' +
                'one uppercase letter, numeric digit, and one special character');
            return false;
    }

    handleSubmit(event) {
        event.preventDefault();
        if(!this.checkInput(this.state))
            return;
        PostSignup.setSignUP(this.state).then(response => {
            if(response.data.res === "error")
                alert("some error has happened");
            else if(response.data.res === "duplicate key")
                alert("This email is already registered");
            else
                //this.props.history.push('./AfterReg');
                this.props.navigate('/reg/regSuc');
        }).catch(e => {
            console.log(e);
            alert("some error has happened");
            });
        //event.preventDefault();
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
                    <label>Birthdate</label>
                    <input type="date" className="form-control"  name="birthdate" onChange={this.handleChange}/>
                </div>






                <div className="form-group">
                    <label>Discipline</label>
                    <br></br>
                    <select onChange={this.handleChange}  name="discipline">
                    {this.state.disciplinesList.map((item) => (
                        <option key={item}>{item}</option>
                    ))}
                    </select>
                </div>



                <div className="form-group">
                    <label>Gender</label>
                    <br></br>
                    <select onChange={this.handleChange}  name="gender">
                        <option value="M">M</option>
                        <option value="F">F</option>
                    </select>
                </div>




                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={this.handleChange}/>
                </div>

                <p></p>

                 <div className="form-group">
                    <label htmlFor="checkid">
                        <input name="readTerms" type="checkbox" onChange={this.handleChange}/> I have read and accept the privacy policy and the terms of data storage and usage
                </label>
                </div>

                <div className="form-group" hidden={!this.state.showParentAccept}>
                    <label htmlFor="checkid">
                        <input name="parentAccept" type="checkbox" onChange={this.handleChange} /> I confirm to have parental consent to register in this web page
                    </label>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/reg/sign-in">sign in?</a>
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



