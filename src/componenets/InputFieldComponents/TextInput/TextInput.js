import React from "react";
import "./TextInput.module.css"

const TextInput = ({ value, onChange, placeholder }) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};

export default TextInput;