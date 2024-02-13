// Question.js

import React, { Component } from "react";
import Options from "./Option"; // Ensure this is correct based on your file naming

class Question extends Component {
    render() {
        const { question, selectedOption, onOptionChange, onSubmit, questionNumber } = this.props;

        return (
            <div>
                <h3>Question {questionNumber}</h3>
                <h5 className="mt-2">{question.question}</h5>
                <form onSubmit={onSubmit} className="mt-2 mb-2">
                    <Options
                        options={question.options}
                        selectedOption={selectedOption}
                        correctAnswer={question.answer} // Passing the correct answer to the Options component
                        onOptionChange={onOptionChange}
						showHint={this.props.showHint}
                    />
                </form>
            </div>
        );
    }
}

export default Question;
