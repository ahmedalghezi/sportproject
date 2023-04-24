/*
By Nicolas Schulz
 */

import React, {Component} from "react";
import HandelTrainer from "../../DB/handelTrainer";
import PostSignup from "../../DB/postSignup";
import CoachInputDataService from "../../DB/rw"
import { color } from "@mui/system";
import './avatar.css'
import runner from './runner.png'
import { getElement } from "bootstrap/js/src/util";
import { th } from "date-fns/locale";

const testdata = [
  { id: 1, title: "Blutanalyse", text: "text text text", parameter: [{id: 1, title: "Vit D", value: 0.1}, {id: 2,title: "weiter", value: 0.9}]},
  { id: 2,title: "Mikrobiom", text: "text text texttext text texttext text texttext text texttext text texttext text texttext text text", parameter: [{id: 3,title: "", value: 0.5}]},
  { id: 3,title: "Genetik", text: "text text text", parameter: [{id: 4,title: "", value: 0.1}]},
  { id: 4,title: "Soziologie", text: "text text text text text texttext text texttext text texttext text texttext text texttext text text", parameter: [{id: 5, title: "chronischer Stress", value: 0.1}, {id: 6,title: "Drop-Out", value: 0.9}]},
  { id: 6,title: "Motorik", text: "text text text ", parameter: [{id: 7,title: "Y-Balance", value: 0.1}]},
  { id: 7,title: "Motorik", text: "text text texttext text texttext text texttext text texttext text texttext text texttext text text ", parameter: [{id: 8,title: "", value: 0.1}]},
  { id: 8,title: "Kognition", text: "text text text ", parameter: [{id: 9,title: "", value: 0.1}, {id: 10, title: "Drop-Out", value: 0.9}]},
  { id: 9,title: "Soziologie", text: "text text texttext text texttext text text ", parameter: [{id: 11, title: "", value: 0.1}]},
];

export default class Avatar extends Component {

    constructor(props) {
        super(props);
        this.state = {avatarlist:[]};
        this.getData = this.getData.bind(this);
        this.drawhorizontalLines = this.drawhorizontalLines.bind(this);
        this.drawiconLines = this.drawiconLines.bind(this);
        this.drawiconCircles = this.drawiconCircles.bind(this);
        this.setBoundingSVG = this.setBoundingSVG.bind(this);
        this.setColumnGap = this.setColumnGap.bind(this);
        this.drawCircle = this.drawCircle.bind(this);
        this.drawImageIcon = this.drawImageIcon.bind(this);
    }


    componentDidMount() {
        this.getData();
        this.setBoundingSVG();
    }

