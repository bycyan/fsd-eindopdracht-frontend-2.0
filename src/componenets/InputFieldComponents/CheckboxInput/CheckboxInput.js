import React from 'react';
import styles from "./CheckboxInput.module.css"

export class CheckboxInput extends React.Component {
    render() {
        return (
            <div className={styles.checkbox}>
                <input type="checkbox" id="myCheckbox" name="myCheckbox" value="checkboxValue" />
                <label htmlFor="myCheckbox"><h6>{this.props.text}</h6></label>
            </div>
        );
    }
}