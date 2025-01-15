import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SpecialSectionVariables.css";

const API_BASE_URL = "https://inprove-sport.info/avatar";

const SpecialSectionVariables = () => {
    const [entries, setEntries] = useState([]);
    const [form, setForm] = useState({
        variable_name: "",
        operator: "",
        value_condition: "",
        show_text_message: "",
        affected_variables: [],
    });
    const [editingId, setEditingId] = useState(null);
    const [editedEntry, setEditedEntry] = useState(null);

    const fetchEntries = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/special-section-variables`);
            setEntries(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSave = async (id) => {
        try {
            if (id) {
                await axios.put(`${API_BASE_URL}/special-section-variables/${id}`, editedEntry);
                setEditingId(null);
                setEditedEntry(null);
            } else {
                await axios.post(`${API_BASE_URL}/special-section-variables`, form);
                setForm({
                    variable_name: "",
                    operator: "",
                    value_condition: "",
                    show_text_message: "",
                    affected_variables: [],
                });
            }
            fetchEntries();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/special-section-variables/${id}`);
            fetchEntries();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (entry) => {
        setEditingId(entry.id);
        setEditedEntry(entry);
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditedEntry(null);
    };

    const handleChange = (field, value) => {
        if (editingId) {
            setEditedEntry({ ...editedEntry, [field]: value });
        } else {
            setForm({ ...form, [field]: value });
        }
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    return (
        <div className="special-section-variables-container">
            <h1 className="special-section-variables-title">Special Section Variables</h1>

            {/* Add Entry Form */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSave(null);
                }}
                className="special-section-variables-form"
            >
                <h2>Add Entry</h2>
                <input
                    type="text"
                    placeholder="Variable Name"
                    value={form.variable_name}
                    onChange={(e) => handleChange("variable_name", e.target.value)}
                    className="special-section-variables-input"
                />
                <input
                    type="text"
                    placeholder="Operator"
                    value={form.operator}
                    onChange={(e) => handleChange("operator", e.target.value)}
                    className="special-section-variables-input"
                />
                <input
                    type="text"
                    placeholder="Value Condition"
                    value={form.value_condition}
                    onChange={(e) => handleChange("value_condition", e.target.value)}
                    className="special-section-variables-input"
                />
                <textarea
                    placeholder="Show Text Message"
                    value={form.show_text_message}
                    onChange={(e) => handleChange("show_text_message", e.target.value)}
                    className="special-section-variables-textarea"
                />
                <input
                    type="text"
                    placeholder="Affected Variables (comma-separated)"
                    value={form.affected_variables.join(",")}
                    onChange={(e) =>
                        handleChange("affected_variables", e.target.value.split(","))
                    }
                    className="special-section-variables-input"
                />
                <button type="submit" className="special-section-variables-button">
                    Add Entry
                </button>
            </form>

            {/* Entries Table */}
            <table className="special-section-variables-table">
                <thead>
                <tr>
                    <th>Variable Name</th>
                    <th>Operator</th>
                    <th>Value Condition</th>
                    <th>Show Text Message</th>
                    <th>Affected Variables</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {entries.map((entry) =>
                    editingId === entry.id ? (
                        <tr key={entry.id} className="special-section-variables-row">
                            <td>
                                <input
                                    type="text"
                                    value={editedEntry.variable_name}
                                    onChange={(e) => handleChange("variable_name", e.target.value)}
                                    className="special-section-variables-input"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={editedEntry.operator}
                                    onChange={(e) => handleChange("operator", e.target.value)}
                                    className="special-section-variables-input"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={editedEntry.value_condition}
                                    onChange={(e) => handleChange("value_condition", e.target.value)}
                                    className="special-section-variables-input"
                                />
                            </td>
                            <td>
                  <textarea
                      value={editedEntry.show_text_message}
                      onChange={(e) => handleChange("show_text_message", e.target.value)}
                      className="special-section-variables-textarea"
                  />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={editedEntry.affected_variables.join(",")}
                                    onChange={(e) =>
                                        handleChange("affected_variables", e.target.value.split(","))
                                    }
                                    className="special-section-variables-input"
                                />
                            </td>
                            <td className="special-section-variables-actions">
                                <button
                                    onClick={() => handleSave(entry.id)}
                                    className="special-section-variables-save-btn"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="special-section-variables-cancel-btn"
                                >
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    ) : (
                        <tr key={entry.id} className="special-section-variables-row">
                            <td>{entry.variable_name}</td>
                            <td>{entry.operator}</td>
                            <td>{entry.value_condition}</td>
                            <td>{entry.show_text_message}</td>
                            <td>{entry.affected_variables.join(", ")}</td>
                            <td className="special-section-variables-actions">
                                <button
                                    onClick={() => handleEdit(entry)}
                                    className="special-section-variables-edit-btn"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(entry.id)}
                                    className="special-section-variables-delete-btn"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )
                )}
                </tbody>
            </table>
        </div>
    );
};

export default SpecialSectionVariables;
