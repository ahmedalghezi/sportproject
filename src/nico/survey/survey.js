/*
By Nicolas Schulz
 */

import { CompressOutlined } from "@mui/icons-material";
import { set } from "date-fns";
import React, {Component} from "react";
import HandelTrainer from "../../DB/handelTrainer";
import PostSignup from "../../DB/postSignup";
import CoachInputDataService from "../../DB/rw"
import './survey.css'


const testdata = [
  { id: 1, videourl: "https://inprove-sport.info/videos/DVV_herren_jap_bra_angriff1.mp4", title: "eins", date: '2021-05-23T22:00:00.000Z' },
  { id: 2, videourl: "https://inprove-sport.info/videos/DVV_herren_jap_bra_angriff1.mp4", title: "zwei", date: '2022-05-23T22:00:00.000Z'},
  { id: 3, videourl: "https://inprove-sport.info/videos/DVV_herren_jap_bra_angriff1.mp4", title: "drei", date: '2022-05-23T10:00:00.000Z'},
]

export default class Survey extends Component {

    constructor(props) {
        super(props);
        this.state = {videoList:[], athlete:'', numberofquestions: 40, answeredquestions: 0, counter:0, seconds: 3, answers:[]};
        this.getData = this.getData.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleFirstButtonClick = this.handleFirstButtonClick.bind(this);
        this.showVideo = this.showVideo.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.questionwithtimer = this.questionwithtimer.bind(this);
        this.questionwithbutton = this.questionwithbutton.bind(this);
        this.questionwithcheckbox = this.questionwithcheckbox.bind(this);
        this.recordAudio = this.recordAudio.bind(this);
        this.timer = undefined;
    }


    componentDidMount() {
      //get id of athlete and videos
        this.getData();
    }

