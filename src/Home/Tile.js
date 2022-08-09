import React, { Component } from "react";
import {Link} from "react-router-dom";
import './Portal.css';


let element;
let hidden = "col p-4";
let notification = "";


class Tile extends Component {
    constructor(props) {
        super(props);
      }
    render()  {
        if (this.props.title.length < 1){
             hidden = "col p-4 hide";
         }

        if (this.props.note.length > 2)
        {
            notification = <span className="badge bg-warning position-absolute rounded-pill top-0 start-100 translate-middle p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list-task" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z"/>
            <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z"/>
            <path fillRule="evenodd" d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z"/>
            </svg>{this.props.note}</span>
        }
        
        if (this.props.link.substring(0,4) === "http"){
                element = (<a href={this.props.link}>
                    <div className="card-body tile position-relative">{notification}
                                    <h5 className="card-title">{this.props.title}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted pb-3">{this.props.subtitle}</h6>
                                    <p className="card-text"></p>
                                    {this.props.svg}
                                    </div>
                </a>)
                
        } 
        
        else {
                element =  ( <Link to={this.props.link}>
                <div className="card-body tile position-relative">{notification}
                                <h5 className="card-title">{this.props.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted pb-3">{this.props.subtitle}</h6>
                                <p className="card-text"></p>
                                {this.props.svg}
                                </div>
            </Link>)};


      return (
            <div className={hidden}>
                    {element}
            </div>)
    }
  }

  export default Tile;