import React, { useState } from "react";
import { Await, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  async function handleLogin() {
    let data = await fetch(`http://localhost:5010/api/users`);
    let convertedData = await data.json();

    let loginSuccessful = false;

    convertedData.map((element) => {
      if (element.username === username && element.password === password) {
        console.log("Login successful");
        localStorage.setItem("username", username);
        loginSuccessful = true;
        navigate("/home");
      }
    });

    if (!loginSuccessful) {
      document.getElementById("specificSizeInputUsername").style.borderColor =
        document.getElementById("specificSizeInputPassword").style.borderColor =
          "red";
      console.log("Invalid username or password");
    }
  }

  return (
    <div className="container">
      <div
        className="row d-flex align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="col-lg-6 col-md-12 text-center">
          <h2 className="display-2">Login</h2>
          <a
            href=""
            className="text-decoration-none"
            onClick={() => {
              navigate("/");
            }}
          >
            <h6 className="display-6 fs-3">Sign up</h6>
          </a>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="row py-2">
            <div className="col-md-8 m-auto shadow py-3 rounded-5">
              <input
                value={username}
                onChange={(e) => setusername(e.target.value)}
                type="text"
                className="form-control my-3 shadow rounded-3"
                id="specificSizeInputUsername"
                placeholder="username"
              />
              <input
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                type="password"
                className="form-control my-3 shadow rounded-3"
                id="specificSizeInputPassword"
                placeholder="password"
              />
              <button
                onClick={handleLogin}
                type="submit"
                className="btn btn-primary w-100 shadow rounded-4"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
