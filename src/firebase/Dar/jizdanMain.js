/*
By Ahmed Al-Ghezi
 */

import React, {useState} from 'react';

import { Routes, Route, } from "react-router-dom";



import ScrollingContent from "./Dar";
//import Dar2 from "./Dar2";


function Main() {
    const [nvLogin, setnvLogin] = useState(false);
    const [hideNav, setHideNav] = useState(false);

    const onLoginF = () => {
        setnvLogin(true);
    }
    const hideNavBarFooter=() =>{
        setHideNav(true);
    }
    const onNavBar = () => {
        setnvLogin(false);
    }
    return (
        <div>


            <div>
                <Routes>

                   <Route path='/jizdan/dar' element={<div><ScrollingContent/></div>} />


                </Routes>
            </div>
            <div><p></p></div>

        </div>
    );
}
export default Main;
