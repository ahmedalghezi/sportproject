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

import { saveAs } from 'file-saver';


const testdata = [
    { videoID: 1, url: "https://inprove-sport.info:8080/videos/dvv/combined/Angriff/Angriff%201.mp4"},
    { videoID: 2, url: "https://inprove-sport.info:8080/videos/dvv/combined/Angriff/Angriff%202.mp4"},
    { videoID: 3, url: "https://inprove-sport.info:8080/videos/dvv/combined/Angriff/Angriff%203.mp4"},
    { videoID: 4, url: "https://inprove-sport.info:8080/videos/dvv/combined/Angriff/Angriff%204.mp4"},
    { videoID: 5, url: "https://inprove-sport.info:8080/videos/dvv/combined/Abwehr/Abwehr%201.mp4"},
    { videoID: 6, url: "https://inprove-sport.info:8080/videos/dvv/combined/Abwehr/Abwehr%202.mp4"},
    { videoID: 7, url: "https://inprove-sport.info:8080/videos/dvv/combined/Abwehr/Abwehr%203.mp4"},
    { videoID: 8, url: "https://inprove-sport.info:8080/videos/dvv/combined/Abwehr/Abwehr%204.mp4"},
]



const recordAudio = () =>
    new Promise(async resolve => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);

        const audioChunks = [];

        mediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
        });

        const start = () => mediaRecorder.start();

        const stop = () =>
            new Promise(resolve => {
                mediaRecorder.addEventListener("stop", () => {
                    const audioBlob = new Blob(audioChunks);
                    //sendToServer(audioBlob);
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const audio = new Audio(audioUrl);
                    const play = () => audio.play();
                    saveAs(audioBlob, 'recorded-audio.mp4');
                    resolve({ audioBlob, audioUrl, play });

                });

                mediaRecorder.stop();
            });





        resolve({ start, stop });
    });

const sleep = time => new Promise(resolve => setTimeout(resolve, time));
var recorder = undefined;
const Audiostart = async () => {
    recorder = await recordAudio();
    recorder.start();
};
const Audiostop = async () => {
    const audio = await recorder.stop();
    return await audio
    //save audioh
    //URL.revokeObjectURL(url)
};

const saveFile = async (blob) => {
    const a = document.createElement('a');
    a.download = 'my-file.mp3';
    a.href = blob.audioUrl;
    a.addEventListener('click', (e) => {
      setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    });
    a.click();
};



export default class Survey extends Component {

    constructor(props) {
        super(props);
        this.state = {testList: [], athlete:'', answersList:[], audioList:[], questionbutton: false, questioncheckbox: false, shvideo: false, questionnumber: 0, intro: true, betwquestion: false, hquest: false, trialquestions: 3};
        this.getTests = this.getTests.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleFirstButtonClick = this.handleFirstButtonClick.bind(this);
        this.introButton = this.introButton.bind(this);
        this.betweenQuestion = this.betweenQuestion.bind(this);
        this.halfquestion = this.halfquestion.bind(this);
        this.showVideo = this.showVideo.bind(this);
        this.questionwithbutton = this.questionwithbutton.bind(this);
        this.questionwithcheckbox = this.questionwithcheckbox.bind(this);
        this.uploadSurvey = this.uploadSurvey.bind(this);
        this.onVideoEnd = this.onVideoEnd.bind(this);
    }


    componentDidMount() {
        //get id of athlete
        this.getTests();
    }



    sendToServer(){
        //xxxx
    }

