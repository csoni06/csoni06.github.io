// App.js

import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Question from "./components/Question";
import qBank from "./components/QuestionBank";
import Score from "./components/Score";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionBank: qBank,
            currentQuestion: 0,
            selectedOption: "",
            userAnswers: [], // Track user answers
            score: 0,
            quizEnd: false,
            lastAnswerCorrect: false,
            correctAnswer: "",
            showFeedback: false,
            answerChecked: false, // Added to track if "Check Answer" was used
			scoredQuestions: new Set(), // Tracks the indices of questions that have been scored
			selectionLocked: false,
        };
    }
    
    restartQuiz = () => {
		this.setState({
			currentQuestion: 0,
			selectedOption: "",
			userAnswers: [], // Reset user answers
			score: 0,
			quizEnd: false,
			showFeedback: false,
			lastAnswerCorrect: false,
			correctAnswer: "",
			answerChecked: false, // Ensure this is reset if used
			scoredQuestions: new Set(), // Crucially, reset this to allow scoring in new runs
		});
	};

    handleOptionChange = (e) => {
		if (!this.state.selectionLocked) {
			this.setState({ selectedOption: e.target.value });
		}
	};

    checkAnswer = () => {
		const { questionBank, currentQuestion, selectedOption, scoredQuestions } = this.state;
		const isCorrect = selectedOption === questionBank[currentQuestion].answer;

		if (isCorrect && !scoredQuestions.has(currentQuestion)) {
			this.setState(prevState => ({
				score: prevState.score + 1,
				userAnswers: prevState.userAnswers.map((answer, index) => 
					index === currentQuestion ? selectedOption : answer),
				scoredQuestions: new Set(prevState.scoredQuestions).add(currentQuestion),
				lastAnswerCorrect: isCorrect,
				showFeedback: true,
				correctAnswer: questionBank[currentQuestion].answer,
				answerChecked: true, // Flag to indicate answer was checked for scoring
				selectionLocked: true,
			}));
		} else {
			this.setState({
				lastAnswerCorrect: isCorrect,
				showFeedback: true,
				correctAnswer: questionBank[currentQuestion].answer,
				answerChecked: true,
				selectionLocked: true,
			});
		}
	};

	// Adjusted goToNextQuestion method
	goToNextQuestion = () => {
		const { currentQuestion, questionBank, selectedOption, scoredQuestions } = this.state;
		const isCorrect = selectedOption === questionBank[currentQuestion].answer;

		// Perform scoring logic only if the question hasn't been scored yet
		if (isCorrect && !scoredQuestions.has(currentQuestion)) {
			this.setState(prevState => ({
				score: prevState.score + 1,
				scoredQuestions: new Set(prevState.scoredQuestions).add(currentQuestion),
				// No need to update userAnswers here for the scoring logic,
				// but you should maintain it for tracking purposes.
			}));
		}

		// Proceed to update the state for moving to the next question
		this.setState(prevState => ({
			currentQuestion: prevState.currentQuestion + 1 < questionBank.length ? prevState.currentQuestion + 1 : prevState.currentQuestion,
			selectedOption: "",
			showFeedback: false,
			lastAnswerCorrect: false,
			userAnswers: prevState.userAnswers.length <= currentQuestion ? [...prevState.userAnswers, selectedOption] : prevState.userAnswers.map((answer, index) => 
				index === currentQuestion ? selectedOption : answer),
			quizEnd: prevState.currentQuestion + 1 >= questionBank.length,
			answerChecked: false, // Reset this flag in case it's used elsewhere
			selectionLocked: false, // Unlock the selection for the next question
		}));
	};
    render() {
        const { questionBank, currentQuestion, selectedOption, score, quizEnd, showFeedback, correctAnswer } = this.state;
        return (
            <div className="App d-flex flex-column align-items-center justify-content-center">
                <h1 className="app-title">QUIZ APP</h1>
                {!quizEnd ? (
                    <>
                        <Question
                            question={questionBank[currentQuestion]}
                            selectedOption={selectedOption}
                            onOptionChange={this.handleOptionChange}
                            showHint={showFeedback}
                        />
                        <div className="mt-2">
                            <button 
                                className="btn btn-info mr-2" 
                                onClick={this.checkAnswer} 
                                disabled={!selectedOption}
                            >
                                Check Answer
                            </button>
                            <button 
                                className="btn btn-primary" 
                                onClick={this.goToNextQuestion}
                                disabled={!selectedOption}
                            >
                                Next Question
                            </button>
                        </div>
                        {showFeedback && (
                            <div className="feedback">
                                {this.state.lastAnswerCorrect ? (
                                    <p className="text-success">Correct answer!</p>
                                ) : (
                                    <p className="text-danger">Incorrect. The correct answer was: {correctAnswer}</p>
                                )}
                            </div>
                        )}
                    </>
                ) : (
                    <Score
                        score={score}
                        totalQuestions={questionBank.length}
                        onNextQuestion={this.restartQuiz}
                        questionBank={questionBank}
                        userAnswers={this.state.userAnswers}
                    />
                )}
            </div>
        );
    }
}

export default App;
