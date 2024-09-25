import React, { Component } from 'react';
import '../styleAthleteProfileTables.css';
import PropTypes from 'prop-types';

class ColorBar extends Component {
  static defaultProps = {
    data: [],
    sectionName: '',
  };

  extractColors(data, sectionName) {
    const section = data.sections.find(sec => sec.section_name === sectionName);
    if (!section) return [];

    // const validColors = ['red', 'yellow', 'green', 'grey'];

    const colors = section.testsArr.map(testArr => {
      if (testArr.length === 0) return 'grey-light';

      const lastTest = testArr[0];
      const lastSer = lastTest.ser[lastTest.ser.length - 1];
      // console.log('lastSer:', lastSer);
      // console.log('lastSer.color:', lastSer.color);

      // const color = lastSer && lastSer.color ? lastSer.color.trim().toLowerCase() : null;
      // console.log('color:', color);


      // Return 'grey-light' for null, undefined, or any color that is not red, yellow, green, or grey
    //   if (!color || !validColors.includes(color)) {
    //     console.log('GREY:');
    //     return 'white-light';
    //   }
    //   console.log('color:', color);
    //   return `${color}-light`;
    // });

      if (!lastSer || !lastSer.color || lastSer.color.toLowerCase() === 'white') {
        // console.log('Condition lastSer.color:', lastSer.color);
        return 'grey-light';
      }

      return `${lastSer.color.toLowerCase()}-light`;
    });

    // console.log('colors : ' , colors)
    
    return colors;
  }

  render() {
    const { data, sectionName } = this.props;
    const lastColors = this.extractColors(data, sectionName);

    if (!lastColors || lastColors.length === 0) {
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
            className={color}
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