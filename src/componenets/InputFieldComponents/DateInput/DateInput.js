import React from "react";
import styles from "./DateInput.module.css";

const DateInput = ({ value, onChange, placeholder }) => {
    const generateYears = (startYear, endYear) => {
        const years = [];
        for (let year = startYear; year <= endYear; year++) {
            years.push(year);
        }
        return years;
    };

    const handleChange = (event) => {
        onChange(event.target.value);
    };

    const currentYear = new Date().getFullYear();
    const futureYears = generateYears(currentYear, currentYear + 10);

    return (
        <select
            value={value}
            onChange={handleChange}
            className={styles.dateInput}
        >
            <option value="">{placeholder}</option>
            {futureYears.map(year => (
                <option key={year} value={year}>{year}</option>
            ))}
        </select>
    );
};

export default DateInput;
