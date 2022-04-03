import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import AfterReg from "./AfterReg";
function Main() {
    return (
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/reg/sign-in"}>Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/reg/sign-up"}>Sign up</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <Routes>
                            <Route exact path='/' element={<Login/>} />
                            <Route path='/reg/sign-in' element={<Login/>} />
                            <Route path='/reg/sign-up' element={<SignUp/>} />
                            <Route path='/reg/regSuc' element={<AfterReg/>} />
                        </Routes>
                    </div>
                </div>
            </div>
    );
}
export default Main;