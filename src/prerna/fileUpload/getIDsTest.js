/*
By Prerna
 */
import React, {useEffect, useState} from 'react';
import {processArr} from "./processCSV";
import {CSVToArray} from "./processCSV";
import PostCSVData from "../../DB/postCSV";
import Sheet from "./xlsSheet/XlsSheet";
import PostSignup from "../../DB/postSignup";
import alert from "bootstrap/js/src/alert";
import MuiAlert from "@material-ui/lab/Alert";
import {Alert} from "@mui/material";
import DataTable from "react-data-table-component";
import {useNavigate} from "react-router-dom";
import LoggedHandler from "../../DB/loggedHandler";

//import '../register/style.css';



export default function  GetIDS(){



    const columnsC = [
        {
            name: 'name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'discipline',
            selector: row => row.discipline,
            sortable: true,
        },
        {
            name: 'ID',
            selector: row => row.ID,
            sortable: true,
        },
        {
            name: 'email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'age',
            selector: row => row.age,
            sortable: true,
        },
    ];

    const testData = [
        { name: 'John', discipline: 'Swimming', ID: '123', email: 'john@example.com', age: 25 },
        { name: 'Alice', discipline: 'Running', ID: '456', email: 'alice@example.com', age: 30 },
        { name: 'Bob', discipline: 'Cycling', ID: '789', email: 'bob@example.com', age: 28 },
        { name: 'Emma', discipline: 'Swimming', ID: '234', email: 'emma@example.com', age: 22 },
        { name: 'Michael', discipline: 'Running', ID: '567', email: 'michael@example.com', age: 35 },
        { name: 'Sophia', discipline: 'Cycling', ID: '890', email: 'sophia@example.com', age: 29 },
        { name: 'William', discipline: 'Swimming', ID: '345', email: 'william@example.com', age: 27 },
        { name: 'Olivia', discipline: 'Running', ID: '678', email: 'olivia@example.com', age: 32 },
        { name: 'James', discipline: 'Cycling', ID: '901', email: 'james@example.com', age: 31 },
        { name: 'Charlotte', discipline: 'Swimming', ID: '567', email: 'charlotte@example.com', age: 23 },
        { name: 'Daniel', discipline: 'Running', ID: '789', email: 'daniel@example.com', age: 27 },
        { name: 'Ava', discipline: 'Cycling', ID: '234', email: 'ava@example.com', age: 26 },
        { name: 'Liam', discipline: 'Swimming', ID: '123', email: 'liam@example.com', age: 29 },
        { name: 'Mia', discipline: 'Running', ID: '456', email: 'mia@example.com', age: 24 },
        { name: 'Henry', discipline: 'Cycling', ID: '789', email: 'henry@example.com', age: 28 },
        { name: 'Ella', discipline: 'Swimming', ID: '234', email: 'ella@example.com', age: 31 },
        { name: 'Alexander', discipline: 'Running', ID: '567', email: 'alexander@example.com', age: 33 },
        { name: 'Grace', discipline: 'Cycling', ID: '890', email: 'grace@example.com', age: 30 },
        { name: 'Benjamin', discipline: 'Swimming', ID: '345', email: 'benjamin@example.com', age: 25 },
        { name: 'Scarlett', discipline: 'Running', ID: '678', email: 'scarlett@example.com', age: 26 },
        { name: 'Lucas', discipline: 'Cycling', ID: '901', email: 'lucas@example.com', age: 32 },
        { name: 'Lily', discipline: 'Swimming', ID: '456', email: 'lily@example.com', age: 28 },
        { name: 'Jackson', discipline: 'Running', ID: '789', email: 'jackson@example.com', age: 27 },
        { name: 'Chloe', discipline: 'Cycling', ID: '234', email: 'chloe@example.com', age: 29 },
        { name: 'Henry', discipline: 'Swimming', ID: '123', email: 'henry@example.com', age: 30 },
        { name: 'Zoe', discipline: 'Running', ID: '456', email: 'zoe@example.com', age: 25 },
        { name: 'Aiden', discipline: 'Cycling', ID: '789', email: 'aiden@example.com', age: 28 },
        { name: 'Aria', discipline: 'Swimming', ID: '234', email: 'aria@example.com', age: 31 },
        { name: 'Sebastian', discipline: 'Running', ID: '567', email: 'sebastian@example.com', age: 33 },
        { name: 'Nora', discipline: 'Cycling', ID: '890', email: 'nora@example.com', age: 30 },
        { name: 'Ethan', discipline: 'Swimming', ID: '345', email: 'ethan@example.com', age: 25 },
        { name: 'Hannah', discipline: 'Running', ID: '678', email: 'hannah@example.com', age: 26 },
        { name: 'Carter', discipline: 'Cycling', ID: '901', email: 'carter@example.com', age: 32 },
        { name: 'Grace', discipline: 'Swimming', ID: '456', email: 'grace@example.com', age: 28 },
        { name: 'Samuel', discipline: 'Running', ID: '789', email: 'samuel@example.com', age: 27 },
        { name: 'Avery', discipline: 'Cycling', ID: '234', email: 'avery@example.com', age: 29 },
        { name: 'Henry', discipline: 'Swimming', ID: '131', email: 'henry@example.com', age: 30 },
        { name: 'Lily', discipline: 'Running', ID: '456', email: 'lily@example.com', age: 25 },
        { name: 'Owen', discipline: 'Cycling', ID: '789', email: 'owen@example.com', age: 28 },
        { name: 'Ella', discipline: 'Swimming', ID: '234', email: 'ella@example.com', age: 31 },
        { name: 'Matthew', discipline: 'Running', ID: '567', email: 'matthew@example.com', age: 33 },
        { name: 'Violet', discipline: 'Cycling', ID: '890', email: 'violet@example.com', age: 30 },
        { name: 'Oliver', discipline: 'Swimming', ID: '345', email: 'oliver@example.com', age: 25 },
        { name: 'Emily', discipline: 'Running', ID: '678', email: 'emily@example.com', age: 26 },
        { name: 'Liam', discipline: 'Cycling', ID: '901', email: 'liam@example.com', age: 32 },
        { name: 'Sophia', discipline: 'Swimming', ID: '456', email: 'sophia@example.com', age: 28 },
        { name: 'Lucas', discipline: 'Running', ID: '789', email: 'lucas@example.com', age: 27 },
        { name: 'Zoe', discipline: 'Cycling', ID: '234', email: 'zoe@example.com', age: 29 },
        { name: 'James', discipline: 'Swimming', ID:'111',email: 'James@example.com', age: 39}
    ]
    

    const [csvFile, setCsvFile] = useState();
    const [csvArray, setCsvArray] = useState([]);
    const [headerArray, setHeaderArray] = useState([]);
    const [valuesMatrix, setValuesMatrix] = useState([]);
    const [sendingRes, setSendingRes] = useState([]);

    const [xlsColumns, setXlsColumns] = useState(columnsC);
    // const [objDataList, setObjDataList] = useState();
    const [objDataList, setObjDataList] = useState(testData); 
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


    const [useTestData, setUseTestData] = useState(false);
    const [sortInfo, setSortInfo] = useState({ column: null, direction: 'asc' });



    const [approvedStudies, setApprovedStudies] = useState([]);
    const [selectedStudyID, setSelectedStudyID] = useState();

    let navigate = useNavigate();

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

    const handleSort = (column, sortDirection) => {
        // Update the sortInfo state with the current column and direction
        setSortInfo({ column, direction: sortDirection });
        
        // Sort the data based on the selected column and direction
        const sortedData = [...objDataList].sort((a, b) => {
          if (sortDirection === 'asc') {
            return a[column].localeCompare(b[column]);
          } else {
            return b[column].localeCompare(a[column]);
          }
        });
      
        // Update the state with the sorted data
        setObjDataList(sortedData);
      };
      

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
      LoggedHandler.getAthletesID({"discipline":discipline,"key":key}).then(response => {
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
              const header = ["name","discipline","ID","age","email"];
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

    const headerStyles = {
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                wordBreak: 'break-all',
                whiteSpace: 'pre-wrap',
                maxWidth: '300px',
                overflow: 'visible',
            },
        },
    };

    const getData = () => {
        if (useTestData) {
          return testData; // Use test data
        } else {
          return objDataList; // Use fetched data
        }
      };

    return(
        <div>
            <h3>Load Basic Athletes Information</h3>
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
                        <td width="20px">     </td>


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

                <button
                        className="btn btn-primary btn-block paddingBtn"
                        onClick={(e) => {
                            e.preventDefault();
                            setUseTestData(true);
                            setSuccess(false);
                            setError(false);
                            // Call any other necessary functions here
                        }}
                    >
                        Use Test Data
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




                <br/>
                <br/>


                <Alert severity="success" hidden={!success}>{successMsg}</Alert>
                <Alert severity="error" hidden={!error}>{errorMsg}</Alert>



            </form>

            

            <DataTable
                pagination
                highlightOnHover
                columns={columnsC.map((column) => ({
                    ...column,
                    onSort: (column, sortDirection) => handleSort(column.selector, sortDirection),
                }))}
                data={getData()}
                customStyles={headerStyles}
                /> 

        </div>
    );

}