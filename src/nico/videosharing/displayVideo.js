/*
By Nicolas Schulz
 */

import React, {Component} from "react";
import HandelTrainer from "../../DB/handelTrainer";
import PostSignup from "../../DB/postSignup";
import CoachInputDataService from "../../DB/rw"
import video1 from "./videos/testvideo.mp4";
import video2 from "./videos/testvideo2.mp4";
import video3 from "./videos/testvideo3.mp4";
import video4 from "./videos/testvideo4.mp4";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import handelTrainer from "../../DB/handelTrainer";

const testdata = [
    { id: 1, filename: video1, title: "eins", date: '2021-05-23T22:00:00.000Z' },
    { id: 2, filename: video2, title: "zwei", date: '2022-05-23T22:00:00.000Z'},
    { id: 3, filename: video3, title: "drei", date: '2022-05-23T10:00:00.000Z'},
    { id: 4, filename: video4, title: "vier", date: '2020-05-23T22:00:00.000Z'},
    { id: 5, filename: video3, title: "fünf", date: '2010-05-23T10:00:00.000Z'},
    //{ id: 6, videourl: video4, title: "sechs", date: '2000-05-23T22:00:00.000Z'},
  ]
const vidperpage = 4;

export default class DisplayVideo extends Component {

    constructor(props) {
        super(props);
        this.state = {trainersList:[], videoList:[], currentVideos:[], currentPage: 0, windowWidth: undefined,sortByTitle:false};
        this.getTrainers = this.getTrainers.bind(this);
        this.getAll = this.getAll.bind(this);
        this.orderVideos = this.orderVideos.bind(this);
        this.updateVideoPage = this.updateVideoPage.bind(this);
        this.handleButtonClickLeft = this.handleButtonClickLeft.bind(this);
        this.handleButtonClickRight = this.handleButtonClickRight.bind(this);
    }


    componentDidMount() {
        this.getAll();
        window.addEventListener('resize', this.handleResize);
        this.setState({windowWidth: window.innerWidth});
    }
    handleResize = () => this.setState({
      windowWidth: window.innerWidth
    });

    getTrainers(){
        HandelTrainer.getAllTrainers().then(response => {
            if(response.data.res === "error") {
                const arr = ["connection error"];
                this.setState({trainersList: arr});
                return;
            }
            if(response.data.res === "error"){
                alert("Bitte erst anmelden.");
                return;
            }
            if(response.data.res === "ok") {
                this.setState({trainersList: response.data.trainersList});
            }

        }).catch(e => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten!");
        });
    }

    getAll(){
       // this.updateVideoPage(testdata, this.state.currentPage);
        handelTrainer.getVideos().then(response => {
            if(response.data.res === "error") {
                const arr = ["connection error"];
                this.setState({videoList: arr});
                return;
            }
            if(response.data.res === "no"){
                alert("Bitte erst anmelden.");
                return;
            }
            if(response.data.res === "ok") {
                this.setState({videoList: response.data.videoList});
                this.updateVideoPage(response.data.videoList, this.state.currentPage);
            }
            this.orderVideos();

        }).catch(e => {
            this.setState({videoList: testdata});
            console.log(e);
            alert("Es ist ein Fehler aufgetreten!");
        });
    }


    updateVideoPage(listofvids, curpage){
        if(!listofvids)
            return;
      var getvideos = listofvids.slice(curpage * vidperpage, curpage * vidperpage + vidperpage);
      var ordervid = [];
      if(this.state.windowWidth > 480){
        getvideos.forEach(element => {
          if(!(getvideos.indexOf(element) % 2)){
            ordervid.push(element);
          }
        });
        getvideos.forEach(element => {
          console.log(getvideos.indexOf(element));
          if(getvideos.indexOf(element) % 2){
            ordervid.push(element);
          }
        });
        this.setState({currentVideos: ordervid});
      }else{
        this.setState({currentVideos: getvideos});
      }
    }

    orderVideos(event) {
        let sortByTitle = this.state.sortByTitle;
        if(event){
            sortByTitle = event.target.value ===  "Titel"
            this.setState({sortByTitle:sortByTitle})
        }
      if(sortByTitle){
        var list = this.state.videoList.sort((a, b) => (a.title > b.title) ? 1 : -1);
        this.updateVideoPage(list,this.state.currentPage);
      }else{
        var list = this.state.videoList.sort((a, b) => (a.date > b.date) ? 1 : -1);
        this.updateVideoPage(list,this.state.currentPage);
      }
    }
    handleButtonClickLeft(event) {
      if(this.state.currentPage > 0){
        this.setState({currentPage: this.state.currentPage - 1});
        this.updateVideoPage(this.state.videoList, this.state.currentPage - 1);
      }
    }
    handleButtonClickRight(event) {
      if(this.state.videoList.length /vidperpage > this.state.currentPage + 1){
        this.setState({currentPage: this.state.currentPage + 1});
        this.updateVideoPage(this.state.videoList, this.state.currentPage + 1);
      }
    }
    resize = () => this.forceUpdate()


    render() {
        require("./uploadFile.css")

      return (
        <div>
          <h3>Meine Videos</h3>
          <div>
            <label>Liste sortieren nach: </label>
            <select onChange={this.orderVideos}>
                <option>Datum</option>
              <option>Titel</option>
            </select>
          </div>

          <div className="gallery">
            {this.state.currentVideos.map((item, index) => {
              return (
                <div>
                <div className="content-section">
                    <h1 id="video-title">{item.title}</h1>
                    {" "}
                  <div className="video" key={index}>
                    <div className="video-container" key={index}>
                        <video width="350" height="200"
                            className="video"
                            title={item.title}
                            progress
                            controls
                            src={"https://inprove-sport.info/trainer/streamVideo/"+item.filename}
                        />
                    </div>
                  </div>

                  </div>
                </div>
              );
            })}
            <div>
              {(this.state.currentVideos.length % 2 === 1) ? (
                <div >
                                      <h1 id="video-title"></h1>
                    {" "}
                  <div className="video">
                    <div className="video-container">
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        <div className="arrows">
        <button onClick={this.handleButtonClickLeft}>        <ArrowBackIosIcon>0

</ArrowBackIosIcon></button>
        <button onClick={this.handleButtonClickRight}>
        <ArrowForwardIosIcon>

        </ArrowForwardIosIcon>
        </button>
        </div>
        </div>
      );
    }


}
