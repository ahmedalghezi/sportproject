/*
  By Vanessa Meyer,
  Ahmed Al-Ghezi
*/

import React, {Component, useState} from "react";
import PostSignup from "../DB/postSignup";
import ReadMore from "../utli/readMore";
import {Tooltip} from "@mui/material";

class ApproveTests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: true,
            //disallowedStudies: [],
            discipline: "",
            email: "",
            area_frank: [],
            area_physiologie: [],
            area_psychologie: [],
            area_social: [],
            statusArr: [],
            ID: "",
            isReadMore: false,
            video:true,
            ops:true,
            extra:true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    toggleReadMore = () => {
        const rev = !this.state.isReadMore;
        this.setState({isReadMore: rev});
    };

    componentDidMount() {
        if (!this.props.emailConfirmationCode && this.props.discipline)
            this.getAllStudies();
        else
            this.getAllStudiesParam();
        this.setState({discipline: this.props.discipline});
        this.setState({email: this.props.email});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.emailConfirmationCode && prevProps.discipline != this.props.discipline) {
            this.getAllStudies();
        }
    }


    setVideo = (e) => {
        //e.preventDefault();
        this.setState({video:e.target.checked});
    }

    setOps = (e) => {
       // e.preventDefault();
        this.setState({ops:e.target.checked});
    }

    setExtra = (e) => {
      //  e.preventDefault();
        this.setState({extra:e.target.checked});
    }


    handleChange = (e) => {
        const target = e.target;
        let value = target.value;
        const name = target.name;
        const id = target.id;

        if (name === "switchId") {
            value = target.checked;

            const arr = this.state.statusArr;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].study_area_id === id) {
                    arr[i].status = value;
                    break;
                }
            }

            this.setState({
                statusArr: arr,
            });
        }
    };

    //TODO handleSubmit, email,disp,studies_staus, studies_ids
    handleSubmit = (event) => {
        let studsEmail = this.props.email;
        let studsDisp = this.props.discipline;
        let statusArr = this.state.statusArr;
        const studiesStatus = {
            email: studsEmail,
            discipline: studsDisp,
            statusArr: statusArr,
            video:this.state.video,
            ops:this.state.ops,
            extra:this.state.extra
        };
        if (this.state.ID) {
            studiesStatus.ID = this.state.ID;
        }
        PostSignup.postStudies(studiesStatus)
            .then((response) => {
                if (response.data.res === "error")
                    alert("Es ist ein Fehler aufgetreten.");
                else if (this.props.onSent)
                    this.props.onSent(this.getApproveRes());
                else
                    alert("Changes saved successfully");
            })
            .catch((e) => {
                console.log(e);
                alert("Es ist ein Fehler aufgetreten.");
            });
    };

    getApproveRes = () =>{
        let testStr ="";
        const arr = this.state.statusArr;
        let flag = false;
        for (let i = 0; i < arr.length; i++) {
            if(arr[i].status){
                if(flag)
                    testStr += ", ";
                flag = true;
                testStr += arr[i].study_title;
            }
        }
        return ({"tests":testStr, "video":this.state.video , "ops":this.state.ops, "extra":this.state.extra});
    }


    splitResArray = (data) => {
        let arrOrigin = data;
        let arrFrank = [];
        let arrPhysio = [];
        let arrPsycho = [];
        let arrSocial = [];
        let all = [];
        let index = 0;
        for (let i = 0; i < arrOrigin.length; i++) {
            if (this.props.discipline && this.props.discipline != "" && arrOrigin[i].disp != this.props.discipline)
                continue;
            arrOrigin[i].study_area_id = arrOrigin[i].study_id + "-" + arrOrigin[i].area_id;
            all[index++] = {
                status: true,
                study_id: arrOrigin[i].study_id,
                area_id: arrOrigin[i].area_id,
                study_area_id: arrOrigin[i].study_area_id,
                study_title:arrOrigin[i].study
            };
            if (arrOrigin[i].area === "Trainingswissenschaft Frankfurt") {
                arrFrank.push(arrOrigin[i]);
            } else if (arrOrigin[i].area === "Leistungsphysiologie Gießen") {
                arrPhysio.push(arrOrigin[i]);
            } else if (arrOrigin[i].area === "Leistungspsychologie Köln") {
                arrPsycho.push(arrOrigin[i]);
            } else if (arrOrigin[i].area === "Sozialwissenschaften des Sports Gießen") {
                arrSocial.push(arrOrigin[i]);
            }
        }
        this.setState({
            area_frank: arrFrank,
            area_physiologie: arrPhysio,
            area_psychologie: arrPsycho,
            area_social: arrSocial,
            statusArr: all,
        });
    };


    getAllStudies() {
        PostSignup.getStudies()
            .then((response) => {
                if (response.data.res && response.data.res === "error") {
                    alert("Es ist ein Fehler aufgetreten");
                    return;
                } else {
                    console.log(response.data.res);
                    //split the result array into the four arrays of the state:
                    this.splitResArray(response.data.data);
                }
            })
            .catch((e) => {
                console.log(e);
                alert("Es ist ein Fehler aufgetreten.");
            });
    }


    getAllStudiesParam() {
        const data = {emailConfirmationCode: this.props.emailConfirmationCode};
        PostSignup.getStudiesParam(data)
            .then((response) => {
                if (response.data.res && response.data.res === "error") {
                    alert("Es ist ein Fehler aufgetreten");
                    return;
                } else {
                    console.log(response.data.res);
                    this.setState({ID: response.data.emid});
                    //split the result array into the four arrays of the state:
                    this.splitResArray(response.data.data);
                }
            })
            .catch((e) => {
                console.log(e);
                alert("Es ist ein Fehler aufgetreten.");
            });
    }

    showInfo = (event) =>{
        event.preventDefault();

    }


    textAll = "<p>Bei unseren Diagnostiken f&uuml;hren wir verschiedene Stationen durch und erfassen f&uuml;r Dich leistungsrelevante Faktoren. In der Liste unten findest Du alle Stationen. Genauere Informationen findest Du, wenn Du auf das &ldquo;?&ldquo; klickst. &Uuml;ber den Schieberegler kannst du entscheiden, woran Du gerne teilnehmen m&ouml;chtest.&nbsp;</p>\n" +
        "            <p>Wir w&uuml;rden uns freuen, wenn Du alle Stationen durchf&uuml;hrst, da wir Dir so zielf&uuml;hrend R&uuml;ckmeldung geben k&ouml;nnen. Wie in der Teilnehmendeninformation beschrieben, werden all Deine Daten pseudonymisiert gespeichert und nicht an Dritte weitergegeben. Wenn du unter 18 bist, ben&ouml;tigen wir auch immer die physische Unterschrift Deiner Erziehungsberechtigten. Bitte ladet Euch hierf&uuml;r die Einwilligung runter, druckt diese aus, unterschreibt sie und ladet sie wieder hoch. </p>\n" +
        "            <p>Nachdem Du deine Auswahl getroffen hast - klicke bitte auf &bdquo;Senden&ldquo;. </p>";

    textSmall = "Bei unseren Diagnostiken f&uuml;hren wir verschiedene Stationen durch und erfassen f&uuml;r Dich";

    render() {
        return (
            <div>


                <div hidden={!this.state.isReadMore}>
                    <p>Bei unseren Diagnostiken f&uuml;hren wir verschiedene Stationen durch und erfassen f&uuml;r Dich leistungsrelevante Faktoren. In der Liste unten findest Du alle Stationen. Genauere Informationen findest Du, wenn Du auf das &ldquo;?&ldquo; klickst. &Uuml;ber den Schieberegler kannst du entscheiden, woran Du gerne teilnehmen m&ouml;chtest.&nbsp;</p>
                                <p>Wir w&uuml;rden uns freuen, wenn Du alle Stationen durchf&uuml;hrst, da wir Dir so zielf&uuml;hrend R&uuml;ckmeldung geben k&ouml;nnen. Wie in der Teilnehmendeninformation beschrieben, werden all Deine Daten pseudonymisiert gespeichert und nicht an Dritte weitergegeben. Wenn du unter 18 bist, ben&ouml;tigen wir auch immer die physische Unterschrift Deiner Erziehungsberechtigten. Bitte ladet Euch hierf&uuml;r die Einwilligung runter, druckt diese aus, unterschreibt sie und ladet sie wieder hoch. </p>
                               <p>Nachdem Du deine Auswahl getroffen hast - klicke bitte auf &bdquo;Senden&ldquo;.
                    <span onClick={this.toggleReadMore} className="read-or-hide"> {" << zeige weniger"}</span></p>
                </div>


                <div hidden={this.state.isReadMore}>
                    <p>Bei unseren Diagnostiken f&uuml;hren wir verschiedene Stationen durch und erfassen f&uuml;r Dich
                    <span onClick={this.toggleReadMore} className="read-or-hide">...Weiterlesen</span></p>
                </div>


                <p hidden={true}>Ich nehme an folgenden Messungen teil:</p>

                <div>
                    <h6 hidden={!(this.state.area_frank&&this.state.area_frank.length > 0)}>Motorik</h6>
                    {this.state.area_frank.map(
                        (item) =>

                            (<div key={item.study_area_id}>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td width={300}>{item.study}</td>
                                        <td
                                            className="form-check form-switch"
                                            id="toggle-switch"
                                        >
                                            <input
                                                name="switchId"
                                                className="form-check-input"
                                                type="checkbox"
                                                role="switch"
                                                id={item.study_area_id}
                                                defaultValue="switchId"
                                                defaultChecked={this.state.isToggleOn}
                                                onChange={this.handleChange}
                                            />
                                            <label className="form-check-label"> </label>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>)
                    )}
                </div>
                <br/>
                <div>
                    <h6 hidden={!(this.state.area_physiologie&&this.state.area_physiologie.length > 0)}>Physiologie</h6>
                    {this.state.area_physiologie.map(
                        (item) =>

                            (<div key={item.study_area_id}>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td width={300}>{item.study}</td>
                                        <td
                                            className="form-check form-switch"
                                            id="toggle-switch"
                                        >
                                            <input
                                                name="switchId"
                                                className="form-check-input"
                                                type="checkbox"
                                                role="switch"
                                                id={item.study_area_id}
                                                defaultValue="switchId"
                                                defaultChecked={this.state.isToggleOn}
                                                onChange={this.handleChange}
                                            />
                                            <label className="form-check-label"> </label>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>)
                    )}
                </div>
                <br/>
                <div>
                    <h6 hidden={!(this.state.area_psychologie&&this.state.area_psychologie.length > 0)} >Psychologie</h6>
                    {this.state.area_psychologie.map(
                        (item) =>

                            (<div key={item.study_area_id}>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td width={300}>{item.study}</td>
                                        <td
                                            className="form-check form-switch"
                                            id="toggle-switch"
                                        >
                                            <input
                                                name="switchId"
                                                className="form-check-input"
                                                type="checkbox"
                                                role="switch"
                                                id={item.study_area_id}
                                                defaultValue="switchId"
                                                defaultChecked={this.state.isToggleOn}
                                                onChange={this.handleChange}
                                            />
                                            <label className="form-check-label"> </label>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>)
                    )}
                </div>
                <br/>
                <div>
                    <h6 hidden={!(this.state.area_social&&this.state.area_social.length > 0)}>Sozialwissenschaft</h6>
                    {this.state.area_social.map(
                        (item) =>

                            (<div key={item.study_area_id}>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td width={300}>{item.study}</td>
                                        <td
                                            className="form-check form-switch"
                                            id="toggle-switch"
                                        >
                                            <input
                                                name="switchId"
                                                className="form-check-input"
                                                type="checkbox"
                                                role="switch"
                                                id={item.study_area_id}
                                                defaultValue="switchId"
                                                defaultChecked={this.state.isToggleOn}
                                                onChange={this.handleChange}
                                            />
                                            <label className="form-check-label"> </label>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>)
                    )}
                </div>

                <br/>

                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td width={300}>
                                    Einverständnis, dass Video-/Ton- und Bildaufnahmen bei Absolvierung der Tests gemacht werden dürfen.
                                </td>
                                <td
                                        className="form-check form-switch"
                                        id="toggle-switch"
                                    >
                                        <input
                                            name="switchId"
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            id="video"
                                            defaultValue="switchId"
                                            defaultChecked={this.state.isToggleOn}
                                            onChange={this.setVideo}
                                        />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>



                <br/>

                <div>
                    <table>
                        <tbody>
                        <tr>
                            <td width={300}>
                                Einverständnis, dass die im Rahmen der Leistungsdiagnostiken erhobenen Daten am OSP/Stützpunkt für das In:prove- Projekt genutzt werden dürfen.
                            </td>
                            <td
                                className="form-check form-switch"
                                id="toggle-switch"
                            >
                                <input
                                    name="switchId"
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="OSP"
                                    defaultValue="switchId"
                                    defaultChecked={this.state.isToggleOn}
                                    onChange={this.setOps}
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>


                <br/>

                <div>
                    <table>
                        <tbody>
                        <tr>
                            <td width={300}>
                                Einverständnis, dass ich über Befunde, die möglicherweise für einen optimalen Trainingserfolg von Bedeutung sind, oder medizinisch abgeklärt werden sollten, informiert werden möchte.
                            </td>
                            <td
                                className="form-check form-switch"
                                id="toggle-switch"
                            >
                                <input
                                    name="switchId"
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="accidentData"
                                    defaultValue="switchId"
                                    defaultChecked={this.state.isToggleOn}
                                    onChange={this.setExtra}
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>



                <br/>

                <div>
                    <table>
                        <tbody>
                        <tr>
                            <td width={300}>
                                Technisch notwendige Cookies
                            </td>
                            <td
                                className="form-check form-switch"
                                id="toggle-switch"
                            >
                                <input
                                    enabled={false}
                                    name="switchId"
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="cookies"
                                    defaultValue="switchId"
                                    checked={true}
                                    onChange={this.handleChange}
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>








                <button
                    type="button"
                    className="btn btn-primary btn-block m-2"
                    onClick={this.handleSubmit}
                >
                    Senden
                </button>
            </div>
        );
    }
}


/*function ApproveTestsCNew(props) {
 let navigate = useNavigate();
const [searchParams, setSearchParams] = useSearchParams();
 const [showStudies, setShowStudies] = useState(false);
 const st = searchParams.get("admiregxn");
 let tempParam = searchParams.get("temreg");
 let isTemp = false;
 if(tempParam)
   isTemp = true;
 if(st === "" || st == null) {
   return <div>
     <div hidden={showStudies}>
       <ApproveTestsNew {...props} navigate={navigate} tempReg={isTemp} showStudies={setShowStudies}/>
     </div>
     <div hidden={!showStudies}>
       <ApproveTestsCNew {...props} navigate={navigate} showStudies={setShowStudies}/>
     </div>
   </div>;
 }
 else
   return <ApproveTestsNew {...props} navigate={navigate}/>;
}*/

export default ApproveTests;
