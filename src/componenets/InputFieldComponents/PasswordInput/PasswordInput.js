import React from "react";
const PasswordInput = ({ value, onChange }) => {
    return (
        <input
            type="password"
            placeholder="Password"
            value={value}
            onChange={onChange}
        />
    );
};

export default PasswordInput;