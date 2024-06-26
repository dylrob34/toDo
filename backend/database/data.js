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
 *******Bugs*******
 * 
 *******************/

 function submitBugSuggestion(type, page, desc) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("bugs").insertOne({
            type,
            page,
            desc
        })
        .then((result) => {
            resolve(result);
        })
    })
}

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

function createUser(email, password, firstName, lastName, buckets, gender, day, month, year, timeSetting, showCompleted) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("users").insertOne(
            {
                email,
                password,
                firstName,
                lastName,
                buckets,
                gender,
                day,
                month,
                year,
                timeSetting,
                showCompleted
            }
        )
        .then((result) => {
            resolve(result);
        })
    });
}

const updateUser = (email, firstName, lastName, gender, day, month, year, timeSetting, showCompleted) => {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("users").updateOne({email},
        {
            "$set": {firstName, lastName, gender, day, month, year, timeSetting, showCompleted}
        })
        .then((user) => {
            resolve(user);
        });
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
        client.db("toDo").collection("buckets").find({owner}).toArray()
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

 function createBucket(owner, name) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("buckets").insertOne(
            {
                owner,
                name
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

function getTasks(owner) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("tasks").find({owner}).toArray()
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
                owner,
                buckets: { "$in": [ObjectId(bucket)]}
            }).toArray()
        .then((tasks) => {
            resolve(tasks);
        });
    });
}

function editTask(id, assignees, title, body, buckets, complete, duedate) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("tasks").updateOne({_id: ObjectId(id)},
        {
            "$set": {assignees, title, body, buckets, complete, duedate}
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

function createTask(owner, assignees, title, body, buckets, complete, duedate) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("tasks").insertOne(
            {
                owner,
                assignees,
                title,
                body,
                buckets,
                complete,
                duedate: null,
            }
        )
        .then((result) => {
            resolve(result);
        })
    });
}

/*********************
 * 
 ****Timeblocking*****
 * 
 *********************/

 function createTimeblock(owner, title, body, time, duration, category, date) {
     return new Promise((resolve, reject) => {
         client.db("toDo").collection("timeblocking").insertOne({
             owner,
             title,
             body,
             time,
             duration,
             category,
             date
         })
         .then((result) => {
             resolve(result);
         })
     })
 }

 function getTimeblock(id) {
     return new Promise((resolve, reject) => {
         client.db("toDo").collection("timeblocking").findOne({_id: ObjectId(id)})
         .then((timeblock) => {
             resolve(timeblock);
         })
     })
 }

 function getTimeblocks(owner) {
     return new Promise((resolve, reject) => {
         client.db("toDo").collection("timeblocking").find({owner}).toArray()
         .then((timeblocks) => {
             resolve(timeblocks);
         })
     })
 }

 const getTimeblocksWeek = (owner, begin, end) => {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("timeblocking").find({
            owner,
            date: {
                $gte: begin,
                $lt: end
            }
        }).toArray()
        .then((timeblocks) => {
            resolve(timeblocks);
        })
    })
 }

 function editTimeblock(id, title, body, time, duration, category, date) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("timeblocking").updateOne({_id: ObjectId(id)},
        {
            "$set": {title, body, time, duration, category, date}
        })
        .then((timeblock) => {
            resolve(timeblock);
        });
    });
}

 function deleteTimeblock(id) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("timeblocking").deleteOne({_id: ObjectId(id)})
        .then((timeblock) => {
            resolve(timeblock);
        });
    });
}

/*********************
 * 
 ******Categories*****
 * 
 *********************/

 function createCategory(owner, title, color) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("categories").insertOne({
            owner,
            title,
            color
        })
        .then((result) => {
            resolve(result);
        })
    })
}

function getCategory(id) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("categories").findOne({_id: ObjectId(id)})
        .then((category) => {
            resolve(category);
        })
    })
}

function getCategories(owner) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("categories").find({owner}).toArray()
        .then((categories) => {
            resolve(categories);
        })
    })
}

function editCategory(id, title, color) {
   return new Promise((resolve, reject) => {
       client.db("toDo").collection("categories").updateOne({_id: ObjectId(id)},
       {
           "$set": {title, color}
       })
       .then((category) => {
           resolve(category);
       });
   });
}

function deleteCategory(id) {
   return new Promise((resolve, reject) => {
       client.db("toDo").collection("categories").deleteOne({_id: ObjectId(id)})
       .then((category) => {
           resolve(category);
       });
   });
}

module.exports = {
    // bugs
    submitBugSuggestion,
    // users
    getUser,
    createUser,
    updateUser,
    // teams
    createTeam,
    getTeam,
    getTeams,
    updateTeam,
    setTeamBuckets,
    deleteTeam,
    // buckets
    getBucket,
    setBuckets,
    getBucketByName,
    getBuckets,
    createBucket,
    editBucket,
    deleteBucket,
    // tasks
    getTasks,
    getTask,
    getTasksWithBucket,
    editTask,
    deleteTask,
    createTask,
    // timeblocking
    createTimeblock,
    getTimeblock,
    getTimeblocks,
    getTimeblocksWeek,
    editTimeblock,
    deleteTimeblock,
    // Categories
    createCategory,
    getCategory,
    getCategories,
    editCategory,
    deleteCategory,
}