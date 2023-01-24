import logo from './logo.svg';
import './App.css';
import Main from "./Main";
//import Main from './register/MainReg';
//import LoginBox from './register/LoginBox';
//import RegisterBox from './register/RegisterBox';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>

      <body>
      <Main/>
      </body>


    </div>
  );
}

export default App;
