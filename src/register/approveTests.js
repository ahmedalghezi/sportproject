/*
  By Vanessa Meyer,
  Ahmed Al-Ghezi
*/

import React, {Component, useState} from "react";
import PostSignup from "../DB/postSignup";

class ApproveTests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      //disallowedStudies: [],
      discipline: "",
      email: "",
      area_frank: [],
      area_physiologie: [],
      area_psychologie: [],
      area_social: [],
      statusArr:[],
      ID:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount() {
    if(!this.props.emailConfirmationCode && this.props.discipline)
      this.getAllStudies();
    else
      this.getAllStudiesParam();
    this.setState({ discipline: this.props.discipline });
    this.setState({ email: this.props.email });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(!this.props.emailConfirmationCode && prevProps.discipline != this.props.discipline){
      this.getAllStudies();
    }
  }

  handleChange = (e) => {
    const target = e.target;
    let value = target.value;
    const name = target.name;
    const id = target.id;

    if (name === "switchId") {
      value = target.checked;

      const arr = this.state.statusArr;
      for( let i = 0 ; i < arr.length ; i++) {
        if(arr[i].study_area_id === id) {
          arr[i].status = value;
          break;
        }
      }

      this.setState({
        statusArr: arr,
      });
    }
  };

  //TODO handleSubmit, email,disp,studies_staus, studies_ids
  handleSubmit = (event) => {
    let studsEmail = this.props.email;
    let studsDisp = this.props.discipline;
    let statusArr = this.state.statusArr;
    const studiesStatus = {
      email: studsEmail,
      discipline: studsDisp,
      statusArr: statusArr,
    };
    if(this.state.ID){
      studiesStatus.ID = this.state.ID;
    }
    PostSignup.postStudies(studiesStatus)
      .then((response) => {
        if (response.data.res === "error")
          alert("Es ist ein Fehler aufgetreten.");
        else if(this.props.onSent)
          this.props.onSent();
        else
          alert("Changes saved successfully");
      })
      .catch((e) => {
        console.log(e);
        alert("Es ist ein Fehler aufgetreten.");
      });
  };


  splitResArray = (data) => {
    let arrOrigin = data;
    let arrFrank = [];
    let arrPhysio = [];
    let arrPsycho = [];
    let arrSocial = [];
    let all = [];
    let index = 0;
    for (let i = 0; i < arrOrigin.length; i++) {
      if(this.props.discipline && this.props.discipline != "" && arrOrigin[i].disp != this.props.discipline)
        continue;
      arrOrigin[i].study_area_id = arrOrigin[i].study_id+"-"+arrOrigin[i].area_id;
      all[index++] = {status:true, study_id:arrOrigin[i].study_id, area_id:arrOrigin[i].area_id, study_area_id:arrOrigin[i].study_area_id};
      if (arrOrigin[i].area === "Trainingswissenschaft Frankfurt") {
        arrFrank.push(arrOrigin[i]);
      } else if (arrOrigin[i].area === "Leistungsphysiologie Gießen") {
        arrPhysio.push(arrOrigin[i]);
      } else if (arrOrigin[i].area === "Leistungspsychologie Köln") {
        arrPsycho.push(arrOrigin[i]);
      } else if (arrOrigin[i].area === "Sozialwissenschaften des Sports Gießen") {
        arrSocial.push(arrOrigin[i]);
      }
    }
    this.setState({
      area_frank: arrFrank,
      area_physiologie: arrPhysio,
      area_psychologie: arrPsycho,
      area_social: arrSocial,
      statusArr:all,
    });
  };


  getAllStudies() {
      PostSignup.getStudies()
      .then((response) => {
        if (response.data.res && response.data.res === "error") {
          alert("Es ist ein Fehler aufgetreten");
          return;
        } else {
          console.log(response.data.res);
          //split the result array into the four arrays of the state:
          this.splitResArray(response.data.data);
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Es ist ein Fehler aufgetreten.");
      });
  }


  getAllStudiesParam() {
    const data = {emailConfirmationCode:this.props.emailConfirmationCode};
    PostSignup.getStudiesParam(data)
        .then((response) => {
          if (response.data.res && response.data.res === "error") {
            alert("Es ist ein Fehler aufgetreten");
            return;
          } else {
            console.log(response.data.res);
            this.setState({ID:response.data.emid});
            //split the result array into the four arrays of the state:
            this.splitResArray(response.data.data);
          }
        })
        .catch((e) => {
          console.log(e);
          alert("Es ist ein Fehler aufgetreten.");
        });
  }



  render() {
     return (
      <div>
        <p>Ich nehme an folgenden Messungen teil:</p>

        <div>
          <h6>Motorik</h6>
          {this.state.area_frank.map(
            (item) =>
              
                (<div key={item.study_area_id}>
                  <table>
                    <tbody>
                      <tr>
                        <td width={300}>{item.study}</td>
                        <td
                          className="form-check form-switch"
                          id="toggle-switch"
                        >
                          <input
                            name="switchId"
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id={item.study_area_id}
                            defaultValue="switchId"
                            defaultChecked={this.state.isToggleOn}
                            onChange={this.handleChange}
                          />
                          <label className="form-check-label"> </label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>)
              
          )}
        </div>
        <br/>
        <div>
          <h6>Physiologi</h6>
          {this.state.area_physiologie.map(
            (item) =>
              
                (<div key={item.study_area_id}>
                  <table>
                    <tbody>
                      <tr>
                        <td width={300}>{item.study}</td>
                        <td
                          className="form-check form-switch"
                          id="toggle-switch"
                        >
                          <input
                            name="switchId"
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id={item.study_area_id}
                            defaultValue="switchId"
                            defaultChecked={this.state.isToggleOn}
                            onChange={this.handleChange}
                          />
                          <label className="form-check-label"> </label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>)
              
          )}
        </div>
        <br/>
        <div>
          <h6>Spsychologie</h6>
          {this.state.area_psychologie.map(
            (item) =>
              
                (<div key={item.study_area_id}>
                  <table>
                    <tbody>
                      <tr>
                        <td width={300}>{item.study}</td>
                        <td
                          className="form-check form-switch"
                          id="toggle-switch"
                        >
                          <input
                            name="switchId"
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id={item.study_area_id}
                            defaultValue="switchId"
                            defaultChecked={this.state.isToggleOn}
                            onChange={this.handleChange}
                          />
                          <label className="form-check-label"> </label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>)
              
          )}
        </div>
        <br/>
        <div>
          <h6>Sozialwissenschaft</h6>
          {this.state.area_social.map(
            (item) =>
              
                (<div key={item.study_area_id}>
                  <table>
                    <tbody>
                      <tr>
                        <td width={300}>{item.study}</td>
                        <td
                          className="form-check form-switch"
                          id="toggle-switch"
                        >
                          <input
                            name="switchId"
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id={item.study_area_id}
                            defaultValue="switchId"
                            defaultChecked={this.state.isToggleOn}
                            onChange={this.handleChange}
                          />
                          <label className="form-check-label"> </label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>)
              
          )}
        </div>

        <button
          type="button"
          className="btn btn-primary btn-block m-2"
          onClick={this.handleSubmit}
        >
          Senden
        </button>
      </div>
    );
  }
}


/*function ApproveTestsCNew(props) {
 let navigate = useNavigate();
const [searchParams, setSearchParams] = useSearchParams();
 const [showStudies, setShowStudies] = useState(false);
 const st = searchParams.get("admiregxn");
 let tempParam = searchParams.get("temreg");
 let isTemp = false;
 if(tempParam)
   isTemp = true;
 if(st === "" || st == null) {
   return <div>
     <div hidden={showStudies}>
       <ApproveTestsNew {...props} navigate={navigate} tempReg={isTemp} showStudies={setShowStudies}/>
     </div>
     <div hidden={!showStudies}>
       <ApproveTestsCNew {...props} navigate={navigate} showStudies={setShowStudies}/>
     </div>
   </div>;
 }
 else
   return <ApproveTestsNew {...props} navigate={navigate}/>;
}*/

export default ApproveTests;
