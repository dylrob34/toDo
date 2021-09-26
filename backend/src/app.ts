import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const corsOptions = {
  origin: "http://localhost:3000"
}

import indexRouter from "./index";
import authRouter from "./api/auth";
import userRouter from "./api/user";
import teamRouter from "./api/teams";
import taskRouter from "./api/task";
import bucketRouter from "./api/bucket";

const app = express();
const port = 80;

app.use(express.static(__dirname + '/build'));

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

app.use('/', indexRouter);
app.use('/api/auth', authRouter.router);
app.use('/api/user', userRouter);
app.use('/api/teams', teamRouter);
app.use('/api/task', taskRouter);
app.use('/api/buckets', bucketRouter);

app.listen(port, () => {
  console.log(`To Do App listening at http://localhost:${port}`);
})