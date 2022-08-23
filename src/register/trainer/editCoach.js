/*
By Ahmed Al-Ghezi
 */

import React, {Component} from "react";
import HandelTrainer from "../../DB/handelTrainer";
import PostSignup from "../../DB/postSignup";

export default class EditCoach extends Component {


    constructor(props) {
        super(props);
        this.state = {trainersList:[], selectedTrainer:'',email:'',preEvArr:[]};
        this.handleChange = this.handleChange.bind(this);
        this.handleTrainersListClick = this.handleTrainersListClick.bind(this);
        this.handleDisguisedLogin = this.handleDisguisedLogin.bind(this);
        this.getTrainers = this.getTrainers.bind(this);
        this.makeCoach = this.makeCoach.bind(this);
    }


    componentDidMount() {
        this.getTrainers();
    }

    getTrainers(){
        HandelTrainer.getAllTrainers().then(response => {
            if(response.data.res === "error") {
                const arr = ["connection error"];
                this.setState({trainersList: arr});
                return;
            }
            if(response.data.res === "error"){
                alert("your should login first");
                return;
            }
            if(response.data.res === "ok") {
                this.setState({trainersList: response.data.trainersList});
            }

        }).catch(e => {
            console.log(e);
            alert("some error has happened");
        });
    }

    makeCoach(event) {
        event.preventDefault();
        HandelTrainer.makeCoach({email:this.state.email}).then(response => {
            if(response.data.res === "error") {
                alert("some error has happened");
                return;
            }
            if(response.data.res === "ok") {
                alert("Coach set correctly!");
                this.setState({email:''});
                this.getTrainers();
                return;
            }

        }).catch(e => {
            console.log(e);
            alert("some error has happened");
        });
    }

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

        this.setState({selectedTrainer:event.target.name});

    }

    handleDisguisedLogin(event){
        event.preventDefault();
        if(this.state.selectedTrainer === ''){
            alert("please select one coach");
            return;
        }
        PostSignup.disguisedTrainerLogin(this.state.selectedTrainer).then(response => {
            if(response.data.res === "ok"){
                //this.props.navigate('/trainer/addAthletes');
                window.location.href = window.location.origin+"/trainer/addAthletes";
            }else{
                alert("some error has happened");
            }
        }).catch(e => {
            console.log(e);
            alert("some error has happened");
        });
    }



    handleChange(event) {
        const target = event.target;
        let value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <form onSubmit={this.handleDisguisedLogin}>
                <h3>Make & Edit Coaches</h3>

                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Enter email " name="email" onChange={this.handleChange} />
                </div>
                <button onClick={this.makeCoach} className="btn btn-secondary btn-block" disabled={false}>Make Coach</button>

                <br></br><br></br>

                <div className="vertical-menu">
                    <a href="#" className="active">Coaches</a>
                    {this.state.trainersList.map((option) => (
                        <a name={option.email} key={option.email}
                           onClick={this.handleTrainersListClick}>{option.name}</a>
                    ))}
                </div>



                <button type="submit" className="btn btn-primary btn-block">login as coach</button>
            </form>
        );
    }


}