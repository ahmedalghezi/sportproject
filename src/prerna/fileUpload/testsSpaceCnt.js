import React, { useState, useRef, useEffect } from 'react';
import { CountUp } from 'use-count-up';
import * as Icons from '@mui/icons-material';
import axios from "axios";

const IconPlaceholder = ({ children, iconTest }) => (
  <div style={{ display: 'flex', alignItems: 'center'}}>
    <div style={{ width: '18px', height: '40px', backgroundColor: '#00404f', marginRight: '4px',display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {iconTest && React.createElement(iconTest, { style: { fontSize: '30px', color: 'white' } })}
    </div>
    <div>{children}</div>
  </div>
);

const ProfileStyleComp = () => {
  const testdata = 
    {
      "testsSpaceCnt": {
        "Mikrobium": 200, "Blutanalyse": 143,
        "Anthropometrie": 700, "Kognition": 560,
        "Genetik": 891, "Einschätzungen": 690,
        "ernährung": 482, "Sonstiges": 261,
        "Motorik": 152, "Soziologie": 129
      },
      "dateCount": 7,
      "lastDate": "2024-01-08"
    }
  ;


  const iconMapping = {
    "Mikrobium": Icons.Coronavirus,  
    "Blutanalyse": Icons.Bloodtype,
    "Anthropometrie": Icons.FitnessCenter,
    "Kognition": Icons.Lightbulb,
    "Genetik": Icons.Diversity2 ,
    "Einschätzungen": Icons.Analytics,
    "ernährung": Icons.FoodBank,
    "Sonstiges": Icons.MiscellaneousServices,   
    "Motorik": Icons.DirectionsWalk,
    "Soziologie": Icons.People,
    "dateCount": Icons.CalendarMonth,
    "lastDate": Icons.CalendarMonth
    
  };
  
  const [data, setData] = useState(null);

  useEffect(() => {

    console.log("useEffect : ")
    const fetchData = async () => {
      try {
        const response = await axios.get('https://inprove-sport.info/avatar/gGhdEmkUeLosxPnKa/getBasicDataInfo');
        console.log("response : ", response)
        console.log("response.data : ", response.data)
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData(testdata);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once on component mount

  if (data === null) {

    console.log("Loading : ")
    return<p>Loading...</p>;
    setData(testdata);
  }
    
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#00404f' }}>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        {Object.keys(data.testsSpaceCnt).map((key, index) => (
          <div key={index} style={{ textAlign: 'center', marginRight: '35px',color:'white', fontSize:'28px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <IconPlaceholder iconTest={iconMapping[key]}>
              <CountUp isCounting start={0} end={data.testsSpaceCnt[key]} duration={2} />
            </IconPlaceholder>
            <div style={{ textAlign: 'center', color:'white',fontSize:'15px'}} >{key}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex' }}>
        {[
          { key: 'dateCount', value: data.dateCount },
          { key: 'lastDate', value: data.lastDate },
        ].map((date, index) => (
          <div key={index} style={{ textAlign: 'center', marginRight: '35px' ,color:'white',fontSize:'28px'}}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <IconPlaceholder iconTest={iconMapping[date.key]}>
              {String(date.value)}
            </IconPlaceholder>
            <div style={{ textAlign: 'center',color:'white',fontSize:'15px' }}>{date.key}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileStyleComp;
