import React from 'react'
import { Header } from 'areacode/components'
import { ScrollTop } from 'utils/tools'
import QuizService from './QuizService'

function displayQuiz() {
  return (
    <div>
      <ScrollTop />
      <Header />
      <div className="main-content">
        <QuizService />
      </div>
    </div>
  )
}

export default displayQuiz
