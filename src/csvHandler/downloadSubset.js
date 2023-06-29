/*
Copy of register/trainer/aymen/TestsView.js with additional subset functionalities
by Vanessa Meyer
*/

//TODO: getFeaturesData(param) to show subset data in table
//Note: click 'Show Data' after feature selection to see param-structure in console.

import React from "react";
import CustomTable from "../utli/components/CustomTable";
import postCSV from "../DB/postCSV";
import PostSignup from "../DB/postSignup";
import { saveAs } from 'file-saver';

import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { germanDatePresentation } from "../utli/dataConversion";

import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

import Paper from "@mui/material/Paper";

import axios from "axios";
import PostCSVData from "../DB/postCSV";

const defaultDates = {
    from: new Date(2020, 0, 1),
    to: new Date(2023, 0, 1),
};

// components
const getFilterFunction = (
    fromDate,
    toDate,
    space,
    discipline,
    allSpaces,
    allDisciplines,
    setSpace,
    setDiscipline,
    setFromDate,
    setToDate
) => {
    return (
        <div>
            <button
                className="btn btn-outline-primary btn-block"
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "https://inprove-sport.info/csv/history";
                }}
            >
                Move to "download my data" page
            </button>
            <br/><br/>
            <h5>Here you may download subset of the in:prove data, across the available spaces</h5>
            <h5 style={{ color: 'red' }}>Important: synchronize the data in Metabase before downloading!</h5>
            <div style={{ marginTop: "18px", padding: 0 }} hidden={true}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3} style={{ width: "33%", display: "inline-block" }}>
                        <DesktopDatePicker
                            label="From Date"
                            value={fromDate}
                            onChange={setFromDate}
                            style={{ width: "240px" }}
                            renderInput={(params) => (
                                <TextField
                                    style={{ width: "240px" }}
                                    size="small"
                                    {...params}
                                />
                            )}
                        />
                    </Stack>
                    <Stack spacing={3} style={{ width: "33%", display: "inline-block" }}>
                        <DesktopDatePicker
                            label="To Date"
                            value={toDate}
                            onChange={setToDate}
                            renderInput={(params) => (
                                <TextField
                                    style={{ width: "240px" }}
                                    size="small"
                                    {...params}
                                />
                            )}
                        />
                    </Stack>
                </LocalizationProvider>
            </div>
            <div style={{ padding: "8px 0" }}>Available spaces:</div>
            <div style={{ padding: 0 }}>
                <FormControl
                    size="small"
                    style={{ width: "33%", display: "inline-block" }}
                >
                    <InputLabel id="demo-select-small">Discipline</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={discipline}
                        label={"Discipline"}
                        onChange={setDiscipline}
                        style={{ width: "240px" }}
                        disabled={true}
                    >
                        <MenuItem value={false}>No selection.</MenuItem>
                        {allDisciplines &&
                            allDisciplines.map((el, idx) => {
                                return (
                                    <MenuItem value={el} key={"key-select-discipline-" + idx}>
                                        {el}
                                    </MenuItem>
                                );
                            })}
                    </Select>
                </FormControl>
                <FormControl
                    size="small"
                    style={{ width: "33%", display: "inline-block" }}
                >
                    <InputLabel id="demo-select-small">Space</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={space}
                        label={"Space"}
                        onChange={setSpace}
                        style={{ width: "240px" }}
                    >
                        <MenuItem value={false}>No selection.</MenuItem>
                        {allSpaces &&
                            allSpaces.map((el, idx) => {
                                return (
                                    <MenuItem value={el} key={"key-select-" + idx}>
                                        {el}
                                    </MenuItem>
                                );
                            })}
                    </Select>
                </FormControl>
            </div>
        </div>
    );
};


