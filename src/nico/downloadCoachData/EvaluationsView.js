import React from 'react'
import CustomChart from '../../utli/components/CustomChart';
import CustomTable from '../../utli/components/CustomTable';
import FilterFunction from '../../utli/components/FilterFunction';
import { evaluationsHeadCells } from '../../temp-data/evaluations';
import axios from "axios";
import { reformatDate } from '../../utli/dataConversion';
import { germanDatePresentation } from "../../utli/dataConversion";
import HandelTrainer from "../../DB/handelTrainer";
//TODO change order of table columns to: Datum-Name-Titel-Qualität-Geplante Int.-Erreichte Int.-Differenz
//TODO German date format
const tableCellStyle = {width: '25%', paddingBottom: '8px'};

async function getEvaluations () {
return await axios.create({
     baseURL: "https://inprove-sport.info",
     json: true,
     headers: {
         "Content-type": "application/json"
     },
  }).post("/trainer/getHistory", {});
}

export default function EvaluationsView() {
  const [isChartView, setIsChartView] = React.useState(false);
  const [chartAthlete, setChartAthlete] = React.useState(false);
  const [evaluations, setEvaluations] = React.useState([]);
  const [filteredEvaluations, setFilterEvaluations] = React.useState([]);

  if(evaluations.length === 0) {
    getEvaluations().then(res => {
      const athletesData = res['data']['athletes'];
      if(!athletesData || res['data']['res'] != "ok")
        return;
      setEvaluations(athletesData);
      setFilterEvaluations(athletesData);
    });
  }
  
  // data preprocessing
  const titles = Array.from(new Set(evaluations.map(el => el.title)));
  const athletes = Array.from(new Set(evaluations.map(el => el.name)));

  return (
        <>
            <div className="view-header">
                <div>
                    <FilterFunction
                        initialEvaluations={evaluations}
                        titles={titles}
                        athletes={athletes}
                        updateEvaluations={data => {
                            setFilterEvaluations(data);
                        }}
                    />
                </div>
            </div>
            <div className="view-content">
                {isChartView ?
                    <CustomChart
                        evaluations={filteredEvaluations.filter(el => el.name === chartAthlete)}
                        headCells={evaluationsHeadCells}
                        selectedAthlete={chartAthlete}
                        closeChartView={() => {
                            setChartAthlete(false);
                            setIsChartView(false);
                        }}
                    />
                    : <CustomTable
                        rows={filteredEvaluations}
                        headCells={evaluationsHeadCells}
                        toggleChartView={athlete => {
                            setChartAthlete(athlete);
                            setIsChartView(!isChartView);
                        }}
                        title={''}
                        hasSpecialRow={true}
                        hasChartRepresentation={true}
                        dense={false}
                        statsSection={
                            <table  style={{margin: '0 18px 32px'}}>
                                <tbody>
                                <tr>
                                    <td style={tableCellStyle}><b>Trainingseinheiten diesen Monat:</b></td>
                                    <td style={tableCellStyle}>{evaluations.length}</td>
                                </tr>
                                <tr>
                                    <td style={tableCellStyle}><b>Anzahl Athlet*innen:</b></td>
                                    <td style={tableCellStyle}>{Array.from(new Set(evaluations.map(ev => ev.name))).length}</td>
                                </tr>
                                <tr>
                                    <td style={tableCellStyle}><b>Letzte Trainingseinheit:</b></td>
                                    <td style={tableCellStyle}>{reformatDate(Array.from(new Set(evaluations.map(ev => ev.date))).sort().reverse()[0]) }</td>


                          
                          
                          
                      </tr>
                    </tbody>
                  </table>
                }
                rowsPerPage={10}
              />}
        
    </div>
    </>
  )
}
