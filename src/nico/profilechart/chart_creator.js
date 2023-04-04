/*
By Nicolas Schulz
 */

import React, {Component} from "react";
import handelTrainer from "../../DB/handelTrainer";
import ProfileChart from "./profilechart";
import { Grid } from "@mui/material";
import AbstractModalHeader from "react-bootstrap/esm/AbstractModalHeader";
import PostCSVData from "../../DB/postCSV";


const charts = [
    {data: [
            {value: 27.5, label: "Sprunghöhe - 09.21"},
            {value: 29.9, label: "Sprunghöhe - 06.22"},
            {value: 27.5, label: "Sprunghöhe - 09.23"},
            {value: 29.9, label: "Sprunghöhe - 06.24"},
        ], refer: [{value: 0, label: ""}, {value: 40, label: "Referenzwert(cm)"}],
        titel: "Profile Chart 1" ,
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
        titel: "Profile Chart 3" ,
        color: "red"},
];

export default class ChartCreator extends Component {

    constructor(props) {
        super(props);
        this.state = {charts: [], selchart: {}};
        this.drawIndicator = this.drawIndicator.bind(this);
        this.newChart = this.newChart.bind(this);
        this.Changechart = this.Changechart.bind(this);
        this.changeRefLabel = this.changeRefLabel.bind(this);
        this.changeRefValue = this.changeRefValue.bind(this);
        this.changeLabel = this.changeLabel.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.Changecolor = this.Changecolor.bind(this);
        this.changeTitel = this.changeTitel.bind(this);
        this.newLine = this.newLine.bind(this);
        this.delChart = this.delChart.bind(this);
        this.delLine = this.delLine.bind(this);
        this.uploadChart = this.uploadChart.bind(this);
    }


    componentDidMount() {
        this.setState({charts: charts});
    }



    drawIndicator(obj){
        let col = obj.color;
        var x = "530px"
        var y = "200px"

        return <circle cx={x} cy={y} r="10" stroke={col} fill={col}/>
    }

    Changechart(event){
        const filtered = this.state.charts.filter(obj => {
            return obj.titel === event.target.value;
        });
        this.setState({selchart: filtered[0]})
    }


    newChart(){
        let newobj = {data: [

            ], refer: [{value: 0, label: ""}, {value: 40, label: "Referenzwert(cm)"}],
            titel: "New Chart" ,
            color: "green"}
        let curcharts = this.state.charts
        curcharts.push(newobj);
        this.setState({charts: curcharts});
        document.getElementById("charts").selectedIndex = 0;
        this.setState({selchart: {}});
    }

    delChart(){
        const filteredChart = this.state.charts.filter((item) => item.titel !== this.state.selchart.titel);
        this.setState({charts: filteredChart});
        document.getElementById("charts").selectedIndex = 0;
        this.setState({selchart: {}});
    }

    changeLabel(event){
        const curID = event.target.id.split(" ")[1];
        let curObj = this.state.selchart;
        curObj.data[curID].label = event.target.value;
        this.setState({selchart: curObj});
    }

    changeValue(event){
        const curID = event.target.id.split(" ")[1];
        let curObj = this.state.selchart;
        curObj.data[curID].value = event.target.value;
        this.setState({selchart: curObj});
    }

    changeRefLabel(event){
        let curObj = this.state.selchart;
        curObj.refer[1].label = event.target.value;
        this.setState({selchart: curObj});
    }

    changeRefValue(event){
        let curObj = this.state.selchart;
        curObj.refer[1].value = event.target.value;
        this.setState({selchart: curObj});
    }

    Changecolor(event){
        let curObj = this.state.selchart;
        curObj.color = event.target.value;
        this.setState({selchart: curObj});
    }

    changeTitel(event){
        let curObj = this.state.selchart;
        curObj.titel = event.target.value;
        this.setState({selchart: curObj});
    }

    newLine(){
        let curObj = this.state.selchart;
        let newl = {value: 0, label: "New"}
        curObj.data.push(newl);
        console.log(curObj);
        this.setState({selchart: curObj});
    }

