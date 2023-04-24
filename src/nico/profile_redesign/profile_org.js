/*
Vanessa Meyer
Ahmed Al-Ghezi
*/

import React, {Component} from "react";
import "./profile.css";
import PostCSVData from "../../DB/postCSV";
import PollIcon from '@mui/icons-material/Poll';
import SummarizeIcon from '@mui/icons-material/Summarize';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Box , Button, Typography} from "@mui/material";
import Header from "./Header";
import InfoIcon from '@mui/icons-material/Info';
import Avatar from "../avatar/avatar";
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import { ShowChart } from "@mui/icons-material";
import Modal from '@mui/material/Modal';
import LoadCharts from "../profilechart/profile_charts";
import graphimage from "./graph.png"
import avaimg from "./avatar.png"

//Profile Template
const diastyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
};

const avatarstyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
};

const standardstyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
};

class TestProfileC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filesList: [],
      surveyList: [],
      emptyMsg: "",
      showEmptyMsg: false,
      hideSurvey:false,
      showPopupav: false,
      showPopupdia: false,
      showInfo: false,
      showSurvey: false,
      showFiles: false,
      showReports: false,
    };
  }

  

  componentDidMount() {
    this.getFiles();
    this.getSurveys();
  }

  getFiles = () => {
    PostCSVData.getMyFiles()
        .then((response) => {
          if (response.data.res === "error") {
            alert("Es ist ein Fehler aufgetreten. Code pro 30");
            return;
          } else if (response.data.files && response.data.res === "ok") {
            this.setState({filesList: response.data.files});
          }
          if (response.data.empty) {
            this.setState({showEmptyMsg: true})
          }
          if (response.data.res === "no") {
            window.location.href = window.location.origin+"/reg/sign-in?org=$user$profile";
            return;
            //xxx alert("Bitte melde Dich an.");
          }
        })
        .catch((e) => {
          console.log(e);
          alert("Es ist ein Fehler aufgetreten. Code Pro39");
        });
  };
  getSurveys = () => {
    PostCSVData.getMySurveys()
        .then((response) => {
          if (response.data.res === "error") {
            const arr = ["connection error"];
            this.setState({surveyList: arr});
            return;
          } else {
            if(response.data.res === "hide"){
              this.setState({hideSurvey:true});
            }
            else
              this.setState({surveyList: response.data.files}); //todo
          }
        })
        .catch((e) => {
          console.log(e);
          alert("Es ist ein Fehler aufgetreten. Code Pro55");
        });
  };

  handlePopupOpenav = (event) => {
    this.setState({showPopupav: true})
  }
  handlePopupOpendia = (event) => {
    this.setState({showPopupdia: true})
  }

  handlePopupOpenfile = (event) => {
    this.setState({showFiles: true})
  }

  handlePopupOpenReports = (event) => {
    this.setState({showReports: true})
  }

  handlePopupOpenInfo = (event) => {
    this.setState({showInfo: true})
  }

  handlePopupOpenSurvey = (event) => {
    this.setState({showSurvey: true})
  }

  handlePopupClose = (event) => {
    this.setState({showPopupav: false});
    this.setState({showPopupdia: false});
    this.setState({showFiles: false});
    this.setState({showInfo: false});
    this.setState({showReports: false});
    this.setState({showSurvey: false});
  }

  handleFileClick = (event) => {
    event.preventDefault();
    if(event.target.name.startsWith("deletevftr5")){
      this.deleteFile(event.target.name.replace("deletevftr5",""));
      return;
    }
    window.location.href = "https://inprove-sport.info/" + "files/viewMyFiles/" + event.target.name;
  };

  deleteFile(fileName) {
    PostCSVData.deleteFile({"fileName":fileName}).then((response) => {
      if (response.data.res === "error") {
        alert("Es ist ein Fehler aufgetreten. Code pro 79");
        return;
      } else if (response.data.res === "ok") {
        alert("Datei gelöscht");
        this.getFiles();
      }
      if (response.data.res === "no") {
        alert("Bitte melde Dich an.");
      }
    })
        .catch((e) => {
          console.log(e);
          alert("Es ist ein Fehler aufgetreten. Code Pro93");
        });
  }


  showEmptyMessage() {
    const msg = "Hallo,</br>" +
        "<p>willkommen im Projektportal des in:prove Projektes.</p>" +
        "<p>Aktuell können wir Deine Ergebnisse noch nicht für den Abruf bereitstellen." +
        "Wir geben Dir Bescheid, sobald Du diese im Projektportal abrufen kannst.<p/>" +
        "<p>Mit sportlichen Grüßen</br>," +
        "Dein in:prove Team</p>";

  }

  render() {
    return (
      <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Mein Profil" subtitle="Willkommen bei in:prove!" />
        <Box>
          <Button
            onClick={this.handlePopupOpenInfo}
            sx={{
              backgroundColor: "#3e4396",
              color: "#e0e0e0",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 10px",
            }}
          >
            <InfoIcon sx={{ mr: "10px" }} />
          </Button>
          <Modal
          open={this.state.showPopupav}
          onClose={this.handlePopupClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={avatarstyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Athlet:In
    </Typography>
            <Avatar/>
          </Box>
        </Modal>
        <Modal
          open={this.state.showPopupdia}
          onClose={this.handlePopupClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={diastyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
    </Typography>
            <LoadCharts/>
          </Box>
        </Modal>

        <Modal
          open={this.state.showInfo}
          onClose={this.handlePopupClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={standardstyle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
              Willkommen bei in:prove!
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <p>Hallo,</p><p>willkommen im Projektportal des in:prove Projektes.</p><p>Aktuell können wir
              Deine Ergebnisse noch nicht für den Abruf bereitstellen.
              Wir geben Dir Bescheid, sobald Du diese im Projektportal abrufen kannst.</p>
              <p>Mit sportlichen Grüßen,<br></br> Dein in:prove Team</p>
        </Typography>
          </Box>
        </Modal>

        <Modal
          open={this.state.showSurvey}
          onClose={this.handlePopupClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={standardstyle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
              Meine Umfragen
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <ul>
                  <ul>
                    {this.state.surveyList.map((item) => (
                        <li key={item.title}>
                          <a href={item.link}>{item.title}</a></li>
                    ))}
                  </ul>
                </ul>
        </Typography>
          </Box>
        </Modal>

        <Modal
          open={this.state.showReports}
          onClose={this.handlePopupClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={standardstyle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
              Meine Berichte
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <ul>
                  {this.state.filesList.map((item) => (
                      <li key={item.file_name} onClick={this.handleFileClick}>
                        <a hidden={!item.admin} name={"deletevftr5"+item.file_name} href={"#" + item.file_name}>(delete) </a>
                        <a name={item.file_name} href={"#" + item.file_name}>{item.title}</a>
                      </li>
                  ))}
                </ul>
        </Typography>
          </Box>
        </Modal>

        <Modal
          open={this.state.showFiles}
          onClose={this.handlePopupClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={standardstyle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
              Meine Dateien
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        
        </Typography>
          </Box>
        </Modal>

        </Box>
      </Box>
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor="#e0e0e0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={this.handlePopupOpenSurvey}
        >
          <Typography
        variant="h5"
        color="#040509"
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        Meine Umfragen
      </Typography>
          <PollIcon
                sx={{ color: "#535ac8", fontSize: "36px" }}
              />
        </Box><Box
          gridColumn="span 4"
          backgroundColor="#e0e0e0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={this.handlePopupOpenReports}
        >
                    <Typography
        variant="h5"
        color="#040509"
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        Meine Berichte
      </Typography>
          <SummarizeIcon
                sx={{ color: "#535ac8", fontSize: "36px" }}
              />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor="#e0e0e0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={this.handlePopupOpenfile}
        >
                    <Typography
        variant="h5"
        color="#040509"
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        Meine Dateien
      </Typography>
          <UploadFileIcon
                sx={{ color: "#535ac8", fontSize: "36px" }}
              />
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor="#e0e0e0"
          onClick={this.handlePopupOpenav}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
        variant="h5"
        color="#040509"
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        Mein Avatar
      </Typography>
          <SportsGymnasticsIcon
                sx={{ color: "#535ac8", fontSize: "36px" }}
              />
          </Box>
          <Box           
          alignItems="center"
          justifyContent="center"
          display="flex "
          >
<Box component="img" src={avaimg}  sx={{ height: "250px", width: "auto", padding:"20px"}} />
          </Box>
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor="#e0e0e0"
          onClick={this.handlePopupOpendia}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
        variant="h5"
        color="#040509"
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        Meine Diagramme
      </Typography>
          <ShowChart
                sx={{ color: "#535ac8", fontSize: "36px" }}
              />
          
          </Box>
          <Box           
          alignItems="center"
          justifyContent="center"
          display="flex "
          >
            <Box component="img" src={graphimage}  sx={{ height: "auto", width: "380px", padding:"20px" }} />
          </Box>
        </Box>
        </Box>

        

      
      {/*
        <div id="beside">
          <div className="profile-name" hidden={true}>
            <div>
              <h3> Max Mustermann </h3>
            </div>
          </div>

          <div>

            <div hidden={true} className="information-content">
              {" "}
              <h4>Information</h4>
              <button onClick={this.handleClick} className="btn btn-primary btn-block">
                {" "}
                update profile
              </button>
            </div>
            <div hidden={!this.state.showEmptyMsg}>
              <p>Hallo,</p><p>willkommen im Projektportal des in:prove Projektes.</p><p>Aktuell können wir
              Deine Ergebnisse noch nicht für den Abruf bereitstellen.
              Wir geben Dir Bescheid, sobald Du diese im Projektportal abrufen kannst.</p>
              <p>Mit sportlichen Grüßen,<br></br> Dein in:prove Team</p>
            </div>
            <hr></hr>


            <div id="beside">
              <div className="list-one" hidden={this.state.hideSurvey}>

                <h4>Meine Umfragen</h4>

                <ul>
                  <ul>
                    {this.state.surveyList.map((item) => (
                        <li key={item.title}>
                          <a href={item.link}>{item.title}</a></li>
                    ))}
                  </ul>
                </ul>
              </div>
              <div className="list-two">
                <h4>Meine Dateien</h4>
                <ul>
                  {this.state.filesList.map((item) => (
                      <li key={item.file_name} onClick={this.handleFileClick}>
                        <a hidden={!item.admin} name={"deletevftr5"+item.file_name} href={"#" + item.file_name}>(delete) </a>
                        <a name={item.file_name} href={"#" + item.file_name}>{item.title}</a>
                      </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
                  */}
        </Box>
    );
  }

}

export default TestProfileC;

