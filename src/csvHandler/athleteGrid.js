/*
By Ahmed Al-Ghezi
 */
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



//import '../register/style.css';




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


    function createRow(ID,name){
        const obj = [];
        obj[0]= ID;
        obj[1]= name;
        obj[2]= "Upload report";
        obj[3] = "Upload consent";
        obj[4] = "Show profile";
        obj[5] = "Show consent";
        return obj;
    }

    const onAction = (event) => {
        //event.preventDefault();
        const action = event.target.name.split("-")[0];
        const selectedID = event.target.name.split("-")[1];
        if(action === "Upload report")
            props.uploadReport(selectedID);
        if(action === "Upload consent")
            props.uploadConsent(selectedID);
        if(action === "Show profile")
            props.showProfile(selectedID);
        if(action === "Show consent" && props.showConsent)
            props.showConsent(selectedID);
    }


    function processStudyArr(arr) {
        const actionArr = [];
        for (let i = 0; i < arr.length; i++) {
            let name = "-";
            arr[i].name? name = arr[i].name: name ="-";
            const row = createRow(arr[i].ID,name);
            actionArr.push(row);
        }
        let header = [];
        for (let i =0 ; i <  actionArr[0].length; i++) {
            if(i==0)
                header.push("ID");
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



    const getAthlete = (event) => {
        PostSignup.getAthletesID({"discipline": discipline, "key": key,"onlyCoach":isOnlyCoach}).then(response => {
            console.log(response.data);
            if (response.data.res === "no") {
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


    const changeCoach = (event) => {
        event.preventDefault();
        const value = event.target.checked;
        setOnlyCoach(value);
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
                <input type="checkbox" id="coaches" name="coaches" value="no_coaches"  onChange={changeCoach}/>
                <label htmlFor="coaches"> only coaches </label>


                <Alert severity="success" hidden={!success}>{successMsg}</Alert>
                <Alert severity="error" hidden={!error}>{errorMsg}</Alert>

                <table className={"styled-table"}>
                    <thead>
                  <tr>
                      {headerArray.map((colItem) => (
                          <td>{colItem}</td>
                      ))}
                  </tr>
                    </thead>
                    <tbody>
                    {actionArray.map((row) => (
                        <tr>
                            {row.map((item) => (
                            <td><a href="#" name={item+"-"+row[0]} onClick={onAction}>{item}</a></td>
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