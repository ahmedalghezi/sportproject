/*
By Nicolas Schulz
 */

import { CompressOutlined } from "@mui/icons-material";
import { set } from "date-fns";
import React, {Component} from "react";
import HandelTrainer from "../../DB/handelTrainer";
import PostSignup from "../../DB/handelCognition";
import CoachInputDataService from "../../DB/rw"
import './survey.css'
import HandelCognition from "../../DB/handelCognition";
import VideoPlayer from "./videoPlayer";
import MicTestComponent from "./MicTestComponent";
import { withRouter } from 'react-router-dom';
// import JSZip from 'jszip';
import axios from 'axios';

import { saveAs } from 'file-saver';

let recorder = null; // Declare recorder variable outside the functions
let csvDownloaded = false;
let zipDownloaded = false;

const recordAudio = () =>
    new Promise(async resolve => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        let mediaRecorder = new MediaRecorder(stream);
        let options = { mimeType: 'audio/webm; codecs=opus' };
        if (MediaRecorder.isTypeSupported(options.mimeType)) {
            mediaRecorder = new MediaRecorder(stream, options);
        } else {
            // Fallback or error handling
            console.error('No supported media types for MediaRecorder.');
        }

        const audioChunks = [];

        mediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
        });

        const start = () => mediaRecorder.start();

        const stop = () =>
            new Promise(resolve => {
                mediaRecorder.addEventListener("stop", () => {
                    const audioBlob = new Blob(audioChunks);
                    resolve({ audioBlob });
                });
                mediaRecorder.stop();
            });

        recorder = { start, stop }; // Assign start and stop functions to the global recorder variable
        resolve(recorder);
    });

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

const Audiostart = async () => {
    await recordAudio();
    if (recorder) {
        recorder.start();
    }
};

let recordedAudios = []; // Store recorded audio blobs

const Audiostop = async (videoID) => {
    return new Promise(async (resolve, reject) => {
        if (!recorder) {
            console.error("Recorder is not initialized.");
            reject("Recorder is not initialized.");
            return;
        }

        console.log("Audiostop id: ", videoID);

        try {
            const { audioBlob } = await recorder.stop();
            recordedAudios.push({ id: videoID, blob: audioBlob }); // Store audio blob along with its corresponding ID
            resolve(audioBlob);
        } catch (error) {
            console.error("Error stopping recorder:", error);
            reject(error);
        }
    });
};


// Function to download audio blobs as a zip file
// const downloadAudioZip = async () => {
//     const zip = new JSZip();
//     console.log("recordedAudios : ", recordedAudios)
//     recordedAudios.forEach(({ id, blob }) => {
//         zip.file(`Video ${id}.mp3`, blob);

//     });

//     // Generate the zip file asynchronously
//     const content = await zip.generateAsync({ type: 'blob' });

//     // Trigger download of the zip file
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(content);
//     link.download = 'audio_recordings.zip';
//     link.click();
// };

class Survey extends Component {

    constructor(props) {
        super(props);
        this.state = {testList: [], athlete:'', discipline: props.discipline,
        answersList:[], audioList:[], questionbutton: false,
        questioncheckbox: false, shvideo: false, questionnumber: 0, showCompletionMessage: false,
        intro: true, betwquestion: false, hquest: false,
        trialquestions: 2,
        alertShown: false,
        micPermission: false,
        micTestPassed: false};
        this.getTests = this.getTests.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.sendQualityRating = this.sendQualityRating.bind(this);
        this.handleFirstButtonClick = this.handleFirstButtonClick.bind(this);
        this.introButton = this.introButton.bind(this);
        this.betweenQuestion = this.betweenQuestion.bind(this);
        this.halfquestion = this.halfquestion.bind(this);
        this.showVideo = this.showVideo.bind(this);
        this.questionwithbutton = this.questionwithbutton.bind(this);
        this.getQuestionText = this.getQuestionText.bind(this);
        this.questionwithcheckbox = this.questionwithcheckbox.bind(this);
        this.uploadSurvey = this.uploadSurvey.bind(this);
        this.onVideoEnd = this.onVideoEnd.bind(this);
        // this.handleMicTestPassed = this.handleMicTestPassed.bind(this);
        this.handleMicPermission = this.handleMicPermission.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.videoRef = React.createRef();

    }


    componentDidMount() {
        if (this.videoRef.current) {
            this.videoRef.current.addEventListener("pause", this.handlePause);
        }
        // PostSignup.isLogin().
        // PostSignup.isLogin().then(response => {

        //     if (response.data.res === "error")
        //         alert("some error has happened");

        //     if (response.data.res === "no") {
        //         window.location.href = window.location.origin+"/reg/sign-in?org=$reg$profile";
        //         return
        //     }
        //     if (response.data.res === "ok") {
                this.getTests();
            // }

        // }).catch(e => {
        //     console.log(e);
        //     alert("some error has happened");
        // });

    }

    componentWillUnmount() {
        if (this.videoRef.current) {
            this.videoRef.current.removeEventListener("pause", this.handlePause);
        }
    }


    sendToServer(){
        //xxxx
    }

    getTests(){
        this.setState({testList: this.props.testData})
    }

    handleMicPermission(micTestResult){
        // Set micTestPassed state to true when "OK" button is clicked
        this.setState({ micPermission  : micTestResult })

    }

/*
    handleButtonClick(event){
        if(!document.querySelector('input[name="firstquestion"]:checked') || !document.querySelector('input[name="secondquestion"]:checked')){
            alert("Eine oder mehrere Pflichtfragen sind nicht beantwortet worden. Bitte beantworten Sie diese zuerst, um fortzufahren!");
        }else{
            var q1 = document.querySelector('input[name="firstquestion"]:checked').value.slice(-1)-1;
            var q2 = document.querySelector('input[name="secondquestion"]:checked').value.slice(-1)-1;
            var next = this.state.questionnumber + 1
            var newanswers = this.state.answersList
            newanswers.push({videoID: this.state.testList[this.state.questionnumber]['videoID'], answers: [q1,q2]})
            {
                this.setState({questioncheckbox: false, questionbutton: true, questionnumber: next, answersList: newanswers
                });
            }
        }
    }*/





