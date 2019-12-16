/* Import packages */
import React, { Component } from 'react'
import ColorSelector from "../components/ColorSelector";
import ColorPalette from "../components/ColorPalette";
import "./page.css";
import axios from "axios";

class Dashboard extends Component {
    state = {
        name: '',
        hex: '#fff',
        colors: []
    };

    componentDidMount() {
        this.getUserColors();
    }

    getUserColors = async() => {
        try {
            const allColors = await axios.get("/api/color");
            this.setState({
                colors: allColors.data.colors
            })
        }
        catch(err) {
            console.log(err);
        }
    }

    handleChangeComplete = (color) => {
        this.setState({ hex: color.hex });
    };

    render() {
        return (
            <div className="page">
                <div className="page__section">
                    <h2 className="page__subhead">Create a Color</h2>
                    <ColorSelector onSave={this.getUserColors} />
                    <ColorPalette colors={this.state.colors} />
                </div>
            </div>
        );
    }

}

export default Dashboard;
