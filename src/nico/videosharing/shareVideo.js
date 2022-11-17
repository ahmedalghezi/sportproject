/*
By Nicolas Schulz
 */

import React, {Component} from "react";
import HandelTrainer from "../../DB/handelTrainer";
import PostSignup from "../../DB/postSignup";

const testdata = [
    {
      name: "Hans",
      lastname: "Roth",
      email: "1"
    },
    {
        name: "Dieter",
        lastname: "Roth",
        email: "2"
    },
  
    {
      name: "Julia",
      lastname: "Kunz",
      email: "3"
      
    }];


export default class ShareVideo extends Component {

    constructor(props) {
        super(props);
        this.state = {selectedFile:''};
        this.handleUpload = this.handleUpload.bind(this);
    }
 
    onFileChange = (event) => {
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
      };


    handleUpload(event){
        event.preventDefault();
        if(this.state.selectedTrainerList === []){
            alert("Bitte Trainer*in auswählen.");
            return;
        }
        /*
        PostSignup.disguisedTrainerLogin({email:this.state.selectedTrainer}).then(response => {
            if(response.data.res === "ok"){
                //this.props.navigate('/trainer/addAthletes');
                window.location.href = window.location.origin+"/trainer/addAthletes";
            }else{
                alert("Es ist ein Fehler aufgetreten!");
            }
        }).catch(e => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten!");
        });
        */

    }

    render() {
        return (
            <form onSubmit={this.handleUpload}>
                <h3>Video teilen</h3>

                <div >
                    Hier kannst du ein Video mit deiner Gruppe teilen. Wähle dazu eine Datei aus und drücke anschließend auf "Video hochladen"!
                </div>

                <br></br><br></br>

                <div className="form-group">
            <label className="select-file">
              <input
                type="file"

                onChange={this.onFileChange}
              />
              Wähle eine Videodatei
            </label>
          </div>
        
        
                <button type="submit" className="btn btn-primary btn-block">Video hochladen</button>
            </form>
        );
    }


}