import React from "react";

function CancelButton({ className, text, onClick }) {
    const handleClick = () => {
        onClick(); // Call the onClick function passed from the parent component
    };

    return (
        <button className={className} onClick={handleClick}>
            {text}
        </button>
    );
}

export default CancelButton;