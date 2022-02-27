const { ExceptionHandler } = require("winston");
const database = require("../data");

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const day = 86400000;
class Timeblock {
    constructor(id, owner, title, body, time, duration, category, date)  {
        this._id = id;
        this.owner = owner;
        this.title = title;
        this.body = body;
        this.time = time;
        this.duration = duration;
        this.category = category;
        this.date = new Date(date).getTime();
        this.dow = days[new Date(date).getUTCDay()];
    }

    static async getTimeblock(_id) {
        let temp = await database.getTimeblock(_id)
        .catch(() => {
            throw "Error Getting Timeblock";
        });
        if (temp === null) {
            throw new Error("Error: Timeblock does not exist");
        }
        return new Timeblock(temp._id, temp.owner, temp.title, temp.body, temp.time, temp.duration, temp.category, temp.date);
    }

    static async getTimeblocks(owner) {
        const timeblocks = await database.getTimeblocks(owner);
        return timeblocks;
    }

    static async getTimeblocksWeek(owner, week) {
        let days = {};
        for (let i = 0; i < 7; i++) {
            const begin = new Date(week + day * i)
            const end = new Date(week + day * (i + 1));
            const blocks = await database.getTimeblocksWeek(owner, begin, end);
            let today = {};
            blocks.forEach((block) => {
                today = {...today, [block.time]: new Timeblock(block._id, block.owner, block.title, block.body, block.time, block.duration, block.category, block.date)}
            })
            days = {...days, [parseInt(i)]: today}
        }
        return days;
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
        database.deleteTimeblock(this._id);
    }

    getDOWFromUTC(date) {
        return new Date(date).getUTCDay();
    }

    static async verify(timeblock) {

        if (timeblock.duration < 15) return false;
        if (timeblock.time < 0 || timeblock.time > 1425) return false;
        if (timeblock.time + timeblock.duration > 1440) return false;

        const dayUTC = new Date(Date.UTC(timeblock.date.getUTCFullYear(), timeblock.date.getUTCMonth(), timeblock.date.getUTCDate()));
        const week = new Date(dayUTC.getTime() - 86400000 * dayUTC.getUTCDay());
        const weeksBlocks = await Timeblock.getTimeblocksWeek(timeblock.owner, week.getTime());
        const start = timeblock.time;
        const end = timeblock.time + timeblock.duration;
        for (const tbKey of Object.keys(weeksBlocks[timeblock.getDOWFromUTC(timeblock.date)])) {
          const tb = weeksBlocks[timeblock.getDOWFromUTC(timeblock.date)][tbKey];
          if (tb._id === timeblock._id) continue;
          const s = tb.time;
          const e = tb.time + tb.duration;
          if ((start < s && s < end) || (start < e && e < end) || (s < start && start < e) || (s < end && end < e)) {
            return false;
          }
        }

        return true;
    }

    async edit(title, body, time, duration, category, date) {
        this.title = title === "" ? "New Block" : title;
        this.body = body;
        this.time = time;
        this.duration = duration;
        this.category = category;
        this.date = new Date(date);
        this.dow = days[this.date.getUTCDay()];

        const verify = await Timeblock.verify(this);
        if (!verify) {
            throw new Error("Invalid time or duration");
        }

        const something = await database.editTimeblock(this._id, this.title, body, time, duration, category, this.date);

    }

}

module.exports = Timeblock