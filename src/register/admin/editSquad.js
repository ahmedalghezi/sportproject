import React, { useEffect, useState } from 'react';
import logo from "../../loading-gif.gif";


import * as XLSX from 'xlsx';

function AthleteSquad() {
    const [data, setData] = useState([]);
    const [addingSquad, setAddingSquad] = useState(null);
    const [newSquad, setNewSquad] = useState({ squad: '', date_from: '' });
    const [key, setKey] = useState(''); // state for the key

    const [squadList, setSquadList] = useState([]); // state for the unique squad list

    const [isLoading, setIsLoading] = useState(false); // State to handle loading
    const [message, setMessage] = useState(''); // State to handle messages from backend


    const fetchData = () => {
        if (!key) return; // Don't fetch data if key is empty
        fetch('https://inprove-sport.info/csv/squad', {
            headers: {
                'X-API-Key': key // Send key in headers
            }
        })
            .then(response => response.json())
            .then(data => {
                setData(data.data);
                const squads = [];
                data.data.forEach(row => {
                    row.squads.forEach(squad => {
                        if (!squads.includes(squad.squad)) {
                            squads.push(squad.squad);
                        }
                    });
                });
                setSquadList(squads);
            });
    };


    const handleAddSquad = (id) => {
        setAddingSquad(id);
    };

    const handleSave = (athlete_id) => {
        fetch('https://inprove-sport.info/csv/squad', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ athlete_id, ...newSquad }),
        })
            .then(response => response.json())
            .then(data => {
                setAddingSquad(null);
                setNewSquad({ squad: '', date_from: '' });
                fetchData();
            });
    };

    const handleDelete = (athlete_id) => {
        fetch(`https://inprove-sport.info/csv/squad/${athlete_id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => fetchData());
    };



    const handleFileChange = (e) => {
        setIsLoading(true); // Start loading
        const reader = new FileReader();
        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

            // Remove the header
            data.shift();

            // Prepare data for POST request
            const postData = data.map(row => {
                return { athlete_id: row[0], squad: row[1], date_from: row[2] }
            });

            // Send the POST request to the server
            fetch('https://inprove-sport.info/csv/squadDump', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': key
                },
                body: JSON.stringify(postData),
            })
                .then(response => response.json())
                .then(data => {
                    setIsLoading(false); // Stop loading
                    setMessage(data.message); // Display message from backend
                    fetchData();
                })
        };
        reader.readAsBinaryString(e.target.files[0]);
    };





    return (

        <di>
            <p>You may import the squad from excel file. Make sure that the excel file has the following cols: ID, squad, date from.</p>
            <div className="form-group">
                <input type="file" onChange={handleFileChange} />
            </div>
            {isLoading && <img src={logo} width={30} alt="Loading..." />} {/* Show loading gif when loading */}
            {message && <p>{message}</p>} {/* Show message when there is one */}
            <br></br>
            <p> You may also load the athletes from the database and edit their squads:
            <div className="form-group">
                <input type="text" className="form-control" name="key" placeholder="key" onChange={e => setKey(e.target.value)} />
            </div>
            </p>

            <button className="btn btn-primary btn-block paddingBtn" onClick={fetchData}>Load Squads</button>
            <br></br>
            <br></br>
        <table style={{ borderCollapse: 'collapse' }}>
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Squad Details</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {data.map((row, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #ccc' }}>
                    <td>{row.athlete_id}</td>
                    <td>{row.name}</td>
                    <td>
                        {row.squads.map((squad, index) => (
                            <p key={index}>{`${new Date(squad.date_from).toLocaleDateString()} - ${squad.squad}`}</p>
                        ))}
                    </td>

                    <td>
                        {addingSquad === row.athlete_id ? (
                            <>
                                <input
                                    type="text"
                                    placeholder="Squad"
                                    value={newSquad.squad}
                                    onChange={(e) => setNewSquad({ ...newSquad, squad: e.target.value })}
                                    list="squad-list" // associate the input field with the datalist
                                />
                                <datalist id="squad-list">
                                    {squadList.map((squad, index) => (
                                        <option key={index} value={squad} />
                                    ))}
                                </datalist>
                                <input
                                    type="date"
                                    value={newSquad.date_from}
                                    onChange={(e) => setNewSquad({ ...newSquad, date_from: e.target.value })}
                                />
                                <button onClick={() => handleSave(row.athlete_id)}>Save</button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => handleAddSquad(row.athlete_id)}>Add Squad</button>
                                <button onClick={() => handleDelete(row.athlete_id)}>Delete Squads</button>
                            </>
                        )}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        </di>
    );
}

export default AthleteSquad;

