/*
By Ahmed Al-Ghezi, Vanessa Meyer
 */

import React, { Component } from "react";

import "../../register/style.css";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import PostCSVData from "../../DB/postCSV";

class UploadFileC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      error: false,
      file: null,
      title: "",
      folders: [],
      selectedFolder: "",
      newFolderName: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    //if (this.props.ID) this.setState({ ID: this.props.ID });
    /* if (this.props.key) {
      this.setState({ key: this.props.key });
    } */
    this.loadFolders();
  }

  loadFolders = () =>{
    const url = 'https://inprove-sport.info/files/athlete_folders';
    fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          this.setState({
            folders: data,
          });
        })
        .catch((error) => {
          console.error('There has been a problem with your fetch operation:', error);
        });
  }

  handleChange(event) {
    const target = event.target;
    let value = target.value;
    const name = target.name;
    if (name === "readTerms") value = target.checked;
    this.setState({
      [name]: value,
    });
  }

  checkInput(stateData) {
    if (stateData.file === null) {
      alert("please select a file");
      return false;
    }
    /* if (this.state.ID === "" && !this.props.ID) {
      alert("please select an athlete ID");
      return false;
    } */
    if (this.state.title === "") {
      //alert("please give file tilte");
      //return false;
    }

    return true;
  }

  saveFileName = (fileName) => {
    /* let IDa = this.props.ID;
    if (!IDa) IDa = this.state.ID; */
    PostCSVData.saveMyFileName({
      fileName: fileName,
      //ID: IDa,
      title: this.state.title,
      selectedFolder: this.state.selectedFolder,
      newFolderName: this.state.newFolderName
      //key: this.state.key,
    })
      .then((response) => {
        console.log(response.data.res);
        if (response.data.res === "error") alert("some error has happened");
        if (response.data.res === "no")
          window.location.href =
            window.location.origin + "/reg/sign-in?org=$csv$athleteFileUpload";
        if (response.data.res === "ok") {
          alert("Datei erfolgreich hochgeladen");
          if (this.props.onUpload) this.props.onUpload();
          this.setState({
            file: null,
            title: "",
            success: false,
            error: false,
            newFolderName:""
          });
          const form = document.getElementById("uploadConsent");
          const inputs = form.querySelectorAll("input");
          inputs.forEach((input) => {
            if (input.name === "title") input.value = "";
            if (input.type === "file") input.value = null;
          });
          this.loadFolders();
        }
      })
      .catch((e) => {
        console.log(e);
        alert("some error has happened...code 70");
      });
  };

  handleSubmit(event) {
    event.preventDefault();
    if (!this.checkInput(this.state)) return;
    const data = new FormData();
    data.append("file", this.state.file);

    PostCSVData.myFileUpload(data)
      .then((response) => {
        console.log(response.data.res);
        if (response.data.res === "error")
          alert("some error has happened. code 84");
        if (response.data.res === "no")
          window.location.href =
            window.location.origin + "/reg/sign-in?org=$csv$athleteFileUpload";
        if (response.data.res === "ok" && response.data.filename) {
          this.saveFileName(response.data.filename);
        }
      })
      .catch((e) => {
        console.log(e);
        alert("some error has happened..code 92");
      });
  }

  handleFileUpload = (event) => {
    event.preventDefault();
    console.log(event.target.files[0]);
    this.setState({ file: event.target.files[0] });
    let fileName = event.target.files[0].name;
    if(this.state.title === "")
      this.setState({title:fileName});
  };




  handleSelectChange(e) {
    this.setState({ selectedFolder: e.target.value });
  }

  handleInputChange(e) {
    this.setState({ newFolderName: e.target.value });
  }


  render() {
    return (
      <div>
        <h3>Dateien hochladen</h3>
        <form id="uploadConsent" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="folderTitle">Gib deiner Datei einen Titel (optional):</label>
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>

          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg,.gif,.xls"
            onChange={this.handleFileUpload}
          />
          <br/><br/>
          Du kannst Deine Datei einem Ordner zuweisen:
          <br/>
          <label htmlFor="folderSelect">Wähle einen Ordner:</label>
          <select value={this.state.selectedFolder} onChange={this.handleSelectChange}>
            {this.state.folders.map((folder, index) => (
                <option key={index} value={folder.folder_name}>
                  {folder.folder_name}
                </option>
            ))}
            <option value="new">Neuen Ordner erstellen...</option>
          </select>
          {this.state.selectedFolder === "new" && (
              <input
                  type="text"
                  className="form-control"
                  placeholder="Neuer Ordnername"
                  value={this.state.newFolderName}
                  onChange={this.handleInputChange}
              />
          )}


          <br />
          <button type={"submit"} className="btn btn-primary btn-block">
            hochladen
          </button>
          <Alert severity="success" hidden={!this.state.success}>
            {this.state.successMsg}
          </Alert>
          <Alert severity="error" hidden={!this.state.error}>
            {this.state.errorMsg}
          </Alert>
        </form>
      </div>
    );
  }
}

function AthleteFileUpload_new(props) {
  let navigate = useNavigate();
  return <UploadFileC {...props} navigate={navigate} />;
}

export default AthleteFileUpload_new;
/*
<div className="form-group" hidden={this.props.key}>
            <label>Key</label>
            <input
              type="text"
              className="form-control"
              placeholder="key"
              name="key"
              onChange={this.handleChange}
            />
          </div>

          <br />
*/
/*
  <div className="form-group" hidden={this.props.ID}>
            <label>Athlete ID</label>
            <input
              type="number"
              className="form-control"
              placeholder="ID"
              name="ID"
              onChange={this.handleChange}
              value={this.state.ID}
            />
          </div>
          <br />
          <div hidden={!this.props.ID}>
            <p>To Athlete ID: {this.props.ID}</p>
          </div>
*/
