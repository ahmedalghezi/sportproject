/*
By Nicolas Schulz
 */
import React, { useState, useEffect } from 'react';


  const MetaUpload = () => {
    const [tests, setTests] = useState([]);
    const [testspage, setTestsPage] = useState([]);
    const [fields, setFields] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10;

    const testdata = [
        { testId: 1, testName: "Math Test" },
        { testId: 2, testName: "English Test" },
        { testId: 3, testName: "Science Test" },
        { testId: 4, testName: "History Test" },
        { testId: 5, testName: "Geography Test" }
    ];
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("your-server-url");
          const data = await response.json();
          setTests(data);
          setTestsPage(data.slice(0, pageSize));
        } catch (error) {
          setTests(testdata);
          setTestsPage(testdata.slice(0, pageSize));
          console.error(error);
        }
      };
  
      fetchData();
    }, []);
  
    const handleChange = (event, testId) => {
      setFields({ ...fields, [testId]: event.target.value });
    };
  
    const handleSubmit = event => {
      event.preventDefault();
      // send fields data to the backend along with the test ID
    };
  
    const handlePageChange = page => {
      setCurrentPage(page);
      setTestsPage(tests.slice(page * pageSize, page * pageSize + pageSize));
    };

  
    return (
      <div>
        <h3>Meta data upload</h3>
        <form onSubmit={handleSubmit}>
          {testspage.map(test => (
            <div key={test.testId}>
              <span  style= {{...{float: "left"},...{width: "80px"}}}>{test.testName}</span>
              <textarea
                style= {{...{height: "80px"},...{marginBottom: "20px"},...{width: "220px"}}}
                onChange={event => handleChange(event, test.testId)}
              />
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
          <div>
          {currentPage > 0 && (
            <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
          )}
          {tests.length > currentPage * pageSize + pageSize && (
            <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
          )}
        </div>
      </div>
    );
  };
  
  export default MetaUpload;
  