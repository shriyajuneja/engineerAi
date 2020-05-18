import React from 'react';
import './App.css';
import {Switch,Route} from "react-router-dom"
import Home from "./views/Home"
import Astroid from "./views/Astroid"

function App() {
  return (
    <div className="App">
     <Switch>
       <Route exact path="/" component={Home}/>
       <Route exact path="/astroid" component={Astroid}/>
     </Switch>
    </div>
  );
}

export default App;