    getTests(){
        this.setState({testList: testdata})
        HandelCognition.getTests({id: 0}).then(response => {
            if(response.data.res === "error") {
                const arr = ["connection error"];
                return;
            }
            if(response.data.res === "error"){
                alert("Bitte erst anmelden.");
                return;
            }
            if(response.data.res === "ok") {
                this.setState({testList: response.data})
            }

        }).catch(e => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten!");
        });
    }

    handleButtonClick(event){
        if(!document.querySelector('input[name="firstquestion"]:checked') || !document.querySelector('input[name="secondquestion"]:checked')){
            alert("Eine oder mehrere Pflichtfragen sind nicht beantwortet worden. Bitte beantworten Sie diese zuerst, um fortzufahren!");
        }else{
            var q1 = document.querySelector('input[name="firstquestion"]:checked').value.slice(-1)-1;
            var q2 = document.querySelector('input[name="secondquestion"]:checked').value.slice(-1)-1;
            var next = this.state.questionnumber + 1
            console.log(this.state.questionnumber % (this.state.testList.length/2) === 2);
            if(this.state.questionnumber % (this.state.testList.length/2) === (this.state.trialquestions - 1)){
                this.setState({questioncheckbox: false, betwquestion: true, questionnumber: next        
                });
            }else{
                this.setState({questioncheckbox: false, questionbutton: true, questionnumber: next           
                });
            }
            
            /*
            this.setState((prevState, props) => ({
                questionnumber: prevState.questionnumber + 1,
                questioncheckbox: false,
                questionbutton: true,
                answersList: [...this.state.answersList, ...{videoID: this.state.questionnumber, answers: [q1,q2]}]
            }));
            */
        }
    }
    introButton(event){
        this.setState({questionbutton: true, intro: false, betwquestion: false});
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
            <div className=" question-title-container  bg-primary-survey col-xs-12 ">
                <div className=" question-text ">
                    <div id="ls-question-text-188727X126X2629" className=" ls-label-question ">
                        <p><span className="span_question">Sehr gut! Du hast die erste Hälfte der Befragung absolviert. Es werden im Folgenden keine Angriffs-Sequenzen mehr präsentiert, sondern ausschließlich Sequenzen aus der <strong>ABWEHR</strong>-Perspektive.</span></p>
                        <p><span className="span_question">Klicke auf <strong>WEITER</strong>, um mit den Übungsdurchgängen zu starten.</span></p>
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
            var blob = await Audiostop();
            var fd = new FormData();
           //saveFile(blob);
            //blob.play();
            //fd.append('fname', 'file');
            var wavfromblob = new File([blob], "incomingaudioclip.wav");
            fd.append('file', blob.audioBlob);

            //blob.play();
            HandelCognition.uploadRecordFiles(fd).then(response => {
                if(response.data.res === "error") {
                    const arr = ["connection error"];
                    return;
                }
                if(response.data.res === "error"){
                    alert("Bitte erst anmelden.");
                    return;
                }
                if(response.data.res === "ok") {
                    this.setState(prevState => ({
                        audioList: [...prevState.audioList, {videoID: this.state.currentVideoID, recFileName: response.data.filename}]
                    }))
                }

            }).catch(e => {
                console.log(e);
                alert("Es ist ein Fehler aufgetreten!");
            });
        })()
        this.setState({questioncheckbox: true, shvideo: false});
    }
    showVideo(id){
        console.log(this.state.testList[this.state.questionnumber].url);
        return(
            <div className="survey-video-container">

              <VideoPlayer src={this.state.testList[this.state.questionnumber].url} onEnded={this.onVideoEnd}  onPlay={Audiostart} ></VideoPlayer>
                 </div>
        );
    }


    questionwithbutton(){
        var string;
        var string2;
        if(this.state.questionnumber < (this.state.testList.length/2)){
             if(this.state.questionnumber % (this.state.testList.length/2) < this.state.trialquestions){
                string = "Übungsdurchgang: " + (this.state.questionnumber % (this.state.testList.length/2) + 1);
             }else{
                string = "Angriffs-Sequenz: " + (this.state.questionnumber % (this.state.testList.length/2) - (this.state.trialquestions-1));
             }
             string2 = "stellenden Spieler";
        }else{
            if(this.state.questionnumber % (this.state.testList.length/2) < this.state.trialquestions){               
                string = "Übungsdurchgang: " + (this.state.questionnumber % (this.state.testList.length/2) + 1);
            }else{
               string = "Abwehr-Sequenz: " + (this.state.questionnumber % (this.state.testList.length/2) - (this.state.trialquestions-1));             
            }
            string2 = "Mittelblocker";
        }
        
        return(
            <div>
                <div className=" question-title-container  bg-primary-survey col-xs-12 ">
                    <div className=" question-text ">
                        <div id="ls-question-text-188727X126X2629" className=" ls-label-question ">
                            <p><span className="span_question"><u>{string}</u></span></p>
                            <p><span className="span_question">Welches sind angemessene Handlungen für den {string2}, um einen Punkt zu erzielen?</span></p>
                            <p><span className="span_question">Du hast 10 Sekunden Zeit sobald das Video anhält.</span></p>
                        </div>
                    </div>
                </div>
                <div className="weiter">
                    <button className="weiterButton"onClick={this.handleFirstButtonClick}>Weiter</button>
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
                                            <input type="radio" name="firstquestion" value="AO01" id="answer188727X119X2613SQ001-AO01"></input>
                                            <label for="answer188727X119X2613SQ001-AO01" className="ls-label-xs-visibility">
                                                0 - überhaupt nicht gut
                                            </label>
                                        </td>
                                        <td className="answer_cell_AO02 answer-item radio-item" title="1">
                                            <input type="radio" name="firstquestion" value="AO02" id="answer188727X119X2613SQ001-AO02"></input>
                                            <label for="answer188727X119X2613SQ001-AO02" className="ls-label-xs-visibility">
                                                1
                                            </label>
                                        </td>
                                        <td className="answer_cell_AO03 answer-item radio-item" title="2">
                                            <input type="radio" name="firstquestion" value="AO03" id="answer188727X119X2613SQ001-AO03"></input>
                                            <label for="answer188727X119X2613SQ001-AO03" className="ls-label-xs-visibility">
                                                2
                                            </label>
                                        </td>
                                        <td className="answer_cell_AO04 answer-item radio-item" title="3">
                                            <input type="radio" name="firstquestion" value="AO04" id="answer188727X119X2613SQ001-AO04"></input>
                                            <label for="answer188727X119X2613SQ001-AO04" className="ls-label-xs-visibility">
                                                3
                                            </label>
                                        </td>
                                        <td className="answer_cell_AO05 answer-item radio-item" title="4">
                                            <input type="radio" name="firstquestion" value="AO05" id="answer188727X119X2613SQ001-AO05"></input>
                                            <label for="answer188727X119X2613SQ001-AO05" className="ls-label-xs-visibility">
                                                4
                                            </label>
                                        </td>
                                        <td className="answer_cell_AO06 answer-item radio-item" title="5">
                                            <input type="radio" name="firstquestion" value="AO06" id="answer188727X119X2613SQ001-AO06"></input>
                                            <label for="answer188727X119X2613SQ001-AO06" className="ls-label-xs-visibility">
                                                5
                                            </label>
                                        </td>
                                        <td className="answer_cell_AO07 answer-item radio-item">
                                            <input type="radio" name="firstquestion" value="AO07" id="answer188727X119X2613SQ001-AO07"></input>
                                            <label for="answer188727X119X2613SQ001-AO07" className="ls-label-xs-visibility">
                                                6
                                            </label>
                                        </td>
                                        <td className="answer_cell_AO08 answer-item radio-item">
                                            <input type="radio" name="firstquestion" value="AO08" id="answer188727X119X2613SQ001-AO08"></input>
                                            <label for="answer188727X119X2613SQ001-AO08" className="ls-label-xs-visibility">
                                                7
                                            </label>
                                        </td>
                                        <td className="answer_cell_AO09 answer-item radio-item" title="8">
                                            <input type="radio" name="firstquestion" value="AO09" id="answer188727X119X2613SQ001-AO09"></input>
                                            <label for="answer188727X119X2613SQ001-AO09" className="ls-label-xs-visibility">
                                                8
                                            </label>
                                        </td>
                                        <td className="answer_cell_AO10 answer-item radio-item">
                                            <input type="radio" name="firstquestion" value="AO10" id="answer188727X119X2613SQ001-AO10"></input>
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
                                            <input type="radio" name="secondquestion" value="AO01" id="answer188727X119X2615SQ001-AO01"></input>
                                            <label for="answer188727X119X2615SQ001-AO01" className="ls-label-xs-visibility">
                                                0 - überhaupt nicht
                                            </label>
                                        </td>

                                        <td className="answer_cell_AO02 answer-item radio-item">
                                            <input type="radio" name="secondquestion" value="AO02" id="answer188727X119X2615SQ001-AO02"></input>
                                            <label for="answer188727X119X2615SQ001-AO02" className="ls-label-xs-visibility">
                                                1
                                            </label>
                                        </td>

                                        <td className="answer_cell_AO03 answer-item radio-item" title="2">
                                            <input type="radio" name="secondquestion" value="AO03" id="answer188727X119X2615SQ001-AO03"></input>
                                            <label for="answer188727X119X2615SQ001-AO03" className="ls-label-xs-visibility">
                                                2
                                            </label>
                                        </td>

                                        <td className="answer_cell_AO04 answer-item radio-item">
                                            <input type="radio" name="secondquestion" value="AO04" id="answer188727X119X2615SQ001-AO04"></input>
                                            <label for="answer188727X119X2615SQ001-AO04" className="ls-label-xs-visibility">
                                                3
                                            </label>
                                        </td>


                                        <td className="answer_cell_AO04 answer-item radio-item">
                                            <input type="radio" name="secondquestion" value="AO04"
                                                   id="answer188727X119X2615SQ001-AO04"></input>
                                            <label htmlFor="answer188727X119X2615SQ001-AO04"
                                                   className="ls-label-xs-visibility">
                                                4
                                            </label>
                                        </td>

                                        <td className="answer_cell_AO06 answer-item radio-item">
                                            <input type="radio" name="secondquestion" value="AO06" id="answer188727X119X2615SQ001-AO06"></input>
                                            <label for="answer188727X119X2615SQ001-AO06" className="ls-label-xs-visibility">
                                                5
                                            </label>
                                        </td>

                                        <td className="answer_cell_AO07 answer-item radio-item" title="6">
                                            <input type="radio" name="secondquestion" value="AO07" id="answer188727X119X2615SQ001-AO07"></input>
                                            <label for="answer188727X119X2615SQ001-AO07" className="ls-label-xs-visibility">
                                                6
                                            </label>
                                        </td>

                                        <td className="answer_cell_AO08 answer-item radio-item" title="7">
                                            <input type="radio" name="secondquestion" value="AO08" id="answer188727X119X2615SQ001-AO08"></input>
                                            <label for="answer188727X119X2615SQ001-AO08" className="ls-label-xs-visibility">
                                                7
                                            </label>
                                        </td>

                                        <td className="answer_cell_AO09 answer-item radio-item" title="8">
                                            <input type="radio" name="secondquestion" value="AO09" id="answer188727X119X2615SQ001-AO09"></input>
                                            <label for="answer188727X119X2615SQ001-AO09" className="ls-label-xs-visibility">
                                                8
                                            </label>
                                        </td>

                                        <td className="answer_cell_AO10 answer-item radio-item" title="9 - sehr gut">
                                            <input type="radio" name="secondquestion" value="AO10" id="answer188727X119X2615SQ001-AO10"></input>
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
    uploadSurvey(){
        //download csv
        
        HandelCognition.postTestRes( {arr:this.state.audioList}).then(response => {
            if(response.data.res === "error") {
                const arr = ["connection error"];
                return;
            }
            if(response.data.res === "error"){
                alert("Bitte erst anmelden.");
                return;
            }
            if(response.data.res === "ok") {
                return(
                    <div>Upload erfolgreich. Vielen Dank für die Teilnahme an dieser Studie!</div>
                );
            }

        }).catch(e => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten!");
        });
    }

    render() {
        require("./survey.css")

        return (
            <div>

                <div className="progressWrapper">
                    <div className="progress" style= {{...{width: "100%"}}}><div className="progress-bar" role="progressbar" style= {{...{width: this.state.questionnumber/this.state.testList.length * 100 +"%", "--to-width": this.state.questionnumber/this.state.testList.length * 100 + "%"}}} aria-valuenow={String(this.state.questionnumber/this.state.testList.length * 100 +"%")} aria-valuemin="0" aria-valuemax="100"></div>{Math.ceil(this.state.questionnumber/this.state.testList.length * 100) +"%"}</div>
                </div>
                {
                    (this.state.intro)
                        ?
                        <div>
                            <h3>Optionengenerierungs-Test DVV</h3>
                            <div className=" survey-welcome  h4 text-primary">
                                <p><span  className="p_text">In dieser Studie geht es darum herauszufinden, wie du als Volleyballer Entscheidungen auf dem Platz triffst. Hierfür ist eine hohe Konzentration erforderlich, um zu untersuchen wie DU im Spiel entscheidest. <br></br><br></br>

Dafür werden dir im weiteren Verlauf kurze Videosequenzen aus Volleyballspielen gezeigt. Wir bitten dich während einer Angriffs-Sequenz die Rolle des stellenden Spielers und in einer Abwehr-Sequenz die Rolle des Mittelblockers einzunehmen. Zunächst werden drei Beispielsequenzen gezeigt, um ein Gefühl für die Aufgabe zu bekommen. Im Anschluss werden dann zuerst die Angriffs-Sequenzen und dann die Abwehr-Sequenzen präsentiert.<br></br>
Wenn das Video stoppt, bleibt ein Standbild der letzten Spielsituation für 10 Sekunden stehen. Du sollst dich dann in den stellenden Spieler (Angriff) oder Mittelblocker (Abwehr) hineinversetzen und entscheiden, welche angemessene Optionen du siehst.
<br></br><br></br>
Das heißt, wenn die Szene stoppt ist es deine Aufgabe, wie auf dem Platz, so schnell wie möglich zu entscheiden wie du jetzt handelst.
<br></br><br></br>
Die Optionen die du siehst, sollst du dazu direkt in das Mikrofon sprechen. Du kannst bei jeder Szene mehrere Optionen nennen, die du angemessen findest. Dafür hast du bei jeder Szene 10 Sekunden Zeit sobald das Video stoppt.<br></br>
Danach wirst du gebeten die Optionen welche du genannt hast zu bewerten. Hierbei sollst du angeben welches deine beste Option ist, indem du diese erneut ins Mikrofon sprichst.
<br></br><br></br>
Im Anschluss folgt dann eine persönliche Einschätzung zur von dir genannten besten Option.
Wenn du noch Fragen hast, kannst du dich jetzt an den Versuchsleiter oder die Versuchsleiterin wenden. 
<br></br><br></br>
Wenn du bereit bist, kannst du mit den Übungsvideos beginnen.
Klicke auf <strong>WEITER </strong> um mit den Übungsvideos zu starten.</span></p>

                               

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

}
