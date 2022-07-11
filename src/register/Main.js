/*
By Ahmed Al-Ghezi
 */

import React, {useState} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Routes, Route, } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import SignUpVan from "./SignUpVan";
import AfterReg from "./AfterReg";
import LimeControl from "./limeControl"
import UpdateProfile from "./UpdateProfile";
import MyProfile from "./profile";
import TrainerSheet from  "./trainer/sheet";
import CreateTest from "./trainer/createTest";
import AddToMyTests from "./trainer/addToMyTests";
import AddAthlete from "./trainer/addAthlete";
import NavBar from "./navBar";
import SignOut from "./sign-out";
import EditCoach from "./trainer/editCoach";
import CsvReader from "../csvHandler/CsvReader";
import GetIDS from "../csvHandler/getIDs";
function Main() {
    const [nvLogin, setnvLogin] = useState(false);
    const onLoginF = () => {
        setnvLogin(true);
    }
    const onNavBar = () => {
        setnvLogin(false);
    }
    return (
            <div className="App">
                <NavBar loggedin={nvLogin} navBarUpdated={onNavBar}/>
                <div className="auth-wrapper">

                        <Routes>
                            <Route exact path='/' element={<div className="auth-inner"><Login/></div>} />
                            <Route exact path='/reg' element={<div className="auth-inner"> <Login/></div>} />
                            <Route path='/reg/sign-in' element={<div className="auth-inner"> <Login onLogin={onLoginF}/></div>} />
                            <Route path='/reg/sign-up' element={<div className="auth-inner"><SignUp/></div>} />
                            <Route path='/reg/sign-out' element={<div className="auth-inner"><SignOut/></div>} />
                            <Route path='/reg/regSuc' element={<div className="auth-inner"><AfterReg/></div>} />
                            <Route path='/reg/profile' element={<div className="auth-inner"><MyProfile/></div>} />
                            <Route path='/lime/control' element={<div className="auth-inner"><LimeControl/></div>} />
                            <Route path='/reg/updateProfile' element={<div className="auth-inner"><UpdateProfile/></div>} />
                            <Route path='/trainer/sheet' element={<div className="auth-inner"><TrainerSheet/></div>} />
                            <Route path='/trainer/createTest' element={<div className="auth-inner"><CreateTest/></div>} />
                            <Route path='/trainer/addMyTests' element={<div className="auth-inner"><AddToMyTests/></div>} />
                            <Route path='/trainer/adminMain' element={<div className="auth-inner"><CreateTest/></div>} />
                            <Route path='/trainer/addAthletes' element={<div className="auth-inner"><AddAthlete/></div>} />
                            <Route path='/trainer/editCoach' element={<div className="auth-inner"><EditCoach/></div>} />

                            <Route path='/csv/reader' element={<div className="csv-inner"><CsvReader/></div>} />
                            <Route path='/csv/athleteInfo' element={<div className="csv-inner"><GetIDS/></div>} />
                        </Routes>
                </div>

            </div>
    );
}
export default Main;