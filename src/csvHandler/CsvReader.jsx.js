import { useState } from 'react';
import {processArr} from "./processCSV";
import {appendScript} from "../util";

export default function CsvReader(){
    const [csvFile, setCsvFile] = useState();
    const [csvArray, setCsvArray] = useState([]);
    const [headerArray, setHeaderArray] = useState([]);
    const [valuesArray, setValuesArray] = useState([]);
    // [{name: "", age: 0, rank: ""},{name: "", age: 0, rank: ""}]

    const processCSV = (str, delim=';') => {
        const headers = str.slice(0,str.indexOf('\n')).split(delim);
        const rows = str.slice(str.indexOf('\n')+1).split('\n');

        setHeaderArray(headers);

        const newArray = rows.map( row => {
            const values = row.split(delim);
            setValuesArray(values);
            const eachObject = headers.reduce((obj, header, i) => {
                obj[header] = values[i];
                return obj;
            }, {})
            return eachObject;
        })

        setCsvArray(newArray)
    }

    const submit = () => {
        const file = csvFile;
        const reader = new FileReader();

        reader.onload = function(e) {
            const text = e.target.result;
            console.log(text);
            processCSV(text)
        }

        reader.readAsText(file);
    }

    return(
        <form id='csv-form'>
            <input
                type='file'
                accept='.csv'
                id='csvFile'
                onChange={(e) => {
                    setCsvFile(e.target.files[0])
                }}
            >
            </input>
            <br/>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    if(csvFile)submit()
                }}
            >
                Submit
            </button>
            <br/>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    const res = processArr(headerArray,valuesArray);
                    if(res)
                        setValuesArray(valuesArray);
                }}
            >
                Anonymize(name,birthdate)
            </button>
            <br/>
            <br/>
            {csvArray.length>0 ?
                <>
                <table>
                    <thead>
                    <tr key={99}>
                    {
                        headerArray.map((item,i) => (

                            <td key = {i}>{item}</td>

                        ))

                    }
                    </tr>
                    </thead>


                    <tbody>
                    {
                        csvArray.map((item, ii) => (
                            <tr key={ii+1}>

                            </tr>
                        ))
                    }
                    </tbody>

                </table>
                </> : null}
        </form>
    );

}