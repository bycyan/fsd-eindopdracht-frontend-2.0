import React from "react";
import "./SubmitButton.module.css";
export class SubmitButton extends React.Component {
    render() {
        return (
            <button>{this.props.text}</button>
        );
    }
}