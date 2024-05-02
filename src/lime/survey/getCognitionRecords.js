import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CognitionRecFiles = () => {
    const [files, setFiles] = useState([]);

    // Function to fetch files from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://inprove-sport.info/files/cog/getCognitionFiles');
                setFiles(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Cognition Audio Files</h1>
            <table>
                <thead>
                <tr>
                    <th>Athlete ID</th>
                    <th>Test ID</th>
                    <th>File Name</th>
                    <th>Time</th>
                    <th>Play</th>
                </tr>
                </thead>
                <tbody>
                {files.map(file => (
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
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CognitionRecFiles;
