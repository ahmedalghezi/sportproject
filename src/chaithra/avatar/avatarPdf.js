/*
By Chaithra
 */

import React, { Component, useEffect } from "react";
import '../../prerna/avatar.css';
import AthleteProfileTable, { json_data } from '../../prerna/fileUpload/athleteProfileTable';
import ColorBar from "../../prerna/fileUpload/colorBar";
import CoachInputDataService from "../../DB/rw";

<AthleteProfileTable data={json_data} />

const testdata = [
    { id: 1, title: "Anthropometrie", text: "text text text", parameter: [{id: 1, title: "Vit D", value: 0.1}, {id: 2,title: "weiter", value: 0.9}]},
    { id: 2,title: "Motorik", text: "text text texttext text texttext text texttext text texttext text texttext text texttext text text", parameter: [{id: 3,title: "", value: 0.5}]},
    { id: 3,title: "Blutanalyse", text: "text text text", parameter: [{id: 4,title: "", value: 0.1}]},
    { id: 4,title: "Ernährung", text: "text text text text text texttext text texttext text texttext text texttext text texttext text text", parameter: [{id: 5, title: "chronischer Stress", value: 0.1}, {id: 6,title: "Drop-Out", value: 0.9}]},
    { id: 5,title: "Kognition", text: "text text text ", parameter: [{id: 7,title: "Y-Balance", value: 0.1}]},
    { id: 6,title: "Mikrobiom", text: "text text texttext text texttext text texttext text texttext text texttext text texttext text text ", parameter: [{id: 8,title: "", value: 0.1}]},
    { id: 7,title: "Psychosoziale Faktoren", text: "text text text ", parameter: [{id: 9,title: "", value: 0.1}, {id: 10, title: "Drop-Out", value: 0.9}]},
    { id: 8,title: "Zyklus", text: "text text texttext text texttext text text ", parameter: [{id: 11, title: "", value: 0.1}]}
];

class AvatarPdf extends React.Component {

    constructor(props) {
        super(props);
        this.state =  {

            avatarlist: testdata,
            sectionData: null,
            };
        this.tableRef = React.createRef();
        this.getData = this.getData.bind(this);
        this.handleTableHeight = this.handleTableHeight.bind(this);
    }

        // Function to handle table height calculation
        handleTableHeight = (height) => {
            if (this.state.tableHeight !== height) {
                this.setState({ tableHeight: height });
            }
        };

    componentDidMount() {
        this.getData();
        const lastTableIndex = this.state.avatarlist.length - 1;

    }

    componentDidUpdate() {
        if (this.tableRef.current && this.state.tableHeight === 0) {
            const height = this.tableRef.current.getBoundingClientRect().height;
            this.setState({ tableHeight: height });
        }
    }


    getData(){
        this.setState({avatarlist: testdata});
        CoachInputDataService.getAll().then(response => {
            if(response.data.res === "error") {
                const arr = ["connection error"];
                this.setState({videoList: arr});
                return;
            }
            if(response.data.res === "error"){
                alert("Bitte erst anmelden.");
                return;
            }
            if(response.data.res === "ok") {
                // this.setState({videoList: response.data.videoList});
                this.setState({avatarlist: json_data.sections});
            }

        }).catch(e => {
            this.setState({avatarlist: testdata});
            alert("Es ist ein Fehler aufgetreten!");
        });
    }

   render() {
  const { showProfileUpload } = this.state;

  if (!this.state.avatarlist || this.state.avatarlist.length === 0) {
    return (
      <div>
        <div className="avatargallery" id="avatargallery">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const uniqueSections = Array.from(new Set(this.state.avatarlist.map(section => section.title))).map(title => {
    return this.state.avatarlist.find(section => section.title === title);
  });

    const legendItems = {
      'Blut/Mikrobiom/Ernährung': [
        { color: 'green', label: 'Grün = im Normbereich' },
        { color: 'yellow', label: 'Gelb = suboptimal' },
        { color: 'red', label: 'Rot = auffällig' },
        { color: 'blue', label: 'Blau = erhöht' },
      ],
      'Genetik': [
        { color: 'green', label: '0 = 0 weniger ,,optimale\'\' Ausprägung' },
        { color: 'red', label: '100 = ,,optimale\'\' Ausprägung' },
      ],
      'Soziologie': [
        { color: 'green', label: 'Grün = unauffällig' },
        { color: 'yellow', label: 'Gelb = leicht auffällig' },
        { color: 'red', label: 'Rot = auffällig' },
      ],
      'Motorik & Kognition': [
        { color: 'green', label: 'Grün = überdurchschnittlich' },
        { color: 'yellow', label: 'Gelb = durchschnittlich' },
        { color: 'red', label: 'Rot = unter durchschnittlich' },
      ],
    };

      const legend = (
      <div className="legend">
        {Object.keys(legendItems).map((category, index) => (
          <div key={index}>
            <h5>{`Legende ${category}`}</h5>
            <ul>
              {legendItems[category].map((item, subIndex) => (
                <li key={subIndex}>
                  <span className="legend-color" style={{ backgroundColor: item.color }}></span>
                  {item.label}
                </li>
              ))}
            </ul>
              {index < Object.keys(legendItems).length - 1 && <br />}
          </div>
        ))}
        {/* Additional item for "Grau" */}
        <br />

    <div className="legend-category">
      <ul>
        <li>
          <span className="legend-color" style={{ backgroundColor: 'grey' }}></span>
          Grau = Ergebnis liegt noch nicht vor/keine Teilnahme
        </li>
      </ul>
    </div>

      </div>
    );

  return (
    <div>
      <div className="two-column-layout">
        <div className="column">
          {uniqueSections.slice(0, Math.ceil(uniqueSections.length / 2)).map((section, index) => (
            <div key={index}>
              <div className="avatar-all-content">
                <span className="avatar-text-field" id={`text${index}`}>
                  {section.title}
                  <ColorBar data={json_data} sectionName={section.title} />
                </span>
              </div>
              <div className="table-container">
                <AthleteProfileTable
                  data={json_data}
                  section_name={section.title}
                  sectionData={section}
                />
              </div>
            </div>

          ))}
        </div>

        <div className="column">
          {uniqueSections.slice(Math.ceil(uniqueSections.length / 2)).map((section, index) => (
            <div key={index}>
              <div className="avatar-all-content">
                <span className="avatar-text-field" id={`text${index + Math.ceil(uniqueSections.length / 2)}`}>
                  {section.title}
                  <ColorBar data={json_data} sectionName={section.title} />
                </span>
              </div>

              <div className="table-container">
                <AthleteProfileTable
                  data={json_data}
                  section_name={section.title}
                  sectionData={section}
                />
              </div>
            </div>
          ))}
        </div>
         <div className="legend-column">
        {legend}
      </div>
      </div>

    </div>
  );
}

}
export default AvatarPdf;