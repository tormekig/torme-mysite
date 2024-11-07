import { searchMAAreaCodeInfos } from '../searchMAAreaCodeInfos';

import '../css/quiz.css';
import { shuffleArray } from '../../../utils/tools';

const NUM_OF_CHOICES = 3;
// const NUM_OF_DIGIT_IN_AREACODE = -1; // -1: all
const NUM_OF_QUESTIONS = 5;

function generateEliminatedUniqueMAs(MAComps, answerMAComp) {

  const removals = [answerMAComp.MAName];
  
  const eliminatedMAComps = MAComps.filter(function(v){
    return ! removals.includes(v.MAName);
  }).map((m) => {return m})

  return Array.from(
    new Map(eliminatedMAComps.map((m) => [m.MAName, m])).values()
  );

}

function generateMAChoices(answerMAComp, numOfDigit=0) {

  let codeFilteredMAs = []
  console.log(numOfDigit)
  codeFilteredMAs = searchMAAreaCodeInfos("all")[1]

  for (let i = numOfDigit; i >= 0; i--) {

    if (i === 0) {
      codeFilteredMAs = searchMAAreaCodeInfos("pref", answerMAComp.pref)[1]
    } else {
      codeFilteredMAs = searchMAAreaCodeInfos("code", '0' + answerMAComp.areaCode.slice(0, numOfDigit))[1]
    }

    codeFilteredMAs = generateEliminatedUniqueMAs(codeFilteredMAs, answerMAComp)

    if (codeFilteredMAs.length >= NUM_OF_CHOICES - 1) break;

  }

  return shuffleArray(codeFilteredMAs)

}

function generateQuestionData(MAComp, numOfDigit) {

  const MAChoices = generateMAChoices(MAComp, parseInt(numOfDigit));

  return {
    subject: MAComp,
    answers: [
      MAComp,
      ...MAChoices.slice(0, NUM_OF_CHOICES - 1)
    ],
  }

}

function generateQuizSet(quizMode="areacodeToMAName", numOfDigit="-1") {

  if (quizMode === "areacodeToMAName") {

    const questionMAComps = searchMAAreaCodeInfos("all", "", true)[1].slice(0, NUM_OF_QUESTIONS);

    const quesitons = [];

    questionMAComps.forEach(function(MAComp) {
      quesitons.push(generateQuestionData(MAComp, numOfDigit))
    })
    console.log(quesitons)
    return quesitons;

  }

}

export default generateQuizSet;