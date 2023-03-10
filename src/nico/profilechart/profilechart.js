/*
By Nicolas Schulz
 */

import React, {Component} from "react";
import handelTrainer from "../../DB/handelTrainer";
import Plot from 'react-plotly.js';

export default class ProfileChart extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        //require("./uploadFile.css")
        const { arrtest, refer, title } = this.props;
        return (
            <div style= {{...{textAlign: 'center'}}}>
                <Plot
                    data={[
                        {
                            x: arrtest.map(el => el.value),
                            y: arrtest.map(el => el.label),
                            type: 'bar',
                            orientation: 'h',
                            mode: 'lines+markers',
                            marker: {color: '#862A16'},
                            text: arrtest.map(el => el.value),
                        },
                        {
                            x: refer.map(el => el.value),
                            y: refer.map(el => el.label),
                            type: 'bar',
                            orientation: 'h',
                            mode: 'lines+markers',
                            marker: {color: '#862A16'},
                            text: refer.map(el => el.value),
                        },

                    ]}
                    layout={ {height: 600, autosize: false, title: title, yaxis: { automargin: true}, xaxis: { automargin: true}, grid: {rows: 2, columns: 1}, showlegend: false}}
                />

            </div>
        );
    }


}
