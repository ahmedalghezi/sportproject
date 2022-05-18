/*
By Ahmed Al-Ghezi
 */

import React, {Component} from "react";
import PostSignup from "../DB/postSignup";

export default class SignOut extends Component {

    handleSubmit(event) {
        SignOut.forwardSignInDisg();
        event.preventDefault();
    }


    constructor(props) {
        super(props);
        this.state = {
            message:"Connecting ...", disguised:false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        PostSignup.signOut().then(response => {
            if(response.data.disguised) {
                this.setState({disguised: true});
                if (response.data.res === "ok") {
                    this.setState({message: "You have been sign out from that coach!"});
                }
                return;
            }

            if (response.data.res === "ok") {
                this.setState({message: "You have been sign out!"});
            }
        }).catch(e => {
            console.log(e);
            alert("An error has happened.");
        });
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign Out</h3>
                <p> {this.state.message}</p>
                <button type="submit" className="btn btn-primary btn-block">Continue</button>
            </form>
        );
    }

    static forwardSignInDisg() {
        if(!this.state.disguised)
            window.location.href = "https://inprove-sport.info:3000/reg/";
        else
            window.location.href = "https://inprove-sport.info:3000/trainer/editCoach";
    }


    static forwardSignIn() {
        window.location.href = "https://inprove-sport.info:3000/reg/";
    }
}