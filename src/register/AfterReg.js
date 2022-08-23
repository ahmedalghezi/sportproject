/*
By Ahmed Al-Ghezi
 */

import React, {Component} from "react";

export default class AfterReg extends Component {

    handleSubmit(event) {
        window.location.href = "https://inprove-sport.info/limesurvey/";
        event.preventDefault();
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign Up Was Successful!</h3>
                <p> We sent you an email with confirmation link. Please check your inbox and spam folder. </p>
                <button type="submit" className="btn btn-primary btn-block">Continue</button>
            </form>
        );
    }
}