/*
By Nicolas Schulz
 */

import React, {Component} from "react";
import handelTrainer from "../../DB/handelTrainer";
import ProfileChart from "./profilechart";
import { Grid } from "@mui/material";
import PostCSVData from "../../DB/postCSV";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';


const charts = [
    {data: [
            {value: 27.5, label: "Sprunghöhe - 09.21"},
            {value: 29.9, label: "Sprunghöhe - 06.22"},
            {value: 27.5, label: "Sprunghöhe - 09.23"},
            {value: 29.9, label: "Sprunghöhe - 06.24"},
        ], refer: [{value: 0, label: ""}, {value: 40, label: "Referenzwert(cm)"}],
        titel: "Profile Chart 1" },
    {data: [
            {value: 27.5, label: "Sprunghöhe - 09.21"},
            {value: 29.9, label: "Sprunghöhe - 06.22"},
        ], refer: [{value: 0, label: ""}, {value: 40, label: "Referenzwert(cm)"}],
        titel: "Profile Chart 2" },
    {data: [
            {value: 27.5, label: "Sprunghöhe - 09.21"},
            {value: 29.9, label: "Sprunghöhe - 06.22"},
        ], refer: [{value: 0, label: ""}, {value: 40, label: "Referenzwert(cm)"}],
        titel: "Profile Chart 3" }
];

export default class LoadCharts extends Component {

    constructor(props) {
        super(props);
        this.state = {charts: [], currentIndex: 0};
        this.getAll = this.getAll.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
    }


    componentDidMount() {
        this.getAll();
    }
    getAll(){
        //need to add empty object for space
        //this.setState({ref: ref, arrtest: testdata, title: titel });
        this.setState({charts: charts});
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
                this.setState({charts: response.data.charts})
            }

        }).catch(e => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten!");
        });
    }

    handleNext(){
        var x = this.state.currentIndex + 1
        this.setState({currentIndex: x})
    }

    handlePrev(){
        var x = this.state.currentIndex - 1
        this.setState({currentIndex: x})
    }






    render() {
        //require("./uploadFile.css")

        return (
            <div>
                <h3>Stat page</h3>
                {
                    this.state.currentIndex < this.state.charts.length - 1
                    ? <button style= {{...{float: "right"}}} onClick={this.handleNext}><NavigateNextIcon/></button>
                    : <button style= {{...{float: "right"}}} disabled><NavigateNextIcon/></button>
                }
                {
                    this.state.currentIndex > 0
                    ? <button style= {{...{float: "right"}}} onClick={this.handlePrev}><NavigateBeforeIcon/></button>
                    : <button style= {{...{float: "right"}}} disabled><NavigateBeforeIcon/></button>
                }
                <ProfileChart arrtest={charts[this.state.currentIndex].data} refer={charts[this.state.currentIndex].refer} title={charts[this.state.currentIndex].titel}/>
            </div>
        );
    }
}