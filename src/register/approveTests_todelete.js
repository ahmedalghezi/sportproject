import React from "react";
import studiesData_todelete from "./studiesData_todelete";

const ApproveTests_todelete = ({ prevStep, handleChange, handleSubmit, values }) => {
  const Previous = (e) => {
    e.preventDefault();
    prevStep();
  };

  //########################################################
  /* TODOs 
    - add studiesData_todelete to state, backend
  */
  //############################################################
  return (
    <div>
      <p>
        Ich nehme an folgenden Testungen teil:
      </p>

      {(values.discipline === "Volleyball" || values.discipline === "Basketball") && (
        <div>
          <table>
            <tbody>

              <tr>
                {studiesData_todelete[0].studiesList.map((item) => (
                  <div id="studies">
                    <tr>
                      <td>
                        <h6>{item.area}</h6>
                      </td>
                      <td></td>
                    </tr>
                    {item.studies.map((testitem) => (
                      <tr>
                        <td>
                          <a name={testitem.ID} key={testitem.ID}>
                            {testitem.test}
                          </a>
                        </td>

                        <td>
                          <div className="form-check form-switch" id="toggle-switch">
                            <input
                              name="switchId"
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id={testitem.ID}
                              defaultValue={values.switchId}
                              defaultChecked={values.isToggleOn}
                              onChange={handleChange("switchId")}
                            />
                            <label className="form-check-label"> </label>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </div>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {values.discipline === "Eishockey"  && (
        <div>
          <table>
            <tbody>

              <tr>
                {studiesData_todelete[1].studiesList.map((item) => (
                  <div id="studies">
                    <tr>
                      <td>
                        <h6>{item.area}</h6>
                      </td>
                      <td></td>
                    </tr>
                    {item.studies.map((testitem) => (
                      <tr>
                        <td>
                          <a name={testitem.ID} key={testitem.ID}>
                            {testitem.test}
                          </a>
                        </td>

                        <td>
                          <div className="form-check form-switch" id="toggle-switch">
                            <input
                              name="switchId"
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id={testitem.ID}
                              defaultValue={values.switchId}
                              defaultChecked={values.isToggleOn}
                              onChange={handleChange("switchId")}
                            />
                            <label className="form-check-label"> </label>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </div>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {values.discipline === "Tischtennis"  && (
        <div>
          <table>
            <tbody>

              <tr>
                {studiesData_todelete[2].studiesList.map((item) => (
                  <div id="studies">
                    <tr>
                      <td>
                        <h6>{item.area}</h6>
                      </td>
                      <td></td>
                    </tr>
                    {item.studies.map((testitem) => (
                      <tr>
                        <td>
                          <a name={testitem.ID} key={testitem.ID}>
                            {testitem.test}
                          </a>
                        </td>

                        <td>
                          <div className="form-check form-switch" id="toggle-switch">
                            <input
                              name="switchId"
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id={testitem.ID}
                              defaultValue={values.switchId}
                              defaultChecked={values.isToggleOn}
                              onChange={handleChange("switchId")}
                            />
                            <label className="form-check-label"> </label>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </div>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {values.discipline === "Moderner Fünfkampf"  && (
        <div>
          <table>
            <tbody>
           

              <tr>
                {studiesData_todelete[3].studiesList.map((item) => (
                  <div id="studies">
                    <tr>
                      <td>
                        <h6>{item.area}</h6>
                      </td>
                      <td></td>
                    </tr>
                    {item.studies.map((testitem) => (
                      <tr>
                        <td>
                          <a name={testitem.ID} key={testitem.ID}>
                            {testitem.test}
                          </a>
                        </td>

                        <td>
                          <div className="form-check form-switch" id="toggle-switch">
                            <input
                              name="switchId"
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id={testitem.ID}
                              defaultValue={values.switchId}
                              defaultChecked={values.isToggleOn}
                              onChange={handleChange("switchId")}
                            />
                            <label className="form-check-label"> </label>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </div>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {values.discipline === "Gerätturnen"  && (
        <div>
          <table>
            <tbody>
             

              <tr>
                {studiesData_todelete[4].studiesList.map((item) => (
                  <div id="studies">
                    <tr>
                      <td>
                        <h6>{item.area}</h6>
                      </td>
                      <td></td>
                    </tr>
                    {item.studies.map((testitem) => (
                      <tr>
                        <td>
                          <a name={testitem.ID} key={testitem.ID}>
                            {testitem.test}
                          </a>
                        </td>

                        <td>
                          <div className="form-check form-switch" id="toggle-switch">
                            <input
                              name="switchId"
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id={testitem.ID}
                              defaultValue={values.switchId}
                              defaultChecked={values.isToggleOn}
                              onChange={handleChange("switchId")}
                            />
                            <label className="form-check-label"> </label>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </div>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {values.discipline === "Sportgymnastik"  && (
        <div>
          <table>
            <tbody>
             

              <tr>
                {studiesData_todelete[5].studiesList.map((item) => (
                  <div id="studies">
                    <tr>
                      <td>
                        <h6>{item.area}</h6>
                      </td>
                      <td></td>
                    </tr>
                    {item.studies.map((testitem) => (
                      <tr>
                        <td>
                          <a name={testitem.ID} key={testitem.ID}>
                            {testitem.test}
                          </a>
                        </td>

                        <td>
                          <div className="form-check form-switch" id="toggle-switch">
                            <input
                              name="switchId"
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id={testitem.ID}
                              defaultValue={values.switchId}
                              defaultChecked={values.isToggleOn}
                              onChange={handleChange("switchId")}
                            />
                            <label className="form-check-label"> </label>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </div>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {values.discipline === "Trampolin"  && (
        <div>
          <table>
            <tbody>
              

              <tr>
                {studiesData_todelete[6].studiesList.map((item) => (
                  <div id="studies">
                    <tr>
                      <td>
                        <h6>{item.area}</h6>
                      </td>
                      <td></td>
                    </tr>
                    {item.studies.map((testitem) => (
                      <tr>
                        <td>
                          <a name={testitem.ID} key={testitem.ID}>
                            {testitem.test}
                          </a>
                        </td>

                        <td>
                          <div className="form-check form-switch" id="toggle-switch">
                            <input
                              name="switchId"
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id={testitem.ID}
                              defaultValue={values.switchId}
                              defaultChecked={values.isToggleOn}
                              onChange={handleChange("switchId")}
                            />
                            <label className="form-check-label"> </label>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </div>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <p></p>

      <div className="form-group">
        <label htmlFor="checkid" id="small-text">
          <input
            name="readTerms"
            type="checkbox"
            defaultValue={values.readTerms}
            onChange={handleChange("readTerms")}
          />{" "}
          Ich habe die{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={"https://inprove-sport.info/privacy_policy_inprove.pdf"}
          >
            Datenschutzbestimmungen und die Bedingungen für die Datenspeicherung
            und -nutzung
          </a>{" "}
          gelesen und akzeptiere sie.
        </label>
      </div>
      <div className="form-group" hidden={!values.showParentAccept}>
        <label htmlFor="checkid">
          <input
            name="parentAccept"
            type="checkbox"
            defaultValue={values.parentAccept}
            onChange={handleChange("parentAccept")}
          />{" "}
          Ich bestätige, dass ich das Einverständnis meiner Eltern habe, mich in
          diesem Portal zu registrieren.
        </label>
      </div>

      <button
        type="button"
        className="btn btn-primary btn-block m-2"
        onClick={Previous}
      >
        Zurück
      </button>
      <button
        type="button"
        className="btn btn-primary btn-block m-2"
        onClick={handleSubmit}
      >
        Registrieren
      </button>
    </div>
  );
};

export default ApproveTests_todelete;
