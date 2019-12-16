/* Import packages */
import React, { Component } from 'react'
import { SketchPicker } from "react-color";
import axios from "axios";

import "./colorselector.css";
import { NONAME } from 'dns';

class ColorSelector extends Component {
    state = {
        name: '',
        hex: '#fff',
        contrastColor: ''
    };

    handleChangeComplete = (color) => {
        this.setState({ hex: color.hex });
    };

    handleInputChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
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
                    <ColorBox hex={this.state.hex} contrastColor={this.state.contrastColor} name={this.state.name} />
                    <label htmlFor="name">Color Name:</label>
                    <input type="text" value={this.state.name} name="name" onChange={this.handleInputChange} />
                </div>
            </div>
        );
    }

}

export default ColorSelector;


function ColorBox(props) {
    const style = {
        backgroundColor: props.hex || "transparent",
        color: props.contrastColor || "#000",
        width: "100px",
        height: "100px"
    };
    return (
        <div style={style}>
            {props.name || 'Unnamed'}
            <ContrastDot hex="#FFFFFF" />
            <ContrastDot hex="#000000" />
        </div>
    );
}

function ContrastDot(props) {
    if (!props.hex) {
        return ''
    }

    const style = {
        height: "25px",
        width: "25px",
        backgroundColor: props.hex,
        borderRadius: "50%",
        borderColor: "transparent",
        display: "inline-block"
    };

    return (
        <button style={style}></button>
    );
}