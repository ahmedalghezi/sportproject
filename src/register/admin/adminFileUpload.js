import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import checkMark from '../../assets/img/check-mark.png';
import crossMark from '../../assets/img/cross-mark.png';
import logo from '../../loading-gif.gif';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UploadFileC.css';

class UploadFileC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      folders: [],
      searchQuery: "",
      selectedFolder: null,
      ID: props.ID || "",
      uploadStatus: [],
      key: props.ID || "",
      athleteID: props.ID || "",
      notifyBtnEnabled: false,
      profileBtnEnabled: false,
      sendEmailWithoutFile: false,
      showAllFolders: false,
      newFolderName: '',
      uploadProgress: 0,
      folderFiles: {},  // State to hold files for each folder
      fileTitles: {},   // New state to hold titles for each folder
      showToImproveMembers: false, // Initially unchecked
    };
  }

  componentDidMount() {
    this.loadFolders();
  }

  componentDidUpdate(prevProps, prevState) {
    const { key } = this.state;
    const { ID } = this.props;
    if (key !== prevState.key && key && prevState.key) {
      this.setState({
        uploadStatus: [],
        notifyBtnEnabled: false,
        profileBtnEnabled: false,
      });
    }
    if (ID !== prevProps.ID) {
      this.setState({ key: ID, athleteID: ID });
    }
  }

  loadFolders = () => {
    const url = 'https://inprove-sport.info/files/athlete_folders_admin';
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ folders: data });
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }

  handleSearchInputChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  }

  filteredFolders = () => {
    const { folders, searchQuery, key, showAllFolders } = this.state;
    return folders
      .filter(folder => showAllFolders || folder.athlete_id === key)
      .filter(folder =>
        folder.folder_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }

  handleCheckboxChange = (event) => {
    this.setState({ sendEmailWithoutFile: event.target.checked, notifyBtnEnabled: event.target.checked });
  }

  handleKeyChange = (event) => {
    const selectedKey = event.target.value;
    this.setState({ key: selectedKey, athleteID: selectedKey });
  }

  handleShowAllFoldersChange = (event) => {
    this.setState({ showAllFolders: event.target.checked });
  }

  handleFolderSelect = (folder) => {
    this.setState({ selectedFolder: folder }, () => {
      this.loadFolderFiles(folder.folder_name);
      //toast.info(`Selected folder: ${folder.folder_name}`);
    });
  }

  handleDragOver = (event) => {
    event.preventDefault();
  }

  handleDrop = async (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const { selectedFolder } = this.state;

    if (!selectedFolder) {
      toast.error('Please select a folder first.');
      return;
    }

    this.setState({ files });
    await this.handleSubmit();
  }

  handleSubmit = async () => {
    const { files, selectedFolder, newFolderName } = this.state;

    if (!files.length || (!selectedFolder && !newFolderName.trim())) {
      toast.error("All fields are required.");
      return;
    }

    let uploadStatus = files.map(file => ({ fileName: file.name, status: 'loading', img: logo }));
    this.setState({ uploadStatus, uploadProgress: 0 });

    let totalProgress = 0;
    let progressStep = 100 / files.length;

    for (const [index, file] of Array.from(files).entries()) {
      let formData = new FormData();
      formData.append('file', file);
      formData.append('athlete_id', this.state.key);
      formData.append('folderName', selectedFolder ? selectedFolder.folder_name : newFolderName);
      formData.append('showToImproveMembers', this.state.showToImproveMembers);

      try {
        await axios.post('https://inprove-sport.info/files/sendMFileToAthlete', formData, {
          onUploadProgress: progressEvent => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            this.setState({ uploadProgress: (index + 1) * progressStep });
          }
        });
        uploadStatus[index] = { fileName: file.name, status: 'ok', img: checkMark };
        this.setState({ notifyBtnEnabled: true, profileBtnEnabled: true });
        this.loadFolders();
      } catch (error) {
        console.error('Error uploading file:', error);
        uploadStatus[index] = { fileName: file.name, status: 'error', img: crossMark };
      }
      this.setState({ uploadStatus });
    }
    this.setState({ uploadProgress: 100 });
  }

  handleNotifyClick = async () => {
    const athleteID = this.state.key || this.props.ID;

    try {
      const response = await axios.post(
        'https://inprove-sport.info/files/nbTrYxc6dNytxLo/sendReportNotification',
        { athlete_id: athleteID }
      );
      if (response.data.res === 'ok') {
        this.setState({ notifyBtnEnabled: false, sendEmailWithoutFile: false });
        toast.success(`Email sent successfully to athlete ID: ${athleteID}`);
      } else {
        toast.error("Error: email not sent");
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  handleProfileClick = () => {
    const athleteID = this.state.key || this.props.ID;
    this.props.showProfile(athleteID);
  }

loadFolderFiles = (folderName) => {
  const { athleteID } = this.state;

  // Create the request body
  const requestBody = {
    athlete_id: athleteID,
    folderName: folderName
  };

  // Log the request body
  console.log('Request Body:', requestBody);

  axios.post('https://inprove-sport.info/files/getFoldersFiles', requestBody)
    .then(response => {
      // Log the response data
      console.log('Response Data:', response.data);

      const folderFiles = { ...this.state.folderFiles };
      const fileTitles = { ...this.state.fileTitles };

      // Save folder files and file titles
       folderFiles[folderName] = response.data.map(file => file.file_name);
        fileTitles[folderName] = response.data.map(file => file.title);

      this.setState({ folderFiles, fileTitles });
    })
    .catch(error => {
      // Log the error if there's an issue with the request
      console.error('Error fetching folder files:', error);
      toast.error('Failed to load files for the folder.');
    });
}



  handleNewFolderNameChange = (event) => {
    this.setState({ newFolderName: event.target.value });
  }

  handleCreateFolder = () => {
    const { newFolderName } = this.state;
    if (newFolderName.trim()) {
      const newFolder = { folder_name: newFolderName };
      this.setState({
        folders: [...this.state.folders, newFolder],
        selectedFolder: newFolder,
        newFolderName: '',
      });
      toast.success(`Created and selected new folder: ${newFolderName}`);
    } else {
      toast.error("Folder name cannot be empty.");
    }
  }

handleRename = async (filename, newTitle) => {
  const { athleteID } = this.state;

  try {
    const response = await axios.post('https://inprove-sport.info/files/renameFile', {
      athlete_id: athleteID,
      filename: filename,
      newTitle: newTitle
    });

    if (response.data.res === 'ok') {
      // Update the fileTitles state
      const folderName = this.state.selectedFolder.folder_name;
      const updatedTitles = { ...this.state.fileTitles };
      const index = this.state.folderFiles[folderName].indexOf(filename);
      if (index > -1) {
        updatedTitles[folderName][index] = newTitle;
      }
      this.setState({ fileTitles: updatedTitles });
      toast.success('File renamed successfully');
    } else {
      toast.error('Error renaming file');
    }
  } catch (error) {
    console.error('Error renaming file:', error);
    toast.error('Failed to rename file');
  }
};


handleDelete = async (filename) => {
  const { athleteID } = this.state;

  try {
    const response = await axios.post('https://inprove-sport.info/files/deleteFile', {
      athlete_id: athleteID,
      filename: filename
    });

    if (response.data.res === 'ok') {
      // Remove file from the state
      const folderName = this.state.selectedFolder.folder_name;
      const updatedFiles = { ...this.state.folderFiles };
      const updatedTitles = { ...this.state.fileTitles };

      updatedFiles[folderName] = updatedFiles[folderName].filter(file => file !== filename);
      delete updatedTitles[folderName][updatedFiles[folderName].indexOf(filename)];

      this.setState({ folderFiles: updatedFiles, fileTitles: updatedTitles });
      toast.success('File deleted successfully');
    } else {
      toast.error('Error deleting file');
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    toast.error('Failed to delete file');
  }
};



  renderFilteredFolders = () => {
    const filteredFolders = this.filteredFolders();
    const { selectedFolder } = this.state;

    return (
      <div className="filtered-folders">
        <h5>Filtered Folders</h5>
        {filteredFolders.length > 0 ? (
          <div className="folder-grid">
            {filteredFolders.map(folder => {
              const isSelected = selectedFolder && selectedFolder.folder_name === folder.folder_name;
              return (
                <div
                  key={folder.folder_name}
                  onClick={() => this.handleFolderSelect(folder)}
                  className={`folder-item ${isSelected ? 'selected' : ''}`}
                >
                  {folder.folder_name}
                </div>
              );
            })}
          </div>
        ) : (
          <p>No folders found.</p>
        )}
      </div>
    );
  }

renderFiles = (folderName) => {
  const { folderFiles, fileTitles } = this.state;
  const fileNames = folderFiles[folderName] || [];
  const titles = fileTitles[folderName] || [];

  return (
    <div className="file-list">
      {fileNames.length > 0 ? (
        fileNames.map((fileName, index) => (
          <div key={fileName} className="file-item">
            <span>{titles[index]}</span>
            <div>
              <button
                className="rename"
                onClick={() => {
                  const newTitle = prompt('Enter new title:', titles[index]);
                  if (newTitle) this.handleRename(fileName, newTitle);
                }}
              >
                Rename
              </button>
              <button
                className="delete"
                onClick={() => this.handleDelete(fileName)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No files available in this folder.</p>
      )}
    </div>
  );
}





  render() {
    const { uploadStatus, key, showAllFolders, selectedFolder, uploadProgress, newFolderName } = this.state;
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

      sortedIDs = sortedData.map(item => item.id);
      sortedNames = sortedData.map(item => item.name);
    }

    return (
      <div>
        <ToastContainer />
        <h4>Admin Upload</h4>
        <div className="input-container">
          <label htmlFor="keyInput" className="input-label">
            Send Report to ID:
          </label>
          <div className="input-field">
            <select
              id="keyInput"
              value={this.state.key}
              onChange={this.handleKeyChange}
              size="10"
              style={{ width: '500px', height: '150px' }}
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
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <br />
            You can assign your file to a folder:
            <br />
            {this.renderFilteredFolders()}
            <br />
            <label htmlFor="newFolderInput">Create New Folder:</label>
            <input
              type="text"
              id="newFolderInput"
              value={newFolderName}
              onChange={this.handleNewFolderNameChange}
              placeholder="Enter new folder name..."
            />
            <button type="button" className="btn btn-secondary" onClick={this.handleCreateFolder}>
              Create Folder
            </button>
          </div>
          <div>
            <input
              type="checkbox"
              checked={showAllFolders}
              onChange={this.handleShowAllFoldersChange}
            />
            <label htmlFor="showAllFolders">Show all folders</label>
          </div>
          <div
            onDrop={this.handleDrop}
            onDragOver={this.handleDragOver}
            style={{ border: '2px dashed #ccc', padding: '20px', minHeight: '200px' }}
          >
            {selectedFolder ? (
              <div>
                <h5>Drop files here to upload to "{selectedFolder.folder_name}"</h5>
                {this.renderFiles(selectedFolder.folder_name)}
              </div>
            ) : (
              <h5>Select a folder to start dragging files here</h5>
            )}
          </div>
          <br />
          <button type="button" className="btn btn-primary btn-block" disabled={!this.state.notifyBtnEnabled} onClick={this.handleNotifyClick}>
            Notify athlete by email
          </button>
          &nbsp; &nbsp;
          <button type="button" className="btn btn-primary btn-block" disabled={!this.state.profileBtnEnabled} onClick={this.handleProfileClick}>
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



        <div>
          <input
              type="checkbox"
              id="showToImproveMembers"
              checked={this.state.showToImproveMembers}
              onChange={(e) => this.setState({ showToImproveMembers: e.target.checked })}
          />
          <label htmlFor="showToImproveMembers" style={{ fontSize: '12px' }}>
            Show this file only to In:prove members
          </label>
        </div>


      </div>
    );
  }
}

export default UploadFileC;
