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

    addNewColor = (color) => {
        const allColors = this.state.colors;
        allColors.push(color);
        this.setState({ colors: allColors });
    }

    deleteColor = (colorToNix) => {
        axios.delete(`/api/color/${colorToNix._id}`, colorToNix)
        .then(result=> {
            const allColors = this.state.colors.filter(color => color._id !== colorToNix._id);
            this.setState({ colors: allColors});
        })
        .catch(err=>console.log(err));
    }

    handleChangeComplete = (color) => {
        this.setState({ hex: color.hex });
    };

    render() {
        return (
            <div className="page">
                <div className="page__section">
                    <h2 className="page__subhead">Add a Color</h2>
                    <ColorSelector onSave={this.addNewColor} />
                </div>
                <div className="page__section">
                    <h2 className="page__subhead">Your Palette</h2>
                    <ColorPalette colors={this.state.colors} onDelete={this.deleteColor} />
                </div>
            </div>
        );
    }

}

export default Dashboard;
