/* Import packages */
import React, { Component } from 'react'
import { SketchPicker } from "react-color";
import axios from "axios";
import getContrastColor from "../../utils/contrastColor";

import "./colorselector.css";
import ColorBox from "../ColorBox";

class ColorSelector extends Component {
    state = {
        name: '',
        hex: '#fff',
        contrastColor: '',
        inputErr: '',
        saveErr: ''
    };

    handleChangeComplete = (color) => {
        //first, get the contrast color for this hex
        const newContrast = getContrastColor(color.hex);

        //next, update the state
        this.setState({
            hex: color.hex,
            contrastColor: newContrast
        });
    };

    handleInputChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        if (value.length > 30) {
            this.setState({
                inputErr: "Please use 30 characters or less!"
            });
        } else {
            this.setState({
                inputErr: '',
                [name]: value
            });
        }
    }

    saveColor = (event) => {
        event.preventDefault();
        const { hex, name, contrastColor } = this.state;
        axios.post("/api/color", { name, hex, contrastColor })
            .then( result=> console.log(result.data))
            .catch(err=> this.setState({ saveErr: err.message } ));
    }

    render() {
        return (
            <div className="color-select">
                <div className="color-select__section">
                    <SketchPicker
                        color={this.state.hex}
                        onChangeComplete={this.handleChangeComplete} />
                </div>
                <div className="color-select__section">
                    <ColorBox hex={this.state.hex} contrastColor={this.state.contrastColor} name={this.state.name} width="300px" />
                    <label htmlFor="name">Color Name:</label>
                    <input placeholder="Name your custom color!" type="text" value={this.state.name} name="name" onChange={this.handleInputChange} />
                    <div className="color-select__err">{this.state.inputErr}</div>
                    <button onClick={this.saveColor}>Save</button>
                    <div className="color-select__err">{this.state.saveErr}</div>
                </div>
            </div>
        );
    }

}

export default ColorSelector;