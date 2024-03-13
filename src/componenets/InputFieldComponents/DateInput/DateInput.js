import React from "react";
import styles from "./DateInput.module.css";

const DateInput = ({ value, onChange, placeholder }) => {
    // Function to generate an array of years
    const generateYears = (startYear, endYear) => {
        const years = [];
        for (let year = startYear; year <= endYear; year++) {
            years.push(year);
        }
        return years;
    };

    // Function to handle change
    const handleChange = (event) => {
        onChange(event.target.value);
    };

    // Generate an array of years from the current year to 10 years in the future
    const currentYear = new Date().getFullYear();
    const futureYears = generateYears(currentYear, currentYear + 10);

    return (
        <select
            value={value}
            onChange={handleChange}
            className={styles.dateInput} // Add a custom class for styling
        >
            <option value="">{placeholder}</option>
            {futureYears.map(year => (
                <option key={year} value={year}>{year}</option>
            ))}
        </select>
    );
};

export default DateInput;
