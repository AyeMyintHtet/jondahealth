const express = require("express");
const cors = require("cors");
const mysql = require('mysql2')
const app = express();
const dbConfig = require("./app/config/db.config");

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: ""
// });
// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
//   /*Create a database named "mydb":*/
//   con.query("CREATE DATABASE mydb", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });
// });

const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: ""
    });
    con.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
      /*Create a database named "mydb":*/
      con.query(`CREATE DATABASE ${dbConfig.DB}`, function (err, result) {
        if (err) throw err;
        console.log("Database created");
        db.sequelize.sync()
          .then(() => {
            console.log("Synced db.");
          })
      });
    });
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to amh application." });
});

// require("./app/routes/turorial.routes")(app);
require("./app/routes/language.routes")(app);
require("./app/routes/record.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
