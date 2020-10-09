import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect, withRouter } from "react-router-dom";
import FlashMessage from "react-flash-message";
import bcrypt from "bcryptjs";
import "./styles.css";

import CornellBearSvg from "./cornell_bear.svg";


const NUM_OF_SALT_ROUNDS = 10;


class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();

        const formBody = {
            password: this.state.password,
            email: this.state.email
        }

        let url = "http://localhost:3000/auth/login";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formBody),
            credentials: "include"
        });
        console.log(response.status);
        
        if (response.status === 200) {
            this.props.history.push("/network-analysis");
        } else {
            this.setState({
                password: "",
                email: "",
                error: true
            })
        }
    }

    render() {
        return (
            <div className="fullview">
                <div className="login-container">
                    <div className="lleft-window">
                        <h2>Login</h2>
                        <p>
                            Need to create an account? &nbsp;
                            <Link to="/register">Click here</Link>
                        </p>
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" id="email" name="email" placeholder="Email Address" value={this.state.email} onChange={this.handleChange} required /><br/>
                            <input type="password" id="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required /><br/>
                            <button>Login</button>
                            {/* <button type="button">Sign Up With Google</button> */}
                            {
                                this.state.error  &&
                                <div className="error">
                                    <FlashMessage duration={5000}>
                                        <strong>Sorry, either your password or email was incorrect. Try again.</strong>
                                    </FlashMessage>
                                </div>
                            }
                        </form>
                        <p>
                            <Link to="/">Back Home</Link>
                        </p>
                    </div>
                    <div className="lright-window">
                        <img src={CornellBearSvg} alt="Cornell Bear Logo" />
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(LoginPage);