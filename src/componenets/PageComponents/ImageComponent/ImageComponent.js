import React from 'react';
import styles from "./ImageComponent.module.css"

export class ImageComponent extends React.Component {

    handleImageClick = () => {
        this.fileInput.click();
    };

    render() {
        return (
            <>
                <img
                    src={this.props.src}
                    alt={this.props.alt}
                    className={styles[this.props.className]}
                    onClick={this.handleImageClick} // Attach click event handler
                />
                <input
                    type="file"
                    style={{ display: 'none' }}
                    ref={input => this.fileInput = input} // Create a reference to the file input element
                    onChange={this.props.onChange}
                />
            </>
        );
    }
}
