interface Question<S, C> {
  subject: S
  questionIndex?: number
  setQuestionIndex(index: number): Question<S, C>
}

export interface ChoiceQuestion<S,C> extends Question<S,C> {
  choices?: C[]
  correctAnswerIndex?: number
  userInput?: number
  generate(numOfDigit: string, numOfChoices: number): Question<S,C>
}

export interface InputQuestion<S,C> extends Question<S,C> {
  userInput?: string[]
}

export type { Question }
