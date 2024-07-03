/*
By Chaithra, prerna
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
import AthleteProfileTable from '../../prerna/fileUpload/athleteProfileTable';
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
import GetInterventions from '../../register/admin/getIntervention'

class Avatar extends React.Component {

    constructor(props) {
        super(props);
        this.state =  {
            selectedSection: null,
            avatarlist: [],
            sectionData: null,
            selectedItemIndex: null,
            tableHeight: 0,
            springProps: { height: 0 },
            showProfileUpload: false,
            uploadedFileName: null,
            avatarImage: null,
            loggedIn: false,
            tableOpacity: 0,
            json_data:[],
            name: null,
            imageURL: null,
            athleteId: props.athleteId,
            };
        this.tableRef = React.createRef();
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
        this.fetchImage = this.fetchImage.bind(this);
    }

      handleHover = (section, index, isMouseEnter) => {
        const selectedSectionName = section.section_name;
        const tableTopPosition = this.calculateTablePosition(`text${index}`, index);
        const isSameIndex = this.state.selectedItemIndex === index;
        const newSelectedItemIndex = isSameIndex ? null : index;
        /*console.log("section : ", section)
        console.log("index : ", index)
        console.log("selectedSectionName : ", selectedSectionName)*/
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
       /* console.log("sectionData : ", this.state.sectionData)*/
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
          console.error("User not logged in")
          return;
        }
         this.setState({ showProfileUpload: true});
      };


    calculateTablePosition(sectionId, index)
    {
        const title_size = this.state.avatarlist.length;
        console.log("sectionId : ", sectionId)
        const sectionTitleElement = document.getElementById(sectionId);
        const container = document.getElementById("avatargallery");
        const titleRect = sectionTitleElement.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const titleTop = titleRect.top - containerRect.top;
        const titleBottom = titleRect.bottom - containerRect.top;
        const containerHeight = containerRect.height;

        let tableTop = 0;
        const topThreshold = containerHeight / title_size ;
        const bottomThreshold = (3 * containerHeight) / title_size;
        const tableHeight= this.state.tableHeight;

        if (index < 2) {
            tableTop = titleBottom/title_size;
        }

        else if ((title_size%2==0  && index < title_size - 2) || (title_size%2!=0  && index < title_size - 1))
        {

            if(tableHeight < 270 && containerHeight/2 - tableHeight+40 >= 0)
                {
                    tableTop = -(titleBottom - titleTop) / title_size;
                }

            else
                {
                    if (titleTop < containerHeight/2 )
                    {
                        tableTop = titleBottom/title_size;

                    }

                    else
                    {
                    tableTop = -titleBottom+containerHeight/2;}}}

        else

        {
            if((containerHeight - titleBottom)< tableHeight )
            {if (containerHeight/2 > tableHeight)
                {
                    tableTop = -titleBottom+containerHeight/2 + (containerHeight/2 - tableHeight);
                }
                else{
                    tableTop = -titleBottom+containerHeight/2 - (containerHeight/2 - tableHeight);
                }
            }
            else{
                tableTop = ((titleBottom - titleTop )/title_size)
            }

        }
        return tableTop;
    }

    handleTableHeight = (height) => {
        if(height>0) {

            this.setState({ tableHeight: height }, () => {
            }); }

    };

    componentDidUpdate(prevProps, prevState) {

        if (prevState.tableHeight !== this.state.tableHeight) {
            const newTableTopPosition = this.calculateTablePosition('text' + this.state.selectedItemIndex, this.state.selectedItemIndex);
            this.setState({ tableTopPosition: newTableTopPosition });
        }
    }

    receiveFileName = (filename) => {
        this.fetchImage()
        this.setState({ showProfileUpload: false });
    };

    componentDidMount() {
        this.fetchData();
        this.setBoundingSVG();
        this.checkLoginStatus();
        this.fetchImage();

    }

     fetchData = async () => {
        try {
             const response = await fetch('https://inprove-sport.info/avatar/BhdYsskMxsTePaxTsd/getCachedAvatarElement', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Athlete-Id': this.props.athleteId
                }
            });
            const result = await response.json();
            console.log("result.success : ", result.success);
            console.log("result.data[0] : ", result.data[0]);
            console.log("result.data[0].sections : ", result.data[0].sections);
            if (result.success) {
                this.setState({
                    avatarlist: result.data[0].sections,
                    name: result.data[0].name,
                    json_data: result.data[0]
                }, () => {
                    console.log("Updated avatarlist: ", this.state.avatarlist);
                    console.log("Updated json_data: ", this.state.json_data);
                    console.log("Updated name: ", this.state.name);

                    const lastTableIndex = this.state.avatarlist.length - 1;
                    if (lastTableIndex >= 0) {
                        this.handleHover(this.state.avatarlist[lastTableIndex], lastTableIndex);
                    }

                });
            }
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
        console.log("avatarlist : ", this.state.avatarlist);
        console.log("json_data : ", this.state.json_data);

    };


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
            yPosition = con.y - gal.y + con.height/2 - 10 ;
            if(con.x - gal.x < gal.width/2){
                x1Position = con.x - gal.x + con.width -12 ;
                x2Position = con.x - gal.x + con.width + 20  ;
            }else{
                x2Position = con.x - gal.x;
                x1Position = con.x - gal.x - 40 ;
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
            var y = con.y - gal.y + con.height/2 - 10;
            if(con.x - gal.x < gal.width/2){
                var x = con.x - gal.x + con.width + 20;
            }else{
                var x = con.x - gal.x - 40;
            }
            var pyth = Math.sqrt(Math.pow(x-gal.width/2, 2) + Math.pow(y - (gal.height/2), 2))
            cxPosition = Math.abs(x-gal.width/2)*82/pyth
            cyPosition = Math.sqrt(Math.pow(82, 2) - Math.pow(cxPosition, 2));
            if(x-gal.width/2 > 0){
                cxPosition = gal.width/2 +  cxPosition
            }else{
                cxPosition = gal.width/2 - cxPosition
            }
            if(y-(gal.height/2) > 0){
                cyPosition = gal.height/2 +  cyPosition
            }else{
                cyPosition = gal.height/2 - cyPosition
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
            yPosition = con.y - gal.y + con.height / 2 -10 ;

            if (con.x - gal.x < gal.width / 2) {
                x2Position = con.x - gal.x + con.width+ 20 ;
            } else {
                x2Position = con.x - gal.x- 40 ;
            }

            x1Position = gal.width / 2;
            relativey = gal.height / 2;
        }

        return <line x1={x1Position} y1={relativey} x2={x2Position} y2={yPosition} stroke="black" />;
    }

    drawCircle(r, stroke, fill) {
        let x = 0;
        let y = 0;
        if (document.getElementById("avatargallery")) {
            const gal = document.getElementById("avatargallery").getBoundingClientRect();
            x = gal.width / 2 ;
            y = gal.height / 2;
        }
        return <circle cx={x} cy={y} r={r} stroke={stroke} fill={fill} />;
    }

    drawImageIcon() {

        const imageURL = this.state.imageURL;
        let x, y;

        if (imageURL != runner  && imageURL != null) {
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
                    x = gal.width / 2 - 56;
                    y = gal.height / 2 -74;
                }
                    else {
                        x = 0;
                        y = 0;
                        }
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
        fetch('https://inprove-sport.info/files/jYdncTzQdkdPzxnTanxBst/getImage', {
            headers: {
                'Athlete-Id': this.props.athleteId
            }
        })
        .then(response => {
            if (response.ok && response.headers.get('Content-Type').startsWith('image')) {
                return response.blob();
            } else {
                throw new Error('Response does not contain a valid image');
            }
        })
        .then(imageData => {
            const imageURL = URL.createObjectURL(imageData);
            this.setState({ imageURL });
        })
        .catch(error => {
            console.error('Error fetching image:', error);
            this.setState({ imageURL: runner });
        });
    }



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
                    <div className="avatargallery" id="avatargallery">
                        <p>Loading...</p>
                    </div>
                </div>
            );
        }

        const uniqueTitles = [...new Set(this.state.avatarlist.map(item => item.section_name))];
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


                <span
                        style={{
                        display: 'block', // Makes the span behave like a block element
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '24px', // Adjust the size as needed
                        margin: '0', // Remove default margins
                        }}
                    >
                        {this.state.name}
                    </span>

                <div className="avatargallery" id="avatargallery">

                <div className="avatar-inner">


                        <div className="avatar-line-container">
                            <svg className="avatar-svg" style={{ ...{ width: this.setBoundingSVG().width }, ...{ height: this.setBoundingSVG().height } }}>
                                {
                                    this.state.avatarlist.map((item, index) => {
                                        console.log("drawhorizontalLines")
                                        console.log("text" + String(index))
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
                                {this.drawCircle(76, "#DAD2D2", "#DAD2D2")}
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
                        const item = this.state.avatarlist.find(item => item.section_name === title);
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
                                        {item.section_name}
                                    </SpanWithAnimation>
                                    <ColorBar data={this.state.json_data} sectionName={item.section_name} />

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
                                                data={this.state.json_data}
                                                section_name={this.state.selectedSection}
                                                onTableHeightChange={this.handleTableHeight}
                                            />
                                        </animated.div>
                                    )}
                                </animated.span>
                            </div>
                        );
                    })}

                </div>

                  <div>
                        <GetInterventions athleteId={this.props.athleteId} />
                </div>

             </div>



        );
    }
}

export default withCombinedAnimation(Avatar);
