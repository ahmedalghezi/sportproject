import { useState } from 'react';
import {processArr} from "./processCSV";
import {CSVToArray} from "./processCSV";
import {toJson} from "./processCSV";
import PostCSVData from "../DB/postCSV";
import Sheet from "./xlsSheet/XlsSheet";
import '../register/style.css';

export default function CsvReader(){
    const [csvFile, setCsvFile] = useState();
    const [csvArray, setCsvArray] = useState([]);
    const [headerArray, setHeaderArray] = useState([]);
    const [valuesMatrix, setValuesMatrix] = useState([]);
    const [sendingRes, setSendingRes] = useState([]);

    const [xlsColumns, setXlsColumns] = useState([]);
    const [objDataList, setObjDataList] = useState([]);
    const [checkTestFlag, setCheckTest] = useState(false);

    const [checkIDsFlag, setCheckIDs] = useState(false);



    // [{name: "", age: 0, rank: ""},{name: "", age: 0, rank: ""}]

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

    const submitAll = () => {

        if(!checkTestFlag){
            checkTests();
            //show in progress ...
            return;
        }

        if(!checkIDsFlag) {
            checkIDs();
            //show in progress ...
            return;
        }

       // sendTests();



    }

    const updateSendingRes = (rowIndex,res) => {
        //update the GUI
    }

    const readFile = (fileI) => {
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
        setXlsColumns(columns);
    }

    const handleReadData = (headers,rMatrix,objList) => {
        setHeaderArray(headers);
        setValuesMatrix(rMatrix);
        setObjDataList(objList);
        updateDataMatrix(rMatrix,headers);
    }


    return(
        <div>
        <form id='csv-form'>
            <input
                type='file'
                accept='.csv'
                id='csvFile'
                onChange={(e) => {
                    setCsvFile(e.target.files[0])
                    readFile(e.target.files[0])
                }}
            >
            </input>
            <br/>

            <button
                className="btn btn-primary btn-block"
                onClick={(e) => {
                    e.preventDefault()
                    const res = processArr(headerArray,valuesMatrix);
                    if(res)
                        setValuesMatrix(valuesMatrix);
                    updateDataMatrix(valuesMatrix,headerArray);
                }}
            >
                Anonymize(name,birthdate)
            </button>

            <button
                className="btn btn-primary btn-block paddingBtn"
                onClick={(e) => {
                    e.preventDefault()
                    submitAll()
                }}
            >
                Submit
            </button>

            <br/>
            <br/>
        </form>
            <Sheet headers={xlsColumns} matrix={objDataList} onRead = {handleReadData} />
        </div>
    );

}