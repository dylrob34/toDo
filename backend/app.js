const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
var cors = require('cors');
const logging = require("./logging/logger");
const { verifyToken } = require('./api/auth');
const {errorHandler} = require("./errorHandler");
const {message} = require("./BlockzBot")

corsOptions = {
  origin: "http://localhost:3000"
}

const indexRouter = require('./index');
const authRouter = require('./api/auth').router;
const bugRouter = require('./api/bug');
const userRouter = require('./api/user');
const teamRouter = require('./api/teams');
const taskRouter = require('./api/task');
const bucketRouter = require("./api/bucket");
const timeblockingRouter = require("./api/timeblocking");
const categoriesRouter = require("./api/categories");
const logRouter = logging.router;

const app = express();
const port = process.env.NODE_ENV === "production" ? 80 : 3001;

app.use(express.static(__dirname + "/build"));

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.use(verifyToken);

app.use(logging.logging);

app.use('/api/auth', authRouter);
app.use('/api/bug', bugRouter );
app.use('/api/user', userRouter);
app.use('/api/teams', teamRouter);
app.use('/api/task', taskRouter);
app.use('/api/buckets', bucketRouter);
app.use("/api/timeblocking", timeblockingRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/logs", logRouter);
app.use('*', indexRouter);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`To Do App listening at http://localhost:${port}`);
  message(`Blockz${process.env.NODE_ENV === "piproduction" ? " dev" : ""} listening on port ${port}`);
})