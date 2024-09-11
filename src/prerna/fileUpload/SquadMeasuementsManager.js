import React, { Component } from 'react';
import '../SquadMeasurementManager.css';

class SquadMeasurementManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSquad: '',
            selectedDiscipline: '',
            selectedDates: {},
            highlightedInput: null,
            measurements: [], // Initially empty, will be filled with fetched data
            loading: true,    // To show a loading state
            error: null       // To handle any error during fetch
        };
    }

    // Fetch data from API when component mounts
    componentDidMount() {
        fetch('https://inprove-sport.info/avatar/HtdMkuQusmTerss/getUniqueDateInfo/')
            .then(response => response.json())
            .then(data => {
                console.log("Response Body:", data);
                this.setState({ measurements: data, loading: false });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    }

    // Helper function to get unique and sorted dates
    getUniqueSortedDates(dates) {
        const validDates = dates
            .map(date => new Date(date))         // Convert each date string to a Date object
            .filter(date => !isNaN(date.getTime())); // Filter out invalid dates

        const uniqueDates = [...new Set(validDates)]; // Ensure the dates are unique

        // Sort dates in descending order (latest first)
        uniqueDates.sort((a, b) => b - a);

        // Return all unique dates
        return uniqueDates;
    }

    handleSquadChange = (e) => {
        this.setState({ selectedSquad: e.target.value });
    };

    handleDisciplineChange = (e) => {
        this.setState({ selectedDiscipline: e.target.value });
    };

    handleDateChange = (e, measurementIndex) => {
        const { selectedDates } = this.state;
        this.setState({ selectedDates: { ...selectedDates, [measurementIndex]: e.target.value } });
    };

    // Add a new date using the /addUniqueDateInfo API
    handleAddDate = (measurementIndex) => {
        const { measurements, selectedDates } = this.state;
        const measurement = measurements[measurementIndex];
        const dateToAdd = selectedDates[measurementIndex]; // Fetch the selected date for this row

        // Check if the selectedDate is empty or invalid
        if (!dateToAdd) {
            alert('Please select a valid date.');
            return;
        }

        const validDates = measurement.dates.filter(date => date);
        const updatedDates = [...validDates, dateToAdd];

        const requestBody = {
            discipline: measurement.discipline,
            squad: measurement.squad,
            dates: updatedDates,
        };

        console.log('requestBody: ', requestBody);

        fetch('https://inprove-sport.info/avatar/HtdMkuQusmTerss/setUniqueDateInfo/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add date.');
            }

            // If successful, update the UI
            measurements[measurementIndex].dates = updatedDates;
            this.setState({ 
                measurements: [...measurements],
                selectedDates: { ...selectedDates, [measurementIndex]: '' }  // Reset the specific row's date field after successful addition
            });

            return response.text();
        })
        .then(data => {
            console.log("Response Body:", data); // Log the response body to inspect
        })
        .catch(error => {
            alert(`Error adding date: ${error.message}`);
            console.error('Error adding date:', error);

            // Reset the date field regardless of success or failure
            this.setState({ selectedDates: { ...selectedDates, [measurementIndex]: '' } });
        });
    };

    // Handle the focus event by highlighting the input field
handleFocus = (measurementIndex, dateIndex) => {
    this.setState({ highlightedInput: `${measurementIndex}-${dateIndex}` });
};

