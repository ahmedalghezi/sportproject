/*
By Ahmed Al-Ghezi
 */

import React, {Component} from "react";

export default class AfterReg extends Component {

    handleSubmit(event) {
        //window.location.href = "https://inprove-sport.info/limesurvey/";
        window.location.href = window.location.origin+"/user/profile";
        event.preventDefault();
    }




    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Deine Registrierung war erfolgreich!</h3>
                <p>  Wir haben Dir eine E-Mail mit Bestätigungslink zugeschickt. Bitte schaue in Dein Postfach und bestätige Deine Registrierung.
                    </p><p>Falls Du keine E-Mail erhalten hast, wende Dich bitte an fragen@inprove.info
                    </p><p>Vielen Dank &#128522;	 </p>
                <button type="submit" className="btn btn-primary btn-block">Weiter</button>
            </form>
        );
    }
}