// Option.js

import React, { Component } from 'react';
import './Options.css'; // Adjust the path based on your file structure

class Options extends Component {
    handleOptionClick = (value) => {
        this.props.onOptionChange({
            target: { value: value },
        });
    };

    render() {
        const { options, selectedOption, correctAnswer, showHint } = this.props;

        return (
            <div className='options-container'>
                {options.map((option, index) => (
                    <div key={index} 
                         className="form-check" 
                         onClick={() => this.handleOptionClick(option)} 
                         style={{ 
                            cursor: 'pointer', 
                            backgroundColor: selectedOption === option ? '#5ccfd1' : 'white', // Change background color if selected
                            margin: '10px 0',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                         }}>
                        <input
                            type="radio"
                            name="option"
                            value={option}
                            checked={selectedOption === option}
                            onChange={() => {}} // This is to avoid React controlled component warning
                            className="form-check-input"
                            style={{pointerEvents: "none"}} // Prevent direct interaction with the radio button
                        />
                        <label className="form-check-label" style={{marginLeft: "8px", color: selectedOption === option ? 'white' : '#333'}}>{option}</label>
                    </div>
                ))}
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
