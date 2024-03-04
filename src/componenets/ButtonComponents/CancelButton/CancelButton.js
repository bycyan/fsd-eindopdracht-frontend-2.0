import React from "react";
import styles from "./CancelButton.module.css";

function CancelButton({ className, text, onClick }) {
    const handleClick = () => {
        onClick(); // Call the onClick function passed from the parent component
    };

    return (
        <button className={`${styles.cancelButton} ${className}`} onClick={handleClick}>
            {text}
        </button>
    );
}

export default CancelButton;