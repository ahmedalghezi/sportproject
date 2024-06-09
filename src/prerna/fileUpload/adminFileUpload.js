// import React, { Component } from 'react';
// import axios from 'axios';
// import checkMark from '../../assets/img/check-mark.png';
// import crossMark from '../../assets/img/cross-mark.png';
// import logo from '../../loading-gif.gif';

// class UploadFileC extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       success: false,
//       error: false,
//       files: [],
//       ID: "",
//       folder: "",
//       uploadStatus: [],
//       notifyBtnEnabled: false,  
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   componentDidMount() {
//     if (this.props.ID) this.setState({ ID: this.props.ID });
//   }

//   handleChange(event) {
//     const target = event.target;
//     const value = target.value;
//     const name = target.name;

//     this.setState({
//       [name]: value,
//     });
//   }

//   async handleSubmit(event) {
//     event.preventDefault();

//     const {  folder, files } = this.state;
//     let ID = this.state.ID;
//     if(!ID)
//       ID = this.props.ID;

//     if (!files.length || !ID || !folder) {
//       alert("All fields are required.");
//       return;
//     }


//     let uploadStatus = [];
//     for (let i = 0; i < files.length; i++) {
//       let file = files[i];
//       uploadStatus.push({ fileName: file.name, status: 'loading', img: logo });
//     }
//     this.setState({ uploadStatus });

//     for (const [index, file] of Array.from(files).entries()) {
//       let formData = new FormData();
//       formData.append('file', file);
//       formData.append('athlete_id', ID);
//       formData.append('folderName', folder);

//       try 
//       {
//         const res = await axios.post('https://inprove-sport.info/files/sendMFileToAthlete', formData);
//         const result = res.data.res;

//         if (result === 'ok') {
//           uploadStatus[index] = { fileName: file.name, status: 'ok', img: checkMark };
//           this.setState({ notifyBtnEnabled: true });
//         } else if (result === 'error') {
//           uploadStatus[index] = { fileName: file.name, status: 'error', img: crossMark };
//         } else if (result === 'no') {
//           alert('Not authorized.');
//           return;
          
//       }

//         this.setState({ uploadStatus });
//       } catch (error) {
//         console.error('Error uploading file:', error);
//         uploadStatus[index] = { fileName: file.name, status: 'error', img: crossMark };
//         this.setState({ uploadStatus });
//       }
//     }

//     this.setState({files:[]})
//   }

//   handleFileUpload = event => {
//     this.setState({ files: event.target.files });
//   };


//   handleNotifyClick = async () => {
//     const athleteID = this.props.ID || this.state.ID;
//     try {
//       const response = await axios.post(
//           'https://inprove-sport.info/files/nbTrYxc6dNytxLo/sendReportNotification',
//           { athlete_id: athleteID }
//       );
//       if (response.data.res === 'ok') {
//         // Disable the notify button after successful email notification
//         this.setState({ notifyBtnEnabled: false });
//       }
//       else {alert("Error: email not sent")}
//     } catch (error) {
//       console.error('Error sending notification:', error);
//     }
//   };

//   render() {
//     const { uploadStatus } = this.state;
//     const athleteID = this.props.ID ;
//     const athleteName = this.props.athleteName ;

//     return (
//         <div>
//           <h4>Admin Upload</h4>
//             <label>Send Report to ID: {athleteID} , ({athleteName})</label> {/* New label */}
//             <form onSubmit={this.handleSubmit}>
//               <div className="form-group">
//                 <label>Folder Name</label>
//                 <input
//                     type="text"
//                     className="form-control"
//                     placeholder="folder"
//                     name="folder"
//                     onChange={this.handleChange}
//                 />
//               </div>

//               <input
//                   type="file"
//                   multiple
//                   accept=".pdf,.png,.jpg,.jpeg,.gif"
//                   onChange={this.handleFileUpload}
//               />
//               <br />
//               <br />
//               <button type="submit" className="btn btn-primary btn-block" >
//                 Submit
//               </button>
//               &nbsp; &nbsp;
//               <button type="button" className="btn btn-primary btn-block"   disabled={!this.state.notifyBtnEnabled}  onClick={() => this.handleNotifyClick()}>
//                 Notify athlete by email
//               </button>
//             </form>

//             <div>
//               <h4>Upload Status</h4>
//               <ul>
//                 {uploadStatus.map((upload, index) => (
//                     <li key={index}>
//                       {upload.fileName} <img src={upload.img} alt={upload.status} width={20} height={20} />
//                     </li>
//                 ))}
//               </ul>
//             </div>
//         </div>
//   );
//   }
// }


// export default UploadFileC;
