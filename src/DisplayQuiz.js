/*
https://www.npmjs.com/package/react-quiz-component
*/
// import Quiz from 'react-quiz-component'

import { getNumberBandsfromMAComp, searchMAAreaCodeInfos } from './MAAreaCode';

import './css/quiz.css';
import { shuffleArray } from './utils/tools';
import Quiz from './quiz/Quiz';

const NUM_OF_CHOICES = 30;
const NUM_OF_DIGIT_IN_AREACODE = -1; // -1: all
const NUM_OF_QUESTIONS = 5;

/*
  data
    - question: string
    - answers: string[]
    - explanation: string
*/
function questionDataTemplate(data) {

  return {
    "question": data.question,
    "answers": data.answers,
    "explanation": data.explanation,
  }

}

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
  
  codeFilteredMAs = searchMAAreaCodeInfos("all")

  for (let i = numOfDigit; i >= 0; i--) {

    if (i === 0) {
      codeFilteredMAs = searchMAAreaCodeInfos("pref", answerMAComp.pref)
    } else {
      codeFilteredMAs = searchMAAreaCodeInfos("code", answerMAComp.areaCode.slice(0, numOfDigit))
    }

    codeFilteredMAs = generateEliminatedUniqueMAs(codeFilteredMAs, answerMAComp)

    if (codeFilteredMAs.length >= NUM_OF_CHOICES - 1) break;

  }

  return shuffleArray(codeFilteredMAs)

}

function generateQuestionData(MAComp) {

  const numberBands = getNumberBandsfromMAComp(MAComp)
  const MAChoices = generateMAChoices(MAComp, NUM_OF_DIGIT_IN_AREACODE);

  return questionDataTemplate({

    question: "0" + MAComp.areaCode + "\n(" + numberBands[0].bandStart + ")",
    answers: [
      MAComp.MAName + " (" + MAComp.pref + ")",
      MAChoices[0].MAName + " (" + MAChoices[0].pref + ")",
      MAChoices[1].MAName + " (" + MAChoices[1].pref + ")"
    ],
    explanation: MAComp.pref,

  })

}

function generateQuizSet(quizMode) {

  if (quizMode === "areacodeToMAName") {

    const questionMAComps = searchMAAreaCodeInfos("all", "", true).slice(0, NUM_OF_QUESTIONS);

    const quesitons = [];

    questionMAComps.forEach(function(MAComp) {
      quesitons.push(generateQuestionData(MAComp))
    })

    return {
      "questions": quesitons
    };

  }

}

function DisplayQuiz() {
  
  const quizMode = "areacodeToMAName"

  return (
    <div>
      <Quiz
        quiz={generateQuizSet(quizMode)}
        // quiz={quiz}
        isShuffleAnswer={true}
        showInstantFeedback={true}
      />
    </div>
  );
  
}

export default DisplayQuiz;