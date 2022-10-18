/*
By Ahmed Al-Ghezi
 */

import React, {Component} from "react";

export default class WelcomeReg extends Component {


    constructor(props) {
        super(props);
        this.state = {
            showWeiter : false
        };
    }

    handleSubmit = (event) =>{
        //window.location.href = "https://inprove-sport.info/limesurvey/";
       // window.location.href = window.location.origin+"/user/profile";
        event.preventDefault();
        if(this.props.done)
            this.props.done(true);
    }


    showInfo = (event) =>{
        event.preventDefault();
        const url = "https://inprove-sport.info:8080/Teilnehmendeninformation.pdf";
        window.open(url, '_blank', 'noopener,noreferrer');
        setTimeout(function(){
            this.setState({showWeiter:true});
        }.bind(this),2000);
    }



    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Willkommen auf unserer Projektdatenportal!  &#128522;</h3>
                <p>Wir freuen uns, dass Du Teil des in:prove-Projekts bist! Unser Ziel ist es, Dein Training so zu optimieren, dass Du Deine Leistungsreserven ausschöpfen kannst!</p>
                <p>Hierfür werden wir im Rahmen des Projekts unterschiedliche (Leistungs-)Diagnostiken aus den Bereichen der Motorik, der Sportphysiologie, -psychologie und -soziologie durchführen. Nach jeder Diagnostik erhältst Du all Deine Werte in Form einer Rückmeldung, hier in der Datenbank. Genauere Infos zu unserem Projekt oder auch zu den Diagnostiken findest Du in der Teilnehmendeninformation unter folgendem Link. Bitte lies Dir die Informationen sorgfältig durch. Bei Fragen kannst du Dich gerne jederzeit bei uns per Mail (fragen@inprove.info) melden.</p>
                <p hidden={!this.state.showWeiter}><b>Wenn Du Dir die Teilnehmendeninformation durchgelesen hast, klicke bitte auf "Weiter".</b></p>
                <button hidden={this.state.showWeiter}  onClick={this.showInfo} className="btn btn-primary btn-block">Teilnehmendeninformation</button>
                <button hidden={!this.state.showWeiter} type="submit" className="btn btn-primary btn-block">Weiter</button>
            </form>
        );
    }
}