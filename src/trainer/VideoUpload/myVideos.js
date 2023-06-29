import React, { Component } from "react";
//import ReactPlayer from "react-player";
//import "./uploadFile.css";

  /* ### TODOs ###
   backend instead of example videofiles (here, just as illustration of gallery)
  */

class MyVideosC extends Component {
  state = {
    data: [
      { id: 1, videourl: "", title: "video1" },
      { id: 2, videourl: "", title: "video2" },
      { id: 3, videourl: "", title: "video3" },
      { id: 4, videourl: "", title: "video4" },
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

