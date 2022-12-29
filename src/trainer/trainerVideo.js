/*
By Ahmed Al-Ghezi
 */

import React, {Component, PureComponent} from "react";
import ShareVideo from "../nico/videosharing/shareVideo";
import DisplayVideo from "../nico/videosharing/displayVideo";

export default class TrainerVideo extends Component {


    constructor(props) {
        super(props);
        this.child = React.createRef();
    }

    refresh = () =>{
        this.child.current.getAll();
    }



    render() {
        return (
            <div>
                <ShareVideo onUpload={this.refresh}/>
                <br/>
                <DisplayVideo ref={this.child} />
            </div>
        );
    }


}