export  function DownloadSubset() {
    const [subset, setSubset] = React.useState([]);
    const [space, setSpace] = React.useState(false);
    const [discipline, setDiscipline] = React.useState(false);
    const [fromDate, setFromDate] = React.useState(defaultDates["from"]);
    const [toDate, setToDate] = React.useState(defaultDates["to"]);
    const [allDisciplines, setAllDisciplines] = React.useState([]);
    const [allSpaces, setAllSpaces] = React.useState([]);
    const [isFirstRender, setIsFirstRender] = React.useState(true);
    const [selecFeatsBySpace, setSelecFeatsBySpace] = React.useState([]);

    const [isShowDataClicked, setIsShowDataClicked] = React.useState(false);
    const [selectedValue, setFillingOption] = React.useState('keepMissing');

    //transferlist
    //const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);

    const [checkedLeft, setCheckedLeft] = React.useState([]);
    const [checkedRight, setCheckedRight] = React.useState([]);

    const [count,setCount] = React.useState(0);
    const [selectedFormat, setSelectedFormat] = React.useState('semicolonSeparated');

    const [selectedMeasurment,setSelectedMeasurment] = React.useState("1");


    const clearCheckedRight = () => {
        setCheckedRight([]);
    }

    const clearCheckedLeft = () => {
        setCheckedLeft([]);
    }



    const handleAllRight = () => {
        setRight(left);
    };

    const handleCheckedRight = (newCheckedRight) => {
        setCheckedRight(newCheckedRight);
    };

    const moveCheckedLeft = () => {
        const t_checkedRight = checkedRight;
        setRight(removeDuplicates(t_checkedRight,right));
        clearCheckedRight();
    }

    const moveCheckedRight = () => {
        setRight(mergeWithoutDuplicates(checkedLeft,right));
        clearCheckedLeft();
    }

    function removeDuplicates(arrReadID,arrWirte) {
        const IDset = new Set(arrReadID.map(obj => obj));
        return arrWirte.filter(obj => !IDset.has(obj.testid));
    }

    function mergeWithoutDuplicates(arrCheckedID, arrR) {
        const checkedRightIds = new Set(arrR.map(obj => obj.testid));
        arrCheckedID.forEach(objID => {
            if (!checkedRightIds.has(objID)) {
                let fullObj;
                left.forEach(obj => {if(obj.testid === objID) fullObj = obj});
                arrR.push(fullObj);
            }

        });
        return arrR;
    }


    const handleAllLeft = () => {
        setRight([]);
    };



    const handleDownload = async () => {
        let testIds = right.map(item => item.testid);
        try {
            let obj = { test_ids: testIds, filling:selectedValue};

            const response = await axios.post('https://inprove-sport.info/csv/downloadSubsetCsv', obj);
            let result = response.data.data;
            let restOfRows = result.slice(1);
            restOfRows.sort(function(a, b) {
                return a[0] - b[0];
            });

            if(selectedValue === "selectCertainPoint"){
                restOfRows = sliceRes(restOfRows, selectedMeasurment);
            }
            result = [result[0]].concat(restOfRows);



            exportToCSV(result);

        } catch (error) {
            console.error(error);
            alert("an error has happened, code subD280");
        }
    };



    const sliceRes = (result, selectedMeasurment) => {
        result = result.filter(function(value, index, self) {
            // Only keep the item if the previous item's first element is not the same
            return index === 0 || value[0] !== self[index - 1][0];
        });
        return result;
    };


    function exportToCSV(data, fileName = 'export.csv') {
        let sepr = ";";
        if(selectedFormat === "commaSeparated")
            sepr = ',';
        else
            data = data.map(row => row.map(item => typeof item === 'number' ? item.toString().replace('.', ',') : item));

        const csvContent = data.map(row => row.join(sepr)).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, fileName);
    }

    function convertDataToCSV(data) {
        // Extract unique test names from data
        const testNames = Array.from(
            new Set(
                data
                    .flatMap(({ tests }) => tests.map(({ test_name }) => test_name))
            )
        );

        // Generate CSV header
        const csvHeader = ['athlete', ...testNames.flatMap(test => [`${test} value`, `${test} time`])].join(',') + '\n';

        // Generate CSV rows
        const csvRows = data.map(({ athlete, tests }) => {
            const athleteTests = tests.reduce((acc, { test_name, test_value, time }) => {
                const datePart = time.split('T')[0]; // Keep only the date part
                acc[test_name] = { value: test_value, time: datePart };
                return acc;
            }, {});

            const rowValues = testNames.flatMap(test => [
                athleteTests[test]?.value || '',
                athleteTests[test]?.time || ''
            ]);

            return [athlete, ...rowValues].join(',');
        }).join('\n');

        return csvHeader + csvRows;
    }




    // get all disciplines for drop down
    const getDisciplines = () => {
        PostSignup.getAllDisciplines()
            .then((response) => {
                if (response.data.res === "error") {
                    const arr = ["connection error"];

                    setAllDisciplines(arr);
                    return;
                } else {
                    setAllDisciplines(response.data.res);
                }
            })
            .catch((e) => {
                console.log(e);
                alert("Es ist ein Fehler aufgetreten.");
            });
    };
    const getSpaces = () => {

        PostCSVData.getSpaces()
            .then(response => {
                let a = [];
                for(let i = 0 ; i < response.data.data.length ; i ++){
                    a.push(response.data.data[i].value)
                }
                setAllSpaces(a);
            })
            .catch(error => {
                console.log(error);
            });
    };




    const handleToggleLeft = (value) => () => {
        setCount(count+1);
        const currentIndex = checkedLeft.indexOf(value.testid);
        if(currentIndex === -1){
            const arr = checkedLeft;
            arr.push(value.testid);
            setCheckedLeft(arr);
            return;
        }else{
            setCheckedLeft(checkedLeft.filter(item => item !== value.testid));
            return;
        }
    };


    const handleToggleRight = (value) => () => {
        setCount(count-1);
        const currentIndex = checkedRight.indexOf(value.testid);
        if(currentIndex === -1){
            const arr = checkedRight;
            arr.push(value.testid);
            setCheckedRight(arr);
            return;
        }else{
            setCheckedRight(checkedRight.filter(item => item !== value.testid));
            return;
        }
    };

    const customListLeft = (items) => (
        <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value.testid}-label`;

                    return (
                        <ListItem
                            key={value}
                            role="listitem"
                            button
                            onClick = {handleToggleLeft(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checkedLeft.indexOf(value.testid) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        "aria-labelledby": labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${value.testname}`} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    );




    const customListRight = (items) => (
        <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value.testid}-label`;

                    return (
                        <ListItem
                            key={value}
                            role="listitem"
                            button
                            onClick = {handleToggleRight(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checkedRight.indexOf(value.testid) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        "aria-labelledby": labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${value.testname}`} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    );

    // event handlers

    // Apply button after Selection of Discipline and Space to create left list of transferlist with filtered data
    const onApply = () => {
        setLeft([]);
        postCSV
            .getFeatures({"discipline" : discipline, "space" : space})
            .then((response) => {
                if (response.data.res === "error") {
                    alert("Es ist ein Fehler aufgetreten.");
                }
                if (response.data.res === "no") {
                    alert("Bitte wähle eine Disziplin und Space.");
                }
                if (response.data.res === "ok") {
                    if (discipline || space) {
                        let data = response["data"];
                        setLeft(data.data);
                    } else {
                        alert("Select discipline or space.");
                    }
                }
            })
            .catch((e) => {
                console.log(e);
                alert("Es ist ein Fehler aufgetreten.");
            });
    };


    function processFeatureData(testData) {
        const testNames = testData.map(test => test.testname);
        const testIds = testData.reduce((obj, test) => {
            obj[test.testname] = test.testid;
            return obj;
        }, {});
        //return [testNames, testIds];
    }


    //show data of selected features (right list of transferlist) to use for subset table
    const showData = () => {
    };

    const onReset = () => {
        setDiscipline(false);
        setSpace(false);
        setFromDate(defaultDates["from"]);
        setToDate(defaultDates["to"]);
        setSelecFeatsBySpace([]);
        setLeft([]);
        setRight([]);
        setSubset([]);
        setIsShowDataClicked(false);
    };


    const onDatesChange = () => {
        const from = germanDatePresentation(fromDate)
            .split(".")
            .map((el) => parseInt(el));
        const to = germanDatePresentation(toDate)
            .split(".")
            .map((el) => parseInt(el));
        var fetchData = false;
        if (from[2] < to[2]) {
            fetchData = true;
        } else if (from[2] === to[2]) {
            // same year
            if (from[1] < to[1]) {
                fetchData = true;
            } else if (from[1] === to[1]) {
                // same year, same month
                if (from[0] <= to[0]) {
                    fetchData = true;
                }
            }
        }
        if (fetchData) {
            postCSV
                .getFeatures(discipline, space)
                .then((response) => {
                    if (response.data.res === "error") {
                        alert("Es ist ein Fehler aufgetreten.");
                    }
                    if (response.data.res === "no") {
                        alert("Bitte wähle eine Disziplin und Space.");
                    }
                    if (response.data.res === "ok") {
                        //let featureNames = response["data"]["arr"];

                        getDisciplines();
                        getSpaces();
                        // reset if the select option is not available anymore
                        if (!allDisciplines.includes(discipline)) {
                            setDiscipline(false);
                        }
                        if (!allSpaces.includes(space)) {
                            setSpace(false);
                        }
                    }
                })
                .catch((e) => {
                    console.log(e);
                    alert("Es ist ein Fehler aufgetreten.");
                });
        }
    };

    // data preprocessing

    if (isFirstRender) {
        getDisciplines();
        getSpaces();
        setIsFirstRender(false);
    }
    let testHeadCells = Array.from(new Set(right));
    testHeadCells = testHeadCells.map((headCell) => {
        return { id: headCell, label: `${headCell}`, tableView: true };
    });




    const handleFillingOptionChange = (event) => {
        setFillingOption(event.target.value);
    };


    const handleFormatChange = (event) => {
        setSelectedFormat(event.target.value);
    };

    const handleCeratinMeasrmentSelect = (event) => {
        setSelectedMeasurment(event.target.value);
    };
    return (
        <>
            <div className="view-header">
                <div>
                    {getFilterFunction(
                        fromDate,
                        toDate,
                        space,
                        discipline,
                        allSpaces,
                        allDisciplines,
                        (event) => setSpace(event.target.value),
                        (event) => setDiscipline(event.target.value),
                        (event) => {
                            setFromDate(event);
                            onDatesChange();
                        },
                        (event) => {
                            setToDate(event);
                            onDatesChange();
                        }
                    )}
                    <div style={{ width: "33%", display: "inline-block" }}>
                        {
                            <Button
                                variant="contained"
                                style={{ marginTop: "12px", width: "120px" }}
                                onClick={onApply}
                            >
                                Apply
                            </Button>
                        }
                    </div>
                    <div style={{ padding: "8px 0" }}>Select features:</div>
                    <div>
                        <Grid
                            container
                            spacing={2}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <p>{count}</p>
                            <Grid item>{customListLeft(left)}</Grid>
                            <Grid item>
                                <Grid container direction="column" alignItems="center">
                                    <Button
                                        sx={{ my: 0.5 }}
                                        variant="outlined"
                                        size="small"
                                        onClick={handleAllRight}
                                        disabled={left.length === 0}
                                        aria-label="move all right"
                                    >
                                        ≫
                                    </Button>
                                    <Button
                                        sx={{ my: 0.5 }}
                                        variant="outlined"
                                        size="small"
                                        onClick={moveCheckedRight}
                                        disabled={checkedLeft.length === 0}
                                        aria-label="move selected right"
                                    >
                                        &gt;
                                    </Button>
                                    <Button
                                        sx={{ my: 0.5 }}
                                        variant="outlined"
                                        size="small"
                                        onClick={moveCheckedLeft}
                                        disabled={checkedRight.length === 0}
                                        aria-label="move selected left"
                                    >
                                        &lt;
                                    </Button>
                                    <Button
                                        sx={{ my: 0.5 }}
                                        variant="outlined"
                                        size="small"
                                        onClick={handleAllLeft}
                                        disabled={right.length === 0}
                                        aria-label="move all left"
                                    >
                                        ≪
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item>{customListRight(right)}</Grid>
                        </Grid>
                    </div>

                    <br/><br/>
                    <div>
                        Choose a filling option in case the frequencies of the tests are different:<br/>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="keepMissing"
                                    checked={selectedValue === 'keepMissing'}
                                    onChange={handleFillingOptionChange}
                                />
                                Keep missing values in less frequent items
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="repeatNonFrequent"
                                    checked={selectedValue === 'repeatNonFrequent'}
                                    onChange={handleFillingOptionChange}
                                />
                                Repeat non frequent items
                            </label>
                        </div>


                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="selectCertainPoint"
                                    checked={selectedValue === 'selectCertainPoint'}
                                    onChange={handleFillingOptionChange}
                                />
                                Keep only the
                                <select value={selectedMeasurment} onChange={handleCeratinMeasrmentSelect}>
                                    <option value="1">1st</option>
                                </select>
                                 measurement
                            </label>
                        </div>

                        <br/><br/>


                        File Format Options:<br/>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="commaSeparated"
                                    checked={selectedFormat === 'commaSeparated'}
                                    onChange={handleFormatChange}
                                />
                                CSV: comma separated file (,)
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="semicolonSeparated"
                                    checked={selectedFormat === 'semicolonSeparated'}
                                    onChange={handleFormatChange}
                                />
                                CSV: semicolon separated file (;)
                            </label>
                        </div>
                    </div>




                    <div style={{ marginBottom: "12px", width: "100%" }}>
                        <div style={{ width: "33%", display: "inline-block" }}>
                            {
                                <Button
                                    hidden={true}
                                    variant="contained"
                                    style={{
                                        marginTop: "12px",
                                        marginRight: "20px",
                                        width: "160px",
                                    }}
                                    onClick={showData}
                                >
                                    Show Data
                                </Button>
                            }
                        </div>
                        <div style={{ width: "33%", display: "inline-block" }}>
                            {
                                <Button
                                    hidden={true}
                                    variant="contained"
                                    style={{ marginTop: "12px", width: "160px" }}
                                    onClick={onReset}
                                    disabled={
                                        !discipline &&
                                        !space &&
                                        fromDate.getTime() === defaultDates["from"].getTime() &&
                                        toDate.getTime() === defaultDates["to"].getTime()
                                    }
                                >
                                    Reset
                                </Button>
                            }
                        </div>
                        <div style={{ width: "33%", display: "inline-block" }}>
                            {
                                <Button
                                    variant="contained"
                                    style={{ marginTop: "12px", width: "120px" }}
                                    onClick={handleDownload}
                                    disabled={right.length === 0}
                                >
                                    Download
                                </Button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="view-content" hidden={true}>
                {
                    <CustomTable
                        rows={subset}
                        headCells={testHeadCells}
                        title={""}
                        hasSpecialRow={false}
                        hasChartRepresentation={false}
                        dense={true}
                        rowsPerPage={10}
                    />
                }
            </div>
            <div className="view-footer"></div>
        </>
    );
}
