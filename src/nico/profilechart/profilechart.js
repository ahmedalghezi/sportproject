/*
By Nicolas Schulz
 */

import React, {Component} from "react";
import handelTrainer from "../../DB/handelTrainer";
import Plot from 'react-plotly.js';

const testdata = [
    {value: 27.5, label: "Sprunghöhe - 09.21"},
    {value: 29.9, label: "Sprunghöhe - 06.22"},
]
const ref =    [{value: 0, label: ""}, {value: 40, label: "Referenzwert(cm)"}];

export default class ProfileChart extends Component {

    constructor(props) {
        super(props);
        this.state = {arrtest: [], ref: []};
        this.getAll = this.getAll.bind(this);
    }


    componentDidMount() {
        this.getAll();

    }
    getAll(){
        //need to add empty object for space
        this.setState({ref: ref, arrtest: testdata});
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
            <div style= {{...{textAlign: 'center'}}}>
            <Plot
                data={[
                    {
                    x: this.state.arrtest.map(el => el.value),
                    y: this.state.arrtest.map(el => el.label),
                    type: 'bar',
                    orientation: 'h',
                    mode: 'lines+markers',
                    marker: {color: '#862A16'},
                    text: this.state.arrtest.map(el => el.value),
                    },
                    {
                        x: this.state.ref.map(el => el.value),
                        y: this.state.ref.map(el => el.label),
                        type: 'bar',
                        orientation: 'h',
                        mode: 'lines+markers',
                        marker: {color: '#862A16'},
                        text: this.state.ref.map(el => el.value),
                        },
                    
                ]}
                layout={ { title: "Profile Chart", yaxis: { automargin: true}, grid: {rows: 2, columns: 1}, showlegend: false}}
                />
                
            </div>
        );
    }


}
