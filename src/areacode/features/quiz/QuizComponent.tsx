import quiz from 'areacode/assets/css/quiz.module.scss'
import { MAChoiceMAQuestion } from 'areacode/models/MAQuestion'

import QuestionArg from './MAAreaCodeQuizComponent'
import { MACompInfo } from 'areacode/data/MACompList'
import { MAAreaCodeInfoCard } from 'areacode/pages/list/components'
import { quizMode } from './QuizService'
import { useState } from 'react'
import { Digit4NumInputCityQuestion } from 'areacode/models/Digit4NumQuestion'
import { QuizController, QuizState } from './QuizController'

export function QuizComponent({
  questions,
  displayParam,
}: {
  questions: (MAChoiceMAQuestion | Digit4NumInputCityQuestion)[]
  displayParam: string[]
}) {
  const [inputValue, setInputValue] = useState('')
  const [controller] = useState(() => new QuizController(questions))
  const [state, setState] = useState(controller.getState())

  const handleStateChange = () => setState({ ...controller.getState() })

  const ctx = {
    controller,
    state,
    inputValue,
    setInputValue,
    handleStateChange,
    displayParam,
    questions,
  } as const

  return (
    <>
      {!state.isFinished ? (
        <QuestionComponent question={controller.currentQuestion()} ctx={ctx} />
      ) : (
        <ResultComponent ctx={ctx} />
      )}
    </>
  )
}

type QuizCtx = {
  controller: QuizController
  state: QuizState
  inputValue: string
  setInputValue: (v: string) => void
  handleStateChange: () => void
  displayParam: string[]
  questions: (MAChoiceMAQuestion | Digit4NumInputCityQuestion)[]
}

function QuestionComponent({
  question,
  ctx,
}: {
  question: MAChoiceMAQuestion | Digit4NumInputCityQuestion
  ctx: QuizCtx
}): JSX.Element {
  const { state, controller, handleStateChange, questions } = ctx
  const subject =
    question instanceof Digit4NumInputCityQuestion
      ? question.areacode
      : question.subject

  return (
    <div className={quiz.question}>
      <div>
        {!state.isFinished &&
          `${state.currentQuestionIndex + 1} 問目 / 全 ${questions.length} 問`}
      </div>
      <QuestionArg arg={subject} />
      <div className={quiz.answers}>
        <QuestionInteractionComponent question={question} ctx={ctx} />
      </div>
      {state.showNext && (
        <>
          {state.isCorrect != null && (
            <div className="feedback">
              {state.isCorrect ? '正解！' : '不正解…'}
            </div>
          )}
          <button
            onClick={() => {
              controller.nextQuestion()
              handleStateChange()
            }}
          >
            次へ
          </button>
        </>
      )}
    </div>
  )
}

function QuestionInteractionComponent({
  question,
  ctx,
}: {
  question: MAChoiceMAQuestion | Digit4NumInputCityQuestion
  ctx: QuizCtx
}): JSX.Element {
  const {
    state,
    controller,
    inputValue,
    setInputValue,
    handleStateChange,
    displayParam,
  } = ctx
  const isResult = state.isFinished || state.showNext
  const currentQuestionIndex = state.currentQuestionIndex
  const correctInputs = state.correctInputs
  const isFinished = state.isFinished

  function renderMAChoices(
    question: MAChoiceMAQuestion,
    isResult: boolean = false,
  ): JSX.Element[] {
    const { choices, correctAnswerIndex } = question

    if (choices === undefined || correctAnswerIndex === undefined)
      throw Error('answers are undefined')

    const onClickAnswer = (index: number) => {
      controller.checkChoiceAnswer(index + 1)
      handleStateChange()
    }

    return choices.map((choiceMAComp: MACompInfo, i: number) => {
      const answerBtnCorrectClassName =
        isResult && i + 1 === correctAnswerIndex ? quiz.correct : ''
      const answerBtnIncorrectClassName =
        isResult &&
        question.userInput !== correctAnswerIndex &&
        i + 1 === question.userInput
          ? quiz.incorrect
          : ''

      return (
        <div key={i} className={quiz.answerBtnContainer}>
          <button
            type="button"
            disabled={isResult}
            className={`${quiz.answerBtn} ${answerBtnCorrectClassName}${answerBtnIncorrectClassName}`}
            onClick={() => onClickAnswer(i)}
          >
            <MAAreaCodeInfoCard
              MAComp={choiceMAComp}
              displayParam={displayParam}
              isQuiz={true}
            />
          </button>
        </div>
      )
    })
  }

  function renderCityInput(
    question: Digit4NumInputCityQuestion,
    isResult: boolean = false,
  ): JSX.Element {
    const onClickAnswer = () => {
      controller.checkInputAnswer(inputValue)
      setInputValue('')
      handleStateChange()
    }

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter') return
      e.preventDefault()
      onClickAnswer()
    }

    const limitedCitiesOption = {
      cities: correctInputs[currentQuestionIndex],
      isDisplayElse: isResult,
    }

    return (
      <div className={quiz.answerBtnContainer}>
        {!isFinished && (
          <div>
            <div className="{areacode.searchCityTextContainer}">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleInputKeyDown}
                disabled={isResult}
              />
            </div>
            <div>
              <button
                type="button"
                disabled={isResult}
                className={`${quiz.answerBtn}`}
                onClick={() => onClickAnswer()}
              >
                回答
              </button>
              <button
                type="button"
                disabled={isResult}
                className={`${quiz.answerBtn}`}
                onClick={() => {
                  controller.decideIsCorrectForInputAnswer()
                  handleStateChange()
                }}
              >
                答えを見る
              </button>
            </div>
          </div>
        )}
        {question.subject.map((comp, i) => {
          return (
            <MAAreaCodeInfoCard
              MAComp={comp}
              key={i}
              displayParam={displayParam}
              isQuiz={true}
              limitedCitiesOption={limitedCitiesOption}
            />
          )
        })}
      </div>
    )
  }

  return (
    <>
      {question instanceof MAChoiceMAQuestion &&
        renderMAChoices(question, isResult)}
      {question instanceof Digit4NumInputCityQuestion &&
        renderCityInput(question, isResult)}
    </>
  )
}

function ResultComponent({ ctx }: { ctx: QuizCtx }): JSX.Element {
  const { questions, state } = ctx
  return (
    <div className={quiz.resultContainer}>
      <h2>結果発表</h2>
      <div className={quiz.resultNumber}>
        {questions.length} 問中 {state.correctList.length} 問正解
      </div>
      <div>
        <button onClick={() => window.location.reload()}>もう一度遊ぶ</button>
      </div>
      {questions.map((question, i) => {
        return (
          <div key={i}>
            <QuestionComponent question={question} ctx={ctx} />
          </div>
        )
      })}
    </div>
  )
}
