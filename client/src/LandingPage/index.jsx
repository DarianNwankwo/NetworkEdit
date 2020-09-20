import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import styled from "styled-components";

import "./style.css";
import CornellSvg from "./cornell.svg";


const ButtonLink = styled(Link)`
    text-decoration: none;
    background-color: white;
    font-size: 1.5em;
    border-radius: 7px;
    box-shadow: 0px 0px 5px 0px rgba(199,195,199,1);
    padding: 1% 12%;
    color: black;

    &:focus, &:hover, &:visited, &:link, &:active  {
        text-decoration: none;
    }

    &:hover {
        box-shadow: 0px 0px 10px 0px rgba(199,195,199,1); 
    }
    
`

function LandingPage() {
    return (
        <div>
            <div className="left-panel">
                <img src={CornellSvg} alt="Cornell Logo" />
            </div>
            <div className="right-panel">
                <div className="intro-container">
                    <h2>Ezra's Network</h2>
                    <p>
                       Your social network affects your ability to innovate and implement innovations. This activity
                       will help you assess your social network, In part 1 fill out your personal information, then
                       under part 2 click “add connection”.
                    </p><hr/><br/>
                    <p>
                        Questions will appear on the screen where you will provide information about one of your
                        relationships in your social network. When you are done, click “add connection” again and follow
                        the same procedure.
                    </p><hr/><br/>
                    <p>
                        The more connections you provide, the more accurate will be your analysis.
                    </p><br/>
                    <div className="auth-links">
                        <ButtonLink to="/login">Login</ButtonLink>
                        <ButtonLink to="/register">Sign Up</ButtonLink>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default LandingPage;