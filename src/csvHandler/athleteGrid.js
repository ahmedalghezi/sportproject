import React, { useEffect, useState } from 'react';
import { processArr } from "./processCSV";
import { CSVToArray } from "./processCSV";
import PostCSVData from "../DB/postCSV";
import Sheet from "./xlsSheet/XlsSheet";
import PostSignup from "../DB/postSignup";
import alert from "bootstrap/js/src/alert";
import MuiAlert from "@material-ui/lab/Alert";
import { Alert } from "@mui/material";
import DataTable from "react-data-table-component";
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

import './tableStyle.css';
import LoggedHandler from "../DB/loggedHandler";

export default function AthletesGrid(props) {
    const [headerArray, setHeaderArray] = useState([]);
    const [actionArray, setActionArray] = useState([]);

    const [disciplinesList, setDisciplinesList] = useState([]);
    const [discipline, setDiscipline] = useState("");
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [key, setKey] = useState("");

    const [isOnlyCoach, setOnlyCoach] = useState(false);
    const [isOnlyExternal, setOnlyExternal] = useState(false);
    const [isOnlyCompetence, setOnlyCompetence] = useState(false);

   /*  const [athletesState, setAthletesState] = useState({
        headerArray: [],
        actionArray: [],
        disciplinesList: [],
        discipline: "",
        key: "",
        isOnlyCoach: false,
        isOnlyExternal: false,
        isOnlyCompetence: false
    });*/

    const navigate = useNavigate();

    useEffect(() => {
        console.log("starting");
        if (disciplinesList.length === 0) {
            getDisplines();
        }
    }, [disciplinesList]);

    const getDisplines = () => {
        PostSignup.getAllDisciplines().then(response => {
            if (response.data.res === "error") {
                showError("Error getting disciplines from server");
                return;
            } else if (response.data.res && response.data.res.length > 0) {
                setDisciplinesList(response.data.res);
                setDiscipline(response.data.res[0]);
            }
        }).catch(e => {
            console.log(e);
            alert("some error has happened");
        });
    };

    const getAthlete = (event) => {
        LoggedHandler.getAthletesID({ "discipline": discipline, "key": key, "onlyCoach": isOnlyCoach, "onlyExternal": isOnlyExternal, "onlyCompetence": isOnlyCompetence }).then(response => {
            console.log(response.data);
            if (response.data.res === "no") {
                showError("Not authorized to access the data");
                return;
            }
            if (response.data.res === "error") {
                showError("some error has happened, error code: grid135");
                return;
            }

            if (response.data.res === "ok") {
                const arr = response.data.arr;
                processStudyArr(arr);
                return;
            }
        }).catch(e => {
            console.log(e);
        });
    };

    function createRow(ID, name, lastAccessTime, hasConsent) {
        const obj = [];
        obj[0] = ID;
        obj[1] = name;
        obj[2] = "Upload report";
        obj[3] = "Upload consent";
        obj[4] = "Show profile";
        obj[5] = "";
        if (hasConsent)
            obj[5] = "Show consent";
        obj[6] = "lock";
        obj[7] = lastAccessTime;
        obj[8] = "Intervention"; // Add Intervention link as the last column

        return obj;
    }

    const onAction = (event) => {
        const action = event.target.name.split("-")[0];
        const selectedID = event.target.name.split("-")[1];
        let name = "";
        if (event.target.name.split("-").length > 2)
            name = event.target.name.split("-")[2];

        if (action === "Upload report") {
            const allIDs = actionArray.map(row => row[0]);
            const allNames = actionArray.map(row => row[1]);
            props.uploadReport(allIDs, allNames, selectedID, name);
        }

        if (action === "Upload consent")
            props.uploadConsent(selectedID);
        if (action === "Show profile")
            props.showProfile(selectedID);
        if (action === "Show consent" && props.showConsent)
            props.showConsent(selectedID);
        if (action === "lock")
            warnThenLock(selectedID);
        if (action === "Intervention") {
            console.log("Selected id:", selectedID);
            const queryParams = new URLSearchParams();
            queryParams.append('id', selectedID);
            queryParams.append('name', name);

          /*   // Save the current state before navigating
            setAthletesState(prevState => ({
                ...prevState,
                headerArray,
                actionArray,
                disciplinesList,
                discipline,
                key,
                isOnlyCoach,
                isOnlyExternal,
                isOnlyCompetence
            }));
*/
            navigate('/avatar/interventions?' + queryParams.toString());
        }
    };

    const handleEditName = async (athleteID) => {
        // Prompt the user for the new first and last names
        const firstName = prompt("Enter the new first name for this athlete:");
        const lastName = prompt("Enter the new last name for this athlete:");
    
        // Ensure that both firstName and lastName are provided
        if (!firstName || !lastName) {
            alert("Both first and last names are required.");
            return;
        }
    
        try {
            // Send a POST request to update the athlete's name
            const response = await fetch('https://inprove-sport.info/reg/changeName', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    athlete_id: athleteID,
                }),
            });
    
            // Parse the response
            const data = await response.json();
            console.log("data : ", data)
    
            if (response.ok) {
                // Display success message
                alert("Name updated successfully.");
                // Optionally, you can refresh the athlete list or update the UI here
                submitAll(); // Re-fetch the athlete data to reflect the updated name
            } else {
                // Handle error responses
                console.error('Error:', data.error);
                alert(`Failed to update name: ${data.error}`);
            }
        } catch (error) {
            console.error('Error updating name:', error);
            alert('An error occurred while updating the name.');
        }
    };
    

    const lockAccount = async (selectedID) => {
        try {
            const response = await fetch('https://inprove-sport.info/reg/lockAccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: selectedID })
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            submitAll();
            alert('The account has been successfully locked.');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to lock the account. Please try again.');
        }
    };

    const warnThenLock = (selectedID) => {
        if (window.confirm("This will deactivate the chosen account. Continue?")) {
            lockAccount(selectedID);
        }
    };

    function processStudyArr(arr) {
        const actionArr = [];
        for (let i = 0; i < arr.length; i++) {
            let name = "-";
            arr[i].name ? name = arr[i].name : name = "-";
            let lastAccessTime = "-";
            if (arr[i].last_access) {
                lastAccessTime = arr[i].last_access;
                lastAccessTime = lastAccessTime.split("T")[0];
            }
            const hasConsent = arr[i].hasConsent;
            const row = createRow(arr[i].ID, name, lastAccessTime, hasConsent);
            actionArr.push(row);
        }
        let header = [];
        for (let i = 0; i < actionArr[0].length; i++) {
            if (i === 0)
                header.push("ID");
            else if (i === actionArr[0].length - 1)
                header.push("Intervention");
            else if (i === actionArr[0].length - 2)
                header.push("Last access");
            else
                header.push(" ");
        }
        setActionArray(actionArr);
        setHeaderArray(header);
    }

    const submitAll = () => {
        setError(false);
        getAthlete();
        return;
    };

    const showError = (msg) => {
        setError(true);
        setErrorMsg(msg);
    };

    const showSuccess = (msg) => {
        setSuccess(true);
        setSuccessMsg(msg);
    };

    const handleDispSele = (event) => {
        event.preventDefault();
        setDiscipline(event.target.value);
        setSuccess(false);
        setError(false);
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleKey = (event) => {
        setKey(event.target.value);
        event.preventDefault();
    };

    const changeRole = (event) => {
        const { name, checked } = event.target;

        if (name === 'coaches') {
            setOnlyCoach(checked);
            if (checked) {
                setOnlyExternal(false);
                setOnlyCompetence(false);
            }
        }
        if (name === 'external') {
            setOnlyExternal(checked);
            if (checked) {
                setOnlyCoach(false);
                setOnlyCompetence(false);
            }
        }
        if (name === 'competence') {
            setOnlyCompetence(checked);
            if (checked) {
                setOnlyCoach(false);
                setOnlyExternal(false);
            }
        }
    };

    return (
        <div>
            <h3>Manage Athletes</h3>
            <form id='csv-form'>
                <br />

                <div className="form-group">
                    <label>Discipline</label>
                    <br />
                    <select onChange={handleDispSele} name="discipline">
                        {disciplinesList.map((item) => (
                            <option key={item}>{item}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <input type="text" className="form-control" name="key" placeholder="key" onChange={handleKey} />
                </div>

                <button
                    className="btn btn-primary btn-block paddingBtn"
                    onClick={(e) => {
                        e.preventDefault();
                        setSuccess(false);
                        setError(false);
                        submitAll();
                    }}
                >
                    Show
                </button>
                &nbsp; &nbsp; &nbsp;
                <input type="checkbox" id="coaches" name="coaches" value="no_coaches" onChange={changeRole} checked={isOnlyCoach} />
                <label htmlFor="coaches"> only coaches </label>
                &nbsp; &nbsp; &nbsp;
                <input type="checkbox" id="external" name="external" value="external" onChange={changeRole} checked={isOnlyExternal} />
                <label htmlFor="external"> external </label>
                &nbsp; &nbsp; &nbsp;
                <input type="checkbox" id="competence" name="competence" value="competence" onChange={changeRole} checked={isOnlyCompetence} />
                <label htmlFor="competence"> competence team </label>

                <Alert severity="success" hidden={!success}>{successMsg}</Alert>
                <Alert severity="error" hidden={!error}>{errorMsg}</Alert>

                {/* <table className={"styled-table"}>
                    <thead>
                        <tr>
                            {headerArray.map((colItem, index) =>
                                (
                                    <td key={index}>{colItem}</td>
                                ))}
                        </tr>
                    </thead>
                    <tbody>
                        {actionArray.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((item, colIndex) => (
                                    <td key={colIndex}>
                                        <a href="#" name={item + "-" + row[0] + "-" + row[1]} onClick={onAction}>{item}</a>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table> */}

{/* <table className={"styled-table"}>
        <thead>
            <tr>
                {headerArray.map((colItem, index) => (
                    <td key={index}>{colItem}</td>
                ))}
            </tr>
        </thead>
        <tbody>
            {actionArray.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {row.map((item, colIndex) => {
                        if (colIndex === 1) { // Column with the name
                            return (
                                <td key={colIndex}>
                                    <span>{item}</span>
                                    &nbsp;
                                    <EditIcon
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleEditName(row[0])} // Pass athlete ID to edit name
                                    />
                                </td>
                            );
                        }
                        return (
                            <td key={colIndex}>
                                <a href="#" name={item + "-" + row[0] + "-" + row[1]} onClick={onAction}>{item}</a>
                            </td>
                        );
                    })}
                </tr>
            ))}
        </tbody>
    </table> */}
                <table className={"styled-table"}>
        <thead>
            <tr>
                {headerArray.map((colItem, index) => (
                    <td key={index}>{colItem}</td>
                ))}
            </tr>
        </thead>
        <tbody>
            {actionArray.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {row.map((item, colIndex) => {
                        if (colIndex === 1) { 
                            return (
                                <td key={colIndex}>
                                    <span>{item}</span>
                                    &nbsp;
                                    <EditIcon
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleEditName(row[0])}
                                    />
                                </td>
                            );
                        }
                        return (
                            <td key={colIndex}>
                                <a href="#" name={item + "-" + row[0] + "-" + row[1]} onClick={onAction}>{item}</a>
                            </td>
                        );
                    })}
                </tr>
            ))}
        </tbody>
    </table>

                <br />
                <br />

            </form>
        </div>
    );
}