    // Update handleButtonClick to call sendQualityRating with necessary data
    handleButtonClick(event) {
        if (!document.querySelector('input[name="firstquestion"]:checked') || !document.querySelector('input[name="secondquestion"]:checked')) {
            alert("Eine oder mehrere Pflichtfragen sind nicht beantwortet worden. Bitte beantworten Sie diese zuerst, um fortzufahren!");
            return;
        }

        // Capture selected self_rate and execute_rate values directly as integers
        const self_rate = parseInt(document.querySelector('input[name="firstquestion"]:checked').value, 10);
        const execute_rate = parseInt(document.querySelector('input[name="secondquestion"]:checked').value, 10);

        console.log("self_rate", self_rate);
        console.log("execute_rate", execute_rate);


        const question_id = this.state.testList[this.state.questionnumber].videoID;
        const { discipline } = this.state;

        this.sendQualityRating({ question_id, discipline, self_rate, execute_rate });

        const nextQuestion = this.state.questionnumber + 1;
        const updatedAnswersList = [...this.state.answersList, { question_id, answers: [self_rate, execute_rate] }];

        this.setState({
            questioncheckbox: false,
            questionbutton: true,
            questionnumber: nextQuestion,
            answersList: updatedAnswersList,
        });
    }










    sendQualityRating({ question_id, discipline, self_rate, execute_rate }) {
        const endpoint = "https://inprove-sport.info/lime/cognition/options/setQualityRate";

        // Capture the screen width
        const screen_width = window.innerWidth || window.screen.width;

        const data = {
            question_id,
            discipline,
            self_rate,
            execute_rate,
            screen_width // Add the screen width to the payload
        };

        return axios.post(endpoint, data)
            .then(response => {
                if (response.data && response.data.status === "ok") {
                    console.log("Quality rating sent successfully:", response.data);
                } else {
                    console.warn("Unexpected response:", response.data);
                }
            })
            .catch(error => {
                console.error("Error sending quality rating:", error);
            });
    }





    introButton(event){
        this.setState({questionbutton: true, intro: false, betwquestion: false, hquest: false});
    }

    handleFirstButtonClick(event){
        this.setState({shvideo: true, questionbutton: false});
    }
    betweenQuestion(){
        var string;
        if(this.state.questionnumber < (this.state.testList.length/2)){
            string = "Angriffs"
        }else{
            string = "Abwehr"
        }
        return(
<div>
    <div className=" question-title-container  bg-primary-survey col-xs-12 ">
                        <div className=" question-text ">
                        <div id="ls-question-text-188727X126X2629" className=" ls-label-question ">
                           <p><span className="span_question">Die Übungsdurchgänge sind nun beendet. Falls du noch Fragen hast, wende dich bitte jetzt an den Versuchsleiter bzw. die Versuchsleiterin.</span></p>
                          <p><span className="span_question">Klicke auf <strong>WEITER</strong>, um mit der Präsentation der {string}-Sequenzen zu starten.</span></p>
                        </div>
                          </div>
                                              </div>
                                          <div className="weiter">
                                      <button className="weiterButton"onClick={this.introButton}>Weiter</button>
                     </div>
                            </div>
        );
    }

    halfquestion(){
        return(
            <div>
            <div className=" survey-welcome  h4 text-primary ">
                <div className=" question-text ">
                    <div id="ls-question-text-188727X126X2629" className=" ls-label-question ">
                        <p><span className="p_text">Sehr gut! Du hast die erste Hälfte der Befragung absolviert. Es werden im Folgenden keine Angriffs-Sequenzen mehr präsentiert, sondern ausschließlich Sequenzen aus der <strong>ABWEHR</strong>-Perspektive.</span></p>
                        <p><span className="p_text">Klicke auf <strong>WEITER</strong>, um mit den Übungsdurchgängen zu starten.</span></p>
                    </div>
                </div>
            </div>
            <div className="weiter">
                <button className="weiterButton"onClick={this.introButton}>Weiter</button>
            </div>
        </div>
        );
    }

    onVideoEnd(){
        (async () => {

            var videoID = this.state.testList[this.state.questionnumber]['videoID'];
             const audioBlob = await Audiostop(videoID);
            if (!audioBlob || audioBlob.size === 0) {
                 console.log("Empty audio recording.");
                return;
            }

        var formData = new FormData();
        formData.append('file', audioBlob, `${videoID}.webm`); // Adjust filename as needed
        // formData.append('file', audioBlob.audioBlob);


        // console.log("formData: ", formData)
        HandelCognition.uploadRecordFiles(formData).then(response => {
            if(response.data.res === "error") {
                const arr = ["connection error"];
                alert("Bitte erst anmelden.");
                return;
            }
            if(response.data.res === "no"){
                alert("Bitte erst anmelden.");
                return;
            }
            if(response.data.res === "ok") {
                console.log("uploadRecordFiles : Success")
                this.setState(prevState => ({
                    audioList: [...prevState.audioList, {videoID: this.state.currentVideoID, recFileName: response.data.filename}]


                }));
                console.log("response.data : ", response.data)

            }
        }).catch(e => {
            console.error(e);
            if (e.response) {
                console.log("Response status code:", e.response.status);
              }
            alert("Es ist ein Fehler aufgetreten!");
        });
    })()
    this.setState({ questioncheckbox: true, shvideo: false });
}



