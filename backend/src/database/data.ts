import { MongoClient, ObjectId } from "mongodb";
import User from "./models/user";


// Connection URI
const uri = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@todo.5yfiz.mongodb.net/toDo?retryWrites=true&w=majority";
// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect((err: any, c: MongoClient) => {
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


function getUser(email: string) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("users").findOne({email})
        .then((user: User) => {
            resolve(user);
        })
    });

}

function createUser(email: string, password: string, firstName:string, lastName:string, buckets: string[]) {
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
        .then((result: any) => {
            resolve(result);
        })
    });
}

function setBuckets(email: string, buckets: string[]) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("users").updateOne({email},
            {
                "$set" : {buckets}
            })
        .then((result: any) => {
            resolve(result);
        })
    });
}

/*******************
 *
 *******Teams*******
 *
 *******************/

 function createTeam(owner: string, name: string) {
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
        .then((result: any) => {
            resolve(result);
        })
    });
 }

 function getTeam(id: string) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("teams").findOne({_id: ObjectId(id)})
        .then((team: any) => {
            resolve(team);
        })
    });

}

function getTeams(email: string) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("teams").find({
            "$or": [
                {owner: email},
                {admins: { "$in": [email]}},
                {users: { "$in": [email]}}
            ]
        })
        .toArray((err: any, teams: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(teams);
            }
        })
    });
}

function updateTeam(id: string, owner: string, name: string, admins: string[], users: string[]) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("teams").updateOne({_id: ObjectId(id)},
        {
            "$set": {owner, name, admins, users}
        })
        .then((team: any) => {
            resolve(team);
        });
    });
}

function setTeamBuckets(id: string, buckets: string[]) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("teams").updateOne({_id: ObjectId(id)},
            {
                "$set" : {buckets}
            })
        .then((result: any) => {
            resolve(result);
        })
    });
}

function deleteTeam(id: string) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("teams").deleteOne({_id: ObjectId(id)})
        .then((team: any) => {
            resolve(team);
        });
    });
}

/*******************
 *
 *******TASKS*******
 *
 *******************/

function getTasks(email: string) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("tasks").find({user: email}).toArray()
        .then((tasks: any) => {
            resolve(tasks);
        })
    });
}

function getTeamTasks(id: string) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("tasks").find({team: id}).toArray()
        .then((tasks: any) => {
            resolve(tasks);
        })
    });
}

function getTask(id: string) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("tasks").findOne({_id: ObjectId(id)})
        .then((task: any) => {
            resolve(task);
        });
    });
}

function updateTask(id: string, assignees: string[], title: string, body: string, buckets: string[]) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("tasks").updateOne({_id: ObjectId(id)},
        {
            "$set": {assignees, title, body, buckets}
        })
        .then((task: any) => {
            resolve(task);
        });
    });
}

function deleteTask(id: any) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("tasks").deleteOne({_id: ObjectId(id)})
        .then((task: any) => {
            resolve(task);
        });
    });
}

function createTask(user: string, team: string, assignees: string[], title: string, body: string, buckets: string[]) {
    return new Promise((resolve, reject) => {
        client.db("toDo").collection("tasks").insertOne(
            {
                user,
                team,
                assignees,
                title,
                body,
                buckets
            }
        )
        .then((result: any) => {
            resolve(result);
        })
    });
}

export default {
    getUser,
    createUser,
    setBuckets,
    createTeam,
    getTeam,
    getTeams,
    updateTeam,
    setTeamBuckets,
    deleteTeam,
    getTasks,
    getTeamTasks,
    getTask,
    updateTask,
    deleteTask,
    createTask
}