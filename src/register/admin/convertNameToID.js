
import React, { useState, useRef } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

const FileUploadFormConvert = () => {
    const [originalData, setOriginalData] = useState([]);
    const fileInputRef = useRef();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const workbook = XLSX.read(event.target.result, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet);
            setOriginalData(data);
        };
        reader.readAsBinaryString(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const filteredData = originalData.map(({ Name, Vorname }) => ({ Name, Vorname }));

        try {
            const response = await axios.post('https://inprove-sport.info/csv/dBsTrEjdLyXDBslAsP/FindIDInFile', filteredData);
            const updatedData = response.data;
            downloadUpdatedFile(updatedData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const downloadUpdatedFile = (updatedData) => {
        const newWorkbook = XLSX.utils.book_new();
        const newSheet = XLSX.utils.json_to_sheet(updatedData);
        XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'UpdatedData');

        // Create a temporary element to trigger download
        const blob = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'binary' });
        const blobUrl = window.URL.createObjectURL(new Blob([s2ab(blob)], { type: 'application/octet-stream' }));
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'updatedFile.xlsx';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // String to ArrayBuffer conversion
    const s2ab = (s) => {
        const buffer = new ArrayBuffer(s.length);
        const view = new Uint8Array(buffer);
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buffer;
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".xlsx, .xls" />
            <button type="submit">Upload and Process File</button>
        </form>
    );
};

export default FileUploadFormConvert;

