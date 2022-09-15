/*
By Ahmed Al-Ghezi
 */

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';

function Sheet(props) {

    //const [columns, setColumns] = useState([]);
    //const [data, setData] = useState([]);
    const columns = props.headers;
    const data = props.matrix;
    // process CSV data
    const processData = dataString => {
        const dataStringLines = dataString.split(/\r\n|\n/);
        const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

        const list = [];
        const rMatrix = [];
        for (let i = 1; i < dataStringLines.length; i++) {
            const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
            if (headers && row.length === headers.length) {
                const obj = {};
                const iMat = [];
                for (let j = 0; j < headers.length; j++) {
                    let d = row[j];
                    if (d.length > 0) {
                        if (d[0] === '"')
                            d = d.substring(1, d.length - 1);
                        if (d[d.length - 1] === '"')
                            d = d.substring(d.length - 2, 1);
                    }
                    if (headers[j]) {
                        if(headers[j] === '"ID"')
                            headers[j] = 'ID';
                        obj[headers[j]] = d;
                        iMat[j] = d;
                    }

                }

                // remove the blank rows
                if (Object.values(obj).filter(x => x).length > 0) {
                    list.push(obj);
                    rMatrix[rMatrix.length] = iMat;
                }
            }
        }

        // prepare columns list from headers
        const columns = headers.map(c => ({
            name: c,
            selector: c,
        }));

        props.onRead(headers,rMatrix,list);

        //setData(list);
        //setColumns(columns);
    }

    const updateData = (objListVal,headers) => {
        // setData(objListVal);
        const columns = headers.map(c => ({
            name: c,
            selector: c,
        }));
        //setColumns(columns);
    }




    // handle file upload
    const handleFileUpload = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (evt) => {
            /* Parse data */
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
            processData(data);
        };
        reader.readAsBinaryString(file);
    }

    return (

        <div>
            <input type="file"  accept=".csv,.xlsx,.xls" onChange={handleFileUpload}/>
            <DataTable
                pagination
                highlightOnHover
                columns={columns}
                data={data}
            />
        </div>
    );
}

export default Sheet;