function AnswerList({ answers, selectedAnswer, onSelectAnswer, correctAnswer, answerStatus }) {
  return (
    <div className="answers">
      {answers.map((answer) => {
        let btnClass = 'answer-btn'
        if (selectedAnswer === answer.text && answerStatus === 'correct') btnClass += ' correct'
        else if (selectedAnswer === answer.text && answerStatus === 'incorrect') btnClass += ' incorrect'
        else if (selectedAnswer === answer.text) btnClass += ' selected'
        else if (answerStatus && correctAnswer === answer.text) btnClass += ' correct'
        return (
          <button
            key={answer.id}
            onClick={() => onSelectAnswer(answer.text)}
            className={btnClass}
            disabled={!!answerStatus}
          >
            {answer.text}
          </button>
        )
      })}
    </div>
  )
}

export default AnswerList 