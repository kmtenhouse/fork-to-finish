/* Import packages */
import React, { Component } from 'react'
import ColorSelector from "../components/ColorSelector";
import "./page.css";

class Dashboard extends Component {
    state = {
        name: '',
        hex: '#fff'
    };

    handleChangeComplete = (color) => {
        this.setState({ hex: color.hex });
    };

    render() {
        return (
            <div className="page">
                <div className="page__section">
                    <h2 className="page__subhead">Create a Color</h2>
                    <ColorSelector />
                </div>
            </div>
        );
    }

}

export default Dashboard;
