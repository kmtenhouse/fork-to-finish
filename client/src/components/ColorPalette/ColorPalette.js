import React from "react";
import "./colorpalette.css"

import ColorBox from "../ColorBox";

function ColorPalette(props) {
    const colors = props.colors || [];

    return(
        <div className="palette">
            {colors.map(color=> <ColorBox hex={color.hex} name={color.name} contrastColor={color.contrastColor} key={color._id} /> )}
        </div>
    );  
}

export default ColorPalette;