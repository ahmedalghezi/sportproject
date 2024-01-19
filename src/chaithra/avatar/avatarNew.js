/*
By Chaithra,Prerna
 */

import React, { Component, useEffect } from "react";
import { useSpring, animated, config } from 'react-spring';
import { color } from "@mui/system";
import '../../prerna/avatar.css';
import runner from './runner.png';
// import myImage from './myImage.png'
import { getElement } from "bootstrap/js/src/util";
import { th } from "date-fns/locale";
import AthleteProfileTable, { json_data } from '../../prerna/fileUpload/athleteProfileTable';
import ColorBar from "../../prerna/fileUpload/colorBar";
import ProfilePictureUpload from '../../prerna/fileUpload/profilePicture';
import { X } from "@mui/icons-material";
import AvatarEditor from 'react-avatar-editor';
import HandelTrainer from "../../DB/handelTrainer";
import PostSignup from "../../DB/postSignup";
import CoachInputDataService from "../../DB/rw";
import withTransition from "./withTransition"
import CircleWithAnimation from "./CircleWithAnimation";
import SpanWithAnimation from './SpanWithAnimation';
import withCombinedAnimation from './withCombinedAnimation';

<AthleteProfileTable data={json_data} />

const testdata = [
    { id: 1, title: "Blutanalyse", text: "text text text", parameter: [{id: 1, title: "Vit D", value: 0.1}, {id: 2,title: "weiter", value: 0.9}]},
    { id: 2,title: "Mikrobiom", text: "text text texttext text texttext text texttext text texttext text texttext text texttext text text", parameter: [{id: 3,title: "", value: 0.5}]},
    { id: 3,title: "Genetik", text: "text text text", parameter: [{id: 4,title: "", value: 0.1}]},
    { id: 4,title: "Soziologie", text: "text text text text text texttext text texttext text texttext text texttext text texttext text text", parameter: [{id: 5, title: "chronischer Stress", value: 0.1}, {id: 6,title: "Drop-Out", value: 0.9}]},
    { id: 5,title: "Motoriko", text: "text text text ", parameter: [{id: 7,title: "Y-Balance", value: 0.1}]},
    { id: 6,title: "Motorik", text: "text text texttext text texttext text texttext text texttext text texttext text texttext text text ", parameter: [{id: 8,title: "", value: 0.1}]},
    { id: 7,title: "Kognition", text: "text text text ", parameter: [{id: 9,title: "", value: 0.1}, {id: 10, title: "Drop-Out", value: 0.9}]},
    { id: 8,title: "Ziologies", text: "text text texttext text texttext text text ", parameter: [{id: 11, title: "", value: 0.1}]}
];

class Avatar extends React.Component {

    constructor(props) {
        super(props);
        this.state =  {
            selectedSection: null,
            avatarlist: testdata,
            sectionData: null,
            selectedItemIndex: null,
            tableHeight: 0,
            springProps: { height: 0 },
            showProfileUpload: false,
            uploadedFileName: null,
            avatarImage: null,
            loggedIn: false,
            tableOpacity: 0,
            };
        this.tableRef = React.createRef();
        this.getData = this.getData.bind(this);
        this.drawhorizontalLines = this.drawhorizontalLines.bind(this);
        this.drawiconLines = this.drawiconLines.bind(this);
        this.drawiconCircles = this.drawiconCircles.bind(this);
        this.setBoundingSVG = this.setBoundingSVG.bind(this);
        this.setColumnGap = this.setColumnGap.bind(this);
        this.drawCircle = this.drawCircle.bind(this);
        this.drawImageIcon = this.drawImageIcon.bind(this);
        this.calculateTablePosition = this.calculateTablePosition.bind(this);
        this.handleTableHeight = this.handleTableHeight.bind(this);
        this.handleHover = this.handleHover.bind(this);
        this.calculateAvatarListHeight=this.calculateAvatarListHeight.bind(this);
        // this.saveImageToLocal = this.saveImageToLocal.bind(this);
    }

      handleHover = (section, index, isMouseEnter) => {
        const selectedSectionName = section.title;
        const tableTopPosition = this.calculateTablePosition(`text${index}`, index);
        const isSameIndex = this.state.selectedItemIndex === index;
        const newSelectedItemIndex = isSameIndex ? null : index;

         this.setState({
            selectedSection: isMouseEnter ? selectedSectionName : null,
            sectionData: isMouseEnter ? section : null,
            selectedItemIndex: newSelectedItemIndex,
            tableTopPosition: isMouseEnter ? tableTopPosition : 0,
            expandedTableIndex: isSameIndex ? null : index,
        },
        () => {
        this.props.onTransition();
      }
    );
  };

