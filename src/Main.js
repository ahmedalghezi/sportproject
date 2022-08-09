/*
By Ahmed Al-Ghezi
 */

import React, {useState} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import '../App.css';
import { Routes, NavLink, Route } from "react-router-dom";
import Portal from "./Home/Portal";
import Portaltest from "./Home/Portal";
import Login from "./Login/Login";
import SignUp from "./register/SignUp";
import SignUpVan from "./register/SignUpVan";
import AfterReg from "./register/AfterReg";
import LimeControl from "./register/limeControl"
import UpdateProfile from "./register/UpdateProfile";
import MyProfile from "./register/profile";
import TrainerSheet from  "./Home/Input/trainer/sheet";
import CreateTest from "./Home/Input/trainer/createTest";
import AddToMyTests from "./Home/Input/trainer/addToMyTests";
import AddAthlete from "./Home/Input/trainer/addAthlete";
import NavBar from "./navBar";
import SignOut from "./Login/sign-out";
import EditCoach from "./Home/Input/trainer/editCoach";
import CsvReader from "./csvHandler/CsvReader";
import GetIDS from "./csvHandler/getIDs";
import Footer from './footer';

import PostSignup from "./DB/postSignup";
//import { getRoles } from '@testing-library/react';

function Main() {
    const [nvLogin, setnvLogin] = useState(false); // current state and function that updates the state
    const onLoginF = () => {
        setnvLogin(true);
    }
    const onNavBar = () => {
        setnvLogin(false);
    }

    const [role, setnewRole] = useState("Athlete");
    //let role = "Athlete";  
    const onGetRoles = () => {
        if (PostSignup.isAdmin === true){
            role = "Admin";
            setnewRole(role);
        }
        else if (PostSignup.isTrainer === true){
            role = "Trainer";
            setnewRole(role);
        }
        else if (PostSignup.isTrainerAdmin === true){
            role = "TrainerAdmin";
            setnewRole(role);
        }
        
    
    }
    return (
             <div className="App">
                <NavBar loggedin={nvLogin} navBarUpdated={onNavBar}/>
                 <div className="auth-wrapper"> 
                        <Routes>
                            <Route path='/' element={<div className="auth-inner"> <Login onLogin={onLoginF}/></div>} />
                                <Route path='/login' element={<div className="auth-inner"> <Login onLogin={onLoginF}/></div>} />
                                <Route path='/reg' element={<div className="auth-inner"> <SignUpVan/></div>} />
                                    {/* <Route path='/sign-in' element={<div className="auth-inner"> <Login onLogin={onLoginF}/></div>} /> */}
                                    {/* <Route path='/sign-up' element={<div className="auth-inner"><SignUp/></div>} /> */}
                                    <Route path='/sign-up-van' element={<div className="auth-inner"><SignUpVan/></div>} />
                                    <Route path='/sign-out' element={<div className="auth-inner"><SignOut/></div>} />
                                    <Route path='/regSuc' element={<div className="auth-inner"><AfterReg/></div>} /> 
                                    <Route path='/profile' element={<div className="auth-inner"><MyProfile/></div>} />
                                    <Route path='/updateProfile' element={<div className="auth-inner"><UpdateProfile/></div>} />
                                    <Route path='/lime/control' element={<div className="auth-inner"><LimeControl/></div>} />
                                {PostSignup.isLogin && <Route path='/home' element={<Portal role={onGetRoles}/>}/>}
                                    {PostSignup.isTrainer && <Route path='/trainer' element={<div className="auth-inner"><TrainerSheet /></div>} />}
                                        <Route path='/sheet' element={<div className="auth-inner"><TrainerSheet/></div>} />
                                        <Route path='/createTest' element={<div className="auth-inner"><CreateTest/></div>} />
                                        <Route path='/addMyTests' element={<div className="auth-inner"><AddToMyTests/></div>} />
                                        {/* <Route path='/adminMain' element={<div className="auth-inner"><CreateTest/></div>} /> */}
                                        <Route path='/addAthletes' element={<div className="auth-inner"><AddAthlete/></div>} />
                                    {PostSignup.isAdminTrainer && <Route path='/editCoach' element={<div className="auth-inner"><EditCoach/></div>} />}
                                    {PostSignup.isAdmin && <Route path='/csv' element={<div className="csv-inner"><CsvReader/></div>} />}
                                        <Route path='/reader' element={<div className="csv-inner"><CsvReader/></div>} />
                                        <Route path='/athleteInfo' element={<div className="csv-inner"><GetIDS/></div>} />
                                <Route path="*" element={<p className="pt-5"><h1 className="pt-5">404 Page not found</h1></p>}/>  
                        </Routes>
                 </div>
                 <Footer />
             </div>
    );
}
export default Main;