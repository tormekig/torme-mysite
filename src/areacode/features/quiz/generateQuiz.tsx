// import '../css/quiz.css'
import { shuffleArray } from '../../../utils/tools'
import { MACompListContent } from 'areacode/pages/list/MACompListContent'
import { MACompInfo } from 'areacode/data/MACompList'
import { Question } from './Quiz'

const NUM_OF_CHOICES = 3
// const NUM_OF_DIGIT_IN_AREACODE = -1; // -1: all
const NUM_OF_QUESTIONS = 5

class QuizGenerate {
  CORRECT_ANSWER = '1'

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

  private generateMAChoices(answerMAComp: MACompInfo, numOfDigit: number = 0) {
    console.log(numOfDigit)
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

      if (codeFilteredMAs.length >= NUM_OF_CHOICES - 1) break
    }

    return shuffleArray(codeFilteredMAs)
  }

  private generateQuestionData(
    MAComp: MACompInfo,
    numOfDigit: string,
  ): Question {
    const MAChoices = this.generateMAChoices(MAComp, parseInt(numOfDigit))

    return {
      subject: MAComp,
      choices: [MAComp, ...MAChoices.slice(0, NUM_OF_CHOICES - 1)],
    }
  }

  private shuffleAnswer(oldQuestions: Question[]): Question[] {
    const newQuestions: Question[] = oldQuestions.map((question) => {
      const answerWithIndex = question.choices.map((choice, i) => ({
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

      return {
        ...question,
        correctAnswer: `${newCorrectAnswer}`,
        choices: shuffledAnswers,
      }
    })

    return newQuestions
  }

  public generateQuizSet(
    quizMode: string = 'areacodeToMAName',
    numOfDigit: string = '-1',
  ): Question[] {
    if (quizMode === 'areacodeToMAName') {
      const MAComps = new MACompListContent().filter('all', '').MAComps
      const subjectMAComps = shuffleArray(MAComps).slice(0, NUM_OF_QUESTIONS)

      const questions: Question[] = subjectMAComps.map((MAComp) => {
        return this.generateQuestionData(MAComp, numOfDigit)
      })

      return this.shuffleAnswer(questions)
    }
    return []
  }
}

export default QuizGenerate
