import React, { Component } from 'react';
import logo from '../../loading-gif.gif';
import HandelTrainer from "../../DB/handelTrainer";
import LoggedHandler from "../../DB/loggedHandler";


import checkMark from '../../assets/img/check-mark.png';
import crossMark from '../../assets/img/cross-mark.png';

export default class ShareVideo extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedFiles: [], fileStatus: [] };
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
    };

    uploadFiles = async (files) => {
        const promises = Array.from(files).map(async (file, index) => {
            const data = new FormData();
            data.append('file', file);

            try {
                const response = await LoggedHandler.uploadVideo(data);
                if (response.data.res === "ok") {
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
    }

    render() {
        require("../../nico/videosharing/shareVideo.css")
        return (
            <form>
                <h3>Video teilen</h3>

                <div>
                    Hier kannst Du mehrere Videos mit Deiner Gruppe teilen. Wähle dazu die Dateien aus.
                </div>
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

                <br></br>
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
            </form>
        );
    }
}

