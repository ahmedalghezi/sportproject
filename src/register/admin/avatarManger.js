import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateAvatarEntry from "./CreateAvatarEntry";

const SectionManager = () => {
    const [sections, setSections] = useState([]);
    const [newSectionName, setNewSectionName] = useState('');
    const [isEditing, setIsEditing] = useState(null);
    const [editSectionName, setEditSectionName] = useState('');

    const [sectionToAddEntryTo, setSectionToAddEntryTo] = useState(null);


    const done = (status) => {
        if (status) {
            // Do something if the entry was added successfully
        }
        setSectionToAddEntryTo(null);  // Reset the state
    };

    // Load sections when the component mounts
    useEffect(() => {
        loadSections();
    }, []);

    const loadSections = async () => {
        try {
            const response = await axios.get('https://inprove-sport.info/avatar/getSections');
            setSections(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
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

    return (
        <div>
            <h1>Section Manager</h1>

            {/* Add a new section */}
            <div>
                <input
                    type="text"
                    placeholder="New Section Name"
                    value={newSectionName}
                    onChange={(e) => setNewSectionName(e.target.value)}
                />
                <button onClick={addSection}>Add Section</button>
            </div>

            {/* List of existing sections */}
            <ul>
                {sections.map((section) => (
                    <li key={section.id}>
                        {isEditing === section.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editSectionName}
                                    onChange={(e) => setEditSectionName(e.target.value)}
                                />
                                <button onClick={editSection}>Save</button>
                            </div>
                        ) : (
                            <div>
                                {section.name}
                                <button onClick={() => startEditing(section.id, section.name)}>Edit</button>
                                <button onClick={() => setSectionToAddEntryTo(section.id)}>Add Entry</button>
                            </div>
                        )}
                        {sectionToAddEntryTo === section.id && <CreateAvatarEntry sectionID={section.id} done={done} />}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SectionManager;
