import React, { Component } from 'react';
import '../styleAthleteProfileTables.css';
import PropTypes from 'prop-types';

export default class AthleteProfileTable extends Component {
    static defaultProps = {
      data: [],
      section_name: '',
      onTableHeightChange: () => {},
      
    };

    constructor(props) {
      super(props);
      this.tableRef = React.createRef();
      this.state = {
        expandedSection: null,
        activeDesc: null,
        activeCellCoords: null,
        rowHeight: null,
        // data: [],
      };
    }

    componentDidMount() {
      this.computeTableDimensions();
    }
      
      computeTableDimensions() {
      if (this.tableRef.current) {
        const tableWidth = this.tableRef.current.clientWidth;
        const tableHeight = this.tableRef.current.clientHeight;
        this.props.onTableHeightChange(tableHeight);
      }
    }

    computeRowHeight() {
      if (this.tableRef.current) {
          const rowHeight = this.tableRef.current.querySelector('tbody tr').clientHeight;
          return rowHeight;
      }
      return 0;
  }

    handleCellClick = (desc, activeCellCoords) => {
      const rowHeight = this.computeRowHeight();
      this.setState({ activeDesc: desc, activeCellCoords: activeCellCoords, rowHeight });
    }

    formatValue = (value) => {
      
      if (value === "null" || /^null(\/null)*$/.test(value)) {
    return "";
      }

    // Replace "null" with an empty string
    let formattedValue = value.replace(/null/g, "");

      return formattedValue;
    };


    render() {
      const { section_name,data} = this.props;
      const { activeDesc, activeCellCoords, rowHeight} = this.state;
      return (
    <div style={{ width: '100%', padding: '10px' }}>
    {data.sections.map((section, index) => {
      if (section.section_name === section_name) {
        // Extracting dates from testsArr
        const datesToRender = [];
        section.testsArr.forEach(testArr => {
          testArr.forEach(test => {
            test.ser.forEach((s, sIndex) => {
              if (!datesToRender[sIndex] && s.date) {
                datesToRender[sIndex] = s.date;
              }
            });
          });
        });

        const maxColumnsForSection = Math.max(
          ...section.testsArr.map(testArr => Math.max(...testArr.map(test => test.ser.length)))
        );

        return (
          <div
            key={index}
            style={{
              padding: '5',
              borderRadius: '5px',
              border: '2px solid #000000',
              marginBottom: '10px',
              backgroundColor: 'white',
              position: 'relative'
            }}
          >
            <table
              ref={this.tableRef}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '300px',
                borderCollapse: 'collapse',
                border: '1px solid #f3f2f3',
              }}
            >
              <thead>
                <tr style={{
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}>
                  <th> </th>
                  {datesToRender.map((date, dateIndex) => (
                    <th key={dateIndex}> {date} </th>
                  ))}
                  {Array.from({ length: maxColumnsForSection - datesToRender.length }).map((_, i) => (
                    <th key={`emptyHeader${i}`}></th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.testsArr.map((testArr, rowIndex) => (
                  testArr.map((test, testIndex) => (
                    <tr key={`${rowIndex}-${testIndex}`}>
                      <td
                        onClick={() => this.handleCellClick(test.desc, { rowIndex: rowIndex, colIndex: 0 })}
                        style={{
                          border: '1px solid lightgrey',
                          padding: '5px',
                          backgroundColor: '#F7F7F7',
                          fontWeight: 'bold',
                          textAlign: 'left',
                          position: 'relative',
                        }}
                      >
                        {test.test_title.trim()}
                        {test.desc && (
                          <sup
                            style={{
                              fontSize: '1em',
                              marginLeft: '3px',
                              color: 'blue',
                              cursor: 'pointer',
                            }}
                            title={test.desc}
                          >
                            ?
                          </sup>
                        )}
                      </td>
                      {test.ser.map((s, sIndex) => (
                        <td
                          key={sIndex}
                          className={`${s.color}-light`}
                          style={{
                            border: '1px solid #f3f2f3',
                            fontWeight: 'bold',
                            padding: '5px',
                            textAlign: 'center',
                          }}
                        >
                          {this.formatValue(s.value)}
                        </td>
                      ))}
                      {Array.from({ length: maxColumnsForSection - test.ser.length }).map(
                        (_, i) => (
                          <td
                            key={i + test.ser.length}
                            style={{
                              border: '1px solid #f3f2f3',
                              padding: '5px',
                              textAlign: 'left',
                            }}
                          ></td>
                        )
                      )}
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
            {activeDesc && activeCellCoords && (
              <div
                style={{
                  position: 'absolute',
                  backgroundColor: 'rgba(211, 211, 211, 0.9)',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  zIndex: '9999',
                  top: `calc(${activeCellCoords.rowIndex} * ${rowHeight}px)`,
                  left: `calc(${activeCellCoords.colIndex}px)`,
                  width: 'auto',
                  maxWidth: '400px',
                }}
              >
                {activeDesc}
              </div>
            )}
          </div>
        );
      } else {
        return null;
      }
    })}
  </div>
);
}
  }
