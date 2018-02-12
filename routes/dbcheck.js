// This file checks if the connection to the database could be established.

const express = require('express')
const mysql = require('mysql')
const router = express.Router()

const connection = mysql.createConnection({
  host: 'localhost',
  port: '5000',
  user: 'root',
  password: 'password'
})

router.get('/dbcheck', (req, res) => {
  connection.connect((err) => {
    if (err) {
      console.error('dbcheck.js: error connecting: ' + err.stack)
      res.send(`
        <h3>Couldn't connect to database!</h3>
      `)
    } else {
      console.log('dbcheck.js: connected as id ' + connection.threadId)
      res.send(`
        <h3>Connection to DB established!</h3>
      `)
    }
  })
})

module.exports = router