    getData(){
        CoachInputDataService.getAll().then(response => {
            if(response.data.res === "error") {
                const arr = ["connection error"];
                this.setState({videoList: arr});
                return;
            }
            if(response.data.res === "error"){
                alert("Bitte erst anmelden.");
                return;
            }
            if(response.data.res === "ok") {
                this.setState({videoList: response.data.videoList});
            }

        }).catch(e => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten!");
        });
    }
    recordAudio(){

    }
    handleButtonClick(event){
      if(!document.querySelector('input[name="firstquestion"]:checked') || !document.querySelector('input[name="secondquestion"]:checked')){
        alert("Eine oder mehrere Pflichtfragen sind nicht beantwortet worden. Bitte beantworten Sie diese zuerst, um fortzufahren!");
      }else{
        var q1 = document.querySelector('input[name="firstquestion"]:checked').value.slice(-1)-1;
        var q2 = document.querySelector('input[name="secondquestion"]:checked').value.slice(-1)-1;
        this.setState((prevState, props) => ({
            answeredquestions: prevState.counter + 1
        }));
        this.setState((prevState, props) => ({
            counter: prevState.counter + 1
        })); 
        this.setState({ answers: [...this.state.answers, ...[q1,q2]] });
      }
    }
    handleFirstButtonClick(event){
      this.setState((prevState, props) => ({
        counter: prevState.counter + 1
      })); 
    }
    showVideo(id){
        return(
            <video controls="controls" autoPlay="autoplay" controlsList="nodownload" height="630" src={testdata[id].videourl}> </video>
          );
    }
    showCounter(){
        return(
            <div className="timerdiv"><span className="timerspan">{this.state.seconds}</span></div>
          );
    }
    questionwithtimer(){
        return(
            <div>
            <div className="questiontimerdiv"><span className="questiontimerspan">{this.state.seconds}</span></div>
            <div className="questionwithtimer"><span className="questionwithtimerspan">Welche der von Dir genannten Optionen hältst Du für die Beste, um einen Punkt zu erzielen?</span></div>
            </div>
          );
    }
    startTimer(sec) {
        if (this.timer === undefined && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }else if (this.timer === undefined && this.state.seconds <= 0){
            this.setState({seconds: sec});
        }
      }   
    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
          seconds: seconds,
        });
        
        // Check if we're at zero.
        if (seconds === 0) { 
          this.timer = clearInterval(this.timer);
          this.setState((prevState, props) => ({
            counter: prevState.counter + 1
          }));
        }
    }
    questionwithbutton(string){
        return(
            <div>
            <div className=" question-title-container  bg-primary-survey col-xs-12 ">
              <div className=" question-text ">
                  <div id="ls-question-text-188727X126X2629" className=" ls-label-question ">
                      <p><span className="span_question"><u>{string}</u></span></p>
              <p><span className="span_question">Welches sind angemessene Handlungen für den stellenden Spieler, um einen Punkt zu erzielen?</span></p>
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

    render() {
        require("./survey.css")

      return (
        <div>

<div className="progressWrapper">       
<div className="progress" style= {{...{width: "100%"}}}><div className="progress-bar" role="progressbar" style= {{...{width: this.state.answeredquestions/this.state.numberofquestions * 100 +"%", "--to-width": this.state.answeredquestions/this.state.numberofquestions * 100 + "%"}}} aria-valuenow={String(this.state.answeredquestions/this.state.numberofquestions * 100 +"%")} aria-valuemin="0" aria-valuemax="100"></div>{this.state.answeredquestions/this.state.numberofquestions * 100 +"%"}</div>
</div> 
          {
          (this.state.counter === 0)
          ?
          <div>
          <h3>Optionengenerierungsparadigma DVV</h3>
          <p className="p_title"><strong>Optionengenerierungsparadigma</strong></p>
          <p className="p_title"><strong>DVV</strong></p>
          <div className=" survey-welcome  h4 text-primary">
        <p><span  className="p_text">In dieser Studie geht es darum herauszufinden, wie du als Volleyballer Entscheidungen auf dem Platz triffst. Hierfür ist eine hohe Konzentration erforderlich, um zu untersuchen wie DU im Spiel entscheidest.&nbsp;</span></p>

<p><span className="p_text">Dafür werden dir im weiteren Verlauf kurze Videosequenzen aus Volleyballspielen gezeigt. Wir bitten dich während einer Angriffs-Sequenz die Rolle des stellenden Spielers und in einer Abwehr-Sequenz die Rolle des Mittelblockers einzunehmen. Zunächst werden zwei Beispielsequenzen gezeigt, um ein Gefühl für die Aufgabe zu bekommen. Im Anschluss werden dann zuerst die Angriffs-Sequenzen und dann die Abwehr-Sequenzen präsentiert.</span></p>

<p><span className="p_text">Wenn das Video stoppt bleibt das letzte Bild als Standbild der letzten Spielsituation für 10 Sekunden stehen. Du sollst dich dann in den stellenden Spieler (Angriff) oder Mittelblocker (Abwehr) hineinversetzen und entscheiden, welche angemessene Optionen du siehst.</span></p>

<p><span className="p_text">Das heißt, wenn die Szene stoppt ist es deine Aufgabe, wie auf dem Platz, so schnell wie möglich zu entscheiden wie du jetzt handelst.</span></p>

<p><span className="p_text">Die Optionen die du siehst, sollst du dazu direkt in das Mikrofon sprechen. Du kannst bei jeder Szene mehrere Optionen nennen, die du angemessen findest. Dafür hast du bei jeder Szene 10 Sekunden Zeit sobald das Video stoppt.</span></p>

<p><span className="p_text">Danach wirst du gebeten die Optionen welche du genannt hast zu bewerten. Hierbei sollst du angeben welches deine beste Option ist, indem du diese erneut ins Mikrofon sprichst.</span></p>

<p><span className="p_text">Im Anschluss folgt dann eine persönliche Einschätzung zur von dir genannten besten Option.</span></p> 

<p><span className="p_text">Wenn du noch Fragen hast, kannst du dich jetzt an den Versuchsleiter oder die Versuchsleiterin wenden.&nbsp;</span></p>

<p>&nbsp;</p>

<p><span className="p_text">Wenn du bereit bist, kannst du mit den Übungsvideos beginnen.</span></p>

<p><span className="p_text">Klicke auf <strong>WEITER </strong>um mit den Übungsvideos zu starten.</span></p>

<p className="p_title"><span className="p_text">Viel Spaß!</span></p>
        </div>
        <div className=" number-of-questions   text-muted">
        <div className=" question-count-text ">

                                                            In dieser Umfrage sind {this.state.numberofquestions} Fragen enthalten.
                                  </div>
  </div>
        <div className="weiter">
        <button className="weiterButton"onClick={this.handleFirstButtonClick}>Weiter</button>
        </div>
          </div>
          : (this.state.counter === 1)
          ?         
          this.questionwithbutton("Übungsdurchgang 1:")
          : (this.state.counter === 2)
          ? //timer 3 seconds show video
          //this.timer(3)
          (this.startTimer(10), this.showCounter())
          //danach Frage 10 Sekunden
          : (this.state.counter === 3)
          ?
          (this.startTimer(10), this.showVideo(0))
          : (this.state.counter === 4)
          ? (this.startTimer(10), this.questionwithtimer())
          : (this.state.counter === 5)
          ?
          this.questionwithcheckbox()
          : (this.state.counter === 6)
          ?
          this.questionwithbutton("Übungsdurchgang 2:")
          : (this.state.counter === 7)
          ?
          (this.startTimer(3), this.showCounter())
          : (this.state.counter === 8)
          ?
          (this.startTimer(10), this.showVideo(1))
          : (this.state.counter === 9)
          ? (this.startTimer(10), this.questionwithtimer())
          : (this.state.counter === 10)
          ?
          this.questionwithcheckbox()
          : (this.state.counter === 11)
          ?         
          <div>
                    <div className=" question-title-container  bg-primary-survey col-xs-12 ">
                      <div className=" question-text ">
                          <div id="ls-question-text-188727X126X2629" className=" ls-label-question ">
                      <p><span className="span_question">Die Übungsdurchgänge sind nun beendet. Falls du noch Fragen hast, wende dich bitte jetzt an den Versuchsleiter bzw. die Versuchsleiterin.</span></p>
                      <p><span className="span_question">Klicke auf <strong>WEITER</strong>, um mit der Präsentation der Angriffs-Sequenzen zu starten.</span></p>
                          </div>
                      </div>
                    </div>
                    <div className="weiter">
                      <button className="weiterButton"onClick={this.handleFirstButtonClick}>Weiter</button>
                    </div>
          </div>
          : (this.state.counter === 12)
          ?         
          this.questionwithbutton("Angriffs-Sequenz 1:")
          : (this.state.counter === 13)
          ?
          (this.startTimer(3), this.showCounter())
          : (this.state.counter === 14)
          ?
          (this.startTimer(10), this.showVideo(1))
          : (this.state.counter === 15)
          ? (this.startTimer(10), this.questionwithtimer())
          : (this.state.counter === 16)
          ?
          this.questionwithcheckbox()
          : (this.state.counter === 17)
          ?         
          this.questionwithbutton("Angriffs-Sequenz 2:")
          : (this.state.counter === 18)
          ?
          (this.startTimer(3), this.showCounter())
          : (this.state.counter === 19)
          ?
          (this.startTimer(10), this.showVideo(1))
          : (this.state.counter === 20)
          ? (this.startTimer(10), this.questionwithtimer())
          : (this.state.counter === 21)
          ?
          this.questionwithcheckbox()
          : (this.state.counter === 22)
          ?         
          this.questionwithbutton("Angriffs-Sequenz 3:")
          : (this.state.counter === 23)
          ?
          (this.startTimer(3), this.showCounter())
          : (this.state.counter === 24)
          ?
          (this.startTimer(10), this.showVideo(1))
          : (this.state.counter === 25)
          ? (this.startTimer(10), this.questionwithtimer())
          : (this.state.counter === 26)
          ?
          this.questionwithcheckbox()
          : (this.state.counter === 27)
          ?         
          this.questionwithbutton("Angriffs-Sequenz 4:")
          : (this.state.counter === 28)
          ?
          (this.startTimer(3), this.showCounter())
          : (this.state.counter === 29)
          ?
          (this.startTimer(10), this.showVideo(1))
          : (this.state.counter === 30)
          ? 
          (this.startTimer(10), this.questionwithtimer())
          : (this.state.counter === 31)
          ? 
          this.questionwithcheckbox()
          : (this.state.counter === 32)
          ?         
          this.questionwithbutton("Angriffs-Sequenz 5:")
          : (this.state.counter === 33)
          ?
          (this.startTimer(3), this.showCounter())
          : (this.state.counter === 34)
          ?
          (this.startTimer(10), this.showVideo(1))
          : (this.state.counter === 35)
          ? 
          (this.startTimer(10), this.questionwithtimer())
          : (this.state.counter === 36)
          ? 
          this.questionwithcheckbox()
          : console.log("else")
        }
        </div>
      );
    }

}