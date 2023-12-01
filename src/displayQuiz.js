import { Header } from "./Top";
import Quiz from "./quiz/Quiz";
import { ScrollTop } from "./utils/tools";

function displayQuiz() {
  
  const quizMode = "areacodeToMAName"

  return (
    <div>
      <ScrollTop />
      <Header />
      <Quiz
        mode={quizMode}
      />
    </div>
  );
  
}

export default displayQuiz;