import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateAvatarEntry from "./CreateAvatarEntry1";
import ManageDates from "./manageDates";
import PostSignup from "../../DB/postSignup";
import { FaQuestionCircle } from 'react-icons/fa';
import { set } from 'date-fns';

const SectionManager = () => {
    const [sections, setSections] = useState([]);
    const [newSectionName, setNewSectionName] = useState('');
    // const [newSectionDescription, setnewSectionDescription] = useState('');
    const [isEditing, setIsEditing] = useState(null);
    const [editSectionName, setEditSectionName] = useState('');
    // const [editSectionDate, setEditSectionDate] = useState("");
    // const [showButtons, setShowButtons] = useState(false);
    // const [inputValue, setInputValue] = useState("");
    // const [showClearButton, setShowClearButton] = useState('');
    const [showTestsModal, setShowTestsModal] = useState(false); // Define showTestsModal state
    const [testsModalContent, setTestsModalContent] = useState(null); // Define testsModalContent state
    const [sectionToAddEntryTo, setSectionToAddEntryTo] = useState(null);
    const [sectionToAddDate, setSectionToAddDate] = useState(null);
    const [testsForSections, setTestsForSections] = useState({});
    const [disciplinesList, setDisciplinesList] = useState([]);
    const [discipline, setDiscipline] = useState("All");
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    // const done = (status) => {
//     if (status) {
    //     }
    //     setSectionToAddEntryTo(null);
    // };

    const done = async (status, sectionID) => {
        if (status) {
            if (showTestsModal) {
                await showEntries(sectionID);

            }
        }
        setSectionToAddEntryTo(null);
    };



    // Load sections when the component mounts
    useEffect(() => {
        loadSections();
    if (disciplinesList.length == 0) {
            getDisplines();
            //showError("This page is under update ...");
        }
    }, []);


        // fetch('your_url_to_get_disciplines')
        //     .then(response => response.json())
        //     .then(data => {
        //         // Assuming data is an array of disciplines like: ['Discipline1', 'Discipline2', ...]
        //         setDisciplines(data);
        //     })
        //     .catch(error => {
        //         // Handle error
        //         console.error('Error fetching disciplines:', error);
        //     });
    //     done(true);
    // }, []);


    const showError = (msg) => {
        setError(true);
        setErrorMsg(msg);
    }




    // const handleEditDate = async (testId) => {
    //     // Logic to handle editing the date for the test with the provided testId
    //     try {
    //         // Fetch data or perform any necessary operations
    //         console.log(`Editing date for test with ID: ${testId}`);
    //     } catch (error) {
    //         console.error('Error editing date:', error);
    //     }
    // };

    // const handleDeleteDate = async (testId) => {
    //     // Logic to handle deleting the date for the test with the provided testId
    //     try {
    //         // Perform delete operation
    //         console.log(`Deleting date for test with ID: ${testId}`);
    //     } catch (error) {
    //         console.error('Error deleting date:', error);
    //     }
    // };


    const getDisplines = () => {
        PostSignup.getAllDisciplines().then(response => {
            if (response.data.res === "error") {
                showError("Error getting disciplines from server");
                return;
            } else if (response.data.res && response.data.res.length > 0) {
                setDisciplinesList(response.data.res);
                setDiscipline("All");
            }

        }).catch(e => {
            console.log(e);
            alert("some error has happened");
        });
    }

    const loadSections = async () => {
        try {
            const response = await axios.get('https://inprove-sport.info/avatar/getSections');
            setSections(response.data);

            // Load tests for each section
            for (const section of response.data) {
                loadTestsForSections(section.id);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const loadTestsForSections = async (sectionID) => {
        try {
            const response = await axios.get(`https://inprove-sport.info/avatar/getTestsForSection/${sectionID}`);
            // console.log(`Tests for Section ${sectionID}:`, response.data);
            setTestsForSections((prevTestsForSections) => ({
                ...prevTestsForSections,
                [sectionID]: response.data.tests,
            }));
        } catch (error) {
            console.error('Error fetching tests:', error);
        }
    };

    const addSection = async () => {
        try {
            await axios.post('https://inprove-sport.info/avatar/createSection', { name: newSectionName
            // , description: newSectionDescription // Include description in the request if provided
        });
        setNewSectionName('');
        // setnewSectionDescription('');
        loadSections();
        } catch (error) {
            console.error('Error creating section:', error);
        }
    };

    // const startEditing = (id, name) => {
    //     setIsEditing(id);
    //     setEditSectionName(name);
    // };

    const startEditing = (id, name) => {
        setIsEditing(id);
        setEditSectionName(name);
        // setEditSectionDate(date);
    };

    // const handleDateChange = (dateString) => {
    //     // Regular expression to match dd.mm.yy format
    //     const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;

    //     if (dateRegex.test(dateString)) {
    //         const [day, month, year] = dateString.split('.').map(part => parseInt(part));
    //         const date = new Date(year, month - 1, day);
    //         console.log("Selected date:", date);
    //     } else {
    //         console.error("Invalid date format");
    //     }
    // };


    // const validateDate = (value) => {
    //     // Regular expression for date in dd.mm.yyyy format
    //     const dateRegex = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/;

    //     if (!value.match(dateRegex)) {
    //         // Date format is invalid
    //         return false;
    //     }

    //     // Parse the date components
    //     const [, day, month, year] = value.match(dateRegex);

    //     // Convert month and day to numbers
    //     const monthNum = parseInt(month, 10);
    //     const dayNum = parseInt(day, 10);

    //     // Check if year, month, and day are within valid ranges
    //     if (year < 1000 || year > 9999 || monthNum < 1 || monthNum > 12 || dayNum < 1 || dayNum > 31) {
    //         return false;
    //     }

    //     // Additional checks for specific months and days
    //     if (monthNum === 2) {
    //         // Check for February and leap years
    //         const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    //         if (dayNum > 29 || (dayNum === 29 && !isLeapYear)) {
    //             return false;
    //         }
    //     } else if ([4, 6, 9, 11].includes(monthNum)) {
    //         // Check for months with 30 days
    //         if (dayNum > 30) {
    //             return false;
    //         }
    //     }
    //     return true;
    // };

    // const handleDateInputChange = () => {
    //     if (validateDate(inputValue)) {
    //         setEditSectionDate(inputValue);
    //         setShowButtons(false); // Hide buttons after successful validation
    //     } else {
    //         console.error("Invalid Date");
    //     }
    // };

    // const resetInputValue = () => {
    //     setInputValue("");
    //     setShowButtons(false); // Hide buttons after reset
    // };

    // const handleInputChange = (e) => {
    //     console.log("entered e value ; ", e)
    //     setInputValue(e.target.value);
    //     setShowButtons(true); // Show buttons when user starts typing
    // };


    const editSection = async () => {
        try {
            // console.log("date: editSectionDate --- ", editSectionDate )
            await axios.put(`https://inprove-sport.info/avatar/editSection/${isEditing}`, { name: editSectionName });
            setIsEditing(null);
            loadSections();
        } catch (error) {
            console.error('Error editing section:', error);
        }
    };

    // const setSectionToManageDates = async (sectionID) => {
    //     try {

    //         console.log("discipline : ", discipline)
    //         console.log("sectionID : ", sectionID)
    //         console.log("sectionName : ", sectionName)
    //         const url = `https://inprove-sport.info/avatar/getEntries/${discipline}`;
    //         const response = await axios.get(url);
    //         const entries = response.data.entries;
    //         console.log("show entry payload : ", response)
    //         console.log("show entry entries : ", entries)
    //         console.log("discipline : ", discipline)

    //         // Filter entries for the specific section
    //         const sectionEntries = entries.filter((entry) => entry.section_id === sectionID);

    //         // Sort tests by id in descending order
    //         sectionEntries.sort((a, b) => b.id - a.id);
    //         console.log("Sorted sectionEntries : ", sectionEntries)

    //         const testsContent = (
    //             <div>
    //                 <h1>{`Tests for Section: ${sectionName} and discipline: ${discipline}`}</h1>
    //                 <ul>
    //                     {sectionEntries.map((entry) => (
    //                         <li key={entry.id}>
    //                             <span>{`${entry.title} : Tests = [${entry.test_names}]   Red = [${entry.red}]   Green = [${entry.green}]`}</span>
    //                             {/* <div> */}
    //                 <input
    //             className={"form-control"}
    //             type="text"
    //             placeholder="dd.mm.yyyy(Test Date)"
    //             value={inputValue}
    //             onChange={handleInputChange}
    //             style={{ marginRight: '10px', border: "1px solid #000" }}
    //         />
    //         {showButtons && (
    //             <div>
    //                 <button
    //                     className="btn btn-success"
    //                     onClick={handleDateInputChange}
    //                     style={{ marginRight: '5px' }}
    //                 >
    //                     ✓
    //                 </button>
    //                 <button
    //                     className="btn btn-danger"
    //                     onClick={resetInputValue}
    //                 >
    //                     ✗
    //                 </button>
    //             </div>
    //         )}
    //         {/* </div>  */}
    //         <button
    //                                 type="button"
    //                                 className="btn btn-danger"
    //                                 onClick={() => handleDeleteDate(test.id)}
    //                                 style={{ marginLeft: '10px' }}
    //                             >
    //                                 Delete Date
    //                             </button>
    //                         </li>
    //                     ))}
    //                 </ul>
    //             </div>
    //         );

    //         setTestsModalContent(testsContent);
    //         setShowTestsModal(true);
    //     } catch (error) {
    //         console.error('Error fetching tests:', error);
    //     }
    // };

    const showEntries = async (sectionID,discipline,sectionName) => {
        try {
            console.log("discipline : ", discipline)
            const url = `https://inprove-sport.info/avatar/getEntries/${discipline}`;
            const response = await axios.get(url);
            const entries = response.data.entries;
            console.log("show entry payload : ", response)
            console.log("show entry entries : ", entries)
            console.log("discipline : ", discipline)

            // Filter entries for the specific section
            const sectionEntries = entries.filter((entry) => entry.section_id === sectionID);
            // const sectionName = sectionEntries.length > 0 ? sectionEntries[0].section_name : '';

            // const responseTests = await axios.get(`https://inprove-sport.info/avatar/getTestsForSection/${sectionID}`);
            // console.log("show responseTests  : ", responseTests.data.data)

            const entriesContent = (
                <div style={{
                    maxWidth: '1200px',
                    margin: '20px',
                    padding: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '5px'
                }}>
                    <h1>{`Entries for Section : ${sectionName} and discipline: ${discipline}`}</h1>
                    <ul>
                        {sectionEntries.map((entry) => (
                            <li key={entry.id}>
                                {/* {entry.title} */}
                                <span data-toggle="tooltip" title={entry.descr}>
                                {entry.title}
                                {entry.descr && <span style={{ verticalAlign: "super" }}><FaQuestionCircle style={{ color: 'blue' }} /></span>}
                                {/* {entry.descr && <sub> <FaQuestionCircle style={{ color: 'blue' }} /> </sub>} */}
                            </span>
                                {/* ${entry.title} : ${entry.descr}  */}
                                {`: Tests = [${entry.test_names}]   Red = [${entry.red}]   Green = [${entry.green}]`}
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleRemoveEntry(entry.id, sectionID)}
                                    style={{ marginLeft: '10px' }}
                                >X
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            );

            setTestsModalContent(entriesContent);
            setShowTestsModal(true);
        } catch (error) {
            console.error('Error fetching entries:', error);
        }
    };

    // const showEntries = async (sectionID) => {
    //     try {
    //         const entriesResponse = await axios.get('https://inprove-sport.info/avatar/getEntries');
    //         const testsResponse = await axios.get(`https://inprove-sport.info/avatar/getTestsForSection/${sectionID}`);

    //         const entries = entriesResponse.data;
    //         const tests = testsResponse.data.tests;

    //         const sectionEntries = entries.filter((entry) => entry.section_id === sectionID);
    //         const sectionName = sectionEntries.length > 0 ? sectionEntries[0].section_name : '';

    //         const entriesWithTestsContent = sectionEntries.map((entry) => {
    //             const testIds = entry.test_ids.split(',').map(Number);
    //             const testNames = tests.filter((test) => testIds.includes(test.testid)).map((test) => test.testname);
    //             return (
    //                 <li key={entry.id}>
    //                     {`${entry.title} : Tests [${testNames.join(', ')}]`}
    //                     <button
    //                         type="button"
    //                         className="btn btn-danger"
    //                         onClick={() => handleRemoveEntry(entry.id)}
    //                         style={{ marginLeft: '10px' }}
    //                     >
    //                         X
    //                     </button>
    //                 </li>
    //             );
    //         });

    //         const entriesContent = (
    //             <div>
    //                 <h1>Entries for Section {sectionName}</h1>
    //                 <ul>{entriesWithTestsContent}</ul>
    //             </div>
    //         );

    //         setTestsModalContent(entriesContent);
    //         setShowTestsModal(true);
    //     } catch (error) {
    //         console.error('Error fetching entries:', error);
    //     }
    // };


    const handleRemoveEntry = async (entryId,sectionID) => {
        try {
            // Make a DELETE request to delete the entry
            const response = await axios.post(`https://inprove-sport.info/avatar/deleteAvatarElement`, { id: entryId });
            console.log(`Entry with ID ${entryId} has been deleted`);
            console.log(`Response from delete request:`, response);
            showEntries(sectionID,discipline);
        } catch (error) {
            console.error(`Error deleting entry with ID ${entryId}:`, error);
        }
    };


    const closeTestsModal = () => {
        setShowTestsModal(false);
        setTestsModalContent(null);
    };

    // In your parent component

    const handleCloseCreateAvatarEntry = () => {
        setSectionToAddEntryTo(null); // or any falsy value that would imply no section is selected
    };

    const handleCloseDateEntry = () => {
        setSectionToAddDate(null); // or any falsy value that would imply no section is selected
    };


const handleDispSele = (event) => {
        event.preventDefault();
        setDiscipline(event.target.value);
        setSuccess(false);
        setError(false);
        console.log("discipline : ", discipline)
    }

    // const handleClearDate = () => {
    //     setEditSectionDate('');
    //     // After clearing the date, focus on the input field
    //     // This will allow the user to start typing immediately
    //     // without having to click on the input field again
    //     document.getElementById('dateInput').focus();
    // };

    return (
        <div
        style={{
            // maxWidth: '800px',
            margin: '10px',
            padding: '10px',
            border: '2px solid #ccc',
            borderRadius: '5px'
        }}
        >
            <h1 style = {{alignItems: 'centre'}}>Avatar Section Manager</h1>
            {/*<p><a href={"https://inprove-sport.info:8080/videos/avatar_manger_desc.mp4"}>For more info, please watch the describing video</a></p>*/}
            {/* Add a new section */}
            <div style={{ display: 'flex', marginBottom: '10px' }}>
                <input
                    type="text"
                    placeholder="New Section Name"
                    value={newSectionName}
                    onChange={(e) => setNewSectionName(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                {/* <textarea
                placeholder="New Section Description"
                value={newSectionDescription}
                onChange={(e) => setnewSectionDescription(e.target.value)}
                style={{
                    marginLeft: '10px',
                    marginRight: '10px',
                    width: '30%', // Set the width to fill the available space
                    minHeight: '40px', // Set minimum height for better visibility
                    maxHeight: '40px', // Set maximum height to limit expansion
                    resize: 'vertical', // Allow vertical resizing for multiline input
                    overflowY: 'auto', // Add vertical scroll if content overflows
                }}/> */}

                <button type="button" className="btn btn-success" onClick={addSection}>Add Section</button>

            </div>

            <ul>
            {/* {sections.map((section) => (
                <li key={section.id} style={{ marginBottom: '10px' }}>
                    {isEditing === section.id ? (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="text"
                                value={editSectionName}
                                onChange={(e) => setEditSectionName(e.target.value)}
                                style={{ marginRight: '10px' }}
                            />
                            <input
                                class="btn btn-light"
                                type="text"
                                placeholder="dd.mm.yyyy(Test Date)"
                                value={editSectionDate}
                                onChange={(e) => handleDateChange(e.target.value)}
                                style={{ marginRight: '10px', border: "1px solid #000" }}
                            /> */}

                           {sections.map((section) => (
    <li key={section.id} style={{ marginBottom: '10px' }}>
        {isEditing === section.id ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type="text"
                    value={editSectionName}
                    onChange={(e) => setEditSectionName(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                {/* <div style={{ position: 'relative' }}>
                    <input
                        // id="dateInput"
                        className="btn btn-light"
                        type="text"
                        placeholder="dd.mm.yyyy(Test Date)"
                        value={editSectionDate}
                        onChange={(e) => handleDateInputChange(e.target.value)}
                        style={{ marginRight: '10px', border: "1px solid #000" }}
                    />
                    {editSectionDate && ( // Render clear button only when there's content
                        <button
                            className="clear-button"
                            onClick={() => setEditSectionDate("")}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                right: '8px',
                                transform: 'translateY(-50%)',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            X
                        </button>
                    )}
                </div> */}

                            <button className="btn btn-primary" onClick={editSection}>Save</button>
                        </div>
                    ) : (
                        <div>
                            <div>
                                <span class="btn btn-light" style={{ marginRight: '10px'}}> {section.name} : </span>
                                    <button type="button" class="btn btn-light" onClick={() => startEditing(section.id, section.name, section.date)}
                                            style={{ marginRight: '10px', border: "1px solid #000" }}>
                                        Edit
                                    </button>

                                    <button type="button" class="btn btn-light" onClick={() => setSectionToAddEntryTo(section.id)}
                                            style={{ marginRight: '10px', border: "1px solid #000"}}>
                                        Add Entry
                                    </button>

                                    <button type="button" class="btn btn-light" onClick={() => setSectionToAddDate(section.id)}
                                            style={{ marginRight: '10px', border: "1px solid #000"}}>
                                        Manage Test Dates
                                    </button>

                                    <button  type="button" class="btn btn-light" onClick={() => showEntries(section.id,discipline,section.name)}
                                             style={{ marginRight: '10px', border: "1px solid #000"}}>
                                        Show Entries
                                    </button>

                                    <select onChange={handleDispSele} class="btn btn-light"  style={{ width: '200px', border: '1px solid #000'}}name="Discipline" value={discipline}>
                                        <option value="All">All</option>
                                        {disciplinesList.map((item) => (
                                            <option key={item} value={item}>{item}</option>
                                        ))}
                                    </select>
                                    {/* <select
                                        value={selectedDiscipline}
                                        onChange={(e) => setSelectedDiscipline(e.target.value)}
                                        style={{ marginRight: '10px', border: '1px solid #000' }}
                                    >
                                        <option value="All">All</option>
                                        {disciplines.map((discipline, index) => (
                                            <option key={index} value={discipline}>
                                                {discipline}
                                            </option>
                                        ))}
                                    </select> */}
                                </div>
                            </div>
                        )}
                        {/* {sectionToAddEntryTo === section.id && <CreateAvatarEntry sectionID={section.id} done={done} />} */}
                        {/* {sectionToAddEntryTo === section.id && (
                            <CreateAvatarEntry sectionID={section.id} done={() => done(true, section.id, discipline)} discipline={discipline} />
                        )} */}
                        {sectionToAddEntryTo === section.id && (
                            <CreateAvatarEntry
                                sectionID={section.id}
                                done={() => done(true, section.id, discipline)}
                                discipline={discipline}
                                onClose={handleCloseCreateAvatarEntry} // Passing the close function as a prop
                            />
                            )}

                        {sectionToAddDate === section.id && (
                            <ManageDates
                                sectionID={section.id}
                                done={() => done(true, section.id, discipline)}
                                discipline={discipline}
                                onClose={handleCloseDateEntry} // Passing the close function as a prop
                            />
                            )}




                    </li>
                ))}
            </ul>
            {showTestsModal && (
                <div className="tests-modal">
                    <div className="tests-modal-content">
                        {testsModalContent}
                        <button onClick={closeTestsModal} type="button" class="btn btn-primary">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SectionManager;
