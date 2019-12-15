import React from "react";
import "./shade.css"

function Shade(props) {
    console.log((props.open ? "Shade is open" : "Shade is closed"));
    const classesToApply = "shade" + (props.open ? " shade--open": "");

    return (
        <div className={classesToApply} onClick={props.closeNav}></div>
    );
}

export default Shade;