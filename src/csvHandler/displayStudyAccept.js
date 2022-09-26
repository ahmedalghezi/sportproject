

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




export default function  DisplayStudyAccept(){



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

    const [studyArray, setStudyArray] = useState([]);


    const [approvedStudies, setApprovedStudies] = useState([]);
    const [selectedStudyID, setSelectedStudyID] = useState();




    useEffect(() => {
        console.log("starting");
        //TODO find a better way
        if(disciplinesList.length == 0){
            getDisplines();
            //showError("This page is under update ...");
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

    function processStudyArr(arr) {
        let processedArr = [];
        const buf = [];
        for(let i = 0 ; i < arr.length ; i++){
            let obj = buf["a"+arr[i].athlete_id];
            if(!obj){
                obj = {};
                obj.ID = arr[i].athlete_id;
                obj.name = arr[i].name;
            }
            let str = "no";
            if(arr[i].accept)
                str = "yes";
            obj[arr[i].title] =  str;
            buf["a"+arr[i].athlete_id] = obj;
           // testObj = {}
           // perIDArr[arr[i].athlete_id] = testsObj;
        }
        console.log("length:"+buf.length);
        for (var key in buf) {
            processedArr.push(buf[key]);
            console.log(buf[key]);
        }
        setStudyArray(processedArr);

        const columns = [];
        for (var key in processedArr[0]) {
            columns.push({name:key,selector:key,width: "150px",wrap: true });
        }
        setXlsColumns(columns);
    }


    const submitAll = () => {
        setError(false);
        getStudyResult();
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


    const getStudyResult = () =>{
        PostSignup.getStudyResult({"discipline":discipline,"key":key}).then(response => {
            if(response.data.res === "no"){
                showError("Not authorize to access the data");
                return;
            }

            if(response.data.res === "ok"){
                const arr = response.data.data;
                processStudyArr(arr);

            }

        }).catch(e => {
            console.log(e);
        });
    }

    const getIdsFromServer = () => {
      PostSignup.getAthletesID({"discipline":discipline,"key":key}).then(response => {
          console.log(response.data);
          if(response.data.res === "no"){
              showError("Not logged in!");
              window.location.href = window.location.origin+"/reg/sign-in?org=$csv$athleteInfo";
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


    const  handleDispSele = (event) =>{
        event.preventDefault();
        setDiscipline(event.target.value);
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
            <h3>Display Athletes Tests Approval</h3>
            <form id='csv-form'>
                <br/>


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
                    Show
                </button>




                <table>
                    <tbody>
                    <tr>
                        <td>
                        </td>
                        <td></td>
                        <td>
                        </td>
                    </tr>

                    <tr>
                        <td><button hidden={this.state.expanded}  onClick={this.handleCollapseEvent}>{this.state.collapseIcon}</button></td>
                        <td>
                            <div className="vertical-menu mid">
                                <div><a href="#" className="active">Athletes</a></div>
                                {this.state.athletesArr.map((option) => (
                                    !this.state.evaluatedArr[option.ID+""+this.state.tests]
                                        ? (<a name={option.ID} key={option.ID}
                                              onClick={this.handleAthListClick}>{option.firstname}</a>)
                                        : (<s><a name={option.ID} key={option.ID}
                                                 onClick={this.handleAthListClick}>{option.firstname}</a></s>)
                                ))}
                            </div>
                        </td>





                        <td></td>
                        <td>
                            <div className="vertical-menu">
                                <a href="#" className="active">Trainings</a>
                                {this.state.testsArr.map((option) => (
                                    <a name={option.id} key={option.id}
                                       onClick={this.handleTestListClick}>{option.title}</a>
                                ))}
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>






                <br/>
                <br/>


                <Alert severity="success" hidden={!success}>{successMsg}</Alert>
                <Alert severity="error" hidden={!error}>{errorMsg}</Alert>



            </form>

            <DataTable
                pagination
                highlightOnHover
                columns={xlsColumns}
                data={studyArray}
            />
        </div>
    );

}