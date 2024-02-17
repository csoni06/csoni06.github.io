// App.js

import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Question from "./components/Question";
import qBank from "./components/QuestionBank";
import Score from "./components/Score";
import "./App.css";
import { addScoreToFirestore } from "./firebase/firestoreOperations";

const MAX_QUESTIONS = 5; // Limit the number of questions displayed

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
			userName: '',
			quizStarted: false,
        };
    }
	
	handleUserNameChange = (event) => {
		this.setState({ userName: event.target.value });
	};

    componentDidMount() {
        this.setState({ questionBank: this.shuffleArray([...qBank]).slice(0, MAX_QUESTIONS) });
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
			questionBank: this.shuffleArray([...qBank]).slice(0, MAX_QUESTIONS),
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
        const { questionBank, currentQuestion, selectedOption, scoredQuestions} = this.state;
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
                //answerChecked: true,
                selectionLocked: true,
				answerChecked: !prevState.answerChecked
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
		const { currentQuestion, questionBank, selectedOption, scoredQuestions, userAnswers, score, userName } = this.state;
		const isCorrect = selectedOption === questionBank[currentQuestion].answer;
		
		// Update userAnswers with the current selection
		let updatedUserAnswers = [...userAnswers];
		if (updatedUserAnswers.length <= currentQuestion) {
			updatedUserAnswers.push(selectedOption);
		} else {
			updatedUserAnswers[currentQuestion] = selectedOption;
		}

		// Check if the current question is the last one
		const isLastQuestion = currentQuestion + 1 >= questionBank.length;

		// Only update score if the question hasn't been scored yet
		if (isCorrect && !scoredQuestions.has(currentQuestion)) {
			this.setState(prevState => ({
				score: prevState.score + 1,
				scoredQuestions: new Set(prevState.scoredQuestions).add(currentQuestion),
			}));
		}

		if (isLastQuestion) {
			// If it's the last question, update the Firestore database
			const updateScoreboardAndEndQuiz = async () => {
				await addScoreToFirestore(userName || "Anonymous", score + (isCorrect ? 1 : 0), new Date());
				this.setState({
					quizEnd: true,
					userAnswers: updatedUserAnswers,
					answerChecked: false,
					selectionLocked: false, // Ensure selections are unlocked for the next question
					// No need to navigate to the next question since the quiz is ending
				});
			};
			updateScoreboardAndEndQuiz();
		} else {
			// If it's not the last question, proceed as usual
			this.setState(prevState => ({
				currentQuestion: prevState.currentQuestion + 1,
				selectedOption: "",
				showFeedback: false,
				lastAnswerCorrect: false,
				userAnswers: updatedUserAnswers,
				answerChecked: false,
				selectionLocked: false,
			}));
		}
	};

    render() {
		const { questionBank, currentQuestion, selectedOption, score, quizEnd, showFeedback, correctAnswer, quizStarted } = this.state;

		// If questionBank is not yet loaded, show a loading message or spinner
		if (questionBank.length === 0) {
			return <div>Loading...</div>;
		}
		
		if (!quizStarted) {
			const isNameTooLong = this.state.userName.length > 32; // Check if name is more than 32 characters

			return (
				<div className="App d-flex flex-column align-items-center justify-content-center">
					<h1 className="app-title">Add meg a neved</h1>
					<input
						type="text"
						placeholder="Pl: Zsófika"
						value={this.state.userName}
						onChange={this.handleUserNameChange}
						className="text-input"
						maxLength="32" // This ensures the input itself also restricts to 32 chars
					/>
					<button 
						className="btn btn-primary" 
						onClick={() => this.setState({ quizStarted: true })}
						disabled={isNameTooLong} // Disable button if name is too long
					>
						Quiz indítása
					</button>
				</div>
			);
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
							questionNumber={currentQuestion + 1} // Calculate questionNumber here
							answerChecked={this.state.answerChecked}
						/>
						<div className="mt-2">
							<button 
								className="btn btn-info mr-2" 
								onClick={this.checkAnswer} 
								disabled={!selectedOption || this.state.selectionLocked}
							>
								Válasz ellenőrzése
							</button>
							<button 
								className="btn btn-primary" 
								onClick={this.goToNextQuestion}
								disabled={!selectedOption}
							>
								Következő kérdés
							</button>
						</div>
						{showFeedback && (
							<div className="feedback">
								{this.state.lastAnswerCorrect ? (
									<p className="text-success">Helyes válasz!</p>
								) : (
									<p className="text-danger">Nem jó válasz. A helyes válasz: {correctAnswer}</p>
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

