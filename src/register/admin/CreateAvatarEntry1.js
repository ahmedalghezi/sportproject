import React, { useState, useEffect } from "react";
import axios from "axios";

function CreateAvatarEntry({ done, sectionID, discipline, onClose }) {
    const [spaces, setSpaces] = useState([]);
    const [tests, setTests] = useState([]);
    const [selectedSpace, setSelectedSpace] = useState("");
    const [desc, setDescription] = useState("");
    const [selectedTest, setSelectedTest] = useState("");
    const [selectedTestsList, setSelectedTestsList] = useState([]);
    const [title, setTitle] = useState("");
    const [thresholds, setThresholds] = useState({});
    const [showValues, setShowValues] = useState(true);
    const [showThresholds, setShowThresholds] = useState(true); // Sent to the backend
    const [showYellow, setShowYellow] = useState(true); // Default checked
    const [showBlue, setShowBlue] = useState(false);
    const [splitByGender, setSplitByGender] = useState(false);
    const [splitByAge, setSplitByAge] = useState(false);
    const [greenOperator, setGreenOperator] = useState("greaterThan");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        axios.get("https://inprove-sport.info/csv/getSpaces").then((response) => {
            setSpaces(response.data.data);
        });
    }, []);

    const fetchTests = (space) => {
        axios
            .get(`https://inprove-sport.info/csv/dnnxyrtFgrhXdYtdKEw/getTests/${space}/d6fBgdKZx6DGHaReiUe`)
            .then((response) => {
                setTests(response.data.data);
                if (response.data.data && response.data.data.length > 0) {
                    setSelectedTest(response.data.data[0].testid);
                }
            });
    };

    const handleSpaceSelect = (space) => {
        setSelectedSpace(space);
        fetchTests(space);
    };

    const handleTestSelect = (test) => {
        setSelectedTest(test);
    };

    const handleAddTest = () => {
        if (selectedSpace !== "" && selectedTest !== "") {
            const spaceTestCombo = {
                space: selectedSpace,
                test: selectedTest,
                testName: tests.find((test) => String(test.testid) === String(selectedTest))?.testname,
            };
            setSelectedTestsList([...selectedTestsList, spaceTestCombo]);
        }
    };

    const handleThresholdChange = (key, value) => {
        setThresholds((prev) => ({ ...prev, [key]: value }));
    };

    const handleOperatorChange = (operator) => {
        const newGreenOperator = operator;
        const newRedOperator = operator === "greaterThan" ? "lessThan" : "greaterThan";

        setGreenOperator(newGreenOperator);

        getThresholdLabels().forEach((label) => {
            handleThresholdChange(`${label}-GreenOperator`, newGreenOperator);
            handleThresholdChange(`${label}-RedOperator`, newRedOperator);
            if (showBlue) {
                handleThresholdChange(`${label}-BlueOperator`, newGreenOperator); // Blue matches Green
            }
        });
    };

    const isValidThreshold = (value) => {
        const numericRegex = /^[+-]?\d+([,.]\d+)?$/; // Matches numbers with optional German-style commas
        return value === "F" || value === "FR" || numericRegex.test(value);
    };

    const buildThresholdObject = () => {
        const labels = getThresholdLabels();
        const thresholdObject = {};

        labels.forEach((label) => {
            const green = thresholds[`${label}-Green`];
            const red = thresholds[`${label}-Red`];
            const blue = showBlue ? thresholds[`${label}-Blue`] : undefined;

            // Validate thresholds
            if (!isValidThreshold(green) || !isValidThreshold(red) || (showBlue && !isValidThreshold(blue))) {
                throw new Error(`Invalid threshold value for ${label}. Please enter a numerical value, F, or FR.`);
            }

            // Build the object for each label
            const entry = {
                red,
                green,
                ...(showBlue && { blue }), // Include blue only if showBlue is selected
            };

            if (label === "General") {
                thresholdObject.general = entry;
            } else if (label.includes("Under18")) {
                thresholdObject.under18 = thresholdObject.under18 || {};
                thresholdObject.under18[label.split("-")[0].toLowerCase()] = entry;
            } else if (label.includes("Over18")) {
                thresholdObject.over18 = thresholdObject.over18 || {};
                thresholdObject.over18[label.split("-")[0].toLowerCase()] = entry;
            } else {
                thresholdObject[label.toLowerCase()] = entry;
            }
        });

        return thresholdObject;
    };

    const handleSubmit = () => {
        try {
            // Build and validate thresholds
            const thresholdsPayload = buildThresholdObject();

            // Prepare the payload
            const payload = {
                testIds: selectedTestsList.map((entry) => entry.test),
                testNames: selectedTestsList.map((entry) => entry.testName),
                title,
                desc,
                thresholds: thresholdsPayload,
                greenOperator, // Send unified operator
                showValues,
                showThresholds, // Sent to backend
                showYellow,
                showBlue,
                splitByGender,
                splitByAge,
                sectionID,
                discipline,
            };

            // Send to backend
            axios.post("https://inprove-sport.info/avatar/createAvatarElement", payload).then((response) => {
                if (response.data.res === "ok") {
                    alert(`Entry added: ${title}`);
                    setErrorMessage(""); // Clear error message on success
                } else {
                    setErrorMessage("There was an issue adding the entry.");
                }
            });
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const getThresholdLabels = () => {
        if (splitByGender && splitByAge) {
            return [
                "Male-Under18",
                "Male-Over18",
                "Female-Under18",
                "Female-Over18",
            ];
        }
        if (splitByGender) {
            return ["Male", "Female"];
        }
        if (splitByAge) {
            return ["Under18", "Over18"];
        }
        return ["General"];
    };

    const renderThresholdFields = (label) => (
        <>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <select
                    className="form-control"
                    value={greenOperator}
                    onChange={(e) => handleOperatorChange(e.target.value)}
                >
                    <option value="greaterThan">Greater than</option>
                    <option value="lessThan">Less than</option>
                </select>
                <input
                    className="form-control"
                    type="text"
                    placeholder={`Formula Green (${label})`}
                    onChange={(e) => handleThresholdChange(`${label}-Green`, e.target.value)}
                />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <select
                    className="form-control"
                    value={greenOperator === "greaterThan" ? "lessThan" : "greaterThan"}
                    disabled
                >
                    <option value="greaterThan">Greater than</option>
                    <option value="lessThan">Less than</option>
                </select>
                <input
                    className="form-control"
                    type="text"
                    placeholder={`Formula Red (${label})`}
                    onChange={(e) => handleThresholdChange(`${label}-Red`, e.target.value)}
                />
            </div>
            {showBlue && (
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                    <select
                        className="form-control"
                        value={greenOperator}
                        disabled
                    >
                        <option value="greaterThan">Greater than</option>
                        <option value="lessThan">Less than</option>
                    </select>
                    <input
                        className="form-control"
                        type="text"
                        placeholder={`Formula Blue (${label})`}
                        onChange={(e) => handleThresholdChange(`${label}-Blue`, e.target.value)}
                    />
                </div>
            )}
        </>
    );

    return (
        <div style={{ maxWidth: "800px", margin: "20px", padding: "20px", border: "1px solid #ccc", borderRadius: "5px" }}>
            <div>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <textarea
                    className="form-control"
                    placeholder="Description"
                    value={desc}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{
                        width: "100%",
                        minHeight: "40px",
                        maxHeight: "80px",
                        resize: "vertical",
                        overflowY: "auto",
                        marginBottom: "15px",
                    }}
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

            <div>
                <button onClick={handleAddTest} className="edit-button">
                    Add Test
                </button>
                <button onClick={() => setSelectedTestsList([])} className="edit-button">
                    Delete All Selected Tests
                </button>
            </div>

            <div style={{ margin: "10px 0" }}>
                <label style={{ marginRight: "15px" }}>
                    <input type="checkbox" checked={showValues} onChange={(e) => setShowValues(e.target.checked)} />
                    Show values
                </label>
                <label style={{ marginRight: "15px" }}>
                    <input
                        type="checkbox"
                        checked={showThresholds}
                        onChange={(e) => setShowThresholds(e.target.checked)} // For backend only
                    />
                    Show thresholds
                </label>
                <label style={{ marginRight: "15px" }}>
                    <input type="checkbox" checked={showYellow} onChange={(e) => setShowYellow(e.target.checked)} />
                    Show yellow
                </label>
                <label style={{ marginRight: "15px" }}>
                    <input type="checkbox" checked={showBlue} onChange={(e) => setShowBlue(e.target.checked)} />
                    Show blue
                </label>
                <label style={{ marginRight: "15px" }}>
                    <input
                        type="checkbox"
                        checked={splitByGender}
                        onChange={(e) => setSplitByGender(e.target.checked)}
                    />
                    Split by gender
                </label>
                <label>
                    <input type="checkbox" checked={splitByAge} onChange={(e) => setSplitByAge(e.target.checked)} />
                    Split by age
                </label>
            </div>

            <p>
                In the formula field, please use numerical values for static thresholds, F for the formula
                (MW + SD * 1,5), or FR for (MW - SD * 1,5).
            </p>

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            {getThresholdLabels().map((label) => (
                <div key={label}>
                    <h4>{label} Thresholds</h4>
                    {renderThresholdFields(label)}
                </div>
            ))}

            <div style={{ display: "flex", gap: "8px", marginTop: "20px" }}>
                <button onClick={handleSubmit} className="btn btn-primary btn-block">
                    Submit
                </button>
                <button onClick={onClose} className="btn btn-primary btn-block">
                    Close
                </button>
            </div>

            <ul>
                {selectedTestsList.map((test, index) => (
                    <li key={index}>{`${test.space} : ${test.testName}`}</li>
                ))}
            </ul>
        </div>
    );
}

export default CreateAvatarEntry;
