import React, { Component } from "react";

import Questionnaire from "../Questionnaire";
import Connections from "../Connections";
import "./style.css";


const SURVEY_SECTION_COUNT = 3;


async function getRootRequest() {
  const response = await fetch("http://localhost:3000");
  const data = await response.json();
  return data;
}

class NetworkAnalysisPage extends Component {
  constructor() {
    super();
    this.state = {
      formIndex: 0,
    };
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

  hanldePrevious() {

  }

  handleNext() {
    this.setState(prevState => {
      // this
      return {
        ...prevState,
        formIndex: prevState.formIndex <= 1 ? prevState.formIndex + 1 : SURVEY_SECTION_COUNT
      };
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
          {/* <Connections /> */}
          {/* <ConnectionsRelationships /> */}
          <div className="button-container">
            <button onClick={this.hanldePrevious}>Previous</button>
            <button onClick={this.handleNext}>Next</button>
            <button onClick={this.handleFormTransition}>Submit</button>
          </div>
        </div>
      </div>
    );
  }  
}


export default NetworkAnalysisPage;