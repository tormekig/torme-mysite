import { MACompInfo } from 'areacode/data/MACompList'
import { MACompListContent } from 'areacode/pages/list/MACompListContent'
import { shuffleArray } from 'utils/tools'
import { ChoiceQuestion } from './Question'

export class MAChoiceMAQuestion implements ChoiceQuestion<MACompInfo, MACompInfo> {
  CORRECT_ANSWER = '1'

  subject: MACompInfo
  choices?: MACompInfo[]
  questionIndex?: number
  correctAnswerIndex?: number
  userInput?: number

  constructor(subject: MACompInfo) {
    this.subject = subject
  }

  setQuestionIndex(index: number) {
    this.questionIndex = index
    return this
  }

  generate(numOfDigit: string, numOfChoices: number) {
    const MAChoices = this.generateMAChoices(
      this.subject,
      parseInt(numOfDigit),
      numOfChoices,
    )

    this.choices = [this.subject, ...MAChoices.slice(0, numOfChoices - 1)]
    return this
  }

  private generateMAChoices(
    answerMAComp: MACompInfo,
    numOfDigit: number = 0,
    numOfChoices: number,
  ) {
    let codeFilteredMAs = new MACompListContent().filter('all', '').MAComps

    for (let i = numOfDigit; i >= 0; i--) {
      if (i === 0) {
        codeFilteredMAs = new MACompListContent().filter(
          'pref',
          answerMAComp.pref,
        ).MAComps
      } else {
        codeFilteredMAs = new MACompListContent().filter(
          'code',
          '0' + answerMAComp.areaCode.slice(0, numOfDigit),
        ).MAComps
      }

      codeFilteredMAs = this.generateEliminatedUniqueMAs(
        codeFilteredMAs,
        answerMAComp,
      )

      if (codeFilteredMAs.length >= numOfChoices - 1) break
    }

    return shuffleArray(codeFilteredMAs)
  }

  shuffleAnswer() {
    if (!this.choices) return this
    const answerWithIndex = this.choices.map((choice, i) => ({
      choice: choice,
      index: i,
    }))
    const shuffledAnswersWithIndex = answerWithIndex.sort(
      () => Math.random() - 0.5,
    )
    const shuffledAnswers = shuffledAnswersWithIndex.map((ans) => ans.choice)

    const newCorrectAnswer =
      shuffledAnswersWithIndex.findIndex(
        (ans) => `${ans.index + 1}` === `${this.CORRECT_ANSWER}`,
      ) + 1

    this.correctAnswerIndex = newCorrectAnswer
    this.choices = shuffledAnswers

    return this
  }

  private generateEliminatedUniqueMAs(
    MAComps: MACompInfo[],
    answerMAComp: MACompInfo,
  ) {
    const removals = [answerMAComp.MAName]

    const eliminatedMAComps = MAComps.filter(function (v) {
      return !removals.includes(v.MAName)
    }).map((m) => {
      return m
    })

    return Array.from(
      new Map(eliminatedMAComps.map((m) => [m.MAName, m])).values(),
    )
  }
}
