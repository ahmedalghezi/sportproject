import React, { Component } from 'react';
import '../styleAthleteProfileTables.css';
import PropTypes from 'prop-types';

export const json_data2 = {
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
          {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "yellow"}]},
          {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t2", "ser": [{"value": "8,5", "color": "yellow"}, {"value": "65", "color": "yellow"}]}
        ]
      },
      {
        "section_name": "Genetik",
        "testsArr": [
          {"test_title": "t1", "ser": [{"value": "6,6", "color": "red"}, {"value": "8", "color": "green"}]},
          {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "red"}]},
          {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "yellow"}]},
          {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "yellow"}]},
          {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "yellow"}]},
          {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "yellow"}]},
          {"test_title": "t2", "ser": [{"value": "9,6", "color": "yellow"}, {"value": "70", "color": "yellow"}]}
        ]
      },
      {
        "section_name": "Ziologies",
        "testsArr": [
          {"test_title": "t1", "ser": [{"value": "7,7", "color": "red"}, {"value": "9", "color": "green"}]},
          {"test_title": "t2", "ser": [{"value": "10,7", "color": "yellow"}, {"value": "75", "color": "red"}]}
        ]
      },
      {
        "section_name": "Motorik",
        "testsArr": [
          {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "yellow"}]},
          {"test_title": "t1", "ser": [{"value": "5,5", "color": "red"}, {"value": "7", "color": "red"}]},
          {"test_title": "t2", "ser": [{"value": "8,5", "color": "yellow"}, {"value": "65", "color": "yellow"}]}
        ]
      },
      {
        "section_name": "Kognition",
        "testsArr": [
          {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "red"}]},
          {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "yellow"}]},
          {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "green"}]},
          {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "green"}]},
          {"test_title": "t2", "ser": [{"value": "11,8", "color": "yellow"}, {"value": "80", "color": "red"}]}
        ]
      },
      {
        "section_name": "Motoriko",
        "testsArr": [
          {"test_title": "t1", "ser": [{"value": "4,4", "color": "red"}, {"value": "6", "color": "green"}]},
          {"test_title": "t2", "ser": [{"value": "7,4", "color": "yellow"}, {"value": "60", "color": "green"}]},
          {"test_title": "t1", "ser": [{"value": "4,4", "color": "red"}, {"value": "6", "color": "green"}]},
          {"test_title": "t2", "ser": [{"value": "7,4", "color": "yellow"}, {"value": "60", "color": "red"}]},
          {"test_title": "t3", "ser": [{"value": "17,4", "color": "yellow"}, {"value": "61", "color": "red"}]}
        ]
      },
      {
      "section_name": "INKognition",
      "testsArr": [
        {"test_title": "INKognition12345", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "red"}]},
        {"test_title": "INKognition23243456", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "yellow"}]},
        {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "green"}]},
        {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "green"}]},
        {"test_title": "t2", "ser": [{"value": "11,8", "color": "yellow"}, {"value": "80", "color": "red"}]}
      ]
    },
    {
      "section_name": "NoZiologies",
      "testsArr": [
        {"test_title": "t1", "ser": [{"value": "4,4", "color": "red"}, {"value": "6", "color": "green"}]},
        {"test_title": "t2", "ser": [{"value": "7,4", "color": "yellow"}, {"value": "60", "color": "green"}]},
        {"test_title": "t1", "ser": [{"value": "4,4", "color": "red"}, {"value": "6", "color": "green"}]},
        {"test_title": "t2", "ser": [{"value": "7,4", "color": "yellow"}, {"value": "60", "color": "red"}]},
        {"test_title": "t3", "ser": [{"value": "17,4", "color": "yellow"}, {"value": "61", "color": "red"}]}
      ]
    },
      {
        "section_name": "Soziologie",
        "testsArr": [
          {"test_title": "INKognition12345", "ser": [{"value": "7,7", "color": "red"}, {"value": "9", "color": "green"}]},
          {"test_title": "INKognition123453456", "ser": [{"value": "10,7", "color": "yellow"}, {"value": "75", "color": "red"}]}
        ]
      }
    ]
  };



