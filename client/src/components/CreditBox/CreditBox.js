import React from "react";
import "./creditbox.css";


function CreditBox(props) {

    const { image, alt, href, license, author } = props.attribution;

    return (

        <figure className="credit-box">
            <a href={href}>
                <img className="credit-box__img" src={image} alt={alt} />
            </a>
            <figcaption>
                <a href={href}>
                    <p>{author}</p>
                </a>
                <p>Licensed via {license}</p>
            </figcaption>
        </figure>

    );
}

export default CreditBox;