import React, { useState, useEffect } from "react";
import axios from "axios";

function ManageDates({ done, sectionID, discipline,onClose }) {

    const [editSectionDate, setEditSectionDate] = useState("");
    const [datesArr, setDatesArr] = useState([]);
    const [newDates, setNewDates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");
    const [warnMessage, setWarningMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    

    useEffect(() => {
        const fetchDates = async () => {
            try {
                const response = await axios.post(
                    "https://inprove-sport.info/avatar/getSectionDates",
                    { sectionID }
                );
                console.log("response.data", response.data)
                if (response.data.res === 'ok') {
                    console.log("response.data", response.data)
                    setDatesArr(response.data.datesArr);
                }
            } catch (error) {
                setErrorMessage("Error fetching section dates");
                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
                console.error("Error fetching section dates:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDates();
    }, [sectionID]);

    const validateDate = (value) => {
        const dateRegex = /^(\d{4})\-(\d{1,2})\-(\d{1,2})$/;
    
        if (!value.match(dateRegex)) {
            return false;
        }
    
        const [,year, month, day] = value.match(dateRegex);
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1; 
        const currentDay = new Date().getDate();
        
        const monthNum = parseInt(month, 10);
        const dayNum = parseInt(day, 10);
    
        if (year < 1000 || year > 9999 || monthNum < 1 || monthNum > 12 || dayNum < 1 || dayNum > 31) {
            return false;
        }
        if (monthNum === 2) {
            const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
            if (dayNum > 29 || (dayNum === 29 && !isLeapYear)) {
                return false;
            }
        } else if ([4, 6, 9, 11].includes(monthNum)) {
            if (dayNum > 30) {
                return false;
            }
        }
    
        
        const yearNum = parseInt(year, 10);
    
        
        if (yearNum > currentYear ||
            (yearNum === currentYear && monthNum > currentMonth) ||
            (yearNum === currentYear && monthNum === currentMonth && dayNum > currentDay)) {
            return false;
        }
    
        return true;
    };
    

    const handleInputChange = (e) => {
        const { value } = e.target;
        setEditSectionDate(value);
    };

    // const handleAddDate = () => {
    //     if (validateDate(editSectionDate)) {
    //         setNewDates([...newDates, { discipline: discipline, date: editSectionDate }]);
    //         setEditSectionDate(""); // Clear input after successful addition
    //     } else {
    //         console.error("Invalid Date");
    //     }
    // };

    // const handleSubmit = async () => {
    //     try {
    //         const response = await axios.post(
    //             "https://inprove-sport.info/avatar/addSectionDates",
    //             { sectionID, datesArr: newDates}
    //         );
    //         console.log("datesArr", datesArr);
    //         console.log(response.data);
    //         onClose(); // Close modal or perform any other action after successful submission
    //     } catch (error) {
    //         console.error("Error adding section dates:", error);
    //     }
    // };

    const handleAddDate = () => {
        if (validateDate(editSectionDate)) {
            setNewDates([...newDates, { discipline: discipline, date: editSectionDate }]);
            setEditSectionDate(""); 
        } 
        else {
            setErrorMessage("Invalid Date");
                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
        console.error("Invalid Date");
        }
    };
    
    const handleSubmit = async () => {
        try {

            if (newDates.length === 0) {
                setWarningMessage("Add Dates To Submit Successfully!");
                setTimeout(() => {
                    setWarningMessage("");
                }, 3000);
            }

            else {

                console.log("sectionID", sectionID)

                    const response = await axios.post(
                        "https://inprove-sport.info/avatar/addSectionDates",
                        { sectionID, datesArr: newDates }
                    );
                    console.log("datesArr: newDates", datesArr)
                    console.log(response.data);

                    if (response.data.res === 'ok') {
                        setSuccessMessage("Dates submitted successfully!"); 
                        setTimeout(() => {
                            setSuccessMessage("");
                        }, 3000);

                        setNewDates("");

                        const updatedResponse = await axios.post(
                            "https://inprove-sport.info/avatar/getSectionDates",
                            { sectionID }
                        );
                        console.log("updatedResponse : ", updatedResponse.data.datesArr)
    
                        if (updatedResponse.data.res === 'ok') {
                            setDatesArr(updatedResponse.data.datesArr);
                        }
    
                        
                    
                    }

                    else {
                        setErrorMessage("Error Submitting. Please Retry!");
                            setTimeout(() => {
                                setErrorMessage("");
                            }, 3000);
                        console.error("Error Submitting. Please Retry!");
                    }

                    

            }
        } 
        
        catch (error) {
            setErrorMessage("Error Submitting. Please Retry!");
                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
            console.error("Error adding section dates:", error);
        }
        
    };

    return (
        <div style={{
            maxWidth: '800px',
            margin: '20px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px'
        }}
        
        >

            {successMessage && (
                <div style={{
                    padding: '10px',
                    marginTop: '10px',
                    marginRight: '60px',
                    width: '700px',
                    borderRadius: '5px',
                    fontSize: '14px',
                    backgroundColor: '#dff0d8',
                    color: '#3c763d',
                    border: '1px solid #d0e9c6'
                }}>{successMessage}</div>
            )}

            {warnMessage && (
                <div style={{
                    padding: '10px',
                    marginTop: '10px',
                    marginRight: '60px',
                    width: '700px',
                    borderRadius: '5px',
                    fontSize: '14px',
                    backgroundColor: '#fcf8e3',
                    color: '#8a6d3b',
                    border: '1px solid #faebcc'
                }}>{warnMessage}</div>
            )}

            {errorMessage && (
                <div style={{
                    padding: '10px',
                    marginTop: '10px',
                    marginRight: '60px',
                    width: '700px',
                    borderRadius: '5px',
                    fontSize: '14px',
                    backgroundColor: '#f2dede',
                    color: '#a94442',
                    border: '1px solid #ebccd1'
                }}>{errorMessage}</div>
            )}


            
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {datesArr.length > 0 && (
                    <div>
                        <span>Existing Test Dates : </span>
                        {datesArr.map((dateObj, index) => (
                            <div key={index}>
                                {dateObj.date.substring(0, 10)} - {dateObj.discipline}
                            </div>
                        ))}
                        
                    </div>
                )}
                 <br></br>
                 <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label htmlFor="testDate" style={{ marginRight: '12px' }}>Enter Test Dates:</label>
                    <input
                        id="testDate"
                        className="form-control"
                        type="text"
                        placeholder="yyyy-mm-dd"
                        value={editSectionDate}
                        onChange={handleInputChange}
                        maxLength={12}
                        style={{ width: '120px', marginRight: '12px' }}
                        
                    />
                    <button onClick={handleAddDate} className={"btn btn-primary btn-block"} style={{ marginRight: '10px' }}>Add Test Date</button>
                    <button onClick={handleSubmit} className={"btn btn-primary btn-block"} style={{ marginRight: '10px' }}>Submit Dates</button>
                    <button onClick={onClose} className={"btn btn-primary btn-block"}>Close </button>
                    
                </div>
                <br></br>
                {newDates.length > 0 && (
                <div>   
                        <p style={{
                    padding: '10px',
                    marginTop: '10px',
                    marginRight: '60px',
                    width: '700px',
                    borderRadius: '5px',
                    fontSize: '14px',
                    backgroundColor: '#fcf8e3',
                    color: '#8a6d3b',
                    border: '1px solid #faebcc'
                }}> 
                Use Submit button to submit the added dates.
                All the existing dates in the system will be replaced! <br></br>
                Change the discipline using the dropdown (default value: "All"). 
                </p>
                        <span> Added Test Dates : </span>
                        {newDates.map((dateObj, index) => (
                            <div key={index}>
                                {dateObj.date} - {dateObj.discipline}
                            </div>
                        ))}
                    </div> )}

                   
            
            </div>
        )}

        
    </div>
    );
}
export default ManageDates;