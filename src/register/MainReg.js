/*
By Ahmed Al-Ghezi
 */

import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Routes, Route, } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import AfterReg from "./AfterReg";
import UpdateProfile from "./UpdateProfile";
import SignOut from "./sign-out";
import ForgetPassword from "./forgetPassword";
import Footer from "./footer";
import ChangePassword from "./changePassword";
import UploadConsent from "./UploadConsent";
import AcceptTerms from "./acceptTerms";
import ApproveTests from "./approveTests";
import EmailConfirmed from "./emailConfirmed";
import WelcomeReg from "./WelcomeReg";
import NavBarMobile from "./navBarMobile";




function Main() {
    const [nvLogin, setnvLogin] = useState(false);
    const [hideNav, setHideNav] = useState(false);

    const onLoginF = () => {
        setnvLogin(true);
    }
    const hideNavBarFooter=() =>{
        setHideNav(true);
    }
    const onNavBar = () => {
        setnvLogin(false);
    }
    return (
            <div className="App">

                <div hidden={hideNav}>
                    <NavBarMobile loggedin={nvLogin} navBarUpdated={onNavBar} />
                </div>
                <div className="auth-wrapper">
                        <Routes>
                            <Route exact path='/' element={<div className="auth-inner"><Login/></div>} />
                            <Route exact path='/reg' element={<div className="auth-inner"> <Login/></div>} />
                            <Route path='/reg/sign-in' element={<div className="auth-inner"> <Login onLogin={onLoginF}/></div>} />
                            <Route path='/reg/sign-up' element={<div className="auth-inner"><SignUp/></div>} />
                            <Route path='/reg/sign-out' element={<div className="auth-inner"><SignOut/></div>} />
                            <Route path='/reg/regSuc' element={<div className="auth-inner"><AfterReg/></div>} />
                            <Route path='/reg/forgetPassword' element={<div className="csv-inner"><ForgetPassword/></div>} />
                            <Route path='/reg/changeMyPassword' element={<div className="csv-inner"><ChangePassword/></div>} />
                            <Route path='/reg/uploadConsent' element={<div className="auth-inner"><UploadConsent/></div>} />
                            <Route path='/reg/accept' element={<div className="auth-inner"><AcceptTerms/></div>} />
                            <Route path='/reg/emailConfirmed' element={<div className="small-inner"><EmailConfirmed/></div>} />
                            <Route path='/reg/welcomeReg' element={<div className="csv-inner"><WelcomeReg/></div>} />
                            <Route path='/reg/approveTests' element={<div className="auth-inner"><ApproveTests/></div>} />
                            <Route path='/reg/updateProfile' element={<div className="auth-inner"><UpdateProfile/></div>} />

                        </Routes>
                </div>
                <div><p></p></div>
                <Footer hidden={hideNav}/>

            </div>
    );
}
export default Main;
