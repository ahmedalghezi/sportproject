/*
By Nicolas Schulz
 */
import React, { useState, useEffect } from 'react';
import PostCSVData from "../../DB/postCSV";
import PostSignup from '../../DB/postSignup';


  const MetaUpload = () => {
    const [tests, setTests] = useState([]);
    const [fields, setFields] = useState({});
    const [sendRequest, setSendRequest] = useState(true);
    const [discipline, setDiscipline] = useState("");
    const [space, setSpace] = useState("");
    const [spaces, setSpaces] = useState([]);
    const [disciplinesList, setDisciplinesList] = useState([]);

    const testdata = [
        { testId: 1, testName: "Math Test" },
        { testId: 2, testName: "English Test" },
        { testId: 3, testName: "Science Test" },
        { testId: 4, testName: "History Test" },
        { testId: 5, testName: "Geography Test" }
    ];
  
    useEffect(() => {
      if(sendRequest){
        fetchData();
        setSendRequest(false);
        getDisplines();
        getSpaces();
      }
    }, [sendRequest]);

    const fetchData = async () => {
      try {
        const response = await fetch(PostCSVData.getMetadata({discipline:discipline,space:space}));
        const data = await response.json();
        setTests(data);
      } catch (error) {
        alert("something went wrong")
      }
    };

    const getDisplines = () => {
      PostSignup.getAllDisciplines().then(response => {
          if(response.data.res === "error") {
              alert("Error getting disciplines from server");
              return;
          }
          else if(response.data.res && response.data.res.length > 0){
              setDisciplinesList(response.data.res);
              setDiscipline(response.data.res[0]);
          }

      }).catch(e => {
          console.log(e);
          alert("some error has happened");
      });
    }

    function getSpaces() {
      PostCSVData.getSpaces()
          .then(response => {
              setSpaces(response.data.data);
          })
          .catch(error => {
              console.log(error);
          });
    }

  
    const handleChange = (event, testId) => {
      setFields({ ...fields, [testId]: event.target.value });
    };
  
    const handleSubmit = event => {
      event.preventDefault();
      // send fields data to the backend along with the test ID
      PostCSVData.setMetadata(fields).then(response => {
        if (response.data.res === "error")
            alert("Es ist ein Fehler aufgetreten.");
        if(response.data.res === "no")
            window.location.href = window.location.origin+"/reg/sign-in";
        if(response.data.res === "ok"){
            alert("Meta Daten wurden hochgeladen.")
            setSendRequest(true);
            //reset page and fields
            setFields({});
        }
      }).catch(e => {
          console.log(e);
          alert("Es ist ein Fehler aufgetreten.");
      });

    };
  

    const handleSpace =  (event) =>{
      event.preventDefault();
      setSpace(event.target.value);
      setSendRequest(true);
    }

  
    const  handleDispSele = (event) =>{
      event.preventDefault();
      setDiscipline(event.target.value);
      setSendRequest(true);
    }

  
    return (
      <div>
        <h3>Meta data upload</h3>
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
        <form onSubmit={handleSubmit}>
          {tests.map(test => (
              <div key={test.testId}>
                <span  style= {{...{float: 'left'},...{width: "80px"},...{marginLeft: "230px"}}}>{test.testName}</span>
                <textarea
                  style= {{...{height: "80px"},...{marginBottom: "20px"},...{width: "350px"},...{marginLeft: "100px"}}}
                  onChange={event => handleChange(event, test.testId)}
                />
              </div>
          ))}
          <button style= {{...{float: 'right'}}} type="submit">Submit</button>
        </form>
      </div>
    );
  };
  
  export default MetaUpload;
  