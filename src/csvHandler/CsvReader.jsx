/*
By Ahmed Al-Ghezi
 */
import React, {useEffect, useState} from 'react';
import { Outlet } from "react-router-dom";
import {processArr} from "./processCSV";
import {CSVToArray} from "./processCSV";
import PostCSVData from "../DB/postCSV";
import Sheet from "./xlsSheet/XlsSheet";
import PostSignup from "../DB/postSignup";
import alert from "bootstrap/js/src/alert";
import MuiAlert from "@material-ui/lab/Alert";
import {Alert} from "@mui/material";

//import '../register/style.css';



export default function  CsvReader(){



    const [csvFile, setCsvFile] = useState();
    const [csvArray, setCsvArray] = useState([]);
    const [headerArray, setHeaderArray] = useState([]);
    const [valuesMatrix, setValuesMatrix] = useState([]);
    const [sendingRes, setSendingRes] = useState([]);

    const [xlsColumns, setXlsColumns] = useState([]);
    const [objDataList, setObjDataList] = useState([]);
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



    const checkTests = () => {
        const obj = {"tests":headerArray};
        PostCSVData.checkTests(obj)
            .then(response => {
                console.log(response);
                const sendingRes = response.data;
                if(Object.keys(sendingRes).length !== 0 && sendingRes.length > 0){
                    alert("Error:some tests do not exist in the database. Did you misspell one or more tests?");
                    setCheckTest(false);
                }

            })
            .catch(e => {
                console.log(e);
            });

    }


    const sendTests = () => {
        PostCSVData.setPerformanceDump(objDataList)
            .then(response => {
                console.log(response.data);

            })
            .catch(e => {
                console.log(e);
            });

/*
        for (var i = 0; i < valuesMatrix.length; i++) {
            const jsonObj = toJson(headerArray,valuesMatrix[i]);
            const res = PostCSVData.setPerformanceAthlete(jsonObj);

            PostCSVData.setPerformanceAthlete(jsonObj)
                .then(response => {
                    console.log(response.data);
                    sendingRes[i] = res.data;
                    updateSendingRes(i,res.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
*/
    }

    const checkIDs = () =>{

    }

    const checkInput = () =>{
        if(discipline == ""){
            showError("please select discipline");
            return false;
        }
        if(space === ""){
            showError("please select space");
            return false;
        }
        if(!objDataList){
            showError("please select the data file");
            return false;
        }
        return true;
    }

    const submitAll = () => {
        setError(false);
        if(!checkInput())
            return;
        sendTestsInitial();
        return;

        if(!checkTestFlag){
            checkTests();
            //show in progress ...
            return;
        }

        if(!checkIDsFlag) {
            checkIDs();
            //TODO show in progress ...
        }

       // sendTests();



    }

    const showError = (msg) =>{
        setError(true);
        setErrorMsg(msg);
    }


    const showSuccess = (msg) =>{
        setSuccess(true);
        setSuccessMsg(msg);
    }

    const sendTestsInitial= () =>{
        const obj = {dataArr:objDataList, date:date , discipline:discipline,space:space};
        PostCSVData.sendTestsInitial(obj).then(response => {
            console.log(response.data);
            if(response.data.res === "no"){
                showError("Not logged in!");
                window.location.href = "https://inprove-sport.info:3000/reg/sign-in?org=$csv$reader";
                return;
            }
            if(response.data.errArr){
                showError("The following record can not be identified within the given discipline," +
                    " make sure that all records belong to registered athletes:");
                setObjDataList(response.data.errArr);
            }

            if(response.data.res === "ok"){
                if(response.data.insertCount > 0)
                    showSuccess(response.data.insertCount+" records were added successfully");
                if(response.data.errCount > 0)
                    showError(response.data.insertCount+" records failed to be added");
            }



        })
            .catch(e => {
                console.log(e);
            });
    }

    const updateSendingRes = (rowIndex,res) => {
        //update the GUI
    }

    const readFile = (fileI) => {
        setSuccess(false);
        setError(false);
        const file = fileI;
        const reader = new FileReader();
        reader.onload = function(e) {
            const text = e.target.result;
            console.log(text);
            processCSV(text);
        }
        reader.readAsText(file);
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
        console.log(list);
        const columns = headers.map(c => ({
            name: c,
            selector: c,
        }));
        console.log(columns);
        setXlsColumns(columns);
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


    const handleSpace =  (event) =>{
        event.preventDefault();
        setSpace(event.target.value);
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


    return(
        <div>
            <Outlet />
        <form id='csv-form'>
             {/*<input
                type='file'
                accept='.csv'
                id='csvFile'
                onChange={(e) => {
                    setCsvFile(e.target.files[0])
                    readFile(e.target.files[0])
                }}
            >
            </input>*/}
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
                    <td>
                        <label>Data date</label><br></br>
                        <div><input className="col-xs-4" type="date" id="date" name="date" min="1" max="200" onChange={(e)=>{
                            e.preventDefault();
                            setDate(e.target.value);
                        }} value={date}/></div>

                    </td>
                    <td width="20px">
                    </td>
                    <td>
                        <div className="form-group">
                            <label>Data Space</label>
                            <br></br>
                            <select onChange={handleSpace}  name="space">
                                <option value="">Please select</option>
                                <option value="performance">Performance data</option>
                                <option value="blood">Blood samples</option>
                                <option value="dna">DNA</option>
                                <option value="bacterial">Bacterial</option>
                                <option value="bacterial">Other</option>
                            </select>
                        </div>

                    </td>
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

                    <td width={20}></td>


                    <td>
                        <div className="form-group">
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



                    <td>
                        <br></br>
                        <button
                            className="btn btn-primary btn-block paddingBtn"
                            onClick={(e) => {
                                e.preventDefault();
                                setSuccess(false);
                                setError(false);
                                submitAll();
                            }}
                        >
                            Submit
                        </button>

                    </td>



                </tr>
            </table>


            <br/>
            <br/>




            <Alert severity="success" hidden={!success}>{successMsg}</Alert>
            <Alert severity="error" hidden={!error}>{errorMsg}</Alert>



        </form>
            <Sheet headers={xlsColumns} matrix={objDataList} onRead = {handleReadData}/>
        </div>
    );

}