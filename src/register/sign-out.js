/*
By Ahmed Al-Gehzi
 */

import React, {Component} from "react";
import PostSignup from "../DB/postSignup";

export default class SignOut extends Component {

    handleSubmit(event) {
        window.location.href = "https://inprove-sport.info:3000/reg/";
        event.preventDefault();
    }


    constructor(props) {
        super(props);
        this.state = {
            message:"Connecting ..."
        };
    }


    componentDidMount() {
        PostSignup.signOut().then(response => {
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
}