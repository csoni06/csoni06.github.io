// Score.js

import React from 'react';
import '../App.css';

const Score = ({ score, totalQuestions, onNextQuestion, questionBank, userAnswers }) => {
    return (
        <div className="score-section">
            <h2>Your Score</h2>
            <p>You scored {score} out of {totalQuestions}</p>
            {questionBank.map((question, index) => (
                <div key={index} className="question-summary">
                    <h4>Question {index + 1}: {question.question}</h4>
                    <ul>
                        {question.options.map((option, optionIndex) => {
                            // Determine if this option was the user's selection
                            let isSelected = option === userAnswers[index];
                            // Determine if this option is the correct answer
                            let isCorrect = option === question.answer;
                            let style = {};

                            if (isSelected && isCorrect) {
                                style = { color: 'green' }; // Correctly selected
                            } else if (isSelected && !isCorrect) {
                                style = { color: 'red' }; // Incorrectly selected
                            } else if (!isSelected && isCorrect) {
                                style = { textDecoration: 'underline' }; // Correct answer but not selected
                            }

                            return (
                                <li key={optionIndex} style={style}>
                                    {option}
                                    {isSelected ? " | Selected" : ""}
                                    {isCorrect ? " | Correct" : ""}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
            <button onClick={onNextQuestion}>Restart Quiz</button>
        </div>
    );
};

export default Score;