    handlePause() {
        if (this.videoRef.current) {
            this.videoRef.current.play(); // Resume playback if the video is paused
        }
    }



    showVideo(id) {
        const videoSrc = this.state.testList[this.state.questionnumber].url;

        return (
            <div className="survey-video-container">
                <VideoPlayer
                    src={videoSrc}
                    videoRef={this.videoRef}
                    onEnded={this.onVideoEnd}
                    onPlay={Audiostart}
                />
            </div>
        );
    }

    getQuestionText(discipline) {
        switch(discipline) {
            case 'eishockey':
                return (
                    <div>
                        <p><span className="span_question">Welches sind angemessene Handlungsoptionen für den Spieler mit dem Puck, um einen Punkt zu erzielen?</span></p>
                        <p><span className="span_question">Nenne angemessene Handlungsoptionen sobald das Video anhält.</span></p>
                    </div>
                );

            case 'basketball':
                return (
                    <div>
                        <p><span className="span_question">Welches sind angemessene Handlungsoptionen für den Spieler in Ballbesitz, um einen Punkt zu erzielen?</span></p>
                        <p><span className="span_question">Nenne angemessene Handlungsoptionen sobald das Video anhält.</span></p>
                    </div>
                );

            case 'volleyball':
                return (
                    <div>
                        <p><span className="span_question">Welches sind angemessene Handlungsoptionen für den Spieler in Ballbesitz, um einen Punkt zu erzielen?</span></p>
                        <p><span className="span_question">Nenne angemessene Handlungsoptionen sobald das Video anhält.</span></p>
                    </div>
                );

            default:
                return (
                    <div>
                        <p><span className="span_question">Welches sind angemessene Handlungsoptionen für den Spieler in Ballbesitz, um einen Punkt zu erzielen?</span></p>
                        <p><span className="span_question">Nenne angemessene Handlungsoptionen sobald das Video anhält.</span></p>
                    </div>
                );
        }
    }

    // questionwithbutton(){
    //     var string;
    //     var string2;
    //     string2 = "stellenden Spieler";
    //     if(this.state.questionnumber  < this.state.trialquestions){
    //         string = "Übungsdurchgang: " + (this.state.questionnumber + 1);
    //     }else {
    //         string = "Angriffs-Sequenz: " + (this.state.questionnumber + 1);
    //     }

    //     return(
    //         <div>
    //             <div className=" question-title-container  bg-primary-survey col-xs-12 ">
    //                 <div className=" question-text ">
    //                     <div id="ls-question-text-188727X126X2629" className=" ls-label-question ">
    //                         <p><span className="span_question"><u>{string}</u></span></p>
    //                         {/* <p><span className="span_question">Welches sind angemessene Handlungen für den {string2}, um einen Punkt zu erzielen?</span></p>
    //                         <p><span className="span_question">Nenne die angemessenen Handlungen sobald das Video anhält.</span></p> */}
    //                         {this.getQuestionText(this.state.discipline)}
    //                     </div>
    //                 </div>
    //             </div>
    //             <div className="weiter">
    //                 <button className="weiterButton"onClick={this.handleFirstButtonClick}>Weiter</button>
    //             </div>
    //         </div>
    //     );
    // }
    questionwithbutton() {
        const { questionnumber, trialquestions, discipline, showCompletionMessage,testList} = this.state;
        let string, additionalText, string2;

        if (questionnumber < trialquestions) {
            string = "Übungsdurchgang: " + (questionnumber + 1);
            additionalText = this.getQuestionText(discipline);
        }
        else if (questionnumber == trialquestions ) {
            string = "Notiz"
            string2 = (questionnumber - trialquestions + 1)
                additionalText = (
                    <div>
                        <p><span className="span_question">Die Übungsdurchgänge sind geschafft. Wenn der Ablauf klar ist, kannst du jetzt den Test starten und bekommst 12 Angriffs-Sequenzen zu sehen.</span></p>
                        <p><span className="span_question">Klicke auf <strong>WEITER</strong>, um mit der Präsentation der Angriffs-Sequenze: {string2} zu starten.</span></p>
                    </div>
                );
        }
        else {
            string = "Angriffs-Sequenz: " + (questionnumber - trialquestions + 1);
            additionalText = (
                <div>
                    {/* <p><span className="span_question">Die Übungsdurchgänge sind geschafft. Wenn der Ablauf klar ist, kannst du jetzt den Test starten und bekommst 12 Angriffs-Sequenzen zu sehen.</span></p> */}
                    <p><span className="span_question">Klicke auf <strong>WEITER</strong>, um mit der Präsentation der {string} zu starten.</span></p>
                </div>
            );
        }

        return (
            <div>
                <div className="question-title-container bg-primary-survey col-xs-12">
                    <div className="question-text">
                        <div id="ls-question-text-188727X126X2629" className="ls-label-question">
                            <p><span className="span_question"><u>{string}</u></span></p>
                            {additionalText}
                        </div>
                    </div>
                </div>
                <div className="weiter">
                    <button className="weiterButton" onClick={this.handleFirstButtonClick}>Weiter</button>
                </div>
            </div>
        );
    }

