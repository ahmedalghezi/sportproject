/*
By Ahmed Al-Ghezi
 */

import React, {Component} from "react";

import '../../register/style.css';
import PostSignup from '../../DB/postSignup';
import {useNavigate} from 'react-router-dom';
import AlertDialog from "../../utli/alertDialog";
import SignUp from "../../register/SignUp";
import {processArr} from "../../csvHandler/processCSV";
import Sheet from "../../csvHandler/xlsSheet/XlsSheet";
import {Alert} from "@mui/material";
import axios from "axios";

class UploadFileC extends Component {


    constructor(props) {
        super(props);
        this.state = {
            success:false, error:false, file:null };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }


    componentDidMount() {

    }

    handleChange(event) {
        const target = event.target;
        let value = target.value;
        const name = target.name;
        if (name === "readTerms")
            value = target.checked;
        this.setState({
            [name]: value
        });
    }





    checkInput(stateData){
        if(stateData.file === null){
            alert("please select a file");
            return false;
        }
        return true;
    }



    handleSubmit(event) {
        event.preventDefault();
         if(!this.checkInput(this.state))
             return;
        const data = new FormData();
        data.append('file', this.state.file);

        PostSignup.uploadConsent(data).then(response => {
            console.log(response.data.res);
            if (response.data.res === "error")
                alert("some error has happened");
            if(response.data.res === "no")
                window.location.href = window.location.origin+"/reg/sign-in?org=$reg$uploadConsent";
            if(response.data.res === "ok")
                this.props.navigate('/reg/regSuc');//show dialog
        }).catch(e => {
            console.log(e);
            alert("some error has happened");
        });
    }


    handleFileUpload = (event) =>{
        event.preventDefault();
        console.log(event.target.files[0]);
        this.setState({file:event.target.files[0]});

    }




    render() {
        return(

            <div>
                <h3>Dateien hochladen</h3>
                <form id='uploadConsent' onSubmit={this.handleSubmit}>
                    <br/>
                    <input type="file"  accept=".pdf,.png,.jpg,.jpeg,.gif" onChange={this.handleFileUpload}/>
<br/><br/>
                    <button type={"submit"}  className="btn btn-primary btn-block">submit</button>
                    <Alert severity="success" hidden={!this.state.success}>{this.state.successMsg}</Alert>
                    <Alert severity="error" hidden={!this.state.error}>{this.state.errorMsg}</Alert>

                </form>

            </div>
        );

    }



}




function UploadFile(props) {
    let navigate = useNavigate();
    return <UploadFileC {...props} navigate={navigate}/>
}

export default UploadFile;



