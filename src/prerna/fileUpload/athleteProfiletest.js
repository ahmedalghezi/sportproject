// With profile page styling 
import React, { Component } from 'react';


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


export default class AthleteProfile extends Component {
    static defaultProps = {
        data: json_data  // Setting the default prop value
      };  
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      expandedSection: null
    };
    this.drawiconLines = this.drawiconLines.bind(this);
    this.drawiconCircles = this.drawiconCircles.bind(this);
    this.setBoundingSVG = this.setBoundingSVG.bind(this);
    this.setColumnGap = this.setColumnGap.bind(this);
    this.drawCircle = this.drawCircle.bind(this);
    this.drawTableLines = this.drawTableLines.bind(this);
    this.getPosition = this.getPosition.bind(this);
  }

  toggleSection = (sectionIndex) => {
    this.setState({ expandedSection: sectionIndex !== this.state.expandedSection ? sectionIndex : null });
  };
  

  drawCircle(r, stroke, fill) {
    const gal = this.setBoundingSVG();
    const x = gal.width / 2;
    const y = gal.height / 2;
    return <circle cx={x} cy={y} r={r} stroke={stroke} fill={fill} />;
  }

  drawiconCircles(element, index) {
    var cxPosition = 0;
    var cyPosition = 0;
    if(element === null){
      cxPosition = 0;
      cyPosition = 0
    }else{
      var con = element.getBoundingClientRect();
      var gal = document.getElementById("avatargallery").getBoundingClientRect();
      var y = con.y - gal.y + con.height/2 - 10
      if(con.x - gal.x < gal.width/2){
        var x = con.x - gal.x + con.width + 20
      }else{
        var x = con.x - gal.x - 40
      }
      var pyth = Math.sqrt(Math.pow(x-gal.width/2, 2) + Math.pow(y - gal.height/2, 2))
      cxPosition = Math.abs(x-gal.width/2)*82/pyth
      cyPosition = Math.sqrt(Math.pow(82, 2) - Math.pow(cxPosition, 2))
      if(x-gal.width/2 > 0){
        cxPosition = gal.width/2 +  cxPosition
      }else{
        cxPosition = gal.width/2 - cxPosition
      }
      if(y-gal.height/2 > 0){
        cyPosition = gal.height/2 +  cyPosition
      }else{
        cyPosition = gal.height/2 - cyPosition
      }
    } 
    return <circle cx={cxPosition} cy={cyPosition} r="10" stroke="gray" fill="gray"/>;
    }

  drawiconLines(element, index) {
    var x1Position = 0;
    var x2Position = 0;
    var yPosition = 0;
    var relativey = 0;
    if(element === null){
      x1Position = 0;
      x2Position = 0
      yPosition = 0;
      relativey = 0;
    }else{
      var con = element.getBoundingClientRect();
      var gal = document.getElementById("avatargallery").getBoundingClientRect();
      yPosition = con.y - gal.y + con.height/2 - 10
      if(con.x - gal.x < gal.width/2){
        x2Position = con.x - gal.x + con.width + 20;
      }else{ 
        x2Position = con.x - gal.x - 40;
      }
      x1Position = gal.width/2;
      relativey = gal.height/2;
    }
    return <line x1={x1Position} y1={relativey} x2={x2Position} y2={yPosition} stroke="black"/>;
    }

  getPosition(index, total) {
    const gal = this.setBoundingSVG();
    const angle = (index / total) * 2 * Math.PI;
    // const distanceFromCenter = 400;  // Adjust this as needed to place the tables further or nearer to the center.
    const distanceFromCenter = Math.min(gal.width, gal.height) / 2 - 70;
    const x = gal.width / 2 + distanceFromCenter * Math.cos(angle) - 50; // "-50" adjusts for half the width of a table so they center on the calculated point
    const y = gal.height / 2 + distanceFromCenter * Math.sin(angle) - 25; // "-25" adjusts for half the height of a table.
    return { x, y };
  }

  drawTableLines(index, total) {
    const { x, y } = this.getPosition(index, total);
    const gal = this.setBoundingSVG();
    const midX = gal.width / 2;
    const midY = gal.height / 2;
    const radius = 82;

    // Calculate intersection point on the circle boundary
    const angle = Math.atan2(y - midY, x - midX);
    const boundaryX = midX + radius * Math.cos(angle);
    const boundaryY = midY + radius * Math.sin(angle);

    return (
      <React.Fragment>
        {/* Line segment inside the circle - invisible */}
        <line x1={midX} y1={midY} x2={boundaryX} y2={boundaryY} stroke="none" />
        
        {/* Line segment outside the circle - visible */}
        <line x1={boundaryX} y1={boundaryY} x2={x + 50} y2={y} stroke="black" />
      </React.Fragment>
    );
}

  
  setBoundingSVG() {
    return { width: 1000, height: 800 };
  }

  setColumnGap(){
    if(!document.getElementById("avatargallery")){
      var columngap = {gap: 300}
    }else{
      var el = document.getElementById("avatargallery").getBoundingClientRect();
      columngap =  {gap: el.width - 535}
    }
    return {gap: columngap.gap};
  }

  computeTableWidth(section) {
    const TEST_TITLE_WIDTH = 100; 
    const SER_ITEM_WIDTH = 50;

    const totalSerItems = section.testsArr[0].ser.length;
    return TEST_TITLE_WIDTH + (totalSerItems * SER_ITEM_WIDTH) + 'px';
}

  render() {
    const gal = this.setBoundingSVG();
    const sections = this.state.data.sections;
    const expandedSection = this.state.expandedSection;
    const MAX_TABLE_HEIGHT = 150;

    return (
        <div style={{ ...gal, position: 'relative', backgroundColor: 'lightgrey', width:'100%',height: '100%',overflowY: 'auto'}}>
            <svg width={gal.width} height={gal.height}>
                {this.drawCircle(82, 'gray', 'none')}
                {sections.map((section, index) => (
                    <React.Fragment key={index}>
                        {this.drawTableLines(index, sections.length)}
                        <foreignObject 
                            x={this.getPosition(index, sections.length).x} 
                            y={this.getPosition(index, sections.length).y} 
                            width="200" 
                            height={(expandedSection === index ? (section.testsArr.length + 1) : 1) * 30} 
                        >
                            <div 
                                onClick={() => this.toggleSection(index)} 
                                style={{ 
                                    backgroundColor: 'white', 
                                    // border: expandedSection === index ? '2px solid black' : '1px solid #ccc',
                                    borderRadius: '5px', 
                                    overflow: 'hidden', 
                                    zIndex: expandedSection === index ? 2 : 1,
                                    maxHeight: MAX_TABLE_HEIGHT,
                                    overflowY: 'scroll',
                                    borderSpacing: '0 10px',
                                    width: this.computeTableWidth(section)
                                    // borderBottom: expandedSection === index ? '2px solid black' : '1px solid #ccc'
                                }}
                            >
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr>
                                            <th colSpan={2 + section.testsArr[0].ser.length} style={{ background: '#eee', textAlign: 'center' }}>
                                                {section.section_name}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {expandedSection === index && section.testsArr.map(test => (
                                            <tr key={test.test_title}>
                                                <td style={{ border: '1px solid #ccc', padding: '5px' }}>{test.test_title}</td>
                                                {test.ser.map((s, sIndex) => (
                                                    <td 
                                                        key={sIndex} 
                                                        style={{ 
                                                            backgroundColor: s.color, 
                                                            color: 'black',
                                                            border: '1px solid #ccc', 
                                                            padding: '5px' 
                                                        }}
                                                    >
                                                        {s.value}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </foreignObject>
                    </React.Fragment>
                ))}
            </svg>
        </div>
    );
}
}
          
