const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const port = 5010;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "homeworkhelp",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("Connected to database");
});

app.get("/api/homework", (req, res) => {
  const sqlSelect = "SELECT * FROM homework";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/homework", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const username = req.body.username;
  const tags = req.body.tags;
  const subject = req.body.subject;
  const date = req.body.date;

  console.log(title);

  const sqlInsert =
    "INSERT INTO homework (title, content, username, tags, subject, date) VALUES (?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [title, content, username, tags, subject, date],
    (err, result) => {
      console.log(result);
    }
  );
});

app.post("/api/user", (req, res) => {
  const { username, password, email, displayname } = req.body;
  console.log(username);
  const sqlInsert =
    "INSERT INTO user (username, password, email, displayname) VALUES (?,?,?,?)";
  db.query(
    sqlInsert,
    [username, password, email, displayname],
    (err, result) => {
      console.log(result);
    }
  );
});

app.post("/api/answer", (req, res) => {
  const { id, answer, date, answerid, username, homework_id } = req.body;
  sqlInsert =
    "INSERT INTO answer (id, answer, date, answerid, username, homework_id) VALUES (?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [id, answer, date, answerid, username, homework_id],
    (err, result) => {
      console.log(result);
      res.send(result);
    }
  );
});

//create sample body for app.post/answer
// {
//   "id": 1,
//   "answer": "This is a sample answer",
//   "date": "2021-04-20",
//   "answerid": 1,
//   "username": "sampleuser",
//   "homework_id": 1
// }

app.get("/api/answer", (req, res) => {
  const homeworkid = req.body.homeworkid;
  sqlSelect = `SELECT * FROM answer WHERE homework_id = ${homeworkid}`;
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
