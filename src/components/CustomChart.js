import React, { Component } from 'react'
import Plot from 'react-plotly.js';
import { reformatDate } from '../utli/dataConversion.js';
import './customChart.css'
import { IconButton, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function CustomChart(props) {
  const {evaluations, closeChartView, selectedAthlete} = props;

  // CHART DATA
  const chartTitle = 'Performance History for Athlete ' + selectedAthlete;
  let values = []
  evaluations.forEach(ev => {
    if(values.map(el => el.date).includes(ev.date)) {
      // sum up the achived values
      const found = values.find(el => el.date === ev.date);
      found.value += parseInt(ev.achieved);
      values.filter(el => el.date !== ev.date).push(found);
    } else {
      values.push({date: ev.date, value: parseInt(ev.achieved)});
    }
  });
  // reformat dates
  values.sort(function (a,b) {
    if (a.date === b.date) 
         return 0;

    return a.date < b.date ? -1 : 1;
  });
  values = values.map(el => {return {date: reformatDate(el.date), value: el.value};});

  return (
    <div className="chart-container">
      <div className="close-icon-container"> 
            <Tooltip title="Close">
              <IconButton onClick={() => closeChartView()}>
                  <CloseIcon />
              </IconButton>
            </Tooltip>
          </div>
        <Plot
          data={[
            {
              x: values.map(el => el.date),
              y: values.map(el => el.value),
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            },
          ]}
          layout={ { title: chartTitle} }
        />
    </div>
  )
}