    setBoundingSVG(){
      if(!document.getElementById("avatargallery")){
        var gal = {height: "600px", width: "600px"}
      }else{
        var gal = document.getElementById("avatargallery").getBoundingClientRect();
      }
      return {height: gal.height, width: gal.width};
    }
    setColumnGap(){
      if(!document.getElementById("avatargallery")){
        var columngap = {gap: 300}
      }else{
        var el = document.getElementById("avatargallery").getBoundingClientRect();
        columngap =  {gap: el.width - 535}
      }
      return {gap: columngap.gap};
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
    drawhorizontalLines(element, index) {
      var x1Position = 0;
      var x2Position = 0;
      var yPosition = 0;
      if(element === null){
        x1Position = 0;
        x2Position = 0
        yPosition = 0;
      }else{
        var con = element.getBoundingClientRect();
        var gal = document.getElementById("avatargallery").getBoundingClientRect();
        yPosition = con.y - gal.y + con.height/2 - 10
        if(con.x - gal.x < gal.width/2){
          x1Position = con.x - gal.x + con.width - 12;
          x2Position = con.x - gal.x + con.width + 20;
        }else{
          x2Position = con.x - gal.x;
          x1Position = con.x - gal.x - 40;
        }
      } 
      return <line x1={x1Position} y1={yPosition} x2={x2Position} y2={yPosition} stroke="black"/>;
  }
  drawiconCircles(element, index) {
    var cxPosition = 0;
    var cyPosition = 0;
    if(element === null){
      cxPosition = 0;
      cyPosition = 0
    }else{
      var con = element.getBoundingClientRect();
      var gal = document.getElementById("avatargallery").getBoundingClientRect();
      var y = con.y - gal.y + con.height/2 - 10
      if(con.x - gal.x < gal.width/2){
        var x = con.x - gal.x + con.width + 20
      }else{
        var x = con.x - gal.x - 40
      }
      var pyth = Math.sqrt(Math.pow(x-gal.width/2, 2) + Math.pow(y - gal.height/2, 2))
      cxPosition = Math.abs(x-gal.width/2)*82/pyth
      cyPosition = Math.sqrt(Math.pow(82, 2) - Math.pow(cxPosition, 2))
      if(x-gal.width/2 > 0){
        cxPosition = gal.width/2 +  cxPosition
      }else{
        cxPosition = gal.width/2 - cxPosition
      }
      if(y-gal.height/2 > 0){
        cyPosition = gal.height/2 +  cyPosition
      }else{
        cyPosition = gal.height/2 - cyPosition
      }
    } 
    return <circle cx={cxPosition} cy={cyPosition} r="10" stroke="gray" fill="gray"/>;
}
  drawiconLines(element, index) {
    var x1Position = 0;
    var x2Position = 0;
    var yPosition = 0;
    var relativey = 0;
    if(element === null){
      x1Position = 0;
      x2Position = 0
      yPosition = 0;
      relativey = 0;
    }else{
      var con = element.getBoundingClientRect();
      var gal = document.getElementById("avatargallery").getBoundingClientRect();
      yPosition = con.y - gal.y + con.height/2 - 10
      if(con.x - gal.x < gal.width/2){
        x2Position = con.x - gal.x + con.width + 20;
      }else{ 
        x2Position = con.x - gal.x - 40;
      }
      x1Position = gal.width/2;
      relativey = gal.height/2;
    }
    return <line x1={x1Position} y1={relativey} x2={x2Position} y2={yPosition} stroke="black"/>;
}
  drawCircle(r, stroke, fill){
    if(document.getElementById("avatargallery")){
      var gal = document.getElementById("avatargallery").getBoundingClientRect();
      var x = gal.width/2;
      var y = gal.height/2;
    }else{
      var x = 0;
      var y = 0;
    }
    return <circle cx={x} cy={y} r={r} stroke={stroke} fill={fill}/>;
  }
  drawImageIcon(){
    if(document.getElementById("avatargallery")){
      var gal = document.getElementById("avatargallery").getBoundingClientRect();
      var x = gal.width/2 - 60;
      var y = gal.height/2 - 60;
    }else{
      var x = 0;
      var y = 0;
    }
    return <image x={x} y={y} width="120" height="120" href={runner}></image>;

  }
    render() {
        require("./avatar.css")

      return (
        <div>
          <div className="avatargallery" id="avatargallery" style= {{...{columnGap: this.setColumnGap().gap + 'px'}}}>
          <div className="avatar-inner">
                    <div className="avatar-line-container">
                      <svg className="avatar-svg" style= {{...{width: this.setBoundingSVG().width},...{height: this.setBoundingSVG().height}}}>
                        {
                          this.state.avatarlist.map((item, index) => {
                            return (
                                this.drawhorizontalLines(document.getElementById("text"+ String(index)), index)
                            );
                        })}
                        {
                          this.state.avatarlist.map((item, index) => {
                            return (
                                this.drawiconLines(document.getElementById("text"+ String(index)), index)
                            );
                        })}
                        {this.drawCircle(82,"black","none")}
                        {this.drawCircle(75,"#DAD2D2","#DAD2D2")}
                        {this.drawImageIcon()}                      
                        {
                          this.state.avatarlist.map((item, index) => {
                            return (
                                this.drawiconCircles(document.getElementById("text"+ String(index)), index)
                            );
                        })}
                      </svg>
                    </div>
                  </div>
            {this.state.avatarlist.map((item, index) => {
              return (
                <div className="avatar-all-content">
                <div className="avatar-content-section">
                    <h1 id="avatar-title">{item.title}</h1>
                    {" "}
                    <span className="avatar-text-field" id= {"text" + String(index)}>{item.text}</span>
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
            }
            )}
            </div>
        </div>
      );
    }


}