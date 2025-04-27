const express = require('express')
// const { hostname } = require('os')
const path = require('path')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 8000
// const hostname = 'localhost'

console.log(process.env)

app.set('view engine','ejs')
app.set('views',path.join( __dirname ,'view'))


app.get('/', (req, res) => {
  res.render('index')
})

app.get('/h1', (req, res) => {
  res.send('<h1>Nguyễn Thanh Sang<h1>')
})

app.listen(port,() => {
  console.log(`Example app listening on port ${port}`)
})