require('dotenv').config()
const express = require('express')
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');
const mysql = require('mysql2')

// const apiRoutes = require('./routes/api');

const app = express()
const port = process.env.PORT || 8000

//config template engine
configViewEngine(app) 

//khai báo route
app.use('/',webRoutes);
// app.use('/api',apiRoutes);


app.listen(port,() => {
  console.log(`Example app listening on port ${port}`)
})


