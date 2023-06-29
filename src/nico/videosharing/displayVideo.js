/*
By Nicolas Schulz
 */

import React, {Component} from "react";
import HandelTrainer from "../../DB/handelTrainer";
import PostSignup from "../../DB/postSignup";
import CoachInputDataService from "../../DB/rw"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import handelTrainer from "../../DB/handelTrainer";


const vidperpage = 4;

export default class DisplayVideo extends Component {

    constructor(props) {
        super(props);
        this.state = {folders: [],
            selectedFolder: 'all',trainersList:[], videoList:[], currentVideos:[], currentPage: 0, windowWidth: undefined,sortByTitle:false};
        this.getTrainers = this.getTrainers.bind(this);
        this.getAll = this.getAll.bind(this);
        this.orderVideos = this.orderVideos.bind(this);
        this.updateVideoPage = this.updateVideoPage.bind(this);
        this.handleButtonClickLeft = this.handleButtonClickLeft.bind(this);
        this.handleButtonClickRight = this.handleButtonClickRight.bind(this);
    }


    componentDidMount() {
        this.getAll();
        window.addEventListener('resize', this.handleResize);
        this.setState({windowWidth: window.innerWidth});
        this.fetchFolders();
    }
    handleResize = () => this.setState({
        windowWidth: window.innerWidth
    });

    getTrainers(){
        HandelTrainer.getAllTrainers().then(response => {
            if(response.data.res === "error") {
                const arr = ["connection error"];
                this.setState({trainersList: arr});
                return;
            }
            if(response.data.res === "error"){
                alert("Bitte erst anmelden.");
                return;
            }
            if(response.data.res === "ok") {
                this.setState({trainersList: response.data.trainersList});
            }

        }).catch(e => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten!");
        });
    }

    getAll(){
        // this.updateVideoPage(testdata, this.state.currentPage);
        handelTrainer.getVideos().then(response => {
            if(response.data.res === "error") {
                const arr = ["connection error"];
                this.setState({videoList: arr});
                return;
            }
            if(response.data.res === "no"){
                alert("Bitte erst anmelden.");
                return;
            }
            if(response.data.res === "ok") {
                var list = response.data.videoList.sort((a, b) => (a.time > b.time) ? -1 : 1);
                this.setState({videoList: list});
                this.updateVideoPage(list, this.state.currentPage);
            }

        }).catch(e => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten!");
        });
    }


    updateVideoPage(listofvids, curpage){
        if(!listofvids)
            return;
        var getvideos = listofvids.slice(curpage * vidperpage, curpage * vidperpage + vidperpage);
        var ordervid = [];
        if(this.state.windowWidth > 480){
            getvideos.forEach(element => {
                if(!(getvideos.indexOf(element) % 2)){
                    ordervid.push(element);
                }
            });
            getvideos.forEach(element => {
                console.log(getvideos.indexOf(element));
                if(getvideos.indexOf(element) % 2){
                    ordervid.push(element);
                }
            });
            this.setState({currentVideos: ordervid});
        }else{
            this.setState({currentVideos: getvideos});
        }
    }

    setOrderVideoChang = (event) =>{
        if(event){
            let sortByTitle = event.target.value ===  "Titel";
            this.setState({sortByTitle:sortByTitle})
            this.orderVideos(sortByTitle);
        }
    }

    orderVideos(sortByTitle, selectedFolder) {
        let vlist = this.state.videoList;
        if(!selectedFolder)
            selectedFolder = this.state.selectedFolder;
        if(selectedFolder != "all")
            vlist = this.filterByFolder(selectedFolder,vlist);
        if(sortByTitle){
            var list = vlist.sort((a, b) => (a.title > b.title) ? 1 : -1);
            this.updateVideoPage(list,this.state.currentPage);
        }else{
            var list = vlist.sort((a, b) => (a.time > b.time) ? 1 : -1);
            this.updateVideoPage(list,this.state.currentPage);
        }
    }


    handleButtonClickLeft(event) {
        if(this.state.currentPage > 0){
            this.setState({currentPage: this.state.currentPage - 1});
            this.updateVideoPage(this.state.videoList, this.state.currentPage - 1);
        }
    }
    handleButtonClickRight(event) {
        if(this.state.videoList.length /vidperpage > this.state.currentPage + 1){
            this.setState({currentPage: this.state.currentPage + 1});
            this.updateVideoPage(this.state.videoList, this.state.currentPage + 1);
        }
    }
    resize = () => this.forceUpdate()

    fetchFolders = () => {
        // Replace this URL with the URL of your actual endpoint
        const url = 'https://inprove-sport.info/files/videoTrainerFolders';

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                this.setState({ folders: data });
                this.setState({
                    folders: data,
                    selectedFolder: data.length > 0 ? data[0].folder_name : ''  // set first folder as default
                });
            })
            .catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }


    handleSelectChange = (event) => {
        this.setState({ selectedFolder: event.target.value });
        this.orderVideos(this.state.sortByTitle , event.target.value);
    };



    filterByFolder = (folderName, videoList) => {
        let setItBack = false
        if(!videoList) {
            videoList = this.state.currentVideos;
            setItBack = true;
        }
        videoList = videoList.filter(video => video.folder_name === folderName);
        if(setItBack)
            this.setState({currentVideos:videoList});
        return videoList;
    }


    render() {
        require("./uploadFile.css")

        return (
            <div>
                <h3>Meine Videos</h3>

                <div>
                    <label>Filter videos by folder: </label>
                    <select id="folderSelect" value={this.state.selectedFolder} onChange={this.handleSelectChange}>
                        <option value="all">Alle Ordner</option>
                        {this.state.folders.map((folder, index) => (
                            <option key={index} value={folder.folder_name}>
                                {folder.folder_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Liste sortieren nach: </label>
                    <select onChange={this.orderVideos}>
                        <option>Datum</option>
                        <option>Titel</option>
                    </select>
                </div>

                <div className="gallery">
                    {this.state.currentVideos.map((item, index) => {
                        return (
                            <div>
                                <div className="content-section">
                                    <h1 id="video-title">{item.title}</h1>
                                    {" "}
                                    <div className="video" key={index}>
                                        <div className="video-container" key={index}>
                                            <video width="350" height="200"
                                                   className="video"
                                                   title={item.title}
                                                   progress
                                                   controls
                                                   src={"https://inprove-sport.info/trainer/streamVideo/"+ item.filename}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                    <div>
                        {(this.state.currentVideos.length % 2 === 1) ? (
                            <div >
                                <h1 id="video-title"></h1>
                                {" "}
                                <div className="video">
                                    <div className="video-container">
                                    </div>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
                <div className="arrows">
                    {
                        (this.state.currentPage > 0)
                            ?         <button onClick={this.handleButtonClickLeft}>        <ArrowBackIosIcon>

                            </ArrowBackIosIcon></button>
                            : null
                    }
                    {
                        (this.state.videoList.length /vidperpage > this.state.currentPage + 1)
                            ? <button onClick={this.handleButtonClickRight}>
                                <ArrowForwardIosIcon>

                                </ArrowForwardIosIcon>
                            </button>
                            : null
                    }

                </div>
            </div>
        );
    }



}
