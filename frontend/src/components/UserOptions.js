import React, { useEffect, useState } from "react";
import "./homework.css";
import { useNavigate } from "react-router-dom";

function UserOptions() {
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();
  const [userPosts, setuserPosts] = useState([]);
  const [userAnswers, setuserAnswers] = useState([]);
  const [question, setquestion] = useState([]);
  const [questions, setquestions] = useState([]);
  const [displayName, setdisplayName] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalId, setModalId] = useState(null);
  const [checkModalId, setCheckModalId] = useState(null);

  function getAnswers() {
    questions.map((question) => {
      fetch(`http://localhost:5010/api/answer/${question.id}`)
        .then((response) => response.json())
        .then((data) => {
          setAnswers(data);
        });
    });
  }

  useEffect(() => {
    getAnswers();
  }, []);

  function getDisplayName() {
    fetch(`http://localhost:5010/api/users`)
      .then((response) => response.json())
      .then((data) => {
        const user = data.find(
          (element) => element.username === localStorage.username
        );
        if (user) {
          setdisplayName(user.displayname);
        }
      });
  }

  useEffect(() => {
    getDisplayName();
  }, []);

  function viewPosts() {
    fetch(`http://localhost:5010/api/homework`)
      .then((response) => response.json())
      .then((data) => {
        const userPosts = data.filter(
          (element) => element.username === localStorage.username
        );
        setuserPosts(userPosts);
        setSelectedOption("posts");
      });
  }

  function viewAnswers() {
    fetch(`http://localhost:5010/api/answer`)
      .then((response) => response.json())
      .then((data) => {
        const userAnswers = data.filter(
          (element) => element.username === localStorage.username
        );
        setuserAnswers(userAnswers);
        setSelectedOption("answers");
        getQuestion(userAnswers);
      });
  }

  function getQuestion(userAnswers) {
    fetch(`http://localhost:5010/api/homework`)
      .then((response) => response.json())
      .then((data) => {
        const questions = data.filter((element) => {
          for (let i = 0; i < userAnswers.length; i++) {
            if (element.id === userAnswers[i].homework_id) {
              return true;
            }
          }
          return false;
        });

        setquestion(questions);
      });
  }

  function logout() {
    localStorage.clear();
    navigate("/");
  }

  function openModal(id, isCheckModal) {
    if (isCheckModal) {
      setCheckModalId(id);
    } else {
      setModalId(id);
    }
  }

  function deletePost(postId) {
    fetch(`http://localhost:5010/api/homework`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: postId }),
    })
      .then((response) => {
        if (response.ok) {
          // Post deleted successfully
          // Refresh the user's posts
          viewPosts();
        } else {
          // Handle error deleting post
          console.log("Error deleting post");
        }
      })
      .catch((error) => {
        console.log("Error deleting post:", error);
      });
  }

  return (
    <>
      <div className="mb-3 mt-3">
        <h1 className="display-6 text-center mb-3">Welcome {displayName}</h1>
        <button className="btn btn-outline-danger mb-3 w-75" onClick={logout}>
          Logout
        </button>
        <br />
        <button className="btn btn-primary me-3" onClick={viewPosts}>
          View Posts
        </button>
        <button className="btn btn-primary" onClick={viewAnswers}>
          View Answers
        </button>
      </div>

      <div className="">
        {selectedOption === "posts" &&
          userPosts.map((question) => (
            <div
              className="card shadow mt-3 mb-4 text-center"
              key={question.id}
            >
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
                  className="btn btn-primary mx-2"
                  data-bs-toggle="modal"
                  data-bs-target={`#checkAnswersModal-${question.id}`}
                  data-bs-whatever="@mdo"
                  onClick={() => openModal(question.id, true)}
                >
                  Check Answers
                </a>
                <a
                  href="#"
                  className="btn btn-primary btn btn-danger"
                  onClick={() => deletePost(question.id)}
                >
                  Delete Post
                </a>
              </div>
              <div className="card-footer text-muted">{question.date}</div>
            </div>
          ))}
      </div>

      <div className="">
        {selectedOption === "answers" && (
          <div>
            {userAnswers.map((answer) => {
              const matchingQuestion = question.find(
                (q) => q.id === answer.homework_id
              );

              if (matchingQuestion) {
                return (
                  <div
                    className="card shadow mt-3 mb-4 text-center"
                    key={answer.id}
                  >
                    <div className="card-header fw-semibold">
                      {matchingQuestion.content +
                        " by " +
                        matchingQuestion.username}
                    </div>
                    <div className="card-body">
                      <h5 className="card-title display-6 fw-normal fs-2">
                        {answer.answer}
                      </h5>
                    </div>
                    <div className="card-footer text-muted">
                      {matchingQuestion.date}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
      <div
        className="modal fade modal-xl"
        id={`checkAnswersModal-${question.id}`}
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
              {answers.length > 0 ? (
                <>
                  <h5 className="mb-4 display-6 fs-5 fw-semibold">
                    Question: {question.content}
                  </h5>
                  {answers.map((answer, index) => (
                    <div key={answer.id}>
                      {index > 0 && <hr />} <p>Answer: {answer.answer}</p>
                      <p>Submitted on: {answer.date}</p>
                      <p>Submitted by: {answer.username}</p>
                    </div>
                  ))}
                </>
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

export default UserOptions;
