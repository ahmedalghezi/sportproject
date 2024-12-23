/*
Copy of register/trainer/aymen/TestsView.js with additional subset functionalities
by Vanessa Meyer
*/

//TODO: getFeaturesData(param) to show subset data in table
//Note: click 'Show Data' after feature selection to see param-structure in console.

import React, { useState } from 'react';
import CustomTable from "../utli/components/CustomTable";
import postCSV from "../DB/postCSV";
import PostSignup from "../DB/postSignup";
//

import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import {germanDatePresentation} from "../utli/dataConversion";

import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

import Paper from "@mui/material/Paper";

import axios from "axios";
import PostCSVData from "../DB/postCSV";


import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import customListLeft from "./coustomDynamicListLeft";
import {ResizableBox} from "react-resizable";
//import customListLeftDynamic from  "./coustomDynamicListLeft"

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
            <h5 style={{color: 'red'}}>Important: synchronize the data in Metabase before downloading!</h5>
            <div style={{marginTop: "18px", padding: 0}} hidden={true}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3} style={{width: "33%", display: "inline-block"}}>
                        <DesktopDatePicker
                            label="From Date"
                            value={fromDate}
                            onChange={setFromDate}
                            style={{width: "240px"}}
                            renderInput={(params) => (
                                <TextField
                                    style={{width: "240px"}}
                                    size="small"
                                    {...params}
                                />
                            )}
                        />
                    </Stack>
                    <Stack spacing={3} style={{width: "33%", display: "inline-block"}}>
                        <DesktopDatePicker
                            label="To Date"
                            value={toDate}
                            onChange={setToDate}
                            renderInput={(params) => (
                                <TextField
                                    style={{width: "240px"}}
                                    size="small"
                                    {...params}
                                />
                            )}
                        />
                    </Stack>
                </LocalizationProvider>
            </div>
            <div style={{padding: "8px 0"}}>Available spaces:</div>
            <div style={{padding: 0}}>
                <FormControl
                    size="small"
                    style={{width: "33%", display: "inline-block"}}
                    hidden={true}
                >
                    <InputLabel id="demo-select-small">Discipline</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={discipline}
                        label={"Discipline"}
                        onChange={setDiscipline}
                        style={{width: "240px"}}
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
                    style={{width: "33%", display: "inline-block"}}
                >
                    <InputLabel id="demo-select-small">Space</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={space}
                        label={"Space"}
                        onChange={setSpace}
                        style={{width: "240px"}}
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


