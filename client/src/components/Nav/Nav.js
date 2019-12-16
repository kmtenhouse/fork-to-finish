import React from "react";
import { Link } from 'react-router-dom';
import LoginLink from "./LoginLink";
import SideNav from "./SideNav";
import Shade from "./Shade";

import HamburgerIcon from "./hamburger-menu-white-24px.svg";
import "./nav.css";

class Nav extends React.Component {
    state = {
        sideNavOpen: false
    };

    openSideNav = () => {
        this.setState({
            sideNavOpen: true
        });
    }

    closeSideNav = () => {
        this.setState({
            sideNavOpen: false
        });
    }

    render() {
        return (
            <React.Fragment>
                <nav className="nav">
                    <ul className="nav__group nav__group--mobile">
                        <li className="nav__item">
                            <a href="#" className="nav__link" onClick={this.openSideNav}><img src={HamburgerIcon} alt="Menu Icon" /></a>
                        </li>
                    </ul>

                    <ul className="nav__group nav__group--web">
                        <li className="nav__item">
                            <Link to="/home" className="nav__link">Home</Link>
                        </li>
                        <li className="nav__item">
                            <Link to="/about" className="nav__link">About</Link>
                        </li>
                    </ul>

                    <ul className="nav__group nav__group--logo">
                        <li className="nav__item">
                            Palette Town
                </li>
                    </ul>

                    <ul className="nav__group nav__group--web">
                        <li className="nav__item">
                            <LoginLink className="nav__link" />
                        </li>
                    </ul>
                </nav>
                <SideNav open={this.state.sideNavOpen} closeNav={this.closeSideNav} />
                <Shade open={this.state.sideNavOpen} closeNav={this.closeSideNav} />
            </React.Fragment>
        );
    }
}

function test() {
    console.log("Clicked");
}

export default Nav;