    questionwithcheckbox(){
        return(
            <div>
                <div id="group-3" className=" group-outer-container  space-col">
                    <div className=" group-container  space-col">
                        <div id="question2613" className="row array-flexible-row mandatory   question-container  ">
                            <div className=" question-title-container  bg-primary-survey col-xs-12 ">
                                <div className="asterisk pull-left">
                                    <sup className="text-danger fa fa-asterisk small" aria-hidden="true"></sup>
                                    <span className="sr-only text-danger">(Dies ist eine Pflichtfrage.)</span>
                                </div>
                                <div className=" question-text ">
                                    <div id="ls-question-text-188727X119X2613" className=" ls-label-question ">
                                        Wie gut schätzt du die von Dir gewählte BESTE OPTION ein?
                                    </div>
                                </div>
                            </div>
                            <div className="question-help-container text-info col-xs-12 hidden">
                            </div>
                            <div className=" question-valid-container   bg-primary-survey text-info col-xs-12">
                            </div>
                            <div className=" answer-container    col-xs-12">
                                <table className="ls-answers subquestion-list questions-list radio-array table table-bordered table-hover table-array-radio" role="group" aria-labelledby="ls-question-text-188727X119X2613">
                                    <colgroup className="col-responses">
                                        <col className="col-answers"></col>
                                        <col className="ls-col-odd" ></col>
                                        <col className="ls-col-even" ></col>
                                        <col className="ls-col-odd" ></col>
                                        <col className="ls-col-even" ></col>
                                        <col className="ls-col-odd" ></col>
                                        <col className="ls-col-even" ></col>
                                        <col className="ls-col-odd" ></col>
                                        <col className="ls-col-even" ></col>
                                        <col className="ls-col-odd" ></col>
                                        <col className="ls-col-even" ></col>
                                    </colgroup>
                                    <thead aria-hidden="true">
                                    <tr className="ls-heading">
                                        <td className=""></td>
                                        <th className="answer-text">
                                            0 - überhaupt nicht gut
                                        </th>
                                        <th className="answer-text">
                                            1
                                        </th>
                                        <th className="answer-text">
                                            2
                                        </th>
                                        <th className="answer-text">
                                            3
                                        </th>
                                        <th className="answer-text">
                                            4
                                        </th>
                                        <th className="answer-text">
                                            5
                                        </th>
                                        <th className="answer-text">
                                            6
                                        </th>
                                        <th className="answer-text">
                                            7
                                        </th>
                                        <th className="answer-text">
                                            8
                                        </th>
                                        <th className="answer-text">
                                            9 - sehr gut
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr id="javatbd188727X119X2613SQ001" className="answers-list radio-list  ls-even" role="radiogroup" aria-labelledby="answertext188727X119X2613SQ001">
                                        <th id="answertext188727X119X2613SQ001" className="answertext control-label">
                                            <input id="java188727X119X2613SQ001" disabled="disabled" type="hidden" value="" name="java188727X119X2613SQ001"></input>
                                        </th>
                                        <td className="answer_cell_AO01 answer-item radio-item">
                                            <input type="radio" name="firstquestion" value="1" id="answer188727X119X2613SQ001-AO01"></input>
                                            <label for="answer188727X119X2613SQ001-AO01" className="ls-label-xs-visibility">
                                                0 - überhaupt nicht gut
                                            </label>
                                        </td>
                                        <td className="answer_cell_AO02 answer-item radio-item" title="1">
                                            <input type="radio" name="firstquestion" value="2" id="answer188727X119X2613SQ001-AO02"></input>
                                            <label for="answer188727X119X2613SQ001-AO02" className="ls-label-xs-visibility">
                                                1
                                            </label>
                                        </td>
                                        <td className="answer_cell_AO03 answer-item radio-item" title="2">
                                            <input type="radio" name="firstquestion" value="3" id="answer188727X119X2613SQ001-AO03"></input>
                                            <label for="answer188727X119X2613SQ001-AO03" className="ls-label-xs-visibility">
                                                2
                                            </label>
                                        </td>
                                        <td className="answer_cell_AO04 answer-item radio-item" title="3">
                                            <input type="radio" name="firstquestion" value="4" id="answer188727X119X2613SQ001-AO04"></input>
                                            <label for="answer188727X119X2613SQ001-AO04" className="ls-label-xs-visibility">
                                                3
                                            </label>
                                        </td>
                                        <td className="answer_cell_AO05 answer-item radio-item" title="4">
                                            <input type="radio" name="firstquestion" value="5" id="answer188727X119X2613SQ001-AO05"></input>
                                            <label for="answer188727X119X2613SQ001-AO05" className="ls-label-xs-visibility">
                                                4
                                            </label>
                                        </td>
                                        <td className="answer_cell_AO06 answer-item radio-item" title="5">
                                            <input type="radio" name="firstquestion" value="6" id="answer188727X119X2613SQ001-AO06"></input>
                                            <label for="answer188727X119X2613SQ001-AO06" className="ls-label-xs-visibility">
                                                5
                                            </label>
                                        </td>
                                        <td className="answer_cell_AO07 answer-item radio-item">
                                            <input type="radio" name="firstquestion" value="7" id="answer188727X119X2613SQ001-AO07"></input>
                                            <label for="answer188727X119X2613SQ001-AO07" className="ls-label-xs-visibility">
                                                6
                                            </label>
                                        </td>
                                        <td className="answer_cell_AO08 answer-item radio-item">
                                            <input type="radio" name="firstquestion" value="8" id="answer188727X119X2613SQ001-AO08"></input>
                                            <label for="answer188727X119X2613SQ001-AO08" className="ls-label-xs-visibility">
                                                7
                                            </label>
                                        </td>
                                        <td className="answer_cell_AO09 answer-item radio-item" title="8">
                                            <input type="radio" name="firstquestion" value="9" id="answer188727X119X2613SQ001-AO09"></input>
                                            <label for="answer188727X119X2613SQ001-AO09" className="ls-label-xs-visibility">
                                                8
                                            </label>
                                        </td>
                                        <td className="answer_cell_AO10 answer-item radio-item">
                                            <input type="radio" name="firstquestion" value="10" id="answer188727X119X2613SQ001-AO10"></input>
                                            <label for="answer188727X119X2613SQ001-AO10" className="ls-label-xs-visibility">
                                                9 - sehr gut
                                            </label>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div id="question2615" className="row array-flexible-row mandatory   question-container  ">
                            <div className=" question-title-container  bg-primary-survey col-xs-12 ">
                                <div className="asterisk pull-left">
                                    <sup className="text-danger fa fa-asterisk small" aria-hidden="true"></sup>
                                    <span className="sr-only text-danger">(Dies ist eine Pflichtfrage.)</span>
                                </div>
                                <div className=" question-text ">
                                    <div id="ls-question-text-188727X119X2615" className=" ls-label-question ">
                                        Wie gut bist Du in der Lage die von dir gewählte BESTE OPTION auszuführen?
                                    </div>
                                </div>
                            </div>
                            <div className="question-help-container text-info col-xs-12 hidden">
                            </div>
                            <div className=" question-valid-container   bg-primary-survey text-info col-xs-12">
                            </div>
                            <div className=" answer-container    col-xs-12">
                                <table className="ls-answers subquestion-list questions-list radio-array table table-bordered table-hover table-array-radio" role="group" aria-labelledby="ls-question-text-188727X119X2615">
                                    <colgroup className="col-responses">
                                        <col className="col-answers" ></col>
                                        <col className="ls-col-odd" ></col>
                                        <col className="ls-col-even" ></col>
                                        <col className="ls-col-odd" ></col>
                                        <col className="ls-col-even" ></col>
                                        <col className="ls-col-odd" ></col>
                                        <col className="ls-col-even" ></col>
                                        <col className="ls-col-odd" ></col>
                                        <col className="ls-col-even" ></col>
                                        <col className="ls-col-odd" ></col>
                                    </colgroup>
                                    <thead aria-hidden="true">
                                    <tr className="ls-heading">
                                        <td className=""></td>
                                        <th className="answer-text">
                                            0 - überhaupt nicht
                                        </th>
                                        <th className="answer-text">
                                            1
                                        </th>

                                        <th className="answer-text">
                                            2
                                        </th>

                                        <th className="answer-text">
                                            3
                                        </th>

                                        <th className="answer-text">
                                            4
                                        </th>

                                        <th className="answer-text">
                                            5
                                        </th>

                                        <th className="answer-text">
                                            6
                                        </th>

                                        <th className="answer-text">
                                            7
                                        </th>

                                        <th className="answer-text">
                                            8
                                        </th>

                                        <th className="answer-text">
                                            9 - sehr gut
                                        </th>

                                    </tr>
                                    </thead>
                                    <tbody>

                                    <tr id="javatbd188727X119X2615SQ001" className="answers-list radio-list  ls-even" role="radiogroup" aria-labelledby="answertext188727X119X2615SQ001">
                                        <th id="answertext188727X119X2615SQ001" className="answertext control-label">


                                            <input id="java188727X119X2615SQ001" disabled="disabled" type="hidden" value="" name="java188727X119X2615SQ001"></input>
                                        </th>

                                        <td className="answer_cell_AO01 answer-item radio-item">
                                            <input type="radio" name="secondquestion" value="1" id="answer188727X119X2615SQ001-AO01"></input>
                                            <label for="answer188727X119X2615SQ001-AO01" className="ls-label-xs-visibility">
                                                0 - überhaupt nicht
                                            </label>
                                        </td>

                                        <td className="answer_cell_AO02 answer-item radio-item">
                                            <input type="radio" name="secondquestion" value="2" id="answer188727X119X2615SQ001-AO02"></input>
                                            <label for="answer188727X119X2615SQ001-AO02" className="ls-label-xs-visibility">
                                                1
                                            </label>
                                        </td>

                                        <td className="answer_cell_AO03 answer-item radio-item" title="2">
                                            <input type="radio" name="secondquestion" value="3" id="answer188727X119X2615SQ001-AO03"></input>
                                            <label for="answer188727X119X2615SQ001-AO03" className="ls-label-xs-visibility">
                                                2
                                            </label>
                                        </td>

                                        <td className="answer_cell_AO04 answer-item radio-item">
                                            <input type="radio" name="secondquestion" value="4" id="answer188727X119X2615SQ001-AO04"></input>
                                            <label for="answer188727X119X2615SQ001-AO04" className="ls-label-xs-visibility">
                                                3
                                            </label>
                                        </td>


                                        <td className="answer_cell_AO04 answer-item radio-item">
                                            <input type="radio" name="secondquestion" value="4"
                                                   id="answer188727X119X2615SQ001-AO04"></input>
                                            <label htmlFor="answer188727X119X2615SQ001-AO04"
                                                   className="ls-label-xs-visibility">
                                                4
                                            </label>
                                        </td>

                                        <td className="answer_cell_AO06 answer-item radio-item">
                                            <input type="radio" name="secondquestion" value="6" id="answer188727X119X2615SQ001-AO06"></input>
                                            <label for="answer188727X119X2615SQ001-AO06" className="ls-label-xs-visibility">
                                                5
                                            </label>
                                        </td>

                                        <td className="answer_cell_AO07 answer-item radio-item" title="6">
                                            <input type="radio" name="secondquestion" value="7" id="answer188727X119X2615SQ001-AO07"></input>
                                            <label for="answer188727X119X2615SQ001-AO07" className="ls-label-xs-visibility">
                                                6
                                            </label>
                                        </td>

                                        <td className="answer_cell_AO08 answer-item radio-item" title="7">
                                            <input type="radio" name="secondquestion" value="8" id="answer188727X119X2615SQ001-AO08"></input>
                                            <label for="answer188727X119X2615SQ001-AO08" className="ls-label-xs-visibility">
                                                7
                                            </label>
                                        </td>

                                        <td className="answer_cell_AO09 answer-item radio-item" title="8">
                                            <input type="radio" name="secondquestion" value="9" id="answer188727X119X2615SQ001-AO09"></input>
                                            <label for="answer188727X119X2615SQ001-AO09" className="ls-label-xs-visibility">
                                                8
                                            </label>
                                        </td>

                                        <td className="answer_cell_AO10 answer-item radio-item" title="9 - sehr gut">
                                            <input type="radio" name="secondquestion" value="10" id="answer188727X119X2615SQ001-AO10"></input>
                                            <label for="answer188727X119X2615SQ001-AO10" className="ls-label-xs-visibility">
                                                9 - sehr gut
                                            </label>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>

                            </div>

                        </div>

                        <input type="hidden" name="lastgroup" value="188727X119" id="lastgroup"></input>

                    </div>


                </div>

                <div className="weiter">
                    <button className="weiterButton"onClick={this.handleButtonClick}>Weiter</button>
                </div>
            </div>
        );
    }

