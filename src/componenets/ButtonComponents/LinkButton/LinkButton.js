import React from "react";
import styles from "./LinkButton.module.css";

export class LinkButton extends React.Component {
    handleClick = (event) => {
        event.preventDefault(); // Prevents the default behavior of the anchor tag
        if (this.props.onClick) {
            this.props.onClick();
        }
    };

    render() {
        const { text, href } = this.props;

        return (
            <a href={href} className={styles.link} onClick={this.handleClick}>
                <h6>{text}</h6>
            </a>
        );
    }
}
