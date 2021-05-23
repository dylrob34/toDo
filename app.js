const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser');

const indexRouter = require('./build/index');
const authRouter = require('./api/auth');
const userRouter = require('./api/user');

const app = express()
const port = 3000

console.log("path is: ", __dirname + '/public');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})