import React from "react";
import "./EmailInput.module.css"

const EmailInput = ({ value, onChange }) => {
    return (
        <input
            type="email"
            placeholder="Email ID"
            value={value}
            onChange={onChange}
        />
    );
};

export default EmailInput;
