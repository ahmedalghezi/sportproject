import React, { Component } from 'react';
import '../styleAthleteProfileTables.css';
import PropTypes from 'prop-types';

export const json_data = {
  "sections" : [
      {
        "section_name": "Blutanalyse",
        "testsArr": [
          {"test_title": "t1", "ser": [{"value": "4,4", "color": "red"}, {"value": "6", "color": "green"}]},
          {"test_title": "t2", "ser": [{"value": "7,4", "color": "yellow"}, {"value": "60", "color": "green"}]},
          {"test_title": "t1", "ser": [{"value": "4,4", "color": "red"}, {"value": "6", "color": "green"}]},
          {"test_title": "t2", "ser": [{"value": "7,4", "color": "yellow"}, {"value": "60", "color": "red"}]},
          {"test_title": "t3", "ser": [{"value": "17,4", "color": "yellow"}, {"value": "61", "color": "red"}]}
        ]
      },
      {
        "section_name": "Mikrobiom",
        "testsArr": [
          {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t2", "ser": [{"value": "8,5", "color": "yellow"}, {"value": "65", "color": "yellow"}]}
        ]
      },
      {
        "section_name": "Genetik",
        "testsArr": [
          {"test_title": "t1", "ser": [{"value": "6,6", "color": "red"}, {"value": "8", "color": "green"}]},
          {"test_title": "t2", "ser": [{"value": "9,6", "color": "yellow"}, {"value": "70", "color": "yellow"}]}
        ]
      },
      {
        "section_name": "Soziologie",
        "testsArr": [
          {"test_title": "t1", "ser": [{"value": "7,7", "color": "red"}, {"value": "9", "color": "green"}]},
          {"test_title": "t2", "ser": [{"value": "10,7", "color": "yellow"}, {"value": "75", "color": "red"}]}
        ]
      },
      {
        "section_name": "Kognition",
        "testsArr": [
          {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "red"}]},
          {"test_title": "t2", "ser": [{"value": "11,8", "color": "yellow"}, {"value": "80", "color": "red"}]}
        ]
      },
      {
        "section_name": "Motorik",
        "testsArr": [
          {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "green"}, {"value": "80", "color": "red"}]},
          {"test_title": "t2", "ser": [{"value": "11,8", "color": "yellow"}, {"value": "80", "color": "green"}, {"value": "80", "color": "yellow"},]}
        ]
      },
      {
        "section_name": "",
        "testsArr": [
          {"test_title": "t1testtestetstet", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "green"}]},
          {"test_title": "t2testtestetstet", "ser": [{"value": "11,8", "color": "yellow"}, {"value": "80", "color": "green"}]},
          {"test_title": "t3testtestetstet", "ser": [{"value": "8,8", "color": "red"}, {"value": "80", "color": "yellow"}, {"value": "10", "color": "green"}]},
          {"test_title": "t4testtestetstet", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "green"}]},
          {"test_title": "t5testtestetstet", "ser": [{"value": "11,8", "color": "yellow"}, {"value": "80", "color": "green"}]},
          {"test_title": "t6testtestetstet", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "green"}]},
          {"test_title": "t7testtestetstet", "ser": [{"value": "11,8", "color": "yellow"}, {"value": "80", "color": "yellow"},{"value": "100", "color": "green"}]}
        ]
      }
    ]
  };
  function getUniqueSecondLastColors(section) {
    const uniqueColors = new Set();
  
    section.testsArr.forEach((test) => {
      const lastColor = test.ser[test.ser.length - 1].color;
      const secondLastColor = test.ser[test.ser.length - 2]?.color;
  
      if (secondLastColor && secondLastColor !== lastColor) {
        let isUnique = true;
  
        for (let i = 0; i < test.ser.length - 1; i++) {
          for (let j = 0; j < test.ser.length - 1; j++) {
            if (test.ser[i].color !== test.ser[j].color) {
              isUnique = true;
            } else if (test.ser[i].color === test.ser[j].color && i !== j) {
              isUnique = false;
              break;
            }
          }
          if (isUnique) {
            uniqueColors.add(secondLastColor);
          }
        }
      }
    });
    
    return Array.from(uniqueColors);
  }
  
  export default class AthleteProfileTable extends Component {
    static defaultProps = {
      data: json_data,
      section_name: '',
      colorBar: []
    };
  
    constructor(props) {
      super(props);
      this.state = {
        expandedSection: null,
      };
    }
  
    computeTableWidth(section) {
        const TEST_TITLE_WIDTH = 100; 
        const SER_ITEM_WIDTH = 50;  
  
        const totalSerItems = section.testsArr[0].ser.length;
        return TEST_TITLE_WIDTH + (totalSerItems * SER_ITEM_WIDTH) + 'px';
    }

    componentDidUpdate(prevProps) {
      const { section_name, onColorBarDataReceived } = this.props;
  
      if (section_name !== prevProps.section_name) {
        const colorBarData = this.props.data.sections
          .filter((section) => section.section_name === section_name)
          .map((section) =>
            section.testsArr.map((test) => test.ser[test.ser.length - 1].color)
          )
          .flat();
  
        if (typeof onColorBarDataReceived === 'function') {
          onColorBarDataReceived(colorBarData, section_name);
        }
      }
    }
       
    render() {
      const { data, section_name} = this.props;
  
      const colorBarData = data.sections
        .filter((section) => section.section_name === section_name)
        .map((section) =>
          section.testsArr.map((test) => test.ser[test.ser.length - 1].color)
        )
        .flat();

  
      return (
        <div style={{ width: '100%', padding: '20px' }}>
          {/* {this.renderColorBar(colorBarData)} */}
          {/* {colorBarData && this.renderColorBar(colorBarData)} */}
          {data.sections.map((section, index) => {
            if (section.section_name === section_name) {
              const maxColumnsForSection = Math.max(
                ...section.testsArr.map((test) => test.ser.length)
              );
  
              return (
                <div
                  key={index}
                  style={{
                    padding: '10px',
                    borderRadius: '5px',
                    border: '2px solid #000000',
                    marginBottom: '10px',
                    backgroundColor: 'white',
                  }}
                >
                  {/* <div style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '10px' }}>
                    {section.section_name}
                  </div> */}
                  {/* {this.renderColorBar(colorBarData)} */}
                  <table
                    style={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      border: '1px solid #f3f2f3',
                    }}
                  >
                    <tbody>
                      {section.testsArr.map((test) => (
                        <tr key={test.test_title}>
                          <td
                            style={{
                              border: '1px solid lightgrey',
                              padding: '10px',
                              backgroundColor: '#F7F7F7',
                              fontWeight: 'bold',
                              textAlign: 'center',
                            }}
                          >
                            {test.test_title.trim()}
                          </td>
                          {test.ser.map((s, sIndex) => (
                            <td
                              key={sIndex}
                              className={`${s.color}-light`}
                              style={{
                                border: '1px solid #f3f2f3',
                                fontWeight: 'bold',
                                padding: '10px',
                                textAlign: 'center',
                              }}
                            >
                              {s.value}
                            </td>
                          ))}
                          {Array.from({ length: maxColumnsForSection - test.ser.length }).map(
                            (_, i) => (
                              <td
                                key={i + test.ser.length}
                                style={{
                                  border: '1px solid #f3f2f3',
                                  padding: '10px',
                                  textAlign: 'center',
                                }}
                              ></td>
                            )
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
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