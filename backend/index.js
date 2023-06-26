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
  console.log(req.body, "user");
  const { username, password, displayname } = req.body;
  console.log(username);
  const sqlInsert =
    "INSERT INTO user (username, password, displayname) VALUES (?,?,?)";
  db.query(sqlInsert, [username, password, displayname], (err, result) => {
    console.log(result);
  });
});

app.get("/api/checkUsername/:username", (req, res) => {
  const username = req.params.username;
  const sqlSelect = `SELECT * FROM user WHERE username = ?`;
  db.query(sqlSelect, username, (err, result) => {
    if (err) {
      console.log(err);
    } else if (username.length <= 3) {
      res.json({ username: "taken" });
    } else if (result.length === 0) {
      res.json({ username: "available" });
    } else {
      res.json({ username: "taken" });
    }
  });
});

app.get("/api/users", (req, res) => {
  const sqlSelect = "SELECT * FROM user";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/answer", (req, res) => {
  const { id, answer, date, username, homework_id } = req.body;
  sqlInsert =
    "INSERT INTO answer (id, answer, date, username, homework_id) VALUES (?,?,?,?,?)";
  db.query(
    sqlInsert,
    [id, answer, date, username, homework_id],
    (err, result) => {
      console.log(result);
      res.send(result);
    }
  );
});

app.get("/api/answer/:homeworkid", (req, res) => {
  const homeworkid = req.params.homeworkid;
  sqlSelect = `SELECT * FROM answer WHERE homework_id = ${homeworkid}`;
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "An error occurred" });
    } else {
      res.send(result);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
