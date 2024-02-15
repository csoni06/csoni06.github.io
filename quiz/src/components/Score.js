// Score.js

//import React from 'react';
import '../App.css';
import React, { useEffect, useState } from 'react';
import { addScoreToFirestore, getTopScoresFromFirestore } from '../firebase/firestoreOperations';

const Score = ({ score, totalQuestions, onNextQuestion, questionBank, userAnswers }) => {
	const [topScores, setTopScores] = useState([]);

    useEffect(() => {
        const fetchScores = async () => {
            const scores = await getTopScoresFromFirestore();
            setTopScores(scores);
        };

        fetchScores();
    }, []);
	
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
			<h3>Top Scores</h3>
			<table className="top-scores-table">
			  <thead>
				<tr>
				  <th>Rank</th>
				  <th>User Name</th>
				  <th>Score</th>
				  <th>Date</th>
				</tr>
			  </thead>
			  <tbody>
				{topScores.map((record, index) => (
				  <tr key={index}>
					<td>{index + 1}</td>
					<td>{record.userName}</td>
					<td>{record.score}</td>
					<td>{record.date}</td>
				  </tr>
				))}
			  </tbody>
			</table>
			<div className="button-container">
				<button onClick={onNextQuestion} className="button-modern">Restart Quiz</button>
			</div>
        </div>
    );
};

export default Score;
