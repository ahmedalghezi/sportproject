import React, { useState, useEffect } from "react";
import axios from "axios";

function CreateAvatarEntry({ done, sectionID, discipline,onClose }) {
    const [spaces, setSpaces] = useState([]);
    const [tests, setTests] = useState([]);
    const [selectedSpace, setSelectedSpace] = useState("");
    const [selectedTest, setSelectedTest] = useState("");
    const [selectedTestsList, setSelectedTestsList] = useState([]);
    const [title, setTitle] = useState("");
    const [formula, setFormula] = useState("");
    const [formulaGreen, setFormulaGreen] = useState("");
    const [formulaRed, setFormulaRed] = useState("");
    const [comparisonOperator, setComparisonOperator] = useState("great-less");


    // State for the 'Show values' checkbox
    const [showValues, setShowValues] = useState(true);
    const [comparison, setComparison] = useState('greaterThan');

    // State for the 'Show thresholds' checkbox
    const [showThresholds, setShowThresholds] = useState(true);

    useEffect(() => {
        axios.get("https://inprove-sport.info/csv/getSpaces").then((response) => {
            setSpaces(response.data.data);
            console.log("CAE get spaces", response.data.data);
        });

    }, []);

    const fetchTests = (space) => {
        axios.get(`https://inprove-sport.info/csv/dnnxyrtFgrhXdYtdKEw/getTests/${space}/d6fBgdKZx6DGHaReiUe`).then((response) => {
            setTests(response.data.data);
            if(response.data.data && response.data.data.length > 0)
                setSelectedTest(response.data.data[0].testid);
            console.log("CAE fetchTests", response.data.data);
        });
    };

    const handleInputChange = (event) => {
        setTitle(event.target.value);
    };

    // const handleSubmit = () => {
    //     const payload = {
    //         testIds: selectedTestsList.map((test) => test.testid),
    //         title,
    //         formulaGreen,
    //         formulaRed,
    //         comparisonOperator,
    //         sectionID
    //     };

    //     axios.post("https://inprove-sport.info/avatar/createAvatarElement", payload).then((response) => {
    //         console.log('Response:', response);
    //         if (response.data.res === "ok") {
    //             if (typeof done === "function") {
    //                 done(true);
    //             }
    //         } else {
    //             if (typeof done === "function") {
    //                 done(false);
    //             }
    //         }
    //     });
    // };




    // const handleAddTest = () => {
    //     if (selectedSpace !== "" && selectedTest !== "") {
    //         const spaceTestCombo = {
    //             space: selectedSpace,
    //             test: selectedTest,
    //             testName: tests.find((test) => String(test.testid) === String(selectedTest))?.testname

    //         };
    //         console.log("spaceTestCombo :", spaceTestCombo)
    //         ([...selectedTestsList, spaceTestCombo]);

    //         console.log("selectedTestsList :", selectedTestsList)
    //     }
    // };

    const handleSpaceSelect = (space) => {
        setSelectedSpace(space);
        fetchTests(space);
    };

    const handleTestSelect = (test) => {
        setSelectedTest(test);
        // const selectedTestName = tests.find((t) => String(t.testid) === String(test))?.testname;
        // if (selectedTestName) {
        //     setTitle(selectedTestName);
        // }
    };

    // const handleSubmit = () => {
    //     if (title && selectedTestsList.length > 0) {
    //         const testIds = selectedTestsList.map((entry) => entry.test);
    //         const payload = {
    //             testIds,
    //             title,
    //             formulaGreen,
    //             formulaRed,
    //             comparisonOperator,
    //             sectionID
    //         };

    //         console.log("payload : ", payload)

    //         axios.post("https://inprove-sport.info/avatar/createAvatarElement", payload)
    //             .then((response) => {
    //                 if (response.data.res === "ok") {
    //                     const mapping = selectedTestsList.map((entry) => entry.testName);
    //                     const message = `One entry added with mapping as: ${title}, [${mapping}]`;
    //                     alert(message);
    //                     // If successful, perform any necessary actions
    //                 } else {
    //                     alert('There was an issue adding the entry.');
    //                     // Handle error scenario
    //                 }
    //             })
    //             .catch((error) => {
    //                 alert('There was an error processing your request.');
    //                 console.error('Error:', error);
    //                 // Handle error scenario
    //             });
    //     } else {
    //         alert('Please enter a title and select tests before submitting.');
    //     }
    // };

    const handleAddTest = () => {
        if (selectedSpace !== "" && selectedTest !== "") {
            const spaceTestCombo = {
                space: selectedSpace,
                test: selectedTest,
                testName: tests.find((test) => String(test.testid) === String(selectedTest))?.testname
            };
            console.log("spaceTestCombo :", spaceTestCombo)
            setSelectedTestsList([...selectedTestsList, spaceTestCombo]);
            console.log("selectedTestsList :", selectedTestsList)
        }
    };

    // const handleSubmit = () => {
    //     if (title && selectedTestsList.length > 0) {
    //         const testIds = selectedTestsList.map((entry) => entry.test);
    //         const payload = {
    //             testIds,
    //             title,
    //             formulaGreen,
    //             formulaRed,
    //             comparisonOperator,
    //             sectionID
    //         };
    //         console.log("payload : ", payload)
    //         axios.post("https://inprove-sport.info/avatar/createAvatarElement", payload)
    //             .then((response) => {
    //                 if (response.data.res === "ok") {
    //                     const mapping = selectedTestsList.map((entry) => entry.testName);
    //                     const message = `One entry added with mapping as: ${title}, [${mapping}]`;
    //                     alert(message);
    //                     // If successful, perform any necessary actions
    //                 } else {
    //                     console.log("title : ", title)
    //                     console.log("selectedTestsList.length  : ", selectedTestsList.length )
    //                     alert('There was an issue adding the entry.');
    //                     // Handle error scenario
    //                 }
    //             })
    //             .catch((error) => {
    //                 alert('There was an error processing your request.');
    //                 console.error('Error:', error);
    //                 // Handle error scenario
    //             });
    //     } else {
    //         console.log("title : ", title)
    //         console.log("selectedTestsList.length  : ", selectedTestsList.length )
    //         alert('Please enter a title and select tests before submitting.');
    //     }
    // };

    const handleSubmit = () => {
        console.log("discipline in AM :", discipline)
        if (title && selectedTestsList.length > 0) {
            const testIds = selectedTestsList.map((entry) => entry.test);
            const testName = selectedTestsList.map((entry) => entry.testName);
            const payload = {
                testIds,
                testName,
                title,
                formulaGreen,
                formulaRed,
                comparisonOperator,
                comparison,
                showValues,
                showThresholds,
                sectionID,
                discipline
            };
            console.log("payload : ", payload)
            axios.post("https://inprove-sport.info/avatar/createAvatarElement", payload)
                .then((response) => {
                    if (response.data.res === "ok") {
                        const mapping = selectedTestsList.map((entry) => entry.testName);
                        const message = `One entry added with title : ${title} and tests : [${mapping}]`;
                        alert(message);

                        // Resetting fields after successful submission
                        setTitle(""); // Reset the title
                        setSelectedSpace("Please select"); // Reset the selected space
                        setSelectedTest(""); // Reset the selected test
                        setSelectedTestsList([]); // Reset the selected tests list
                        setFormulaGreen(""); // Reset formulaGreen
                        setFormulaRed(""); // Reset formulaRed
                        // Reset other necessary fields here

                        // If successful, perform any necessary actions
                    } else {
                        console.log("title : ", title)
                        console.log("selectedTestsList.length  : ", selectedTestsList.length )
                        console.log("RESPONSE : ", title)
                        alert('There was an issue adding the entry.');
                        // Handle error scenario
                    }
                })
                .catch((error) => {
                    console.log("title : ", title)
                    console.log("selectedTestsList.length  : ", selectedTestsList.length )
                    alert('There was an error processing your request.');
                    console.error('Error:', error);
                    // Handle error scenario
                });
        } else {
            console.log("title : ", title)
            console.log("selectedTestsList.length  : ", selectedTestsList.length )
            alert('Please enter a title and select tests before submitting.');
        }
    };


    return (
        <div>
            {/* Space selection */}
            {/* <div>
                <select onChange={(e) => {
                    setSelectedSpace(e.target.value);
                    fetchTests(e.target.value);
                }}>
                    {spaces.map((space) => (
                        <option key={space.value} value={space.value}>
                            {space.label}
                        </option>
                    ))}
                </select>
            </div> */}

            {/* Test selection */}
            {/* <div>
                {tests && (
                    <select onChange={(e) => {
                        setSelectedTest(e.target.value);
                        const selectedTestName = tests.find((test) => String(test.testid) === String(e.target.value))?.testname;
                        if (selectedTestName) {
                            setTitle(selectedTestName);
                        }
                    }}>
                        {tests.map((test) => (
                            <option key={test.testid} value={test.testid}>
                                {test.testname}
                            </option>
                        ))}
                    </select>
                )} */}
            {/* </div> */}

            {/* Add/Delete test buttons */}
            {/* <div>
                <button onClick={() => {
                    // const foundTest = tests.find(test => String(test.testid) === String(selectedTest));
                    // if (foundTest) {
                    //     setSelectedTestsList([...selectedTestsList, foundTest]);
                    // }

                        const foundTests = tests.filter(test => selectedTestsList.every(selectedTest => selectedTest.testid !== test.testid));

                        if (foundTests.length > 0) {
                            setSelectedTestsList([...selectedTestsList, ...foundTests]);
                        }


                    }} className="edit-button">Add Test</button>

                <button onClick={() => setSelectedTestsList([])} className="edit-button" >Delete All Selected Tests</button>
            </div> */}

                {/* <div>
                    <button onClick={() => {
                        if (selectedSpace !== "" && selectedTest !== "") { // Check if both space and test are selected
                            const spaceTestCombo = { space: selectedSpace, test: selectedTest };
                            setSelectedTestsList([...selectedTestsList, spaceTestCombo]); // Append the selected space and test
                        }
                    }} className="edit-button">Add Test</button>
                    <button onClick={() => setSelectedTestsList([])} className="edit-button">Delete All Selected Tests</button>
                </div> */}

            {/* Title field */}
            <div>
                <input
                    className={"form-control"}
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={handleInputChange}
                    required
                />
            </div>


<div>
            <select value={selectedSpace} onChange={(e) => handleSpaceSelect(e.target.value)}>
                {spaces.map((space) => (
                    <option key={space.value} value={space.value}>
                        {space.label}
                    </option>
                ))}
            </select>
        </div>

        {/* Test selection */}
        <div>
            {tests && (
                <select value={selectedTest} onChange={(e) => handleTestSelect(e.target.value)}>
                    {tests.map((test) => (
                        <option key={test.testid} value={test.testid}>
                            {test.testname}
                        </option>
                    ))}
                </select>
            )}
        </div>

        {/* Add/Delete test buttons */}
        <div>
            <button onClick={handleAddTest} className="edit-button">Add Test</button>
            <button onClick={() => setSelectedTestsList([])} className="edit-button">Delete All Selected Tests</button>
        </div>





            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={showValues}
                        onChange={e => setShowValues(e.target.checked)}
                    />
                    Show values
                </label>

                <label>
                    <input
                        type="checkbox"
                        checked={showThresholds}
                        onChange={e => setShowThresholds(e.target.checked)}
                    />
                    Show thresholds
                </label>
            </div>


            <br/>
            {showThresholds && "In the formula field, please use numerical values for static thresholds, F for the formula (MW + SD * 1,5), or FR for (MW - SD * 1,5) "}
            {/* Formula Green field */}


            {showThresholds && <div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <select
                        className="form-control"
                        value={comparison}
                        onChange={e => setComparison(e.target.value)}
                        style={{ width: 'auto' }} // Adjust width as needed
                    >
                        <option value="greaterThan">Greater than</option>
                        <option value="lessThan">Less than</option>
                    </select>
                    <input
                        className={"form-control"}
                        type="text"
                        placeholder="Formula Green"
                        value={formulaGreen}
                        onChange={(e) => setFormulaGreen(e.target.value)}
                    />
                </div>






                {/* Formula Red field */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <select
                    className="form-control"
                    value={comparison}
                    onChange={e => setComparison(e.target.value)}
                    style={{ width: 'auto' }} // Adjust width as needed
                >
                    <option value="greaterThan">Less than</option>
                    <option value="lessThan">Greater than</option>
                </select>
                <input
                    className={"form-control"}
                    type="text"
                    placeholder="Formula Red"
                    value={formulaRed}
                    onChange={(e) => setFormulaRed(e.target.value)}
                />
            </div>
            </div>}



            {/* Comparison Operator field */}
            {/* Submit button */}
            <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={handleSubmit} className={"btn btn-primary btn-block"}>Submit</button>
                
                <button onClick={onClose} className={"btn btn-primary btn-block"}>Close</button>
            </div>
            {/* <button onClick={closeTestsModal} type="button" class="btn btn-primary">
                            Close
             </button> */}

            {/* List of selected tests */}
            {/* <ul>
                {selectedTestsList.map((test, index) => (
                    <li key={index}>{test.testname}</li>
                ))}
            </ul> */}

            <ul>
                {selectedTestsList.map((test, index) => (
                    <li key={index}>{`${test.space} : ${test.testName}`}</li>
                ))}
            </ul>
        </div>
    );
}

export default CreateAvatarEntry;
