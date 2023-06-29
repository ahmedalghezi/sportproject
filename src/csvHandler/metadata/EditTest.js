// EditTest.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditTest = () => {
    const [spaces, setSpaces] = useState([]);
    const [selectedSpace, setSelectedSpace] = useState('');
    const [tests, setTests] = useState([]);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);




    useEffect(() => {
        const fetchSpaces = async () => {
            const response = await axios.get('https://inprove-sport.info/csv/getMetaSpaces');
            setSpaces(response.data);
        };
        fetchSpaces();
    }, []);

    useEffect(() => {
        if (selectedSpace) {
            const fetchTests = async () => {
                const response = await axios.get(`https://inprove-sport.info/csv/getAllTests/${selectedSpace}`);
                const testsWithModifiedFlag = response.data.map((test) => ({ ...test, isModified: false }));
                setTests(response.data);
            };
            fetchTests();
        }
    }, [selectedSpace]);


    const handleSpaceChange = (e) => {
        setSelectedSpace(e.target.value);
    };


    const handleChange = (index, field, value) => {
        setTests((prevTests) => {
            const updatedTests = [...prevTests];
            updatedTests[index] = {
                ...updatedTests[index],
                [field]: value,
                isModified: true,
            };
            return updatedTests;
        });
        setHasUnsavedChanges(true);
    };



    const handleSubmit = async (e, testId) => {
        e.preventDefault();
        const updatedTest = tests.find((test) => test.id === testId);
        const testIndex = tests.findIndex((test) => test.id === testId);
        updatedTest.testID = testId;
        const result = await axios.post(`https://inprove-sport.info/csv/updateMetatest`, updatedTest);
        if(result.data.result === "ok"){
            setTests((prevTests) => {
                const updatedTests = [...prevTests];
                updatedTests[testIndex] = { ...updatedTest, isModified: false };
                const hasUnsaved = updatedTests.some((test) => test.isModified);
                setHasUnsavedChanges(hasUnsaved);
                return updatedTests;
            });
        }else{
            alert("some error has happened, code Edt64");
        }
    };

    const handleSaveAll = async () => {
        try {
            await Promise.all(
                tests
                    .filter((test) => test.isModified)
                    .map((test) =>{
                        test.testID = test.id;
                        axios.post(`https://inprove-sport.info/csv/updateMetatest`, test).then(() => {
                            setTests((prevTests) => {
                                const updatedTests = [...prevTests];
                                const testIndex = updatedTests.findIndex((t) => t.id === test.id);
                                updatedTests[testIndex] = { ...test, isModified: false };
                                return updatedTests;
                            });
                        })}
                    )
            );
            setHasUnsavedChanges(false);
        } catch (error) {
            console.error("Error updating tests:", error);
        }
    };


    return (
        <>
            <label>Space:</label>
            <select value={selectedSpace} onChange={handleSpaceChange}>
                <option value="">Select a space</option>
                {spaces.map((space) => (
                    <option key={space.id} value={space.name}>
                        {space.name}
                    </option>
                ))}
            </select>

            {selectedSpace && (
                <table>
                    <thead>
                    <tr>
                        <th>Test Name</th>
                        <th style={{ width: "500px" }}>Description</th>
                        <th style={{ width: "120px" }}>Threshold Type</th>
                        <th style={{ width: "80px" }}>Threshold Male Red</th>
                        <th style={{ width: "80px" }}>Threshold Male Green</th>
                        <th style={{ width: "80px" }}>Threshold Female Red</th>
                        <th style={{ width: "80px" }}>Threshold Female Green</th>
                        <th>
                            <button className="btn btn-outline-primary btn-block" onClick={handleSaveAll} disabled={!hasUnsavedChanges}>Save All</button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {tests.map((test, index) => (
                        <tr key={test.id}>

                            <td>{test.name}</td>


                            <td>
                                <input
                                    type="text"
                                    name="desc"
                                    value={test.desc || ''}
                                    onChange={(e) =>
                                        handleChange(index, 'desc', e.target.value)
                                    }

                                    style={{ width: "300px" }}
                                />
                            </td>


                            <td>
                                <select value={test.threshold_type} name="threshold_type" style={{ width: "130px" }} onChange={(e) =>
                                    handleChange(index, 'threshold_type', e.target.value)
                                }>
                                    <option value="">Please select</option>
                                    <option value="static">static</option>
                                    <option value="formula">formula</option>
                                </select>
                            </td>


                            <td>
                                <input
                                    type="number"
                                    step="any"
                                    name="threshold_male_red"
                                    value={test.threshold_male_red || ''}
                                    onChange={(e) =>
                                        handleChange(index, 'threshold_male_red', e.target.value)
                                    }
                                    style={{ width: "80px" }}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    step="any"
                                    name="threshold_male_green"
                                    value={test.threshold_male_green || ''}
                                    onChange={(e) =>
                                        handleChange(index, 'threshold_male_green', e.target.value)
                                    }
                                    style={{ width: "80px" }}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    step="any"
                                    name="threshold_female_red"
                                    value={test.threshold_female_red || ''}
                                    onChange={(e) =>
                                        handleChange(index, 'threshold_female_red', e.target.value)
                                    }
                                    style={{ width: "80px" }}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    step="any"
                                    name="threshold_female_green"
                                    value={test.threshold_female_green || ''}
                                    onChange={(e) =>
                                        handleChange(index, 'threshold_female_green', e.target.value)
                                    }
                                    style={{ width: "80px" }}
                                />
                            </td>
                            <td>
                                <button onClick={(e) => handleSubmit(e, test.id)} disabled={!test.isModified}>
                                    Save
                                </button>
                        </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default EditTest;