    checkLoginStatus = () => {
        PostSignup.isLogin()
          .then((response) => {
            if (response.data.res === 'ok') {
              this.setState({ loggedIn: true });
            } else {
              this.setState({ loggedIn: false });
            }
          })
          .catch((error) => {
            console.error('Error checking login status:', error);
          });
      };

    handleSelectImage = () => {
        if (!this.state.loggedIn) {
          console.log('User not logged in. Please log in to upload a profile picture.');
          return;
        }
         this.setState({ showProfileUpload: true});
      };
      
      receiveFileName = (filename) => {
        this.setState({ uploadedFileName: filename, showProfileUpload: false }, () => {
          this.checkImageIcon();
        });
      };

    calculateTablePosition(sectionId, index) {
        const sectionTitleElement = document.getElementById(sectionId);
        const container = document.getElementById("avatargallery");
        const titleRect = sectionTitleElement.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const titleTop = titleRect.top - containerRect.top;
        const titleBottom = titleRect.bottom - containerRect.top;
        const containerHeight = containerRect.height;
        let tableTop = 0;
        const topThreshold = containerHeight / 4;
        const bottomThreshold = (3 * containerHeight) / 4;
        if (index < 2) {
            tableTop = (titleBottom-titleTop)/16;
        } 
        else if (index >= this.state.avatarlist.length - 2) {

            tableTop = (bottomThreshold - titleBottom) + (titleTop-titleBottom)
            if(Math.abs(tableTop)> this.state.tableHeight)
            {
                tableTop = 0
            }  
        }
        else 
        {   
            tableTop = (titleTop-titleBottom)
        }
        return tableTop;
    }
    
    // Function to handle table height calculation
    handleTableHeight = (height) => {
        if (this.state.tableHeight !== height) {
            this.setState({ tableHeight: height });
        }
    };

    checkImageIcon() {
        const imageIcon = this.drawImageIcon();
      }

    componentDidMount() {
        this.getData();
        this.setBoundingSVG();
        const lastTableIndex = this.state.avatarlist.length - 1;
        this.handleHover(this.state.avatarlist[lastTableIndex], lastTableIndex);
        this.checkImageIcon();
        this.checkLoginStatus();
    }

    componentDidUpdate() {
        if (this.tableRef.current && this.state.tableHeight === 0) {
            const height = this.tableRef.current.getBoundingClientRect().height;
            this.setState({ tableHeight: height });
        }
    }

    setBoundingSVG(){
        if(!document.getElementById("avatargallery")){
            var gal = {height: "1000px", width: "1100px"}
        }else{
            var gal = document.getElementById("avatargallery").getBoundingClientRect();
        }
        return {height: gal.height, width: gal.width};
    }
    setColumnGap(){
        if(!document.getElementById("avatargallery")){
            var columngap = {gap: 20}
        }else{
            var el = document.getElementById("avatargallery").getBoundingClientRect();
            columngap =  {gap: el.width - 535}
        }
        return {gap: columngap.gap};
    }
    getData(){
        this.setState({avatarlist: testdata});
        CoachInputDataService.getAll().then(response => {
            if(response.data.res === "error") {
                const arr = ["connection error"];
                this.setState({videoList: arr});
                return;
            }
            if(response.data.res === "error"){
                alert("Bitte erst anmelden.");
                return;
            }
            if(response.data.res === "ok") {
                // this.setState({videoList: response.data.videoList});
                this.setState({avatarlist: json_data.sections});
            }

        }).catch(e => {
            this.setState({avatarlist: testdata});
            alert("Es ist ein Fehler aufgetreten!");
        });
    }

