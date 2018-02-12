// Generates the voting results.

const bodyParser = require('body-parser')
const express = require('express')
const mysql = require('mysql')
const router = express.Router()

const connection = mysql.createConnection({
  host: 'localhost',
  port: '5000',
  user: 'root',
  password: 'password'
})
connection.connect((err) => {
  if (err) {
    console.error('result.js: error connecting: ' + err.stack)
  } else {
    console.log('result.js: Connection established!')
  }
})

router.get('/result', (req, res) => {
  var sql = "SELECT votedFor, COUNT(*) FROM `db`.`evoting` GROUP BY votedFor"
  connection.query(sql, (err, result) => {
    if (err) {
      console.error("result.js: Data couldn't be fetched!")
    } else {
      console.log("result.js: Data fetched successfully!")
      res.send(result)
    }
  })
})

module.exports = router
