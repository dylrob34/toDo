const database = require("../data");
const User = require("./user");

const day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

class Task {
    constructor(id, user, title, body, buckets)  {
        this.id = id;
        this.user = user;
        this.title = title;
        this.body = body;
        this.buckets = buckets;

    }

    static async getTask(id) {
        const temp = await database.getTask(id);
        return new Task(id, temp.user, temp.title, temp.body, temp.buckets);
    }

    static async createTask(email, title, body) {
        const buckets = Task.parseBuckets(body);
        const result = await database.createTask(
            email,
            title,
            body,
            buckets);
        var task = await Task.getTask(result.ops[0]._id);
        await task.updateUserBuckets();
        return task;
    }

    static parseBuckets(body) {
        let buckets = [];
        let track = false;
        for (const char in body) {
            if (body[char] == "#") {
                track = true;
                buckets.push("");
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

    async updateUserBuckets() {
        const user = await User.getUser(this.user);
        this.buckets.forEach(async (bucket) =>  {
            try {
                await user.addBucket(bucket);
            } catch (error) {
                if (error != "Bucket Already Exists") {
                    throw "An unknown error has occured";
                }
            }
        })
    }

    async deleteTask(id) {
        database.deleteTask(id);
    }

    async editTask(title, body) {
        this.title = title;
        this.body = body;
        this.buckets = Task.parseBuckets(body);
        this.updateUserBuckets();
        const newTask = await database.updateTask(this.id, title, body, this.buckets);

    }

}

module.exports = Task