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

export default class ProfileFeat extends Component {

    constructor(props) {
        super(props);
        this.state = {features: [], loaded: false, selspace: "", DisciplinesList: [], Discipline: "", selfeat: "", spacelist:[], featlist:[]};
        this.getAll = this.getAll.bind(this);
        this.ChangeSpace = this.ChangeSpace.bind(this);
        this.ChangeFeat = this.ChangeFeat.bind(this);
        this.ChangeDisc = this.ChangeDisc.bind(this);
        this.createChart = this.createChart.bind(this);
    }


    componentDidMount() {
        this.getAll();
    }
    getAll(){
        //need to add empty object for space
        //this.setState({ref: ref, arrtest: testdata, title: titel });
      this.setState({features: feat});
      PostCSVData.getSpaces().then(response => {
            if(response.data.res === "error") {
                const arr = ["connection error"];
                return;
            }
            if(response.data.res === "no"){
                alert("Bitte erst anmelden.");
                return;
            }
            if(response.data.res === "ok") {
                this.setState({spacelist: response.data})
            }

        }).catch(e => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten!");
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
                this.setState({featlist: response.data.data})
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
        //request to get charts
        PostCSVData.getCharts().then(response => {
            if(response.data.res === "error") {
                const arr = ["connection error"];
                return;
            }
            if(response.data.res === "no"){
                alert("Bitte erst anmelden.");
                return;
            }
            if(response.data.res === "ok") {
                this.setState({charts: response.data.charts, loaded: true})
            }

        }).catch(e => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten!");
        });
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
                    Object.keys(this.state.selfeat).length !== 0
                    ?
                    <form onSubmit={this.createChart}>
                    <button style= {{...{float: 'right'},...{zIndex: 1}}} type="submit">Submit</button>
                    </form>
                    :
                    null
                }
                {
                    this.state.loaded
                    ?
<                   Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {this.state.charts.map(function(d, idx){
                            return (<Grid item xs={6}><div style= {{...{height: '350px'}}}><ProfileChart arrtest={d.data} refer={d.refer} title={d.titel}/></div></Grid>)
                        })}
                    </Grid>
                    :
                    null
                }
            </div>
        );
    }
}