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
          <div
            className="col-lg-3 col-md-12 mt-4 shadow rounded-3 text-center scrollbar"
            style={{ height: "89.2vh" }}
          >
            <UserOptions />
          </div>

          <div
            className="col-lg-5 col-md-12 mx-auto scrollbar shadow-lg rounded-top mt-4"
            style={{ height: "89.2vh" }}
          >
            <AllQuestions />
          </div>
          <div
            className="col-lg-3 col-md-12 py-2 shadow rounded-3 mt-4 text-center"
            style={{ height: "89.2vh" }}
          >
            <QuestionForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
