import React, { Component } from "react";

class ApproveTestsCNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      disallowedStudies: [],
      discipline: "Tischtennis", //TODO discipline from signup or select box
      //TODO get data backend
      //Example data for testing:
      data: [
        {
          disp_id: "1",
          disp: "Tischtennis",
          study_id: "1",
          study: "study1",
          area: "Trainingswissenschaft Frankfurt",
        },
        {
          disp_id: "1",
          disp: "Tischtennis",
          study_id: "12",
          study: "study12",
          area: "Trainingswissenschaft Frankfurt",
        },
        {
          disp_id: "1",
          disp: "Tischtennis",
          study_id: "2",
          study: "study2",
          area: "Leistungsphysiologie Gießen",
        },
        {
          disp_id: "1",
          disp: "Tischtennis",
          study_id: "3",
          study: "study3",
          area: "Leistungspsychologie Köln",
        },
        {
          disp_id: "1",
          disp: "Tischtennis",
          study_id: "123",
          study: "study123",
          area: "Trainingswissenschaft Frankfurt",
        },
        {
          disp_id: "2",
          disp: "Basketball",
          study_id: "22",
          study: "study22",
          area: "Trainingswissenschaft Frankfurt",
        },
      ],
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

  //TODO handleSubmit
  handleSubmit = () => {
    console.log("Submitted", this.state);
  };

  render() {
    return (
      <div>
       
        <p>Ich nehme an folgenden Testungen teil:</p>

        <div>
          <h6>Trainingswissenschaft Frankfurt</h6>
          {this.state.data.map(
            (item) =>
              item.disp === this.state.discipline && item.area === "Trainingswissenschaft Frankfurt" && (
                <div key={item.study_id}>
                  <table>
                    <tbody>
                  
                    <tr>
                      <td width={300}>{item.study}</td>
                      <td className="form-check form-switch" id="toggle-switch">
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
                    </tr></tbody>
                    
                  </table>
                </div>
              )
          )}
          
        </div>
        <div>
          <h6>Leistungsphysiologie Gießen</h6>
          {this.state.data.map(
            (item) =>
              item.disp === this.state.discipline && item.area === "Leistungsphysiologie Gießen" && (
                <div key={item.study_id}>
                  <table>
                    <tbody>
                  
                    <tr>
                      <td width={300}>{item.study}</td>
                      <td className="form-check form-switch" id="toggle-switch">
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
                    </tr></tbody>
                    
                  </table>
                </div>
              )
          )}
          
        </div>
        <div>
          <h6>Leistungspsychologie Köln</h6>
          {this.state.data.map(
            (item) =>
              item.disp === this.state.discipline && item.area === "Leistungspsychologie Köln" && (
                <div key={item.study_id}>
                  <table>
                    <tbody>
                  
                    <tr>
                      <td width={300}>{item.study}</td>
                      <td className="form-check form-switch" id="toggle-switch">
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
                    </tr></tbody>
                    
                  </table>
                </div>
              )
          )}
          
        </div>
        <div>
          <h6>Sozialwissenschaften des Sports Gießen</h6>
          {this.state.data.map(
            (item) =>
              item.disp === this.state.discipline && item.area === "Sozialwissenschaften des Sports Gießen" && (
                <div key={item.study_id}>
                  <table>
                    <tbody>
                  
                    <tr>
                      <td width={300}>{item.study}</td>
                      <td className="form-check form-switch" id="toggle-switch">
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
                    </tr></tbody>
                    
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
