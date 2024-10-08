import React, { useEffect, useState } from 'react';
import { processArr, CSVToArray } from "./processCSV";
import PostSignup from "../DB/postSignup";
import MuiAlert from "@material-ui/lab/Alert";
import { Alert } from "@mui/material";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import LoggedHandler from "../DB/loggedHandler";
import * as XLSX from 'xlsx';  // Import the xlsx library

export default function GetIDS() {
    const columnsC = [
        {
            name: 'name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'discipline',
            selector: row => row.discipline,
            sortable: true
        },
        {
            name: 'ID',
            selector: row => row.ID,
            sortable: true
        },
        {
            name: 'email',
            selector: row => row.email,
            sortable: true
        },
        {
            name: 'age',
            selector: row => row.age,
            sortable: true
        },
    ];

    const [csvFile, setCsvFile] = useState();
    const [csvArray, setCsvArray] = useState([]);
    const [headerArray, setHeaderArray] = useState([]);
    const [valuesMatrix, setValuesMatrix] = useState([]);
    const [sendingRes, setSendingRes] = useState([]);

    const [xlsColumns, setXlsColumns] = useState(columnsC);
    const [objDataList, setObjDataList] = useState([]);
    const [allObjDataList, setAllObjDataList] = useState([]);
    const [checkTestFlag, setCheckTest] = useState(false);
    const [checkIDsFlag, setCheckIDs] = useState(false);
    const [disciplinesList, setDisciplinesList] = useState([]);
    const [discipline, setDiscipline] = useState("");
    const [date, setDate] = useState(new Date().toJSON().slice(0, 10).replace(/-/g, '-'));
    const [space, setSpace] = useState("");
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [key, setKey] = useState("");
    const [approvedStudies, setApprovedStudies] = useState([]);
    const [selectedStudyID, setSelectedStudyID] = useState();
    const [sortInfo, setSortInfo] = useState({ column: null, direction: 'asc' });
    const [dataLoaded, setDataLoaded] = useState(false); // New state for data loaded
    const [keyEntered, setKeyEntered] = useState(false); // New state for key entered

    let navigate = useNavigate();

    const processCSV = (str, delim = ';') => {
        const headers = str.slice(0, str.indexOf('\n')).split(delim);
        const rows = str.slice(str.indexOf('\n') + 1).split('\n');

        setHeaderArray(headers);
        const valuesMatrixA = CSVToArray(str, delim);
        setValuesMatrix(valuesMatrixA);
        const newArray = rows.map(row => {
            const values = row.split(delim);
            const eachObject = headers.reduce((obj, header, i) => {
                obj[header] = values[i];
                return obj;
            }, {})
            return eachObject;
        })
        setCsvArray(newArray);
        updateDataMatrix(valuesMatrixA, headers);
    }

    useEffect(() => {
        if (disciplinesList.length === 0) {
            getDisplines();
        }
    }, [disciplinesList]);

    useEffect(() => {
        // Enable download button if key is entered and data is loaded
        setDataLoaded(objDataList.length > 0);
    }, [objDataList]);

    const getDisplines = () => {
        PostSignup.getAllDisciplines().then(response => {
            if (response.data.res === "error") {
                showError("Error getting disciplines from server");
                return;
            } else if (response.data.res && response.data.res.length > 0) {
                response.data.res.push("all");
                setDisciplinesList(response.data.res);
                setDiscipline(response.data.res[0]);
            }
        }).catch(e => {
            console.log(e);
            alert("some error has happened");
        });
    }

    const handleSort = (column, sortDirection) => {
        setSortInfo({ column, direction: sortDirection });

        const sortedData = [...objDataList].sort((a, b) => {
            if (sortDirection === 'asc') {
                return a[column].localeCompare(b[column]);
            } else {
                return b[column].localeCompare(a[column]);
            }
        });

        setObjDataList(sortedData);
    };

    const checkInput = () => {
        if (discipline === "") {
            showError("please select discipline");
            return false;
        }
        if (key === "") {
            showError("please give a valid key");
            return false;
        }
        return true;
    }

    const setSearchName = (event) => {
        const nameToSearch = event.target.value;
        let local_allObjDataList = allObjDataList;
        if (!allObjDataList) {
            setAllObjDataList(objDataList);
            local_allObjDataList = objDataList;
        }
        if (nameToSearch === "" && allObjDataList) {
            setObjDataList(allObjDataList);
            return;
        }
        event.preventDefault();
        const filteredObjects = local_allObjDataList.filter(obj => obj.name.includes(nameToSearch));
        setObjDataList(filteredObjects);
    }

    const submitAll = () => {
        setError(false);
        if (!checkInput())
            return;
        setKeyEntered(true); // Mark key as entered
        getIdsFromServer();
    }

    const showError = (msg) => {
        setError(true);
        setErrorMsg(msg);
    }

    const showSuccess = (msg) => {
        setSuccess(true);
        setSuccessMsg(msg);
    }

    const getIdsFromServer = () => {
        LoggedHandler.getAthletesID({ "discipline": discipline, "key": key }).then(response => {
            if (response.data.res === "no") {
                showError("Not logged in!");
                window.location.href = window.location.origin + "/reg/sign-in?org=$csv$athleteInfo";
                return;
            }
            if (response.data.res === "error") {
                showError("some error has happened");
                return;
            }

            if (response.data.res === "ok") {
                const header = ["name", "discipline", "ID", "email"];
                const columns = header.map(c => ({
                    name: c,
                    selector: c,
                }));
                setHeaderArray(columns);
                setObjDataList(response.data.arr);
                setAllObjDataList(response.data.arr);
                return;
            }
        }).catch(e => {
            console.log(e);
        });
    }

    const updateDataMatrix = (valMatrix, headers) => {
        setSuccess(false);
        setError(false);
        if (valMatrix.length === 0 || valMatrix[0].length !== headers.length)
            return;
        const list = [];
        for (let i = 0; i < valMatrix.length; i++) {
            const obj = {};
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = valMatrix[i][j];
            }
            list.push(obj);
        }

        setObjDataList(list);
        const columns = headers.map(c => ({
            name: c,
            selector: c,
        }));
    }

    const handleReadData = (headers, rMatrix, objList) => {
        setHeaderArray(headers);
        setValuesMatrix(rMatrix);
        setObjDataList(objList);
        updateDataMatrix(rMatrix, headers);
    }

    const handleDispSele = (event) => {
        event.preventDefault();
        setDiscipline(event.target.value);
        setSuccess(false);
        setError(false);
    }

    const handleStudySele = (event) => {
        event.preventDefault();
        setSelectedStudyID(event.target.value);
        setSuccess(false);
        setError(false);
    }

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleKey = (event) => {
        setKey(event.target.value);
        event.preventDefault();
    }

    const headerStyles = {
        headCells: {
            style: {
                paddingLeft: '8px',
                paddingRight: '8px',
                wordBreak: 'break-all',
                whiteSpace: 'pre-wrap',
                maxWidth: '300px',
                overflow: 'visible',
            },
        },
    };

    // Function to export data to Excel with specific columns
    const exportToExcel = () => {
        const dataToExport = objDataList.map(({ name, ID, discipline, email }) => ({
            name,
            ID,
            discipline,
            email,
        }));

        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'athletes_data.xlsx');
    };

    return (
        <div>
            <h3>Load Basic Athletes Information</h3>
            <form id='csv-form'>
                <br />
                <table>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <div className="form-group">
                                    <label>Discipline</label>
                                    <br />
                                    <select onChange={handleDispSele} name="discipline">
                                        {disciplinesList.map((item) => (
                                            <option key={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                            </td>
                            <td width="20px"></td>
                            <td>
                                <div className="form-group" hidden={true}>
                                    <label>Approved data category</label>
                                    <br />
                                    <select onChange={handleStudySele} name="approved_studies">
                                        {approvedStudies.map((item) => (
                                            <option key={item.ID}>{item.title}</option>
                                        ))}
                                    </select>
                                </div>
                            </td>
                            <td width={20}></td>
                            <td width="20px"></td>
                        </tr>
                    </tbody>
                </table>

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
                    Get Names
                </button>

                <button
                    className="btn btn-primary btn-block paddingBtn"
                    onClick={(e) => {
                        e.preventDefault();
                        setSuccess(false);
                        setError(false);
                        navigate("/csv/displayAccept");
                    }}
                >
                    Show Data Acceptance
                </button>

                <button
                    className="btn btn-primary btn-block paddingBtn"
                    onClick={(e) => {
                        e.preventDefault();
                        setSuccess(false);
                        setError(false);
                        navigate("/csv/squadEditor");
                    }}
                >
                    Squads
                </button>

                <button
                    className="btn btn-primary btn-block paddingBtn"
                    onClick={(e) => {
                        e.preventDefault();
                        setSuccess(false);
                        setError(false);
                        navigate("/reg/sendReminders");
                    }}
                >
                    Reminder emails
                </button>

                <button
                    className="btn btn-primary btn-block paddingBtn"
                    onClick={(e) => {
                        e.preventDefault();
                        if (dataLoaded) {
                            exportToExcel();
                        }
                    }}
                    disabled={!keyEntered || !dataLoaded}
                >
                    Download Excel
                </button>

                <br />
                <br />

                <div className="form-group">
                    <input type="text" className="form-control" name="search_name" placeholder="Search by name" onChange={setSearchName} />
                </div>

                <br />
                <br />

                <Alert severity="success" hidden={!success}>{successMsg}</Alert>
                <Alert severity="error" hidden={!error}>{errorMsg}</Alert>
            </form>

            <DataTable
                highlightOnHover
                columns={columnsC.map((column) => ({
                    ...column,
                    onSort: (column, sortDirection) => handleSort(column.selector, sortDirection),
                }))}
                data={objDataList}
                customStyles={headerStyles}
            />
        </div>
    );
}
