import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../chaithra/avatar/avatar.css';

const AccessReminder = () => {
  const [athletes, setAthletes] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Mock data for prototyping
  const mockData = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ];

  useEffect(() => {
    // Mock fetching names and IDs from the backend
    const fetchAthletes = async () => {
      try {
        // Simulate an API call with a timeout
        await new Promise((resolve) => setTimeout(resolve, 500));
        setAthletes(mockData);
        setSelectedIds(mockData.map(athlete => athlete.id));
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

  const handleSendEmails = async () => {
    setLoading(true);
    setMessage('');
    try {
      // Mock sending emails with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage('Reminder emails successfully sent to athletes');
      setLoading(false);
      // Reload the names and IDs
      setAthletes(mockData);
      setSelectedIds(mockData.map(athlete => athlete.id));
      // Remove the message after 3 seconds
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error sending emails:', error);
      setMessage('Error sending reminder emails');
      setLoading(false);
      // Remove the error message after 3 seconds
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };

  return (
    <div>
      <h1>Send Login Reminder Emails to Athletes</h1>
      <ul>
        {athletes.map((athlete) => (
          <li key={athlete.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedIds.includes(athlete.id)}
                onChange={() => handleCheckboxChange(athlete.id)}
              />
              {athlete.name}
            </label>
          </li>
        ))}
      </ul>
      <button
        onClick={handleSendEmails}
        className="upload-btn"
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send Login Reminder Emails'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AccessReminder;











// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AccessReminder = () => {
//   const [names, setNames] = useState([]);
//   const [selectedIds, setSelectedIds] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const mockData = [
//     { id: 1, name: 'Alice' },
//     { id: 2, name: 'Bob' },
//     { id: 3, name: 'Charlie' },
//   ];

//   useEffect(() => {
//     const fetchNames = async () => {
//       try {
//         const response = await axios.get('/api/names');
//         setNames(response.data);
//         setSelectedIds(response.data.map(name => name.id));
//       } catch (error) {
//         console.error('Error fetching names:', error);
//       }
//     };

//     fetchNames();
//   }, []);

//   const handleCheckboxChange = (id) => {
//     setSelectedIds((prevSelectedIds) =>
//       prevSelectedIds.includes(id)
//         ? prevSelectedIds.filter((selectedId) => selectedId !== id)
//         : [...prevSelectedIds, id]
//     );
//   };

//   const handleSendEmails = async () => {
//     setLoading(true);
//     setMessage('');
//     try {
//       const response = await axios.post('/api/send-reminders', { ids: selectedIds });
//       if (response.data === 'ok') {
//         setMessage('Email successfully sent');
//         setLoading(false);
//         // Reload the names and IDs
//         const newResponse = await axios.get('/api/names');
//         setNames(newResponse.data);
//         setSelectedIds(newResponse.data.map(name => name.id));
//       } else {
//         setMessage('Error sending emails');
//         setLoading(false);
//       }
//     } catch (error) {
//       console.error('Error sending emails:', error);
//       setMessage('Error sending emails');
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Send Access Reminder Emails</h1>
//       <ul>
//         {names.map((name) => (
//           <li key={name.id}>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={selectedIds.includes(name.id)}
//                 onChange={() => handleCheckboxChange(name.id)}
//               />
//               {name.name}
//             </label>
//           </li>
//         ))}
//       </ul>
//       <button
//         onClick={handleSendEmails}
//         disabled={loading}
//       >
//         {loading ? 'Sending...' : 'Send Access Reminder Emails'}
//       </button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default AccessReminder;