// Handle the blur event, update the date and remove the highlight
handleEditDate = (measurementIndex, oldDate, newDate, dateIndex) => {
    this.setState({ highlightedInput: null }); // Remove the highlight

    const { measurements } = this.state;
    const measurement = measurements[measurementIndex];

    // Find the index of the oldDate in the original dates array
    const dateIdx = measurement.dates.findIndex(date => date === oldDate);

    if (dateIdx === -1) {
        console.error('Date not found in the original array.');
        return;
    }

    // Create a copy of the dates array and update the found date
    const updatedDates = [...measurement.dates];
    updatedDates[dateIdx] = newDate;

    const requestBody = {
        discipline: measurement.discipline,
        squad: measurement.squad,
        dates: updatedDates,
    };

    fetch('https://inprove-sport.info/avatar/HtdMkuQusmTerss/setUniqueDateInfo/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
    .then(response => response.text())
    .then(data => {
        console.log("Response Body:", data); // Log the response body to inspect
        measurements[measurementIndex].dates = updatedDates;
        this.setState({ measurements: [...measurements] });
    })
    .catch(error => {
        console.error('Error editing date:', error);
    });
};

    // Delete a date using the /setUniqueDateInfo API
    handleDeleteDate = (measurementIndex, dateToDelete) => {
        const { measurements } = this.state;
        const measurement = measurements[measurementIndex];

        // Find the index of the dateToDelete in the original dates array
        const dateIndex = measurement.dates.findIndex(date => date === dateToDelete);

        if (dateIndex === -1) {
            console.error('Date not found in the original array.');
            return;
        }

        // Create a copy of the dates array and remove the found date
        const updatedDates = [...measurement.dates];
        updatedDates.splice(dateIndex, 1); // Remove the date

        const requestBody = {
            discipline: measurement.discipline,
            squad: measurement.squad,
            dates: updatedDates,
        };

        console.log("Delete Date Request Body:", JSON.stringify(requestBody)); // Print the request body

        fetch('https://inprove-sport.info/avatar/HtdMkuQusmTerss/setUniqueDateInfo/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
        .then(response => response.text())
        .then(data => {
            console.log("Response Body:", data); // Log the response body to inspect
            measurements[measurementIndex].dates = updatedDates;
            this.setState({ measurements: [...measurements] });
        })
        .catch(error => {
            console.error('Error deleting date:', error);
        });
    };

    getFilteredMeasurements = () => {
        const { selectedSquad, selectedDiscipline, measurements } = this.state;

        return measurements
            .filter(measurement => {
                return (
                    (!selectedSquad || measurement.squad === selectedSquad) &&
                    (!selectedDiscipline || measurement.discipline === selectedDiscipline)
                );
            })
            .map(measurement => ({
                ...measurement,
                dates: this.getUniqueSortedDates(measurement.dates).map(date => date.toISOString().split('T')[0]) // Convert to ISO date format (YYYY-MM-DD)
            }));
    };

    render() {
        const { selectedSquad, selectedDiscipline, selectedDates, loading, error } = this.state;

        // Display loading state
        if (loading) {
            return <div>Loading...</div>;
        }

        // Handle error state
        if (error) {
            return <div>Error loading data: {error.message}</div>;
        }

        const filteredMeasurements = this.getFilteredMeasurements();

        return (
            <div className="s-container">
                <h2 className="title">Squad Measurement Manager</h2>
                <div className="selectors">
                    <select className="selector" onChange={this.handleSquadChange} value={selectedSquad}>
                        <option value="">Select Squad</option>
                        {[...new Set(this.state.measurements.map(data => data.squad))].map(squad => (
                            <option key={squad} value={squad}>{squad}</option>
                        ))}
                    </select>

                    <select className="selector" onChange={this.handleDisciplineChange} value={selectedDiscipline}>
                        <option value="">Select Discipline</option>
                        {[...new Set(this.state.measurements.map(data => data.discipline))].map(discipline => (
                            <option key={discipline} value={discipline}>{discipline}</option>
                        ))}
                    </select>
                </div>
                <div className="table-container">
                <table className="measurement-table">
                    <thead>
                        <tr>
                            <th>Squad</th>
                            <th>Discipline</th>
                            <th>Dates</th>
                            {/* <th>Add Date</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMeasurements.map((measurement, measurementIndex) => (
                            <tr key={`${measurement.squad}-${measurement.discipline}`}>
                                <td>{measurement.squad}</td>
                                <td>{measurement.discipline}</td>
                                
                                <td className="date-cell">

                                <div className="date-entry">
                                    <input
                                        className="date-input"
                                        type="date"
                                        value={selectedDates[measurementIndex] || ''}
                                        onChange={(e) => this.handleDateChange(e, measurementIndex)}
                                    />
                                    <button className="add-date-button" onClick={() => this.handleAddDate(measurementIndex)}>
                                        Add Date
                                    </button> </div>

                                    {measurement.dates.map((date,dateIndex) => (
                                        <div key={date} className="date-entry">
                                            <input
                                                className={`date-input ${this.state.highlightedInput === `${measurementIndex}-${dateIndex}` ? 'highlighted' : ''}`}
                                                type="date"
                                                defaultValue={date} // Allow manual editing with defaultValue
                                                onFocus={() => this.handleFocus(measurementIndex, dateIndex)} // Start highlighting when the field is focused
                                                onBlur={(e) => this.handleEditDate(measurementIndex, date, e.target.value,dateIndex)} // Commit change on blur
                                            />
                                            <button className="del-date" onClick={() => this.handleDeleteDate(measurementIndex, date)}>
                                                Delete
                                            </button>
                                        </div>
                                    ))}
                                
                               
                                
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
                
            </div>
        );
    }
}

export default SquadMeasurementManager;
