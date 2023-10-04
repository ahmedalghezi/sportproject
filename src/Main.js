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
import EvaluationsView2 from "./nico/downloadCoachData/EvaluationsView";
import UploadConsent from "./register/UploadConsent";
import AcceptTerms from "./register/acceptTerms";
import ApproveTests from "./register/approveTests";
import EmailConfirmed from "./register/emailConfirmed";
import DisplayStudyAccept from "./csvHandler/displayStudyAccept";
import TestProfileC from "./user/profile";
import TestProfileC2 from "./nico/profile_redesign/profile_org"

import AdminFileUpload from "./register/admin/adminFileUpload";
import AthleteControl from "./csvHandler/athleteControl";
// import AthleteControl from "./csvHandler/athleteControlTest";

import WelcomeReg from "./register/WelcomeReg";
import NavBarMobile from "./register/navBarMobile";


import ShareVideo from "./nico/videosharing/shareVideo";
import CreateGroup from "./nico/videosharing/createGroup";
import DisplayVideo from "./nico/videosharing/displayVideo";
import TrainerVideo from "./trainer/trainerVideo";
import SignUpJiz from "./firebase/signup";
import VideoPlayer from "./temp-data/optionsGenTemp";
import TestsViewT from "./csvHandler/testViewT";
import TestFolderList from "./user/testFolderList";

import ControlMetabase from "./register/admin/controllMetabase";

import ProfileChart from "./nico/profilechart/profilechart";
import ChangeEmail from "./register/admin/changeEmail";
import ProfileFeat from "./nico/profilechart/loadcharts";
import CreateCharts from "./nico/profilechart/createcharts";


import ProfileC from './vanessa/profile/profileCopy';

import AthleteFileUpload from './user/fileUpload/athleteFileUpload_org';
import AthleteFileUpload_new from './user/fileUpload/athleteFileUpload';
import Survey_Component from "./lime/survey/component_survey";

import {DownloadSubset} from "./csvHandler/downloadSubset";
import EditTest from "./csvHandler/metadata/EditTest";
import ShareVideo2 from "./trainer/VideoUpload/shareVideo2";
import ShareVideo3 from "./trainer/VideoUpload/shareVideo3";
import DisplayVideos2 from "./trainer/VideoUpload/displayVideo2";
import GeneralFileUpload from "./user/fileUpload/athleteFileUpload2";
import AthleteFilesTable from "./user/MyFiles";
import EditSquad from "./register/admin/editSquad";

import AthleteReportsUpload from './prerna/fileUpload/fileUpload';
import AthleteProfileTable from './prerna/fileUpload/athleteProfileTable';
//import Avatar from './nico/avatar/avatar';
import Avatar from './chaithra/avatar/avatarNew';


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
                            <Route path='/csv/vanessa/profile' element={<div className="csv-inner"><ProfileC/></div>} />

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

                            <Route path='/reg/nico/createChart' element={<div className="wide-inner"><CreateCharts/></div>} />
                            <Route path='/reg/nico/ProfileChart' element={<div className="wide-inner"><ProfileChart/></div>} />

                            <Route path='/reg/nico/newProfile' element={<div className="wide-inner"><TestProfileC2/></div>} />
                            <Route path='/user/athleteProfileTable' element={<div className="wide-inner"><AthleteProfileTable/></div>} />
                            {/* <Route path='/reg/nico/Avatar' element={<div className="wide-inner"><Avatar/></div>} /> */}
                            <Route path='/reg/chaithra/Avatar' element={<div className="wide-inner"><Avatar/></div>} />
                            




                            <Route path='/csv/reader' element={<div className="csv-inner"><CsvReader/></div>} />
                            <Route path='/csv/athleteInfo' element={<div className="csv-inner"><GetIDS/></div>} />
                            <Route path='/csv/history' element={<div className="csv-inner data-view"><TestsView/></div>} />

                            <Route path='/csv/history2' element={<div className="csv-inner data-view"><TestsViewT/></div>} />

                            <Route path='/csv/stats' element={<div className="csv-inner data-view"><StatsView/></div>} />
                            <Route path='/csv/displayAccept' element={<div className="wide-inner data-view"><DisplayStudyAccept/></div>} />

                            <Route path='/csv/uploadToAthlete' element={<div className="auth-inner"><AdminFileUpload/></div>} />
                            <Route path='/csv/athleteFileUpload' element={<div className="auth-inner"><GeneralFileUpload/></div>} />
                            <Route path='/csv/downloadCsv' element={<div className="csv-inner data-view"><DownloadSubset/></div>} />

                            <Route path='/trainer/myhistory' element={<div className="csv-inner data-view"><EvaluationsView/></div>} />
                            <Route path='/trainer/nico/myhistory' element={<div className="csv-inner data-view"><EvaluationsView2/></div>} />

                            <Route path='/super/athleteControl' element={<div className="csv-inner data-view"><AthleteControl/></div>} />
                            <Route path='/super/uploadReport' element={<div className="csv-inner data-view"><AthleteReportsUpload/></div>} />

                            <Route path='/reg/links' element={<div className="auth-inner"><TestFolderList/></div>} />



                            <Route path='/trainer/videos' element={<div className="csv-inner data-view"><TrainerVideo/></div>} />

                            <Route path='/trainer/videoshare' element={<div className="auth-inner data-view"><ShareVideo/></div>} />
                            <Route path='/trainer/createGroup' element={<div className="auth-inner data-view"><CreateGroup/></div>} />
                            <Route path='/trainer/displayVideo' element={<div className="csv-inner data-view"><DisplayVideo/></div>} />

                            <Route path='/trainer/cognition/options' element={<div className="wide-inner data-view"><Survey_Component/></div>} />



                            <Route path='/reg/jizdan/reg/' element={<div className="auth-inner"><SignUpJiz onHideNav={hideNavBarFooter}/></div>} />

                            <Route path='/reg/testVide' element={<div className="auth-inner"><VideoPlayer/></div>} />


                            <Route path='/csv/uploadMeta' element={<div className="csv-inner data-view"><EditTest/></div>} />
                            <Route path='/csv/metabase' element={<div className="auth-inner"><ControlMetabase/></div>} />


                            <Route path='/reg/loadCharts' element={<div className="wide-inner"><ProfileFeat/></div>} />
                            <Route path='/reg/changeEmail' element={<div className="auth-inner"><ChangeEmail/></div>} />


                            <Route path='/csv/meta/edit' element={<div className="wide-inner"><EditTest/></div>} />

                            <Route path='/trainer/upload2' element={<div className="auth-inner data-view"><ShareVideo2/></div>} />

                            <Route path='/reg/newUpload' element={<div className="auth-inner data-view"><AthleteFileUpload_new/></div>} />

                            <Route path='/reg/newUpload3' element={<div className="auth-inner data-view"><ShareVideo3/></div>} />
                            <Route path='/reg/diplayVideos2' element={<div className="wide-inner"><DisplayVideos2/></div>} />
                            <Route path='/reg/newUpload4' element={<div className="wide-inner"><GeneralFileUpload/></div>} />

                            <Route path='/reg/newTable' element={<div className="wide-inner"><AthleteFilesTable/></div>} />




                            <Route path='/csv/squadEditor' element={<div className="wide-inner"><EditSquad/></div>} />





                        </Routes>
                </div>
                <div><p></p></div>
                <div hidden={hideNav}>
                    <Footer/>
                </div>

            </div>
    );
}
export default Main;
