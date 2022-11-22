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
      ID: "1"
    },
    {
        name: "Peter",
        lastname: "Roth",
        ID: "2"
    },
  
    {
      name: "Julia",
      lastname: "Kunz",
      ID: "3"
      
    }];
    const testdata2 = [
      
        {
          name: "Julia",
          lastname: "Kunz",
          ID: "3"
          
        }];

    const testgroup = [
        {
          id: "1",
          name: "Basketball"
        },
        {
            id: "2",
            name: "Fussball"
        },
      
        {
            id: "3",
            name: "Yoga"
          
        }];


export default class CreateGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {trainersList:[], selectedTrainerList:[], selectedTrainer:'', selectedGroup:'', groupList:[], groupTitle:'', textField: '',preEvArr:[]};
        this.handleTrainersListClick = this.handleTrainersListClick.bind(this);
        this.getTrainers = this.getTrainers.bind(this);
        this.getGroups = this.getGroups.bind(this);
        this.newGroup = this.newGroup.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        //this.updateTrainersList = this.updateTrainersList.bind(this);
        this.handleGroupClick = this.handleGroupClick.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.removeGroup = this.removeGroup.bind(this);
    }

    componentDidMount() {
        this.getTrainers();
        this.getGroups();
    }

    getGroups(){
        HandelTrainer.getGroups().then(response => {
            if(response.data.res === "error") {
                const arr = ["connection error"];
                return;
            }
            if(response.data.res === "no"){
                alert("Bitte erst anmelden.");
                return;
            }
            if(response.data.res === "ok") {
                this.setState({groupList: response.data.groupList});
            }

        }).catch(e => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten!");
        });
    }

    getTrainers(){
        this.setState({trainersList: testdata});
        this.setState({groupList: testgroup});
        HandelTrainer.getAllTrainers().then(response => {
            if(response.data.res === "error") {
                const arr = ["connection error"];
                this.setState({trainersList: arr});
                return;
            }
            if(response.data.res === "no"){
                alert("Bitte erst anmelden.");
                return;
            }
            if(response.data.res === "ok") {
                this.setState({trainersList: response.data.trainersList});
            }

        }).catch(e => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten!");
        });
    }
    newGroup(event){
        //make new group
        if(this.state.textField === ''){
            alert("Bitte Gruppennamen auswählen");
            return;
        }else if(this.state.groupList.some(item => this.state.textField === item.name)){
            alert("Gruppe existiert schon");
            return;
        }
        HandelTrainer.createTrainerGroup(this.state.textField).then(response => {
            if(response.data.res === "error") {
                const arr = ["connection error"];
                this.setState({trainersList: arr});
                return;
            }
            if(response.data.res === "no"){
                alert("Bitte erst anmelden.");
                return;
            }
            if(response.data.res === "ok") {
                this.getGroups();
                this.setState({groupTitle: this.state.textField});
                this.setState({selectedTrainerList: []});
                this.setState({textField: ''});
                var text = document.getElementById("text");
                text.value = '';
            }

        }).catch(e => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten!");
        });
    }
    removeGroup(event){
        if(this.state.selectedGroup === ''){
            alert("Bitte Gruppe auswählen");
            return;
        }
        HandelTrainer.removeTrainerGroup(this.state.selectedGroup).then(response => {
            if(response.data.res === "error") {
                const arr = ["connection error"];
                this.setState({trainersList: arr});
                return;
            }
            if(response.data.res === "no"){
                alert("Bitte erst anmelden.");
                return;
            }
            if(response.data.res === "ok") {
                this.getGroups();
                this.setState({selectedTrainerList: [], selectedGroup: '', groupTitle: ''});
                var select = document.getElementById("groups");
                select.value = "DEFAULT";
            }

        }).catch(e => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten!");
        });
    }
    changeTitle(event){
        this.setState({textField: event.target.value});
    }
    /*
    updateTrainersList(selecttrain, train){
        train.forEach(function (item, index) {
            const div = document.getElementsByClassName("vertical-menu")[0].children[index+1]
            var check = selecttrain.some(function(o){return o["ID"] === item['ID'];});
            if(check){
                div.classList.add("active");
            }else{
                div.classList.remove("active");
            }
        });
    }
    */

    handleTrainersListClick(event) {
        event.preventDefault();
        if (this.state.preEvArr['trainerList']) {
            this.state.preEvArr['trainerList'].target.classList.remove("active");
        }
        event.target.classList.add("active");
        // this.state.preEvArr['testList'] = event;

        const arr = this.state.preEvArr;
        arr['trainerList'] = event;
        this.setState({preEvArr:arr});

        this.setState({selectedTrainer:event.target.id});
    }



    handleGroupClick(event) {
        event.preventDefault();
        this.setState({selectedTrainerList: testdata2});
        HandelTrainer.getGroupMembers(event.target.id).then(response => {
            if(response.data.res === "error") {
                const arr = ["connection error"];
                return;
            }
            if(response.data.res === "no"){
                alert("Bitte erst anmelden.");
                return;
            }
            if(response.data.res === "ok") {
                this.setState({selectedTrainerList: response.data.selectedtrainerlist});
            }

        }).catch(e => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten!");
        });
    }
    handleAdd = (event) => {
        event.preventDefault();
        HandelTrainer.addToGroup(this.state.selectedGroup,this.state.selectedTrainer).then(response => {
            if(response.data.res === "error") {
                const arr = ["connection error"];
                return;
            }
            if(response.data.res === "no"){
                alert("Bitte erst anmelden.");
                return;
            }
            if(response.data.res === "ok") {
                HandelTrainer.getGroupMembers(this.state.selectedGroup).then(response => {
                    if(response.data.res === "error") {
                        const arr = ["connection error"];
                        return;
                    }
                    if(response.data.res === "no"){
                        alert("Bitte erst anmelden.");
                        return;
                    }
                    if(response.data.res === "ok") {
                        this.setState({selectedTrainerList: response.data.selectedtrainerlist});
                    }
        
                }).catch(e => {
                    console.log(e);
                    alert("Es ist ein Fehler aufgetreten!");
                });
            }

        }).catch(e => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten!");
        });
    }

    handleRemove = (event) => {
        event.preventDefault();
        HandelTrainer.removeFromGroup(this.state.selectedGroup,this.state.selectedTrainer).then(response => {
            if(response.data.res === "error") {
                const arr = ["connection error"];
                return;
            }
            if(response.data.res === "no"){
                alert("Bitte erst anmelden.");
                return;
            }
            if(response.data.res === "ok") {
                HandelTrainer.getGroupMembers(this.state.selectedGroup).then(response => {
                    if(response.data.res === "error") {
                        const arr = ["connection error"];
                        return;
                    }
                    if(response.data.res === "no"){
                        alert("Bitte erst anmelden.");
                        return;
                    }
                    if(response.data.res === "ok") {
                        this.setState({selectedTrainerList: response.data.selectedtrainerlist});
                    }
        
                }).catch(e => {
                    console.log(e);
                    alert("Es ist ein Fehler aufgetreten!");
                });
            }

        }).catch(e => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten!");
        });
    }


    handleUpload(event){
        event.preventDefault();
        if(this.state.selectedGroup === ''){
            alert("Bitte Gruppe auswählen.");
            return;
        }
    }

    render() {
        return (
            <form onSubmit={this.handleUpload}>
                <h3>Gruppe erstellen</h3>
                <div>
                <label className="select-file">
                <input
                type="button"
                value="Neue Gruppe erstellen"
                onClick={this.newGroup}
              />
                </label>
                <label className="select-file">
                <input
                type="text"
                id="text"
                onChange={this.changeTitle}
              />
                </label>
                </div>
                <div>
                    <label>Gruppen:</label>
                    <select id="groups" name="groups" onChange={this.handleGroupClick} defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled>Gruppe auswählen</option>
                        {this.state.groupList.map((option) => (
                        <option value={option.id} name={option.name} key={option.id}
                            >{option.name}</option>
                         ))}
                    </select>
                </div>

                <div className="form-group">

<table>
    <tbody>
    <tr>
        <td>
        </td>
        <td> </td>
        <td>
        </td>
    </tr>

    <tr>
        <td>
            <div className="vertical-menu midH">
                <a href="#" className="active">Trainer*innen</a>
                {this.state.trainersList.map((option) => (
                    <a id={option.ID} name={option.ID} key={option.ID} className={""}
                    onClick={this.handleTrainersListClick}>{option.name}</a>
                ))}
            </div>
        </td>




        <td> <button onClick={this.handleAdd}> {">>"} </button>
            <br></br>
            <button onClick={this.handleRemove}> {"<<"} </button></td>
        <td>
            <div className="vertical-menu midH">
                <a href="#" className="active">Trainer*innen der Gruppe</a>
                {this.state.selectedTrainerList.map((option) => (
                    <a id={option.ID} name={option.ID} key={option.ID} className={""}
                    >{option.name}</a>
                ))}
            </div>
        </td>








    </tr>
    </tbody>
</table>
</div>

                <br></br><br></br>

                <div>
                <label className="select-file">
                <input
                type="button"
                value="Ausgewählte Gruppe löschen"
                onClick={this.removeGroup}
                 />
                 </label>

                </div>

                <div className="form-group">

          </div>
        
        
                <button type="submit" className="btn btn-primary btn-block">Trainer*innen zur Gruppe hinzufügen</button>
            </form>
        );
    }


}