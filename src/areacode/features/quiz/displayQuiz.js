import React from 'react';
import { Header } from "../Top";
import Quiz from "./Quiz";
import { ScrollTop } from "../../utils/tools";

function displayQuiz() {
  
  const quizMode = "areacodeToMAName"

  return (
    <div>
      <ScrollTop />
      <Header />
      <div className="main-content">
        <Quiz
          mode={quizMode}
        />
      </div>
    </div>
  );
  
}

export default displayQuiz;