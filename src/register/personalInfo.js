
import React from "react";

const PersonalInfo = ({ nextStep, handleChange, handleSubmit, values }) => {
    const Continue = e => {
        e.preventDefault();
        nextStep();
        //handleSubmit();
      }
  return (
    <div>
      <h3>Sign Up</h3>
      <div className="form-group">
        <label>First name</label>
        <input
          type="text"
          className="form-control"
          name="firstName"
          placeholder="First name"
          defaultValue={values.firstName}
          onChange={handleChange("firstName")}
          
        />
      </div>
      <div className="form-group">
          <label>Last name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            name="lastName"
            defaultValue={values.lastName}
            onChange={handleChange('lastName')}
            
          />
        </div>
        
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            defaultValue={values.email}
            onChange={handleChange('email')}
            
          />
        </div>

        <div className="form-group">
          <label>Birthdate</label>
          <input
            type="date"
            className="form-control"
            name="birthdate"
            defaultValue={values.birthdate}
            onChange={handleChange('birthdate')}
            
          />
        </div>
        <div className="form-group">
          <label>Discipline</label>
          <br></br>
          <select 
          defaultValue={values.discipline}
          onChange={handleChange('discipline')} name="discipline"> 
            {values.disciplinesList.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Gender</label>
          <br></br>
          <select 
          defaultValue={values.gender}
          onChange={handleChange('gender')} name="gender">
            <option value="M">M</option>
            <option value="F">F</option>
          </select>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
            defaultValue={values.password}
            onChange={handleChange('password')}
            
          />
        </div>

        
       

      <button
          type="button"
          className="btn btn-primary btn-block m-2"
          onClick={handleSubmit}
        >
          Continue
        </button>
    </div>
  );
};


        


export default PersonalInfo;
