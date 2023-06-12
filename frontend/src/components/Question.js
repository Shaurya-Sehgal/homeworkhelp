import React from "react";

function Question({ question }) {
  function postAnswer() {
    console.log("posted");
  }
  return (
    <>
      <div className="card mb-4 shadow" key={question.id}>
        <div className="card-header">
          {question.subject} by {question.username}
        </div>
        <div className="card-body">
          <h5 className="card-title">{question.title}</h5>
          <p className="card-text">{question.content}</p>
          <a
            href="#"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-bs-whatever="@mdo"
          >
            Answer
          </a>
          <a href="#" className="btn btn-primary mx-2">
            Check Answers
          </a>
        </div>
        <div className="card-footer text-muted">{question.date}</div>
      </div>
      <div
        className="modal fade modal-xl"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Answer
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
                  <h3> {question.title} </h3>
                  <p> {question.content} </p>
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Answer
                  </label>
                  <textarea
                    className="form-control"
                    id="message-text"
                    defaultValue={""}
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
                onClick={postAnswer}
              >
                Answer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Question;
