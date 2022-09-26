/*
Vanessa Meyer
*/

import React, { Component } from "react";
import "./profile.css";



//Profile Template 

class TestProfileC extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
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

          <div className="information-content" >
            {" "}
            <h4>Information</h4>
             
            <button className="btn btn-primary btn-block">
              {" "}
              update profile
            </button>
           
          </div>
<hr></hr>
          <div id="beside">
            <div className="list-one">
              <h4>My Surveys</h4>

              <ul>
                <li>
                  {" "}
                  <a href="">Survey 1</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="">Survey 2</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="">Survey 3</a>{" "}
                </li>
              </ul>
            </div>
            <div className="list-two">
              <h4>My Documents</h4>
              <ul>
                <li>
                  {" "}
                  <a href="">File 1</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="">File 2</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="">File 3</a>{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TestProfileC;
