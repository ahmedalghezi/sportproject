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
import ForgetPassword from "./forgetPassword";
import Footer from "./footer";
import ChangePassword from "./changePassword";
import UploadFileC from "./trainer/VideoUpload/uploadFile";
import VideoNavC from "./trainer/VideoUpload/uploadVideoNav";
import MyVideosC from "./trainer/VideoUpload/myVideos";
import TestsView from "./trainer/aymen/TestsView";
import StatsView from "./trainer/aymen/StatsView";
import EvaluationsView from "./trainer/aymen/EvaluationsView";
import UploadConsent from "./UploadConsent";
import AcceptTerms from "./acceptTerms";
import ApproveTestsCNew from "./approveTestsNew";

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
                            <Route path='/reg/sign-up-van' element={<div className="auth-inner"><SignUpVan/></div>} />
                            <Route path='/reg/sign-out' element={<div className="auth-inner"><SignOut/></div>} />
                            <Route path='/reg/regSuc' element={<div className="auth-inner"><AfterReg/></div>} />
                            <Route path='/reg/profile' element={<div className="auth-inner"><MyProfile/></div>} />
                            <Route path='/reg/forgetPassword' element={<div className="csv-inner"><ForgetPassword/></div>} />
                            <Route path='/reg/changeMyPassword' element={<div className="csv-inner"><ChangePassword/></div>} />
                            <Route path='/reg/uploadConsent' element={<div className="auth-inner"><UploadConsent/></div>} />
                            <Route path='/reg/accept' element={<div className="auth-inner"><AcceptTerms/></div>} />

                            <Route path='/reg/tempR' element={<div className="auth-inner"><ApproveTestsCNew/></div>} />

                            <Route path='/lime/control' element={<div className="auth-inner"><LimeControl/></div>} />
                            <Route path='/reg/updateProfile' element={<div className="auth-inner"><UpdateProfile/></div>} />
                            <Route path='/trainer/sheet' element={<div className="auth-inner"><TrainerSheet/></div>} />
                            <Route path='/trainer/createTest' element={<div className="auth-inner"><CreateTest/></div>} />
                            <Route path='/trainer/addMyTests' element={<div className="auth-inner"><AddToMyTests/></div>} />
                            <Route path='/trainer/adminMain' element={<div className="auth-inner"><CreateTest/></div>} />
                            <Route path='/trainer/addAthletes' element={<div className="auth-inner"><AddAthlete/></div>} />
                            <Route path='/trainer/editCoach' element={<div className="auth-inner"><EditCoach/></div>} />
                            <Route path='/trainer/VideoUpload/uploadFile' element={<div className="auth-inner"><UploadFileC/></div>} />
                            <Route path='/trainer/VideoUpload/videonav' element={<div className="auth-inner"><VideoNavC/></div>} />
                            <Route path='/trainer/VideoUpload/myvideos' element={<div className="csv-inner"><MyVideosC/></div>} />


                            <Route path='/csv/reader' element={<div className="csv-inner"><CsvReader/></div>} />
                            <Route path='/csv/athleteInfo' element={<div className="csv-inner"><GetIDS/></div>} />
                            <Route path='/csv/history' element={<div className="csv-inner data-view"><TestsView/></div>} />
                            <Route path='/csv/stats' element={<div className="csv-inner data-view"><StatsView/></div>} />
                            <Route path='/trainer/myhistory' element={<div className="csv-inner data-view"><EvaluationsView/></div>} />




                        </Routes>
                </div>
                <div><p></p></div>
                <Footer />

            </div>
    );
}
export default Main;