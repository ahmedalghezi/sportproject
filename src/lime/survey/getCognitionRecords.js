import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactAudioPlayer from 'react-audio-player';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const CognitionRecFiles = () => {
    const [files, setFiles] = useState([]);
    const [discipline, setDiscipline] = useState('Eishockey');
    const [athleteIds, setAthleteIds] = useState([]);
    const [selectedAthleteId, setSelectedAthleteId] = useState('All');
    const [timeFrom, setTimeFrom] = useState(new Date(new Date().setMonth(new Date().getMonth() - 3)).toISOString().split('T')[0]);
    const [timeTo, setTimeTo] = useState(new Date().toISOString().split('T')[0]);
    const [athleteNotFoundMessage, setAthleteNotFoundMessage] = useState('');
    const [isDownloading, setIsDownloading] = useState(false); // Track download status
    const [downloadProgress, setDownloadProgress] = useState(0); // Track download progress percentage

    const fetchData = async (selectedDiscipline, timeFrom, timeTo) => {
        try {
            const response = await axios.get(
                `https://inprove-sport.info/files/cog/getCognitionFiles?discipline=${selectedDiscipline}&timeFrom=${timeFrom}&timeTo=${timeTo}`
            );
            setFiles(response.data);
            console.log(response.data);
            const ids = ['All', ...new Set(response.data.map(file => file.athlete_id.toString()))];
            setAthleteIds(ids);

            if (selectedAthleteId !== 'All' && !ids.includes(selectedAthleteId)) {
                setAthleteNotFoundMessage(`Athlete ID ${selectedAthleteId} does not exist in the current table.`);
            } else {
                setAthleteNotFoundMessage('');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        setFiles([]);
        fetchData(discipline, timeFrom, timeTo);
    }, [discipline, timeFrom, timeTo]);

    const filteredFiles = selectedAthleteId === 'All'
        ? files
        : files.filter(file => file.athlete_id.toString() === selectedAthleteId);

    const generateExcelFileBinary = () => {
        const worksheetData = filteredFiles.map(file => ({
            'Athlete ID': file.athlete_id,
            'Test ID': file.test_id,
            'Time': new Date(file.time).toLocaleString(),
            'Self Rate': file.self_rate,
            'Execute Rate': file.execute_rate,
            'Screen Width': file.screen_width,
        }));

        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Cognition Audio Files');

        return XLSX.write(workbook, { type: 'binary', bookType: 'xlsx' });
    };

    const downloadAllFilesAsZip = async () => {
        setIsDownloading(true); // Start download process
        setDownloadProgress(0); // Reset progress

        const zip = new JSZip();

        const filePromises = filteredFiles.map(async file => {
            const fileUrl = `https://inprove-sport.info/files/playCognitionRecordings/${file.audio_file_name}`;
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            zip.file(file.audio_file_name, blob);
        });

        await Promise.all(filePromises);

        const excelBinary = generateExcelFileBinary();
        zip.file(`Cognition_Audio_Files_${discipline}.xlsx`, excelBinary, { binary: true });

        zip.generateAsync({ type: 'blob' }, (metadata) => {
            setDownloadProgress(Math.floor(metadata.percent)); // Update progress
        }).then(content => {
            saveAs(content, `Cognition_Audio_Files_${discipline}.zip`);
            setIsDownloading(false); // End download process
            setDownloadProgress(0); // Reset progress
        }).catch(error => {
            console.error('Error generating ZIP file:', error);
            setIsDownloading(false); // End download process in case of error
            setDownloadProgress(0); // Reset progress in case of error
        });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Cognition Audio Files</h1>
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                <label htmlFor="discipline" style={{ marginRight: '10px' }}>Select Discipline: </label>
                <select id="discipline" value={discipline} onChange={(e) => setDiscipline(e.target.value)} style={{ marginRight: '20px' }}>
                    <option value="Basketball">Basketball</option>
                    <option value="Volleyball">Volleyball</option>
                    <option value="Eishockey">Eishockey</option>
                </select>

                <label htmlFor="athleteId" style={{ marginRight: '10px' }}>Select Athlete ID: </label>
                <select id="athleteId" value={selectedAthleteId} onChange={(e) => setSelectedAthleteId(e.target.value)}>
                    {athleteIds.map(id => (
                        <option key={id} value={id}>{id}</option>
                    ))}
                </select>

                <label htmlFor="timeFrom" style={{ marginRight: '10px' }}>Time From: </label>
                <input
                    type="date"
                    id="timeFrom"
                    value={timeFrom}
                    onChange={(e) => setTimeFrom(e.target.value)}
                    style={{ marginRight: '20px' }}
                />

                <label htmlFor="timeTo" style={{ marginRight: '10px' }}>Time To: </label>
                <input
                    type="date"
                    id="timeTo"
                    value={timeTo}
                    onChange={(e) => setTimeTo(e.target.value)}
                />
            </div>

            {athleteNotFoundMessage && (
                <p style={{ color: 'red', fontWeight: 'bold' }}>{athleteNotFoundMessage}</p>
            )}

            <button
                onClick={downloadAllFilesAsZip}
                disabled={isDownloading} // Disable button while downloading
                style={{ marginBottom: '20px', padding: '10px 20px', fontSize: '16px' }}
            >
                {isDownloading ? 'Downloading...' : 'Download All as ZIP'}
            </button>

            {isDownloading && (
                // Display download progress
                <p>Preparing your download: {downloadProgress}%</p>
            )}


            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                <tr>
                    <th style={tableHeaderStyle}>Athlete ID</th>
                    <th style={tableHeaderStyle}>Test ID</th>
                    <th style={tableHeaderStyle}>Time</th>
                    <th style={tableHeaderStyle}>Self Rate</th>
                    <th style={tableHeaderStyle}>Execute Rate</th>
                    <th style={tableHeaderStyle}>Screen Width</th>
                    <th style={{ ...tableHeaderStyle, width: '250px' }}>Play</th>
                </tr>
                </thead>
                <tbody>
                {filteredFiles.map(file => (
                    <tr key={file.audio_file_name}>
                        <td style={tableCellStyle}>{file.athlete_id}</td>
                        <td style={tableCellStyle}>{file.test_id}</td>
                        <td style={tableCellStyle}>{new Date(file.time).toLocaleString()}</td>
                        <td style={tableCellStyle}>{file.self_rate}</td>
                        <td style={tableCellStyle}>{file.execute_rate}</td>
                        <td style={tableCellStyle}>{file.screen_width}</td>
                        <td style={tableCellStyle}>
                            <ReactAudioPlayer
                                src={`https://inprove-sport.info/files/playCognitionRecordings/${file.audio_file_name}`}
                                controls
                                preload="auto"
                                style={{ width: '100%', minWidth: '200px' }}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

// CSS styles as JavaScript objects
const tableHeaderStyle = {
    backgroundColor: '#f4f4f4',
    fontWeight: 'bold',
    padding: '10px',
    borderBottom: '2px solid #ddd',
    textAlign: 'left',
};

const tableCellStyle = {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
};

export default CognitionRecFiles;
