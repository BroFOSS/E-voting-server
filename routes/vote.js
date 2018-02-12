// Stores the votes received to the database.

const bodyParser = require('body-parser')
const express = require('express')
const mysql = require('mysql')
const app = express()
const router = express.Router()
const jsonParser = bodyParser.json()

const connection = mysql.createConnection({
  host: 'localhost',
  port: '5000',
  user: 'root',
  password: 'password'
})
connection.connect((err) => {
  if (err) {
    console.error('vote.js: error connecting: ' + err.stack)
  } else {
    console.log('vote.js: Connection established!')
  }
})

router.get('/vote', (req, res) => {
  res.send(`
    <h2>GET requests are not allowed on this route!</h2>
    <h3>Only POST requests allowed.</h3>
  `)
})

router.post('/vote', jsonParser, (req, res) => {
  console.log('vote.js: ')
  var sql = "INSERT INTO `db`.`evoting` (state, constituency, votedFor) VALUES ?"
  var value = [Object.values(req.body)]
  connection.query(sql, [value], (err, result) => {
    if (err) {
      console.error("vote.js: Entry into db failed!")
      res.status(500).send()
    } else {
      console.log("vote.js: Entry into db successful! ID: " + result.insertId)
      res.status(200).send()
    }
  })
})

module.exports = router
