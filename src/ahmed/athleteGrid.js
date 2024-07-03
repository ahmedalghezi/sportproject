
import React, {useEffect, useState} from 'react';
import {processArr} from "./processCSV";
import {CSVToArray} from "./processCSV";
import PostCSVData from "../DB/postCSV";
import Sheet from "./xlsSheet/XlsSheet";
import PostSignup from "../DB/postSignup";
import alert from "bootstrap/js/src/alert";
import MuiAlert from "@material-ui/lab/Alert";
import {Alert} from "@mui/material";
import DataTable from "react-data-table-component";

import './tableStyle.css';
import LoggedHandler from "../DB/loggedHandler";



//import '../register/style.css';


// const arr = [
//     {
//         "name": "sttest1 test",
//         "ID": 1,
//         "discipline": "Basketball",
//         "hasConsent": false,
//         "email": "test1@test.test",
//         "age": 20
//     },
//     {
//         "name": "astest3 test",
//         "ID": 2,
//         "discipline": "Basketball",
//         "hasConsent": false,
//         "email": "test3@test.test",
//         "age": 20
//     },
//     {
//         "name": "patest3 test",
//         "ID": 3,
//         "discipline": "Basketball",
//         "hasConsent": false,
//         "email": "test3@test.test",
//         "age": 20
//     },
//     {
//         "name": "xpatest3 test",
//         "ID": 6,
//         "discipline": "Basketball",
//         "hasConsent": false,
//         "email": "test3@test.test",
//         "age": 20
//     },
//     {
//         "name": "mpatest3 test",
//         "ID": 4,
//         "discipline": "Basketball",
//         "hasConsent": false,
//         "email": "test3@test.test",
//         "age": 20
//     },
//     {
//         "name": "lpatest3 test",
//         "ID": 5,
//         "discipline": "Basketball",
//         "hasConsent": false,
//         "email": "test3@test.test",
//         "age": 20
//     }
// ]

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

    const[isOnlyCoach,setOnlyCoach] = useState(false);
    const[isOnlyExternal,setOnlyExternal] = useState(false);
    const[isOnlyCompetence, setOnlyCompetence] = useState(false);





    useEffect(() => {
        console.log("starting");
        //TODO find a better way
        if (disciplinesList.length == 0) {
            getDisplines();
            //showError("This page is under update ...");
        }

    });

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
    }

    const getAthlete = (event) => {
        LoggedHandler.getAthletesID({"discipline": discipline, "key": key,"onlyCoach":isOnlyCoach, "onlyExternal":isOnlyExternal,"onlyCompetence":isOnlyCompetence}).then(response => {
            console.log(response.data);
            if (response.data.res === "no") {
                // processStudyArr(arr);
                showError("Not authorize to access the data");
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


        })
            .catch(e => {
                console.log(e);
            });

            // processStudyArr(arr);

    }

    function createRow(ID,name,lastAccessTime, hasConsent){
        const obj = [];
        obj[0]= ID;
        obj[1]= name;
        obj[2]= "Upload report";
        obj[3] = "Upload consent";
        obj[4] = "Show profile";
        obj[5] = "";
        if(hasConsent)
            obj[5] = "Show consent";
        obj[6] = "lock";
        obj[7] = lastAccessTime;

        return obj;
    }

    const onAction = (event) => {
        //event.preventDefault();
        const action = event.target.name.split("-")[0];
        const selectedID = event.target.name.split("-")[1];
        let name = "";
        if( event.target.name.split("-").length > 2)
            name = event.target.name.split("-")[2];

        // if(action === "Upload report")
        //     props.uploadReport(selectedID, name);

        if (action === "Upload report") {
            // Access the actionArray from the component's state
            const allIDs = actionArray.map(row => row[0]);
            const allNames = actionArray.map(row => row[1]);

            // Call the uploadReport function with all IDs and names
            props.uploadReport(allIDs, allNames,selectedID,name );
        }

        if(action === "Upload consent")
            props.uploadConsent(selectedID);
        if(action === "Show profile")
            props.showProfile(selectedID);
        if(action === "Show consent" && props.showConsent)
            props.showConsent(selectedID);
        if(action === "lock")
            warnThenLock(selectedID);
    }


    const lockAccount = async (selectedID) => {
        try {
            const response = await fetch('https://inprove-sport.info/reg/lockAccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: selectedID}) // Assuming the ID should be in the body of the request
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
        if(window.confirm("This will deactivate the chosen account. Continue?")) {
            lockAccount(selectedID);
        }
    }


    function processStudyArr(arr) {
        const actionArr = [];
        for (let i = 0; i < arr.length; i++) {
            let name = "-";
            arr[i].name? name = arr[i].name: name ="-";
            let lastAccessTime = "-";
            if(arr[i].last_access) {
                lastAccessTime = arr[i].last_access;
                lastAccessTime = lastAccessTime.split("T")[0];
            }
            const hasConsent = arr[i].hasConsent;
            const row = createRow(arr[i].ID, name, lastAccessTime, hasConsent);
            actionArr.push(row);
        }
        let header = [];
        for (let i =0 ; i <  actionArr[0].length; i++) {
            if(i==0)
                header.push("ID");
            else if(i===actionArr[0].length-1)
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
    }

    const showError = (msg) => {
        setError(true);
        setErrorMsg(msg);
    }


    const showSuccess = (msg) => {
        setSuccess(true);
        setSuccessMsg(msg);

    }

    const handleDispSele = (event) => {
        event.preventDefault();
        setDiscipline(event.target.value);
        setSuccess(false);
        setError(false);
    }


    function Alert(props) {
        return <MuiAlert elevation={6}
                         variant="filled" {...props} />;
    }


    const handleKey = (event) => {
        setKey(event.target.value);
        event.preventDefault();
    }


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
    }

    return (
        <div>
            <h3>Manage Athletes</h3>
            <form id='csv-form'>
                <br/>

                <div className="form-group">
                    <label>Discipline</label>
                    <br></br>
                    <select onChange={handleDispSele}  name="discipline">
                        {disciplinesList.map((item) => (
                            <option key={item}>{item}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <input type="text" className="form-control" name="key" placeholder="key" onChange={handleKey}/>
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
                <input type="checkbox" id="coaches" name="coaches" value="no_coaches"  onChange={changeRole} checked={isOnlyCoach}/>
                <label htmlFor="coaches"> only coachess </label>
                &nbsp; &nbsp; &nbsp;
                <input type="checkbox" id="external" name="external" value="external"  onChange={changeRole} checked={isOnlyExternal}/>
                <label htmlFor="external"> external </label>
                &nbsp; &nbsp; &nbsp;
                <input type="checkbox" id="competence" name="competence" value="competence"  onChange={changeRole} checked={isOnlyCompetence}/>
                <label htmlFor="competence"> competence team </label>


                <Alert severity="success" hidden={!success}>{successMsg}</Alert>
                <Alert severity="error" hidden={!error}>{errorMsg}</Alert>

                <table className={"styled-table"}>
                    <thead>
                  <tr>
                      {headerArray.map((colItem) =>
                    //   {console.log(colItem);
                      (
                          <td>{colItem}</td>
                      ))}
                  </tr>
                    </thead>
                    <tbody>
                    {actionArray.map((row) => (
                        <tr>
                            {row.map((item) => (
                            <td><a href="#" name={item+"-"+row[0]+"-"+row[1]} onClick={onAction}>{item}</a></td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>


                <br/>
                <br/>


            </form>

        </div>
    );

}
