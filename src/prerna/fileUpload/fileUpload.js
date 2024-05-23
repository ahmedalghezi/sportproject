import React, { Component } from 'react';
import axios from 'axios';

import checkMark from '../../prerna/assets/img/check-mark.png';
import crossMark from '../../prerna/assets/img/cross-mark.png';
import '../style.css'
import PostCSVData from '../DB/postCSV'

export default class AthleteReportsUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFiles: [],
            fileStatus: [],
            folders: [],
            selectedFolder: "new",
            newFolderName: "",
            key: "",
            title: "",
        };
    }

    componentDidMount() {
        this.fetchFolders();
    }

    fetchFolders = () => {
        
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
                if (data.length > 0) {
                    this.setState({ selectedFolder: data[0].folder_name });
                }
            })
            .catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }

    handleKeyChange = (event) => {
        this.setState({ key: event.target.value });
    }

    handleTitleChange = (event) => {
        this.setState({ title: event.target.value });
    }

    handleSelectChange = (event) => {
        this.setState({ selectedFolder: event.target.value });
    }

    handleInputChange = (event) => {
        this.setState({ newFolderName: event.target.value });
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
                        if (idx === index) return { ...item, status: 'error' + e };
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
        const { folders, selectedFolder, key, title, fileStatus } = this.state;

        const { allIDs, allNames } = this.props; // Get the IDs and athleteNames from props

        // console.log(allIDs)
        // console.log(allNames)

        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Dateien hochladen</h3>

                {/* <div>
                <label htmlFor="keyInput" className="input-label"> Key </label>
                <div className="input-field">
                    <input
                        type="text"
                        id="keyInput"
                        value={key}
                        onChange={this.handleKeyChange}
                        required
                    />
                </div>
                </div> */}

            <div className="input-container">
                <label htmlFor="keyInput" className="input-label">
                Send Report to ID: 
                </label>
                <div className="input-field">
                    <select
                        id="keyInput"
                        value={key}
                        onChange={this.handleKeyChange}
                        required
                    >
                        <option value="">Select Key</option>
                        {allIDs.length > 0 ? (
                            allIDs.map((id, index) => (
                                <option key={id} value={id}>
                                   {id}, ({allNames[index]})
                                </option>
                            ))
                        ) : (
                            <option value="">No IDs available</option>
                        )}
                    </select>
                </div>
            </div>

            {key && (
                <div className="key-tab">
                
                    <p>Athlete ID: {key}</p>
                </div>
            )}

                <div>
                    <label htmlFor="titleInput" className='input-label'> Title </label>
                    <div className='input-field'>
                        <input
                            type="text"
                            id="titleInput"
                            value={title}
                            onChange={this.handleTitleChange}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="folderNameInput" className='input-label'> Folder Name </label>
                    <div className='input-field'>
                    <input
                        type="text"
                        id="folderNameInput"
                        value={selectedFolder === "new" ? this.state.newFolderName : selectedFolder}
                        onChange={this.handleInputChange}
                    />
                    </div>
                </div>
                <br></br>
                <div>
                    <label htmlFor="fileInput" className="file-input-label">Select Files </label>
                    <input
                        type="file"
                        id="fileInput"
                        className="file-input"
                        multiple
                        onChange={this.onFileChange}
                        required
                    />
                </div>

                <h5>Upload Status </h5>
                <ul>
                    {fileStatus.map((file, index) => (
                        <li key={index}>
                            {file.name} - {file.status}
                        </li>
                    ))}
                </ul>

                <input type="submit" value="Submit" className="file-input-label" />
            </form>
        );
    }
}