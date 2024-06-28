/*
By Chaithra
*/

import React, { useEffect, useState } from 'react';
import MuiAlert from "@material-ui/lab/Alert";  // Consider using this for alert messages
import DataTable from "react-data-table-component";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../chaithra/avatar/avatarNew';

export default function Intervention() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const athleteName = searchParams.get('name');
    const navigate = useNavigate();

    const [sections, setSections] = useState([]);
    const [interventionTitle, setInterventionTitle] = useState('');
    const [pdfFile, setPdfFile] = useState(null);
    const [selectedSection, setSelectedSection] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    useEffect(() => {
        axios.get('https://inprove-sport.info/avatar/getSections')
            .then(response => {
                setSections(response.data);
            })
            .catch(error => {
                console.error('Error fetching sections:', error);
            });
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {  // Validate file type
            setPdfFile(file);
        } else {
            setAlertMessage('Please upload a valid PDF file.');
            setAlertType('error');
        }
    };

   const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form data
    if (!interventionTitle || !pdfFile || !selectedSection) {
        console.log('Form validation failed: Missing required fields.');
        setAlertMessage('Please fill out all fields.');
        setAlertType('error');
        return;
    }

    // Log form data
    console.log('Form Data:', {
        interventionTitle,
        pdfFile,
        selectedSection,
        athleteId: id
    });

    // Create a FormData object to hold the form data
    const formData = new FormData();
    formData.append('interventionTitle', interventionTitle);
    formData.append('pdfFile', pdfFile);
    formData.append('section', selectedSection);
    formData.append('athleteId', id);

    try {
        console.log('Sending POST request to the server...');
        // Send the POST request to the server
        const response = await axios.post('https://inprove-sport.info/avatar/uploadIntervention', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });


        console.log('Server response:', response.data);

        const successResponses = ["ok", "yes", "true"];
        if (successResponses.includes(String(response.data.success).toLowerCase())) {
            console.log('Intervention submitted successfully.');
            setAlertMessage('Intervention submitted successfully!');
            setAlertType('success');

             setTimeout(() => {
                    navigate('/super/athleteControl');  // Adjust the path as needed
                }, 2000);
        } else {
            console.log('Failed to submit intervention:', response.data.message);
            setAlertMessage(response.data.message || 'Failed to submit intervention.');
            setAlertType('error');
        }
    } catch (error) {
        console.error('Error submitting intervention:', error);
        setAlertMessage('An error occurred while submitting the intervention.');
        setAlertType('error');
    }
};


    return (
        <div className="container">
            <h3>Intervention for {athleteName}</h3>

            {alertMessage && <MuiAlert severity={alertType}>{alertMessage}</MuiAlert>}

            <form id="intervention-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="interventionTitle">Intervention Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="interventionTitle"
                        name="interventionTitle"
                        value={interventionTitle}
                        onChange={(e) => setInterventionTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pdfFile">Upload File</label>
                    <input
                        type="file"
                        className="form-control-file"
                        id="pdfFile"
                        accept="application/pdf"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="form-group">
                    <br />
                    <div>
                        <label htmlFor="interventionTitle">Athlete Id: {id}</label>
                    </div>
                    <br />
                    <label htmlFor="section">Select Section</label>
                    <select
                        className="form-control"
                        id="section"
                        value={selectedSection}
                        onChange={(e) => setSelectedSection(e.target.value)}
                    >
                        <option value="">Select Section</option>
                        {sections.map(section => (
                            <option key={section.id} value={section.name}>{section.name}</option>
                        ))}
                    </select>
                       <br />
                      <button type="submit" className="btn btn-primary">Submit</button>
                       <br />
                        <h3>Avatar of  {athleteName}</h3>
                       <div>
                    {/* Display Avatar Component */}
                    <Avatar athleteId={id} />
                    </div>
                </div>


            </form>
        </div>
    );
}
