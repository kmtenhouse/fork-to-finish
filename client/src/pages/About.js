import React from "react";
import "./page.css";

function About(props) {
    return(
        <div className="page">
            <h1 className="page__heading">About Palette Town</h1>
            <p>Palette Town is a demonstration of the MERN starter kit <a className="page__link" href="https://github.com/kmtenhouse/fork-to-finish">Fork to Finish</a>.
            </p>
        </div>
    );
}

export default About;