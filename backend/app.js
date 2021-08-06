const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
var cors = require('cors');

corsOptions = {
  origin: "http://localhost:3000"
}

const indexRouter = require('./index');
const authRouter = require('./api/auth').router;
const userRouter = require('./api/user');
const toDoRouter = require('./api/toDo');

const app = express();
const port = 80;

app.use(express.static(__dirname + '/build'));

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/toDo', toDoRouter);

app.listen(port, () => {
  console.log(`To Do App listening at http://localhost:${port}`);
})