import Quiz from "./quiz/Quiz";

function DisplayQuiz() {
  
  const quizMode = "areacodeToMAName"

  return (
    <div>
      <Quiz
        mode={quizMode}
      />
    </div>
  );
  
}

export default DisplayQuiz;