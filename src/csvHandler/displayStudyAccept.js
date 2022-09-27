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


export default function DisplayStudyAccept() {


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
    const [date, setDate] = useState(new Date().toJSON().slice(0, 10).replace(/-/g, '-'));

    const [space, setSpace] = useState("");
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [key, setKey] = useState("");

    const [studyArray, setStudyArray] = useState([]);


    const [approvedStudies, setApprovedStudies] = useState([]);
    const [selectedStudyID, setSelectedStudyID] = useState();

    const [coliArr, setColiArr] = useState([]);

    const [perAreaArrCnt, setPerAreaCntArr] = useState([]);





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

    function checkDuplicate(arr, arrElement) {
        for(let i = 0 ; i < arr.length; i++){
            if(arr[i].area === arrElement.area && arr[i].title === arrElement.title)
                return true;
        }
        return false;
    }

    function processStudyArr(arr) {
        let processedArr = [];
        const buf = [];
        for (let i = 0; i < arr.length; i++) {
            let obj = buf["a" + arr[i].athlete_id];
            if (!obj) {
                obj = {};
                obj.ID = arr[i].athlete_id;
                obj.name = arr[i].name;

            }
            let str = "no";
            if (arr[i].accept)
                str = "yes";
            //obj[arr[i].title] = str;
            if(!obj["test"])
                obj["test"] = [];
            if(checkDuplicate(obj["test"],arr[i])){
                showError("duplicate entry");
            }else
                obj["test"].push({area:arr[i].area, title:arr[i].title, accept:str});
            if(arr[i].title=="Antropometrische Daten")
                console.log("gerere"+arr[i].title);
            buf["a" + arr[i].athlete_id] = obj;
            // testObj = {}
            // perIDArr[arr[i].athlete_id] = testsObj;
        }
        console.log("length:" + buf.length);
        for (var key in buf) {
            processedArr.push(buf[key]);
            console.log(buf[key]);
        }
        setStudyArray(processedArr);


        const columns = [];
        let header = [];
        for (var key in processedArr[0]) {
            columns.push({name: key, selector: key, width: "150px", wrap: true});
            if(key != "test")
                header.push({title:key,area:"-"});
            else{
                for(let i = 0 ; i < processedArr[0][key].length ; i++)
                    header.push({title:processedArr[0][key][i].title, area:processedArr[0][key][i].area});
            }
        }
        header = sortPerArea(header);
        setXlsColumns(columns);
        setHeaderArray(header);

        const matrix = [];


        for(let i =0 ; i < processedArr.length; i++){
            const obj = processedArr[i];
            //let j = 0;
            matrix[i] = [];
            for(let k = 0 ; k < obj["test"].length; k++){
                let toKey = obj["test"][k].title;
                let val = obj["test"][k].accept;
                let index = getHeaderIndex(header, toKey,obj["test"][k].area);
                matrix[i][index] = val;
            }
            let index = getHeaderIndex(header, "ID","-");
            matrix[i][index] = obj["ID"];
            index = getHeaderIndex(header, "name","-");
            matrix[i][index] = obj["name"]
            /*
            for (var key in obj) {
                let toKey = key;
                let val = obj[key];
                if(toKey === "test"){
                    toKey = obj["test"].title;
                    val = obj["test"].accept;
                }
                j = getHeaderIndex(header, toKey);
                if(j < 0){
                    showError("error setting header");
                    return;
                }
                matrix[i][j++] = val;
            }
            */

        }
        setValuesMatrix(matrix);


/*

        const coliN = [];
        for(let i =0 ; i < processedArr.length; i++){
            const obj = processedArr[i];
            for (var key in obj) {
                let vObj = coliN[key];
                if(!vObj){
                    vObj = {};
                    vObj.vals = [];
                    vObj.title = key;
                }
                let vals = vObj.vals;
                vals.push(obj[key]);
                coliN[key] = vObj;
            }
        }
        const vCollArr = [];
        for (var key in coliN) {
            vCollArr.push(coliN[key]);
        }
        setColiArr(vCollArr);*/
    }



    const sortPerArea = (header) =>{
        const perArea = [];

        for(let i = 0 ; i < header.length;i++){
            if(!perArea[header[i].area])
                perArea[header[i].area] = [];
            perArea[header[i].area].push(header[i]);
        }

        header = [];
        const perAreaCnt = [];
        for (var key in perArea) {
            for(let i = 0; i < perArea[key].length; i++) {
                header.push(perArea[key][i]);
            }
            perAreaCnt.push({title:key,count:perArea[key].length});
        }
        setPerAreaCntArr(perAreaCnt);
        return header;
    }

    const getHeaderIndex = (header,val,area) =>{
        let j = 0;
        for(let i = 0 ; i < header.length;i++){
            if(header[i].title === val && header[i].area === area)
                return j;
            j++;
        }
        return -1;
    }

    const submitAll = () => {
        setError(false);
        getStudyResult();
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


    const getStudyResult = () => {
        PostSignup.getStudyResult({"discipline": discipline, "key": key}).then(response => {
            if (response.data.res === "no") {
                showError("Not authorize to access the data");
                return;
            }

            if (response.data.res === "ok") {
                const arr = response.data.data;
                processStudyArr(arr);

            }

        }).catch(e => {
            console.log(e);
        });
    }

    const getIdsFromServer = () => {
        PostSignup.getAthletesID({"discipline": discipline, "key": key}).then(response => {
            console.log(response.data);
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
                const header = ["name", "discipline", "ID"];
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

    return (
        <div>
            <h3>Display Athletes Tests Approval</h3>
            <form id='csv-form'>
                <br/>





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




                <table className={"styled-table"}>
                    <thead>
                    <tr className={"area_head"}>
                        {perAreaArrCnt.map((colItem) => (
                            <td colSpan={colItem.count}>{colItem.title}</td>
                        ))}
                    </tr>

                  <tr>
                      {headerArray.map((colItem) => (
                          <td>{colItem.title}</td>
                      ))}
                  </tr>
                    </thead>
                    <tbody>
                    {valuesMatrix.map((row) => (
                        <tr>
                            {row.map((item) => (
                            <td>{item}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>





                <br/>
                <br/>


                <Alert severity="success" hidden={!success}>{successMsg}</Alert>
                <Alert severity="error" hidden={!error}>{errorMsg}</Alert>


            </form>

        </div>
    );

}