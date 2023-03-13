import logo from './logo.svg';
import './App.css';
import Main from "./Main";
//import Main from './register/MainReg'; not here do it in index.json



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
