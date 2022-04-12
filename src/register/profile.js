/*
By Ahmed Al-Gehzi
 */

import React, {Component} from "react";
import {useNavigate} from 'react-router-dom';
export class MyProfile extends Component {


    constructor(props) {
        super(props);
        this.state = {firstName: '', lastName: '', email:'', password:'', discipline:'basketball',gender:'M',birthdate:'',readTerms:false};
        this.updateProfile = this.updateProfile.bind(this);
    }


    handleSubmit(event) {
        window.location.href = "https://inprove-sport.info/limesurvey";
        event.preventDefault();
    }

    updateProfile() {
        this.props.navigate('/reg/updateProfile');
        return;
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Welcome to your page!</h3>
                <button type="submit" className="btn btn-primary btn-block">Continue to Surveys</button>
                <button onClick={this.updateProfile}> update profile</button>
            </form>
        );
    }



}

function Profile(props) {
    let navigate = useNavigate();
    return <MyProfile {...props} navigate={navigate} />
}

export default Profile;