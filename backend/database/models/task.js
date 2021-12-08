const database = require("../data");
const Bucket = require("./buckets");

const day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

class Task {
    constructor(id, owner, assignees, title, body, buckets, complete)  {
        this.id = id;
        this.owner = owner;
        this.assignees = assignees;
        this.title = title;
        this.body = body;
        this.buckets = buckets;
        this.complete = complete;
    }

    static async getTask(id) {
        let temp = await database.getTask(id)
        .catch(() => {
            throw "Error Getting Task";
        });
        return new Task(temp._id, temp.owner, temp.assignees, temp.title, temp.body, temp.buckets, temp.complete);
    }

    static async getTasks(owner) {
        const tasks = await database.getTasks(owner);
        return tasks;
    }

    static async getTasksWithBuckets(owner, bucket) {
        const buckets = await database.getTasksWithBucket(owner, bucket);
        return buckets;
    }

    static async createTask(owner, assignees, title, body) {
        const buckets = await Task.parseBuckets(owner, body);
        const result = await database.createTask(
            owner,
            assignees,
            title,
            body,
            buckets,
            false)
        .catch(() => {
            throw "Error Creating Task";
        });
        let task = await Task.getTask(result.ops[0]._id);
        return task;
    }

    static async parseBuckets(owner, body) {
        let buckets = [];
        let bucketIds = [];
        let track = false;
        for (const char of body) {
            if (char == "#") {
                track = true;
                buckets.push("");
                continue;
            }
            if ((char === " " || char.charCodeAt(0) === 13) || char === "\n" && track == true) {
                track = false;
            }
            if (track) {
                buckets[buckets.length-1] = buckets[buckets.length-1].concat(char);
            }
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
                const newBucket = await Bucket.createBucket(bucket, owner);
                bucketIds.push(newBucket._id);
            }
        }
        return bucketIds;
    }

    async deleteTask() {
        database.deleteTask(this.id);
    }

    async editTask(assignees, title, body, complete) {
        this.assignees = assignees;
        this.title = title;
        this.body = body;
        this.buckets = await Task.parseBuckets(this.owner, body);
        this.complete = complete;
        const newTask = await database.editTask(this.id, assignees, title, body, this.buckets, this.complete || false);

    }

}

module.exports = Task