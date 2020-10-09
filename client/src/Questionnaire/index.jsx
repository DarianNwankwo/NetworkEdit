import React, { Component } from "react";

import "./style.css";
import formFieldsData from "./formFields";
import formFields from "./formFields";


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

    getFormFields() {
        const formFields = formFieldsData.map(data => {
            if (data.type == "range") {
                return (
                    <tr>
                        <td>{ data.question }</td>
                        <td><input type={ data.type } min="1" max="5" id={ data.for_id_name} name={ data.for_id_name } /></td>
                    </tr>
                );
            } else if (data.type == "number") {
                return (
                    <tr>
                        <td>{ data.question }</td>
                        <td><input type={ data.type } id={ data.for_id_name } name={ data.for_id_name } /></td>
                    </tr>
                )
            } else if (data.type == "radio") {
                return (
                    <tr>
                        <td>{ data.question }</td>
                        <td>
                            <input type="radio" id="male" name="gender" value="male" />
                            <label for="male">Male</label>
                            <input type="radio" id="female" name="gender" value="female" />
                            <label for="female">Female</label>
                            <input type="radio" id="other" name="gender" value="other" />
                            <label for="other">Other</label>
                        </td>
                    </tr>
                )
            }
        });

        return formFields;
    }

    render() {
        const formFields = this.getFormFields();

        return (
            <div className="container">
                <h1>Part 1: The Questionnaire</h1>
                <form>
                    <table>
                        <tbody>
                            { formFields }
                        </tbody>
                    </table>
                </form>
            </div>
        )
    }
}


export default Questionnaire;