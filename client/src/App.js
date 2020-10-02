import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import LandingPage from "./LandingPage";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import NetworkAnalysisPage from "./NetworkAnalysis";
import Questionnaire from "./Questionnaire";



function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/network-analysis" exact component={NetworkAnalysisPage} />
          <Route path="/questionnaire" exact component={Questionnaire} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
