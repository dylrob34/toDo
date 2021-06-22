const MongoClient = require("mongodb").MongoClient;



// Connection URI
const uri = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@todo.5yfiz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  console.log("Connected to database");
});

function getUser(email) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("users").findOne({email})
        .then((user) => {
            resolve(user);
        })
    });
    
}

function createUser(email, password, firstName, lastName) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("users").insertOne(
            {
                email,
                password,
                firstName,
                lastName,
                toDos: []
            }
        )
        .then((result) => {
            resolve(result);
        })
    });
}

module.exports = {
    getUser,
    createUser
}