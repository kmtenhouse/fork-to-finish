import React from "react";
import BlackX from "./black-x.svg";
import WhiteX from "./white-x.svg"
import "./colorbox.css";

function ColorBox(props) {
    const hex = (props.color ? props.color.hex : props.hex) || "#000000";
    const contrastColor = (props.color ? props.color.contrastColor : props.contrastColor) || "#FFFFFF";
    const name = (props.color ? props.color.name : props.name) || "";

    const style = {
        backgroundColor: hex,
        color: contrastColor
    };

    if (props.width) {
        style.width = props.width;
    }

    if (props.height) {
        style.height = props.height;
    }

    const classesToApply = "colorbox" + (props.animate ? " colorbox--anim" : '');

    return (
        <div className={classesToApply} style={style}>
            {props.onDelete ?
                (<button onClick={() => props.onDelete(props.color)} className="colorbox__delete">
                    <img src={(contrastColor === "#000000" ? BlackX : WhiteX)} alt="Delete" />
                </button>)
                :
                ''}

            <ul className="colorbox__info">
                <li className="colorbox__item">
                    {name}
                </li>
                <li className="colorbox__item">
                    {hex}
                </li>
            </ul>

        </div>
    );
}

export default ColorBox;