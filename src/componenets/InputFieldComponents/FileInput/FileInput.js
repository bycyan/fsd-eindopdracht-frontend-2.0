import React from "react";

const FileInput = ({ onChange }) => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        onChange(file);
    };

    return (
        <input type="file" onChange={handleFileChange} />
    );
};

export default FileInput;
