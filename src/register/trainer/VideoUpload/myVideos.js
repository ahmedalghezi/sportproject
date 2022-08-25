import React, { Component } from "react";
import ReactPlayer from "react-player";
import "./uploadFile.css"

class MyVideosC extends Component {
  state = {};
  render() {
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
        <div>
            <table>
                <tr>
                    <td className="table-header">Titel</td>
                    <td className="table-header">Datum</td>
                </tr>
                <tr>
                    <td className="table-data">Beispiel eines Titels 1</td>
                    <td className="table-data">Datum des Hochladens von Titel 1</td>
                </tr>
            </table>
        </div>
        <div>
          <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
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
