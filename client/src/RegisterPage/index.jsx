import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect, withRouter } from "react-router-dom";
import bcrypt from "bcryptjs";
import "./styles.css";

import CornellBearSvg from "./cornell_bear.svg";


const NUM_OF_SALT_ROUNDS = 10;


class RegisterPage extends Component {
  constructor() {
    super();
    this.state = {
      fullname: "",
      email: "",
      password: "",
      passwordRepeated: ""
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

    if (this.state.password.localeCompare(this.state.passwordRepeated)) {
      alert("Passwords must match!");
    } else {
      console.log(bcrypt.hashSync(this.state.password, NUM_OF_SALT_ROUNDS));
      const formBody = {
        password: bcrypt.hashSync(this.state.password, NUM_OF_SALT_ROUNDS),
        email: this.state.email,
        fullname: this.state.fullname
      }

      // (TODO): Access this via a environment variable
      let url = "http://localhost:3000/auth/register";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formBody),
        credentials: "include"
      });
      console.log(response.status);
      this.props.history.push("/network-analysis");
    }
  }

  render() {
    return (
      <div className="fullview">
        <div className="register-container">
          <div className="left-window">
            <h2>Sign Up</h2>
            <p>
              Already registered? &nbsp;
                            <Link to="/login">Click here</Link>
            </p>
            <form onSubmit={this.handleSubmit}>
              <input type="text" id="fullname" name="fullname" placeholder="Darian Nwankwo" value={this.state.fullname} onChange={this.handleChange} required /><br />
              <input type="text" id="email" name="email" placeholder="Email Address" value={this.state.email} onChange={this.handleChange} required /><br />
              <input type="password" id="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required /><br />
              <input type="password" id="password-repeat" name="passwordRepeated" placeholder="Retype Password" value={this.state.passwordRepeated} onChange={this.handleChange} required /><br />
              <button>Sign Up Now</button>
              {/* <button type="button">Sign Up With Google</button> */}
            </form>
            <p>
              <Link to="/">Back Home</Link>
            </p>
          </div>

          <div className="right-window">
            <img src={CornellBearSvg} alt="Cornell Bear Logo" />
          </div>
        </div>
      </div>
    )
  }
}


export default withRouter(RegisterPage);