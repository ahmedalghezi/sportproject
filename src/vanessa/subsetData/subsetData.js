/*
Authors
  Vanessa Meyer

References
  https://mui.com/material-ui/react-transfer-list/
  register/trainer/aymen/TestsView.js


install
     @mui/x-date-pickers
     moment
     dayjs
     @mui/x-data-grid

Next TODOs
  backend
  add data to table
  remove duplicates of features, that are listed in transferlist
  download functionality
  
*/

import React, { Component } from "react";
import { DataGrid } from "@mui/x-data-grid";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

//imports for transferlist
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";

//import testdata
import testdata from "./testdata";

class SubSetC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //testdata
      testData: testdata,
      featureList: [],

      //filter
      filteredData: [],
      filteredJsonRecords: [],
      filteredDisp: [],
      filteredSpaces: [],

      //disciplin & space
      space: "",
      discipline: "",
      allSpaces: [],
      allDisciplines: [],

      //transferlist
      isChecked: [],
      left: [],
      right: [],
      leftChecked: [],
      rightChecked: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount = () => {
    this.getFeatureNames();
    this.getDiscipines();
    this.getSpaces();
  };

  //TODO
  // get feature names for transferlist to select from all features
  getFeatureNames = () => {
    let featureNames = [];
    this.state.testData.forEach((item) => {
      featureNames = featureNames.concat(Object.keys(item["json_record"]));
    });

    this.setState({ featureList: featureNames, left: featureNames });

    this.setState((prevState) => {
      return { testHeadCells: prevState.featureList };
    });
  };

  //TODO
  getDiscipines = () => {
    let allDisciplines = ["Basketball", "Volleyball", "Eishockey", "Football"];

    this.setState({ allDisciplines: allDisciplines });
  };
  //TODO
  getSpaces = () => {
    let allSpaces = [
      "Bluttest",
      "DNA",
      "Mikrobiotika",
      "Psychologie",
      "Physiologie",
      "Andere",
    ];
    this.setState({ allSpaces: allSpaces });
  };

  //some functions for logic
  not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }
  intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }

  //handle-functions for selection of discipline & space
  handleChange = (e) => {
    const target = e.target;
    let value = target.value;
    const name = target.name;
    let featureNames = [];

    //set value and filter by discipline
    if (name === "discipline") {
      this.setState({
        discipline: value,
        filteredData: this.state.testData.filter(
          (el) => el["discipline"] === value
        ),
      });

      this.state.testData
        .filter((el) => el["discipline"] === value)
        .forEach((item) => {
          featureNames = featureNames.concat(Object.keys(item["json_record"]));
        });
      this.setState({ filteredDisp: featureNames });

      this.setState((prevState) => {
        if (prevState.filteredSpaces.length !== 0) {
          return {
            left: this.intersection(
              prevState.filteredDisp,
              prevState.filteredSpaces
            ),
          };
        } else {
          return { left: prevState.filteredDisp };
        }
      });
    }
    //set value and filter by space
    if (name === "space") {
      this.setState({
        space: value,
        filteredData: this.state.testData.filter((el) => el["space"] === value),
      });

      this.state.testData
        .filter((el) => el["space"] === value)
        .forEach((item) => {
          featureNames = featureNames.concat(Object.keys(item["json_record"]));
        });
      this.setState({ filteredSpaces: featureNames });

      this.setState((prevState) => {
        if (prevState.filteredDisp.length !== 0) {
          return {
            left: this.intersection(
              prevState.filteredDisp,
              prevState.filteredSpaces
            ),
          };
        } else {
          return { left: prevState.filteredSpaces };
        }
      });
    }
  };

  //handle-functions for transferlist
  handleToggle = (value) => () => {
    let isChecked = this.state.isChecked;

    const currentIndex = isChecked.indexOf(value);
    const newChecked = [...isChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    this.setState({ isChecked: newChecked });

    this.setState((prevState) => {
      return {
        leftChecked: this.intersection(prevState.isChecked, prevState.left),
        rightChecked: this.intersection(prevState.isChecked, prevState.right),
      };
    });
  };

  handleAllRight = () => {
    let left = this.state.left;
    let right = this.state.right;
    this.setState({ right: right.concat(left) });
    this.setState({ left: [] });
  };

  handleAllLeft = () => {
    let left = this.state.left;
    let right = this.state.right;
    this.setState({ left: left.concat(right) });
    this.setState({ right: [] });
  };

  handleCheckedRight = () => {
    this.setState((prevState) => {
      return {
        leftChecked: prevState.leftChecked,
        right: prevState.right.concat(prevState.leftChecked),
        left: this.not(prevState.left, prevState.leftChecked),
        isChecked: this.not(prevState.isChecked, prevState.leftChecked),
        leftChecked: [],
      };
    });
  };

  handleCheckedLeft = () => {
    this.setState((prevState) => {
      return {
        rightChecked: prevState.rightChecked,
        left: prevState.left.concat(prevState.rightChecked),
        right: this.not(prevState.right, prevState.rightChecked),
        isChecked: this.not(prevState.isChecked, prevState.rightChecked),
        rightChecked: [],
      };
    });
  };

  //handleClick for testing
  handleClick = () => {
    console.log(this.state);
  };

  //TODO
  handleApply = () => {
    /*
    Object.keys(item["json_record"])
    */

    this.setState((prevState) => {
      return {
        filteredJsonRecords: prevState.filteredData.map(
          (t) => t["json_record"]
        ),
      };
    });
  };

  // feature list for transferlist
  customList = (items) => (
    <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={this.handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={this.state.isChecked.indexOf(value) !== -1}
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

  render() {
    let discipline = this.state.discipline;
    let allDisciplines = this.state.allDisciplines;
    let space = this.state.space;
    let allSpaces = this.state.allSpaces;
    let left = this.state.left;
    let right = this.state.right;
    let leftChecked = this.state.leftChecked;
    let rightChecked = this.state.rightChecked;
    let filteredJsonRecords = this.state.filteredJsonRecords;

    //Table Data
    let rows = filteredJsonRecords;
    let columns = right.map((headCell) => {
      return {
        field: headCell,

        headerName: headCell,
      };
    });

    
    return (
      <div>
        <div style={{ padding: "8px 0" }}>
          Available disciplines and spaces:
        </div>
        <div style={{ padding: 0 }}>
          <FormControl
            size="small"
            style={{ width: "50%", display: "inline-block" }}
          >
            <InputLabel id="demo-select-small">Discipline</InputLabel>
            <Select
              name="discipline"
              labelId="demo-select-small"
              id="demo-select-small"
              value={discipline}
              label={"Discipline"}
              onChange={this.handleChange}
              style={{ width: "340px" }}
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
            style={{ width: "50%", display: "inline-block" }}
          >
            <InputLabel id="demo-select-small">Space</InputLabel>
            <Select
              name="space"
              labelId="demo-select-small"
              id="demo-select-small"
              value={space}
              label={"Space"}
              onChange={this.handleChange}
              style={{ width: "340px" }}
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
        <div>
          <div style={{ padding: "8px 0" }}>Select features:</div>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>{this.customList(left)}</Grid>
            <Grid item>
              <Grid container direction="column" alignItems="center">
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={this.handleAllRight}
                  disabled={left.length === 0}
                  aria-label="move all right"
                >
                  ≫
                </Button>
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={this.handleCheckedRight}
                  disabled={leftChecked.length === 0}
                  aria-label="move selected right"
                >
                  &gt;
                </Button>
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={this.handleCheckedLeft}
                  disabled={rightChecked.length === 0}
                  aria-label="move selected left"
                >
                  &lt;
                </Button>
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={this.handleAllLeft}
                  disabled={right.length === 0}
                  aria-label="move all left"
                >
                  ≪
                </Button>
              </Grid>
            </Grid>
            <Grid item>{this.customList(right)}</Grid>
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
                onClick={this.handleClick}
              >
                Test
              </Button>
            }
          </div>
        </div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </div>
    );
  }
}

export default SubSetC;