    drawhorizontalLines(element, index) {
        var x1Position = 0;
        var x2Position = 0;
        var yPosition = 0;
        if(element === null){
            x1Position = 0;
            x2Position = 0
            yPosition = 0;
        }
        else{
            var con = element.getBoundingClientRect();
            var gal = document.getElementById("avatargallery").getBoundingClientRect();
            yPosition = con.y - gal.y + con.height/2 - 10
            if(con.x - gal.x < gal.width/2){
                x1Position = con.x - gal.x + con.width - 12;
                x2Position = con.x - gal.x + con.width + 20;
            }else{
                x2Position = con.x - gal.x;
                x1Position = con.x - gal.x - 40;
            }
        }
        return <animated.line
        x1={x1Position}
        y1={yPosition}
        x2={x2Position}
        y2={yPosition}
        stroke="black"
         style={{
        opacity: this.state.transitionProps?.height?.interpolate((value) => (value ? value / 1000 : 1)),
      }}
        />;
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
            var y = con.y - gal.y + con.height/2 -10
            if(con.x - gal.x < gal.width/2){
                var x = con.x - gal.x + con.width + 20
            }else{
                var x = con.x - gal.x - 40
            }
            var pyth = Math.sqrt(Math.pow(x-gal.width/2, 2) + Math.pow(y - (gal.height/2-200), 2))
            cxPosition = Math.abs(x-gal.width/2)*82/pyth
            cyPosition = Math.sqrt(Math.pow(82, 2) - Math.pow(cxPosition, 2));
            if(x-gal.width/2 > 0){
                cxPosition = gal.width/2 +  cxPosition
            }else{
                cxPosition = gal.width/2 - cxPosition
            }
            if(y-(gal.height/2-200) > 0){
                cyPosition = gal.height/2-200 +  cyPosition
            }else{
                cyPosition = gal.height/2-200 - cyPosition
            }
        }
         return (
              <CircleWithAnimation
                key={index}
                cx={cxPosition}
                cy={cyPosition}
                r={10}
                stroke="gray"
                fill="gray"
               style={{
                opacity: this.state.transitionProps?.height?.interpolate((value) => (value ? value / 1000 : 1)),
                }}
                />
              );
    }

    drawiconLines(element, index) {
        var x1Position = 0;
        var x2Position = 0;
        var yPosition = 0;
        var relativey = 0;

        // Check if the element is available and if it's the initial load
        if (element === null && this.state.selectedItemIndex !== index) {
            x1Position = 0;
            x2Position = 0;
            yPosition = 0;
            relativey = 0;
        } else {
            var con = element.getBoundingClientRect();
            var gal = document.getElementById("avatargallery").getBoundingClientRect();
            yPosition = con.y - gal.y + con.height / 2 - 10;
    
            if (con.x - gal.x < gal.width / 2) {
                x2Position = con.x - gal.x + con.width + 20;
            } else {
                x2Position = con.x - gal.x - 40;
            }

            x1Position = gal.width / 2;
            relativey = gal.height / 2 - 200;
        }
        
        return <line x1={x1Position} y1={relativey} x2={x2Position} y2={yPosition} stroke="black" />;
    }
    
    drawCircle(r, stroke, fill){
        if(document.getElementById("avatargallery")){
            var gal = document.getElementById("avatargallery").getBoundingClientRect();
            var x = gal.width/2;
            var y = gal.height/2-200;
        }else{
            var x = 0;
            var y = 0;
        }

        return <circle cx={x} cy={y} r={r} stroke={stroke} fill={fill}/>;
    }

    // //  saveImageToLocal = async (imageUrl, filename) => {
    // //     try {
    // //       const response = await fetch(imageUrl);
    // //       const blob = await response.blob();
    // //       const url = window.URL.createObjectURL(blob);
      
    // //       const link = document.createElement('a');
    // //       link.href = url;
    // //       link.setAttribute('download', filename); // Set desired filename
    // //       link.click();
      
    //       // Clean up
    //       window.URL.revokeObjectURL(url);
    //     } catch (error) {
    //       console.error('Error saving image to local:', error);
    //     }
    //   };

    drawImageIcon() {
        const { uploadedFileName } = this.state;
        let imageURL = runner;

        // If uploadedFileName exists, use its URL from the API
        if (uploadedFileName) {

            if(document.getElementById("avatargallery"))
            {
                var gal = document.getElementById("avatargallery").getBoundingClientRect();
                var x = gal.width/2-75;
                var y = gal.height/2-275;
            }
            else
            {
                var x = 0;
                var y = 0;
            }
            const imageURL = `https://inprove-sport.info/files/jYdncTzQdkdPzxnTanxBst/getImage/${uploadedFileName}`;

            return (
                <image
                  x={x}
                  y={y}
                  width="150"
                  height="150"
                  href={imageURL}
                  onLoad={this.handleImageLoad}
                  onError={this.handleImageError}
                ></image>
              );
    }

        else
        {
            if (document.getElementById('avatargallery')) {
                var gal = document.getElementById('avatargallery').getBoundingClientRect();
                var x = gal.width / 2 - 55;
                var y = gal.height / 2 - 260;
           
              } else {
                var x = 0;
                var y = 0;
              }
            return (
                <image
                  x={x}
                  y={y}
                  width="120"
                  height="120"
                  href={imageURL}
                  onLoad={this.handleImageLoad}
                  onError={this.handleImageError}
                ></image>
              );
        }
      };

    calculateAvatarListHeight() {
        const avatarItems = document.querySelectorAll('.avatar-all-content'); 
        let totalHeight = 0;
    
        avatarItems.forEach((item) => {
            totalHeight += item.getBoundingClientRect().height;
        });
        return totalHeight;
    }
    
    render() {
        const { isBoxClicked, showProfileUpload } = this.state;
        const { textAnimationProps, tableAnimationProps } = this.props;
        if (!this.state.avatarlist || this.state.avatarlist.length === 0) {
            return (
                <div>
                    <div className="avatargallery" id="avatargallery" >
                        <p>Loading...</p>
                    </div>
                </div>
            );
        }
        const uniqueTitles = [...new Set(this.state.avatarlist.map(item => item.title))];
        const containerHeight = 800;
        const avatarListHeight = this.calculateAvatarListHeight();
        const totalTitles = uniqueTitles.length;
        const midPoint = Math.ceil(totalTitles / 2);
        const rowGap = 2*(containerHeight - avatarListHeight) / totalTitles;
        require("../../prerna/avatar.css");

        return (
            <div>   
                <button onClick={this.handleSelectImage}>Upload Profile Picture</button>

                {showProfileUpload && (
                <ProfilePictureUpload onFileName={this.receiveFileName} 
                onRedirect={this.handleRedirect}
                />
                )}
        
                <div className="avatargallery" id="avatargallery" style={{ columnGap: this.setColumnGap().gap + 'px', height: '1000px'}}>

                    <div className="avatar-inner">
                        <div className="avatar-line-container">
                            <svg className="avatar-svg" style={{ ...{ width: this.setBoundingSVG().width }, ...{ height: this.setBoundingSVG().height } }}>
                                {
                                    this.state.avatarlist.map((item, index) => {
                                        return (
                                            this.drawhorizontalLines(document.getElementById("text" + String(index)), index)
                                        );
                                    })
                                }
                                {
                                    this.state.avatarlist.map((item, index) => {
                                        return (
                                            this.drawiconLines(document.getElementById("text" + String(index)), index)
                                        );
                                    })
                                }
                                {this.drawCircle(82, "black", "none")}
                                {this.drawCircle(75, "#DAD2D2", "#DAD2D2")}
                                {this.drawImageIcon()}
                                
                                {
                                    this.state.avatarlist.map((item, index) => {
                                        return (
                                            this.drawiconCircles(document.getElementById("text" + String(index)), index)
                                        );
                                    })
                                }
                            </svg>
                        </div>
                        </div>

                    {uniqueTitles.map((title, index) => {
                    const color = this.state.selectedItemIndex === index ? 'darkgrey' : 'black';
                    const item = this.state.avatarlist.find((item) => item.title === title);
                    const isEvenIndex = index % 2 === 0;

                const positionStyle = {
                    position: 'relative',
                    textAlign: isEvenIndex ? 'left' : 'right',
                    transform: isEvenIndex ? 'translate(10%,10%)' : 'translate(320%,-110%)',
                };

                return (
                    <div className={`avatar-all-content `} key={index} style={positionStyle}>
                        <div className="avatar-content-section">
                            <animated.span
                                className={`avatar-text-field `}
                                id={"text" + String(index)}
                                onMouseEnter={() => this.handleHover(item, index, true)}
                                onMouseLeave={() => this.handleHover(item, index, false)}
                                style={{
                                cursor: 'pointer',
                                position:'relative',
                                textAlign: 'left'
                                }}
                            >
                            {/* {item.title} */}
                                <SpanWithAnimation style={{ color: color }}>{item.title}</SpanWithAnimation>
                                <ColorBar data={json_data} sectionName={item.title} />

                    {/* Determine table positioning based on title's position visibility: this.state.expandedTableIndex === index ? 'visible' : 'hidden', */}
                    {this.state.selectedItemIndex === index && (
                         <animated.div
                            ref={this.tableRef}
                            className="table-container"
                            style={{
                                position: 'absolute',
                                zIndex: '2',
                                top: `${this.state.tableTopPosition}px`,
                                visibility: this.state.selectedItemIndex === index ? 'visible' : 'hidden',
                                maxHeight: '500px',
                                width: '500px',
                                overflowY: 'auto',
                                border: '0.5px solid #ccc',
                                borderRadius: '0.5px',
                                left: isEvenIndex ? '100%' : 'auto',
                                right: isEvenIndex ? 'auto' : '100%',
                                transform: isEvenIndex ? 'none' :'translateX(0%)',
                            }}
                        >
                                            <AthleteProfileTable
                                                data={json_data}
                                                section_name={this.state.selectedSection}
                                                sectionData={this.state.sectionData}
                                            />
                                       </animated.div>
                                    )}
                                </animated.span>
                            </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default withCombinedAnimation(Avatar);