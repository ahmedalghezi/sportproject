import React from 'react';

const TableComponentInt = () => {

    const createIntervention = () => {
        console.log('Creating intervention for Hannah Ha.');
    }

    const reviewIntervention = () => {
        console.log('Reviewing intervention for Hannah Ha.');
    }

    return (
        <table border="1" style={{ borderCollapse: 'collapse' }}>
            <thead>
            <tr>
                <th style={{ padding: '10px' }}>Athlete Name</th>
                <th style={{ padding: '10px' }}>Test Name</th>
                <th style={{ padding: '10px' }}>Test Value</th>
                <th style={{ padding: '10px' }}>Red Threshold</th>
                <th style={{ padding: '10px' }}>Squad Name</th>
                <th style={{ padding: '10px' }}>Intervention</th>
                <th style={{ padding: '10px' }}>Action</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td style={{ padding: '10px' }}>Hannah Ha</td>
                <td style={{ padding: '10px' }}>Y-Balance</td>
                <td style={{ padding: '10px' }}>xx</td>
                <td style={{ padding: '10px' }}>xx</td>
                <td style={{ padding: '10px' }}>xx</td>
                <td style={{ padding: '10px' }}>
                    <button onClick={createIntervention}>Create</button>
                </td>
                <td style={{ padding: '10px' }}>
                    <button onClick={reviewIntervention}>Review</button>
                </td>
            </tr>
            </tbody>
        </table>
    );
}

export default TableComponentInt;
