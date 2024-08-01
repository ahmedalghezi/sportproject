import React, { Component } from 'react';
import axios from 'axios';
import checkMark from '../../prerna/assets/img/check-mark.png';
import crossMark from '../../prerna/assets/img/cross-mark.png';
import logo from '../loading-gif.gif';

class UploadFileC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      error: false,
      files: [],
      ID: "",
      folder: "",
      uploadStatus: [],
      key: this.props.ID,
      athleteID: this.props.ID,
      athleteName: this.props.athleteName,
      notifyBtnEnabled: false,
      keyChanged: false,  
      profileBtnEnabled: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.ID) this.setState({ ID: this.props.ID,
      key: this.props.ID,
      athleteID: this.props.ID,
    });
  }

  componentDidUpdate(prevProps, prevState) {

    // console.log('Previous State:', prevState);
    // console.log('New State:', this.state);

    if (this.state.key !== prevState.key && this.state.key && prevState.key) {
      this.setState((prevState) => {
        const updatedState = {};
  
        if (prevState.folder !== '') {
          updatedState.folder = '';
        }
  
        if (prevState.files.length > 0) {
          updatedState.files = [];
        }
  
        if (Object.keys(updatedState).length > 0) {
          // Reset the text field values to empty strings
          document.getElementById('folderInput').value = '';
          document.getElementById('fileInput').value = '';
          this.setState({ uploadStatus: [] });

          return updatedState;
        }
  
        return null;
      });
    }
  }
  
  
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
  
    // Check if the folder or files fields are not empty
    if ((name === "folder" || name === "files") && value) {
      // Check if the athleteID is empty, and update it with the selected key
      if (!this.state.athleteID) {
        this.setState({
          athleteID: this.state.key || this.props.ID,
        });
      }
      // Check if the key is empty, and update it with the selected key
      if (!this.state.key) {
        this.setState({
          key: this.state.athleteID || this.props.ID,
        });
      }
    }
  
    this.setState({
      [name]: value,
    });
  }
  
  
  
  

//   handleKeyChange = (event) => {
//     this.setState({ key: event.target.value });
// }

  handleKeyChange = (event) => {
    const selectedKey = event.target.value;
    // const index = sortedIDs.findIndex((id) => id === selectedKey);
    // const selectedAthleteName = index !== -1 ? sortedNames[index] : "";

    this.setState({
      key: selectedKey,
      athleteID: selectedKey, // Update athleteID with the selected key
      // athleteName: selectedAthleteName, // Update athleteName with the selected name
    });
  }


  // handleChange(event) {
  //   const target = event.target;
  //   const value = target.value;
  //   const name = target.name;

  //   this.setState({
  //     [name]: value,
  //   });
  // }

  async handleSubmit(event) {
    event.preventDefault();
  
    const { folder, files } = this.state;
    let ID = this.state.key;
    if (!ID)
      ID = this.props.ID;

      console.log("Folder:", folder);
      console.log("Files:", files);
      console.log("ID:", ID);
  
    if (!files.length) {
      console.log("Files field is empty");
    }
    if (!ID) {
      console.log("ID field is empty");
    }
    if (!folder) {
      console.log("Folder field is empty");
    }
  
    if (!files.length || !ID || !folder) {
      alert("All fields are required.");
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
          console.log("Sending to Athlete Id : ", ID)
          uploadStatus[index] = { fileName: file.name, status: 'ok', img: checkMark };
          this.setState({ notifyBtnEnabled: true });
          this.setState({ profileBtnEnabled: true });
        } 
        
        else if (result === 'error') {
          console.log("Sending to Athlete Id : ", ID)
          uploadStatus[index] = { fileName: file.name, status: 'error', img: crossMark };
          // this.setState({ notifyBtnEnabled: true });
          // this.setState({profileBtnEnabled: true});
        } 
        
        else if (result === 'no') {
          console.log("Sending to Athlete Id : ", ID)
          // uploadStatus[index] = { fileName: file.name, status: 'error', img: crossMark };
          alert('Not authorized.');
          
          this.setState({ uploadStatus: [] });
          // this.setState({
          //   folder: '',
          //   files: []
          // });
          
          // this.setState({ notifyBtnEnabled: true });
          // this.setState({profileBtnEnabled: true});

          return;
        }

        this.setState({ uploadStatus });

      } 
      catch (error) {
        console.error('Error uploading file:', error);
        uploadStatus[index] = { fileName: file.name, status: 'error', img: crossMark };
        this.setState({ uploadStatus });
      }
    }

    // this.setState({
    //   folder:'',
    //   files:[]})
  }

  handleFileUpload = event => {
    this.setState({ files: event.target.files });
  };


  handleNotifyClick = async () => {
    const athleteID = this.state.key || this.props.ID;
    console.log("athlete id notify click : ", athleteID)

    try {
      const response = await axios.post(
          'https://inprove-sport.info/files/nbTrYxc6dNytxLo/sendReportNotification',
          { athlete_id: athleteID }
        
      );
      if (response.data.res === 'ok') {
        // Disable the notify button after successful email notification
        this.setState({ notifyBtnEnabled: false });
      }
      else {alert("Error: email not sent")
      // this.setState({ notifyBtnEnabled: false });
    }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  handleProfileClick = async () => {
    const athleteID = this.state.key || this.props.ID;
    console.log("athlete id profile click : ", athleteID)
    // window.location.href = "https://inprove-sport.info/" + "files/viewConsent/" + athleteID
    try {
      window.open( "https://inprove-sport.info/user/profile", '_blank').focus();
      this.setState({ profileBtnEnabled: false });

    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { uploadStatus, key } = this.state;
    const { allIDs, allNames} = this.props;
    
    // console.log("athleteID : ", athleteID)
    // console.log("key : ", key)

    const athleteID = this.props.ID ;
    const athleteName = this.props.athleteName ;

    // console.log(" athleteID : ", athleteID )
    // console.log(" athleteName : ", athleteName)

    let sortedIDs = [];
    let sortedNames = [];

    if (allIDs.length > 0 && allNames.length > 0) {
      const sortedData = allIDs.map((id, index) => ({
        id,
        name: allNames[index],
        })).sort((a, b) => a.name.localeCompare(b.name));

    // Extract sorted IDs and sorted Names arrays
    sortedIDs = sortedData.map((item) => item.id);
    sortedNames = sortedData.map((item) => item.name);

    
      }

    return (
        <div>
          <h4>Admin Upload</h4>
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
                        {sortedIDs.length > 0 ? (
                        <option value={athleteID}> {/* Set default value to athleteID */}
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

        {/* {key && (
            <div className="key-tab">
                <p>Athlete ID: {key} </p> */}
                {/* <p>Athlete Name: {value}</p> */}
            {/* </div> */}
        
        
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Folder Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="folder"
                    name="folder"
                    onChange={this.handleChange}
                    id="folderInput"
                />
              </div>
              <br/>
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
              <button type="button" className="btn btn-primary btn-block"   disabled={!this.state.notifyBtnEnabled}  onClick={() => this.handleNotifyClick()}>
                Notify athlete by email
              </button>
              &nbsp; &nbsp;
              <button type="button" className="btn btn-primary btn-block"   disabled={!this.state.profileBtnEnabled}  onClick={() => this.handleProfileClick()}>
                Show Profile
              </button>
            </form>
                <br/>
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


export default UploadFileC;