    getDescriptionText(discipline) {
        switch(discipline) {
            case 'volleyball':
                return (
                    <p><span  className="p_text">In diesem Test geht es darum herauszufinden, wie du als Volleyballspieler Entscheidungen auf dem Feld triffst.

                    <br></br><br></br>
                    Dafür werden dir kurze Videosequenzen aus Volleyballspielen gezeigt. Du bekommst zunächst 2 Beispielsequenzen zum Ausprobieren des Ablaufs. Danach triffst du Entscheidungen für 12 weitere Angriffs-Sequenzen. Bitte nimm in jeder Angriffs-Sequenz die Rolle des Spielers mit dem Ball ein.

                    <br></br><br></br>
                    Sobald ein Video stoppt, bleibt ein Standbild der letzten Spielsituation für 10 Sekunden stehen. Nun ist es deine Aufgabe, so schnell wie möglich zu entscheiden, wie du jetzt handeln könntest. Sprich dafür laut aus welche angemessenen Optionen du für den Spieler mit dem Ball siehst. Du kannst bei jeder Szene mehrere Optionen nennen, die du angemessen findest. Dafür hast du bei jeder Szene 10 Sekunden Zeit. Du musst die Optionen, die du nennst, nicht begründen.

                    <br></br><br></br>
                    Danach wirst du gebeten, aus deinen genannten Optionen, diejenige Option auszuwählen, die du am besten findest. Diese sprichst du erneut ins Mikrofon.

                    <br></br><br></br>
                    Danach bewertest du diese Option und gibst an wie gut du in der Lage bist sie tatsächlich auszuführen.

                    <br></br><br></br>
                    Es folgt nun ein kurzes Video, in dem der Ablauf des Tests dargestellt wird.

                    <br></br><br></br>
                    {/* *Video einfügen*  */}
                    <div className="video-container">
                        <video controls>
                            <source src="https://inprove-sport.info/files/cog/volleyball/showVideos/DVV_Instruktion.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    <br></br><br></br>
                    Wenn du Fragen oder Probleme beim Durchführen des Tests hast, wende dich bitte an L.Will@dshs-koeln.de oder  L.Musculus@dshs-koeln.de, wir werden uns dann zeitnah bei dir melden.

                    <br></br><br></br>
                    Wenn du bereit bist, kannst du mit den Beispielsequenzen beginnen.
                    <br></br><br></br></span></p>
                );

            case 'eishockey':
                return (
                    <p><span  className="p_text">In diesem Test geht es darum herauszufinden, wie du als Eishockeyspieler Entscheidungen auf dem Eis triffst.

                    <br></br><br></br>
                    Dafür werden dir kurze Videosequenzen aus Eishockeyspielen gezeigt. Du bekommst zunächst 2 Beispielsequenzen zum Ausprobieren des Ablaufs. Danach triffst du Entscheidungen für 12 weitere Angriffs-Sequenzen.
                    Bitte nimm in jeder Angriffs-Sequenz die Rolle des Spielers mit dem Puck ein.

                    <br></br><br></br>
                    Sobald ein Video stoppt, bleibt ein Standbild der letzten Spielsituation für 10 Sekunden stehen. Nun ist es deine Aufgabe, so schnell wie möglich zu entscheiden, wie du jetzt handeln könntest. Sprich dafür laut aus welche angemessenen Optionen du für den Spieler mit dem Puck siehst. Du kannst bei jeder Szene mehrere Optionen nennen, die du angemessen findest. Dafür hast du bei jeder Szene 10 Sekunden Zeit. Du musst die Optionen, die du nennst, nicht begründen.

                    <br></br><br></br>
                    Danach wirst du gebeten, aus deinen genannten Optionen, diejenige Option auszuwählen, die du am besten findest. Diese sprichst du erneut ins Mikrofon.

                    <br></br><br></br>
                    Danach bewertest du diese Option und gibst an wie gut du in der Lage bist sie tatsächlich auszuführen.

                    <br></br><br></br>
                    Es folgt nun ein kurzes Video, in dem der Ablauf des Tests dargestellt wird.

                    <br></br><br></br>
                    {/* *Video einfügen*  */}
                    <div className="video-container">
                        <video controls>
                            <source src="https://inprove-sport.info/files/cog/showVideos/instruction.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>


                    <br></br><br></br>
                    Wenn du Fragen oder Probleme beim Durchführen des Tests hast, wende dich bitte an L.Will@dshs-koeln.de oder L.Musculus-Schoenenborn@dshs-koeln.de, wir werden uns dann zeitnah bei dir melden.

                    <br></br><br></br>
                    Wenn du bereit bist, kannst du mit den Beispielsequenzen beginnen.
                    <br></br><br></br></span></p>

                );

            case 'basketball':
                return (
                    <p><span  className="p_text">In diesem Test geht es darum herauszufinden, wie du als Basketballspieler*in Entscheidungen auf dem Platz triffst.

                    <br></br><br></br>
                    Dafür werden dir kurze Videosequenzen aus Basketballspielen gezeigt. Du bekommst zunächst 2 Beispielsequenzen zum Ausprobieren des Ablaufs. Danach triffst du Entscheidungen für 12 weitere Angriffs-Sequenzen.
                    Bitte nimm in jeder Angriffs-Sequenz die Rolle des Spielers mit dem Ball ein.

                    <br></br><br></br>
                    Sobald ein Video stoppt, bleibt ein Standbild der letzten Spielsituation für 10 Sekunden stehen. Nun ist es deine Aufgabe, so schnell wie möglich zu entscheiden, wie du jetzt handeln könntest. Sprich dafür laut aus welche angemessenen Optionen du für den Spieler mit dem Ball siehst. Du kannst bei jeder Szene mehrere Optionen nennen, die du angemessen findest. Dafür hast du bei jeder Szene 10 Sekunden Zeit. Du musst die Optionen, die du nennst, nicht begründen.

                    <br></br><br></br>
                    Danach wirst du gebeten, aus deinen genannten Optionen, diejenige Option auszuwählen, die du am besten findest. Diese sprichst du erneut ins Mikrofon.

                    <br></br><br></br>
                    Danach bewertest du diese Option und gibst an wie gut du in der Lage bist sie tatsächlich auszuführen.

                    <br></br><br></br>
                    Es folgt nun ein kurzes Video, in dem der Ablauf des Tests dargestellt wird.

                    <br></br><br></br>
                    {/* *Video einfügen*  */}
                    <div className="video-container">
                        <video controls>
                            <source src="https://inprove-sport.info/files/cog/basketball/showVideos/DBB_Instruktion.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>


                    <br></br><br></br>
                    Wenn du Fragen oder Probleme beim Durchführen des Tests hast, wende dich bitte an L.Will@dshs-koeln.de oder L.Musculus@dshs-koeln.de, wir werden uns dann zeitnah bei dir melden.

                    <br></br><br></br>
                    Wenn du bereit bist, kannst du mit den Beispielsequenzen beginnen.
                    <br></br><br></br></span></p>

                );

            default:
                return(
                    <p><span  className="p_text">In diesem Test geht es darum herauszufinden, wie du als Volleyballspieler Entscheidungen auf dem Feld triffst.

                    <br></br><br></br>
                    Dafür werden dir kurze Videosequenzen aus Volleyballspielen gezeigt. Du bekommst zunächst 2 Beispielsequenzen zum Ausprobieren des Ablaufs. Danach triffst du Entscheidungen für 12 weitere Angriffs-Sequenzen. Bitte nimm in jeder Angriffs-Sequenz die Rolle des Spielers mit dem Ball ein.

                    <br></br><br></br>
                    Sobald ein Video stoppt, bleibt ein Standbild der letzten Spielsituation für 10 Sekunden stehen. Nun ist es deine Aufgabe, so schnell wie möglich zu entscheiden, wie du jetzt handelst könntest. Sprich dafür laut aus welche angemessenen Optionen du für den Spieler mit dem Ball siehst. Du kannst bei jeder Szene mehrere Optionen nennen, die du angemessen findest. Dafür hast du bei jeder Szene 10 Sekunden Zeit. Du musst die Optionen, die du nennst, nicht begründen.

                    <br></br><br></br>
                    Danach wirst du gebeten, aus deinen genannten Optionen, diejenige Option auszuwählen, die du am besten findest. Diese sprichst du erneut ins Mikrofon.

                    <br></br><br></br>
                    Danach bewertest du diese Option und gibst an wie gut du in der Lage bist sie tatsächlich auszuführen.

                    <br></br><br></br>
                    Es folgt nun ein kurzes Video, in dem der Ablauf des Tests dargestellt wird.

                    <br></br><br></br>
                    {/* *Video einfügen*  */}
                    <div className="video-container">
                        <video controls>
                            <source src="https://inprove-sport.info/files/cog/showVideos/instruction.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    <br></br><br></br>
                    Wenn du Fragen oder Probleme beim Durchführen des Tests hast, wende dich bitte an L.Will@dshs-koeln.de, Wir werden uns dann zeitnah bei dir melden.

                    <br></br><br></br>
                    Wenn du bereit bist, kannst du mit den Beispielsequenzen beginnen.
                    <br></br><br></br></span></p>
                );
        }
    }



