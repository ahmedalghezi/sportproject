/*
By Chaithra,Prerna
 */

import React, { Component, useEffect } from "react";
import { useSpring, animated, config } from 'react-spring';
import { color } from "@mui/system";
import '../avatar/avatar.css';
// import '../../prerna/avatar.css';
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
import axios from 'axios';

{/* <AthleteProfileTable data={json_data} /> */}

const testdata = [
    { id: 5, title: "Blutanalyse", text: "text text text", parameter: [{id: 1, title: "Vit D", value: 0.1}, {id: 2,title: "weiter", value: 0.9}]},
    { id: 2,title: "Mikrobiom", text: "text text texttext text texttext text texttext text texttext text texttext text texttext text text", parameter: [{id: 3,title: "", value: 0.5}]},
    { id: 1,title: "Anthropometrie", text: "text text text", parameter: [{id: 4,title: "", value: 0.1}]},
    { id: 6,title: "Psychosoziale Faktoren", text: "text text text text text texttext text texttext text texttext text texttext text texttext text text", parameter: [{id: 5, title: "chronischer Stress", value: 0.1}, {id: 6,title: "Drop-Out", value: 0.9}]},
    { id: 3,title: "Ernährung", text: "text text text ", parameter: [{id: 7,title: "Y-Balance", value: 0.1}]},
    { id: 4,title: "Motorik", text: "text text texttext text texttext text texttext text texttext text texttext text texttext text text ", parameter: [{id: 8,title: "", value: 0.1}]},
    { id: 7,title: "Kognition", text: "text text text ", parameter: [{id: 9,title: "", value: 0.1}, {id: 10, title: "Drop-Out", value: 0.9}]},
    // { id: 8,title: "Genetik", text: "text text texttext text texttext text text ", parameter: [{id: 11, title: "", value: 0.1}]},
    { id: 9,title: "Kieferfunktion", text: "text text texttext text texttext text text ", parameter: [{id: 11, title: "", value: 0.1}]},
    // { id: 10,title: "Mundgesundheit", text: "text text texttext text texttext text text ", parameter: [{id: 11, title: "", value: 0.1}]}
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
            json_data:null,
            imageURL: null,
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
        // this.calculateAvatarListHeight=this.calculateAvatarListHeight.bind(this);
        this.fetchImage = this.fetchImage.bind(this);
    }

      handleHover = (section, index, isMouseEnter) => {
        const selectedSectionName = section.title;
        const tableTopPosition = this.calculateTablePosition(`text${index}`, index);
        const isSameIndex = this.state.selectedItemIndex === index;
        const newSelectedItemIndex = isSameIndex ? null : index;
        console.log("this.state.tableHeight : ", this.state.tableHeight)
        // console.log("index : ", index)
        // console.log("selectedSectionName : ", selectedSectionName)
        // console.log("tableTopPosition : ", tableTopPosition)
        // console.log("`text${index}` : ", `text${index}`)
         this.setState({
            selectedSection: isMouseEnter ? selectedSectionName : null,
            sectionData: isMouseEnter ? section : null,
            selectedItemIndex: newSelectedItemIndex,
            tableTopPosition: isMouseEnter ? tableTopPosition : 50,
            expandedTableIndex: isSameIndex ? null : index,
        },
        () => {
            this.handleTableHeight(0);
        this.props.onTransition();
      }
    );
    // const selectedSectionName = section.title;
    // const isSameIndex = this.state.selectedItemIndex === index;
    // const newSelectedItemIndex = isSameIndex ? null : index;
    // this.setState(
    //     {
    //         selectedSection: isMouseEnter ? selectedSectionName : null,
    //         sectionData: isMouseEnter ? section : null,
    //         selectedItemIndex: newSelectedItemIndex,
    //         expandedTableIndex: isSameIndex ? null : index,
    //     },
    //     () => {
    //         // After state is updated, call calculateTablePosition
    //         const tableTopPosition = this.calculateTablePosition(`text${index}`, index);
    //         this.props.onTransition();
    //     }
    // );
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
          console.error("User not logged in")
          return;
        }
         this.setState({ showProfileUpload: true});
      };
      

      calculateTablePosition(sectionId, index) {
        const title_size = this.state.avatarlist.length;
        console.log("title_size : ", title_size)
        const sectionTitleElement = document.getElementById(sectionId);
        const container = document.getElementById("avatargallery");
        console.log("container : ", container)
        const titleRect = sectionTitleElement.getBoundingClientRect();
        console.log("titleRect : ", titleRect)
        const containerRect = container.getBoundingClientRect();
        console.log("containerRect : ", containerRect)
        const titleTop = titleRect.top - containerRect.top;
        console.log("titleTop : ", titleTop)
        const titleBottom = titleRect.bottom - containerRect.top;
        console.log("titleBottom : ", titleBottom)
        const containerHeight = containerRect.height;
        console.log("containerHeight : ", containerHeight)
        
        let tableTop = 0;
        const topThreshold = containerHeight / title_size ;
        const bottomThreshold = (3 * containerHeight) / title_size;
    
        const tableHeight= this.state.tableHeight; // Access tableHeight from state
        console.log("tableHeight : ", tableHeight)
    
        if (index < 2) {
            tableTop = titleBottom/title_size;
            console.log("1 index : ", index)
            console.log("1 tableTop : ", tableTop)
        }

        else if ((title_size%2==0  && index < title_size - 2) || (title_size%2!=0  && index < title_size - 1)) 
        {

            if(tableHeight < 270 && containerHeight/2 - tableHeight+40 >= 0)
                {
                    tableTop = -(titleBottom - titleTop) / title_size;
                    console.log("2.1 tableTop : ", tableTop)
                    console.log("2.1 index : ", index)
                }

            else 
                {
                    if (titleTop < containerHeight/2 )
                    {
                        tableTop = titleBottom/title_size;
                        console.log("2.2 tableTop : ", tableTop)
                        console.log("2.2 index : ", index)

                    }
                    
                    else
                    {

                    // tableTop = - ((titleBottom+titleTop+34)/title_size)
                    tableTop = -titleBottom+containerHeight/2;
                    console.log("2.3tableTop : ", tableTop)
                    console.log("2.3 index : ", index)

                    }
                    
                    
                }} 

        else 

        {
            if((containerHeight - titleBottom)< tableHeight )
            {
                // tableTop =  (containerHeight/2 - tableHeight+40 - (titleBottom+titleTop)/title_size)
                // tableTop = -(2*(titleBottom)/title_size)
                // tableTop = -titleBottom/title_size - tableHeight/title_size - titleTop/title_size - (containerHeight - titleBottom)
                // tableTop = (containerHeight/2 + 40 + (containerHeight - titleTop)  - titleTop)
                // tableTop = -tit/title_size;
                // tableTop = - (containerHeight - titleBottom) - (containerHeight/title_size) + 
                if (containerHeight/2 > tableHeight)
                {
                    tableTop = -titleBottom+containerHeight/2 + (containerHeight/2 - tableHeight);
                }
                else{
                    tableTop = -titleBottom+containerHeight/2 - (containerHeight/2 - tableHeight);
                }
                
                console.log("3.1 tableTop : ", tableTop)
                console.log("3.1 index : ", index)
            }
            else{
                tableTop = ((titleBottom - titleTop )/title_size)
                console.log("3.2 tableTop : ", tableTop)
                console.log("3.2 index : ", index)
            }
            
        }






        return tableTop;
    }
    
    handleTableHeight = (height) => {
        if(height>0) {

            this.setState({ tableHeight: height }, () => { // Ensure correct value of tableHeight
                console.log('tableHeight : ', this.state.tableHeight);
            });
            console.log('tableHeight : ', this.state.tableHeight);
        
        }
        
    };

    componentDidUpdate(prevProps, prevState) {
        // Check if tableHeight has been updated
        if (prevState.tableHeight !== this.state.tableHeight) {
            // Recalculate table position with the updated tableHeight
            const newTableTopPosition = this.calculateTablePosition('text' + this.state.selectedItemIndex, this.state.selectedItemIndex);
            // Update the state with the new tableTopPosition
            this.setState({ tableTopPosition: newTableTopPosition });
        }
    }
    

    // handleTableHeight = async (height) => {
    //     await this.setState({ tableHeight: height });
    //     console.log('tableHeight : ', this.state.tableHeight);
    // };

    // async handleHover(section, index, isMouseEnter) {
    //     const selectedSectionName = section.title;
    //     const tableTopPosition = this.calculateTablePosition(`text${index}`, index);
    //     const isSameIndex = this.state.selectedItemIndex === index;
    //     const newSelectedItemIndex = isSameIndex ? null : index;
    //     await this.setState({
    //         selectedSection: isMouseEnter ? selectedSectionName : null,
    //         sectionData: isMouseEnter ? section : null,
    //         selectedItemIndex: newSelectedItemIndex,
    //         tableTopPoszition: isMouseEnter ? tableTopPosition : 50,
    //         expandedTableIndex: isSameIndex ? null : index,
    //     });
    //     this.props.onTransition();
    // }
    
    // async componentDidMount() {
    //     await this.getData();
    //     await this.setBoundingSVG();
    //     const lastTableIndex = this.state.avatarlist.length - 1;
    //     await this.handleHover(this.state.avatarlist[lastTableIndex], lastTableIndex);
    //     this.checkLoginStatus();
    //     this.fetchImage();
    // }
    

    receiveFileName = (filename) => {
        console.log('Uploaded file name:', filename);
        this.fetchImage()
        this.setState({ showProfileUpload: false });
    };

    componentDidMount() {
        this.getData();
        this.setBoundingSVG();
        const lastTableIndex = this.state.avatarlist.length - 1;
        this.handleHover(this.state.avatarlist[lastTableIndex], lastTableIndex);
        this.checkLoginStatus();
        this.fetchImage();
        
    }

    // componentDidUpdate() {
    //     if (this.tableRef.current && this.state.tableHeight === 0) {
    //         const height = this.tableRef.current.getBoundingClientRect().height;
    //         this.setState({ tableHeight: height });
    //     }
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     if (this.tableRef.current) {
    //         const tableHeight = this.tableRef.current.getBoundingClientRect().height;
    //         if (tableHeight !== this.state.tableHeight) {
    //             this.setState({ tableHeight });
    //             console.log("tableWidth : ", this.tableRef.current.getBoundingClientRect().width);
    //         }
    //     }

        // if (this.tableRef.current && this.state.tableHeight === 0) {
        //     const height = this.tableRef.current.getBoundingClientRect().height;
        //     this.setState({ tableHeight: height }, () => {
        //         console.log("tableHeight : ", this.state.tableHeight);
        //     });
        // }
    // }
    

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
    // getData(){
            
    //     this.setState({avatarlist: testdata});
    //     CoachInputDataService.getAll().then(response => {
    //         if(response.data.res === "error") {
    //             const arr = ["connection error"];
    //             this.setState({videoList: arr});
    //             return;
    //         }
    //         if(response.data.res === "error"){
    //             alert("Bitte erst anmelden.");
    //             return;
    //         }
    //         if(response.data.res === "ok") 
    //         {
    //             // this.setState({videoList: response.data.videoList});

    //             fetch('http://localhost:3000/test-api')
    //             .then(response => response.json())
    //             .then(data => {
    //             // Store the API response in the json_data state variable
    //             this.setState({json_data: data.finalObj.sections })
    //             this.setState({ avatarlist: data.finalObj })
    //             console.log("calculateAvatarElement json_data  : ", json_data)
    //             console.log("calculateAvatarElement avatarlist : ", this.state.avatarlist)
    //         })
    //         .catch(error => console.error('Error fetching data:', error));
    

    //             // this.setState({avatarlist: json_data.sections});
    //         }

    //     }).catch(e => {
    //         this.setState({avatarlist: testdata});
    //         alert("Es ist ein Fehler aufgetreten!");
    //     });
    // }

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
            yPosition = con.y - gal.y + con.height/2 - 10 ; // - 10
            if(con.x - gal.x < gal.width/2){
                x1Position = con.x - gal.x + con.width -12 ; // - 12;
                x2Position = con.x - gal.x + con.width + 20  ; //+ 20;
            }else{
                x2Position = con.x - gal.x;
                x1Position = con.x - gal.x - 40 ; //- 40;
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
            var y = con.y - gal.y + con.height/2 - 10; // -10
            if(con.x - gal.x < gal.width/2){
                var x = con.x - gal.x + con.width + 20; //+ 20
            }else{
                var x = con.x - gal.x - 40; // - 40
            }
            var pyth = Math.sqrt(Math.pow(x-gal.width/2, 2) + Math.pow(y - (gal.height/2), 2)) //-200
            cxPosition = Math.abs(x-gal.width/2)*82/pyth
            cyPosition = Math.sqrt(Math.pow(82, 2) - Math.pow(cxPosition, 2));
            if(x-gal.width/2 > 0){
                cxPosition = gal.width/2 +  cxPosition
            }else{
                cxPosition = gal.width/2 - cxPosition
            }
            if(y-(gal.height/2) > 0){ //-200
                cyPosition = gal.height/2 +  cyPosition //-200
            }else{
                cyPosition = gal.height/2 - cyPosition //-200
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

        if (element === null && this.state.selectedItemIndex !== index) {
            x1Position = 0;
            x2Position = 0;
            yPosition = 0;
            relativey = 0;
        } else {
            var con = element.getBoundingClientRect();
            var gal = document.getElementById("avatargallery").getBoundingClientRect();
            yPosition = con.y - gal.y + con.height / 2 -10 ; //- 10;

            if (con.x - gal.x < gal.width / 2) {
                x2Position = con.x - gal.x + con.width+ 20 ; //+ 20;
            } else {
                x2Position = con.x - gal.x- 40 ; //- 40;
            }

            x1Position = gal.width / 2;
            relativey = gal.height / 2; // - 200;
        }

        return <line x1={x1Position} y1={relativey} x2={x2Position} y2={yPosition} stroke="black" />;
    }

    // drawCircle(r, stroke, fill){
    //     if(document.getElementById("avatargallery")){
    //         var gal = document.getElementById("avatargallery").getBoundingClientRect();
    //         var x = gal.width/2;
    //         // var y = gal.height/2-200;
    //         y = gal.height / 2;
    //     }else{
    //         var x = 0;
    //         var y = 0;
    //     }

    //     return <circle cx={x} cy={y} r={r} stroke={stroke} fill={fill}/>;
    // }

    drawCircle(r, stroke, fill) {
        let x = 0;
        let y = 0;
        if (document.getElementById("avatargallery")) {
            const gal = document.getElementById("avatargallery").getBoundingClientRect();
            x = gal.width / 2 ;      //+ 450;
            y = gal.height / 2;     // + 100;
        }
        return <circle cx={x} cy={y} r={r} stroke={stroke} fill={fill} />;
    }

    drawImageIcon() {
        
        const imageURL = this.state.imageURL; 
        let x, y;

        if (imageURL != runner  && imageURL != null) {

            // console.log("Image exists name : ", imageURL)
            if (document.getElementById("avatargallery")) {
                const gal = document.getElementById("avatargallery").getBoundingClientRect();
                x = gal.width / 2 - 74;
                y = gal.height / 2 - 74;
            }
            else {
                x = 0;
                y = 0;
            }

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
        else {
                if (document.getElementById('avatargallery')) {
                    const gal = document.getElementById('avatargallery').getBoundingClientRect();
                    x = gal.width / 2 - 56; //-30
                    y = gal.height / 2 -74; //- 272;//260 bn
                } 
                    else {
                        x = 0;
                        y = 0;
                        }

                // console.log(" Setting default image ")
                return (
                        <image
                            x={x}
                            y={y}
                            width="140"
                            height="135"
                            href={imageURL}
                            onLoad={this.handleImageLoad}
                            onError={this.handleImageError}
                        ></image>
                        );
                
            } };
 
    fetchImage() {
        fetch('https://inprove-sport.info/files/jYdncTzQdkdPzxnTanxBst/getImage')
          .then(response => {
            if (response.ok && response.headers.get('Content-Type').startsWith('image')) {
              return response.blob();
            } else {
              throw new Error('Response does not contain an image');
            }
          })
          .then(imageData => {
            const imageURL = URL.createObjectURL(imageData);
            this.setState({ imageURL });
          })
          .catch(error => {
            console.error('Error fetching image:', error);
            // Set a default image (runner) in case of error
            this.setState({ imageURL: runner });
          });
      }

      calculateAvatarListHeight() {
        const avatarItems = document.querySelectorAll('.avatar-all-content'); 
        let totalHeight = 0;

        avatarItems.forEach((item) => {
            totalHeight += item.getBoundingClientRect().height;
        });
        // console.log('totalHeight : ', totalHeight)
        return totalHeight;
    }


    render() {
        const { isBoxClicked, showProfileUpload } = this.state;
        const { textAnimationProps, tableAnimationProps } = this.props;
        
        if (!this.state.avatarlist || this.state.avatarlist.length === 0) {
            return (
                <div>
                    <div className="avatargallery" id="avatargallery">
                        <p>Loading...</p>
                    </div>
                </div>
            );
        }
        
        const uniqueTitles = [...new Set(this.state.avatarlist.map(item => item.title))];
        const avatarListHeight = this.calculateAvatarListHeight();
        const totalTitles = uniqueTitles.length;
        const midPoint = Math.ceil(totalTitles / 2);
        
        require("../../prerna/avatar.css");

        return (
            <div className="avatar-container">

                <div> 
                        <button className="upload-btn" onClick={this.handleSelectImage}>Upload Profile Picture</button>
                        <br />
                        
                        {showProfileUpload && (
                            <ProfilePictureUpload
                                onFileName={this.receiveFileName}
                                onRedirect={this.handleRedirect}
                            />
                        )}
                </div>

                 <div className="avatargallery" id="avatargallery">
                {/* <div> */}

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
                                {this.drawCircle(82, "black", "none")} //82
                                {this.drawCircle(76, "#DAD2D2", "#DAD2D2")} //75
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
                        const item = this.state.avatarlist.find(item => item.title === title);
                        const isEvenIndex = index % 2 === 0;
                        const positionStyle = {
                            textAlign: isEvenIndex ? 'left' : 'left',   //'left' : 'right'
                            transform: isEvenIndex ? 'translate(-450%, 50%)' : 'translate(-20%, -50%)',
                            zIndex: 1,
                            
                        };

                        return (
                            <div className="avatar-item" key={index} style={positionStyle}>
                                <animated.span
                                    className="avatar-text-field"
                                    id={"text" + String(index)}
                                    onMouseEnter={() => this.handleHover(item, index, true)}
                                    onMouseLeave={() => this.handleHover(item, index, false)}
                                    style={{ cursor: 'pointer'}}
                                >
                                    <SpanWithAnimation style={{ color: color }}>
                                        {item.title}
                                    </SpanWithAnimation>
                                    <ColorBar data={json_data} sectionName={item.title} />

                                    {this.state.selectedItemIndex === index && (
                                        <animated.div
                                            ref={this.tableRef}
                                            className="table-container"
                                            style={{
                                                position: 'absolute',
                                                zIndex: '2',
                                                top: `${this.state.tableTopPosition}px`,
                                                visibility: this.state.selectedItemIndex === index ? 'visible' : 'hidden',
                                                height: 'auto',
                                                maxHeight: '300px',
                                                width: '500px',
                                                overflowY: 'auto',
                                                overflowX: 'auto',
                                                border: '0.5px solid #ccc',
                                                borderRadius: '0.5px',
                                                left: isEvenIndex ? '100%' : 'auto',
                                                right: isEvenIndex ? 'auto' : '100%',
                                                transform: isEvenIndex ? 'none' :'translateX(0%)'
                                            }}
                                        >
                                            <AthleteProfileTable
                                                data={json_data}
                                                section_name={this.state.selectedSection}
                                                sectionData={this.state.sectionData}
                                                onTableHeightChange={this.handleTableHeight} 
                                            />
                                        </animated.div>
                                    )}
                                </animated.span>
                            </div>
                        );
                    })}
                </div>
             </div>
        );
    }
}

export default withCombinedAnimation(Avatar);
