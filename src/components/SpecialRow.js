import React, { Component } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import './specialRow.css';
import { IconButton, Tooltip } from '@mui/material';
import { reformatDate, reformatKey } from '../utli/dataConversion.js';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default class SpecialRow extends Component {
  
  render() {
    const {handleCloseSpecialRow, index, data} = this.props;
    const tableCellStyle = {width: '25%', paddingBottom: '8px'};
    const trainingKeys = ['quality', 'achieved', 'planned', 'date', 'start_time', 'end_time', 'comments', 'as_planned', 'difference'];

    return (
      <div className="srow-wrapper">
          <div className="srow-header"> 
            <Tooltip title="Close">
              <IconButton onClick={() => handleCloseSpecialRow(index)}>
                  <CloseIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div>
          <div className="grid-view-container">
            <div className="grid-view-column">
                <div className="grid-view-row">
                    <h5>Training</h5>
                    <table><tbody>
                    {data && trainingKeys.map( key => {
                        return (<tr key={"tr-tra-" + key}>
                            <td style={tableCellStyle}><b>{reformatKey(key)}</b></td>
                            <td style={tableCellStyle}>{key == 'date' ? reformatDate(data[key]) : data[key]}</td>
                        </tr>);
                    })}
                    </tbody></table>
                </div>
            </div>
            {/* keep this to force first column to the left */}
            <div className="grid-view-column"></div>
          </div>
          </div>
      </div>
    )
  }
}
