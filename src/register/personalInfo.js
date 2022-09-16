/*
Installations: 
  npm i react-doc-viewer
  npm i @cyntler/react-doc-viewer
References:
  https://www.npmjs.com/package/react-doc-viewer
  https://www.npmjs.com/package/@cyntler/react-doc-viewer

TODOs:
  Document Files Backend
  Button - Click to open document viewer
*/

import React from "react";
import DocViewer from "react-doc-viewer";

const PersonalInfo = ({
  nextStep,
  handleChange,
  handleSubmit,
  values,
}) => {
  const Continue = (e) => {
    e.preventDefault();
    nextStep();
    //handleSubmit();
  };

  //Documents for Document Viewer
  /*const docs = [
    { uri: require("../images/avatar.png") }, // Local File
  ];
   <DocViewer documents={docs} />
  */
  return (
    <div>
      <h3>Registrieren</h3>
      <div className="form-group">
        <label>Vorname</label>
        <input
          type="text"
          className="form-control"
          name="firstName"
          placeholder="Vorname"
          defaultValue={values.firstName}
          onChange={handleChange("firstName")}
        />
      </div>
      <div className="form-group">
        <label>Nachname</label>
        <input
          type="text"
          className="form-control"
          placeholder="Nachname"
          name="lastName"
          defaultValue={values.lastName}
          onChange={handleChange("lastName")}
        />
      </div>

      <div className="form-group">
        <label>Email-Adresse</label>
        <input
          type="email"
          className="form-control"
          placeholder="Email-Adresse"
          name="email"
          defaultValue={values.email}
          onChange={handleChange("email")}
        />
      </div>

      <div className="form-group">
        <label>Geburtsdatum</label>
        <input
          type="date"
          className="form-control"
          name="birthdate"
          defaultValue={values.birthdate}
          onChange={handleChange("birthdate")}
        />
      </div>

      <div className="form-group" hidden={!values.showFileUpload}>
        <label className="select-file">
          Einverständniserklärung der Eltern
          <input type="file" name="file" onChange={handleChange("file")} />
        </label>
      </div>

      <div className="form-group">
        <label>Disziplin</label>
        <br></br>
        <select
          defaultValue={values.discipline}
          onChange={handleChange("discipline")}
          name="discipline"
        >
          {values.disciplinesList.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Geschlecht</label>
        <br></br>
        <select
          defaultValue={values.gender}
          onChange={handleChange("gender")}
          name="gender"
        >
          <option value="M">M</option>
          <option value="F">F</option>
        </select>
      </div>

      <div className="form-group">
        <label>Passwort</label>
        <input
          type="password"
          className="form-control"
          placeholder="Passwort"
          name="password"
          defaultValue={values.password}
          onChange={handleChange("password")}
        />
      </div>

      <p className="forgot-password text-right">
        Schon registriert? <a href="/reg/sign-in">Login</a>
      </p>

      <button
        type="button"
        className="btn btn-primary btn-block m-2"
        onClick={handleSubmit}
      >
        Weiter
      </button>
    </div>
  );
};

export default PersonalInfo;
