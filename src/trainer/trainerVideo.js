/*
By Ahmed Al-Ghezi
 */

import React, {Component, PureComponent} from "react";
import ShareVideo from "../nico/videosharing/shareVideo";
import ShareVideo2 from "../trainer/VideoUpload/shareVideo2";
import DisplayVideo from "../nico/videosharing/displayVideo";
import ShareVideo3 from "./VideoUpload/shareVideo3";


import { Button, Collapse } from 'react-bootstrap';
import DisplayVideos2 from "./VideoUpload/displayVideo2";

export default class TrainerVideo extends Component {



    refresh = () =>{
        this.child.current.getAll();
    }


    constructor(props) {
        super(props);
        this.state = {
            isShareVideoVisible: false,
        };
        this.child = React.createRef();
        this.toggleShareVideo = this.toggleShareVideo.bind(this);
    }

    toggleShareVideo() {
        this.setState(prevState => ({ isShareVideoVisible: !prevState.isShareVideoVisible }));
    }


    render() {
        const { isShareVideoVisible } = this.state;

        return (
            <div>
                <Button onClick={this.toggleShareVideo} aria-controls="example-collapse-text" aria-expanded={isShareVideoVisible}>
                    {isShareVideoVisible ? '- ausblenden Video teilen' : '+ Video teilen'}
                </Button>
                <br></br>
                <Collapse in={this.state.isShareVideoVisible}>
                    <div id="example-collapse-text">
                        <ShareVideo3 uploadDone={this.refresh}/>
                    </div>
                </Collapse>
                <br/>
                <DisplayVideos2 ref={this.child} />
            </div>
        );
    }


}
