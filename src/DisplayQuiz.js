/*
https://www.npmjs.com/package/react-quiz-component
*/
// import Quiz from 'react-quiz-component'

import { getNumberBandsfromMAComp, searchMAAreaCodeInfos } from './MAAreaCode';

import './css/quiz.css';
import { shuffleArray } from './utils/tools';
import Quiz from './quiz/Quiz';

const NUM_OF_CHOICES = 3;
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
    "questionType": "text",
    "answerSelectionType": "single",
    "answers": data.answers,
    "correctAnswer": "1",
    "messageForCorrectAnswer": "正解！",
    "messageForIncorrectAnswer": "不正解…",
    "explanation": data.explanation,
    "point": "10"
  }

}

function generateEliminatedUniqueMAs(MAComps, answerMAComp) {

  const removals = [answerMAComp.MAName];
  
  const eliminatedMAComps = MAComps.filter(function(v){
    return ! removals.includes(v.MAName);
  }).map(function(m) {
    return {
      "pref": m.pref,
      "MAName": m.MAName
    }
  })

  return Array.from(
    new Map(eliminatedMAComps.map((m) => [m.MAName, m])).values()
  );

}

function generateMAChoices(answerMAComp, filter=0) {

  let codeFilteredMAs = []
  
  codeFilteredMAs = searchMAAreaCodeInfos("all")

  for (let i = filter; i >= 0; i--) {

    if (i === 0) {
      codeFilteredMAs = searchMAAreaCodeInfos("pref", answerMAComp.pref)
    } else {
      codeFilteredMAs = searchMAAreaCodeInfos("code", answerMAComp.areaCode.slice(0, filter))
    }

    codeFilteredMAs = generateEliminatedUniqueMAs(codeFilteredMAs, answerMAComp)

    if (codeFilteredMAs.length >= NUM_OF_CHOICES - 1) break;

  }

  return shuffleArray(codeFilteredMAs)

}

function generateQuestionData(MAComp, i) {

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

    questionMAComps.forEach(function(MAComp, i) {
      quesitons.push(generateQuestionData(MAComp, i))
    })

    return {
      "quizTitle": "タイトル",
      "quizSynopsis": "概要",
      "questions": quesitons,
      "appLocale": {
        "landingHeaderText": "第<questionLength>問",
        "question": "問題",
        "startQuizBtn": "クイズ開始",
        "resultFilterAll": "全て",
        "resultFilterCorrect": "正答",
        "resultFilterIncorrect": "誤答",
        "prevQuestionBtn": "前へ",
        "nextQuestionBtn": "次へ",
        "resultPageHeaderText": "<questionLength>問中<correctIndexLength>問正解",
        "resultPagePoint": "<correctPoints>点 / <totalPoints>点満点",
        "singleSelectionTagText": "単一選択",
        "multipleSelectionTagText": "複数選択",
        "pickNumberOfSelection": "<numberOfSelection>つ",
        "marksOfQuestion": "(<marks>点)",
      }
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

// const quiz = {
//   "quizTitle": "_title",
//   "quizSynopsis": "_synopsis",
//   "questions": [
//     {
//       "question": "_q",
//       "questionType": "text",
//       "answers": [
//         "_#1",
//         "_#2",
//         "_#3",
//       ],
//       "correctAnswer": "1",
//       "messageForCorrectAnswer": "_correct",
//       "messageForIncorrectAnswer": "_incorrect",
//       "explanation": "_explanation",
//       "point": "1"
//     },
//     {
//       "question": "_q2",
//       "questionType": "text",
//       "answers": [
//         "_#12",
//         "_#22",
//         "_#32"
//       ],
//       "correctAnswer": "2",
//       "messageForCorrectAnswer": "_correct2",
//       "messageForIncorrectAnswer": "_incorrect2",
//       "explanation": "_explanation2",
//       "point": "1"
//     },
//     // {
//     //   "question": "_q3",
//     //   "questionType": "text",
//     //   "answers": [
//     //     "_#13",
//     //     "_#23",
//     //     "_#33"
//     //   ],
//     //   "correctAnswer": "1",
//     //   "messageForCorrectAnswer": "_correct3",
//     //   "messageForIncorrectAnswer": "_incorrect3",
//     //   "explanation": "_explanation3",
//     //   "point": "1"
//     // },
//     // {
//     //   "question": "_q4",
//     //   "questionType": "text",
//     //   "answers": [
//     //     "_#14",
//     //     "_#24",
//     //     "_#34"
//     //   ],
//     //   "correctAnswer": "2",
//     //   "messageForCorrectAnswer": "_correct4",
//     //   "messageForIncorrectAnswer": "_incorrect4",
//     //   "explanation": "_explanation4",
//     //   "point": "1"
//     // },
//     // {
//     //   "question": "_q5",
//     //   "questionType": "text",
//     //   "answers": [
//     //     "_#15",
//     //     "_#25",
//     //     "_#35"
//     //   ],
//     //   "correctAnswer": "1",
//     //   "messageForCorrectAnswer": "_correct5",
//     //   "messageForIncorrectAnswer": "_incorrect5",
//     //   "explanation": "_explanation5",
//     //   "point": "1"
//     // },
//   ]
// }