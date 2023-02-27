/*
By Nicolas Schulz
 */

import React, {Component} from "react";
import handelTrainer from "../../DB/handelTrainer";
import ProfileChart from "./profilechart";
import { Grid } from "@mui/material";

const testdata = [
    {value: 27.5, label: "Sprunghöhe - 09.21"},
    {value: 29.9, label: "Sprunghöhe - 06.22"},
]
const refer =    [{value: 0, label: ""}, {value: 40, label: "Referenzwert(cm)"}];

const titel = "Profile Chart 1"

const charts = [
    {data: [
    {value: 27.5, label: "Sprunghöhe - 09.21"},
    {value: 29.9, label: "Sprunghöhe - 06.22"},
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

export default class ProfileGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.getAll = this.getAll.bind(this);
    }


    componentDidMount() {
        this.getAll();
        console.log(charts[0])
    }
    getAll(){
        //need to add empty object for space
        //this.setState({ref: ref, arrtest: testdata, title: titel });
        handelTrainer.getVideos().then(response => {
            if(response.data.res === "error") {
                const arr = ["connection error"];
                this.setState({videoList: arr});
                return;
            }
            if(response.data.res === "no"){
                alert("Bitte erst anmelden.");
                return;
            }
            if(response.data.res === "ok") {
                var list = response.data.videoList.sort((a, b) => (a.time > b.time) ? -1 : 1);
                this.setState({videoList: list});
                this.updateVideoPage(list, this.state.currentPage);
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
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {charts.map(function(d, idx){
                    return (<Grid item xs={6}><ProfileChart arrtest={d.data} refer={d.refer} title={d.titel}/></Grid>)
                })}
                </Grid>
            </div>
        );
    }
}
