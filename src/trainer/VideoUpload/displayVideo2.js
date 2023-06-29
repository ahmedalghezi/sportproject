import React from 'react';
import axios from 'axios';
import './DisplayVideos.css';

class DisplayVideos2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoList: [],
            error: null,
            folderList:[],
            selectedFolder: "All",
            currentPage: 1,
            itemsPerPage: 8
        };
    }


    async componentDidMount() {
        this.getAll();
    }


    getAll = async () => {
        try {
            const response = await axios.post('https://inprove-sport.info/trainer/getVideos');
            if (response.data.res === "no") {
                this.setState({error: "Sie haben nicht die Berechtigung, diese Seite anzuzeigen. Bitte loggen Sie sich ein"});
                return;
            }
            const sortedVideos = response.data.videoList.sort((a, b) => new Date(b.date) - new Date(a.date));
            const folderList = [...new Set(sortedVideos.map(video => video.folder_name))];
            this.setState({videoList: sortedVideos, folderList});
        } catch (error) {
            this.setState({error: "Failed to fetch videos. Please try again."});
            console.error('Error fetching videos:', error);
        }
    }

    handleSelectChange = (event) => {
        this.setState({ selectedFolder: event.target.value });
    }

    handleItemsPerPageChange = (event) => {
        this.setState({ itemsPerPage: Number(event.target.value), currentPage: 1 });
    }


    handlePageChange = (event) => {
        const button = event.target;
        const buttons = document.getElementsByClassName("page-button");

        // Remove active class from all buttons
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].className = buttons[i].className.replace(" active", "");
        }

        // Add active class to the clicked button
        button.className += " active";

        this.setState({ currentPage: Number(button.value) });
    }



    handleDeleteVideo = async (filename) => {
        try {
            // replace this with the actual delete request
            const result = await axios.get(`https://inprove-sport.info/files/deleteVideo/${filename}`);
            if(result.data.res === "ok")
            this.setState(prevState => ({
                videoList: prevState.videoList.filter(video => video.filename !== filename)
            }));
            else
                alert("Some error has happened code71");
        } catch (error) {
            console.error('Error deleting video:', error);
        }
    }



    render() {
        const { videoList, folderList, selectedFolder, error, currentPage, itemsPerPage } = this.state;

        if (error) {
            return <div>{error}</div>;
        }

        const filteredVideos = selectedFolder === 'All' ? videoList : videoList.filter(video => video.folder_name === selectedFolder);

        // Adjust these variables to get the current items
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = filteredVideos.slice(indexOfFirstItem, indexOfLastItem);

        // Calculate page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredVideos.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <div>
                <label>Filtern nach Ordner: </label>
                <select value={selectedFolder} onChange={this.handleSelectChange}>
                    <option value="All">Alle Ordner</option>
                    {folderList.map((folder, index) => (
                        <option key={index} value={folder}>{folder}</option>
                    ))}
                </select>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <label>Anzahl der Videos pro Seite: </label>
                <select value={itemsPerPage} onChange={this.handleItemsPerPageChange}>
                    <option value="8">8</option>
                    <option value="16">16</option>
                    <option value="20">20</option>
                </select>
                <br></br> <br></br>
                <div className="display-videos">
                    {currentItems.map((item, index) => (
                        <div className="content-section" key={index}>
                            <h1 id="video-title">{item.title}</h1>
                             <button hidden={!item.mine} disabled={!item.mine} className="delete-button" onClick={() => this.handleDeleteVideo(item.filename)}>X</button>
                            <div className="video">
                                <div className="video-container">
                                    <video
                                        width="350"
                                        height="200"
                                        className="video"
                                        title={item.title}
                                        progress
                                        controls
                                        src={"https://inprove-sport.info/trainer/streamVideo/"+ item.filename}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="page-numbers">
                    {pageNumbers.map(number => (
                        <button key={number} onClick={this.handlePageChange} value={number} className={number === currentPage ? "page-button active" : "page-button"}>
                            {number}
                        </button>
                    ))}
                </div>

            </div>

        );
    }


}

export default DisplayVideos2;
