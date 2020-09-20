import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./styles.css";


import CornellBearSvg from "./cornell_bear.svg";

class RegisterPage extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="fullview">
                <div className="register-container">
                    <div className="left-window">
                        <h2>Sign Up</h2>
                        <p>
                            Already registered?
                            <Link to="/login">Click here</Link>
                        </p>
                        <form>
                            <input type="text" id="fullname" name="fullname" placeholder="Darian Nwankwo" required /><br/>
                            <input type="text" id="email" name="email" placeholder="Email Address" required /><br/>
                            <input type="password" id="password" name="password" placeholder="Password" required /><br/>
                            <input type="password" id="password-repeat" name="password_repeat" placeholder="Retype Password" required /><br/>
                            <button>Sign Up Now</button>
                            <button>Sign Up With Google</button>
                        </form>
                    </div>
                    <div className="right-window">
                        <img src={CornellBearSvg} alt="Cornell Bear Logo" />
                    </div>
                </div>
            </div>
        )
    }
}


export default RegisterPage;