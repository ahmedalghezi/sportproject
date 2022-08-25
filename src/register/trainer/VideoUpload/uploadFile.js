import React, { Component } from "react";
import axios from "axios";
import "./uploadFile.css";

class UploadFileC extends Component {
  state = {
    selectedFile: null,
    title: "",
  };

  setTitle = (event) => {
    const target = event.target;
    let value = target.value;

    this.setState({ title: value });
    console.log(this.state.title);
  };
  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  // On file upload (click the upload button)
  onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    // Details of the uploaded file
    console.log(this.state.selectedFile);

    // Request made to the backend api
    // Send formData object
    /*TODO
    axios.post("api/uploadfile", formData);*/
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h6>Details:</h6>
          <p>Videotitel: {this.state.title}</p>
          <p>Dateiname: {this.state.selectedFile.name}</p>
          <p>Typ: {this.state.selectedFile.type}</p>
          <p>Größe: {this.state.selectedFile.size / 1e6} MB</p>
          <p>
            Zuletzt bearbeitet:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <p>{""}</p>
        </div>
      );
    }
  };
  render() {
    return (
      <div>
        <h3>Video hochladen</h3>
        <div className="form-control">
          <div className="form-group">
            <label className="select-file">
              <input
                type="file"
                accept="video/*"
                onChange={this.onFileChange}
              />
              Wähle eine Videodatei
            </label>
          </div>
          <div className="form-group">
            <label>Titel des Videos </label>
            <input type="text" name="title" onChange={this.setTitle} required />
          </div>

          {this.fileData()}
          <div className="form-group">
            <button
              className="btn btn-primary btn-block m-2"
              onClick={this.onFileUpload}
            >
              Hochladen
            </button>
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
      </div>
    );
  }
}

export default UploadFileC;
