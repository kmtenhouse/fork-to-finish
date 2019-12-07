"use strict";
import React from "react";
import './nav.css';

export function Navbar(props) {
    return (
        <nav className="nav">
            <Navlist>
                <Navitem>One</Navitem>
                <Navitem>Two</Navitem>
                <Navitem>Three</Navitem>
            </Navlist>
            <Navlogo>Fork to Finish</Navlogo>
            <Navlist>
                <Navitem>Four</Navitem>
                <Navitem>Five</Navitem>
                <Navitem>Six</Navitem>
            </Navlist>
        </nav>
    );
}

export function Navlist(props) {
    return (
        <ul className="nav__list">
            {props.children}
        </ul>
    );
}

export function Navitem(props) {
    return (
        <li className="nav__item">{props.children}</li>
    );
}

export function Navlogo(props) {
    return (
    <span className="nav__logo">{props.children}</span>
    );
}