export function DownloadSubset() {
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

    //downloadDateTermsConst
    const [terms, setTerms] = useState([{ term: '', fromDate: '', toDate: '' }]);

    //transferlist
    //const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);

    const [checkedLeft, setCheckedLeft] = React.useState([]);
    const [checkedRight, setCheckedRight] = React.useState([]);

    const [count, setCount] = React.useState(0);
    const [selectedFormat, setSelectedFormat] = React.useState('xls');

    const [selectedMeasurment, setSelectedMeasurment] = React.useState("1");

    const [selectedFraction, setSelectedFraction] = React.useState("comma");

    const [ageRequired, setAgeRequired] = React.useState("ageNotRequired");

    //downloadDateTermsdef
    const handleAddTerm = () => {
        setTerms([...terms, { term: '', fromDate: '', toDate: '' }]);
      };

    const handleTermChange = (index, key, value) => {
        const newTerms = [...terms];
        newTerms[index][key] = value;
        setTerms(newTerms);
      };




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
        setRight(removeDuplicates(t_checkedRight, right));
        clearCheckedRight();
    }

    const moveCheckedRight = () => {
        setRight(mergeWithoutDuplicates(checkedLeft, right));
        clearCheckedLeft();
    }

    function removeDuplicates(arrReadID, arrWirte) {
        const IDset = new Set(arrReadID.map(obj => obj));
        return arrWirte.filter(obj => !IDset.has(obj.testid));
    }

    function mergeWithoutDuplicates(arrCheckedID, arrR) {
        const checkedRightIds = new Set(arrR.map(obj => obj.testid));
        arrCheckedID.forEach(objID => {
            if (!checkedRightIds.has(objID)) {
                let fullObj;
                left.forEach(obj => {
                    if (obj.testid === objID) fullObj = obj
                });
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
            let obj = {test_ids: testIds, filling: selectedValue, ageRequired: ageRequired};

            const response = await axios.post('https://inprove-sport.info/csv/downloadSubsetCsv', obj);
            let result = response.data.data;

            if(selectedMeasurment === "avg" && selectedValue === "selectCertainPoint"){
                result = averageByAthlete(result)
            }

            let restOfRows = result.slice(1);
            restOfRows.sort(function (a, b) {
                return a[0] - b[0];
            });

            if (selectedValue === "selectCertainPoint" && selectedMeasurment != "avg") {
                restOfRows = sliceRes(restOfRows, selectedMeasurment);
            }
            result = [result[0]].concat(restOfRows);



            // Add term columns if at least one term is added
        if (terms.length > 0 && terms.some(term => term.term && term.fromDate && term.toDate)) {
            const headers = result[0];
            console.log("headers in terms : ", headers)
            const updatedData = [];

            // Add term columns in the headers
            const updatedHeaders = [];
            headers.forEach((header, index) => {
                updatedHeaders.push(header);
                if (header.includes('time')) {
                    updatedHeaders.push('Term');
                }
            });
            updatedData.push(updatedHeaders);

            // Process rows to add term values
            result.slice(1).forEach((row) => {
                const newRow = [];
                row.forEach((cell, index) => {
                    newRow.push(cell);
                    if (headers[index].includes('time')) {
                        const dateValue = new Date(cell);
                        let termValue = '';
                        terms.forEach((term) => {
                            const fromDate = new Date(term.fromDate);
                            const toDate = new Date(term.toDate);
                            if (dateValue >= fromDate && dateValue <= toDate) {
                                termValue = term.term;
                                console.log(`termValue in ${fromDate} to ${toDate} :  ${termValue}`)
                            }
                        });
                        newRow.push(termValue);
                    }
                });
                updatedData.push(newRow);
            });

            result = updatedData;
        }



            if(selectedFormat === "xls")
                exportToExcel(result)
            else
                exportToCSV(result);

        } catch (error) {
            console.error(error);
            alert("an error has happened, code subD280");
        }
    };


    const sliceRes = (result, selectedMeasurment) => {
        result = result.filter(function (value, index, self) {
            // Only keep the item if the previous item's first element is not the same
            return index === 0 || value[0] !== self[index - 1][0];
        });
        return result;
    };



    function averageByAthlete(data) {
        if (!Array.isArray(data) || data.length < 1) {
            console.error("Invalid data format");
            return;
        }

        const athleteSums = {};
        const athleteCounts = {};
        const athleteFirstMeasures = {};

        // First row contains headers
        const headers = data[0].filter(header => header.toLowerCase() !== 'time'); // Remove 'time' from headers
        const ignoreCols = ['athlete', 'Age', 'Gender', 'discipline'];

        for (let i = 1; i < data.length; i++) {
            const row = data[i];
            const athleteId = row[0];

            if (!athleteSums[athleteId]) {
                athleteSums[athleteId] = {};
                athleteCounts[athleteId] = {};
                athleteFirstMeasures[athleteId] = {};
            }

            for (let j = 0; j < row.length; j++) {
                const header = data[0][j]; // Original headers

                if (header.toLowerCase() === 'time' || ignoreCols.includes(header)) {
                    if (ignoreCols.includes(header) && athleteFirstMeasures[athleteId][header] === undefined) {
                        athleteFirstMeasures[athleteId][header] = row[j];
                    }
                    continue;
                }

                if (!athleteSums[athleteId][header]) {
                    athleteSums[athleteId][header] = 0;
                    athleteCounts[athleteId][header] = 0;
                }

                athleteSums[athleteId][header] += parseFloat(row[j] || 0);
                athleteCounts[athleteId][header] += 1;
            }
        }

        const resultArray = [headers]; // Initialize with filtered headers

        for (const athleteId of Object.keys(athleteSums)) {
            const newRow = new Array(headers.length).fill(null); // Initialize new row with nulls
            newRow[0] = athleteId; // First column is the athleteId

            for (const [header, sum] of Object.entries(athleteSums[athleteId])) {
                const colIndex = headers.indexOf(header);
                newRow[colIndex] = sum / athleteCounts[athleteId][header];
            }

            for (const [header, value] of Object.entries(athleteFirstMeasures[athleteId])) {
                const colIndex = headers.indexOf(header);
                newRow[colIndex] = value;
            }

            resultArray.push(newRow);
        }

        return resultArray;
    }






    function exportToCSV(data, fileName = 'export.csv') {
        let sepr = ";";
        if (selectedFormat === "commaSeparated") {
            if (selectedFraction === "comma") {
                alert("Error: you have selected comma seperated file and comma for floating numbers which could create non seperated cols. ")
                return;
            }
            sepr = ',';
        }

        //else
        //  data = data.map(row => row.map(item => typeof item === 'number' ? item.toString().replace('.', ',') : item));

        data = processMatrix(data);

        const csvContent = data.map(row => row.join(sepr)).join('\n');
        const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
        saveAs(blob, fileName);
    }





    function exportToExcel(data, fileName = 'export.xlsx') {
        try {
            data = processMatrix(data);
            // Generate worksheet
            const ws = XLSX.utils.aoa_to_sheet(data);

            // Generate workbook
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

            // Write workbook and convert to binary
            const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});

            // Create Blob
            const blob = new Blob([s2ab(wbout)], {type: 'application/octet-stream'});

            // Create and click the download link
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = fileName;
            document.body.appendChild(link); // Required for Firefox
            link.click();
            document.body.removeChild(link); // Cleanup

        } catch (error) {
            console.error("Error in exportToExcel:", error);
        }
    }

