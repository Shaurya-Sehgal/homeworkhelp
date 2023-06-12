import React, { useState } from "react";

function QuestionForm() {
  const [title, settitle] = useState("");
  const [subject, setsubject] = useState("");
  const [content, setcontent] = useState("");
  function postHomework() {
    fetch("http://localhost:5010/api/homework", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: subject,
        title: title,
        content: content,
        username: "test2",
        tags: "test",
        date: new Date(),
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    console.log("posted");
  }
  return (
    <>
      <form className="row g-3 needs-validation" noValidate="">
        <div className="col-12">
          <label htmlFor="validationCustom01" className="form-label">
            Subject
          </label>
          <input
            value={subject}
            onChange={(e) => setsubject(e.target.value)}
            type="text"
            className="form-control"
            id="validationCustom01"
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-12">
          <label htmlFor="validationCustom02" className="form-label">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => settitle(e.target.value)}
            type="text"
            className="form-control"
            id="validationCustom02"
            required=""
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-12">
          <label htmlFor="validationCustomUsername" className="form-label">
            Content
          </label>
          <div className="input-group has-validation">
            <textarea
              value={content}
              onChange={(e) => setcontent(e.target.value)}
              style={{ height: "300px" }}
              type="text"
              className="form-control"
              id="validationCustomUsername"
              aria-describedby="inputGroupPrepend"
              required=""
            />
            <div className="invalid-feedback">Please choose a username.</div>
          </div>
        </div>
        <div className="col-12">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={postHomework}
          >
            Submit form
          </button>
        </div>
      </form>
    </>
  );
}

export default QuestionForm;
