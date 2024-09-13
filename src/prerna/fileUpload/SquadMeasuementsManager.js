import React, { Component } from 'react';
import '../SquadMeasurementManager.css';

class SquadMeasurementManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSquad: '',
            selectedDiscipline: '',
            selectedDates: {}, // Use a composite key for storing selected dates
            highlightedInput: null,
            measurements: [],
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        fetch('https://inprove-sport.info/avatar/HtdMkuQusmTerss/getUniqueDateInfo/')
            .then(response => {
            console.log("Response GET:", response);
            return response.json();
     } )
            .then(data => {
                console.log("Response Body:", data);
                // this.setState({ measurements: data, loading: false });
                const cleanedData = data.map(measurement => ({
                    ...measurement,
                    dates: measurement.dates.filter(date => !isNaN(Date.parse(date))) // Filter out invalid dates
                }));
    
                console.log("Cleaned Data:", cleanedData);
                this.setState({ measurements: cleanedData, loading: false });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    }

    getUniqueSortedDates(dates) {
        const validDates = dates
            .map(date => new Date(date))
            .filter(date => !isNaN(date.getTime()));

        const uniqueDates = [...new Set(validDates)];

        if (uniqueDates.length > 1) {
            const lastAddedDate = uniqueDates.pop();
            uniqueDates.unshift(lastAddedDate);
        }
        // console.log("uniqueDates : ", uniqueDates)
        return uniqueDates;
    }

    handleSquadChange = (e) => {
        this.setState({ selectedSquad: e.target.value });
    };

    handleDisciplineChange = (e) => {
        this.setState({ selectedDiscipline: e.target.value });
    };

    handleDateChange = (e, squad, discipline) => {
        const date = e.target.value;
        this.setState(prevState => ({
            selectedDates: { ...prevState.selectedDates, [`${squad}-${discipline}`]: date }
        }));
    };


    handleAddDate = (squad, discipline) => {
        const { measurements, selectedDates } = this.state;
        const measurement = measurements.find(m => m.squad === squad && m.discipline === discipline);
        const dateToAdd = selectedDates[`${squad}-${discipline}`];
        console.log("dateToAdd : ", dateToAdd)
        
        const isValidDate = (dateString) => {
            const regex = /^\d{4}-\d{2}-\d{2}$/;
            return regex.test(dateString) && !isNaN(new Date(dateString).getTime());
        };

        if (!dateToAdd  || isNaN(Date.parse(dateToAdd)) || !isValidDate(dateToAdd)) {
            alert('Please select a valid date.');
            return;
        }

        if (measurement.dates.includes(dateToAdd)) {
            alert('This date already exists.');
            return;
        }    

        const updatedDates = [...measurement.dates, dateToAdd];

        const requestBody = {
            discipline: measurement.discipline,
            squad: measurement.squad,
            dates: updatedDates,
        };

        console.log("requestBody : ", requestBody)
        fetch('https://inprove-sport.info/avatar/HtdMkuQusmTerss/setUniqueDateInfo/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        })
        .then(response => response.text())
        .then(data => {
            console.log("Response Body:", data);
            measurement.dates = updatedDates;
            this.setState(prevState => ({
                measurements: prevState.measurements.map(m => 
                    m.squad === squad && m.discipline === discipline ? measurement : m),
                selectedDates: { ...prevState.selectedDates, [`${squad}-${discipline}`]: '' }
            }));
        })
        .catch(error => {
            alert(`Error adding date: ${error.message}`);
            console.error('Error adding date:', error);
        });
    };

    handleEditDate = (squad, discipline, oldDate, newDate) => {
        this.setState({ highlightedInput: null }); 
        const { measurements } = this.state;
        const measurement = measurements.find(m => m.squad === squad && m.discipline === discipline);

        const dateIdx = measurement.dates.findIndex(date => date === oldDate);
        if (dateIdx === -1) {
            console.error('Date not found in the original array.');
            return;
        }

        const updatedDates = [...measurement.dates];
        updatedDates[dateIdx] = newDate;

        const requestBody = {
            discipline: measurement.discipline,
            squad: measurement.squad,
            dates: updatedDates,
        };
        console.log("requestBody : ", requestBody)
        fetch('https://inprove-sport.info/avatar/HtdMkuQusmTerss/setUniqueDateInfo/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        })
        .then(response => response.text())
        .then(data => {
            console.log("Response Body:", data);
            this.setState(prevState => ({
                measurements: prevState.measurements.map(m => 
                    m.squad === squad && m.discipline === discipline ? { ...measurement, dates: updatedDates } : m)
            }));
        })
        .catch(error => {
            console.error('Error editing date:', error);
        });
    };

    handleDeleteDate = (squad, discipline, dateToDelete) => {
        const { measurements } = this.state;
        const measurement = measurements.find(m => m.squad === squad && m.discipline === discipline);

        const updatedDates = measurement.dates.filter(date => date !== dateToDelete);

        const requestBody = {
            discipline: measurement.discipline,
            squad: measurement.squad,
            dates: updatedDates,
        };
        console.log("requestBody : ", requestBody)
        fetch('https://inprove-sport.info/avatar/HtdMkuQusmTerss/setUniqueDateInfo/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        })
        .then(response => response.text())
        .then(data => {
            console.log("Response Body:", data);
            this.setState(prevState => ({
                measurements: prevState.measurements.map(m => 
                    m.squad === squad && m.discipline === discipline ? { ...measurement, dates: updatedDates } : m)
            }));
        })
        .catch(error => {
            console.error('Error deleting date:', error);
        });
    };

    handleFocus = (measurementIndex, dateIndex) => {
        this.setState({ highlightedInput: `${measurementIndex}-${dateIndex}` });
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
                dates: this.getUniqueSortedDates(measurement.dates).map(date => date.toISOString().split('T')[0])
            }))
            
            
            .sort((a, b) => {
                if (a.squad < b.squad) return -1;
                if (a.squad > b.squad) return 1;
                if (a.discipline < b.discipline) return -1;
                if (a.discipline > b.discipline) return 1;
                return 0;
            });
    };
    

    render() {
        const { selectedSquad, selectedDiscipline, selectedDates, loading, error } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

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
                                                value={selectedDates[`${measurement.squad}-${measurement.discipline}`] || ''}
                                                onChange={(e) => this.handleDateChange(e, measurement.squad, measurement.discipline)}
                                            />
                                            <button className="add-date-button" onClick={() => this.handleAddDate(measurement.squad, measurement.discipline)}>
                                                Add Date
                                            </button>
                                        </div>
                                        {measurement.dates
                                        .filter(date => date && !isNaN(Date.parse(date)))
                                        .map((date, dateIndex) => (
                                            
                                            <div key={date} className="date-entry">
                                                <input
                                                    className={`date-input ${this.state.highlightedInput === `${measurementIndex}-${dateIndex}` ? 'highlighted' : ''}`}
                                                    type="date"
                                                    defaultValue={date}
                                                    onFocus={() => this.handleFocus(measurementIndex, dateIndex)}
                                                    onBlur={(e) => this.handleEditDate(measurement.squad, measurement.discipline, date, e.target.value)}
                                                />
                                                <button className="del-date" onClick={() => this.handleDeleteDate(measurement.squad, measurement.discipline, date)}>
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
