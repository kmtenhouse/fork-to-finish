import React from "react";
import "./colorbox.css";

function ColorBox(props) {
    const hex = props.hex || "#fff";
    const contrastColor = props.contrastColor || "#000";

    const style = {
        backgroundColor: hex,
        color: contrastColor
    };

    if (props.width) {
        style.width = props.width;
    }

    return (
        <div className="colorbox" style={style}>
            <ul className="colorbox__info">
                <li className="colorbox__item">
                    {props.name || ''}
                </li>
                <li className="colorbox__item">
                    {hex}
                </li>
            </ul>

        </div>
    );
}

export default ColorBox;