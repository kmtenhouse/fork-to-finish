import React from "react";
import "./shade.css"

function Shade(props) {
    const classesToApply = "shade" + (props.open ? " shade--open": "");

    return (
        <div className={classesToApply} onClick={props.closeNav}></div>
    );
}

export default Shade;