const database = require("../data");

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const day = 86400000;
class Timeblock {
    constructor(id, owner, title, body, time, duration, category, date)  {
        this.id = id;
        this.owner = owner;
        this.title = title;
        this.body = body;
        this.time = time;
        this.duration = duration;
        this.category = category;
        this.date = new Date(date);
        this.dow = days[this.date.getUTCDay()];
    }

    static async getTimeblock(id) {
        let temp = await database.getTimeblock(id)
        .catch(() => {
            throw "Error Getting Timeblock";
        });
        return new Timeblock(temp._id, temp.owner, temp.title, temp.body, temp.time, temp.duration, temp.category, temp.date);
    }

    static async getTimeblocks(owner) {
        const timeblocks = await database.getTimeblocks(owner);
        return timeblocks;
    }

    static async getTimeblocksWeek(owner, week) {
        const begin = new Date(week);
        const end = new Date(week + day * 7);
        const timeblocks = await database.getTimeblocksWeek(owner, begin, end);
        return timeblocks;
    }

    static async createTimeblock(owner, title, body, time, duration, category, date) {
        const result = await database.createTimeblock(
            owner,
            title,
            body,
            time,
            duration,
            category,
            new Date(date))
        .catch(() => {
            throw "Error Creating Timeblock";
        });
        let timeblock = await Timeblock.getTimeblock(result.ops[0]._id);
        return timeblock;
    }

    async delete() {
        database.deleteTimeblock(this.id);
    }

    async edit(title, body, time, duration, category, date) {
        this.title = title;
        this.body = body;
        this.time = time;
        this.duration = duration;
        this.category = category;
        this.date = new Date(date);
        this.dow = days[this.date.getUTCDay()];
        const something = await database.editTimeblock(this.id, title, body, time, duration, category, this.date);

    }

}

module.exports = Timeblock