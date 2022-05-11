
/*
By Ahmed Al-Gehzi
 */
import React, {Component} from "react";
//import './trainerStyle.css';

import '../style.css';
import HandelTrainer from "../../DB/handelTrainer";
import {useNavigate} from 'react-router-dom';
import PostSignup from "../../DB/postSignup";

class AddToMyTestsC extends Component {


    constructor(props) {
        super(props);
        this.state = {preEvArr:[],changed:false,selectedAllTest:'',selectedMyTest:'', myTestsArr:[], allTestsArr:[],discipline:"Basketball",saving:false,disciplinesList:[] };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getMyTests = this.getMyTests.bind(this);
        this.getAllTests = this.getAllTests.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        this.getMyTests();
        this.getAllTests();
        this.getDisciplines();
    }


    getDisciplines(){
        PostSignup.getAllDisciplines().then(response => {
            if(response.data.res === "error") {
                const arr = ["connection error"];
                this.setState({disciplinesList: arr});
                return;
            }
            else {
                this.setState({disciplinesList: response.data.res});
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
        if(name === "discipline")
            this.getAllTests(value);

        console.log(target.value.title);
    }



    handleSubmit(event) {
        event.preventDefault();
        this.setState({saving:true});
        if (!this.state.changed)
            return;
        HandelTrainer.postMyTests({"tests":this.state.myTestsArr}).then(response => {
            if (response.data.res === "error") {
                alert("some error has happened");
                this.setState({saving:false});
            }
            else if (response.data.res === "wrong") {
                alert("user name or password are not correct");
                this.setState({saving:false});
            }
            if (response.data.res === "ok")
                alert("Your tests list is updated successfully");
        }).catch(e => {
            console.log(e);
            alert("some error has happened");
            this.setState({saving:false});
        });
    }



    handleAdd = (event) => {
        event.preventDefault();
        const arr  = this.state.myTestsArr;
        for(let i =0 ; i < arr.length ; i++){
            if(arr[i].title === this.state.selectedAllTest){
                return;
            }
        }
        for(let i = 0 ; i < this.state.allTestsArr.length ; i++){
            if(this.state.allTestsArr[i].title === this.state.selectedAllTest){
                arr.unshift(this.state.allTestsArr[i]);
            }
        }
        this.setState({changed:true});
        this.setState({myTestsArr:arr});
    }

    handleRemove = (event) => {
        event.preventDefault();
        const arr  = this.state.myTestsArr;
        const arr2 = [];
        for(let i =0 ; i < arr.length ; i++){
            if(arr[i].title !==this.state.selectedMyTest){
                arr2.push(arr[i]);
            }
        }
        this.setState({changed:true});
        this.setState({myTestsArr:arr2});
    }


    getAllTests(iDiscipline) {
        if(!iDiscipline)
            iDiscipline = this.state.discipline;
        HandelTrainer.getAllTests({"discipline":iDiscipline}).then(response => {
            if (response.data.res === "error")
                alert("some error has happened");
            else if (response.data.res === "wrong")
                alert("Please login first");
            else if(response.data.res === "empty"){
                alert("There are currently no tests for this discipline");
                this.setState({allTestsArr: []});
            }
            else if (response.data.res === "ok") {
                this.setState({allTestsArr: response.data.tests});
            }
        }).catch(e => {
            console.log(e);
            alert("Error getting tests list form server.");
        });
    }


    getMyTests() {
        HandelTrainer.getMyTests().then(response => {
            if (response.data.res === "error")
                alert("some error has happened");
            else if (response.data.res === "wrong")
                alert("Please login please");
            else if (response.data.res === "empty"){
                this.setState({myTestsArr: []});
            }
            if (response.data.res === "ok") {
                this.setState({myTestsArr: response.data.tests});
            }
        }).catch(e => {
            console.log(e);
            alert("Error getting tests list form server.");
        });
    }

    goBack(){
        this.props.navigate('/trainer/sheet');
    }


    handleAllTestListClick = (event) => {
        event.preventDefault();
        if (this.state.preEvArr['alltestList']) {
            this.state.preEvArr['alltestList'].target.classList.remove("active");
        }
        event.target.classList.add("active");
        const arr = this.state.preEvArr;
        arr['alltestList'] = event;
        this.setState({preEvArr:arr});
        //this.state.preEvArr['alltestList'] = event;

        // this.setState({tests:{"id":event.target.name, "title":event.target.text}});
        this.setState({selectedAllTest:event.target.name});
    }


    handleMyTestListClick = (event) => {
        event.preventDefault();
        if (this.state.preEvArr['mytestList']) {
            this.state.preEvArr['mytestList'].target.classList.remove("active");
        }
        event.target.classList.add("active");
        //this.state.preEvArr['mytestList'] = event;

        const arr = this.state.preEvArr;
        arr['mytestList'] = event;
        this.setState({preEvArr:arr});

        // this.setState({tests:{"id":event.target.name, "title":event.target.text}});
        this.setState({selectedMyTest:event.target.name});
    }


    render() {
        //some are adapted from <!-- Adapted from https://stackoverflow.com/a/16243163 -->
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Add to my trainings list</h3>

                <br></br>





                <div className="form-group">
                    <label>Discipline</label>
                    <br></br>
                    <select onChange={this.handleChange}  name="discipline">
                        {this.state.disciplinesList.map((item) => (
                            <option key={item} value={item}>{item}</option>
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
                                    <a href="#" className="active">All Training Types</a>
                                    {this.state.allTestsArr.map((option) => (
                                        <a name={option.title} key={option.id}
                                           onClick={this.handleAllTestListClick}>{option.title}</a>
                                    ))}
                                </div>
                            </td>




                            <td> <button onClick={this.handleAdd}> >> </button>
                                <br></br>
                                <button onClick={this.handleRemove}> {"<<"} </button></td>
                            <td>
                                <div className="vertical-menu midH">
                                    <a href="#" className="active">My Trainings</a>
                                    {this.state.myTestsArr.map((option) => (
                                        <a name={option.title} key={option.id}
                                           onClick={this.handleMyTestListClick}>{option.title}</a>
                                    ))}
                                </div>
                            </td>








                        </tr>
                        </tbody>
                    </table>
                </div>

                <p></p>
                <button type="submit" className="btn btn-primary btn-block" disabled={this.state.saving}>save</button>
                <button onClick={this.goBack} className="btn btn-primary btn-block paddingBtn">continue</button>
            </form>
        );
    }

}

function AddToMyTestsِِ(props) {
    let navigate = useNavigate();
    return <AddToMyTestsC {...props} navigate={navigate} />


    /*
    temp:
     <select onChange={this.handleChange} name="selectedMyTest" multiple>
                                    {this.state.myTestsArr.map((option) => (
                                        <option key={option.id} value={option.title}>{option.title}</option>
                                    ))}

                                </select>
     */



    /*
    <select  onChange={this.handleChange} name="selectedAllTest" multiple={true}>
                                    {this.state.allTestsArr.map((option) => (
                                        <option key={option.id}  value={option.title}>{option.title}</option>
                                    ))}
                                </select>
     */
}

export default AddToMyTestsِِ;