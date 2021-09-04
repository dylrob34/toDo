const database = require("../data");

class Task {
    constructor(id, user, title, body)  {
        this.id = id;
        this.user = user;
        this.title = title;
        this.body = body;

    }

    static async getTask(id) {
        const temp = await database.getTask(id);
        return new Task(id, temp.user, temp.title, temp.body);
    }

    static async createTask(email, title, body) {
        const result = await database.createTask(
            email,
            title,
            body);
        return await Task.getTask(result.ops[0]._id);
    }

    async deleteTask(id) {
        database.deleteTask(id);
    }

    async editTask(title, body) {
        const newTask = await database.updateTask(this.id, body, title);
        this.body = body;
        this.title = title;
    }
}

module.exports = Task