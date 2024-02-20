// Question.js

import React, { Component } from "react";
import Options from "./Option"; // Ensure this is correct based on your file naming

class Question extends Component {
    render() {
        const { question, selectedOption, onOptionChange, questionNumber, answerChecked } = this.props;
        const isSpecialType = question.type === "special";
        const isHamisType = question.type === "hamis"; // Check if question type is 'hamis'

        return (
            <div>
                <h3 className="center-text">{questionNumber}. kérdés</h3>
                <h5 className="margin-lr-20">{question.question}</h5>
                {isHamisType && <div className="margin-lr-20">Melyik állítás helytelen a következők közül?</div>}
                <form className="mt-2 mb-2">
                    {isSpecialType && (
                        // Render default options as non-selectable
                        <Options
                            options={question.options}
                            selectedOption={""} // Pass an empty string to ensure no option is selectable
                            onOptionChange={() => {}} // Override with an empty function
                            isSelectable={false} // New prop to manage option selectability
                        />
                    )}
                    {/* Render special options or default options as selectable */}
                    <Options
                        options={isSpecialType ? question.specialoptions : question.options}
                        selectedOption={selectedOption}
                        onOptionChange={onOptionChange}
                        isSelectable={true} // Ensure these options are selectable
                        correctAnswer={question.answer} // Ensure to pass correctAnswer appropriately
                        showHint={this.props.showHint}
                        answerChecked={answerChecked}
                    />
                </form>
            </div>
        );
    }
}

export default Question;
