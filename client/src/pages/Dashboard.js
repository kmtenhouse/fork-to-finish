/* Import packages */
import React, { Component } from 'react'
import axios from "axios";

/* Import components */
import ColorSelector from "../components/ColorSelector";
import ColorPalette from "../components/ColorPalette";

/* Import css */
import "./page.css";
import "./dashboard.css";

class Dashboard extends Component {
    state = {
        name: 'Snow White',
        hex: '#ffffff',
        colors: [],
        saveErr: ''
    };

    componentDidMount() {
        this.getUserColors();
    }

    getUserColors = async () => {
        try {
            const allColors = await axios.get("/api/color");
            this.setState({
                colors: allColors.data.colors
            })
        }
        catch (err) {
            console.log(err);
        }
    }

    addColor = (colorToAdd) => {
        //First, check if we have too many colors already:
        if (this.state.colors.length >= 16) {
            this.setState({ saveErr: "Sorry, you can only save up to 16 colors at a time!" });
            return;
        }
        //If not: we try to save the color, and then update our local store
        axios.post("/api/color", colorToAdd)
            .then(result => {
                const allColors = this.state.colors;
                allColors.push(result.data);
                this.setState({ colors: allColors });
            })
            .catch(err => {
                this.setState({ saveErr: "Sorry, something went awry!  Try again later." });
            });

    }

    deleteColor = (colorToNix) => {
        axios.delete(`/api/color/${colorToNix._id}`, colorToNix)
            .then(result => {
                const allColors = this.state.colors.filter(color => color._id !== colorToNix._id);
                this.setState({ colors: allColors });
            })
            .catch(err => console.log(err));
    }

    handleChangeComplete = (color) => {
        this.setState({ hex: color.hex });
    };

    render() {
        return (
            <div className="page page--dashboard">
                <div className="page__section">
                    <h1 className="page__heading">Add a Color</h1>
                    <ColorSelector onSave={this.addColor} saveErr={this.state.saveErr} />
                </div>
                <div className="page__section">
                    <h1 className="page__heading">Your Palette</h1>
                    <ColorPalette colors={this.state.colors} onDelete={this.deleteColor} />
                </div>
            </div>
        );
    }

}

export default Dashboard;
