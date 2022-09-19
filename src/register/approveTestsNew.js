import React, { Component } from "react";
import PostSignup from "../DB/postSignup";

class ApproveTestsCNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      disallowedStudies: [],
      discipline: "Tischtennis",
      email: "",
      area_frank: [],
      area_physiologie: [],
      area_psychologie: [],
      area_social: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    const target = e.target;
    let value = target.value;
    const name = target.name;
    const id = target.id;

    if (name === "switchId") {
      value = target.checked;

      const arr = this.state.disallowedStudies;
      arr[id] = value;

      this.setState({
        disallowedStudies: arr,
      });
    }
  };

  //TODO handleSubmit, email,disp,studies_staus, studies_ids
  handleSubmit = (event) => {
    PostSignup.setStudies(this.state)
      .then((response) => {
        if (response.data.res === "error")
          alert("Es ist ein Fehler aufgetreten.");
        else if (response.data.res === "duplicate key")
          alert("Diese Email-Adresse ist bereits registriert.");
        //this.props.history.push('./AfterReg');
        else this.props.navigate("/reg/regSuc");
      })
      .catch((e) => {
        console.log(e);
        alert("Es ist ein Fehler aufgetreten.");
      });
  };

  //splits data array into 4 new arrays
  splitResArray = (data) => {
    let arrOrigin = data;
    let arrFrank = this.state.area_frank;
    let arrPhysio = this.state.area_physiologie;
    let arrPsycho = this.state.area_psychologie;
    let arrSocial = this.state.area_social;
    for (let i = 0; i < arrOrigin.length; i++) {
      if (arrOrigin[i].area === "Trainingswissenschaft Frankfurt") {
        arrFrank.push(arrOrigin[i]);
      } else if (arrOrigin[i].area === "Leistungsphysiologie Gießen") {
        arrPhysio.push(arrOrigin[i]);
      } else if (arrOrigin[i].area === "Leistungspsychologie Köln") {
        arrPsycho.push(arrOrigin[i]);
      } else if (
        arrOrigin[i].area === "Sozialwissenschaften des Sports Gießen"
      ) {
        arrSocial.push(arrOrigin[i]);
      }
    }
    this.setState({
      area_frank: arrFrank,
      area_physiologie: arrPhysio,
      area_psychologie: arrPsycho,
      area_social: arrSocial,
    });
    // print to console for testing
    console.log(
      this.state.area_frank,
      this.state.area_physiologie,
      this.state.area_psychologie,
      this.state.area_social
    );
  };

  componentDidMount() {
    this.getAllStudies();
    this.setState({ discipline: this.props.discipline });
    this.setState({ email: this.props.email });
  }

  getAllStudies() {
    PostSignup.getStudies()
      .then((response) => {
        if (response.data.res && response.data.res === "error") {
          alert("Es ist ein Fehler aufgetreten");

          return;
        } else {
          console.log(response.data.res);

          //split the result array into the four arrays of the state:
          this.splitResArray(response.data.res);
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Es ist ein Fehler aufgetreten.");
      });
  }

  //switches from the four state arrays  area_frank:[],
  //       area_physiologie:[],
  //       area_psychologie:[],
  //       area_social:[]

  render() {
    return (
      <div>
        <p>Ich nehme an folgenden Testungen teil:</p>

        <div>
          <h6>Trainingswissenschaft Frankfurt</h6>
          {this.state.area_frank.map(
            (item) =>
              item.disp === this.state.discipline && (
                <div key={item.study_id}>
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
                            id={item.study_id}
                            defaultValue="switchId"
                            defaultChecked={this.state.isToggleOn}
                            onChange={this.handleChange}
                          />
                          <label className="form-check-label"> </label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )
          )}
        </div>
        <div>
          <h6>Leistungsphysiologie Gießen</h6>
          {this.state.area_physiologie.map(
            (item) =>
              item.disp === this.state.discipline && (
                <div key={item.study_id}>
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
                            id={item.study_id}
                            defaultValue="switchId"
                            defaultChecked={this.state.isToggleOn}
                            onChange={this.handleChange}
                          />
                          <label className="form-check-label"> </label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )
          )}
        </div>
        <div>
          <h6>Leistungspsychologie Köln</h6>
          {this.state.area_psychologie.map(
            (item) =>
              item.disp === this.state.discipline && (
                <div key={item.study_id}>
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
                            id={item.study_id}
                            defaultValue="switchId"
                            defaultChecked={this.state.isToggleOn}
                            onChange={this.handleChange}
                          />
                          <label className="form-check-label"> </label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )
          )}
        </div>
        <div>
          <h6>Sozialwissenschaften des Sports Gießen</h6>
          {this.state.area_social.map(
            (item) =>
              item.disp === this.state.discipline && (
                <div key={item.study_id}>
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
                            id={item.study_id}
                            defaultValue="switchId"
                            defaultChecked={this.state.isToggleOn}
                            onChange={this.handleChange}
                          />
                          <label className="form-check-label"> </label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )
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

export default ApproveTestsCNew;
