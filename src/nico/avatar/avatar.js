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

const testdata = [
  { id: 1, title: "Blutanalyse", text: "text text text", parameter: [{id: 1, title: "Vit D", value: 0.1}, {id: 2,title: "weiter", value: 0.9}]},
  { id: 2,title: "Mikrobiom", text: "text text text", parameter: [{id: 3,title: "", value: 0.5}]},
  { id: 3,title: "Genetik", text: "text text text", parameter: [{id: 4,title: "", value: 0.1}]},
  { id: 4,title: "Soziologie", text: "text text text", parameter: [{id: 5, title: "chronischer Stress", value: 0.1}, {id: 6,title: "Drop-Out", value: 0.9}]},
  { id: 5,title: "Motorik", text: "text text text", parameter: [{id: 7,title: "Y-Balance", value: 0.1}]},
  { id: 6,title: "Motorik", text: "text text text", parameter: [{id: 8,title: "", value: 0.1}]},
  { id: 7,title: "Kognition", text: "text text text", parameter: [{id: 9,title: "", value: 0.1}, {id: 10, title: "Drop-Out", value: 0.9}]},
  { id: 8,title: "Soziologie", text: "text text text", parameter: [{id: 11, title: "", value: 0.1}]},
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
          <div className="gallery"> 
            {this.state.avatarlist.map((item, index) => {
              return (
                <div className="all-content">
                <div className="content-section">
                    <h1 id="video-title">{item.title}</h1>
                    {" "}
                    <span className="text-field">{item.text}</span>
                    <div className="wrapper">
                    {item.parameter.map((inner, index, row) => {
                      return(
                        <div className="center">
                        {
                          (index + 1 === row.length && row.length % 2)
                          ?
                            (inner.value < 0.3)
                            ? <div className="progress" style= {{...{width: "85%"}}}><div className="progress-bar bg-danger" role="progressbar" style= {{...{width: inner.value * 100 +"%", "--to-width": inner.value * 100 + "%"}}} aria-valuenow={String(inner.value)} aria-valuemin="0" aria-valuemax="100"></div><span className="red">{inner.title}</span></div>
                            :(inner.value < 0.6)
                            ? <div className="progress" style= {{...{width: "85%"}}}><div className="progress-bar bg-warning" role="progressbar" style={{...{width: inner.value * 100 +"%", "--to-width": inner.value * 100 + "%"}}} aria-valuenow={String(inner.value)} aria-valuemin="0" aria-valuemax="100">{inner.title}</div></div>
                            : <div className="progress" style= {{...{width: "85%"}}}><div className="progress-bar bg-success" role="progressbar" style={{...{width: inner.value * 100 +"%", "--to-width": inner.value * 100 + "%"}}} aria-valuemin="0" aria-valuemax="100">{inner.title}</div></div>
                          :
                          (inner.value < 0.3)
                            ? <div className="progress" style= {{...{width: "40%"}}}><div className="progress-bar bg-danger" role="progressbar" style= {{...{width: inner.value * 100 +"%", "--to-width": inner.value * 100 + "%"}}} aria-valuenow={String(inner.value)} aria-valuemin="0" aria-valuemax="100"></div><span className="red">{inner.title}</span></div>
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
            <div className="icon">
          <img className="CdDD1g" alt="Vektorbild" srcset="https://image.canva.com/e60GVxhV518jo7GgW_L1Uw%3D%3D/criAPDObnbY3yLh0M-zCPw%3D%3D.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIAQYCGKMUH25PN7VSL%2F20221129%2Fus-east-1%2Fs3%2Faws4_request&amp;X-Amz-Date=20221129T214037Z&amp;X-Amz-Expires=53878&amp;X-Amz-Signature=48163ed4d5062101b6048406f47988d701fee1dab6e780f11e9d386e975d2c04&amp;X-Amz-SignedHeaders=host&amp;response-expires=Wed%2C%2030%20Nov%202022%2012%3A38%3A35%20GMT 212w" sizes="(max-width: 212px) 100vw, 212px" src="https://image.canva.com/e60GVxhV518jo7GgW_L1Uw%3D%3D/criAPDObnbY3yLh0M-zCPw%3D%3D.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIAQYCGKMUH25PN7VSL%2F20221129%2Fus-east-1%2Fs3%2Faws4_request&amp;X-Amz-Date=20221129T214037Z&amp;X-Amz-Expires=53878&amp;X-Amz-Signature=48163ed4d5062101b6048406f47988d701fee1dab6e780f11e9d386e975d2c04&amp;X-Amz-SignedHeaders=host&amp;response-expires=Wed%2C%2030%20Nov%202022%2012%3A38%3A35%20GMT"></img>
          </div>
        </div>
      );
    }


}