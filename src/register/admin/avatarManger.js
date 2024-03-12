import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateAvatarEntry from "./CreateAvatarEntry1";
import PostSignup from "../../DB/postSignup";

const SectionManager = () => {
    const [sections, setSections] = useState([]);
    const [newSectionName, setNewSectionName] = useState('');
    const [isEditing, setIsEditing] = useState(null);
    const [editSectionName, setEditSectionName] = useState('');
    const [showTestsModal, setShowTestsModal] = useState(false); // Define showTestsModal state
    const [testsModalContent, setTestsModalContent] = useState(null); // Define testsModalContent state
    const [sectionToAddEntryTo, setSectionToAddEntryTo] = useState(null);
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
// Check if showTestsModal is true
            if (showTestsModal) {
                // Call showEntries for the relevant section
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
            console.log(`Tests for Section ${sectionID}:`, response.data);
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
            await axios.post('https://inprove-sport.info/avatar/createSection', { name: newSectionName });
            setNewSectionName('');
            loadSections();
        } catch (error) {
            console.error('Error creating section:', error);
        }
    };

    const startEditing = (id, name) => {
        setIsEditing(id);
        setEditSectionName(name);
    };

    const editSection = async () => {
        try {
            await axios.put(`https://inprove-sport.info/avatar/editSection/${isEditing}`, { name: editSectionName });
            setIsEditing(null);
            loadSections();
        } catch (error) {
            console.error('Error editing section:', error);
        }
    };

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

            const responseTests = await axios.get(`https://inprove-sport.info/avatar/getTestsForSection/${sectionID}`);
            console.log("show responseTests  : ", responseTests.data.data)
            const entriesContent = (
                <div>
                    <h1>{`Entries for Section : ${sectionName} and discipline: ${discipline}`}</h1>
                    <ul>
                        {sectionEntries.map((entry) => (
                            <li key={entry.id}>
                                {/* {entry.title} */}
                                {`${entry.title} : Tests = [${entry.test_names}]   Red = [${entry.red}]   Green = [${entry.green}]`}
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
  

const handleDispSele = (event) => {
        event.preventDefault();
        setDiscipline(event.target.value);
        setSuccess(false);
        setError(false);
        console.log("discipline : ", discipline)
    }
    return (
        <div>
            <h1>Section Manager</h1>
            <p><a href={"https://inprove-sport.info:8080/videos/avatar_manger_desc.mp4"}>For more info, please watch the describing video</a></p>
            {/* Add a new section */}
            <div style={{ display: 'flex', marginBottom: '10px' }}>
                <input
                    type="text"
                    placeholder="New Section Name"
                    value={newSectionName}
                    onChange={(e) => setNewSectionName(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <button type="button" className="btn btn-success" onClick={addSection}>Add Section</button>
            </div>

            <ul>
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
                                <button className="btn btn-primary" onClick={editSection} >Save</button>
                            </div>
                        ) : (
                            <div>
                                <div>
                                    {section.name}
                                    &nbsp;&nbsp;&nbsp;
                                    <button type="button" class="btn btn-light" onClick={() => startEditing(section.id, section.name)}
                                            style={{ marginRight: '10px', border: "1px solid #000" }}>
                                        Edit
                                    </button>
                                    <button type="button" class="btn btn-light" onClick={() => setSectionToAddEntryTo(section.id)}
                                            style={{ marginRight: '10px', border: "1px solid #000"}}>
                                        Add Entry
                                    </button>
                                    <button  type="button" class="btn btn-light" onClick={() => showEntries(section.id,discipline,section.name)}
                                             style={{ marginRight: '10px', border: "1px solid #000"}}>
                                        Show Entries
                                    </button>
                                    <select onChange={handleDispSele} name="Discipline" value={discipline}>
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
