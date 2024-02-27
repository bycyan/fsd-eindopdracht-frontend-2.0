import React from 'react';
import styles from "./ImageComponent.module.css"

export class ImageComponent extends React.Component {

    handleImageClick = () => {
        this.fileInput.click();
    };

    render() {
        const { src, alt, className, showEdit } = this.props;
        return (
            <>
                <div className={styles.image_container}>
                    <img
                        src={src}
                        alt={alt}
                        className={styles[className]}
                        onClick={this.handleImageClick}
                    />
                    {showEdit && (
                        <div className={styles.image_overlay} onClick={this.handleImageClick}>
                            <span className={styles.image_edit}>Edit</span>
                        </div>
                    )}
                </div>
                <input
                    type="file"
                    style={{ display: 'none' }}
                    ref={input => (this.fileInput = input)}
                    onChange={this.props.onChange}
                />
            </>
        );
    }
}
