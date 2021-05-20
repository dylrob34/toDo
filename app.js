const express = require('express')
require('dotenv').config()
const MongoClient = require("mongodb").MongoClient;

var indexRouter = require('./routes/index');

const app = express()
const port = 3000

app.use('/', indexRouter);

// Connection URI
const uri = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@todo.5yfiz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  client.db("toDo").collection("users").findOne({firstName : "Dylan"})
  .then(something => { console.log(something)})
  // perform actions on the collection object
  .then(anything => {client.close()});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

client.close();