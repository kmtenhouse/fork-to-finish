import React from "react";
import "./sidenav.css";
import ClearX from "./clear-24px.svg";
import LoginLink from "./LoginLink";

function SideNav(props) {
    console.log(props);
    const classesToApply = "sidenav" + (props.open ? " sidenav--open" : '');
    console.log(props.open ? "Sidenav is open" : "Sidenav is closed");

    return (
        <div className={classesToApply}>
            <ul className="sidenav__group">
                <li className="sidenav__item sidenav__item--heading">
                    <img className="" src={ClearX} alt="Close Menu" onClick={props.closeNav} />
                </li>
                <li className="sidenav__item">
                    <a href="/home" className="sidenav__link">Home</a>
                </li>
                <li className="sidenav__item">
                    <a href="/about" className="sidenav__link">About Palette Town</a>
                </li>
                <li className="sidenav__item">
                    <LoginLink className="sidenav__link" />
                </li>
            </ul>
        </div>
    );

}

export default SideNav;