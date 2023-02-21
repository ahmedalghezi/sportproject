/*
By Nicolas Schulz
 */
import React, { useState, useEffect } from 'react';
import PostCSVData from "../DB/postCSV";


const MetaUpload = (props) => {
    const [tests, setTests] = useState([]);
    const [testspage, setTestsPage] = useState([]);
    const [fields, setFields] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10;
    const [sendRequest, setSendRequest] = useState(true);

    const testdata = [
        { testId: 1, testName: "Math Test" },
        { testId: 2, testName: "English Test" },
        { testId: 3, testName: "Science Test" },
        { testId: 4, testName: "History Test" },
        { testId: 5, testName: "Geography Test" }
    ];

    useEffect(() => {
        if(sendRequest){
            fetchData();
            setSendRequest(false);
        }
    }, [sendRequest]);

    const fetchData = async () => {
        try {
            const response = await fetch("https://inprove-sport.info/csv/getMetadata?space="+props.space + "&discipline="+props.discipline);
            const {data} = await response.json();
            setTests(data);
            setTestsPage(data.slice(0, pageSize));
        } catch (error) {
            setTests(testdata);
            setTestsPage(testdata.slice(0, pageSize));
            console.error(error);
        }
    };

    const handleChange = (event, testId) => {
        setFields({ ...fields, [testId]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        // send fields data to the backend along with the test ID
        PostCSVData.sendMeta(fields).then(response => {
            if (response.data.res === "error")
                alert("Es ist ein Fehler aufgetreten.");
            if(response.data.res === "no")
                window.location.href = window.location.origin+"/reg/sign-in";
            if(response.data.res === "ok"){
                alert("Meta Daten wurden hochgeladen.")
                setSendRequest(true);
                //reset page and fields
                setCurrentPage(0);
                setFields({});
            }
        }).catch(e => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten.");
        });

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
                        <span  style= {{...{float: 'left'},...{width: "80px"},...{marginLeft: "230px"}}}>{test.testName}</span>
                        <textarea
                            style= {{...{height: "80px"},...{marginBottom: "20px"},...{width: "350px"},...{marginLeft: "100px"}}}
                            onChange={event => handleChange(event, test.testId)}
                        />
                    </div>
                ))}
                <button style= {{...{float: 'right'}}} type="submit">Submit</button>
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

