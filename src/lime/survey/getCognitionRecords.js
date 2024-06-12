import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CognitionRecFiles = () => {
    const [files, setFiles] = useState([]);
    const [discipline, setDiscipline] = useState('Eishockey');
    const [athleteIds, setAthleteIds] = useState([]);
    const [selectedAthleteId, setSelectedAthleteId] = useState('All');
    const [deletePending, setDeletePending] = useState(null);

    // Function to fetch files from the backend
    const fetchData = async (selectedDiscipline) => {
        try {
            const response = await axios.get(`https://inprove-sport.info/files/cog/getCognitionFiles?discipline=${selectedDiscipline}`);
            setFiles(response.data);

            // Extract unique athlete IDs from the fetched files
            const ids = ['All', ...new Set(response.data.map(file => file.athlete_id.toString()))];
            setAthleteIds(ids);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    // Fetch data when discipline changes
    useEffect(() => {
        fetchData(discipline);
    }, [discipline]);

    // Filter files based on selected athlete ID
    const filteredFiles = selectedAthleteId === 'All'
        ? files
        : files.filter(file => file.athlete_id.toString() === selectedAthleteId);

    // Handle delete button click
    const handleDelete = (fileName) => {
        setDeletePending(fileName);

        // Set a timer for 7 seconds
        setTimeout(() => {
            if (deletePending === fileName) {
                deleteFile(fileName);
            }
        }, 7000);
    };

    // Handle undo button click
    const handleUndo = () => {
        setDeletePending(null);
    };

    // Function to delete file
    const deleteFile = async (fileName) => {
        try {
            const response = await axios.post('https://inprove-sport.info/files/cog/deleteCogReco', { fileName });
            if (response.status === 200) {
                setFiles(files.filter(file => file.audio_file_name !== fileName));
            }
        } catch (error) {
            console.error('Error deleting file: ', error);
        } finally {
            setDeletePending(null);
        }
    };

    return (
        <div>
            <h1>Cognition Audio Files</h1>
            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="discipline">Select discipline: </label>
                <select id="discipline" value={discipline} onChange={(e) => setDiscipline(e.target.value)}>
                    <option value="Basketball">Basketball</option>
                    <option value="Volleyball">Volleyball</option>
                    <option value="Eishockey">Eishockey</option>
                </select>
                <label htmlFor="athleteId" style={{ marginLeft: '20px' }}>Select Athlete ID: </label>
                <select id="athleteId" value={selectedAthleteId} onChange={(e) => setSelectedAthleteId(e.target.value)}>
                    {athleteIds.map(id => (
                        <option key={id} value={id}>{id}</option>
                    ))}
                </select>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Athlete ID</th>
                    <th>Test ID</th>
                    <th>File Name</th>
                    <th>Time</th>
                    <th>Play</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredFiles.map(file => (
                    <tr key={file.audio_file_name}>
                        <td>{file.athlete_id}</td>
                        <td>{file.test_id}</td>
                        <td>{file.audio_file_name}</td>
                        <td>{file.time}</td>
                        <td>
                            <audio controls>
                                <source src={`https://inprove-sport.info/files/playCognitionRecordings/${file.audio_file_name}`} type="audio/webm" />
                                Your browser does not support the audio element.
                            </audio>
                        </td>
                        <td>

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CognitionRecFiles;
