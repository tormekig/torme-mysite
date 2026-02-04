import { MACompInfo } from 'areacode/data/MACompList'
import { MACompListContent } from 'areacode/pages/list/MACompListContent'
import { shuffleArray } from 'utils/tools'

export class MAChoiceMAQuestion {
  CORRECT_ANSWER = '1'

  private MA: MACompInfo
  private MAchoices: MACompInfo[] = []
  private isCollect?: boolean
  
  correctAnswerIndex?: number
  userInput?: number

  constructor(MA: MACompInfo, numOfDigit: string, numOfChoices: number) {
    this.MA = MA
    this.generateChoices(numOfDigit, numOfChoices)
    return this
  }

  getMA() {
    return this.MA
  }

  getMAChoices() {
    return this.MAchoices
  }

  generateChoices(numOfDigit: string, numOfChoices: number) {
    const MAChoices = this.generateMAChoices(
      this.MA,
      parseInt(numOfDigit),
      numOfChoices,
    )

    this.MAchoices = [this.MA, ...MAChoices.slice(0, numOfChoices - 1)]
    
    return this.shuffleAnswer()
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

  judgeAndSetIsAnswer(selectedIndex: number) {
    this.userInput = selectedIndex
    this.isCollect = this.userInput === this.correctAnswerIndex
    return this.isCollect
  }

  getIsAnswerCorrect() {
    return this.isCollect
  }

  private shuffleAnswer() {
    if (!this.MAchoices) return this
    const answerWithIndex = this.MAchoices.map((choice, i) => ({
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
    this.MAchoices = shuffledAnswers

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
