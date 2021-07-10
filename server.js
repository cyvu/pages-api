'use strict'
const debug = true;
const express = require("express")
const app = express()

const port = 3000

// Run the application
app.listen(port, () => {
  console.log(`running at port ${port}`)
})

// Create mysql connection
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'pages'
})


// Get root
app.get("/", (request, response) => {
  debug ? console.log('/ called') : ""
  response.json({message: 'Root page'})
})

// Get example
// in: http://localhost:3000/get?name=test&condition=true
// put: {"message":"Get JSON Example","name":"test","condition":"true"}
app.get("/get", (request, response) => {
  debug ? console.log('/get called') : ""
  const req = request.query
  response.json({message: 'Get JSON Example', name: req.name, condition: req.condition})
})

/* Contact */
/***********/

// INSERT
app.get("/contact/add", (request, response) => {
  debug ? console.log('/contact/add called') : ""
  const req = request.query
  const query = "INSERT INTO contact_list SET ?"
  var CURRENT_TIMESTAMP = mysql.raw('now()')
  const params = {name:req.name, mobile:req.mobile, email:req.email, created_date:CURRENT_TIMESTAMP}
  
  connection.query(query, params, (err, result, fields) => {
    if (err) throw err
    response.json({saved:result.affectedRows, inserted_id:result.insertId})
  })
})

// UPDATE
app.get("/contact/update", (request, response) => {
  debug ? console.log('/contact/update called') : ""
  const req = request.query
  const query = "UPDATE contact_list SET mobile=? WHERE name=?"
  const params = [req.mobile, req.name]

  connection.query(query, params, (err, result, fields) => {
    if (err) throw err
    response.json({updated:result.affectedRows})
  })
})

// DELETE
// TODO delete from id, not name
app.get("/contact/delete", (request, response) => {
  debug ? console.log('/contact/delete called') : ""
  const req = request.query
  const query = "DELETE FROM contact_list WHERE name=?"
  const params = [req.name]

  connection.query(query, params, (err, result, fields) => {
    if (err) throw err
    response.json({deleted:result.affectedRows})
  })
})

// GET single contact
app.get("/contact", (request, response) => {
  debug ? console.log('/contact called') : ""
  const req = request.query
  const query = 'SELECT * FROM contact_list WHERE name=?'
  const params = [req.name]

  connection.query(query, params, (err, rows) => {
    if (err) throw err
    response.json({data:rows})
  })
})

// GET all contacts
// TODO: use limit
app.get("/contacts", (request, response) => {
  debug ? console.log('/contacts called') : ""
  const query = 'SELECT * FROM contact_list'
  connection.query(query, (err, rows) => {
    if (err) throw err
    response.json({data:rows})
  })
})

// GET search contact
app.get("/contact/search", (request, response) => {
  debug ? console.log('/contact/search called') : ""
  const req = request.query
  console.log(req)
  const search_val = mysql.raw("'%" + req.query + "%'")
  const query = 'SELECT * FROM contact_list WHERE name LIKE ? OR mobile LIKE ?'
  const params = [search_val, search_val]

  connection.query(query, params, (err, rows) => {
    if (err) throw err
    response.json({data:rows})
  })
})


/************/
/* /Contact */
