import React, { useState, useEffect } from "react";
import axios from "axios";

function CreateAvatarEntry({ done, sectionID }) {
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

    useEffect(() => {
        axios.get("https://inprove-sport.info/csv/getSpaces").then((response) => {
            setSpaces(response.data.data);
        });
    }, []);

    const fetchTests = (space) => {
        axios.get(`https://inprove-sport.info/csv/dnnxyrtFgrhXdYtdKEw/getTests/${space}/d6fBgdKZx6DGHaReiUe`).then((response) => {
            setTests(response.data.data);
        });
    };

    const handleSubmit = () => {
        const payload = {
            testIds: selectedTestsList.map((test) => test.testid),
            title,
            formulaGreen,
            formulaRed,
            comparisonOperator,
            sectionID
        };

        axios.post("https://inprove-sport.info/avatar/createAvatarElement", payload).then((response) => {
            console.log('Response:', response);
            if (response.data.res === "ok") {
                if (typeof done === "function") {
                    done(true);
                }
            } else {
                if (typeof done === "function") {
                    done(false);
                }
            }
        });
    };

    return (
        <div>
            {/* Space selection */}
            <div>
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
            </div>

            {/* Test selection */}
            <div>
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
                )}
            </div>

            {/* Add/Delete test buttons */}
            <div>
                <button onClick={() => {
                    const foundTest = tests.find(test => String(test.testid) === String(selectedTest));
                    if (foundTest) {
                        setSelectedTestsList([...selectedTestsList, foundTest]);
                    }
                }} className="edit-button" >Add Test</button>
                <button onClick={() => setSelectedTestsList([])} className="edit-button" >Delete All Selected Tests</button>
            </div>

            {/* Title field */}
            <div>
                <input
                    className={"form-control"}
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            {/* Formula Green field */}
            <div>
                <input
                    className={"form-control"}
                    type="text"
                    placeholder="Formula Green"
                    value={formulaGreen}
                    onChange={(e) => setFormulaGreen(e.target.value)}
                />
            </div>

            {/* Formula Red field */}
            <div>
                <input
                    className={"form-control"}
                    type="text"
                    placeholder="Formula Red"
                    value={formulaRed}
                    onChange={(e) => setFormulaRed(e.target.value)}
                />
            </div>

            {/* Comparison Operator field */}
            {/* Submit button */}
            <div>
                <button onClick={handleSubmit} className={"btn btn-primary btn-block"}>Submit</button>
            </div>

            {/* List of selected tests */}
            <ul>
                {selectedTestsList.map((test, index) => (
                    <li key={index}>{test.testname}</li>
                ))}
            </ul>
        </div>
    );
}

export default CreateAvatarEntry;
