/*
By Ahmed Al-Ghezi
 */

import React, {Component, useState} from "react";

import '../register/style.css';
import PostSignup from '../DB/postSignup';
import {useNavigate} from 'react-router-dom';
import AlertDialog from "../utli/alertDialog";

import {processArr} from "../csvHandler/processCSV";
import Sheet from "../csvHandler/xlsSheet/XlsSheet";
import {Alert} from "@mui/material";
import axios from "axios";
import AthletesGrid from "./athleteGrid";
import UploadConsent from "../register/UploadConsent";

import AdminUploadFile from "../register/admin/adminFileUpload";
import HandelTrainer from "../DB/handelTrainer";





function AthleteControl(props) {
    let navigate = useNavigate();
    const hideAll = () => {
        setShowUploadReport(false);
        setShowUploadConsent(false);
    }
    const uploadReport = (ID) =>{
        scrollToTop();
        setMsg("");
        setShowUploadConsent(false);
        setShowProfile(false);
        setAthleteID(ID);
        setShowUploadReport(true);
    }
    const uploadConsent = (ID) =>{
        scrollToTop();
        setShowUploadReport(false);
        setShowProfile(false);
        setAthleteID(ID);
        setShowUploadConsent(true);
        handleDisguisedLogin(ID);
    }
    const showProfileFunc = (ID) =>{
        //scrollToTop();
        handleDisguisedLogin(ID);
        setMsg("");
        setShowUploadReport(false);
        setShowUploadConsent(false);
        setShowProfile(true);
        setAthleteID(ID);
        //navigate("");
        navigate("/user/profile");
    }
    const goToProfile = () => {
        navigate("/user/profile");
    }

    const deleteUser = () => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            PostSignup.deleteMyProfile().then(response => {
                if (response.data.res === "error") {
                    const arr = ["connection error"];
                    return;
                }
                if (response.data.res === "error") {
                    alert("Bitte erst anmelden.");
                    return;
                }
                if (response.data.res === "ok") {
                    alert("Delete successful.")
                }
    
            }).catch(e => {
                console.log(e);
                alert("Es ist ein Fehler aufgetreten!");
            });
        }
    }

    const scrollToTop = () =>{
        setTimeout(function(){
            document.body.scrollTo(0, 0);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
                /* you can also use 'auto' behaviour
                   in place of 'smooth' */
            });
        }.bind(this),2000);

    };


    const handleDisguisedLogin = (ID) =>{
        HandelTrainer.disguisedTrainerLogin({ID:ID}).then(response => {
            if(response.data.res === "ok"){
                setDisguised(true);
                setDisguisedID(ID);
                setMsg("You are logged in as:"+ID);
            }else{
                alert("Es ist ein Fehler aufgetreten! error code: cont54:");
            }
        }).catch(e => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten! error code: cont70");
        });
    }

    const signOut = () =>{
        PostSignup.signOut().then(response => {
            if(response.data.disguised) {
                if (response.data.res === "ok") {
                    setMsg("You have been sign out from that athlete:"+disguisedID);
                    setDisguised(false);
                    setDisguisedID("");
                }
                return;
            }

            if (response.data.res === "ok") {
                setMsg("You have been sign out!");
                setDisguised(false);
                setDisguisedID("");
                setTimeout(function(){
                    setMsg("");
                }.bind(this),2000);

            }
        }).catch(e => {
            console.log(e);
            alert("An error has happened.Error code athleC97");
        });
    }


    const uploadDone = () => {
      setMsg("upload consent is done..");
      hideAll();
    }

    const showConsent = (ID) => {
        window.location.href = "https://inprove-sport.info/" + "files/viewMyFiles/" +ID;
        //window.location.href = "https://inprove-sport.info:3000/" + "files/viewConsent/" +ID;
    }


    const [showUploadReport, setShowUploadReport] = useState(false);
    const [showShowProfile, setShowProfile] = useState(false);
    const [athleteID, setAthleteID] = useState("");
    const [showUploadConsent, setShowUploadConsent] = useState(false);
    const [disguised, setDisguised] = useState(false);
    const [disguisedID, setDisguisedID] = useState("");
    const [msg, setMsg] = useState("");

    return(
    <div>
        <div>
            <table>
                <tr>
                    <td><p>{msg}</p></td><td width="20px">     </td><td><button hidden={!disguised} onClick={signOut}>Sign out</button></td>
                </tr>
            </table>
            <p>.....</p>
        </div>


        <div hidden={!showUploadReport}>
            <AdminUploadFile ID ={athleteID} onUpload={hideAll}/>
        </div>

        <div hidden={!showUploadConsent || !disguised}>
            <UploadConsent ID ={athleteID} uploadDone={uploadDone}/>
        </div>
        <div hidden={!showShowProfile || !disguised}>
            <button onClick={goToProfile}>Go to his profile</button>
        </div>

        <div hidden={!showShowProfile || !disguised}>
            <button onClick={deleteUser}>Delete User</button>
        </div>

        <AthletesGrid {...props} navigate={navigate} uploadReport={uploadReport}  uploadConsent={uploadConsent}
                         showProfile={showProfileFunc} showConsent={showConsent}/>


    </div>);
}

export default AthleteControl;



