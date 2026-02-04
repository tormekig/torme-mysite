import { MACompListContent } from 'areacode/pages/list/MACompListContent'
import { MAChoiceMAQuestion } from 'areacode/models/MAQuestion'
import {
  Digit4NumInputCityQuestion,
  InputCityQuestion,
  MAInputCityQuestion,
} from 'areacode/models/Digit4NumQuestion'
import { shuffleArray } from 'utils/tools'
import { allowed4DigitsNumbersByExcludedZeroMA } from 'areacode/pages/list/components/constants/areaCodeConstants'
import { transformAreaCode } from 'areacode/pages/list/components/MAAreaCodeInfoDojinshi'

type questionType = 'MANumRange' | '4DigitsNum'
type inputType = 'choice' | 'input'
type answerType = 'MA' | 'city'

export type quizMode = {
  questionType: questionType
  inputType: inputType
  answerType: answerType
}

const QUIZ_CONFIG = {
  NUM_OF_CHOICES: 3,
  NUM_OF_QUESTIONS: 5,
}

export class QuizGenerator {
  mode: quizMode

  constructor(quizMode: quizMode) {
    this.mode = quizMode
  }

  public generateQuizSet(
    numOfDigit: string = '-1',
  ): MAChoiceMAQuestion[] | InputCityQuestion[] {
    if (this.mode.questionType === 'MANumRange') {
      if (this.mode.inputType === 'input') {
        return this.generateMAInputCityQuestions()
      }
      return this.generateMAChoiceQuestions(numOfDigit)
    }

    if (this.mode.questionType === '4DigitsNum') {
      return this.generateDigit4NumInputCityQuestions()
    }

    return []
  }

  private generateMAChoiceQuestions(numOfDigit: string): MAChoiceMAQuestion[] {
    const allMAComps = new MACompListContent().filter('all', '').MAComps
    const selectedMAComps = shuffleArray(allMAComps).slice(
      0,
      QUIZ_CONFIG.NUM_OF_QUESTIONS,
    )

    return selectedMAComps.map(
      (maComp) =>
        new MAChoiceMAQuestion(maComp, numOfDigit, QUIZ_CONFIG.NUM_OF_CHOICES),
    )
  }

  private generateMAInputCityQuestions(): InputCityQuestion[] {
    const allMAComps = new MACompListContent().filter('all', '').MAComps
    const selectedMAComps = shuffleArray(allMAComps).slice(
      0,
      QUIZ_CONFIG.NUM_OF_QUESTIONS,
    )

    return selectedMAComps.map((maComp) => new MAInputCityQuestion([maComp]))
  }

  private generateDigit4NumInputCityQuestions(): Digit4NumInputCityQuestion[] {
    const selected4DigitNums = shuffleArray(
      allowed4DigitsNumbersByExcludedZeroMA.flat(2),
    ).slice(0, QUIZ_CONFIG.NUM_OF_QUESTIONS)

    return selected4DigitNums.map((num) => {
      const areacode = `0${num}`
      const transformedAreacode = transformAreaCode(areacode)
      const subject =
        MACompListContent.filterMACompListByPrefixAreaCode(transformedAreacode)
      return new Digit4NumInputCityQuestion(
        areacode,
        transformedAreacode,
        subject,
      )
    })
  }
}
