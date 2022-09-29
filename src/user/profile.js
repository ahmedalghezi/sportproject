/*
Vanessa Meyer
*/

import React, { Component } from "react";
import "./profile.css";
import PostCSVData from "../DB/postCSV";


//Profile Template

class TestProfileC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filesList: [],
      surveyList: [],
    };
  }

  componentDidMount() {
    this.getFiles();
    this.getSurveys();
  }

  getFiles = () => {
    PostCSVData.getMyFiles()
      .then((response) => {
        if (response.data.res === "error") {
          alert("Some error has happened. Code pro 30");
          return;
        } else {
          this.setState({ filesList: response.data.files });
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Es ist ein Fehler aufgetreten. Code Pro39");
      });
  };
  getSurveys = () => {
    PostCSVData.getMySurveys()
      .then((response) => {
        if (response.data.res === "error") {
          const arr = ["connection error"];
          this.setState({ surveyList: arr });
          return;
        } else {
          this.setState({ surveyList: response.data.files }); //todo
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Es ist ein Fehler aufgetreten. Code Pro55");
      });
  };

  handleFileClick = (event) => {
    event.preventDefault();
    window.location.href = "https://inprove-sport.info/"+"files/viewMyFiles/"+event.target.name;
  };


  render() {
    return (
      <div id="beside">
        <div className="profile-name">
          <div>
            <h3> Max Mustermann </h3>
          </div>
        </div>

        <div>
          <h3>Welcome to your page!</h3>

          <div className="information-content">
            {" "}
            <h4>Information</h4>
            <button onClick={this.handleClick} className="btn btn-primary btn-block">
              {" "}
              update profile
            </button>
          </div>
          <hr></hr>
          <div id="beside">
            <div className="list-one">
              <h4>My Surveys</h4>

              <ul>
              <ul>
                {this.state.surveyList.map((item) => (
                  <li key={item.title}>
                    <a href={item.link}>{item.title}</a></li>
                ))}
              </ul>
              </ul>
            </div>
            <div className="list-two">
              <h4>My Documents</h4>
              <ul>
                {this.state.filesList.map((item) => (
                  <li key={item.file_name} onClick={this.handleFileClick}>
                    <a name={item.file_name} href={"#"+item.file_name}>{item.title}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TestProfileC;

