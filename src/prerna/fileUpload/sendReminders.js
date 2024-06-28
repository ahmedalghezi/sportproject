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
    {
      id: 1,
      name: 'Alice',
      lastLogin: '2024-06-01 10:00:00',
      lastReminderSent: '2024-06-10',
      remindersSent: 3,
      discipline: 'Football'
    },
    {
      id: 2,
      name: 'Bob',
      lastLogin: '2024-06-02 11:30:00',
      lastReminderSent: '2024-06-11',
      remindersSent: 2,
      discipline: 'Volleyball'
    },
    {
      id: 3,
      name: 'Charlie',
      lastLogin: '2024-06-03 12:45:00',
      lastReminderSent: '2024-06-12',
      remindersSent: 1,
      discipline: 'Basketball'
    }
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
      <h1 style = {{textAlign: 'center'}}>Send Login Reminder Emails to Athletes</h1>
      <br></br>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Select</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Last Login</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Last Reminder Sent</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Reminders Sent</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Discipline</th>
          </tr>
        </thead>
        <tbody>
          {athletes.map((athlete) => (
            <tr key={athlete.id}>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(athlete.id)}
                  onChange={() => handleCheckboxChange(athlete.id)}
                />
              </td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{athlete.name}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{athlete.lastLogin}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{athlete.lastReminderSent}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{athlete.remindersSent}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{athlete.discipline}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="upload-btn"
        onClick={handleSendEmails}
        disabled={loading}
        style={{ marginTop: '20px' }}
      >
        {loading ? 'Sending...' : 'Send Login Reminder Emails'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AccessReminder;



//   return (
//     <div>
//       <h1>Send Login Reminder Emails to Athletes</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Select</th>
//             <th>Name</th>
//             <th>Last Login</th>
//             <th>Last Reminder Sent</th>
//             <th>Reminders Sent</th>
//             <th>Discipline</th>
//           </tr>
//         </thead>
//         <tbody>
//           {athletes.map((athlete) => (
//             <tr key={athlete.id}>
//               <td>
//                 <input
//                   type="checkbox"
//                   checked={selectedIds.includes(athlete.id)}
//                   onChange={() => handleCheckboxChange(athlete.id)}
//                 />
//               </td>
//               <td>{athlete.name}</td>
//               <td>{athlete.lastLogin}</td>
//               <td>{athlete.lastReminderSent}</td>
//               <td>{athlete.remindersSent}</td>
//               <td>{athlete.discipline}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <button
//         className="upload-btn"
//         onClick={handleSendEmails}
//         disabled={loading}
//       >
//         {loading ? 'Sending...' : 'Send Login Reminder Emails'}
//       </button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default AccessReminder;

// const AccessReminder = () => {
//   const [athletes, setAthletes] = useState([]);
//   const [selectedIds, setSelectedIds] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');


//   const mockData = [
//     {
//       id: 1,
//       name: 'Alice',
//       lastLogin: '2024-06-01 10:00:00',
//       lastReminderSent: '2024-06-10',
//       remindersSent: 3,
//       discipline: 'Football'
//     },
//     {
//       id: 2,
//       name: 'Bob',
//       lastLogin: '2024-06-02 11:30:00',
//       lastReminderSent: '2024-06-11',
//       remindersSent: 2,
//       discipline: 'Volleyball'
//     },
//     {
//       id: 3,
//       name: 'Charlie',
//       lastLogin: '2024-06-03 12:45:00',
//       lastReminderSent: '2024-06-12',
//       remindersSent: 1,
//       discipline: 'Basketball'
//     }
//   ];

//   useEffect(() => {
//     // Mock fetching names and IDs from the backend
//     const fetchAthletes = async () => {
//       try {
//         // Simulate an API call with a timeout
//         await new Promise((resolve) => setTimeout(resolve, 500));
//         setAthletes(mockData);
//         setSelectedIds(mockData.map(athlete => athlete.id));
//       } catch (error) {
//         console.error('Error fetching athletes:', error);
//       }
//     };

//     fetchAthletes();
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
//       // Mock sending emails with a timeout
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       setMessage('Reminder emails successfully sent to athletes');
//       setLoading(false);
//       // Reload the names and IDs
//       setAthletes(mockData);
//       setSelectedIds(mockData.map(athlete => athlete.id));
//       // Remove the message after 3 seconds
//       setTimeout(() => {
//         setMessage('');
//       }, 3000);
//     } catch (error) {
//       console.error('Error sending emails:', error);
//       setMessage('Error sending reminder emails');
//       setLoading(false);
//       // Remove the error message after 3 seconds
//       setTimeout(() => {
//         setMessage('');
//       }, 3000);
//     }
//   };

//   return (
//     <div>
//       <h1>Send Login Reminder Emails to Athletes</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Select</th>
//             <th>Name</th>
//             <th>Last Login</th>
//             <th>Last Reminder Sent</th>
//             <th>Reminders Sent</th>
//             <th>Discipline</th>
//           </tr>
//         </thead>
//         <tbody>
//           {athletes.map((athlete) => (
//             <tr key={athlete.id}>
//               <td>
//                 <input
//                   type="checkbox"
//                   checked={selectedIds.includes(athlete.id)}
//                   onChange={() => handleCheckboxChange(athlete.id)}
//                 />
//               </td>
//               <td>{athlete.name}</td>
//               <td>{athlete.lastLogin}</td>
//               <td>{athlete.lastReminderSent}</td>
//               <td>{athlete.remindersSent}</td>
//               <td>{athlete.discipline}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <button
//         className="upload-btn"
//         onClick={handleSendEmails}
//         disabled={loading}
//       >
//         {loading ? 'Sending...' : 'Send Login Reminder Emails'}
//       </button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default AccessReminder;











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
