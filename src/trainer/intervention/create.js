import React, { useState } from "react";

const CreateIntervention = () => {
    const [formData, setFormData] = useState({
        athleteName: "some name",
        athleteID: "411",
        testName: "Y-balance",
        interventionType: "",
        interventionDetails: "",
        date: "",
        expectedAction: "",
        dateOfFeedback: "",
        remindAthlete: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckBoxChange = (e) => {
        const { name, checked } = e.target;
        setFormData({
            ...formData,
            [name]: checked,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data submitted:", formData);
        // Add code to handle form submission, such as sending data to an API
    };

    return (
        <div >
            <h1>Create Intervention</h1>
            <form onSubmit={handleSubmit}>
                <p>Athlete Name: {formData.athleteName}</p>
                <p>Athlete ID: {formData.athleteID}</p>
                <p>Test Name: {formData.testName}</p>
                <div style={{ marginBottom: "1px" }}>
                    <label>
                        Intervention Type:
                        <select
                            name="interventionType"
                            value={formData.interventionType}
                            onChange={handleChange}
                            style={{ marginLeft: "10px" }}
                        >
                            <option value="">Select</option>
                            <option value="type1">Type 1</option>
                            <option value="type2">Type 2</option>
                        </select>
                    </label>
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label>
                        Intervention Details:
                        <input
                            type="text"
                            name="interventionDetails"
                            value={formData.interventionDetails}
                            onChange={handleChange}
                            style={{ marginLeft: "10px" }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label>
                        Date:
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            style={{ marginLeft: "10px" }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label>
                        Expected Action:
                        <input
                            type="text"
                            name="expectedAction"
                            value={formData.expectedAction}
                            onChange={handleChange}
                            style={{ marginLeft: "10px" }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label>
                        Date of Feedback:
                        <input
                            type="date"
                            name="dateOfFeedback"
                            value={formData.dateOfFeedback}
                            onChange={handleChange}
                            style={{ marginLeft: "10px" }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <input
                        type="checkbox"
                        name="remindAthlete"
                        checked={formData.remindAthlete}
                        onChange={handleCheckBoxChange}
                        style={{ marginRight: "10px" }}
                    />
                    <label>Remind the athlete to send his feedback</label>
                </div>
                <button className="btn btn-primary btn-block" type="submit" style={{ marginRight: "15px" }}>Create</button>
                <button className="btn btn-primary btn-block" type="button" onClick={() => console.log("Notify athlete now")}>Notify Athlete Now</button>
            </form>
        </div>
    );
};

export default CreateIntervention;
