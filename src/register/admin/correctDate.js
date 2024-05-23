import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CorrectDate = () => {
    const [data, setData] = useState([]);
    const [space, setSpace] = useState('');
    const [spaces, setSpaces] = useState([]);
    const [modifiedRows, setModifiedRows] = useState({});

    useEffect(() => {
        axios.get('https://inprove-sport.info/csv/getSpaces')
            .then(response => {
                setSpaces(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching spaces:", error);
            });
    }, []);

    useEffect(() => {
        if(space) {
            axios.get(`/csv/bbhhg872xhdTdx6dgfZRtzvVNxgd/${space}`)
                .then(response => {
                    setData(response.data);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [space]);

    const handleDetectedDateChange = (id, event) => {
        const newData = data.map(row => {
            if (row.id === id) {
                return {...row, detecteddate: event.target.value };
            }
            return row;
        });
        setData(newData);
        setModifiedRows(prevState => ({ ...prevState, [id]: true }));
    }

    const handleSave = (id) => {
        const row = data.find(r => r.id === id);
        axios.post('/csv/save-detected-date-endpoint', { id: id, detecteddate: row.detecteddate })
            .then(response => {
                if(response.data && response.data.message !== "Date updated successfully.") {
                    alert(response.data.message);
                } else {
                    setModifiedRows(prevState => ({ ...prevState, [id]: false }));
                }
            })
            .catch(error => {
                console.error("Error saving data:", error);
                alert("Error saving data. Please try again.");
            });
    };
    return (
        <div>
            <select value={space} onChange={(e) => setSpace(e.target.value)}>
                {spaces.map(spaceOption => (
                    <option key={spaceOption.value} value={spaceOption.value}>
                        {spaceOption.label}
                    </option>
                ))}
            </select>

            <table>
                <thead>
                <tr>
                    <th style={{ padding: '0 10px' }}>Row</th>
                    <th style={{ padding: '0 10px' }}>Athlete ID</th> {/* New column header */}
                    <th style={{ padding: '0 10px' }}>Excel File Date</th>
                    <th style={{ padding: '0 10px' }}>Detected Date</th>
                    <th style={{ padding: '0 10px' }}>Data Date</th>
                    <th style={{ padding: '0 10px' }}>Date of Upload</th>
                    <th style={{ padding: '0 10px' }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {data.map(row => (
                    <tr key={row.id}>
                        <td style={{ padding: '0 10px' }}>{row.id}</td>
                        <td style={{ padding: '0 10px' }}>{row.athlete_id}</td> {/* New column data */}
                        <td style={{ padding: '0 10px' }}>{row.excelFileDate}</td>
                        <td style={{ padding: '0 10px' }}>
                            <input
                                type="date"
                                value={row.detecteddate}
                                onChange={(e) => handleDetectedDateChange(row.id, e)}
                            />
                        </td>
                        <td style={{ padding: '0 10px' }}>{row.datadate}</td>
                        <td style={{ padding: '0 10px' }}>{row.dateofupload}</td>
                        <td><button onClick={() => handleSave(row.id)} disabled={!modifiedRows[row.id]}>Save</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )

}

export default CorrectDate;
