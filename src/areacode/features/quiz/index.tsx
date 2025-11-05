import React from 'react'
import { Header } from 'areacode/components'
import { ScrollTop } from 'utils/tools'
import Quiz from './Quiz'

function displayQuiz() {
  const quizMode = 'areacodeToMAName'

  return (
    <div>
      <ScrollTop />
      <Header />
      <div className="main-content">
        <Quiz />
      </div>
    </div>
  )
}

export default displayQuiz
