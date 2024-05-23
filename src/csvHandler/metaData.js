import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCSVData from "../DB/postCSV";
import PostSignup from "../DB/postSignup";
import {Alert} from "@mui/material";

function MeasurementComponent(props) {
    const [tests, setTests] = useState([]);
    const [descriptions, setDescriptions] = useState([]);

    const [spaces, setSpaces] = useState([]);
    const [space, setSpace] = useState("");

    const [disciplinesList, setDisciplinesList] = useState([]);
    const [discipline, setDiscipline] = useState("");

    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");


    function getSpaces() {
        PostCSVData.getSpaces()
            .then(response => {
                setSpaces(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    }


    const  handleDispSele = (event) =>{
        event.preventDefault();
        setDiscipline(event.target.value);
        setSuccess(false);
        setError(false);
    }

    const getDisplines = () => {
        PostSignup.getAllDisciplines().then(response => {
            if(response.data.res === "error") {
                showError("Error getting disciplines from server");
                return;
            }
            else if(response.data.res && response.data.res.length > 0){
                setDisciplinesList(response.data.res);
                setDiscipline(response.data.res[0]);
            }

        }).catch(e => {
            console.log(e);
            showError("some error has happened");
        });
    }



    const showError = (msg) =>{
        setError(true);
        setErrorMsg(msg);
    }


    const showSuccess = (msg) =>{
        setSuccess(true);
        setSuccessMsg(msg);
    }



    const handleSpace =  (event) =>{
        event.preventDefault();
        setSpace(event.target.value);
        setSuccess(false);
        setError(false);
    }

    async function fetchTests() {
        if(discipline === "" || space === ""){
            showError("Please select space and discipline");
            return;
        }
        setTests([]);
        setDescriptions([]);
        try {
            const response = await axios.post(
                "https://inprove-sport.info/csv/getMetadata",
                {
                    discipline: discipline,
                    space: space,
                }
            );
            if (response.data.res === "ok") {
                if(response.data.data.length ==0){
                    showSuccess("No more tests for you to fill in this space and discipline. Please try to select another space or discipline");
                    return;
                }
                setTests(response.data.data);
                setDescriptions(new Array(response.data.data.length).fill(""));
            } else {
                console.error("Error fetching tests: ", response.data.res);
            }
        } catch (error) {
            console.error("Error fetching tests: ", error);
        }
    }
    // Fetch tests from the server on component mount
    useEffect(() => {
        getDisplines();
        getSpaces();
    }, [props.discipline, props.space]);


    function checkTestDesc() {
        for(let i = 0 ; i < descriptions.length ; i++){
            if(!descriptions[i]  || descriptions[i] === "" )
                return false;
        }
        return true;
    }
    // Handle form submission
    async function handleSubmit(event) {
        event.preventDefault();
        if(!descriptions || descriptions.length == 0){
            return;
        }
        if(!checkTestDesc()){
            showError("Please fill all fields");
            return;
        }
        try {
            const response = await axios.post(
                "https://inprove-sport.info/csv/setMetadata",
                {
                    tests: tests.map((test, index) => ({
                        testId: test.testid,
                        desc: descriptions[index],
                    })),
                }
            );
            if (response.data.res === "ok") {
                showSuccess("Descriptions sent successfully");
                // Reload tests from the server
                fetchTests();
            } else {
                console.error("Error setting descriptions: ", response.data.res);
            }
        } catch (error) {
            console.error("Error setting descriptions: ", error);
        }
    }

    /*if (tests.length === 0) {
        return <div>No tests received from database</div>;
    }*/

    return (


        <div>
            <p>Here you may upload the metadata or the description of each test. Please select the space and discipline then click on  "Get Tests".
                When you fill the description, click submit to send them to the database. More tests (if any) are loaded next automatically for you. </p>
            <table>
                <tr>
                    <td width="20px">
                    </td>
                    <td>
                        <div className="form-group">
                            <label>Data Space</label>
                            <br />
                            <select onChange={handleSpace} name="space">
                                {spaces.map((space, index) => (
                                    <option key={index} value={space.value}>{space.label}</option>
                                ))}
                            </select>
                        </div>

                    </td>
                    <td>     </td>
                    <td>
                        <div className="form-group">
                            <label>Discipline</label>
                            <br></br>
                            <select onChange={handleDispSele}  name="discipline">
                                {disciplinesList.map((item) => (
                                    <option key={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </td>

                    <td width={20}></td>
                    <td>


                    </td>

                    <td width={20}></td>



                    <td>
                        <br></br>
                        <button
                            className="btn btn-primary btn-block paddingBtn"
                            onClick={(e) => {
                               fetchTests();
                            }}
                        >
                            Get Tests
                        </button>

                    </td>




                </tr>
            </table>
            <Alert severity="success" hidden={!success}>{successMsg}</Alert>
            <Alert severity="error" hidden={!error}>{errorMsg}</Alert>


        <form onSubmit={handleSubmit}>
            {tests.map((test, index) => (
                <div key={test.testid}>
                    <label>
                        {test.testname}
                    </label>
                        <input
                            className="form-control"
                            type="text"
                            value={descriptions[index]}
                            onChange={(event) => {
                                const newDescriptions = [...descriptions];
                                newDescriptions[index] = event.target.value;
                                setDescriptions(newDescriptions);
                            }}
                        />

                </div>
            ))}
            <button type="submit">Submit</button>
        </form>

        </div>
    );
}
export default MeasurementComponent;
