/*
By Ahmed Al-Ghezi
 */

import React, {Component} from "react";
import PostSignup from "../DB/postSignup";
import {useNavigate, useSearchParams} from "react-router-dom";

 class AcceptTermsC extends Component {


    constructor(props) {
        super(props);
        this.state = {
            readTerms: false,
            showParentAccept:false,
            emailConfirmationCode:'',
            showConfirmedEmail:false,
            showThank:false
        };
    }
     componentDidMount() {
         this.setState({emailConfirmationCode:this.props.emailConfirmCode});
         if(this.props.showThank)
             this.setState({showThank:true});
     }


    requestDelete = (event) => {
        event.preventDefault();
        PostSignup.requestDell(this.state).then((response) => {
            if (response.data.res === "error") {
                alert("Es ist ein Fehler aufgetreten");
                return;
            } else {
                alert("Your request to delete your account is activated");
            }
        }).catch((e) => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten.");
        });
    }



    handleSubmit = (event)  => {
        event.preventDefault();
        if(!this.state.readTerms)
            return;
        PostSignup.acceptTerms(this.state).then((response) => {
            if (response.data.res === "error") {
                alert("Es ist ein Fehler aufgetreten");
                return;
            } else {
                window.location.href = window.location.origin+"/reg/profile";
            }
        }).catch((e) => {
                console.log(e);
                alert("Es ist ein Fehler aufgetreten.");
            });
    }

    handleChange = (event) => {
        const target = event.target;
        let value = target.value;
        const name = target.name;
        if (name === "readTerms") value = target.checked;
        if (name === "parentAccept") value = target.checked;
        this.setState({
            [name]: value,
        });
    }


    render() {
        return (
            <div>
                <div hidden={!this.state.showThank}>
                    <h3> Vielen Dank für die Bestätigung dein E-Mail
                    </h3>

                </div>


                <div className="form-group">
                    <label htmlFor="checkid">
                        <input
                            name="readTerms"
                            type="checkbox"
                            onChange={this.handleChange}
                            defaultChecked={this.state.readTerms}
                        />{" "}
                        Ich habe die <a target="_blank" rel="noopener noreferrer" href={"https://inprove-sport.info/privacy_policy_inprove.pdf"}>Datenschutzbestimmungen und die
                        Bedingungen für die Datenspeicherung und -nutzung</a> gelesen und akzeptiere sie.
                    </label>
                </div>

                <div className="form-group" hidden={!this.state.showParentAccept}>
                    <label htmlFor="checkid">
                        <input
                            name="parentAccept"
                            type="checkbox"
                            onChange={this.handleChange}
                        />{" "}
                        Ich bestätige, dass ich das Einverständnis meiner Eltern habe, mich in diesem Portal zu registrieren.
                    </label>
                </div>
                <button type="submit" onClick={this.handleSubmit} className="btn btn-primary btn-block">
                    Submit
                </button>

                <button onClick={this.requestDelete} hidden={!this.state.showThank} >
                    Delete your account
                </button>
            </div>
        );
    }

}

function AcceptTerms(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const emailConfirmCode = searchParams.get("emailConfirmCode");
    if(!props.emailConfirmCode || props.emailConfirmCode == "")
        return <AcceptTermsC {...props}   emailConfirmCode={emailConfirmCode}/>;
    return <AcceptTermsC {...props} />;
}

export default AcceptTerms;