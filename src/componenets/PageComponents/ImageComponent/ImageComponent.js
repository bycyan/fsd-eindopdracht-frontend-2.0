import React from 'react';
import styles from "./ImageComponent.module.css"

export class ImageComponent extends React.Component {
    render() {
        return (
            <img src={this.props.src} alt={this.props.alt} className={styles[this.props.className]}  />
        );
    }
}