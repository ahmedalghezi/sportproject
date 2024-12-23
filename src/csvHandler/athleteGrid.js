import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import MuiAlert from "@material-ui/lab/Alert";
import { Alert } from "@mui/material";
import LoggedHandler from "../DB/loggedHandler";
import PostSignup from "../DB/postSignup";
import './tableStyle.css';

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
    const [editingRow, setEditingRow] = useState(null); // Tracks the row being edited
    const [editingName, setEditingName] = useState({ firstName: "", lastName: "" }); // Stores temporary edits

    const navigate = useNavigate();

    useEffect(() => {
        if (disciplinesList.length === 0) {
            getDisciplines();
        }
    }, [disciplinesList]);

    const getDisciplines = async () => {
        try {
            const response = await PostSignup.getAllDisciplines();
            if (response.data.res === "error") {
                showError("Error getting disciplines from server");
            } else if (response.data.res && response.data.res.length > 0) {
                setDisciplinesList(response.data.res);
                setDiscipline(response.data.res[0]);
            }
        } catch (e) {
            console.error("Error fetching disciplines:", e);
            showError("Error fetching disciplines from server");
        }
    };

    const getAthletes = async () => {
        try {
            const response = await LoggedHandler.getAthletesID({
                discipline,
                key,
                onlyCoach: isOnlyCoach,
                onlyExternal: isOnlyExternal,
                onlyCompetence: isOnlyCompetence,
            });
            if (response.data.res === "no") {
                showError("Not authorized to access the data");
                return;
            }
            if (response.data.res === "error") {
                showError("An error occurred while fetching data (error code: grid135)");
                return;
            }
            if (response.data.res === "ok") {
                processStudyArr(response.data.arr);
            }
        } catch (e) {
            console.error("Error fetching athletes:", e);
            showError("Error fetching athletes from server");
        }
    };

    const handleEditNameClick = (row) => {
        setEditingRow(row[0]); // Row ID
        const [firstName, lastName] = row[1].split(" ");
        setEditingName({ firstName, lastName });
    };

    const handleSaveName = async (athleteID) => {
        try {
            const response = await fetch('https://inprove-sport.info/reg/changeName', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: editingName.firstName,
                    lastName: editingName.lastName,
                    athlete_id: athleteID,
                }),
            });

            if (response.ok) {
                alert("Name updated successfully.");
                setEditingRow(null); // Exit editing mode
                getAthletes(); // Refresh the data
            } else {
                const errorData = await response.json();
                showError(`Failed to update name: ${errorData.error}`);
            }
        } catch (error) {
            console.error("Error updating name:", error);
            showError("An error occurred while updating the name.");
        }
    };

    const handleCancelEdit = () => {
        setEditingRow(null); // Exit editing mode without saving
    };

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
            const queryParams = new URLSearchParams();
            queryParams.append('id', selectedID);
            queryParams.append('name', name);

            navigate('/avatar/interventions?' + queryParams.toString());
        }
    };

    const lockAccount = async (selectedID) => {
        try {
            const response = await fetch('https://inprove-sport.info/reg/lockAccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: selectedID }),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            getAthletes();
            alert('The account has been successfully locked.');
        } catch (error) {
            console.error("Error locking account:", error);
            showError("Failed to lock the account. Please try again.");
        }
    };

    const warnThenLock = (selectedID) => {
        if (window.confirm("This will deactivate the chosen account. Continue?")) {
            lockAccount(selectedID);
        }
    };

    function processStudyArr(arr) {
        const actionArr = arr.map((item) => {
            const name = item.name || "-";
            const lastAccessTime = item.last_access?.split("T")[0] || "-";
            const hasConsent = item.hasConsent;
            return createRow(item.ID, name, lastAccessTime, hasConsent);
        });
        const header = ["ID", "Name", "Upload Report", "Upload Consent", "Show Profile", "Consent", "Lock", "Last Access", "Intervention"];
        setActionArray(actionArr);
        setHeaderArray(header);
    }

    function createRow(ID, name, lastAccessTime, hasConsent) {
        return [ID, name, "Upload report", "Upload consent", "Show profile", hasConsent ? "Show consent" : "", "lock", lastAccessTime, "Intervention"];
    }

    const showError = (msg) => {
        setError(true);
        setErrorMsg(msg);
    };

    const handleRoleChange = (event) => {
        const { name, checked } = event.target;
        if (name === "coaches") {
            setOnlyCoach(checked);
            if (checked) {
                setOnlyExternal(false);
                setOnlyCompetence(false);
            }
        } else if (name === "external") {
            setOnlyExternal(checked);
            if (checked) {
                setOnlyCoach(false);
                setOnlyCompetence(false);
            }
        } else if (name === "competence") {
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
            <form id="csv-form">
                <div className="form-group">
                    <label>Discipline</label>
                    <br />
                    <select onChange={(e) => setDiscipline(e.target.value)} name="discipline">
                        {disciplinesList.map((item) => (
                            <option key={item}>{item}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="key"
                        placeholder="key"
                        onChange={(e) => setKey(e.target.value)}
                    />
                </div>

                <button
                    className="btn btn-primary btn-block paddingBtn"
                    onClick={(e) => {
                        e.preventDefault();
                        setError(false);
                        setSuccess(false);
                        getAthletes();
                    }}
                >
                    Show
                </button>

                <div>
                    <input
                        type="checkbox"
                        id="coaches"
                        name="coaches"
                        onChange={handleRoleChange}
                        checked={isOnlyCoach}
                    />
                    <label htmlFor="coaches">Only coaches</label>
                    <input
                        type="checkbox"
                        id="external"
                        name="external"
                        onChange={handleRoleChange}
                        checked={isOnlyExternal}
                    />
                    <label htmlFor="external">External</label>
                    <input
                        type="checkbox"
                        id="competence"
                        name="competence"
                        onChange={handleRoleChange}
                        checked={isOnlyCompetence}
                    />
                    <label htmlFor="competence">Competence team</label>
                </div>

                <Alert severity="error" hidden={!error}>{errorMsg}</Alert>
                <Alert severity="success" hidden={!success}>{successMsg}</Alert>

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
                                            {editingRow === row[0] ? (
                                                <>
                                                    <input
                                                        type="text"
                                                        value={editingName.firstName}
                                                        onChange={(e) =>
                                                            setEditingName({ ...editingName, firstName: e.target.value })
                                                        }
                                                        placeholder="First Name"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={editingName.lastName}
                                                        onChange={(e) =>
                                                            setEditingName({ ...editingName, lastName: e.target.value })
                                                        }
                                                        placeholder="Last Name"
                                                    />
                                                    <SaveIcon
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => handleSaveName(row[0])}
                                                    />
                                                    <CancelIcon
                                                        style={{ cursor: "pointer" }}
                                                        onClick={handleCancelEdit}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <span>{item}</span>
                                                    <EditNoteIcon
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => handleEditNameClick(row)}
                                                    />
                                                </>
                                            )}
                                        </td>
                                    );
                                }
                                return (
                                    <td key={colIndex}>
                                        <a href="#" name={item + "-" + row[0] + "-" + row[1]} onClick={onAction}>
                                            {item}
                                        </a>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </form>
        </div>
    );
}