    delLine(event){
        const curID = parseInt(event.target.id.split(" ")[1]);
        const filteredChart = this.state.selchart.data.filter((item, index) => index !== curID);
        const temp = this.state.selchart;
        temp.data = filteredChart
        this.setState({selchart: temp});
    }

    uploadChart(){
        this.state.charts.forEach(item =>
            PostCSVData.uploadCharts({ chart: item })
                .then((response) => {
                    if (response.data.res === "error")
                        alert("some error has happened. code dowcsv187");
                    if (response.data.res === "no")
                        window.location.href =
                            window.location.origin + "/reg/sign-in?org=$csv$downloadCsv";
                    if (response.data.res === "ok") {

                    }
                })
                .catch((e) => {
                    console.log(e);
                    alert("some error has happened..code dowcsv195");
                })
        );
        alert("Charts uploaded");
        this.setState({selchart: {}});
        this.setState({charts: {}});
    }


    render() {
        //require("./uploadFile.css")

        return (
            <div className="profile-stat-container">
                <h3>Chart Creator</h3>
                <select id="charts" name="charts" onChange={this.Changechart} defaultValue={'DEFAULT'}>
                    <option value="DEFAULT" disabled>Change chart</option>
                    {this.state.charts.map((option) => (
                        <option value={option.titel} name={option.titel} key={option.titel}
                        >{option.titel}</option>
                    ))}
                </select>
                <label className="select-file">
                    <input
                        type="button"
                        value="New Chart"
                        onClick={this.newChart}
                    />
                </label>
                <label className="select-file">
                    <input
                        type="button"
                        value="Delete Chart"
                        onClick={this.delChart}
                    />
                </label>
                {
                    Object.keys(this.state.selchart).length === 0
                        ? null
                        : <div>
                            <label className="select-file">
                                <input
                                    type="text"
                                    id="titelfield"
                                    onChange={this.changeTitel}
                                    value={this.state.selchart.titel}
                                />
                            </label>
                        </div>
                }
                {
                    Object.keys(this.state.selchart).length === 0
                        ? null
                        : <div>
                            <label className="select-file">
                                <input
                                    type="text"
                                    id="reflab"
                                    onChange={this.changeRefLabel}
                                    value={this.state.selchart.refer[1].label}
                                />
                            </label>
                            <label className="select-file">
                                <input
                                    type="text"
                                    id="refval"
                                    onChange={this.changeRefValue}
                                    value={this.state.selchart.refer[1].value}
                                />
                            </label>
                        </div>
                }
                {
                    Object.keys(this.state.selchart).length === 0
                        ? null
                        : <div>
                            <select id="charts" name="charts" onChange={this.Changecolor}>
                                <option value="green">green</option>
                                <option value="yellow">yellow</option>
                                <option value="red">red</option>
                            </select>
                        </div>
                }
                {
                    Object.keys(this.state.selchart).length === 0
                        ? null
                        :
                        this.state.selchart.data.map((item, index) => {
                            return (
                                <div>
                                    <label className="select-file">
                                        <input
                                            type="text"
                                            id={"label " + String(index)}
                                            onChange={this.changeLabel}
                                            value={item.label}
                                        />
                                    </label>
                                    <label className="select-file">
                                        <input
                                            type="text"
                                            id={"value " + String(index)}
                                            onChange={this.changeValue}
                                            value={item.value}
                                        />
                                    </label>

                                    <label className="select-file">
                                        <input
                                            type="button"
                                            value="Delete Line"
                                            id={"button " + String(index)}
                                            onClick={this.delLine}
                                        />
                                    </label>
                                </div>
                            );
                        })
                }
                {
                    Object.keys(this.state.selchart).length === 0
                        ? null
                        :
                        <div>
                            <label className="select-file">
                                <input
                                    type="button"
                                    value="Add line"
                                    onClick={this.newLine}
                                />
                            </label>
                        </div>

                }
                {
                    Object.keys(this.state.charts).length !== 0
                        ?
                        <form onSubmit={this.uploadChart}>
                            <button style= {{...{float: 'right'},...{zIndex: 1}}} type="submit">Submit</button>
                        </form>
                        :
                        null
                }
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