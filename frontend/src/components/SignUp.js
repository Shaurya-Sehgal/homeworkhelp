import React, { useState } from "react";
import { Await, useNavigate } from "react-router-dom";

function SignUp() {
  const [signupData, setSignupData] = useState({
    username: "",
    available: true,
    password: "",
    displayname: "",
  });
  const navigate = useNavigate();

  async function handleUsername(e) {
    try {
      let response = await fetch(
        `http://localhost:5010/api/checkUsername/${e.target.value}`
      );
      let data = await response.json();
      console.log(data);
      if (data.username === "taken") {
        setSignupData({
          ...signupData,
          username: e.target.value,
          available: false,
        });
      } else {
        setSignupData({
          ...signupData,
          username: e.target.value,
          available: true,
        });
      }
    } catch (error) {
      console.error(error);
      // Handle the error here
    }
  }

  async function handleSignup() {
    console.log(signupData);
    let response = await fetch("http://localhost:5010/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });
    let data = await response.json();
    console.log(data);
  }

  return (
    <div className="container">
      <div
        className="row d-flex align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="col-lg-6 col-md-12 text-center">
          <h2 className="display-2">Sign Up</h2>
          <a
            href=""
            className="text-decoration-none"
            onClick={() => {
              navigate("/login");
            }}
          >
            <h6 className="display-6 fs-3">Login</h6>
          </a>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="row py-2">
            <div className="col-md-8 m-auto shadow py-3 rounded-5">
              <input
                onChange={(e) => {
                  setSignupData({ ...signupData, username: e.target.value });
                  handleUsername(e);
                }}
                type="text"
                className={`form-control my-3 shadow rounded-3 ${
                  signupData.available ? "text-success" : "text-danger"
                }`}
                id="specificSizeInputName"
                placeholder="claim username"
              />
              <input
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                type="password"
                className="form-control my-3 shadow rounded-3"
                id="specificSizeInputName"
                placeholder="create password"
              />
              <input
                onChange={(e) =>
                  setSignupData({ ...signupData, displayname: e.target.value })
                }
                type="text"
                className="form-control my-3 shadow rounded-3"
                id="specificSizeInputGroupUsername"
                placeholder="display name"
              />
              <button
                onClick={handleSignup}
                type="submit"
                className="btn btn-primary w-100 shadow rounded-4"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
