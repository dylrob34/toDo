const database = require("../data");
const User = require("./user");
const Team = require("./teams");
const Bucket = require("./buckets");

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
        const temp = await database.getTask(id)
        .catch(() => {
            throw "Error Getting Task";
        });
        return new Task(temp._id, temp.user, temp.team, temp.assignees, temp.title, temp.body, temp.buckets);
    }

    static async getTasksWithBuckets(user, bucket) {
        const buckets = await database.getTasksWithBucket(user, bucket);
        return buckets;
    }

    static async createTask(user, team, assignees, title, body) {
        const buckets = await Task.parseBuckets(user, team, body);
        const result = await database.createTask(
            user,
            team,
            assignees,
            title,
            body,
            buckets)
        .catch(() => {
            throw "Error Creating Task";
        });
        var task = await Task.getTask(result.ops[0]._id);
        return task;
    }

    static async parseBuckets(user, team, body) {
        let buckets = [];
        let bucketIds = [];
        let track = false;
        for (const char in body) {
            if (body[char] == "#") {
                track = true;
                buckets.push("");
                continue;
            }
            if ((body[char] === " " || body[char].charCodeAt(0) === 13) && track == true) {
                track = false;
            }
            if (track) {
                buckets[buckets.length-1] = buckets[buckets.length-1].concat(body[char]);
            }
        }
        let owner;
        if (user != null) {
            owner = user;
        } else {
            owner = team;
        }
        const ownerBuckets = await Bucket.getBuckets(owner);
        for (const bucket of buckets) {
            let found = false;
            for (const oBucket of ownerBuckets) {
                if (oBucket.name === bucket) {
                    found = true;
                    bucketIds.push(oBucket._id);
                }
            }
            if (!found) {
                const newBucket = await Bucket.createBucket(bucket, user, team);
                bucketIds.push(newBucket._id);
            }
        }


        return bucketIds;
    }

    async deleteTask() {
        database.deleteTask(this.id);
    }

    async editTask(assignees, title, body) {
        this.assignees = assignees;
        this.title = title;
        this.body = body;
        this.buckets = await Task.parseBuckets(this.user, this.team, body);
        const newTask = await database.editTask(this.id, assignees, title, body, this.buckets);

    }

}

module.exports = Task