import { MACompListContent } from 'areacode/pages/list/MACompListContent'
import { MAChoiceMAQuestion } from 'areacode/models/MAQuestion'
import { Digit4NumInputCityQuestion } from 'areacode/models/Digit4NumQuestion'
import { shuffleArray } from 'utils/tools'
import { quizMode } from '../QuizService'
import { allowed4DigitsNumbersByExcludedZeroMA } from 'areacode/pages/list/components/constants/areaCodeConstants'

const QUIZ_CONFIG = {
  NUM_OF_CHOICES: 3,
  NUM_OF_QUESTIONS: 5,
}

export class QuizFactory {
  public generateQuizSet(
    quizMode: quizMode,
    numOfDigit: string = '-1',
  ): MAChoiceMAQuestion[] | Digit4NumInputCityQuestion[] {
    if (quizMode.questionType === 'MANumRange') {
      return this.generateMAChoiceQuestions(numOfDigit)
    }

    if (quizMode.questionType === '4DigitsNum') {
      return this.generate4DigitInputQuestions()
    }

    return []
  }

  private generateMAChoiceQuestions(numOfDigit: string): MAChoiceMAQuestion[] {
    const allMAComps = new MACompListContent().filter('all', '').MAComps
    const selectedMAComps = shuffleArray(allMAComps).slice(
      0,
      QUIZ_CONFIG.NUM_OF_QUESTIONS,
    )

    return selectedMAComps.map((maComp) =>
      new MAChoiceMAQuestion(maComp)
        .generate(numOfDigit, QUIZ_CONFIG.NUM_OF_CHOICES)
        .shuffleAnswer(),
    )
  }

  private generate4DigitInputQuestions(): Digit4NumInputCityQuestion[] {
    const selected4DigitNums = shuffleArray(
      allowed4DigitsNumbersByExcludedZeroMA.flat(2),
    ).slice(0, QUIZ_CONFIG.NUM_OF_QUESTIONS)

    return selected4DigitNums.map(
      (num) => new Digit4NumInputCityQuestion(`0${num}`),
    )
  }
}
