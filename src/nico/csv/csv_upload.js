/*
By Nicolas Schulz
 */
import React, { useState, useEffect } from 'react';


  const MetaUpload = () => {
    const [tests, setTests] = useState([]);
    const [fields, setFields] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const testdata = [
        { testId: 1, testName: "Math Test" },
        { testId: 2, testName: "English Test" },
        { testId: 3, testName: "Science Test" },
        { testId: 4, testName: "History Test" },
        { testId: 5, testName: "Geography Test" }
    ];
  
    useEffect(() => {
      // make a request to get the list of tests
      console.log("fg")
      setTests(testdata);
      fetch(`https://api.example.com/tests?page=${currentPage}&pageSize=${pageSize}`)
        .then(response => response.json())
        .then(data => setTests(data));
    }, [currentPage]);
  
    const handleChange = (event, testId) => {
      setFields({ ...fields, [testId]: event.target.value });
    };
  
    const handleSubmit = event => {
      event.preventDefault();
      // send fields data to the backend along with the test ID
    };
  
    const handlePageChange = page => {
      setCurrentPage(page);
    };
  
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(tests.length / pageSize); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div>
        <h3>Meta data upload</h3>
        <form onSubmit={handleSubmit}>
          {tests.map(test => (
            <div key={test.testId}>
              <p>{test.testName}</p>
              <input
                type="text"
                onChange={event => handleChange(event, test.testId)}
              />
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
        <div>
          {pageNumbers.map(number => (
            <span
              key={number}
              style={{ cursor: 'pointer' }}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </span>
          ))}
        </div>
      </div>
    );
  };
  
  export default MetaUpload;
  