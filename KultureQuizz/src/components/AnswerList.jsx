import Button from './Button'

function AnswerList({ answers, selectedAnswer, onSelectAnswer }) {
  return (
    <div className="answers">
      {answers.map((answer) => (
        <Button
          key={answer.id}
          onClick={() => onSelectAnswer(answer.id)}
          className={selectedAnswer === answer.id ? 'selected' : ''}
        >
          {answer.text}
        </Button>
      ))}
    </div>
  )
}

export default AnswerList 