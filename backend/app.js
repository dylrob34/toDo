const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
var cors = require('cors');

corsOptions = {
  origin: "http://localhost:3000"
}

const indexRouter = require('./public/index');
const authRouter = require('./api/auth').router;
const userRouter = require('./api/user');

const app = express();
const port = 80;

app.use(express.static(__dirname + '/public'));

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(port, () => {
  console.log(`To Do App listening at http://localhost:${port}`);
})

