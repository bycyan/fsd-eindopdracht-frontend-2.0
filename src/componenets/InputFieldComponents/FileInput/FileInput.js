import React from "react";

const FileInput = ({ onChange, placeholder }) => { // Remove the 'value' prop since it's not needed for file inputs
    return (
        <input
        type="file" onChange={(event) => console.log(event.target.files[0])} />
    );
};

export default FileInput;
