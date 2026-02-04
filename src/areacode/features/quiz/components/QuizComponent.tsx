import { MAChoiceMAQuestion } from 'areacode/models/MAQuestion'
import { useState } from 'react'
import { InputCityQuestion } from 'areacode/models/Digit4NumQuestion'
import { QuizController } from '../QuizController'
import { QuestionComponent } from './QuestionComponent'
import { ResultComponent } from './ResultComponent'
import { QuizCtx } from '../quizTypes'

export function QuizComponent({
  questions,
  displayParam,
}: {
  questions: (MAChoiceMAQuestion | InputCityQuestion)[]
  displayParam: string[]
}) {
  const [inputValue, setInputValue] = useState('')
  const [controller] = useState(() => new QuizController(questions))
  const [state, setState] = useState(controller.getState())

  const handleStateChange = () => setState({ ...controller.getState() })

  const ctx: QuizCtx = {
    controller,
    state,
    inputValue,
    setInputValue,
    handleStateChange,
    displayParam,
    questions,
  }

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
