import React from "react";
import "./colorpalette.css"

import ColorBox from "../ColorBox";

function ColorPalette(props) {
    const colors = props.colors || [];

    return(
        <div className="palette">
            {colors.map(color=> <ColorBox color={color} name={color.name} animate={true} key={color._id} onDelete={props.onDelete} /> )}
        </div>
    );  
}

export default ColorPalette;