    uploadSurvey(){

        if (!csvDownloaded) {
            // Download CSV file
            const headers = Object.keys(this.state.answersList[0]);
            const csv = [
                headers.join(','),
                ...this.state.answersList.map(row => headers.map(header => row[header]).join(','))
            ].join('\n');
            const csvblob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(csvblob);
            const link = document.createElement('a');
            link.setAttribute('href', url);
            // link.setAttribute('download', 'answers.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Mark CSV as downloaded
            csvDownloaded = true;
        }

        // if (!zipDownloaded) {
        //     // Download ZIP file
        //     downloadAudioZip().then(() => {
        //         console.log("Audio recordings zip file downloaded successfully.");
        //     }).catch(error => {
        //         console.error("Error downloading audio recordings zip file:", error);
        //     });

        //     // Mark ZIP as downloaded
        //     zipDownloaded = true;
        // }

        HandelCognition.postTestRes( {arr:this.state.audioList}).then(response => {
            if(response.data.res === "error") {
                const arr = ["connection error"];
                alert("Bitte erst anmelden.");
                return;
            }
            if(response.data.res === "no"){
                alert("Bitte erst anmelden.");
                return;
            }
            if(response.data.res === "ok") {
                console.log("postTestRes : Success")
            }
            console.log("response.data : ", response.data.res)

        }).catch(e => {
            console.error(e);
            if (e.response) {
                console.log("Response status code:", e.response.status);
              }
            alert("Es ist ein Fehler aufgetreten!");
        });

        return(
            <div>Vielen Dank. Du hast den Test erfolgreich beendet!</div>
        );
    }

