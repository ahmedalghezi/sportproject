/*
By Ahmed Al-Ghezi
 */

import React, {Component} from "react";
import PostSignup from "../DB/postSignup";

export default class SignOut extends Component {

    handleSubmit(event) {
        this.forwardSignInDisg();
        event.preventDefault();
    }


    constructor(props) {
        super(props);
        this.state = {
            message:"Connecting ...",
            disguised:false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.forwardSignInDisg = this.forwardSignInDisg.bind(this);

    }


    componentDidMount() {
        PostSignup.signOut().then(response => {
            if(response.data.disguised) {
                this.setState({disguised: true});
                if (response.data.res === "ok") {
                    if(response.data.role === "trainer")
                        this.setState({message: "You have been sign out from that coach!"});
                    else
                        this.setState({message: "You have been sign out from that user!"});
                    this.setState({disguisedRole:response.data.role})
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

    forwardSignInDisg() {
        if(!this.state.disguised){
            window.location.href = window.location.origin+"/reg/";
        } else{
            if(this.state.role === "trainer")
                window.location.href = window.location.origin+"/trainer/editCoach";
            else
                window.location.href = window.location.origin+"/super/athleteControl";
        }
    }


    static forwardSignIn() {
        window.location.href = window.location.origin+"/reg/";
    }
}