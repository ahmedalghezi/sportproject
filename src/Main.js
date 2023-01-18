/*
By Ahmed Al-Ghezi
 */

import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route, } from "react-router-dom";
import Login from "./register/Login";
import SignUp from "./register/SignUp";
import AfterReg from "./register/AfterReg";
import LimeControl from "./register/limeControl"
import UpdateProfile from "./register/UpdateProfile";
import TrainerSheet from "./trainer/sheet";
import CreateTest from "./trainer/createTest";
import AddToMyTests from "./trainer/addToMyTests";
import AddAthlete from "./trainer/addAthlete";
import NavBar from "./register/navBar";
import SignOut from "./register/sign-out";
import EditCoach from "./trainer/editCoach";
import CsvReader from "./csvHandler/CsvReader";
import GetIDS from "./csvHandler/getIDs";
import ForgetPassword from "./register/forgetPassword";
import Footer from "./register/footer";
import ChangePassword from "./register/changePassword";
import UploadFileC from "./trainer/VideoUpload/uploadFile";
import VideoNavC from "./trainer/VideoUpload/uploadVideoNav";
import MyVideosC from "./trainer/VideoUpload/myVideos";
import TestsView from "./csvHandler/TestsView";
import StatsView from "./trainer/aymen/StatsView";
import EvaluationsView from "./trainer/aymen/EvaluationsView";
import UploadConsent from "./register/UploadConsent";
import AcceptTerms from "./register/acceptTerms";
import ApproveTests from "./register/approveTests";
import EmailConfirmed from "./register/emailConfirmed";
import DisplayStudyAccept from "./csvHandler/displayStudyAccept";
import TestProfileC from "./user/profile";
import UploadFile from "./vanessa/fileUpload/fileUpload";
import AdminFileUpload from "./register/admin/adminFileUpload";
import AthleteControl from "./csvHandler/athleteControl";

import WelcomeReg from "./register/WelcomeReg";
import NavBarMobile from "./register/navBarMobile";


import {ShareSharp} from "@mui/icons-material";
import ShareVideo from "./nico/videosharing/shareVideo";
import CreateGroup from "./nico/videosharing/createGroup";
import DisplayVideo from "./nico/videosharing/displayVideo";
import TestsViewCopy from "./vanessa/subsetData/TestsViewCopy";
import TrainerVideo from "./trainer/trainerVideo";
import Survey from "./nico/survey/survey";
import SignUpJiz from "./firebase/signup";


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


                            <Route path='/user/profile' element={<div className="csv-inner"><TestProfileC/></div>} />
                            <Route path='/reg/profile' element={<div className="auth-inner"><TestProfileC/></div>} />

                            <Route path='/reg/approveTests' element={<div className="auth-inner"><ApproveTests/></div>} />

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

                            {/*
                            <Route path='nico/displayVideo' element={<div className="csv-inner"><DisplayVideo/></div>} />
                            <Route path='nico/sharevideo' element={<div className="auth-inner"><ShareVideo/></div>} />
                            <Route path='nico/creategroup' element={<div className="auth-inner"><CreateGroup/></div>} />*/}




                            <Route path='/csv/reader' element={<div className="csv-inner"><CsvReader/></div>} />
                            <Route path='/csv/athleteInfo' element={<div className="csv-inner"><GetIDS/></div>} />
                            <Route path='/csv/history' element={<div className="csv-inner data-view"><TestsView/></div>} />
                            <Route path='/csv/stats' element={<div className="csv-inner data-view"><StatsView/></div>} />
                            <Route path='/csv/displayAccept' element={<div className="wide-inner data-view"><DisplayStudyAccept/></div>} />

                            <Route path='/csv/uploadToAthlete' element={<div className="auth-inner"><AdminFileUpload/></div>} />
                            <Route path='/csv/downloadCsv' element={<div className="csv-inner data-view"><TestsViewCopy/></div>} />

                            <Route path='/trainer/myhistory' element={<div className="csv-inner data-view"><EvaluationsView/></div>} />

                            <Route path='/super/athleteControl' element={<div className="csv-inner data-view"><AthleteControl/></div>} />






                            <Route path='/trainer/videos' element={<div className="csv-inner data-view"><TrainerVideo/></div>} />

                            <Route path='/trainer/videoshare' element={<div className="auth-inner data-view"><ShareVideo/></div>} />
                            <Route path='/trainer/createGroup' element={<div className="auth-inner data-view"><CreateGroup/></div>} />
                            <Route path='/trainer/displayVideo' element={<div className="csv-inner data-view"><DisplayVideo/></div>} />


                            <Route path='/trainer/cognition/options' element={<div className="wide-inner data-view"><Survey/></div>} />

                            <Route path='/jizdan/signup' element={<div className="auth-inner"><SignUpJiz onHideNav={setHideNav}/></div>} />





                        </Routes>
                </div>
                <div><p></p></div>
                <Footer hidden={hideNav}/>

            </div>
    );
}
export default Main;
