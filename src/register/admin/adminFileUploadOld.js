/*
 Chaithra KB
 */

import React, { Component } from 'react';
import axios from 'axios';
import checkMark from '../../assets/img/check-mark.png';
import crossMark from '../../assets/img/cross-mark.png';
import logo from '../../loading-gif.gif';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class UploadFileC_Old extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      folders: [],
      searchQuery: "",
      newFolderName: "",
      folder: "",
      ID: "",
      selectedFolder: "",
      folderInput: '',
      uploadStatus: [],
      key: "",
      athleteID: this.props.ID,
      notifyBtnEnabled: false,
      profileBtnEnabled: false,
      sendEmailWithoutFile: false,
      showAllFolders: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleKeyChange = this.handleKeyChange.bind(this);
    this.handleShowAllFoldersChange = this.handleShowAllFoldersChange.bind(this);
  }

  componentDidMount() {
    if (this.props.ID) this.setState({
      ID: this.props.ID,
      key: this.props.ID,
      athleteID: this.props.ID,
    });
    this.loadFolders();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.key !== prevState.key && this.state.key && prevState.key) {
  //     this.setState((prevState) => {
  //       const updatedState = {};

  //       if (!this.state.athleteID) {
  //         this.setState({ athleteID: this.state.key });
  //       }

  //       if (prevState.folder !== '') {
  //         updatedState.selectedFolder = prevState.selectedFolder;
  //       }

  //       if (prevState.files.length > 0) {
  //         updatedState.files = prevState.files;
  //       }

  //       if (Object.keys(updatedState).length > 0) {
  //         this.setState({ uploadStatus: [] });
  //         this.setState({ notifyBtnEnabled: false });
  //         this.setState({ profileBtnEnabled: false });

  //         return updatedState;
  //       }

  //       return null;
  //     });
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.key !== prevState.key && this.state.key && prevState.key) {
        this.setState((prevState) => {
            const updatedState = {};

            if (!this.state.athleteID) {
                this.setState({ athleteID: this.state.key });
            }

            if (prevState.folder !== '') {
                updatedState.selectedFolder = prevState.selectedFolder;
            }

            if (prevState.files.length > 0) {
                updatedState.files = prevState.files;
            }

            if (Object.keys(updatedState).length > 0) {
                this.setState({ uploadStatus: [] });
                this.setState({ notifyBtnEnabled: false });
                this.setState({ profileBtnEnabled: false });

                return updatedState;
            }

            return null;
        });
    }

    // Check if athleteID or athleteName has changed and reset key if it has
    if (this.props.ID !== prevProps.ID || this.props.athleteName !== prevProps.athleteName) {
        this.setState({ key: '' });
    }
}


  loadFolders = () => {
    const url = 'https://inprove-sport.info/files/athlete_folders_admin';
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        console.log("response : ", response.json)
        return response.json();
      })
      .then((data) => {
        console.log("data : ", data)
        this.setState({
          folders: data,
        });
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }

  handleSearchInputChange(event) {
    const { value } = event.target;
    this.setState({ folder: value, folder: value, searchQuery: value });
  }

  filteredFolders() {
    const { folders, searchQuery, key, showAllFolders } = this.state;
    return folders
    .filter(folder => showAllFolders || folder.athlete_id === key)
    .filter(folder =>
      folder.folder_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  handleCheckboxChange(event) {
    const { checked } = event.target;
    this.setState({ sendEmailWithoutFile: checked });

    if (checked) {
      this.setState({ notifyBtnEnabled: true });
    } else {
      this.setState({ notifyBtnEnabled: false });
    }
  }


  handleKeyChange(event) {
    const selectedKey = event.target.value;
    this.setState({
      key: selectedKey,
      athleteID: selectedKey,
    });
  }

  handleShowAllFoldersChange(event) {
    const { checked } = event.target;
    this.setState({ showAllFolders: checked });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();
    data.append("file", this.state.file);

    const { files, folder } = this.state;

    let ID = this.state.key;
    if (!ID) ID = this.props.ID;

    if (!files.length || !ID || !folder) {
      toast.error("All fields are required.");
      return;
    }

    let uploadStatus = [];
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      uploadStatus.push({ fileName: file.name, status: 'loading', img: logo });
    }
    this.setState({ uploadStatus });

    for (const [index, file] of Array.from(files).entries()) {
      let formData = new FormData();
      formData.append('file', file);
      formData.append('athlete_id', ID);
      formData.append('folderName', folder);

      try {
        const res = await axios.post('https://inprove-sport.info/files/sendMFileToAthlete', formData);
        const result = res.data.res;

        if (result === 'ok') {
          uploadStatus[index] = { fileName: file.name, status: 'ok', img: checkMark };
          this.setState({ notifyBtnEnabled: true });
          this.setState({ profileBtnEnabled: true });
          this.loadFolders();
        } else if (result === 'error') {
          uploadStatus[index] = { fileName: file.name, status: 'error', img: crossMark };
        } else if (result === 'no') {
          toast.error("Not authorized.");
          this.setState({ uploadStatus: [] });
          return;
        }
        this.setState({ uploadStatus });
      } catch (error) {
        console.error('Error uploading file:', error);
        uploadStatus[index] = { fileName: file.name, status: 'error', img: crossMark };
        this.setState({ uploadStatus });
      }
    }
  }

  handleFileUpload = event => {
    this.setState({ files: event.target.files });
  };

  handleFolderInputChange = (event) => {
    const value = event.target.value;
    this.setState({ folderInput: value });
    const suggestions = this.state.folders.filter(folder =>
      folder.toLowerCase().includes(value.toLowerCase())
    );
    this.setState({ folderSuggestions: suggestions });
  };

  handleNotifyClick = async () => {
    const athleteID = this.state.key || this.props.ID;

    try {
      const response = await axios.post(
        'https://inprove-sport.info/files/nbTrYxc6dNytxLo/sendReportNotification',
        { athlete_id: athleteID }
      );
      if (response.data.res === 'ok') {
        this.setState({ notifyBtnEnabled: false });
        this.setState({ sendEmailWithoutFile: false });
        toast.success(`Email sent successfully to athlete ID: ${athleteID}`);
      } else { toast.error("Error: email not sent") }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  handleProfileClick() {
    const athleteID = this.state.key || this.props.ID;
    this.props.showProfile(athleteID);
  }

  render() {
    const { uploadStatus, key, showAllFolders } = this.state;
    const { allIDs, allNames } = this.props;
    const athleteID = this.props.ID;
    const athleteName = this.props.athleteName;
    let sortedIDs = [];
    let sortedNames = [];

    if (allIDs.length > 0 && allNames.length > 0) {
      const sortedData = allIDs.map((id, index) => ({
        id,
        name: allNames[index],
      })).sort((a, b) => a.name.localeCompare(b.name));

      sortedIDs = sortedData.map((item) => item.id);
      sortedNames = sortedData.map((item) => item.name);
    }

    return (
      <div>
        <ToastContainer />
        <h4>Admin Upload</h4>
        <div className="input-container">
          <label htmlFor="keyInput" className="input-label">
            Send Report to ID:
          </label>
          <div className="input-field ">
            <select
              id="keyInput"
              value={this.state.key}
              onChange={this.handleKeyChange}
              size="10"
              style={{
                width: '500px',
                height: '150px',
              }}
              required
            >
              {sortedIDs.length > 0 ? (
                <option value="">
                  {athleteID}, ({athleteName})
                </option>
              ) : null}
              {sortedIDs.map((id, index) => (
                <option key={id} value={id}>
                  {id}, ({sortedNames[index]})
                </option>
              ))}
            </select>
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <br />
            You can assign your file to a folder:
            <br />
            <label htmlFor="folderInput">Choose or Create a Folder:</label>
            <input
              type="text"
              id="folderInput"
              value={this.state.searchQuery}
              onChange={this.handleSearchInputChange}
              placeholder="Type folder name..."
            />
            {this.state.searchQuery.trim() !== '' && (
              <ul>
                {this.filteredFolders().map(folder => (
                  <li key={folder.id}>{folder.folder_name}</li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <input
              type="checkbox"
              checked={this.state.showAllFolders}
              onChange={this.handleShowAllFoldersChange}
            />
            <label htmlFor="showAllFolders">Show all folders</label>
          </div>
          <input
            type="file"
            multiple
            accept=".pdf,.png,.jpg,.jpeg,.gif"
            onChange={this.handleFileUpload}
            id="fileInput"
          />
          <br />
          <br />
          <button type="submit" className="btn btn-primary btn-block" >
            Submit
          </button>
          &nbsp; &nbsp;
          <button type="button" className="btn btn-primary btn-block" disabled={!this.state.notifyBtnEnabled} onClick={() => this.handleNotifyClick()}>
            Notify athlete by email
          </button>
          &nbsp; &nbsp;
          <button type="button" className="btn btn-primary btn-block" disabled={!this.state.profileBtnEnabled} onClick={() => this.handleProfileClick()}>
            Show Profile
          </button>
          <div style={{ marginLeft: '90px' }}>
            <input
              type="checkbox"
              checked={this.state.sendEmailWithoutFile}
              onChange={this.handleCheckboxChange}
            />
            <label htmlFor="sendEmailWithoutFile" style={{ fontSize: '12px' }}>Forced Notify</label>
          </div>
        </form>
        <br />
        <div>
          <h5>Upload Status</h5>
          <ul>
            {uploadStatus.map((upload, index) => (
              <li key={index}>
                {upload.fileName} <img src={upload.img} alt={upload.status} width={20} height={20} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default UploadFileC_Old;