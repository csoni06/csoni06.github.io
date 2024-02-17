// Option.js

import React, { Component } from 'react';
import './Options.css'; // Ensure you have the corresponding CSS for glow and flash effects

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
                {options.map((option, index) => {
                    let backgroundColor = 'white';
                    let textColor = '#333';
                    let className = "form-check";

                    if (this.props.answerChecked) {
                        if (selectedOption === option && option !== correctAnswer) {
                            backgroundColor = 'red';
                            textColor = 'white';
                        } else if (option === correctAnswer) {
                            backgroundColor = '#5ccfd1';
                            textColor = '#333';
                            className += selectedOption !== correctAnswer ? ' glow-effect' : '';
                        }
                    } else {
                        backgroundColor = selectedOption === option ? '#007bff' : 'white';
                        textColor = selectedOption === option ? 'white' : '#333';
                    }

                    return (
                        <div key={index} 
                            className={className}
                            onClick={() => this.handleOptionClick(option)} 
                            style={{ 
                                cursor: 'pointer', 
                                backgroundColor: backgroundColor, 
                                color: textColor,
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
                                onChange={() => {}} // To avoid React controlled component warning
                                className="form-check-input"
                                style={{pointerEvents: "none"}} // Prevent direct interaction with the radio button
                            />
                            <label className="form-check-label" style={{marginLeft: "8px"}}>{option}</label>
                        </div>
                    );
                })}
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
