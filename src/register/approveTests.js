import React from "react";

const ApproveTests = ({ prevStep, handleChange, handleSubmit, values }) => {
  const Previous = (e) => {
    e.preventDefault();
    prevStep();
  };

  let studiesList = values.studiesList;
  //########################################################
  /*  */

  //############################################################
  return (
    <div>
      <p>Ich nehme an folgenden Testungen teil (Zutreffendes bitte ankreuzen):</p>
      <table>
        <tbody>
          <tr>
            <td>
              <label>Kategorie</label>
            </td>
            <td></td>
            <td></td>
            <td>
              <label>Nein/Ja</label>
            </td>
          </tr>
          <tr>
            <td>
              <div>
                {studiesList.map((option) => (
                  <a name={option.ID} key={option.ID}>
                    {option.title} <br></br>
                  </a>
                ))}
              </div>
            </td>
            <td></td>
            <td></td>
            <td>
              <div>
                {studiesList.map((option) => (
                  <a name={option.ID} key={option.ID}>
                    <div className="form-check form-switch">
                      <input
                        name="switchId"
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={option.ID}
                        defaultValue={values.switchId}
                        defaultChecked={values.isToggleOn}
                        onChange={handleChange("switchId")}
                      />
                      <label className="form-check-label"> </label>
                    </div>
                  </a>
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <p></p>
<div>
      <p>Weitere Daten (bitte angeben): </p>

      <div className="form-group">
          <label>Gewicht (in kg)</label>
          <input
            type="number"
            className="form-control"
            placeholder="Bitte Gewicht angeben"
            name="weight"
            defaultValue={values.weight}
            onChange={handleChange('weight')}
          />
        </div>
      <div className="form-group">
          <label>Körpergröße (in cm)</label>
          <input
            type="number"
            className="form-control"
            placeholder="Bitte Körpergröße angeben"
            name="height"
            defaultValue={values.height}
            onChange={handleChange('height')}
          />
        </div>
      <div className="form-group">
          <label>Armspannweite (in cm)</label>
          <input
            type="number"
            className="form-control"
            placeholder="Bitte Armspannweite angeben"
            name="armSpan"
            defaultValue={values.armSpan}
            onChange={handleChange('armSpan')}
          />
        </div>
      <div className="form-group">
          <label>Reichhöhe im Stehen (in cm)</label>
          <input
            type="number"
            className="heightSpanStand"
            placeholder="Bitte Reichhöhe angeben"
            name="heightSpanStand"
            defaultValue={values.heightSpanStand}
            onChange={handleChange('heightSpanStand')}
          />
        </div>
      <div className="form-group">
          <label>Reichhöhe im Sitzen (in cm)</label>
          <input
            type="number"
            className="heightSpanSit"
            placeholder="Bitte Reichhöhe angeben"
            name="heightSpanSit"
            defaultValue={values.heightSpanSit}
            onChange={handleChange('heightSpanSit')}
          />
        </div>
      <div className="form-group">
          <label>Kniehöhe (in cm)</label>
          <input
            type="number"
            className="heightKnee"
            placeholder="Bitte Kniehöhe angeben"
            name="heightKnee"
            defaultValue={values.heightKnee}
            onChange={handleChange('heightKnee')}
          />
        </div>
      <div className="form-group">
          <label>Sitzhöhe (in cm)</label>
          <input
            type="number"
            className="heightSit"
            placeholder="Bitte Sitzhöhe angeben"
            name="heightSit"
            defaultValue={values.heightSit}
            onChange={handleChange('heightSit')}
          />
        </div>
        </div>

      <p></p>
      <div className="form-group">
        <label htmlFor="checkid">
          <input
            name="readTerms"
            type="checkbox"
            defaultValue={values.readTerms}
            onChange={handleChange('readTerms')}
          />{" "}
          I have read and accept <a target="_blank" rel="noopener noreferrer" href={"https://inprove-sport.info/privacy_policy_inprove.pdf"}>the privacy policy and the terms of data
            storage and usage</a>
        </label>
      </div>
      <div className="form-group" hidden={!values.showParentAccept}>
        <label htmlFor="checkid">
          <input
            name="parentAccept"
            type="checkbox"
            defaultValue={values.parentAccept}
            onChange={handleChange('parentAccept')}
          />{" "}
          I confirm to have parental consent to register in this portal
        </label>
      </div>
     
      <button
        type="button"
        className="btn btn-primary btn-block m-2"
        onClick={Previous}
      >
        Back
      </button>
      <button
        type="button"
        className="btn btn-primary btn-block m-2"
        onClick={handleSubmit}
      >
        Sign Up
      </button>
    </div>
  );
};

export default ApproveTests;
