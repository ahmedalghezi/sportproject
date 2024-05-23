import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import reportWebVitals from './reportWebVitals';


import { BrowserRouter } from "react-router-dom";
import Main from "./Main";
//import MainReg from "./register/MainReg";
//import Main from "./register/MainReg";

//import Main from "./firebase/Dar/jizdanMain";


if (process.env.NODE_ENV === 'production') {
    /*console.log = () => {}
    console.error = () => {}
    console.debug = () => {}*/
}



ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
        <Main/>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
/*ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();


