import React, { useState } from 'react';
import axios from 'axios';

function DeleteAccountForm() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [userCode, setUserCode] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitted(false);
        setError('');

        try {
            // Replace with your API endpoint
            const response = await axios.post('https://inprove-sport.info/reg/dfytPerMksBcY/requestDelete', { userCode });
            if (response.status === 200) {
                setSubmitted(true);
            } else {
                setError('An error occurred. Please try again.');
            }
        } catch (err) {
            setError(err.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h2>Delete Account</h2>
            <form onSubmit={handleSubmit}>
                <p>Please provide your user code (You find it in your profile in the android application) </p>
                <label htmlFor="code">User code:</label>
                <input
                    type="text"
                    id="code"
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    required
                />
                <button type="submit">Submit Request</button>
            </form>
            {submitted && <p>Your request has been submitted.</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default DeleteAccountForm;
