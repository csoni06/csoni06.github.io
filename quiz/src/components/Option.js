// Option.js

import React, { Component } from 'react';

class Options extends Component {
    // Helper function to handle option clicks
    handleOptionClick = (value) => {
        // Programmatically trigger the onChange handler
        this.props.onOptionChange({
            target: { value: value },
        });
    };

    render() {
        const { options, selectedOption, correctAnswer, showHint } = this.props;

        return (
            <div className='options'>
                {options.map((option, index) => (
                    <div key={index} className="form-check" onClick={() => this.handleOptionClick(option)} style={{ cursor: 'pointer' }}>
                        <input
                            type="radio"
                            name="option"
                            value={option}
                            checked={selectedOption === option}
                            onChange={() => {}} // Keep this to avoid React controlled component warning
                            className="form-check-input"
                            style={{pointerEvents: "none"}} // Prevent direct interaction with the radio button
                        />
                        <label className="form-check-label" style={{marginLeft: "8px"}}>{option}</label>
                    </div>
                ))}
                {/* Conditionally rendering the correct answer hint based on showHint */}
                {showHint && (
                    <div className="correct-answer-hint">
                        <strong>Hint: </strong>The correct answer is {correctAnswer}.
                    </div>
                )}
            </div>
        );
    }
}

export default Options;
