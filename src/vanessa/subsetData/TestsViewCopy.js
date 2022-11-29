/* 
Copy of register/trainer/aymen/TestsView.js with additional subset functionalities 
by Vanessa Meyer
*/
/*
  TODO
    
*/
import React from "react";
import CustomTable from "../../components/CustomTable";
import postCSV from "../../DB/postCSV";
import PostSignup from "../../DB/postSignup";

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
  // get all disciplines and spaces for select drop down --TODO
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
    let arr = ["Performance data", "Blood samples", "DNA", "Bacterial", "Cognition", "body Measurements", "Other"]
    setAllSpaces(arr);
    
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

  // Apply button after Selection of Discipline and Space to create left list of transferlist with filtered data
  const onApply = () => {
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
          let featureNames = response["data"]["arr"];
          getDisciplines();
          getSpaces();

          setLeft(featureNames);
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Es ist ein Fehler aufgetreten.");
      });
  };

  //show data of selected features (right list of transferlist) to use for subset table
  const showData = () => {
    postCSV
      .getFeaturesData(right)
      .then((response) => {
        if (response.data.res === "error") {
          alert("Es ist ein Fehler aufgetreten.");
        }
        if (response.data.res === "no") {
          alert("Bitte wähle eine Disziplin und Space.");
        }
        if (response.data.res === "ok") {
          let featuresData = response["data"]["arr"];

          setSubset(featuresData);
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Es ist ein Fehler aufgetreten.");
      });
  };

  const onReset = () => {
    if (discipline || space) {
      setDiscipline(false);
      setSpace(false);
      setFromDate(defaultDates["from"]);
      setToDate(defaultDates["to"]);

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
            let featureNames = response["data"]["arr"];
            getDisciplines();
            getSpaces();
            

            
            setColLabels(featureNames);
            setLeft([]);
            setRight([]);
            setSubset([]);
            
          }
        })
        .catch((e) => {
          console.log(e);
          alert("Es ist ein Fehler aufgetreten.");
        });
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
            let featureNames = response["data"]["arr"];
            setColLabels(featureNames);
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
                  onClick={showData}
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