    render() {
        require("./survey.css")
        const { athleteID } = this.props
        const { testData } = this.props
        const { discipline } = this.state;
        const descriptionText = this.getDescriptionText(discipline);

        // console.log("micPermission : " , (this.state.micPermission))
        // console.log("Window width:", window.innerWidth);
        // console.log("Window height:", window.innerHeight);

        if (!this.state.alertShown && window.innerWidth <= 700 && window.innerHeight <= 1000) {
            this.setState({ alertShown: true });
            alert("Hinweis zur Gerätekompatibilität: Tablet oder Laptop erforderlich (Mindestbildschirmgröße 700X1000)");
            return null;
        }
        else if(!this.state.alertShown)  {
            return (


                <div>

                <div className="progressWrapper">
                    <div className="progress" style= {{...{width: "100%"}}}><div className="progress-bar" role="progressbar" style= {{...{width: this.state.questionnumber/this.state.testList.length * 100 +"%", "--to-width": this.state.questionnumber/this.state.testList.length * 100 + "%"}}} aria-valuenow={String(this.state.questionnumber/this.state.testList.length * 100 +"%")} aria-valuemin="0" aria-valuemax="100"></div>{Math.ceil(this.state.questionnumber/this.state.testList.length * 100) +"%"}</div>
                </div>

                {
                    (this.state.intro)
                        ?



                        <div>
                            <h3>Instruktion für Teilnehmende</h3>
                            <div className=" survey-welcome  h4 text-primary">
                            {descriptionText}

                                {/* <p><span  className="p_text">In dieser Studie geht es darum herauszufinden, wie du als Volleyballer Entscheidungen auf dem Platz triffst. Hierfür ist eine hohe Konzentration erforderlich, um zu untersuchen wie DU im Spiel entscheidest.

<br></br><br></br>


Dafür werden dir im weiteren Verlauf kurze Videosequenzen aus Volleyballspielen gezeigt. Wir bitten dich während der Angriffs-Sequenz die Rolle des stellenden Spielers einzunehmen. Zunächst werden drei Beispielsequenzen gezeigt, um ein Gefühl für die Aufgabe zu bekommen. Im Anschluss werden dann alle Angriffs-Sequenzen nacheinander präsentiert:

<br></br><br></br>

Wenn das Video stoppt, bleibt ein Standbild der letzten Spielsituation für 10 Sekunden stehen. Du sollst dich dann in den stellenden Spieler (Angriff) oder Mittelblocker (Abwehr) hineinversetzen und entscheiden, welche angemessene Optionen du siehst.

<br></br><br></br>


Das heißt, wenn die Szene stoppt, ist es deine Aufgabe, wie auf dem Platz, so schnell wie möglich zu entscheiden wie du jetzt handelst.

<br></br><br></br>


Die Optionen, die du siehst, sollst du dazu direkt in das Mikrofon sprechen. Du kannst bei jeder Szene mehrere Optionen nennen, die du angemessen findest. Dafür hast du bei jeder Szene 10 Sekunden Zeit, sobald das Video stoppt.

<br></br><br></br>
Danach wirst du gebeten die Optionen, welche du genannt hast, zu bewerten. Hierbei sollst du angeben welches deine beste Option ist, indem du diese erneut ins Mikrofon sprichst.

<br></br><br></br>
Im Anschluss folgt dann eine persönliche Einschätzung zur von dir genannten besten Option. Wenn du noch Fragen hast, kannst du dich jetzt an den Versuchsleiter oder die Versuchsleiterin wenden.
<br></br><br></br>
Wenn du bereit bist, kannst du mit den Übungsvideos beginnen. Klicke auf <strong>WEITER</strong>, um mit den Übungsvideos zu starten.
<br></br><br></br>



</span></p> */}

<MicTestComponent onMicTestResult={this.handleMicPermission} />
<br></br><br></br>


  <p className="p_title"><span className="p_text">Viel Spaß!</span></p>
    </div>

<div className=" number-of-questions   text-muted">
                                <div className=" question-count-text ">

                                    In dieser Umfrage sind {this.state.testList.length} Fragen enthalten.
                                </div>
                            </div>
                            <div className="weiter">
                                <button className="weiterButton"onClick={this.introButton}>Weiter</button>
                            </div>
                        </div>
                        : (this.state.questionnumber === this.state.testList.length)
                            ?
                            this.uploadSurvey()
                        : (this.state.hquest)
                            ?
                            this.halfquestion()
                        : (this.state.shvideo)
                            ?
                            this.showVideo(this.state.questionnumber)
                            //danach Frage 10 Sekunden
                        : (this.state.questioncheckbox)
                            ?
                            this.questionwithcheckbox()
                        :(this.state.questionbutton)
                            ?
                            this.questionwithbutton()
                        : (this.state.betwquestion)
                            ?
                            this.betweenQuestion()
                        : null
                        ?
                        this.showVideo(8)
                        : (this.state.counter === 82)
                        ?
                        this.uploadSurvey()
                        : (this.state.counter === 83)
                            ?
                            <div>Vielen Dank für die Teilnahme an dieser Studie!</div>
                            : alert("Ein Fehler ist aufgetreten")

                }
            </div>
                );
            }

    } }

export default Survey;
