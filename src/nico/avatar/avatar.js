/*
By Nicolas Schulz
 */

import React, {Component} from "react";
import HandelTrainer from "../../DB/handelTrainer";
import PostSignup from "../../DB/postSignup";
import CoachInputDataService from "../../DB/rw"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { color } from "@mui/system";
import './avatar.css'
import runner from './runner.png'

const testdata = [
  { id: 1, title: "Blutanalyse", text: "text text text", parameter: [{id: 1, title: "Vit D", value: 0.1}, {id: 2,title: "weiter", value: 0.9}]},
  { id: 2,title: "Mikrobiom", text: "text text text", parameter: [{id: 3,title: "", value: 0.5}]},
  { id: 3,title: "Genetik", text: "text text text", parameter: [{id: 4,title: "", value: 0.1}]},
  { id: 4,title: "Soziologie", text: "text text text", parameter: [{id: 5, title: "chronischer Stress", value: 0.1}, {id: 6,title: "Drop-Out", value: 0.9}]},
  { id: 5,title: 'Icon'},
  { id: 6,title: "Motorik", text: "text text text", parameter: [{id: 7,title: "Y-Balance", value: 0.1}]},
  { id: 7,title: "Motorik", text: "text text text", parameter: [{id: 8,title: "", value: 0.1}]},
  { id: 8,title: "Kognition", text: "text text text", parameter: [{id: 9,title: "", value: 0.1}, {id: 10, title: "Drop-Out", value: 0.9}]},
  { id: 9,title: "Soziologie", text: "text text text", parameter: [{id: 11, title: "", value: 0.1}]},
];

export default class Avatar extends Component {

    constructor(props) {
        super(props);
        this.state = {avatarlist:[]};
        this.getData = this.getData.bind(this);
    }


    componentDidMount() {
        this.getData();
    }

    getData(){
        this.setState({avatarlist: testdata});
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
            this.setState({videoList: testdata});
            console.log(e);
            alert("Es ist ein Fehler aufgetreten!");
        });
    }
    render() {
        require("./avatar.css")

      return (
        <div>
          <h3>Athlet:In</h3>
          <div className="avatargallery">
          <div className="avatar-inner">
                    <div className="avatar-line-container">
                      <svg width="600" height="600">
                        <line x1="260" y1="83" x2="320" y2="83" stroke="black"/>
                        <line x1="260" y1="236" x2="300" y2="236" stroke="black"/>
                        <line x1="260" y1="389" x2="300" y2="389" stroke="black"/>
                        <line x1="260" y1="542" x2="320" y2="542" stroke="black"/>
                        <line x1="517" y1="83" x2="574" y2="83" stroke="black"/>
                        <line x1="537" y1="236" x2="574" y2="236" stroke="black"/>
                        <line x1="537" y1="389" x2="574" y2="389" stroke="black"/>
                        <line x1="517" y1="542" x2="574" y2="542" stroke="black"/>
                        <line x1="400" y1="310" x2="320" y2="83" stroke="black"/>
                        <line x1="400" y1="310" x2="300" y2="236" stroke="black"/>
                        <line x1="400" y1="330" x2="300" y2="389" stroke="black"/>
                        <line x1="400" y1="330" x2="320" y2="542" stroke="black"/>
                        <line x1="450" y1="310" x2="517" y2="83" stroke="black"/>
                        <line x1="450" y1="310" x2="537" y2="236" stroke="black"/>
                        <line x1="450" y1="330" x2="537" y2="389" stroke="black"/>
                        <line x1="450" y1="330" x2="517" y2="542" stroke="black"/>
                      </svg>
                    </div>
                  </div>
            {this.state.avatarlist.map((item, index) => {
              return (
                (index === 4)
                ?
                <div className="avatar-icon">

                <div id="circle"></div>
                </div>
                :
                <div className="avatar-all-content">
                <div className="avatar-content-section">
                    <h1 id="avatar-title">{item.title}</h1>
                    {" "}
                    <span className="avatar-text-field">{item.text}</span>
                    <div className="wrapper">
                    {item.parameter.map((inner, index, row) => {
                      return(
                        <div className="avatar-center">
                        {
                          (index + 1 === row.length && row.length % 2)
                          ?
                            (inner.value < 0.3)
                            ? <div className="progress" style= {{...{width: "85%"}}}><div className="progress-bar bg-danger" role="progressbar" style= {{...{width: inner.value * 100 +"%", "--to-width": inner.value * 100 + "%"}}} aria-valuenow={String(inner.value)} aria-valuemin="0" aria-valuemax="100"></div><span className="avatar-red">{inner.title}</span></div>
                            :(inner.value < 0.6)
                            ? <div className="progress" style= {{...{width: "85%"}}}><div className="progress-bar bg-warning" role="progressbar" style={{...{width: inner.value * 100 +"%", "--to-width": inner.value * 100 + "%"}}} aria-valuenow={String(inner.value)} aria-valuemin="0" aria-valuemax="100">{inner.title}</div></div>
                            : <div className="progress" style= {{...{width: "85%"}}}><div className="progress-bar bg-success" role="progressbar" style={{...{width: inner.value * 100 +"%", "--to-width": inner.value * 100 + "%"}}} aria-valuemin="0" aria-valuemax="100">{inner.title}</div></div>
                          :
                          (inner.value < 0.3)
                            ? <div className="progress" style= {{...{width: "40%"}}}><div className="progress-bar bg-danger" role="progressbar" style= {{...{width: inner.value * 100 +"%", "--to-width": inner.value * 100 + "%"}}} aria-valuenow={String(inner.value)} aria-valuemin="0" aria-valuemax="100"></div><span className="avatar-red">{inner.title}</span></div>
                            :(inner.value < 0.6)
                            ? <div className="progress" style= {{...{width: "40%"}}}><div className="progress-bar bg-warning" role="progressbar" style={{...{width: inner.value * 100 +"%", "--to-width": inner.value * 100 + "%"}}} aria-valuenow={String(inner.value)} aria-valuemin="0" aria-valuemax="100">{inner.title}</div></div>
                            : <div className="progress" style= {{...{width: "40%"}}}><div className="progress-bar bg-success" role="progressbar" style={{...{width: inner.value * 100 +"%", "--to-width": inner.value * 100 + "%"}}} aria-valuemin="0" aria-valuemax="100">{inner.title}</div></div>
                        }
                        </div>
                      );
                    })}
                    </div>
                  </div>               
                </div>
              );
            })}
            </div>
        </div>
      );
    }


}