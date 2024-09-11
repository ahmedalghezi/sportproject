import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../chaithra/avatar/avatar.css';

const AccessReminder = () => {
  const [athletes, setAthletes] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState('');
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    fetchAthletes();
  }, []);

  const fetchAthletes = async () => {
    try {
      const response = await axios.get('https://inprove-sport.info/reg/reminder/hyAlkB/getAthletesData');
      if (response.data) {
        const uniqueAthletes = {};
        response.data.forEach(athlete => {
          if (!uniqueAthletes[athlete.athlete_id] ||
              (athlete.lastLoginDateTime && new Date(uniqueAthletes[athlete.athlete_id].lastLoginDateTime) < new Date(athlete.lastLoginDateTime))) {
            uniqueAthletes[athlete.athlete_id] = athlete;
          }
        });
        setAthletes(Object.values(uniqueAthletes));
      } else {
        console.error('Failed to retrieve athlete data:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching athletes:', error);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds(athletes.map(athlete => athlete.athlete_id));
  };

  const handleDeselectAll = () => {
    setSelectedIds([]);
  };

  const sendEmail = async (id) => {
    try {
      const response = await axios.post('https://inprove-sport.info/reg/reminder/hyAlkB/updateReminderEmail', {
        athlete_id: id,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to send email to athlete with id ${id}`);
    }
  };

  const handleSendEmails = async () => {
    setLoading(true);
    let remainingCount = selectedIds.length;
    setMessage(`Sending emails to ${remainingCount} athletes. This will take approximately ${remainingCount * 0.5} minutes.`);
    setProgress('');
    setProgressPercentage(0);
    let progressMessage = '';

    for (let i = 0; i < selectedIds.length; i++) {
      const id = selectedIds[i];
      try {
        await sendEmail(id);
        remainingCount--;
        setMessage(`Sending emails to ${remainingCount} athletes. This will take approximately ${remainingCount * 0.5} minutes.`);
        progressMessage += `Email sent to athlete with ID ${id}\n`;
        setProgress(progressMessage);
        setProgressPercentage(((i + 1) / selectedIds.length) * 100);

        // Wait for a random time between 5 to 12 seconds
        const randomDelay = Math.floor(Math.random() * (12000 - 5000 + 1)) + 5000;
        await new Promise(resolve => setTimeout(resolve, randomDelay));
      } catch (error) {
        progressMessage += `Error sending email to athlete with ID ${id}\n`;
        setProgress(progressMessage);
      }
    }

    setMessage('Reminder emails process completed');
    setLoading(false);

    // Fetch the updated athletes data after sending emails
    await fetchAthletes();

    setTimeout(() => {
      setMessage('');
      setProgress('');
      setProgressPercentage(0);
    }, 5000);
  };

  const formatDate = (datetime) => {
    if (!datetime) return 'N/A';
    return datetime.split('T')[0]; // Extract the date portion only
  };

  const AthleteRow = ({ athlete }) => (
    <tr key={athlete.athlete_id}>
      <td className="cell">
        <input
          type="checkbox"
          checked={selectedIds.includes(athlete.athlete_id)}
          onChange={() => handleCheckboxChange(athlete.athlete_id)}
        />
      </td>
      <td className="cell">{athlete.name}</td>
      <td className="cell">{formatDate(athlete.lastLoginDateTime)}</td>
      <td className="cell">{formatDate(athlete.lastReminderSentDate)}</td>
      <td className="cell">{athlete.remindersSent ?? 'N/A'}</td>
      <td className="cell">{athlete.discipline}</td>
    </tr>
  );

  return (
    <div>
      <h1 className="title">List of athletes who have files added after their last access</h1>
      <br />
      <div>
        <button className='upload-btn' onClick={handleSelectAll}>Select All</button>
        <button className='upload-btn' onClick={handleDeselectAll}>Deselect All</button>
      </div>
      <br />
      <div className="tableContainer">
        <table className="table">
          <thead>
            <tr>
              <th className="cell">Select</th>
              <th className="cell">Name</th>
              <th className="cell">Last Login</th>
              <th className="cell">Last Reminder Sent</th>
              <th className="cell">Reminders Sent</th>
              <th className="cell">Discipline</th>
            </tr>
          </thead>
          <tbody>
            {athletes.map((athlete) => (
              <AthleteRow key={athlete.athlete_id} athlete={athlete} />
            ))}
          </tbody>
        </table>
      </div>
      <br/>
      {message && message.trim() && <p className="message">{message}</p>}
      {progress && progress.trim() && <pre className="progress-msg">{progress}</pre>}
      {progressPercentage > 0 && (
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progressPercentage}%` }} />
        </div>
      )}

      <br/>
      <button
        className="upload-btn"
        onClick={handleSendEmails}
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send Login Reminder Emails'}
      </button>

    </div>
  );
};

export default AccessReminder;
