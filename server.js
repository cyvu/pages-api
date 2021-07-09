const express = require("express");
const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.json({message: 'Root page'});
  console.log('root called');
});

app.get("/get-data", (req, res) => {
  const q = req.query;
  res.json({message: 'Get JSON Example', name: q.name});
  console.log('get-data called');
});

// Run the application
app.listen(port, () => {
  console.log(`running at port ${port}`);
});

// Create mysql connection
//const mysql = require('mysql');
/*const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'test',
  database: 'api-test'
});*/
