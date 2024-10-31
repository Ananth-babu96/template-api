import express from "express";
import cors from "cors";
import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const server = express();

server.use(express.static("public"));

server.use(
   cors({
      origin: " https://ananth-babu96.github.io/template-client/",
   })
);
server.use(express.json());

const db = mysql.createConnection({
   host: process.env.HOST,
   user: process.env.USER,
   database: process.env.DB,
   password: process.env.PW,
});

const port = process.env.PORT;

server.get("/", (req, res) => {
   const sql = "SELECT * FROM images";
   db.query(sql, (err, result) => {
      if (err) {
         res.send("some error");
      } else {
         res.json(result);
      }
   });
});

server.listen(port, () => console.log(`running at ${port}`));
