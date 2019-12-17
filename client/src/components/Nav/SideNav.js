import React from "react";
import { Link } from 'react-router-dom';
import LoginLink from "./LoginLink";

import ClearX from "./clear-24px.svg";
import "./sidenav.css";

function SideNav(props) {
    const classesToApply = "sidenav" + (props.open ? " sidenav--open" : '');

    return (
        <div className={classesToApply}>
            <ul className="sidenav__group">
                <li className="sidenav__item sidenav__item--heading">
                    <img className="" src={ClearX} alt="Close Menu" onClick={props.closeNav} />
                </li>
                <li className="sidenav__item">
                    <Link to="/home" className="sidenav__link">Home</Link>
                </li>
                <li className="sidenav__item">
                    <Link to="/about" className="sidenav__link">About</Link>
                </li>
                <li className="sidenav__item">
                    <LoginLink className="sidenav__link" />
                </li>
            </ul>
        </div>
    );

}

export default SideNav;