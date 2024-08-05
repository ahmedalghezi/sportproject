import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { format } from 'date-fns';

export default function GetInterventions({ athleteId: propAthleteId, athleteName }) {
    const [interventions, setInterventions] = useState([]);
    const [loading, setLoading] = useState(false);

     useEffect(() => {
        const fetchInterventions = async () => {
            setLoading(true);
            try {
                let url = 'https://inprove-sport.info/avatar/getInterventions';
                if (propAthleteId) {
                    url += `?athleteId=${propAthleteId}`;
                }

                console.log(`Fetching interventions from URL: ${url}`);
                const response = await axios.get(url);
                console.log('Response from server:', response.data);

                if (response.data.success) {
                    console.log('Interventions data:', response.data.interventions);
                    setInterventions(response.data.interventions);
                } else {
                    console.error(`Error fetching interventions: ${response.data.message}`);
                }
            } catch (error) {
                console.error('Error fetching interventions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInterventions();
    }, [propAthleteId]);

     const formatDateString = (dateString) => {
        try {
            return format(new Date(dateString), 'yyyy-MM-dd HH:mm:ss');
        } catch (error) {
            console.error('Error formatting date:', dateString, error);
            return dateString;
        }
    };

    const columns = [
        { name: 'Titel', selector: 'title', sortable: true },
        { name: 'PDF-URL', selector: 'pdfUrl', cell: row => <a href={row.pdfUrl} target="_blank" rel="noopener noreferrer">PDF anzeigen</a> },
        { name: 'Erste Zugriffszeit', selector: 'firstAccessTime', sortable: true, cell: row => formatDateString(row.firstAccessTime)},
        { name: 'Abschnitt', selector: 'section', sortable: true },
    ];

    const customStyles = {
        table: {
            style: {
                width: '80%',
                marginLeft: 'auto',  // Align right
                marginRight: '0',    // Align right
                fontSize: '0.875rem', // Smaller font size
            },
        },
        header: {
            style: {
                minHeight: '56px',
            },
        },
        headRow: {
            style: {
                backgroundColor: '#f8f9fa',
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px',
                paddingRight: '8px',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px',
                paddingRight: '8px',
            },
        },
    };

    return (
        <div className="container" style={{ maxWidth: '90%', margin: '0 auto', padding: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ width: '80%' }}>
                <h3 style={{ textAlign: 'center' }}>List of Interventions</h3>

                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <CircularProgress />
                    </div>
                ) : (
                    <DataTable
                        columns={columns}
                        data={interventions}
                        pagination
                        customStyles={customStyles}
                    />
                )}
            </div>
        </div>
    );
}
