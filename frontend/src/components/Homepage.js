import React from "react";
import AllQuestions from "./AllQuestions";
import QuestionForm from "./QuestionForm";
import "./homework.css";
import UserOptions from "./UserOptions";

function Homepage() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-12 py-5 shadow rounded-3 mt-4">
            <QuestionForm />
          </div>
          <div
            className="col-lg-5 col-md-12 scrollbar mx-3 shadow-lg rounded-top mt-4"
            style={{ height: "89.2vh" }}
          >
            <AllQuestions />
          </div>
          <div className="col-lg-3 col-md-12 mt-4 shadow rounded-3">
            <UserOptions />
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
