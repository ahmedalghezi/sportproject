import Axios from 'axios';
import React from 'react';
import { reformatDate } from '../../utli/dataConversion';

const tableCellStyle = {width: '25%', paddingBottom: '8px'};

// requesting data from API
async function getStats () {
    return await Axios.create({
       baseURL: "https://inprove-sport.info",
       json: true,
       headers: {
           "Content-type": "application/json"
       },
    }).get("/csvapi/get_stats");
}

export default function StatsView (){
    const [stats, setStats] = React.useState([]);
    if(stats.length === 0) {
        getStats().then(res => {
            if(res['data']['res'] === "ok" && res['data']['arr'])
                setStats(res['data']['arr']);
        });
    }
    return (
      <div>
          <table>
              <thead style={{borderBottom: '1px solid black'}}>
                  <tr>
                    <th>Date</th>
                    <th>Number of Tests</th>
                  </tr>
              </thead>
              <tbody>
                    {/* Seperator */}
                    <tr style={{height: '10px'}}><td></td><td></td></tr> 
                    {/* Content */}
                    {stats && stats.map( (el,key) => {
                        return (<tr key={"tr-stats-" + key}>
                            <td style={tableCellStyle}><b>{reformatDate(el['date'])}</b></td>
                            <td style={tableCellStyle}>{el['total']}</td></tr>);
                    })}
                </tbody>
            </table>
      </div>
    )
}

