import Quiz from "./quiz/Quiz";

function displayQuiz() {
  
  const quizMode = "areacodeToMAName"

  return (
    <div>
      <Quiz
        mode={quizMode}
      />
    </div>
  );
  
}

export default displayQuiz;