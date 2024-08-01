import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const TermDateComponent = () => {
  const [terms, setTerms] = useState([{ term: '', fromDate: '', toDate: '' }]);
  const [excelData, setExcelData] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleAddTerm = () => {
    setTerms([...terms, { term: '', fromDate: '', toDate: '' }]);
  };

  const handleTermChange = (index, key, value) => {
    const newTerms = [...terms];
    newTerms[index][key] = value;
    setTerms(newTerms);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setExcelData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleGenerateFile = () => {
    if (!excelData) return;

    const headers = excelData[0];
    const updatedData = [];

    // Add term columns in the headers
    const updatedHeaders = [];
    headers.forEach((header, index) => {
      updatedHeaders.push(header);
      if (header.includes('time')) {
        // const featureName = headers[index - 1];
        updatedHeaders.push(`Term`);
      }
    });
    updatedData.push(updatedHeaders);

    // Process rows to add term values
    excelData.slice(1).forEach((row) => {
      const newRow = [];
      row.forEach((cell, index) => {
        newRow.push(cell);
        if (headers[index].includes('time')) {
          const dateValue = new Date(cell);
          let termValue = '';
          terms.forEach((term) => {
            const fromDate = new Date(term.fromDate);
            const toDate = new Date(term.toDate);
            if (dateValue >= fromDate && dateValue <= toDate) {
              termValue = term.term;
            }
          });
          newRow.push(termValue);
        }
      });
      updatedData.push(newRow);
    });

    console.log('Updated data:', updatedData);

    const newWorkbook = XLSX.utils.book_new();
    const newWorksheet = XLSX.utils.aoa_to_sheet(updatedData);
    XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Sheet1');
    XLSX.writeFile(newWorkbook, 'updated_' + fileName);
  };

  return (
    <div>
      <h2>Term and Date Input</h2>
      {terms.map((term, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder={`Term ${index + 1}`}
            value={term.term}
            onChange={(e) => handleTermChange(index, 'term', e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <input
            type="date"
            placeholder="From Date"
            value={term.fromDate}
            onChange={(e) => handleTermChange(index, 'fromDate', e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <input
            type="date"
            placeholder="To Date"
            value={term.toDate}
            onChange={(e) => handleTermChange(index, 'toDate', e.target.value)}
          />
        </div>
      ))}
      <button className='upload-btn' onClick={handleAddTerm}>Add Term</button>
      <div>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      </div>
      <button onClick={handleGenerateFile}>Generate File</button>
    </div>
  );
};

export default TermDateComponent;
