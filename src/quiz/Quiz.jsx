import React, { useState } from "react";
import Main from "./QuizMain";
import './styles.css';
import generateQuizSet from "../generateQuiz";

const CORRECT_ANSWER = "1";

function Quiz({quizMode, isShuffleAnswer}) {
  const [start, setStart] = useState(false);
  const [questions, setQuestions] = useState([]);

  const [isVisibleCities, setIsVisibleCities] = useState(true);
  const [choiceRange, setChoiceRange] = useState("-1");

  const shuffleAnswer = (oldQuestions = []) => {

    const newQuestions = oldQuestions.map((question) => {

      const answerWithIndex = question.answers?.map((ans, i) => [ans, i]);
      const shuffledAnswersWithIndex = answerWithIndex.sort(
        () => Math.random() - 0.5,
      );
      const shuffledAnswers = shuffledAnswersWithIndex.map((ans) => ans[0]);

      const newCorrectAnswer = shuffledAnswersWithIndex.findIndex(
        (ans) => `${ans[1] + 1}` === `${CORRECT_ANSWER}`,
      ) + 1;

      return {
        ...question,
        correctAnswer: `${newCorrectAnswer}`,
        answers: shuffledAnswers,
      }

    })

    return newQuestions;

  }

  function startQuiz() {

    let newQuestions = generateQuizSet(
      "areacodeToMAName",
      choiceRange
    );

    newQuestions = shuffleAnswer(newQuestions);


    newQuestions = newQuestions.map((question, index) => ({
      ...question,
      questionIndex: index + 1,
    }));

    setQuestions(newQuestions);
    setStart(true);

  }
  
  const changeIsVisibleCities = () => {
    setIsVisibleCities(!isVisibleCities)
  };

  const changeChoiceRange = (event) => {
    console.log(event.target.value, choiceRange)
    setChoiceRange(event.target.value)
  };

  const radioButtons = [
    {
      label: "全て",
      value: "-1"
    },
    {
      label: "同一都道府県",
      value: "0"
    },
    {
      label: "市外局番2桁",
      value: "1"
    },
    {
      label: "市外局番3桁",
      value: "2"
    },
    {
      label: "市外局番4桁",
      value: "3"
    },
  ]
  return (
    <div className="quiz-container">
      {!start && (
        <div>
          <input
            type="checkbox"
            checked={isVisibleCities}
            onChange={() => changeIsVisibleCities()}
          /> 市町村名を表示
          <br />
          {radioButtons.map((radio, i) => {
            return (
              <div key={i}>
                <input type="radio" name="choiceRange" 
              value={radio.value} checked={radio.value === choiceRange} onChange={changeChoiceRange}/>
                <label>{radio.label}</label>
              </div>
            )
          })}
          <button type="button" onClick={() => startQuiz()} className="startQuizBtn">
            Start
          </button>
        </div>
      )}

      {start && (
        <Main 
          questions={questions}
          isVisibleCities={isVisibleCities}
          choiceRange={choiceRange}
        />
      )}
    </div>
  )
}

export default Quiz;