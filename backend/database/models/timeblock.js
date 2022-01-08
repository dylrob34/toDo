const database = require("../data");

class Timeblock {
    constructor(id, owner, title, body, dow, time, duration, category)  {
        this.id = id;
        this.owner = owner;
        this.title = title;
        this.body = body;
        this.dow = dow;
        this.time = time;
        this.duration = duration;
        this.category = category;
    }

    static async getTimeblock(id) {
        let temp = await database.getTimeblock(id)
        .catch(() => {
            throw "Error Getting Timeblock";
        });
        return new Timeblock(temp._id, temp.owner, temp.title, temp.body, temp.dow, temp.time, temp.duration, temp.category);
    }

    static async getTimeblocks(owner) {
        const tasks = await database.getTimeblocks(owner);
        return tasks;
    }

    static async createTimeblock(owner, title, body, dow, time, duration, category) {
        const result = await database.createTimeblock(
            owner,
            title,
            body,
            dow,
            time,
            duration,
            category)
        .catch(() => {
            throw "Error Creating Timeblock";
        });
        let timeblock = await Timeblock.getTimeblock(result.ops[0]._id);
        return timeblock;
    }

    async delete() {
        database.deleteTimeblock(this.id);
    }

    async edit(title, body, dow, time, duration, category) {
        this.title = title;
        this.body = body;
        this.dow = dow;
        this.time = time;
        this.duration = duration;
        this.category = category;
        const something = await database.editTimeblock(this.id, title, body, dow, time, duration, category);

    }

}

module.exports = Timeblock