export const json_data = {"sections":[{"section_name":"Anthropometrie","testsArr":[{"test_title":"BMI [kg/m²]","ser":[{"value":"23.5","color":"white"}]},{"test_title":"Körpergewicht [kg]","ser":[{"value":"95.0","color":"white"}]},{"test_title":"Sitzhöhe [cm]","ser":[{"value":"117.2","color":"white"}]},{"test_title":"Fußlänge (links/rechts) [cm]","ser":[{"value":"24/24","color":"white"}]},{"test_title":"Körpergröße [cm]","ser":[{"value":"178.8","color":"white"}]},{"test_title":"Kniehöhe [cm]","ser":[{"value":"55.7","color":"white"}]},{"test_title":"Reichhöhe im Stehen [cm]","ser":[{"value":"242.9","color":"white"}]},{"test_title":"Armspannweite [cm]","ser":[{"value":"206.0","color":"white"}]},{"test_title":"Handspanne (links/rechts) [cm]","ser":[{"value":"","color":""}]}]},{"section_name":"Blutanalyse","testsArr":[{"test_title":"Vitamin D","ser":[{"value":"32","color":"yellow"}]},{"test_title":"Eisen","ser":[{"value":"37.1","color":"green"}]}]},{"section_name":"Ernährung","testsArr":[{"test_title":"Proteine","ser":[{"value":"180.5","color":"green"}]},{"test_title":"Fette","ser":[{"value":"81.4","color":"red"}]},{"test_title":"Kohlenhydrate","ser":[{"value":"38.1","color":"red"}]},{"test_title":"Ballaststoffe","ser":[{"value":"24.4","color":"red"}]},{"test_title":"Energieaufnahme","ser":[{"value":"67.8","color":"red"}]}]},{"section_name":"Kognition","testsArr":[{"test_title":"Motorische Inhibition [ms]","ser":[{"value":"215.1","color":"green"}]},{"test_title":"Informationsverarbeitungsgeschwindigkeit (ZVT_SW)","ser":[{"value":"144.8","color":"green"}]},{"test_title":"Arbeitstempo (d2-R)","ser":[{"value":"96.6","color":"green"}]},{"test_title":"Fehlerrate (d2-R, SW)","ser":[{"value":"93.4","color":"green"}]},{"test_title":"Konzentration (d2-R, SW)","ser":[{"value":"112.3","color":"green"}]}]},{"section_name":"Mikrobiom","testsArr":[{"test_title":"a-Diversität (Shannon - Index)","ser":[{"value":"4.5","color":"green"}]}]},{"section_name":"Motorik","testsArr":[{"test_title":"Rumpfkraft relativ (ext./flex.) [N/kg]","ser":[{"value":"3.6","color":"green"}]},{"test_title":"Griffkraft relativ (links/rechts) [N/kg]","ser":[{"value":"3.7","color":"yellow"}]},{"test_title":"Jump & Reach (absolut/relativ) [cm]","ser":[{"value":"355.4","color":"red"}]},{"test_title":"Block Jump (links/rechts) [cm]","ser":[{"value":"54.6","color":"red"}]},{"test_title":"Counter Movement Jump [cm]","ser":[{"value":"44.0","color":"yellow"}]},{"test_title":"Drop Jump (RSI beidbeinig) [m/s]","ser":[{"value":"1.6","color":"green"}]},{"test_title":"Sprint frontal (5/10m) [s]","ser":[{"value":"1.0","color":"yellow"}]},{"test_title":"Sprint lateral links (5/10m) [s]","ser":[{"value":"0.8","color":"green"}]},{"test_title":"Sprint lateral rechts (5/10m) [s]","ser":[{"value":"0.9","color":"green"}]},{"test_title":"Sprint rückwärts (5/10m) [s]","ser":[{"value":"1.1","color":"green"}]},{"test_title":"Richtungswechsel [s]","ser":[{"value":"7.8","color":"green"}]},{"test_title":"Tapping [Hz]","ser":[{"value":"10.9","color":"green"}]},{"test_title":"Mot. Kosten Tapping (Zahlen/Farben) [Hz]","ser":[{"value":"1.6","color":"green"}]},{"test_title":"Sprunggelenksbeweglichkeit (links/rechts) [cm]","ser":[{"value":"9.4","color":"green"}]},{"test_title":"Y-Balance (Gesamtscore links/rechts)","ser":[{"value":"85.1","color":"green"}]},{"test_title":"Medizinballwurf (links/rechts/OH) [m]","ser":[{"value":"11.1","color":"green"}]},{"test_title":"Druckkraft relativ (Verlagerung links/50-50/rechts) [N/kg]","ser":[{"value":"2.8","color":"green"}]}]},{"section_name":"Psychosoziale Faktoren","testsArr":[{"test_title":"Stress","ser":[{"value":"","color":"green"}]},{"test_title":"Finanzielle Unsicherheit","ser":[{"value":"","color":"yellow"}]},{"test_title":"Kritische Lebensereignisse","ser":[{"value":"","color":"red"}]},{"test_title":"Angst","ser":[{"value":"","color":"red"}]},{"test_title":"Sportbezogene Unzufriedenheit","ser":[{"value":"","color":"green"}]},{"test_title":"Soziale Unterstützung","ser":[{"value":"","color":"yellow"}]},{"test_title":"Drop-Out-Gedanken","ser":[{"value":"","color":"red"}]}]}]};
  export default class AthleteProfileTable extends Component {
    static defaultProps = {
      data: json_data,
      section_name: ''
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


    render() {
      const { data, section_name} = this.props;

      // const colorBarData = data.sections
      //   .filter((section) => section.section_name === section_name)
      //   .map((section) =>
      //     section.testsArr.map((test) => test.ser[test.ser.length - 1].color)
      //   )
      //   .flat();


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
