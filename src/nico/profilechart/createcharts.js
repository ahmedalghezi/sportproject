/*
By Nicolas Schulz
 */

import React, {Component} from "react";
import handelTrainer from "../../DB/handelTrainer";
import ProfileChart from "./profilechart";
import { Grid } from "@mui/material";
import PostCSVData from "../../DB/postCSV";
import PostSignup from "../../DB/postSignup";
import http from "../../DB/httpCommon";


const charts = [
    {data: [
            {value: 27.5, label: "Sprunghöhe - 09.21"},
            {value: 29.9, label: "Sprunghöhe - 06.22"},
            {value: 27.5, label: "Sprunghöhe - 09.23"},
            {value: 29.9, label: "Sprunghöhe - 06.24"},
        ], refer: [{value: 0, label: ""}, {value: 40, label: "Referenzwert(cm)"}],
        titel: "Profile Chart 2" },
    {data: [
            {value: 27.5, label: "Sprunghöhe - 09.21"},
            {value: 29.9, label: "Sprunghöhe - 06.22"},
        ], refer: [{value: 0, label: ""}, {value: 40, label: "Referenzwert(cm)"}],
        titel: "Profile Chart 2" },
    {data: [
            {value: 27.5, label: "Sprunghöhe - 09.21"},
            {value: 29.9, label: "Sprunghöhe - 06.22"},
        ], refer: [{value: 0, label: ""}, {value: 40, label: "Referenzwert(cm)"}],
        titel: "Profile Chart 2" }
];

const feat = [{space:"space1",features:[{ID:"id1",name:"feat1"},{ID:"id2",name:"feat2"}]} , {space:"space2",features:[{ID:"id1",name:"feat3"},{ID:"id2",name:"feat4"}]}]

export default class CreateCharts extends Component {

    constructor(props) {
        super(props);
        this.state = {selspace: "", DisciplinesList: [], Discipline: "", selfeat: "", spacelist:[], featlist:[], title:"", seltype:"", ref: 0, type:""};
        this.getAll = this.getAll.bind(this);
        this.ChangeSpace = this.ChangeSpace.bind(this);
        this.ChangeFeat = this.ChangeFeat.bind(this);
        this.ChangeDisc = this.ChangeDisc.bind(this);
        this.createChart = this.createChart.bind(this);
        this.changeTitel = this.changeTitel.bind(this);
        this.changeRef = this.changeRef.bind(this);
        this.changePlot = this.changePlot.bind(this);
    }


    componentDidMount() {
        this.getAll();
    }
    getAll(){
        //need to add empty object for space
        //this.setState({ref: ref, arrtest: testdata, title: titel });
      PostCSVData.getSpaces().then(response => {
            this.setState({spacelist: response.data.data});
        })
        .catch(error => {
            console.log(error);
        });
        PostSignup.getAllDisciplines().then(response => {
            if(response.data.res === "error") {
                alert("Error getting disciplines from server");
                return;
            }
            else if(response.data.res && response.data.res.length > 0){
                this.setState({Discipline: response.data.res[0], DisciplinesList: response.data.res})
            }
  
        }).catch(e => {
            console.log(e);
            alert("some error has happened");
        });
    }

    ChangeSpace(event){
        this.setState({selspace: event.target.value})
        http.get("/csv/getAllTests/"+ event.target.value).then(response => {
            if(response.data.res === "error") {
                const arr = ["connection error"];
                return;
            }
            if(response.data.res === "no"){
                alert("Bitte erst anmelden.");
                return;
            }
            if(response.data.res === "ok") {
                this.setState({featlist: response.data.data.shift()})
            }

        }).catch(e => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten!");
        });
        document.getElementById("feat").selectedIndex = 0;
    }

    ChangeFeat(event){
        this.setState({selfeat: event.target.value})
    }

    ChangeDisc(event){
        this.setState({Discipline: event.target.value})
    }

    createChart(){
        //request to create charts
        
    }

    changeTitel(event){
        this.setState({title: event.target.value});
    }

    changeRef(event){
        this.setState({ref: event.target.value});
    }
    
    changePlot(event){
        this.setState({type: event.target.value});
    }


    render() {
        //require("./uploadFile.css")

        return (
            <div>
                <h3>Stat page</h3>
                <select id="disc" name="disc" onChange={this.ChangeDisc} defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled>Change discipline</option>
                        {this.state.DisciplinesList.map((option) => (
                        <option value={option} name={option} key={option}
                            >{option}</option>
                         ))}
                </select>
                <select id="space" name="space" onChange={this.ChangeSpace} defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled>Change space</option>
                        {this.state.spacelist.map((space,index) => (
                        <option key={index} value={space.value}>{space.label}</option>
                         ))}
                </select>
                {
                    Object.keys(this.state.featlist).length === 0
                    ? null
                    : <select id="feat" name="feat" onChange={this.ChangeFeat} defaultValue={'DEFAULT'}>
                    <option value="DEFAULT" disabled>Change feature</option>
                    {this.state.featlist.map((feat,index) => (
                    <option value={feat.testid} name={feat.testname} key={feat.testid}
                        >{feat.testname}</option>
                     ))}
            </select>
                }
                {
                    Object.keys(this.state.Discipline).length !== 0 && Object.keys(this.state.selspace).length !== 0
                    ?

                    <button style= {{...{float: 'right'},...{zIndex: 1}}} onClick={this.createChart}>Create chart</button>

                    :
                    null
                }
                <div>
                    <span>Titel:</span>
                        <label className="select-file">
                                        <input
                                        type="text"
                                        id="titelfield"
                                        onChange={this.changeTitel}
                                        value={this.state.title}
                                    />
                        </label>
                    </div>
                    <div>
                    <span>Referenzwert:</span>
                        <label className="select-file">
                                        <input
                                        type="number"
                                        min="0"
                                        id="reffield"
                                        onChange={this.changeRef}
                                        value={this.state.ref}
                                    />
                        </label>
                    </div>
                    <div>
                    <select id="dia" name="dia" onChange={this.changePlot} defaultValue={'DEFAULT'}>
                    <option value="DEFAULT" disabled>Chart type</option>
                    <option value="bar" name="Balkendiagramm" key="bar"
                        >Balkendiagramm</option>
                    <option value="scatter" name="Streudiagramm" key="scatter"
                        >Streudiagramm</option>
                    </select>
                    </div>
            </div>
        );
    }
}