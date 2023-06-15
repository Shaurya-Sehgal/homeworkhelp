import React, { useState } from "react";

function SignUp() {
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    displayname: "",
  });
  async function handleUsername(e) {
    setSignupData({ ...signupData, username: e.target.value });
    let data = await fetch(
      `http:/localhost:5010/api/checkUsername/${e.target.value}`
    );
    let convertedData = await data.json();
    console.log(convertedData);
    if (convertedData == "taken") {
      document.body.style.backgroundColor = "red";
    } else {
      document.body.style.backgroundColor = "green";
    }
  }
  return (
    <>
      <div className="container">
        <div
          className="row d-flex align-items-center"
          style={{ minHeight: "80vh" }}
        >
          <div className="col text-center">
            <h2 className="display-6">SignUp</h2>
          </div>

          <div className="col">
            <div className="row py-2">
              <div className="col-md-8 m-auto shadow py-3 rounded">
                <input
                  onChange={(e) => handleUsername(e)}
                  type="text"
                  className="form-control my-3 shadow"
                  id="specificSizeInputName"
                  placeholder="claim username"
                />
                <input
                  type="password"
                  className="form-control my-3 shadow"
                  id="specificSizeInputName"
                  placeholder="create password"
                />
                <input
                  type="text"
                  className="form-control my-3 shadow"
                  id="specificSizeInputGroupUsername"
                  placeholder="display name"
                />
                <button type="submit" className="btn btn-primary w-100 shadow">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
