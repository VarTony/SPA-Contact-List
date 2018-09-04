const mysql = require('mysql')
const express = require('express')
const bodyParser = require('body-parser')


// MySQL

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database: 'nan-test-app'
})



// =======
// EXPRESS
// =======

const app = express()

app.use(bodyParser.json())

// app.use((req, res, next) => {
//   res.append('Access-Control-Allow-Origin', '*')
//   res.append('Access-Control-Allow-Headers', 'Content-Type')
//   next()
// })



// HELPER FUNCTIONS

function getUserById(id, res) {
  connection.query('SELECT * FROM users WHERE id=' + id, (err, rows, fields) => {
    if (err) throw err
    res.send(rows)
  })
}



// ROUTES

// All users
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, rows, fields) => {
    if (err) throw err
    res.send(rows)
  })
})

// Get specified user
app.get('/users/:id', (req, res) => {
  getUserById(req.params.id, res)
})

// Add user
app.post('/users/add', (req, res) => {
  connection.query(
    'INSERT INTO users (name,phone,email) VALUES (\''+req.body.name+'\',\''+req.body.phone+'\',\''+req.body.email+'\')',
    (err, rows, fields) => {
      if (err) throw err
      res.append('Access-Control-Allow-Headers', 'Content-Type')
      res.send(rows)
    }
  )
})

// Update user
app.post('/users/:id', (req, res) => {
  connection.query(
    `UPDATE users SET name='${req.body.name}', phone='${req.body.phone}', email='${req.body.email}' WHERE id=${req.params.id}`,
    (err, rows, fields) => {
      if (err) throw err
      res.append('Access-Control-Allow-Headers', 'Content-Type')

      getUserById(req.params.id, res)
    }
  )
})

// Delete user
app.delete('/users/:id', (req, res) => {
  connection.query(
    'DELETE FROM users WHERE id = ' + req.params.id,
    (err, rows, fields) => {
      if (err) throw err
      res.send({
        result: 'success'
      })
    }
  )
})


app.listen(3333, () => console.log('Listening on 3333..'))
