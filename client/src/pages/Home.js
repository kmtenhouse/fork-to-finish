import React, { Component } from 'react'
import "./page.css";

// Note: In development, we want a couple routes to direct to the backend for ouath flow
const baseURL = (process.env.NODE_ENV === "development" ? "http://localhost:4000" : '');
class Home extends Component {

    render() {
        return (
            <div className="page">

                <div className="page__section page__section--flex">
                    <div className="page__subsection page__subsection--teaser">
                        <h1 className="page__subhead">Pick your Passion.</h1>
                        <p>Save palettes of the most vibrant colors around!  Choose from any of our colors, or select your own.</p>
                        <p>
                            <a href={`${baseURL}/auth/google`}>
                                <button className="page__link page__link--button">
                                    Let's get started!
                            </button>
                            </a>
                        </p>
                    </div>
                    <div className="page__subsection">
                        <img className="page__splash" src="/images/swatches.png" alt="Illustration of a color palette" />
                    </div>
                </div>
            </div>
        );
    }
}


export default Home;