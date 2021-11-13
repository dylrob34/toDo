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


/*******************
 * 
 *******Users*******
 * 
 *******************/


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

/*******************
 * 
 *******Teams*******
 * 
 *******************/

 function createTeam(owner, name) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("teams").insertOne(
            {
                owner,
                name,
                admins: [],
                users: [],
                buckets: []
            }
        )
        .then((result) => {
            resolve(result);
        })
    });
 }

 function getTeam(id) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("teams").findOne({_id: ObjectId(id)})
        .then((team) => {
            resolve(team);
        })
    });
    
}

function getTeams(email) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("teams").find({
            "$or": [
                {owner: email},
                {admins: { "$in": [email]}},
                {users: { "$in": [email]}}
            ]
        })
        .toArray((err, teams) => {
            if (err) {
                reject(err);
            } else {
                resolve(teams);
            }
        })
    });
}

function updateTeam(id, owner, name, admins, users) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("teams").updateOne({_id: ObjectId(id)},
        {
            "$set": {owner, name, admins, users}
        })
        .then((team) => {
            resolve(team);
        });
    });
}

function setTeamBuckets(id, buckets) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("teams").updateOne({_id: ObjectId(id)},
            {
                "$set" : {buckets}
            })
        .then((result) => {
            resolve(result);
        })
    });
}

function deleteTeam(id) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("teams").deleteOne({_id: ObjectId(id)})
        .then((team) => {
            resolve(team);
        });
    });
}

/*******************
 * 
 ******Buckets******
 * 
 *******************/

 function getBucket(_id) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("buckets").findOne({_id: ObjectId(_id)})
        .then((bucket) => {
            resolve(bucket);
        });
    });
 }

 function getBuckets(owner) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("buckets").find({
            "$or": [
                {user: owner},
                {team: owner}
            ]
        }).toArray()
        .then((buckets) => {
            resolve(buckets);
        });
    });
 }

 function getBucketByName(owner, name) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("buckets").find({
            "$or": [
                {user: owner},
                {team: owner}
            ]
        }).toArray()
        .then((result) => {
            resolve(result[0]);
        })
    });
 }

 function createBucket(name, user, team) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("buckets").insertOne(
            {
                name,
                user,
                team
            }
        )
        .then((result) => {
            resolve(result);
        })
    });
 }

 function editBucket(_id, name) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("buckets").updateOne({_id: ObjectId(_id)},
        {
            "$set": {name}
        })
        .then((bucket) => {
            resolve(bucket);
        });
    });
 }

 function deleteBucket(_id) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("buckets").deleteOne({_id: ObjectId(_id)})
        .then((bucket) => {
            resolve(bucket);
        });
    });
}

/*******************
 * 
 *******TASKS*******
 * 
 *******************/

function getTasks(email) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("tasks").find({user: email}).toArray()
        .then((tasks) => {
            resolve(tasks);
        })
    });
}

function getTeamTasks(id) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("tasks").find({team: id}).toArray()
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

function getTasksWithBucket(owner, bucket) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("tasks").find(
            {
                "$or": [
                    {user: owner},
                    {team: owner}
                ],
                buckets: { "$in": [ObjectId(bucket)]}
            }).toArray()
        .then((tasks) => {
            resolve(tasks);
        });
    });
}

function editTask(id, assignees, title, body, buckets, complete) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("tasks").updateOne({_id: ObjectId(id)},
        {
            "$set": {assignees, title, body, buckets, complete}
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

function createTask(user, team, assignees, title, body, buckets, complete) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("tasks").insertOne(
            {
                user,
                team,
                assignees,
                title,
                body,
                buckets,
                complete
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
    createTeam,
    getTeam,
    getTeams,
    updateTeam,
    setTeamBuckets,
    deleteTeam,
    getBucket,
    getBucketByName,
    getBuckets,
    createBucket,
    editBucket,
    deleteBucket,
    getTasks,
    getTeamTasks,
    getTask,
    getTasksWithBucket,
    editTask,
    deleteTask,
    createTask
}