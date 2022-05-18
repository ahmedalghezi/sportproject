/*
By Ahmed Al-Ghezi
 */

import React, {useState} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Routes, Route, } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import AfterReg from "./AfterReg";
import Control from "./control"
import UpdateProfile from "./UpdateProfile";
import MyProfile from "./profile";
import TrainerSheet from  "./trainer/sheet";
import CreateTest from "./trainer/createTest";
import AddToMyTests from "./trainer/addToMyTests";
import AddAthlete from "./trainer/addAthlete";
import NavBar from "./navBar";
import SignOut from "./sign-out";
import EditCoach from "./trainer/editCoach";
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
                    <div className="auth-inner">
                        <Routes>
                            <Route exact path='/' element={<Login/>} />
                            <Route exact path='/reg' element={<Login/>} />
                            <Route path='/reg/sign-in' element={<Login onLogin={onLoginF}/>} />
                            <Route path='/reg/sign-up' element={<SignUp/>} />
                            <Route path='/reg/sign-out' element={<SignOut/>} />
                            <Route path='/reg/regSuc' element={<AfterReg/>} />
                            <Route path='/reg/profile' element={<MyProfile/>} />
                            <Route path='/reg/control' element={<Control/>} />
                            <Route path='/reg/updateProfile' element={<UpdateProfile/>} />
                            <Route path='/trainer/sheet' element={<TrainerSheet/>} />
                            <Route path='/trainer/createTest' element={<CreateTest/>} />
                            <Route path='/trainer/addMyTests' element={<AddToMyTests/>} />
                            <Route path='/trainer/addAthletes' element={<AddAthlete/>} />
                            <Route path='/trainer/editCoach' element={<EditCoach/>} />

                        </Routes>
                    </div>
                </div>
            </div>
    );
}
export default Main;