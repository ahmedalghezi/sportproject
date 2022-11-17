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
        name: "Peter",
        lastname: "Roth",
        email: "2"
    },
  
    {
      name: "Julia",
      lastname: "Kunz",
      email: "3"
      
    }];
    const testdata2 = [
      
        {
          name: "Julia",
          lastname: "Kunz",
          email: "3"
          
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
        this.state = {trainersList:[], selectedTrainerList:[], selectedGroup:'', groupList:[], groupTitle:'', textField: ''};
        this.handleTrainersListClick = this.handleTrainersListClick.bind(this);
        this.getTrainers = this.getTrainers.bind(this);
        this.getGroups = this.getGroups.bind(this);
        this.newGroup = this.newGroup.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.updateTrainersList = this.updateTrainersList.bind(this);
        this.handleGroupClick = this.handleGroupClick.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.removeGroup = this.removeGroup.bind(this);
    }

    componentDidMount() {
        this.getTrainers();
    }

    getGroups(){
        //getGroups
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
            if(response.data.res === "error"){
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
        const ids = this.state.groupList.map(object => {
            return object.id;
          });
        const max = Math.max(...ids);
        this.setState(previousState => ({
            groupList: [...previousState.groupList, {id: String(max + 1), name: this.state.textField}], selectedGroup: String(max + 1)
        }));
        this.setState({groupTitle: this.state.textField});
        this.setState({selectedTrainerList: []});
        this.updateTrainersList([],this.state.trainersList);
        //resp to make new group
    }
    removeGroup(event){
        if(this.state.selectedGroup === ''){
            alert("Bitte Gruppe auswählen");
            return;
        }
        this.setState({selectedTrainerList: [], selectedGroup: '', groupTitle: ''});
        this.updateTrainersList([],this.state.trainersList);
        var gr = this.state.selectedGroup;
        this.setState({groupList: this.state.groupList.filter(function(sport) {
            return sport.id !== gr
        })});
        var select = document.getElementById("groups");
        select.value = "DEFAULT";
    }
    changeTitle(event){
        this.setState({textField: event.target.value});
    }
    updateTrainersList(selecttrain, train){
        train.forEach(function (item, index) {
            const div = document.getElementsByClassName("vertical-menu")[0].children[index+1]
            var check = selecttrain.some(function(o){return o["email"] === item['email'];});
            if(check){
                div.classList.add("active");
            }else{
                div.classList.remove("active");
            }
        });
    }

    handleTrainersListClick(event) {
        event.preventDefault();
        if(event.target.classList.contains("active")){
            event.target.classList.remove("active");
            let filteredArray = this.state.selectedTrainerList.filter(item => item !== event.target.name)
            this.setState({selectedTrainerList: filteredArray});
        }else{
            event.target.classList.add("active");
            this.setState(previousState => ({
                selectedTrainerList: [...previousState.selectedTrainerList, event.target.name]
            }));
        }
    }



    handleGroupClick(event) {
        event.preventDefault();
        this.setState({selectedTrainerList: testdata2});
        this.updateTrainersList(testdata2,this.state.trainersList);
        this.setState({selectedGroup: this.state.groupList.find(o => o.id === String(event.target.value)).id});
        this.setState({groupTitle: this.state.groupList.find(o => o.id === String(event.target.value)).name});
    }


    handleUpload(event){
        event.preventDefault();
        if(this.state.selectedTrainerList === []){
            alert("Bitte Trainer*in auswählen.");
            return;
        }
        //post selectedTrainerList and selected group
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
                <h3>Gruppe erstellen</h3>
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
                <label className="select-file">
                <input
                type="button"
                value="Gruppe löschen"
                onClick={this.removeGroup}
                 />
                 </label>

                </div>

                <div className="vertical-menu">
                    <a href="#" className="active">Trainer*innen</a>
                    {this.state.trainersList.map((option) => (
                        <a id={option.email} name={option.email} key={option.email} className={""}
                           onClick={this.handleTrainersListClick}>{option.name}</a>
                    ))}
                </div>

                <br></br><br></br>

                <div className="form-group">

          </div>
        
        
                <button type="submit" className="btn btn-primary btn-block">Trainer*innen zur Gruppe hinzufügen</button>
            </form>
        );
    }


}