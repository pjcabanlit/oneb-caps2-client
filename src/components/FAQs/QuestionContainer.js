import React from 'react'
const QuestionContainer = ({ id, question, answer, onClick, active }) => {
    return (
        <div className={`question_container ${active && "active"}`} onClick={() => onClick(id)} id={id}>
            <h3>{question}</h3>
            <p>{answer}</p>
        </div>

    )
}
export default QuestionContainer
