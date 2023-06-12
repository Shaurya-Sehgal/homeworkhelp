import React from "react";
import AllQuestions from "./AllQuestions";
import QuestionForm from "./QuestionForm";

function Homepage() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-3 py-5">
            <QuestionForm />
          </div>
          <div className="col-md-6 overflow-auto" style={{ height: "80vh" }}>
            <AllQuestions />
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
