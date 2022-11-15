/*
By Ahmed Al-Ghezi
 */
//TODO Do not show again after login if consent is already uploaded. 
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
            success:false, error:false, file:null ,showHeader:true};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }


    componentDidMount() {
        if(this.props.signUpData){
            this.modifyPdf(this.props.signUpData);
            if(this.props.signUpData.alreadyReg)
                this.setState({showHeader:false});
        }


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
            alert("Wähle bitte eine Datei aus.");
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
                alert("Es ist ein Fehler aufgetreten.");
            if(response.data.res === "no")
                window.location.href = window.location.origin+"/reg/sign-in?org=$reg$uploadConsent";
            if(response.data.res === "ok"){
                if(this.props.uploadDone)
                    this.props.uploadDone();
                else if(this.props.signUpData && this.props.signUpData.alreadyReg)
                    window.location.href = window.location.origin+"/reg/profile";
                else
                    this.props.navigate('/reg/regSuc');
            }
        }).catch(e => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten.");
        });
    }


    handleFileUpload = (event) =>{
        event.preventDefault();
        console.log(event.target.files[0]);
        this.setState({file:event.target.files[0]});

    }



    async modifyPdf(signUpData) {
        // Fetch an existing PDF document
        let url = 'https://inprove-sport.info/files/getEinwilg';
        if(signUpData.alreadyReg)
            url = 'https://inprove-sport.info/files/getEinwilgAlreadyReg';
            //url = 'https://inprove-sport.info:8080/datenschutz_grundverordnung_u18.pdf';
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
        if(existingPdfBytes)
            console.log("file is gotten");

        // Load a PDFDocument from the existing PDF bytes
        const pdfDoc = await PDFDocument.load(existingPdfBytes)

        if(!signUpData.alreadyReg && signUpData.firstName) {
            // Embed the Helvetica font
            const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

            // Get the first page of the document
            const pages = pdfDoc.getPages()
            const firstPage = pages[0]

            const form = pdfDoc.getForm()

            // Get all fields in the PDF by their names
            const name = form.getTextField('ein_name');
            name.setText(signUpData.firstName + " " + signUpData.lastName);
            const birthDate = form.getTextField('ein_birthdate');
            birthDate.setText(signUpData.birthdate);
            //const ID = form.getTextField('ein_id');

            const name2 = form.getTextField('ein_name2');
            name2.setText(signUpData.firstName + " " + signUpData.lastName);
            const birthdate2 = form.getTextField('ein_birthdate2');
            birthdate2.setText(signUpData.birthdate);

            const test1 = form.getTextField('approved_tests_1');
            test1.setText(signUpData.approveStudyRes.tests);
            //const test2 = form.getTextField('approved_tests2');
            //test1.setText(signUpData.approveStudyRes.tests);
            let video = form.getTextField('ein_video_ja');
            if (!signUpData.approveStudyRes.video)
                video = form.getTextField('ein_video_nein');

            video.setText("X");


            video = form.getTextField('ein_osp_ja');
            if (!signUpData.approveStudyRes.ops)
                video = form.getTextField('ein_osp_nein');
            video.setText("X");

            video = form.getTextField('ein_extra_ja');
            if (!signUpData.approveStudyRes.extra)
                video = form.getTextField('ein_extra_nein');
            video.setText("X");

        }
/*
        video.setText(signUpData.approveStudyRes.video);
        const osp = form.getTextField('ein_osp');
        osp.setText(signUpData.approveStudyRes.ops);
        const extra = form.getTextField('ein_extra');
        extra.setText(signUpData.approveStudyRes.extra);

 */



        // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save()

        // Trigger the browser to download the PDF document
        console.log("downloading file... ");
        this.download(pdfBytes, "inprove_einwilligung.pdf", "application/pdf");
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

                <h4 hidden={!this.state.showHeader}>Bitte lade Deine unterschriebene Einverständniserklärung hoch</h4>

                <br></br>
                <h6 hidden={this.state.showHeader}>Bitte lade hier die letzte Seite mit Unterschrift hoch.</h6>

                <form id='uploadConsent' onSubmit={this.handleSubmit}>
                    <br/>
                    <input type="file"  accept=".pdf,.png,.jpg,.jpeg,.gif" onChange={this.handleFileUpload}/>
<br/><br/>
                    <button type={"submit"}  className="btn btn-primary btn-block">Senden</button>
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
    //TODO fix this when the guy does it later, then there is no signupData!
    return <UploadConsentC {...props} navigate={navigate} signUpData = {signUpData}/>
}

export default UploadConsent;



