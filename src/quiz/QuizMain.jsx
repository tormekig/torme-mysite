import { useState, useEffect } from "react";
import { useCallback } from "react";
import './styles.css';

function Main({questions}) {
  const [incorrectAnswer, setIncorrectAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showNextQuestionButton, setShowNextQuestionButton] = useState(false);

  const [endQuiz, setEndQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [buttons, setButtons] = useState({});
  const [correct, setCorrect] = useState([]);
  const [incorrect, setIncorrect] = useState([]);
  const [userInput, setUserInput] = useState([]);

  const [activeQuestion, setActiveQuestion] = useState(questions[currentQuestionIndex]);

  useEffect(() => {
    setActiveQuestion(questions[currentQuestionIndex]);
  }, [currentQuestionIndex]);

  const nextQuestion = (currentQuestionIndex) => {
    setIncorrectAnswer(false);
    setIsCorrect(false);
    setShowNextQuestionButton(false);
    setButtons({});

    if (currentQuestionIndex + 1 === questions.length) {
      setEndQuiz(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }

  const checkAnswer = (index, correctAnswer) => {
    const indexStr = `${index}`;
    const disabledAll = {
      0: { disabled: true },
      1: { disabled: true },
      2: { disabled: true },
      3: { disabled: true },
    };
    const userInputCopy = [...userInput];
  
    if (userInputCopy[currentQuestionIndex] === undefined) {
      userInputCopy[currentQuestionIndex] = index;
    }
  
    if (indexStr === correctAnswer) {
      correct.push(currentQuestionIndex);
  
      setButtons((prevState) => ({
        ...prevState,
        ...disabledAll,
        [index - 1]: {
          className: 'correct'
        },
      }));
  
      setIsCorrect(true);
      setIncorrectAnswer(false);
      setCorrect(correct);
      setShowNextQuestionButton(true);
    } else {
      incorrect.push(currentQuestionIndex);

      setButtons((prevState) => ({
        ...prevState,
        ...disabledAll,
        [index - 1]: {
          className: 'incorrect'
        },
        [parseInt(correctAnswer)-1]: {
          className: 'correct'
        }
      }))

      setIsCorrect(false);
      setIncorrectAnswer(true);
      setIncorrect(incorrect);
      setShowNextQuestionButton(true);
    }
    setUserInput(userInputCopy);
  }

  const renderAnswerInResult = (question, userInputIndex) => {
    const { answers, correctAnswer } = question;
    return answers.map((answer, i) => {
      let answerBtnCorrectClassName = (`${i + 1}` === correctAnswer ? 'correct' : '');
      let answerBtnIncorrectClassName = (`${userInputIndex}` !== correctAnswer && `${i + 1}` === `${userInputIndex}` ? 'incorrect' : '');
      return (
        <div key={i}>
          <button
            type="button"
            disabled
            className={`answerBtn btn ${answerBtnCorrectClassName}${answerBtnIncorrectClassName}`}
          >
            {answer}
          </button>
        </div>
      )
    })
  }

  const renderQuizResultQuestions = useCallback(() => {
    return questions.map((question, i) => {
      return (
        <div className="result-answer-container" key={i}>
          <h3>Q{question.questionIndex}: {question.question}</h3>
          <div className="result-answer">
            {renderAnswerInResult(question, userInput[i])}
          </div>
        </div>
      )
    })
  })

  const renderAnswers = (question, answerButtons) => {
    const {
      answers, correctAnswer
    } = question;
    const onClickAnswer = (index) => {
      checkAnswer(index + 1, correctAnswer)
    }
    return answers.map((answer, i) => (
      <div key={i}>
        {(answerButtons[i] !== undefined)
          ? (
            <button
              type="button"
              disabled={answerButtons[i].disabled || false}
              className={`${answerButtons[i].className} answerBtn btn`}
              onClick={() => (onClickAnswer(i))}
            >
              {answer}
            </button>
          ) : (
            <button
              type="button"
              className={`answerBtn btn`}
              onClick={() => (onClickAnswer(i))}
            >
              {answer}
            </button>
          )
        }
      </div>
    ))
  }

  function InstantFeedback({incorrectAnswer, correctAnswer, question}) {
    return (
        <>
        {incorrectAnswer && (
            <div className="feedback">incorrect {question.messageForIncorrectAnswer}</div>
        )}
        {correctAnswer && (
            <div className="feedback">correct {question.messageForCorrectAnswer}</div>
        )}
        </>
    )
  }

  const renderResult = () => (
    <div>
      result
      <div>{correct.length}</div>
      <div>{questions.length}</div>
      {renderQuizResultQuestions()}
    </div>
  )
  
  return (
    <div className="question-container">
      {!endQuiz && (
        <div className="question">
          <InstantFeedback 
            question={activeQuestion}
            correctAnswer={isCorrect}
            incorrectAnswer={incorrectAnswer}
          />
          <div>
            {`${(currentQuestionIndex + 1)} / ${questions.length}:`}
          </div>
          {activeQuestion && (
            <h3>{activeQuestion.question}</h3>
          )}
          {activeQuestion && renderAnswers(activeQuestion, buttons)}
          {showNextQuestionButton && (
            <button onClick={() => nextQuestion(currentQuestionIndex)} className="nextQuestionBtn">
              next
            </button>
          )}
        </div>
      )}
      {endQuiz && renderResult()}
    </div>
  )
}

export default Main;