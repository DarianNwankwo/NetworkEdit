import React, { Component } from "react";

import Questionnaire from "../Questionnaire";
import Connections from "../Connections";
import "./style.css";


async function getRootRequest() {
  const response = await fetch("http://localhost:3000");
  const data = await response.json();
  return data;
}

class NetworkAnalysisPage extends Component {
  constructor() {
    super();
    this.state = {};
    this.getRootRequest = this.getRootRequest.bind(this);
  }

  async getRootRequest() {
    const response = await fetch("http://localhost:3000", {
      credentials: 'include'
    });

    response.json().then(d => {
      this.setState({
        message: d.message
      })
    })
  }

  componentDidMount() {
    this.getRootRequest();
  }

  render() {
    return (
      <div className="container">
        <div className="survey">
          <h1>Network Analysis Page</h1>
          <h2>{ this.state.message }</h2>
          <Questionnaire />
          <Connections />
          {/* <ConnectionsRelationships /> */}
        </div>
      </div>
    );
  }  
}


export default NetworkAnalysisPage;