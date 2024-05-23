import React, { Component } from 'react';
import logo from '../../loading-gif.gif';
import HandelTrainer from "../../DB/handelTrainer";
import LoggedHandler from "../../DB/loggedHandler";


import checkMark from '../../assets/img/check-mark.png';
import crossMark from '../../assets/img/cross-mark.png';
import PostCSVData from "../../DB/postCSV";
import axios from "axios";

export default class GeneralFileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {  selectedFiles: [],
            fileStatus: [],
            folders: [],
            selectedFolder: "new",
            newFolderName: ""};
    }

    componentDidMount() {
        this.fetchFolders();
    }

    fetchFolders = () => {
        // Replace this URL with the URL of your actual endpoint
        const url = 'https://inprove-sport.info/files/athlete_folders';

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
                });

                if(data.length > 0)
                    this.setState({ selectedFolder:data[0].folder_name})
            })
            .catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }



    handleSelectChange = (e) => {
        this.setState({ selectedFolder: e.target.value });
    }

    handleInputChange = (e) => {
        this.setState({ newFolderName: e.target.value });
    }




    onFileChange = async (event) => {
        // Update the state
        this.setState({
            selectedFiles: event.target.files,
            fileStatus: Array.from(event.target.files).map(file => ({ name: file.name, status: 'uploading' }))
        });

        // Start uploading files
        await this.uploadFiles(event.target.files);

        if(this.props.uploadDone)
            this.props.uploadDone();
        this.fetchFolders();

    };

    uploadFiles = async (files) => {
        let successfulUploads = 0;  // Counter for successful uploads
        const promises = Array.from(files).map(async (file, index) => {
            const data = new FormData();
            data.append('file', file);

            // Append folder name to the form data
            const { selectedFolder, newFolderName } = this.state;
            let folderName = selectedFolder === "new" ? newFolderName : selectedFolder;
            if(!folderName || folderName === "")
                folderName = "Hochgeladene Dateien";
            data.append('folderNameS', folderName);

            try {
                const response = await PostCSVData.myFileUpload(data);
                if (response.data.res === "ok") {
                    successfulUploads++;  // Increment counter if upload was successful
                    this.setState(prevState => {
                        const newFileStatus = prevState.fileStatus.map((item, idx) => {
                            if (idx === index) return { ...item, status: 'uploaded' };
                            return item;
                        });
                        return { fileStatus: newFileStatus };
                    });
                } else {
                    throw new Error("Upload error");
                }
            } catch (e) {
                this.setState(prevState => {
                    const newFileStatus = prevState.fileStatus.map((item, idx) => {
                        if (idx === index) return { ...item, status: 'error' };
                        return item;
                    });
                    return { fileStatus: newFileStatus };
                });
            }
        });

        await Promise.all(promises);
        if(successfulUploads > 0){
            this.informServerSuccUpload(successfulUploads)
        }
        if(this.props.uploadDone) {
            this.props.uploadDone(successfulUploads);  // Call uploadDone with the number of successful uploads
        }
    }

    informServerSuccUpload = async (successfulUploads) => {
        await axios.post('https://inprove-sport.info/files/informUploadDone', {fileCount:successfulUploads});
    }


    render() {
        const { folders, selectedFolder } = this.state;

        require("../../nico/videosharing/shareVideo.css")
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Dateien hochladen</h3>


                <br/><br/>
                Du kannst Deine Datei einem Ordner zuweisen:
                <br></br>
                <label htmlFor="folderSelect">Wähle einen Ordner: </label>
                <select id="folderSelect" value={selectedFolder} onChange={this.handleSelectChange}>
                    {folders.map((folder, index) => (
                        <option key={index} value={folder.folder_name}>
                            {folder.folder_name}
                        </option>
                    ))}
                    <option value="new">Neuen Ordner erstellen...</option>
                </select>
                {selectedFolder === "new" && (
                    <input
                        type="text"
                        placeholder="Neuer Ordnername"
                        className="form-control"
                        value={this.state.newFolderName}
                        onChange={this.handleInputChange}
                    />
                )}


                <br></br> <br></br>

                <div>Mehrere Dateien auswählen: Auf einem Mobilgerät führst Du einen langen Klick auf die Dateien aus. Auf einem Desktop-Gerät halte die 'Strg'-Taste gedrückt.
                </div>
                <br></br>

                <div className="form-group">
                    <input
                        type="file"
                        multiple
                        onChange={this.onFileChange}
                    />
                </div>



                <br></br><br></br>
                <h5>Upload-Status:</h5>
                <ul>
                    {this.state.fileStatus.map((file, index) => (
                        <li key={index}>
                            {file.name} - {
                            file.status === 'uploading' ? <img width={30} src={logo} alt="Uploading..." /> :
                                file.status === 'uploaded' ? <img width={20} src={checkMark} alt="Uploaded" /> :
                                    <img width={20} src={crossMark} alt="Error" />
                        }
                        </li>
                    ))}
                </ul>

                <input type="submit" value="Submit" className="btn btn-primary btn-block" hidden={true} />
            </form>
        );
    }



}

