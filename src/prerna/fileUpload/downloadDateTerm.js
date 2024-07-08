import React, { useState } from 'react';
import { CSVLink } from "react-csv";

const TermDateComponent = () => {
  const [terms, setTerms] = useState([{ term: '', date: '' }]);
  const [outputData, setOutputData] = useState([]);
  
  const handleAddTerm = () => {
    setTerms([...terms, { term: '', date: '' }]);
  };

  const handleTermChange = (index, key, value) => {
    const newTerms = [...terms];
    newTerms[index][key] = value;
    setTerms(newTerms);
  };

  const handleGenerateFile = () => {
    const output = terms.map(term => ({
      date: term.date,
      term: term.term,
    }));
    setOutputData(output);
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
            value={term.date}
            onChange={(e) => handleTermChange(index, 'date', e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleAddTerm}>Add Term</button>
      <button onClick={handleGenerateFile}>Generate File</button>
      {outputData.length > 0 && (
        <CSVLink
          data={outputData}
          headers={[{ label: "Date", key: "date" }, { label: "Term", key: "term" }]}
          filename={"terms-dates.csv"}
        >
          Download CSV
        </CSVLink>
      )}
    </div>
  );
};

export default TermDateComponent;