// Convert string to ArrayBuffer
    function s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) {
            view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
    }




    function processMatrix(matrix) {
        return matrix.map(row =>
            row.map(value => {
                if (typeof value === 'string') {
                    // Handle dates
                    if (value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)) {
                        return value.substring(0, 10);
                    }
                    if (selectedFraction === "dot")
                        return value;
                    // Handle float strings
                    if (!isNaN(value) && value.includes('.')) {
                        return value.replace('.', ',');
                    }
                } else if (typeof value === 'number') {
                    // Handle float numbers
                    let strValue = value.toString();
                    if (strValue.includes('.') && selectedFraction != "dot") {
                        return strValue.replace('.', ',');
                    }
                }
                return value;
            })
        );
    }


    function convertDataToCSV(data) {
        // Extract unique test names from data
        const testNames = Array.from(
            new Set(
                data
                    .flatMap(({tests}) => tests.map(({test_name}) => test_name))
            )
        );

        // Generate CSV header
        const csvHeader = ['athlete', ...testNames.flatMap(test => [`${test} value`, `${test} time`])].join(',') + '\n';

        // Generate CSV rows
        const csvRows = data.map(({athlete, tests}) => {
            const athleteTests = tests.reduce((acc, {test_name, test_value, time}) => {
                const datePart = time.split('T')[0]; // Keep only the date part
                acc[test_name] = {value: test_value, time: datePart};
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
                for (let i = 0; i < response.data.data.length; i++) {
                    a.push(response.data.data[i].value)
                }
                setAllSpaces(a);
            })
            .catch(error => {
                console.log(error);
            });
    };


    const handleToggleLeft = (value) => () => {
        setCount(count + 1);
        const currentIndex = checkedLeft.indexOf(value.testid);
        if (currentIndex === -1) {
            const arr = checkedLeft;
            arr.push(value.testid);
            setCheckedLeft(arr);
            return;
        } else {
            setCheckedLeft(checkedLeft.filter(item => item !== value.testid));
            return;
        }
    };


    const handleToggleRight = (value) => () => {
        setCount(count - 1);
        const currentIndex = checkedRight.indexOf(value.testid);
        if (currentIndex === -1) {
            const arr = checkedRight;
            arr.push(value.testid);
            setCheckedRight(arr);
            return;
        } else {
            setCheckedRight(checkedRight.filter(item => item !== value.testid));
            return;
        }
    };

    const customListLeft = (items) => (
        <Paper sx={{width: 200, height: 530, overflow: "auto"}}>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value.testid}-label`;

                    return (
                        <ListItem
                            key={value}
                            role="listitem"
                            button
                            onClick={handleToggleLeft(value)}
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
                            <ListItemText id={labelId} primary={`${value.testname}`}/>
                        </ListItem>
                    );
                })}
                <ListItem/>
            </List>
        </Paper>
    );






    const customListRight = (items) => (
        <Paper sx={{width: 200, height: 230, overflow: "auto"}}>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value.testid}-label`;

                    return (
                        <ListItem
                            key={value}
                            role="listitem"
                            button
                            onClick={handleToggleRight(value)}
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
                            <ListItemText id={labelId} primary={`${value.testname}`}/>
                        </ListItem>
                    );
                })}
                <ListItem/>
            </List>
        </Paper>
    );

    // event handlers

    // Apply button after Selection of Discipline and Space to create left list of transferlist with filtered data
    const onApply = () => {
        setLeft([]);
        postCSV
            .getFeatures({"discipline": discipline, "space": space})
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
        return {id: headCell, label: `${headCell}`, tableView: true};
    });


    const handleFillingOptionChange = (event) => {
        setFillingOption(event.target.value);
    };


    const handleFormatChange = (event) => {
        setSelectedFormat(event.target.value);
    };

    const handleFractionChange = (event) => {
        setSelectedFraction(event.target.value);
    };

    const handleCeratinMeasrmentSelect = (event) => {
        setSelectedMeasurment(event.target.value);
    };

    const handleAgeChange = (event) => {
        setAgeRequired(event.target.value);
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
                    <div style={{width: "33%", display: "inline-block"}}>
                        {
                            <Button
                                variant="contained"
                                style={{marginTop: "12px", width: "120px"}}
                                onClick={onApply}
                            >
                                Apply
                            </Button>
                        }
                    </div>
                    <div style={{padding: "8px 0"}}>Select features:</div>


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
                                        sx={{my: 0.5}}
                                        variant="outlined"
                                        size="small"
                                        onClick={handleAllRight}
                                        disabled={left.length === 0}
                                        aria-label="move all right"
                                    >
                                        ≫
                                    </Button>
                                    <Button
                                        sx={{my: 0.5}}
                                        variant="outlined"
                                        size="small"
                                        onClick={moveCheckedRight}
                                        disabled={checkedLeft.length === 0}
                                        aria-label="move selected right"
                                    >
                                        &gt;
                                    </Button>
                                    <Button
                                        sx={{my: 0.5}}
                                        variant="outlined"
                                        size="small"
                                        onClick={moveCheckedLeft}
                                        disabled={checkedRight.length === 0}
                                        aria-label="move selected left"
                                    >
                                        &lt;
                                    </Button>
                                    <Button
                                        sx={{my: 0.5}}
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
                    <div style={{padding: "8px 0"}}>Term and Date Input :</div>
                        {terms.map((term, index) => (
                        <div key={index} style={{ marginBottom: '10px' }}>
                        <input
                            type="text"
                            placeholder={`Term ${index + 1}`}
                            value={term.term}
                            onChange={(e) => handleTermChange(index, 'term', e.target.value)}
                            style={{ marginRight: '10px' }}
                        />
                        <input
                            type="date"
                            placeholder="From Date"
                            value={term.fromDate}
                            onChange={(e) => handleTermChange(index, 'fromDate', e.target.value)}
                            style={{ marginRight: '10px' }}
                        />
                        <input
                            type="date"
                            placeholder="To Date"
                            value={term.toDate}
                            onChange={(e) => handleTermChange(index, 'toDate', e.target.value)}
                        />
                        </div>
                    ))}
                    <button onClick={handleAddTerm}>Add (T1, T2, ..) Terms</button>
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
                                    <option value="avg">avg</option>
                                </select>
                                measurement
                            </label>
                        </div>

                        <div>
                        <label>
                            <input
                                type="radio"
                                value="singleTimeCol"
                                checked={selectedValue === 'singleTimeCol'}
                                onChange={handleFillingOptionChange}
                            />
                            Single Time-column
                        </label>
                        </div>


                        <br/><br/>
                    </div>

                    <div>
                        File Format Options:<br/>

                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="xls"
                                    checked={selectedFormat === 'xls'}
                                    onChange={handleFormatChange}
                                />
                                XLSX : Excel file format
                            </label>
                        </div>


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


                        <br/><br/>


                        Floating numbers options:<br/>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="comma"
                                    checked={selectedFraction === 'comma'}
                                    onChange={handleFractionChange}
                                />
                                Use (,)
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="dot"
                                    checked={selectedFraction === 'dot'}
                                    onChange={handleFractionChange}
                                />
                                Use (.)
                            </label>
                        </div>
                    </div>


                    <br/><br/>
                    <div>
                        Include age column:<br/>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="ageNotRequired"
                                    checked={ageRequired === 'ageNotRequired'}
                                    onChange={handleAgeChange}
                                />
                                No
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="ageRequired"
                                    checked={ageRequired === 'ageRequired'}
                                    onChange={handleAgeChange}
                                />
                                Yes
                            </label>
                        </div>

                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="dob"
                                    checked={ageRequired === 'dob'}
                                    onChange={handleAgeChange}
                                />
                                Date of  birth
                            </label>
                        </div>
                    </div>

                    <div>
                        <p>Note: gender column is included with numerical values: male = 0 , female = 1</p>
                    </div>


                    <div style={{marginBottom: "12px", width: "100%"}}>
                        <div style={{width: "33%", display: "inline-block"}}>
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
                        <div style={{width: "33%", display: "inline-block"}}>
                            {
                                <Button
                                    hidden={true}
                                    variant="contained"
                                    style={{marginTop: "12px", width: "160px"}}
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
                        <div style={{width: "33%", display: "inline-block"}}>
                            {
                                <Button
                                    variant="contained"
                                    style={{marginTop: "12px", width: "120px"}}
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
