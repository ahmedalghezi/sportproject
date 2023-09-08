import React, { Component } from 'react';
import '../styleAthleteProfileTables.css'


const json_data = {
  "sections": [
    {
      "section_name": "section1",
      "testsArr": [
        {"test_title": "t1", "ser": [{"value": "4,4", "color": "red"}, {"value": "6", "color": "green"}]},
        {"test_title": "t2", "ser": [{"value": "7,4", "color": "yellow"}, {"value": "60", "color": "green"}]},
        {"test_title": "t1", "ser": [{"value": "4,4", "color": "red"}, {"value": "6", "color": "green"}]},
        {"test_title": "t2", "ser": [{"value": "7,4", "color": "yellow"}, {"value": "60", "color": "green"}]},
        {"test_title": "t3", "ser": [{"value": "17,4", "color": "yellow"}, {"value": "61", "color": "green"}]}
      ]
    },
    {
      "section_name": "section2",
      "testsArr": [
        {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "green"}]},
        {"test_title": "t2", "ser": [{"value": "8,5", "color": "yellow"}, {"value": "65", "color": "green"}]}
      ]
    },
    {
      "section_name": "section3",
      "testsArr": [
        {"test_title": "t1", "ser": [{"value": "6,6", "color": "red"}, {"value": "8", "color": "green"}]},
        {"test_title": "t2", "ser": [{"value": "9,6", "color": "yellow"}, {"value": "70", "color": "green"}]}
      ]
    },
    {
      "section_name": "section4",
      "testsArr": [
        {"test_title": "t1", "ser": [{"value": "7,7", "color": "red"}, {"value": "9", "color": "green"}]},
        {"test_title": "t2", "ser": [{"value": "10,7", "color": "yellow"}, {"value": "75", "color": "green"}]}
      ]
    },
    {
      "section_name": "section5",
      "testsArr": [
        {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "green"}]},
        {"test_title": "t2", "ser": [{"value": "11,8", "color": "yellow"}, {"value": "80", "color": "green"}]}
      ]
    },
    {
      "section_name": "section7",
      "testsArr": [
        {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "green"}, {"value": "80", "color": "yellow"}]},
        {"test_title": "t2", "ser": [{"value": "11,8", "color": "yellow"}, {"value": "80", "color": "green"}, {"value": "80", "color": "yellow"},]}
      ]
    },
    {
      "section_name": "section6",
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

// import React, { Component } from 'react'; 

export default class AthleteProfileTable extends Component {
    static defaultProps = {
        data: json_data
    };

    constructor(props) {
        super(props);
        this.state = {
            expandedSection: null
        };
    }

    toggleSection = (sectionIndex) => {
        this.setState({ expandedSection: sectionIndex !== this.state.expandedSection ? sectionIndex : null });
    };

    computeTableWidth(section) {
        const TEST_TITLE_WIDTH = 100; 
        const SER_ITEM_WIDTH = 50;  

        const totalSerItems = section.testsArr[0].ser.length;
        return TEST_TITLE_WIDTH + (totalSerItems * SER_ITEM_WIDTH) + 'px';
    }

    render() {
      const sections = this.props.data.sections;
  
      return (
          <div style={{ width: '100%', padding: '20px'}}>
              {sections.map((section, index) => {
                
                  const maxColumnsForSection = Math.max(...section.testsArr.map(test => test.ser.length));
  
                  return (
                      <div 
                          key={index}
                          onClick={() => this.toggleSection(index)}
                          style={{ 
                              padding: '10px',
                              borderRadius: '5px', 
                              border: this.state.expandedSection === index ? '2px solid #000000' : 'none',
                              marginBottom: '10px',
                              backgroundColor: 'white'
                          }}
                      >
                          <div style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '10px' }}>
                              {section.section_name}
                          </div>
                          {this.state.expandedSection === index &&
                              <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #f3f2f3' }}>
                                  <tbody>
                                      {section.testsArr.map(test => (
                                          <tr key={test.test_title}>
                                              <td style={{
                                                  border: '1px solid lightgrey', 
                                                  padding: '10px', 
                                                  backgroundColor: '#F7F7F7', 
                                                  fontWeight: 'bold',
                                                  textAlign: 'center'
                                              }}>
                                                  {test.test_title.trim()}
                                              </td>
                                              {test.ser.map((s, sIndex) => (
                                                  <td 
                                                      key={sIndex}
                                                      className={`${s.color}-light`} 
                                                      style={{ 
                                                          // backgroundColor: s.color, 
                                                          border: '1px solid #f3f2f3',
                                                          fontWeight: 'bold',
                                                          padding: '10px',
                                                          textAlign: 'center'
                                                      }}
                                                  >
                                                      {s.value}
                                                  </td>
                                              ))}
                                              
                                              {Array.from({ length: maxColumnsForSection - test.ser.length }).map((_, i) => (
                                                  <td 
                                                      key={i + test.ser.length} 
                                                      style={{
                                                          border: '1px solid #f3f2f3',
                                                          padding: '10px',
                                                          textAlign: 'center'
                                                      }}
                                                  ></td>
                                              ))}
                                          </tr>
                                      ))}
                                  </tbody>
                              </table>
                          }
                      </div>
                  );
              })}
          </div>
      );
  }
}    