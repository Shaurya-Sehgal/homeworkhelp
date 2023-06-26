import React, { useEffect, useState } from "react";

function Question({ question }) {
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [modalId, setModalId] = useState(null);
  const [checkModalId, setCheckModalId] = useState(null);
  const currentDate = new Date();

  const currentDateTime = currentDate.toLocaleString(undefined, {
    timeZone: "America/New_York",
    timeStyle: "short",
    dateStyle: "long",
  });

  function postAnswer() {
    fetch("http://localhost:5010/api/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answer: answer,
        date: currentDateTime + " EST",
        username: localStorage.getItem("username"),
        homework_id: question.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    console.log("posted");
  }

  function getAnswers() {
    fetch(`http://localhost:5010/api/answer/${question.id}`)
      .then((response) => response.json())
      .then((data) => {
        setAnswers(data);
      });
  }

  useEffect(() => {
    getAnswers();
  }, []);

  function openModal(id, isCheckModal) {
    if (isCheckModal) {
      setCheckModalId(id);
    } else {
      setModalId(id);
    }
  }

  return (
    <>
      <div className="card shadow mt-3 mb-4" key={question.id}>
        <div className="card-header fw-semibold">
          {question.subject} by {question.username}
        </div>
        <div className="card-body">
          <h5 className="card-title display-6 fw-normal fs-2">
            {question.title}
          </h5>
          <p className="card-text">{question.content}</p>
          <a
            href="#"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target={`#exampleModal-${modalId}`}
            data-bs-whatever="@mdo"
            onClick={() => openModal(question.id, false)}
          >
            Answer
          </a>
          <a
            href="#"
            className="btn btn-primary mx-2"
            data-bs-toggle="modal"
            data-bs-target={`#checkAnswersModal-${checkModalId}`}
            data-bs-whatever="@mdo"
            onClick={() => openModal(question.id, true)}
          >
            Check Answers
          </a>
        </div>
        <div className="card-footer text-muted">{question.date}</div>
      </div>

      <div
        className="modal fade modal-xl"
        id={`exampleModal-${modalId}`}
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-4 display-6 fw-normal"
                id="exampleModalLabel"
              >
                Add Answer to {question.title}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <h1 className="fs-4">{question.content}</h1>
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Answer
                  </label>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="form-control"
                    id="message-text"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={postAnswer}
              >
                Answer
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade modal-xl"
        id={`checkAnswersModal-${checkModalId}`}
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title display-6 fs-4 fw-normal"
                id="exampleModalLabel"
              >
                Check Answers for {question.title}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {/* Display answers here */}
              {answers.length > 0 ? (
                answers.map((answer) => (
                  <div key={answer.id}>
                    <h5 className="mb-4 display-6 fs-5 fw-semibold">
                      Question: {question.content}
                    </h5>
                    <p>Answer: {answer.answer}</p>
                    <p>Submitted on: {answer.date}</p>
                    <p>Submitted by: {answer.username}</p>
                  </div>
                ))
              ) : (
                <h5>Be the first one to answer!</h5>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Question;
