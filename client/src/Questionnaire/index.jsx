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

    getFormFields() {
        const datalistStyle = {
            display: "flex",
            justifyContent: "space-between"
        };
        const formFields = formFieldsData.map(data => {
            if (data.type == "range") {
                const options = ["1", "2", "3", "4", "5"].map(n => {
                    return <option value={ n } label={ n } style={{ display: "inline-block" }}></option>
                })
                return (
                    <tr>
                        <td>{ data.question }</td>
                        <td>
                            <input type={ data.type } min="1" max="5" id={ data.for_id_name} name={ data.for_id_name } list="steplist" />
                            <datalist style={ datalistStyle } id="steplist">{ options }</datalist>
                        </td>
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
            <div>
                <h1>Part 1: The Questionnaire</h1>
                <form>
                    <table cellSpacing="0">
                        <tbody>
                            { formFields }
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}


export default Questionnaire;