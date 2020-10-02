import React, { Component } from "react";

import "./style.css";
import formFieldsData from "./formFields";


class Questionnaire extends Component {
    constructor() {
        super();
        this.state = {
            age: 18,
            gender: "F",
            yearsOfWorkExperience: 0,
            countriesLivedIn: 1,
            networkDiversity: 0,
            accessToEliteContacts: 0,
            obligationToNetwork: 0,
            networkReliabilityForTechnicalAdvice: 0,
            networkReliabilityForBusinessGuidance: 0,
            networkReliabilityForFinancialSupport: 0
        }
    }

    render() {
        const formFields = formFieldsData.map(data => {
            return <h3>{ data.question }</h3>;
        })
        return (
            <div>
                <h1>Part 1: The Questionnaire</h1>
                { formFields }
            </div>
        )
    }
}


export default Questionnaire;