import React from "react";
import "./SubmitButton.module.css"

function SubmitButton({ className, text, onClick }) {
    const handleClick = () => {
        onClick();
    };

    return (
        <button className={className} onClick={handleClick}>
            {text}
        </button>
    );
}

export default SubmitButton;