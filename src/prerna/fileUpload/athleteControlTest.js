import React, { Component } from 'react';

import PostSignup from '../../DB/postSignup';
import HandelTrainer from '../../DB/handelTrainer';

import AthletesGrid from './athleteGrid';
import AdminUploadFile from './adminFileUpload';
import UploadConsent from '../../register/UploadConsent';
import AthleteReportsUpload from './fileUpload';

class AthleteControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            athleteID: '',
            athleteName: '',
            showUploadReport: false,
            showUploadConsent: false,
            showAthleteReportsUpload: false,
            showProfile: false,
            disguised: false,
            disguisedID: '',
            msg: ''
        };
    }

    hideAll = () => {
        this.setState({
            showUploadReport: false,
            showUploadConsent: false
        });
    }

    uploadReport = (ID, name) => {
        this.scrollToTop();
        this.setState({
            msg: "",
            showUploadConsent: false,
            showProfile: false,
            athleteID: ID,
            athleteName: name,
            showUploadReport: true
        });
    }

    uploadConsent = (ID) => {
        this.scrollToTop();
        this.setState({
            showUploadReport: false,
            showProfile: false,
            athleteID: ID,
            showUploadConsent: true
        });
        this.handleDisguisedLogin(ID);
    }

    showProfileFunc = (ID) => {
        this.handleDisguisedLogin(ID);
        this.setState({
            msg: "",
            showUploadReport: false,
            showUploadConsent: false,
            showProfile: true,
            athleteID: ID
        });
        window.open(window.location.origin + "/user/profile", '_blank').focus();
    }

    handleDisguisedLogin = (ID) => {
        HandelTrainer.disguisedTrainerLogin({ ID: ID })
            .then(response => {
                if (response.data.res === "ok") {
                    this.setState({
                        disguised: true,
                        disguisedID: ID,
                        msg: "You are logged in as:" + ID
                    });
                } else {
                    alert("Es ist ein Fehler aufgetreten! error code: cont54:");
                }
            }).catch(e => {
                console.log(e);
                alert("Es ist ein Fehler aufgetreten! error code: cont70");
            });
    }

    signOut = () => {
        PostSignup.signOut().then(response => {
            // ... handle response logic ...

            if (response.data.res === "ok") {
                this.setState({
                    msg: "You have been signed out!",
                    disguised: false,
                    disguisedID: ""
                });
                setTimeout(() => {
                    this.setState({ msg: "" });
                }, 2000);
            }
        }).catch(e => {
            console.log(e);
            alert("An error has occurred. Error code athleC97");
        });
    }

    scrollToTop = () => {
        setTimeout(() => {
            document.body.scrollTo(0, 0);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 2000);
    }

    render() {
        const { athleteID, athleteName, showUploadReport, showUploadConsent, showProfile, msg, disguised } = this.state;

        return (
            <div>
                <div>
                    <table>
                        <tr>
                            <td><p>{msg}</p></td>
                            <td width="20px"></td>
                            <td><button hidden={!disguised} onClick={this.signOut}>Sign out</button></td>
                        </tr>
                    </table>
                    <p>.....</p>
                </div>

                <div hidden={!showUploadReport}>
                    <AdminUploadFile ID={athleteID} athleteName={athleteName} onUpload={this.hideAll} />
                </div>

                <div hidden={!showUploadConsent || !disguised}>
                    <UploadConsent ID={athleteID} uploadDone={this.uploadDone} />
                </div>

                <div hidden={!showProfile || !disguised}>
                    <button onClick={this.goToProfile}>Go to his profile</button>
                </div>

                <div hidden={!showProfile || !disguised}>
                    <button onClick={this.deleteUser}>Delete User</button>
                </div>

                <AthletesGrid {...this.props} uploadReport={this.uploadReport} uploadConsent={this.uploadConsent}
                    showProfile={this.showProfileFunc} showConsent={this.showConsent} />
            </div>
        );
    }
}

export default AthleteControl;
