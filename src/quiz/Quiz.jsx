import { useState } from "react";
import Main from "./QuizMain";
import './styles.css';

const CORRECT_ANSWER = "1";

function Quiz({quiz, isShuffleAnswer, showInstantFeedback}) {
  const [start, setStart] = useState(false);
  const [questions, setQuestions] = useState(quiz.questions);
  const nrOfQuestions = quiz.questions.length;

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

    let newQuestions = quiz.questions;

    if (isShuffleAnswer) {
      newQuestions = shuffleAnswer(newQuestions);
    }

    newQuestions.length = nrOfQuestions;
    newQuestions = newQuestions.map((question, index) => ({
      ...question,
      questionIndex: index + 1,
    }));

    setQuestions(newQuestions);
    setStart(true);

  }

  return (
    <div className="quiz-container">
      {!start && (
        <div>
          <button type="button" onClick={() => startQuiz()} className="startQuizBtn">
            Start
          </button>
        </div>
      )}

      {start && (
        <Main 
          questions={questions}
          isShuffleAnswer={isShuffleAnswer}
          showInstantFeedback={showInstantFeedback}
        />
      )}
    </div>
  )
}

export default Quiz;