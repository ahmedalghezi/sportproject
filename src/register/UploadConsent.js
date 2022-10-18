/*
By Ahmed Al-Ghezi
 */

import React, {Component} from "react";

import './style.css';
import PostSignup from '../DB/postSignup';
import {useLocation, useNavigate} from 'react-router-dom';
import AlertDialog from "../utli/alertDialog";
import SignUp from "./SignUp";
import {processArr} from "../csvHandler/processCSV";
import Sheet from "../csvHandler/xlsSheet/XlsSheet";
import {Alert} from "@mui/material";
import axios from "axios";
import {degrees, PDFDocument, rgb, StandardFonts} from 'pdf-lib';

class UploadConsentC extends Component {


    constructor(props) {
        super(props);
        this.state = {
            success:false, error:false, file:null };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }


    componentDidMount() {
        if(this.props.signUpData)
            this.modifyPdf(this.props.signUpData);
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
            if(response.data.res === "ok"){
                if(this.props.uploadDone)
                    this.props.uploadDone();
                else
                    this.props.navigate('/reg/regSuc');
            }
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


    async modifyPdf(signUpData) {
        // Fetch an existing PDF document
        const url = 'https://inprove-sport.info:3000/files/getEinwilg'
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

        // Load a PDFDocument from the existing PDF bytes
        const pdfDoc = await PDFDocument.load(existingPdfBytes)

        // Embed the Helvetica font
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

        // Get the first page of the document
        const pages = pdfDoc.getPages()
        const firstPage = pages[0]

        const form = pdfDoc.getForm()

        // Get all fields in the PDF by their names
        const name= form.getTextField('ein_name');
        name.setText(signUpData.firstName+" "+signUpData.lastName);
        const birthDate = form.getTextField('ein_birthdate');
        birthDate.setText(signUpData.birthdate);
        //const ID = form.getTextField('ein_id');

        const name2 = form.getTextField('ein_name2');
        name2.setText(signUpData.firstName+" "+signUpData.lastName);
        const birthdate2 = form.getTextField('ein_birthdate2');
        birthdate2.setText(signUpData.birthdate);

        const test1 = form.getTextField('approved_tests_1');
        test1.setText(signUpData.approveStudyRes.tests);
        //const test2 = form.getTextField('approved_tests2');
        //test1.setText(signUpData.approveStudyRes.tests);
        let video = video = form.getTextField('ein_video_ja');;
        if(signUpData.approveStudyRes.video)
             video = form.getTextField('ein_video_nein');



        video.setText(signUpData.approveStudyRes.video);
        const osp = form.getTextField('ein_osp');
        osp.setText(signUpData.approveStudyRes.ops);
        const extra = form.getTextField('ein_extra');
        extra.setText(signUpData.approveStudyRes.extra);



        // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save()

        // Trigger the browser to download the PDF document
        this.download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");
    }

     download (content, fileName, mimeType) {
        var a = document.createElement('a');
        mimeType = mimeType || 'application/octet-stream';

        if (navigator.msSaveBlob) { // IE10
            navigator.msSaveBlob(new Blob([content], {
                type: mimeType
            }), fileName);
        } else if (URL && 'download' in a) {
            a.href = URL.createObjectURL(new Blob([content], {
                type: mimeType
            }));
            a.setAttribute('download', fileName);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };




    render() {
        return(

            <div>
                <h3>Bitte lade deine unterschriebene Einverständniserklärung hoch</h3>
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




function UploadConsent(props) {
    let navigate = useNavigate();
    const {state} = useLocation();
    const signUpData = state; // Read values passed on state
    return <UploadConsentC {...props} navigate={navigate} signUpData = {signUpData}/>
}

export default UploadConsent;



