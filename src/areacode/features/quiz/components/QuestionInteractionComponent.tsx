import React from 'react'
import quiz from 'areacode/assets/css/quiz.module.scss'
import { MAChoiceMAQuestion } from 'areacode/models/MAQuestion'
import { InputCityQuestion } from 'areacode/models/Digit4NumQuestion'
import { MACompInfo } from 'areacode/data/MACompList'
import { MAAreaCodeInfoCard } from 'areacode/pages/list/components'
import { QuizCtx } from '../quizTypes'

export function QuestionInteractionComponent({
  question,
  ctx,
}: {
  question: MAChoiceMAQuestion | InputCityQuestion
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
  const isFinished = state.isFinished

  function renderCityInput(
    question: InputCityQuestion,
    isResult: boolean = false,
  ): JSX.Element {
    const onClickAnswer = () => {
      question.checkInputAnswer(inputValue)
      setInputValue('')
      handleStateChange()
    }

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter') return
      e.preventDefault()
      onClickAnswer()
    }

    const limitedCitiesOption = {
      cities: question.userInputCities,
      isDisplayElse: isResult,
    }

    console.log(question.answerCities)

    return (
      <div className={quiz.answerBtnContainer}>
        {!isFinished && (
          <div>
            <div className={quiz.textInputContainer}>
              <div className={quiz.searchCityTextContainer}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  disabled={isResult}
                />
              </div>
              <button
                style={{ fontSize: '20px', width: '5rem' }}
                type="button"
                disabled={isResult}
                className={`${quiz.button}`}
                onClick={() => onClickAnswer()}
              >
                回答
              </button>
            </div>
            <div>
              回答自治体数：{question.userInputCities.length}/
              {question.getCityCount()}
            </div>
          </div>
        )}
        {question.MAs.map((comp, i) => {
          return (
            <MAAreaCodeInfoCard
              MAComp={comp}
              key={i}
              displayParam={displayParam}
              cityOptions={{
                isQuiz: true,
                limitedCitiesOption: limitedCitiesOption,
              }}
            />
          )
        })}
        {!isFinished && (
          <button
            type="button"
            disabled={isResult}
            className={`${quiz.button}`}
            onClick={() => {
              controller.decideIsCorrectForInputAnswer()
              handleStateChange()
            }}
          >
            答えを見る
          </button>
        )}
      </div>
    )
  }
  function renderMAChoices(
    q: MAChoiceMAQuestion,
    isResult: boolean = false,
  ): JSX.Element[] {
    const choices = q.getMAChoices()
    const correctAnswerIndex = q.correctAnswerIndex

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
        isResult && q.userInput !== correctAnswerIndex && i + 1 === q.userInput
          ? quiz.incorrect
          : ''

      return (
        <div key={i} className={quiz.answerBtnContainer}>
          <button
            type="button"
            disabled={isResult}
            className={`${quiz.button} ${answerBtnCorrectClassName}${answerBtnIncorrectClassName}`}
            onClick={() => onClickAnswer(i)}
          >
            <MAAreaCodeInfoCard
              MAComp={choiceMAComp}
              displayParam={displayParam}
              cityOptions={{
                isQuiz: true,
              }}
            />
          </button>
        </div>
      )
    })
  }

  return (
    <>
      {question instanceof MAChoiceMAQuestion &&
        renderMAChoices(question, isResult)}
      {question instanceof InputCityQuestion &&
        renderCityInput(question, isResult)}
    </>
  )
}
