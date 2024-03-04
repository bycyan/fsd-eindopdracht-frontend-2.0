import React from "react";

const FileInput = ({ onChange }) => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log("Selected file:", file); // Log the selected file
        onChange(file); // Pass the selected file to the parent component
    };

    return (
        <input type="file" onChange={handleFileChange} />
    );
};

export default FileInput;
