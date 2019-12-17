import React from "react";
import "./page.css";
import { CreditGallery, CreditBox } from "../components/CreditBox/";


function About(props) {
    const credits = [
        {
            image: "/images/swatches.png",
            alt: "Freepik image: Architectural design by Studiogstock",
            href: "https://www.freepik.com/free-vector/architectural-work-design_3601119.htm",
            license: "Freepik Premium (Unlimited Usage)",
            author: "Design by Studiogstock",
            _id: 0
        },
        {
            image: "/images/spill.png",
            alt: "Freekpik image: Watercolor crimson and mint stain by Skliarova",
            href: "https://www.freepik.com/free-vector/watercolor-crimson-and-mint-stain_1672975.htm",
            license: "Freepik Premium (Unlimited Usage)",
            author: "Watercolor by Skliarova",
            _id: 1
        },
        {
            image: "/images/material_icons.png",
            alt: "Google Icons: Material Icons",
            href: "https://material.io/resources/icons/?style=baseline",
            license: "Apache License 2.0",
            author: "Google Material Icons",
            _id: 2
        },
        {
            image: "/images/oregano_font.png",
            alt: "Google Fonts: Oregano",
            href: "https://fonts.google.com/specimen/Oregano",
            license: "Open Font License",
            author: "Google Fonts",
            _id: 3
        }
    ];

    return (
        <div className="page">
            <h1 className="page__heading">About Palette Town</h1>
            <section className="page__section">
                <p>Palette Town is a brief demonstration of the MERN starter kit <a className="page__link" href="https://github.com/kmtenhouse/fork-to-finish">Fork to Finish</a>. 
                This example project demonstrates an application which uses both authentication and authorization to allow users to create and save custom collections of RGB colors.</p>
                
                <p>This demo does not retain any data about a user's identity aside from a unique number provided by Google. A small amount of data (a 'session cookie') is also stored on the user's machine in order to validate their authentication status.</p>
            </section>
            <section className="page__section">
                <h2 className="page__subhead">Artwork Credits</h2>
                <CreditGallery>
                    {credits.map(attribution => <CreditBox attribution={attribution} key={attribution._id} />)}
                </CreditGallery>
            </section>
        </div>
    );
}

export default About;