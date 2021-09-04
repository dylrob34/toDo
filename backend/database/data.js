const { MongoClient, ObjectId } = require("mongodb");



// Connection URI
const uri = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@todo.5yfiz.mongodb.net/toDo?retryWrites=true&w=majority";
// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect((err, client) => {
  if (err) {
      console.log("Error connecting to database...");
  } else {
      console.log("Successfully Connected to Database");
  }
});


function getUser(email) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("users").findOne({email})
        .then((user) => {
            resolve(user);
        })
    });
    
}

function createUser(email, password, firstName, lastName, buckets) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("users").insertOne(
            {
                email,
                password,
                firstName,
                lastName,
                buckets
            }
        )
        .then((result) => {
            resolve(result);
        })
    });
}

function setBuckets(email, buckets) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("users").updateOne({email},
            {
                "$set" : {buckets}
            })
        .then((result) => {
            resolve(result);
        })
    });
}

function getTasks(email) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("tasks").find({user: email}).toArray()
        .then((tasks) => {
            resolve(tasks);
        })
    });
}

function getTask(id) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("tasks").findOne({_id: ObjectId(id)})
        .then((task) => {
            resolve(task);
        });
    });
}

function updateTask(id, title, body, buckets) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("tasks").updateOne({_id: ObjectId(id)},
        {
            "$set": {title, body, buckets}
        })
        .then((task) => {
            resolve(task);
        });
    });
}

function deleteTask(id) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("tasks").deleteOne({_id: ObjectId(id)})
        .then((task) => {
            resolve(task);
        });
    });
}

function createTask(email, title, body, buckets) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("tasks").insertOne(
            {
                user: email,
                title,
                body,
                buckets
            }
        )
        .then((result) => {
            resolve(result);
        })
    });
}

module.exports = {
    getUser,
    createUser,
    setBuckets,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
    createTask
}