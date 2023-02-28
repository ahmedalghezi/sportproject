/*
By Nicolas Schulz
 */

import React, {Component} from "react";
import handelTrainer from "../../DB/handelTrainer";
import ProfileChart from "./profilechart";
import { Grid } from "@mui/material";
import AbstractModalHeader from "react-bootstrap/esm/AbstractModalHeader";


const charts = [
    {data: [
    {value: 27.5, label: "Sprunghöhe - 09.21"},
    {value: 29.9, label: "Sprunghöhe - 06.22"},
    {value: 27.5, label: "Sprunghöhe - 09.23"},
    {value: 29.9, label: "Sprunghöhe - 06.24"},
], refer: [{value: 0, label: ""}, {value: 40, label: "Referenzwert(cm)"}],
titel: "Profile Chart 2" ,
color: "yellow"},
{data: [
    {value: 27.5, label: "Sprunghöhe - 09.21"},
    {value: 29.9, label: "Sprunghöhe - 06.22"},
], refer: [{value: 0, label: ""}, {value: 40, label: "Referenzwert(cm)"}],
titel: "Profile Chart 2" ,
color: "green"},
{data: [
    {value: 27.5, label: "Sprunghöhe - 09.21"},
    {value: 29.9, label: "Sprunghöhe - 06.22"},
], refer: [{value: 0, label: ""}, {value: 40, label: "Referenzwert(cm)"}],
titel: "Profile Chart 2" ,
color: "red"},
];

export default class ProfileGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {charts: []};
        this.getAll = this.getAll.bind(this);
        this.drawIndicator = this.drawIndicator.bind(this);
    }


    componentDidMount() {
        this.getAll();
    }
    getAll(){
        //need to add empty object for space
        //this.setState({ref: ref, arrtest: testdata, title: titel });
        handelTrainer.addToGroup({athleteID: 0}).then(response => {
            if(response.data.res === "error") {
                const arr = ["connection error"];
                return;
            }
            if(response.data.res === "no"){
                alert("Bitte erst anmelden.");
                return;
            }
            if(response.data.res === "ok") {
                this.setState({charts: response.data.charts})
            }

        }).catch(e => {
            console.log(e);
            this.setState({charts: charts})
            alert("Es ist ein Fehler aufgetreten!");
        });
    }
    

    drawIndicator(obj){
        let col = obj.color;
        var x = "530px"
        var y = "200px"

        return <circle cx={x} cy={y} r="10" stroke={col} fill={col}/>
    }



    


    render() {
        //require("./uploadFile.css")

        return (
            <div className="profile-stat-container">
                <h3>Stat page</h3>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {
                    this.state.charts.map((item, index) => {
                    return (
                            <Grid item xs={6}><div style= {{...{position: "relative"}}}><svg style= {{...{position: "absolute",...{zIndex: "1"}}, ...{height: "500px"}, ...{width: "600px"}}}>{this.drawIndicator(item)}</svg></div><div style= {{...{height: '350px'}}}><ProfileChart arrtest={item.data} refer={item.refer} title={item.titel}/></div></Grid>
                            );
                    })}
                </Grid>
                
            </div>
        );
    }
}
