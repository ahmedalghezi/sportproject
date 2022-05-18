/*
By Ahmed Al-Ghezi
 */

import React, {Component} from "react";
import PostSignup from "../DB/postSignup";
import {Link} from "react-router-dom";

export default class NavBar extends Component {


    constructor(props) {
        super(props);
        this.state = {
            showSignIn:true,
            showSignUp:true,
            showTrainer:false,
            showAdmin:false,
            flag:false
            };
        this.checkLogin = this.checkLogin.bind(this);
    }

    componentDidMount() {
        this.checkLogin();
    }

    componentDidUpdate(prevProps,prevState){
        if(this.props.loggedin && this.props.loggedin !== prevProps.loggedin && this.state !== prevState )
            this.checkLogin();

    }

    checkLogin(){
        PostSignup.isLogin().then(response => {
            if (response.data.res === "ok"){
                this.setState({showSignIn:false});
                this.setState({showSignUp:false});
                if(PostSignup.isTrainer(response.data.role))
                    this.setState({showTrainer:true});
                else
                    this.setState({showTrainer:false});
                if(PostSignup.isAdminTrainer(response.data.role))
                    this.setState({showAdmin:true});
                else
                    this.setState({showAdmin:false});
            }else{
                this.setState({showSingIn:true});
                this.setState({showSingUp:true});
            }
            this.props.navBarUpdated();
        }).catch(e => {
            console.log(e);
        });
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item" hidden={!this.state.showSignIn /*|| this.props.loggedin*/}>
                                <Link className="nav-link" to={"/reg/sign-in"}>Sign in</Link>
                            </li>

                            <li className="nav-item" hidden={this.state.showSignIn}>
                                <Link className="nav-link" to={"/reg/sign-out"}>Sign out</Link>
                            </li>

                            <li className="nav-item"  hidden={!this.state.showSignUp}>
                                <Link className="nav-link" to={"/reg/sign-up"} >Sign up</Link>
                            </li>
                            <li className="nav-item" hidden={!this.state.showTrainer}>
                                <Link className="nav-link" to={"/trainer/addMyTests"} >Trainings list</Link>
                            </li>
                            <li className="nav-item" hidden={!this.state.showTrainer}>
                                <Link className="nav-link" to={"/trainer/addAthletes"} >Athletes list</Link>
                            </li>
                            <li className="nav-item" hidden={!this.state.showTrainer}>
                                <Link className="nav-link" to={"/trainer/sheet"} >Evaluation</Link>
                            </li>
                            <li className="nav-item" hidden={!this.state.showAdmin}>
                                <Link className="nav-link" to={"/trainer/createTest"} >Create New Training</Link>
                            </li>

                            <li className="nav-item" hidden={!this.state.showAdmin}>
                                <Link className="nav-link" to={"/trainer/editCoach"} >Edit Coaches</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}