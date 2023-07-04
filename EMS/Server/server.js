import express from "express";
import mysql from "mysql";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";

// const express = require("express");
// const cors = require("cors");
const app = express();
app.use(
  //9806196390
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

//database
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup",
});

//middleware for file (image) upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

//check database connection
con.connect(function (err) {
  if (err) {
    console.log("Error in connection");
  } else {
    console.log("Connected");
  }
});

app.get("/getEmployee", (req, res) => {
  const sql = "SELECT * FROM employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Get employee error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});

app.get("/get/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee where id =?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "Get employee error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});

/* for profile of admin  */
app.get("/getAdmin/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM users where id =?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "Get admin error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are not authorized" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) return res.json({ Error: "Token wrong" });
      req.role = decoded.role;
      req.id = decoded.id;
      next();
    });
  }
};

app.options("/dashboard", cors()); // CORS for the OPTIONS request

app.get("/dashboard", cors(), verifyUser, (req, res) => {
  //  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  return res.json({ Status: "Success", role: req.role, id: req.id });
});

app.get("/adminCount", (req, res) => {
  const sql = "SELECT count(id) as admin from users";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in running query" });
    return res.json(result);
  });
});

app.get("/employeeCount", (req, res) => {
  const sql = "SELECT count(id) as employee from employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in running query" });
    return res.json(result);
  });
});

app.get("/salary", (req, res) => {
  const sql = "SELECT sum(salary) as sumOfSalary from employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in running query" });
    return res.json(result);
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM users Where email = ? AND password= ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err)
      return res.json({ Status: "Error", Error: "Error in running query" });
    if (result.length > 0) {
      const id = result[0].id;
      const token = jwt.sign({ role: "admin" }, "jwt-secret-key", {
        expiresIn: "1d",
      });
      res.cookie("token", token);
      return res.json({ Status: "Success" });
    } else {
      return res.json({ Status: "Error", Error: "Wrong Email or Password" });
    }
  });
});

// app.post("/employeelogin", (req, res) => {
//   const sql = "SELECT * FROM employee Where email = ?";
//   con.query(sql, [req.body.email], (err, result) => {
//     if (err)
//       return res.json({ Status: "Error", Error: "Error in running query" });
//     if (result.length > 0) {
//       bcrypt.compare(
//         req.body.password.toString(),
//         result[0].password,
//         (err, response) => {
//           if (err) return res.json({ Error: "Password error" });
//           if (response) {
//             const token = jwt.sign(
//               { role: "employee", id: result[0].id },
//               "jwt-secret-key",
//               { expiresIn: "1d" }
//             );
//             res.cookie("token", token);
//             return res.json({ Status: "Success", id: result[0].id });
//           } else {
//             return res.json({
//               Status: "Error",
//               Error: "Wrong Email or Password",
//             });
//           }
//         }
//       );
//     } else {
//       return res.json({ Status: "Error", Error: "Wrong Email or Password" });
//     }
//   });
// });

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

app.post("/create", upload.single("image"), (req, res) => {
  const sql =
    "INSERT INTO employee (`name`, `email`, `password`, `address`, `salary`, `contact`, `image`) VALUES (?)";
  bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
    if (err) return res.json({ Error: "Error in hashing password" });
    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.address,
      req.body.salary,
      req.body.contact,
      req.file.filename,
    ];
    con.query(sql, [values], (err, result) => {
      if (err) return res.json({ Error: "Inside signup query" });
      return res.json({ Status: "Success" });
    });
  });
});

app.listen(4000, () => {
  console.log("Running on 4000");
});
