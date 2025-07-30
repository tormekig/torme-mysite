// import '../css/quiz.css'
import { shuffleArray } from '../../../utils/tools'
import { MACompListContent } from 'areacode/pages/list/MACompListContent'
import { MACompInfo } from 'areacode/data/MACompList'
import { Question } from './Quiz'

const NUM_OF_CHOICES = 3
// const NUM_OF_DIGIT_IN_AREACODE = -1; // -1: all
const NUM_OF_QUESTIONS = 5

function generateEliminatedUniqueMAs(
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

function generateMAChoices(answerMAComp: MACompInfo, numOfDigit: number = 0) {
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

    codeFilteredMAs = generateEliminatedUniqueMAs(codeFilteredMAs, answerMAComp)

    if (codeFilteredMAs.length >= NUM_OF_CHOICES - 1) break
  }

  return shuffleArray(codeFilteredMAs)
}

function generateQuestionData(
  MAComp: MACompInfo,
  numOfDigit: string,
): Question {
  const MAChoices = generateMAChoices(MAComp, parseInt(numOfDigit))

  return {
    subject: MAComp,
    choices: [MAComp, ...MAChoices.slice(0, NUM_OF_CHOICES - 1)],
  }
}

function generateQuizSet(
  quizMode: string = 'areacodeToMAName',
  numOfDigit: string = '-1',
): Question[] {
  if (quizMode === 'areacodeToMAName') {
    const { headerInfo, MAComps } = new MACompListContent().filter('all', '')

    const questions: Question[] = MAComps.map((MAComp) => {
      return generateQuestionData(MAComp, numOfDigit)
    })
    console.log(questions)
    return questions
  }
  return []
}

export default generateQuizSet
