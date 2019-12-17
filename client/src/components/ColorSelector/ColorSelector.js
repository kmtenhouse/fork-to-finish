/* Import packages */
import React, { Component } from 'react'
import { SketchPicker } from "react-color";
import getContrastColor from "../../utils/contrastColor";

/* Import css */
import "./colorselector.css";
import "./band.css";

class ColorSelector extends Component {
    state = {
        name: 'Snow White',
        hex: '#FFFFFF',
        contrastColor: '#000000',
        inputErr: ''
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
        this.props.onSave({ hex, name, contrastColor });
    }

    render() {
        return (
            <div className="color-select">

                <div className="color-select__section">
                    <ColorBand hex={this.state.hex} contrastColor={this.state.contrastColor} name={this.state.name} />
                    <div className="color-select__group">
                        <label className="color-select__label" htmlFor="colorName">Color Name:</label>
                        <input className="color-select__input" type="text" value={this.state.name} name="name" id="colorName" onChange={this.handleInputChange} />
                        <div className="color-select__bar"></div>

                    </div>
                    <div className="color-select__err">{this.state.inputErr}</div>
                    <button className="color-select__button" onClick={this.saveColor}>Save</button>

                    <div className="color-select__err">{this.props.saveErr}</div>
                </div>
                <div className="color-select__section color-select__section--picker">
                    <SketchPicker
                        width="95%"
                        color={this.state.hex}
                        onChangeComplete={this.handleChangeComplete} />
                </div>
            </div>
        );
    }

}

function ColorBand(props) {
    const divStyle = {
        backgroundColor: props.hex || "#FFFFFF",
        color: props.contrastColor || "#000000",
    };

    return (
        <div className="band" style={divStyle}>
            <ul className="band__info">
                <li className="band__label band__label--name">{props.name || ''}</li>
                <li className="band__label">{props.hex || ''}</li>
            </ul>
        </div>
    );
}

export default ColorSelector;