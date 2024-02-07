import React from "react";
import styles from "./LinkButton.module.css";
export class LinkButton extends React.Component {
    render() {
        const { text, href } = this.props;

        return (
            <a href={href} className={styles.link}><h6>{text}</h6></a>
        );
    }
}