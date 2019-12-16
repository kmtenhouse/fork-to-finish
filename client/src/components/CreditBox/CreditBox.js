import React from "react";
import "./creditbox.css";

export function CreditBox(props) {
    const { image, alt, href, license, author } = props.attribution;

    return (
        <div className="credit-box">
            <a href={href}>
                <img className="credit-box__img" src={image} alt={alt} />
            </a>
            <ul className="credit-box__info">
                <li className="credit-box__item">
                    <a href={href}>{author}</a>
                </li>

                <li className="credit-box__item">
                    Licensed via {license}
                </li>
            </ul>
        </div>
    );
}

export function CreditGallery(props) {
    return (
        <div className="credit-gallery">
            {props.children}
        </div>
    );
}
