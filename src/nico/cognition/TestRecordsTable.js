import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';

export default function TestRecordsTable({ setOnRecordsTable }) {
  let [records, setRecords] = useState([])

  // fetch test records to display in table
  function fetchData() {
    axios.get('http://localhost:3333/test_records')
        .then(response => {
            setRecords(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });
  }

    // fetch data on component init
    useEffect(() => {
        fetchData()
    }, [])

  return (
    <div>
        <div>Test records for current user</div>
        <button onClick={() => {
            setOnRecordsTable(false)
        }}>Start a new test</button>
        <div>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Record ID</TableCell>
                        <TableCell align="right">User ID</TableCell>
                        <TableCell align="right">Number of Points</TableCell>
                        <TableCell align="right">Score</TableCell>
                        <TableCell align="right">Finished</TableCell>
                        <TableCell align="right">Errors Count</TableCell>
                        <TableCell align="right">Tries Count</TableCell>
                        <TableCell align="right">Duration in seconds</TableCell>
                        <TableCell align="right">Participation Date</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {records.map((row) => (
                        <TableRow
                        key={'record' + row.record_id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.record_id}
                        </TableCell>
                        <TableCell align="right">{row.user_id}</TableCell>
                        <TableCell align="right">{row.numberofpoints}</TableCell>
                        <TableCell align="right">{row.score}</TableCell>
                        <TableCell align="right">{row.finished.toString()}</TableCell>
                        <TableCell align="right">{row.errorscount}</TableCell>
                        <TableCell align="right">{row.triescount}</TableCell>
                        <TableCell align="right">{row.test_time_in_secs}</TableCell>
                        <TableCell align="right">{row.participated_on_date}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
        </div>
    </div>
  )
}
