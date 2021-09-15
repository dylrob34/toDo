const database = require("../data");
const User = require("./user");
const Team = require("./teams")

const day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

class Task {
    constructor(id, user, team, assignees, title, body, buckets)  {
        this.id = id;
        this.user = user;
        this.team = team;
        this.assignees = assignees;
        this.title = title;
        this.body = body;
        this.buckets = buckets;

    }

    static async getTask(id) {
        const temp = await database.getTask(id);
        return new Task(temp._id, temp.user, temp.team, temp.assignees, temp.title, temp.body, temp.buckets);
    }

    static async createTask(user, team, assignees, title, body) {
        const buckets = Task.parseBuckets(body);
        const result = await database.createTask(
            user,
            team,
            assignees,
            title,
            body,
            buckets);
        var task = await Task.getTask(result.ops[0]._id);
        await task.updateBuckets();
        return task;
    }

    static parseBuckets(body) {
        let buckets = [];
        let track = false;
        for (const char in body) {
            if (body[char] == "#") {
                track = true;
                buckets.push("");
                continue;
            }
            if (body[char] == " " && track == true) {
                track = false;
            }
            if (track) {
                buckets[buckets.length-1] = buckets[buckets.length-1].concat(body[char]);
            }
        }
        return buckets;
    }

    async updateBuckets() {
        var owner = null;
        if (this.user != undefined) {
            owner = await User.getUser(this.user);
        } else {
            owner = await Team.getTeam(this.team);
        }
        this.buckets.forEach(async (bucket) =>  {
            try {
                await owner.addBucket(bucket);
            } catch (error) {
                if (error != "Bucket Already Exists") {
                    throw "An unknown error has occured";
                }
            }
        })
    }

    async deleteTask() {
        database.deleteTask(this.id);
    }

    async editTask(assignees, title, body) {
        this.assignees = assignees;
        this.title = title;
        this.body = body;
        this.buckets = Task.parseBuckets(body);
        this.updateBuckets();
        const newTask = await database.updateTask(this.id, assignees, title, body, this.buckets);

    }

}

module.exports = Task