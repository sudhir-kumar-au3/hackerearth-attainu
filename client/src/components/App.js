import React from 'react';
import {Route, BrowserRouter as Router} from "react-router-dom";

import Header from './Header';
import Home from "./Home";
// import SingleData from './SingleData'
import '../App.css';

function App() {
  return (
    <React.Fragment>
      <Router>
      <Header></Header>
          <Route exact path="/" component={Home} />
          {/* <Route path ="/:" component={SingleData}/> */}
        </Router>
      
    </React.Fragment>
  );
}

export default App;
