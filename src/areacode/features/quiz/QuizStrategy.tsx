import React from 'react'
import { useState } from 'react'
import { Question } from 'areacode/models/Question'

export type QuizState = {
  currentQuestionIndex: number
  isFinished: boolean
  isCorrect: boolean | null
  showNext: boolean
  correctList: number[]
}

export function QuizStrategy(questions: Question[]) {
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    isFinished: false,
    isCorrect: null,
    showNext: false,
    correctList: [],
  })

  function currentQuestion() {
    return questions[state.currentQuestionIndex]
  }

  function nextQuestion(): void {
    if (state.currentQuestionIndex + 1 === questions.length) {
      setState({
        ...state,
        showNext: false,
        isFinished: true,
      })
    } else {
      setState({
        ...state,
        isCorrect: null,
        showNext: false,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      })
    }
  }

  function checkAnswer(selectedIndex: number) {
    const isCorrect = selectedIndex === currentQuestion().correctAnswerIndex
    currentQuestion().userInput = selectedIndex

    const updatedCorrectList = isCorrect
      ? [...state.correctList, state.currentQuestionIndex]
      : [...state.correctList]

    setState({
      ...state,
      isCorrect,
      showNext: true,
      correctList: updatedCorrectList,
    })
  }

  return {
    state,
    currentQuestion,
    checkAnswer,
    nextQuestion,
  }
}
