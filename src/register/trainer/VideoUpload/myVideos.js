import React, { Component } from "react";
//import ReactPlayer from "react-player";
//import "./uploadFile.css";
import video1 from "./videos/testvideo.mp4";
import video2 from "./videos/testvideo2.mp4";
import video3 from "./videos/testvideo3.mp4";
import video4 from "./videos/testvideo4.mp4";

  /* ### TODOs ###
   backend instead of example videofiles (here, just as illustration of gallery)
  */

class MyVideosC extends Component {
  state = {
    data: [
      { id: 1, videourl: video1, title: "video1" },
      { id: 2, videourl: video2, title: "video2" },
      { id: 3, videourl: video3, title: "video3" },
      { id: 4, videourl: video4, title: "video4" },
    ],
  };

  render() {
      require("./uploadFile.css")
    return (
      <div>
        <h3>Meine Videos</h3>
        <div>
          <label>Liste sortieren nach: </label>
          <select>
            <option>Titel</option>
            <option>Datum</option>
          </select>
        </div>
        
        <div className="gallery">
          {this.state.data.map((item, index) => {
            return (
              <div>
                {" "}
                <div className="video" key={index}>
                  <div className="video-container">
                      {/*<ReactPlayer
                      controls
                      url={item.videourl}
                      width={300}
                      height={200}
                    />*/}
                  </div>
                </div>
                <div className="content-section">
                  <h1 id="video-title">{item.title}</h1>
                </div>
              </div>
            );
          })}
        </div>

        <div className="form-group">
          <button
            className="btn btn-primary btn-block m-2"
            onClick={() => {
              window.location.pathname = "/trainer/VideoUpload/videonav";
            }}
          >
            Zurück
          </button>
        </div>
      </div>
    );
  }
}

export default MyVideosC;

