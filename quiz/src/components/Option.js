// Option.js

import React from 'react';
import './Options.css'; // Ensure you have the corresponding CSS for glow and flash effects

const Options = ({ options, selectedOption, correctAnswer, onOptionChange, isSelectable, answerChecked, showHint }) => {
    // Define handleOptionClick as a function within the functional component
    const handleOptionClick = (value) => {
        if (isSelectable) {
            onOptionChange({
                target: { value: value },
            });
        }
    };

    return (
        <div className='options-container'>
            {options.map((option, index) => {
                let backgroundColor = 'white';
                let textColor = '#333';
                let cursorStyle = isSelectable ? 'pointer' : 'default';

                if (answerChecked) {
                    if (selectedOption === option && option !== correctAnswer) {
                        backgroundColor = 'red';
                        textColor = 'white';
                    } else if (option === correctAnswer) {
                        backgroundColor = '#5ccfd1';
                        textColor = '#333';
                    }
                } else {
                    backgroundColor = selectedOption === option ? '#007bff' : 'white';
                    textColor = selectedOption === option ? 'white' : '#333';
                }

                const optionStyle = {
                    cursor: cursorStyle,
                    backgroundColor: backgroundColor,
                    color: textColor,
                    margin: '10px 0',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    pointerEvents: isSelectable ? 'auto' : 'none',
                };

                return (
                    <div key={index}
                         className="form-check"
                         onClick={() => handleOptionClick(option)}
                         style={optionStyle}>
                        <input
                            type="radio"
                            name="option"
                            value={option}
                            checked={selectedOption === option}
                            onChange={() => {}}
                            className="form-check-input"
                            style={{pointerEvents: "none"}}
                            disabled={!isSelectable}
                        />
                        <label className="form-check-label" style={{marginLeft: "8px"}}>{option}</label>
                    </div>
                );
            })}
        </div>
    );
};

export default Options;