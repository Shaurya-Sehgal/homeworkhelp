import React, { useEffect, useState } from "react";
import Question from "./Question";

function AllQuestions() {
  const [questions, setquestions] = useState([]);
  function getHomework() {
    fetch("http://localhost:5010/api/homework")
      .then((response) => response.json())
      .then((data) => setquestions(data));
  }
  useEffect(() => {
    getHomework();
  }, []);

  return (
    <>
      {questions.map((question) => {
        return <Question question={question} />;
      })}
    </>
  );
}

export default AllQuestions;
