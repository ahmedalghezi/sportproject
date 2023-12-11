import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateAvatarEntry from "./CreateAvatarEntry";

const SectionManager = () => {
    const [sections, setSections] = useState([]);
    const [newSectionName, setNewSectionName] = useState('');
    const [isEditing, setIsEditing] = useState(null);
    const [editSectionName, setEditSectionName] = useState('');
    const [showTestsModal, setShowTestsModal] = useState(false); // Define showTestsModal state
    const [testsModalContent, setTestsModalContent] = useState(null); // Define testsModalContent state
    const [sectionToAddEntryTo, setSectionToAddEntryTo] = useState(null);
    const [testsForSections, setTestsForSections] = useState({});

    const done = (status) => {
        if (status) {
        }
        setSectionToAddEntryTo(null);
    };

    // Load sections when the component mounts
    useEffect(() => {
        loadSections();
    }, []);

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

    const showEntries = async (sectionID) => {
        try {
            const url = `https://inprove-sport.info/avatar/getEntries`;
            const response = await axios.get(url);
            const entries = response.data;

            // Filter entries for the specific section
            const sectionEntries = entries.filter((entry) => entry.section_id === sectionID);
            const sectionName = sectionEntries.length > 0 ? sectionEntries[0].section_name : '';

            const entriesContent = (
                <div>
                    <h1>Entries for Section {sectionName}</h1>
                    <ul>
                        {sectionEntries.map((entry) => (
                            <li key={entry.id}>
                                {entry.title}
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleRemoveEntry(entry.id)}
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

    const handleRemoveEntry = async (entryId) => {
        try {
            // Make a DELETE request to delete the entry
            const response = await axios.post(`https://inprove-sport.info/avatar/deleteAvatarElement`, { id: entryId });
            console.log(`Entry with ID ${entryId} has been deleted`);
            console.log(`Response from delete request:`, response);
        } catch (error) {
            console.error(`Error deleting entry with ID ${entryId}:`, error);
        }
    };


    const closeTestsModal = () => {
        setShowTestsModal(false);
        setTestsModalContent(null);
    };

    return (
        <div>
            <h1>Section Manager</h1>
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
                                    <button  type="button" class="btn btn-light" onClick={() => showEntries(section.id)}
                                             style={{ marginRight: '10px', border: "1px solid #000"}}>
                                        Show Entries
                                    </button>
                                </div>
                            </div>
                        )}
                        {sectionToAddEntryTo === section.id && <CreateAvatarEntry sectionID={section.id} done={done} />}
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
