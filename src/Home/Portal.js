import React, { Component } from "react";
import { useNavigate, Outlet, Link, Navigate, Location } from "react-router-dom";
import './Portal.css';
import Tile from "./Tile";



const tiles = {
    Input: [
        {title: "Trainings Planung", subtitle: "Trainingsbewertung", roles: ["Trainer"], link: "/trainer", svg:  <><svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#b6d7a8" className=" bi bi-calendar-week" viewBox="0 0 16 16">
<path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
<path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
</svg></>, note: "", active: true},
 {title: "Daten Import", subtitle: "Upload in CSV Format", roles: ["TrainerAdmin", "Admin"], link: "/csvimport", svg:  <><svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#b6d7a8" className="bi bi-upload" viewBox="0 0 16 16">
  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
  <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
</svg></>, note: "", active: true},
 {title: "Benutzerverwaltung Trainer", subtitle: "Trainer für Trainingsplanung berechtigen", roles: ["TrainerAdmin"], link: "/editCoach", svg:  <><svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#b6d7a8" className="bi bi-person-plus" viewBox="0 0 16 16">
 <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
 <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
 </svg></>, note: "", active: true},
 {title: "Fragebögen", subtitle: "Wissenschaftliche Datenerhebung", roles: ["Athlete"], link: "https://inprove-sport.info/limesurvey/index.php/admin/authentication/sa/login", svg:  <> <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#b6d7a8" className="bi bi-check2-square" viewBox="0 0 16 16">
 <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
 <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
 </svg></>, note: "", active: true}
],
  Statistics: [{title: "Meine Daten", subtitle: "Benutzerdaten verwalten", roles: ["Trainer", "Admin", "Athlete", "TrainerAdmin"], link: "", svg:  <><svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#a2c4c9" className="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg></>, note: "kommt bald", active: false},
{title: "Daten Export", subtitle: "Download in CSV Format", roles: ["Trainer", "Admin", "Athlete", "TrainerAdmin"], link: "", svg:  <><svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#a2c4c9" className="bi bi-person-circle" viewBox="0 0 16 16">
<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
<path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg></>, note: "in Arbeit", active: true},
{title: "Trainings Ergebnisse", subtitle: "Übersicht", roles: ["Trainer"], link: "", svg:  <><svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#a2c4c9" className="bi bi-person-circle" viewBox="0 0 16 16">
<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
<path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg></>, note: "kommt bald", active: false}],
  Avatar: [{title: "Wissenschaftliche Ergebnisse", subtitle: "Deine Ergebnisse", roles: ["Trainer", "Admin", "Athlete", "TrainerAdmin"], link: "https://www.inprove.info/veroeffentlichungen/", svg:  <><svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#9fc5e8" className="bi bi-journal-richtext" viewBox="0 0 16 16">
  <path d="M7.5 3.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm-.861 1.542 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047L11 4.75V7a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 7v-.5s1.54-1.274 1.639-1.208zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
  <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
  <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
</svg></>, note: "", active: true},
{title: "Trainingsempfehlung", subtitle: "Deine individuelle Leistungsentwicklung", roles: ["Athlete"], link: "https://www.inprove.info/veroeffentlichungen/", svg:  <><svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#9fc5e8" className="bi bi-trophy-fill" viewBox="0 0 16 16">
<path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z"/>
</svg></>, note: "in Arbeit", active: false}]
}
const placeholder = {title: "", subtitle: "", roles: "", link:"", svg:"", note:"", active: true}


class Portal extends Component {
    constructor(props) {
      super(props);
      
    }
  
    render() {
        

      const inputtiles = Object.values(tiles.Input).filter(x => x['roles'].includes(this.props.role) && x['active'])
      for (let i=inputtiles.length; i<4; i++){
      inputtiles.push(placeholder)}
      const statistictiles = Object.values(tiles.Statistics).filter(x => x['roles'].includes(this.props.role) && x['active'])
      for (let i=statistictiles.length; i<4; i++){
          statistictiles.push(placeholder)}
      const avatartiles = Object.values(tiles.Avatar).filter(x => x['roles'].includes(this.props.role) && x['active'])
      for (let i=avatartiles.length; i<4; i++){
          avatartiles.push(placeholder)}
      console.log(inputtiles, statistictiles, avatartiles)

        return (
        <div>
            <Outlet />
            <div className="container-md text-center" >
              <h1 className="p-3 rounded-3">Individualisierte Leistungsentwicklung mit in:prove</h1>
              <div className="row pt-5">
              <div className="col p-1">
                <h2 className="green1">Input</h2>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" fill="#b6d7a8" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </div>
              </div>
              <div className="col p-1">
              <h2 className="green2">Statistics</h2>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" fill="#a2c4c9" className="bi bi-graph-up-arrow" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z"/>
                    </svg>
                </div>
              </div>
              <div className="col p-1">
                <h2 className="green3">Avatar</h2>
                <div>
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  fill="#9fc5e8" x="0px" y="0px" width="100px" height="100px"
                        viewBox="0 0 373.086 373.086"  >
                    <path d="M100.834,174.206l26.57-62.251c7.147-16.741,20.002-38.998,48.993-38.998h20.291c28.995,0,41.848,22.257,48.993,38.998l26.572,62.251c1.951,4.571-0.173,9.859-4.744,11.811c-4.568,1.954-9.859-0.172-11.811-4.744l-26.572-62.251c-8.508-19.934-17.906-28.064-32.438-28.064h-20.291c-14.53,0-23.928,8.131-32.438,28.065l-26.57,62.25c-1.459,3.419-4.785,5.469-8.281,5.469c-1.179,0-2.377-0.232-3.529-0.725C101.007,184.065,98.883,178.777,100.834,174.206zM156.54,31.037c0-16.544,13.46-30.004,30.004-30.004c16.543,0,30.002,13.46,30.002,30.004s-13.459,30.004-30.002,30.004C170,61.041,156.54,47.581,156.54,31.037z M174.54,31.037c0,6.619,5.385,12.004,12.004,12.004c6.618,0,12.002-5.385,12.002-12.004s-5.384-12.004-12.002-12.004C179.925,19.033,174.54,24.418,174.54,31.037z M373.086,363.053c0,4.971-4.029,9-9,9H9c-4.971,0-9-4.029-9-9s4.029-9,9-9h37.749v-59.363c0-4.971,4.029-9,9-9h78.196v-16.124c0-4.971,4.029-9,9-9h18.465v-50.867c0-4.971,4.029-9,9-9s9,4.029,9,9v50.867h14.265v-50.867c0-4.971,4.029-9,9-9s9,4.029,9,9v50.867h18.467c4.971,0,9,4.029,9,9v43.95h78.195c4.971,0,9,4.029,9,9v31.537h37.749C369.057,354.053,373.086,358.082,373.086,363.053z M133.945,303.689H64.749v50.363h69.196V303.689z M221.142,278.565h-69.196v75.487h69.196V278.565z M308.337,331.516h-69.195v22.537h69.195V331.516zM186.544,340.276c4.971,0,9-4.029,9-9v-29.934c0-4.971-4.029-9-9-9s-9,4.029-9,9v29.934C177.544,336.247,181.573,340.276,186.544,340.276z M164.531,126.509c-4.971,0-9,4.029-9,9v42.229c0,0,0,0,0,0.001c0,5.016,4.107,9.083,9.135,8.999h43.755c0.045,0.001,0.09,0.001,0.135,0.001c4.971,0,9-4.029,9-9v-42.23c0-4.971-4.029-9-9-9s-9,4.029-9,9v33.229h-26.024v-33.229C173.531,130.538,169.502,126.509,164.531,126.509z"></path>
                    <g></g>
                    </svg>
                </div>
              </div>
              </div>

              <div className="row">
              <Tile title={inputtiles[0].title} subtitle={inputtiles[0].subtitle} link={inputtiles[0].link} svg={inputtiles[0].svg} note={inputtiles[0].note}/>
              <Tile title={statistictiles[0].title} subtitle={statistictiles[0].subtitle} link={statistictiles[0].link} svg={statistictiles[0].svg} note={statistictiles[0].note}/>
              <Tile title={avatartiles[0].title} subtitle={avatartiles[0].subtitle} link={avatartiles[0].link} svg={avatartiles[0].svg} note={avatartiles[0].note}/>
              </div>

              <div className="row">
              <Tile title={inputtiles[1].title} subtitle={inputtiles[1].subtitle} link={inputtiles[1].link} svg={inputtiles[1].svg} note={inputtiles[1].note}/>
              <Tile title={statistictiles[1].title} subtitle={statistictiles[1].subtitle} link={statistictiles[1].link} svg={statistictiles[1].svg} note={statistictiles[1].note}/>
              <Tile title={avatartiles[1].title} subtitle={avatartiles[1].subtitle} link={avatartiles[1].link} svg={avatartiles[1].svg} note={avatartiles[1].note}/>
              </div>

              <div className="row">
              <Tile title={inputtiles[2].title} subtitle={inputtiles[2].subtitle} link={inputtiles[2].link} svg={inputtiles[2].svg} note={inputtiles[2].note}/>
              <Tile title={statistictiles[2].title} subtitle={statistictiles[2].subtitle} link={statistictiles[2].link} svg={statistictiles[2].svg} note={statistictiles[1].note}/>
              <Tile title={avatartiles[2].title} subtitle={avatartiles[2].subtitle} link={avatartiles[2].link} svg={avatartiles[2].svg} note={avatartiles[2].note}/>
              </div>

              <div className="row">
              <Tile title={inputtiles[3].title} subtitle={inputtiles[3].subtitle} link={inputtiles[3].link} svg={inputtiles[3].svg} note={inputtiles[3].note}/>
              <Tile title={statistictiles[3].title} subtitle={statistictiles[3].subtitle} link={statistictiles[3].link} svg={statistictiles[3].svg} note={statistictiles[1].note}/>
              <Tile title={avatartiles[3].title} subtitle={avatartiles[3].subtitle} link={avatartiles[3].link} svg={avatartiles[3].svg} note={avatartiles[3].note}/>
              </div> 


            </div>
        </div>
          
    
      );
    }
}
export default Portal;

