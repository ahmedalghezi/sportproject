import React from "react";
import CustomTable from "../../components/CustomTable";
import axios from "axios";
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
import { germanDatePresentation } from "../../utli/dataConversion";

//added
import testdata from "./testdata";
//import TransferList from './transferlist';
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

import Paper from "@mui/material/Paper";

const defaultDates = {
  from: new Date(2020, 0, 1),
  to: new Date(2023, 0, 1),
};

// requesting data from API
/*
async function getTests (fromDate, toDate) {
  console.log("https://inprove-sport.info/csvapi/get_slice/" + fromDate + "/" + toDate);
  return await axios.create({
     baseURL: "https://inprove-sport.info/",
     json: true,
     headers: {
         "Content-type": "application/json"
     },
  }).get("/csvapi/get_slice/" + fromDate + "/" + toDate);
}*/

// utils

const getColLabelsFromData = (data) => {
  let labels = [];
  
  data.forEach((test) => {
    labels = labels.concat(Object.keys(test["json_record"]));
    
    labels = Array.from(new Set(labels)); //make entries unique
  });

  return labels;
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
      <div style={{ marginTop: "18px", padding: 0 }}>
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
      <div style={{ padding: "8px 0" }}>Available disciplines and spaces:</div>
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
//transferlist logic functs
function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TestsViewCopy(props) {
  const [filteredTests, setFilteredTests] = React.useState([]);
  //const[filteredTestsRight, setFilteredTestsRight] = React.useState([]);
  const [jsonRecords, setJsonRecords] = React.useState([]);
  const [subset, setSubset] = React.useState([]);
  const [space, setSpace] = React.useState(false);
  const [discipline, setDiscipline] = React.useState(false);
  const [fromDate, setFromDate] = React.useState(defaultDates["from"]);
  const [toDate, setToDate] = React.useState(defaultDates["to"]);
  const [allDisciplines, setAllDisciplines] = React.useState([]);
  const [allSpaces, setAllSpaces] = React.useState([]);
  const [colLabels, setColLabels] = React.useState([]);
  const [isFirstRender, setIsFirstRender] = React.useState(true);

  //transferlist
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items) => (
    <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  // event handlers

  //TODO AKTUELL ###############################################################################
  // Apply button after Selection of Discipline and Space to create left list of transferlist with filtered data
  const onApply2 = () => {
    //getTests(germanDatePresentation(fromDate), germanDatePresentation(toDate)).then(res => {
    //let testsData = res['data']['arr'];
    let testsData = testdata;
    setAllDisciplines(
      Array.from(new Set(testsData.map((el) => el.discipline)))
    );
    setAllSpaces(Array.from(new Set(testsData.map((el) => el.space))));
    // filter the data
    if (discipline) {
      testsData = testsData.filter((el) => el["discipline"] === discipline);
    }
    if (space) {
      testsData = testsData.filter((el) => el["space"] === space);
    }

    setFilteredTests(testsData);

    let testDataJsonRecords = testsData.map((t) => t["json_record"]);

    setJsonRecords(
      Array.from(new Set(jsonRecords.concat(testDataJsonRecords))) //unique records? -> what if in data 2 identical rows and we want both?
    );

    //setColLabels(getColLabelsFromData(testsData));
    setLeft(getColLabelsFromData(testsData));

    //});
  };

  // create filtered data by right list of transferlist (selected features) to use for subset table

  const onApply = () => {
    console.log(jsonRecords);
    //create subset of jsonRecords
    let subset = [];
    jsonRecords.forEach((item) => {
      subset = subset.concat(right.reduce((a, e) => ((a[e] = item[e]), a), {}));
    });

    console.log(subset);
    setSubset(subset);

    /*
    let filteredJsonRecords = jsonRecords.filter(
      key => right.includes(key)
    );
    console.log(filteredJsonRecords);*/
    /*
      let filteredData = filteredTests;
      if(right) {
        // daten weiter filtern nach den features, die in Right enthalten sind
        filteredData = filteredData.filter()
      }
      setFilteredTestsRight(filteredData);
      setJsonRecords(jsonRecords.concat(filteredData.map(t => t['json_record'])));
      //anschließend argumente für Tabellendarstellung anpassen 
      
     */

    //});
  };
  //TODO AKTUELL ENDE ###############################################################################
  const onReset = () => {
    if (discipline || space) {
      setDiscipline(false);
      setSpace(false);
      setFromDate(defaultDates["from"]);
      setToDate(defaultDates["to"]);
      //getTests(germanDatePresentation(fromDate), germanDatePresentation(toDate)).then(res => {
      // let testsData = res['data']['arr'];
      let testsData = testdata;
      setAllDisciplines(
        Array.from(new Set(testsData.map((el) => el.discipline)))
      );
      setAllSpaces(Array.from(new Set(testsData.map((el) => el.space))));
      setFilteredTests(testsData);
      //setJsonRecords(testsData.map(t => t['json_record']));
      setJsonRecords([]);
      setColLabels(getColLabelsFromData(testsData));
      setLeft([]);
      setRight([]);
      //});
    }
  };

  const onDownload = () => {
    var data = subset;
    let csvRows = [Object.keys(data[0])].concat(data);

    const csvContent = csvRows
      .map((it) => {
        return Object.values(it).toString();
      })
      .join("\n");
    var download = function (content, fileName, mimeType) {
      var a = document.createElement("a");
      mimeType = mimeType || "application/octet-stream";

      if (navigator.msSaveBlob) {
        // IE10
        navigator.msSaveBlob(
          new Blob([content], {
            type: mimeType,
          }),
          fileName
        );
      } else if (URL && "download" in a) {
        a.href = URL.createObjectURL(
          new Blob([content], {
            type: mimeType,
          })
        );
        a.setAttribute("download", fileName);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    };

    // execute the download
    download(csvContent, "dowload.csv", "text/csv;encoding:utf-8");
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
      //getTests(germanDatePresentation(fromDate), germanDatePresentation(toDate)).then(res => {
      // const testsData = res['data']['arr'];
      const testsData = testdata;
      setAllDisciplines(
        Array.from(new Set(testsData.map((el) => el.discipline)))
      );
      setAllSpaces(Array.from(new Set(testsData.map((el) => el.space))));
      // reset if the select option is not available anymore
      if (!allDisciplines.includes(discipline)) {
        setDiscipline(false);
      }
      if (!allSpaces.includes(space)) {
        setSpace(false);
      }
      //});
    }
  };

  // data preprocessing
  if (isFirstRender) {
    //getTests(germanDatePresentation(fromDate), germanDatePresentation(toDate)).then(res => {
    //const testsData = res['data']['arr'];
    const testsData = testdata;
    setAllDisciplines(
      Array.from(new Set(testsData.map((el) => el.discipline)))
    );
    setAllSpaces(Array.from(new Set(testsData.map((el) => el.space))));
    setIsFirstRender(false);
    // });
  }
  let testHeadCells = Array.from(new Set(right));
  testHeadCells = testHeadCells.map((headCell) => {
    return { id: headCell, label: `${headCell}`, tableView: true };
  });

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
                onClick={onApply2}
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
              <Grid item>{customList(left)}</Grid>
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
                    onClick={handleCheckedRight}
                    disabled={leftChecked.length === 0}
                    aria-label="move selected right"
                  >
                    &gt;
                  </Button>
                  <Button
                    sx={{ my: 0.5 }}
                    variant="outlined"
                    size="small"
                    onClick={handleCheckedLeft}
                    disabled={rightChecked.length === 0}
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
              <Grid item>{customList(right)}</Grid>
            </Grid>
          </div>

          <div style={{ marginBottom: "12px", width: "100%" }}>
            <div style={{ width: "33%", display: "inline-block" }}>
              {
                <Button
                  variant="contained"
                  style={{
                    marginTop: "12px",
                    marginRight: "20px",
                    width: "160px",
                  }}
                  onClick={onApply}
                >
                  Show Data
                </Button>
              }
            </div>
            <div style={{ width: "33%", display: "inline-block" }}>
              {
                <Button
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
                  onClick={onDownload}
                  disabled={subset.length === 0}
                >
                  Download
                </Button>
              }
            </div>
          </div>
        </div>
      </div>
      <div className="view-content">
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
