import '../App.css';
import React, { useEffect, useState } from 'react';
import { getTopScoresFromFirestore } from '../firebase/firestoreOperations';

const Score = ({ score, totalQuestions, onNextQuestion, questionBank, userAnswers }) => {
    const [topScores, setTopScores] = useState([]);

    useEffect(() => {
        const fetchScores = async () => {
            const scores = await getTopScoresFromFirestore();
            setTopScores(scores);
        };

        fetchScores();
    }, []);

    const getAnswerStyle = (option, isSelected, isCorrect) => {
        if (isSelected && isCorrect) {
            return { color: 'green' };
        } else if (isSelected && !isCorrect) {
            return { color: 'red' };
        } else if (!isSelected && isCorrect) {
            return { textDecoration: 'underline' };
        } else {
            return {};
        }
    };

    return (
        <div className="score-section">
            <h2 className="center-text">Elért eredmény</h2>
			<p className="center-score">{score} pontot szereztél {totalQuestions}-ből</p>
            {questionBank.map((question, index) => {
                const isHamis = question.type === 'hamis';
                const isSpecial = question.type === 'special'; // Retain handling for 'special' type questions
                const userAnswer = userAnswers[index];
                const defaultOptions = question.options.map((option, optionIndex) => {
                    const isSelected = option === userAnswer;
                    const isCorrect = option === question.answer;
                    const style = getAnswerStyle(option, isSelected, isCorrect);

                    return (
                        <li key={optionIndex} style={style}>
                            {option}
                            {isSelected ? " | Kiválasztott" : ""}
                            {isCorrect ? " | Helyes válasz" : ""}
                        </li>
                    );
                });

                let specialOptions = null;
                if (isSpecial && question.specialoptions) {
                    specialOptions = (
                        <>
                            <h5>Speciális válaszok:</h5>
                            <ul>
                                {question.specialoptions.map((option, optionIndex) => {
                                    const isSelected = option === userAnswer;
                                    const isCorrect = option === question.answer;
                                    const style = getAnswerStyle(option, isSelected, isCorrect);

                                    return (
                                        <li key={`special-${optionIndex}`} style={style}>
                                            {option}
                                            {isSelected ? " | Kiválasztott" : ""}
                                            {isCorrect ? " | Helyes válasz" : ""}
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    );
                }

                return (
                    <div key={index} className="question-summary">
                        <h4>{index + 1}. kérdés: {question.question}</h4>
                        {isHamis && <h5 style={{color: 'red'}}>Melyik állítás helytelen a következők közül?</h5>}
                        {isSpecial && specialOptions}
                        <h5>Válaszok:</h5>
                        <ul>{defaultOptions}</ul>
                    </div>
                );
            })}
            <h3 className="center-text">Ranglista</h3>
            <table className="top-scores-table">
                <thead>
                    <tr>
                        <th>Helyezés</th>
                        <th>Név</th>
                        <th>Eredmény</th>
                        <th>Dátum</th>
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
                <button onClick={onNextQuestion} className="button-modern">Quiz újrakezdése</button>
            </div>
        </div>
    );
};

export default Score;
