

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

//import '../register/style.css';



export default function  GetIDS(){



    const columnsC = [
        {
            name: 'name',
            selector: row => row.name,
        },
        {
            name: 'discipline',
            selector: row => row.discipline,
        },
        {
            name: 'ID',
            selector: row => row.ID,
        },
    ];


    const [csvFile, setCsvFile] = useState();
    const [csvArray, setCsvArray] = useState([]);
    const [headerArray, setHeaderArray] = useState([]);
    const [valuesMatrix, setValuesMatrix] = useState([]);
    const [sendingRes, setSendingRes] = useState([]);

    const [xlsColumns, setXlsColumns] = useState(columnsC);
    const [objDataList, setObjDataList] = useState();
    const [checkTestFlag, setCheckTest] = useState(false);

    const [checkIDsFlag, setCheckIDs] = useState(false);
    const [disciplinesList, setDisciplinesList] = useState([]);
    const [discipline, setDiscipline] = useState("");
    const [date, setDate] = useState(new Date().toJSON().slice(0,10).replace(/-/g,'-'));

    const [space, setSpace] = useState("");
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [key, setKey] = useState("");


    const [approvedStudies, setApprovedStudies] = useState([]);
    const [selectedStudyID, setSelectedStudyID] = useState();



    const processCSV = (str, delim=';') => {
        const headers = str.slice(0,str.indexOf('\n')).split(delim);
        const rows = str.slice(str.indexOf('\n')+1).split('\n');

        setHeaderArray(headers);
        const valuesMatrixA = CSVToArray(str,delim);
        setValuesMatrix(valuesMatrixA);
        const newArray = rows.map( row => {
            const values = row.split(delim);
            //setValuesArray(values);
            const eachObject = headers.reduce((obj, header, i) => {
                obj[header] = values[i];
                return obj;
            }, {})
            return eachObject;
        })
        setCsvArray(newArray);
        updateDataMatrix(valuesMatrixA,headers);
    }


    useEffect(() => {
        //TODO find better way
        if(disciplinesList.length == 0){
            getDisplines();
            getApprovedStudies();
        }

    });

    const getDisplines = () => {
        PostSignup.getAllDisciplines().then(response => {
            if(response.data.res === "error") {
                showError("Error getting disciplines from server");
                return;
            }
            else if(response.data.res && response.data.res.length > 0){
                setDisciplinesList(response.data.res);
                setDiscipline(response.data.res[0]);
            }

        }).catch(e => {
            console.log(e);
            alert("some error has happened");
        });
    }


    const getApprovedStudies = () => {
        PostSignup.getStudies().then(response => {
            if(response.data.res === "error") {
                showError("Error getting disciplines from server");
                return;
            }
            else if(response.data.res && response.data.res.length > 0){
                setApprovedStudies(response.data.res);
                setSelectedStudyID(response.data.res[0]);
            }

        }).catch(e => {
            console.log(e);
            alert("some error has happened");
        });
    }


    const checkInput = () =>{
        if(discipline == ""){
            showError("please select discipline");
            return false;
        }
        if(key === ""){
            showError("please give a valid key");
            return false;
        }
        return true;
    }

    const submitAll = () => {
        setError(false);
        if(!checkInput())
            return;
        getIdsFromServer();
        return;
    }

    const showError = (msg) =>{
        setError(true);
        setErrorMsg(msg);
    }


    const showSuccess = (msg) =>{
        setSuccess(true);
        setSuccessMsg(msg);
    }

    const getIdsFromServer = () => {
      PostSignup.getAthletesID({"discipline":discipline,"key":key}).then(response => {
          console.log(response.data);
          if(response.data.res === "no"){
              showError("Not logged in!");
              window.location.href = "https://inprove-sport.info:3000/reg/sign-in?org=$csv$athleteInfo";
              return;
          }
          if(response.data.res === "error"){
              showError("some error has happened");
              return;
          }

          if(response.data.res === "ok"){
              const header = ["name","discipline","ID"];
              const columns = header.map(c => ({
                  name: c,
                  selector: c,
              }));
              setHeaderArray(columns);
              console.log(response.data.arr);
              console.log(columns);
              setObjDataList(response.data.arr);
              return;
          }


      })
          .catch(e => {
              console.log(e);
          });
    }


    const updateDataMatrix = (valMatrix,headers) => {
        setSuccess(false);
        setError(false);
        if(valMatrix.length===0 || valMatrix[0].length !== headers.length)
            return;
        const list = [];
        for (let i = 0; i < valMatrix.length; i++) {
            const obj = {};
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = valMatrix[i][j];
            }
            // remove the blank rows
            //if (obj.values(obj).filter(x => x).length > 0) {
            //  list.push(obj);
            //}
            list.push(obj);
        }

        setObjDataList(list);
        const columns = headers.map(c => ({
            name: c,
            selector: c,
        }));
        //setXlsColumns(columns);
    }

    const handleReadData = (headers,rMatrix,objList) => {
        setHeaderArray(headers);
        setValuesMatrix(rMatrix);
        setObjDataList(objList);
        updateDataMatrix(rMatrix,headers);
    }

    const  handleDispSele = (event) =>{
        event.preventDefault();
        setDiscipline(event.target.value);
        setSuccess(false);
        setError(false);
    }


    const handleStudySele =  (event) =>{
        event.preventDefault();
        setSelectedStudyID(event.target.value);
        setSuccess(false);
        setError(false);
    }


    function Alert(props) {
        return <MuiAlert elevation={6}
                         variant="filled" {...props} />;
    }


    const handleKey = (event) =>{
        setKey(event.target.value);
        event.preventDefault();
    }

    return(
        <div>
            <h3>Load Basic Athletes Information</h3>
            <form id='csv-form'>
                <br/>

                <button
                    className="btn btn-primary btn-block"
                    onClick={(e) => {
                        e.preventDefault()
                        const res = processArr(headerArray,valuesMatrix);
                        if(res)
                            setValuesMatrix(valuesMatrix);
                        updateDataMatrix(valuesMatrix,headerArray);
                    }} hidden={true}>
                    Anonymize(name,birthdate)
                </button>




                <table>
                    <tr>
                        <td>     </td>
                        <td>
                            <div className="form-group">
                                <label>Discipline</label>
                                <br></br>
                                <select onChange={handleDispSele}  name="discipline">
                                    {disciplinesList.map((item) => (
                                        <option key={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                        </td>


                        <td width="20px">     </td>
                        <td>
                            <div className="form-group" hidden={true}>
                                <label>Approved data category</label>
                                <br></br>
                                <select onChange={handleStudySele}  name="approved_studies">
                                    {approvedStudies.map((item) => (
                                        <option key={item.ID}>{item.title}</option>
                                    ))}
                                </select>
                            </div>
                        </td>


                        <td width={20}></td>

                    </tr>
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


                <br/>
                <br/>


                <Alert severity="success" hidden={!success}>{successMsg}</Alert>
                <Alert severity="error" hidden={!error}>{errorMsg}</Alert>



            </form>

            <DataTable
                pagination
                highlightOnHover
                columns={xlsColumns}
                data={objDataList}
            />
        </div>
    );

}