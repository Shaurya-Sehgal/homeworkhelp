import React, { useState } from "react";

function UserOptions() {
  const [displayName, setdisplayName] = useState("");
  function getDisplayName() {
    fetch(`http://localhost:5010/api/users`)
      .then((response) => response.json())
      .then((data) => {
        data.map((element) => {
          if (element.username === localStorage.username) {
            setdisplayName(element.displayname);
          }
        });
      });
  }
  return (
    <>
      <h1 className="display-6 text-center">Welcome {displayName}</h1>
    </>
  );
}

export default UserOptions;
