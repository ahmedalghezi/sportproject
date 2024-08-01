import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../chaithra/avatar/avatar.css';

const AccessReminder = () => {
  const [athletes, setAthletes] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const response = await axios.get('https://inprove-sport.info/reg/reminder/hyAlkB/getAthletesData');
        console.log("RESPONSE : ", response);
        console.log("RESPONSE DATA : ", response.data);
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

    fetchAthletes();
  }, []);

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

  const handleSendEmails = async () => {
    setLoading(true);
    setMessage('');
    try {
      await Promise.all(
        selectedIds.map(async (id) => {
          const response = await axios.post('https://inprove-sport.info/reg/reminder/hyAlkB/updateReminderEmail', {
            athlete_id: id,
          });
          console.log("RESPONSE ! : ", response);
          if (!response.data) {
            throw new Error(`Failed to send email to athlete with id ${id}`);
          }
        })
      );
      setMessage('Reminder emails successfully sent to athletes');
      setLoading(false);
      const fetchAthletes = async () => {
        try {
          const response = await axios.get('https://inprove-sport.info/reg/reminder/hyAlkB/getAthletesData');
          console.log("RESPONSE !! : ", response);
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
      fetchAthletes();
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error sending emails:', error);
      setMessage('Error sending reminder emails');
      setLoading(false);
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
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
      <h1 className="title">Send Login Reminder Emails to Athletes</h1>
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
      <br></br>
        <button
        className="upload-btn"
        onClick={handleSendEmails}
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send Login Reminder Emails'}
      </button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AccessReminder;
