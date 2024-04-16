// ColorBar.js
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
          {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "yellow"}]},
          {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "green"}]},
          {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "green"}]},
          {"test_title": "t2", "ser": [{"value": "11,8", "color": "yellow"}, {"value": "80", "color": "red"}]}
        ]
      },
      {
        "section_name": "Motorik",
        "testsArr": [
          {"test_title": "t1", "ser": [{"value": "8,8", "color": "red"}, {"value": "10", "color": "green"}, {"value": "80", "color": "red"}]},
          {"test_title": "t2", "ser": [{"value": "11,8", "color": "yellow"}, {"value": "80", "color": "green"}, {"value": "80", "color": "yellow"},]}
        ]
      }
    ]
  };


  class ColorBar extends Component {
    static defaultProps = {
      data: {},
    };


    // calculateLastColors(sectionName) {
    //   const { data } = this.props;
    //   try {
    //       const section = data.sections.find(
    //           (s) => s.section_name === sectionName);

    //       if (section && section.testsArr.length > 0) {
    //           const lastColors = section.testsArr.map((test) =>
    //               test.ser[test.ser.length - 1].color
    //           );

    //           return lastColors;
    //       }
    //   }catch (e) {
    //       console.log(e)
    //   }

    //   return [];
    // }

    calculateLastColors(sectionName) {
      const { data } = this.props;
      try {
          const section = data.sections.find(
              (s) => s.section_name === sectionName
          );
  
          if (section && section.testsArr.length > 0) {
              const lastColors = section.testsArr.map((test) => {
                  const lastSer = test.ser[test.ser.length - 1];
                  // console.log("lastSer : ", lastSer)
                  // console.log("IF lastSer.color : ", lastSer.color)
                  return lastSer.color && lastSer.color.toLowerCase() !== "white" ? lastSer.color : "grey";

              });
              console.log("Out lastColors : ", lastColors)
              return lastColors;
          }
      } catch (e) {
          console.log(e);
      }
  
      return [];
  }

    render() {
      const { sectionName } = this.props;
      console.log("sectionName : ", sectionName)
      const lastColors = this.calculateLastColors(sectionName);
      console.log("lastColors : ", lastColors)

      if (!lastColors || lastColors.length === 0) {
        // Return null or an empty div when data is not available
        return null;
      }

      const rectWidth = 20;
      const overlap = 0.1;
      const lineWidth = 0.5;

      const totalWidth =
        (lastColors.length - 1) * (rectWidth - overlap * rectWidth) + rectWidth;

      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '5px',
            height: '10px',
            overflow: 'hidden',
            borderRadius: '15px',
            background: 'white',
          }}
        >
          {lastColors.map((color, index) => (
            <div
              key={index}
              className={`${color}-light`}
              style={{
                width: `${rectWidth}px`,
                height: '100%',
                marginLeft: index === 0 ? 0 : `-${overlap * rectWidth}px`,
                borderRadius:
                  index === 0
                    ? '15px 0 0 15px'
                    : index === lastColors.length - 1
                    ? '0 15px 15px 0'
                    : '0',
                position: 'relative',
              }}
            >
              {index > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: `-${lineWidth / 2}px`,
                    width: `${lineWidth}px`,
                    height: '100%',
                    background: 'white',
                  }}
                ></div>
              )}
            </div>
          ))}
          <div
            style={{
              width: `${totalWidth}px`,
              height: '100%',
              position: 'absolute',
            }}
          ></div>
        </div>
      );
    }
  }

  ColorBar.propTypes = {
    data: PropTypes.object.isRequired,
    sectionName: PropTypes.string.isRequired,
  };

  export default ColorBar;
