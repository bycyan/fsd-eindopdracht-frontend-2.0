import React from "react";
import "./ActionButton.module.css"

function ActionButton({ className, text }) {

    return (
        <button className={className}>
            {text}
        </button>
    );
}

export default ActionButton;