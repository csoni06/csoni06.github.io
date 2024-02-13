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
        // Initialize state with an empty questionBank; it will be populated in componentDidMount
        this.state = {
            questionBank: [],
            currentQuestion: 0,
            selectedOption: "",
            userAnswers: [],
            score: 0,
            quizEnd: false,
            lastAnswerCorrect: false,
            correctAnswer: "",
            showFeedback: false,
            answerChecked: false,
            scoredQuestions: new Set(),
            selectionLocked: false,
        };
    }

    componentDidMount() {
        // Shuffle question bank when component mounts
        this.setState({ questionBank: this.shuffleArray([...qBank]) });
    }
    
    shuffleArray(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    restartQuiz = () => {
        this.setState({
            questionBank: this.shuffleArray([...qBank]),
            currentQuestion: 0,
            selectedOption: "",
            userAnswers: [],
            score: 0,
            quizEnd: false,
            showFeedback: false,
            lastAnswerCorrect: false,
            correctAnswer: "",
            answerChecked: false,
            scoredQuestions: new Set(),
            selectionLocked: false,
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
                answerChecked: true,
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

    goToNextQuestion = () => {
		const { currentQuestion, questionBank, selectedOption, scoredQuestions, userAnswers } = this.state;
		const isCorrect = selectedOption === questionBank[currentQuestion].answer;

		// Only update score if the question hasn't been scored yet
		if (isCorrect && !scoredQuestions.has(currentQuestion)) {
			this.setState(prevState => ({
				score: prevState.score + 1,
				scoredQuestions: new Set(prevState.scoredQuestions).add(currentQuestion),
			}));
		}

		// Update userAnswers with the current selection
		let updatedUserAnswers = [...userAnswers];
		if (updatedUserAnswers.length <= currentQuestion) {
			updatedUserAnswers.push(selectedOption);
		} else {
			updatedUserAnswers[currentQuestion] = selectedOption;
		}

		// Move to the next question
		this.setState(prevState => ({
			currentQuestion: prevState.currentQuestion + 1 < questionBank.length ? prevState.currentQuestion + 1 : prevState.currentQuestion,
			selectedOption: "",
			showFeedback: false,
			lastAnswerCorrect: false,
			userAnswers: updatedUserAnswers,
			quizEnd: prevState.currentQuestion + 1 >= questionBank.length,
			answerChecked: false,
			selectionLocked: false, // Ensure selections are unlocked for the next question
		}));
	};

    render() {
		const { questionBank, currentQuestion, selectedOption, score, quizEnd, showFeedback, correctAnswer } = this.state;

		// If questionBank is not yet loaded, show a loading message or spinner
		if (questionBank.length === 0) {
			return <div>Loading...</div>;
		}

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
								disabled={!selectedOption || this.state.selectionLocked}
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

