import database from "../data";
import User from "./user";
import Team from "./teams";
import {ObjectId} from "mongodb";

const day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default class Task {
    _id: ObjectId;
    user: string;
    team: string;
    assignees: string[];
    title: string;
    body: string;
    buckets: string[];

    constructor(id: ObjectId, user: string, team: string, assignees: string[], title: string, body: string, buckets: string[])  {
        this._id = id;
        this.user = user;
        this.team = team;
        this.assignees = assignees;
        this.title = title;
        this.body = body;
        this.buckets = buckets;

    }

    static async getTask(id: ObjectId): Promise<Task> {
        const temp = await database.getTask(id) as Task;
        return new Task(temp._id, temp.user, temp.team, temp.assignees, temp.title, temp.body, temp.buckets);
    }

    static async createTask(user: string, team: string, assignees: string[], title: string, body: string): Promise<Task> {
        const buckets = Task.parseBuckets(body);
        const result = await database.createTask(
            user,
            team,
            assignees,
            title,
            body,
            buckets) as any;
        const task = await Task.getTask(result.ops[0]._id);
        await task.updateBuckets();
        return task;
    }

    static parseBuckets(body: string) {
        const buckets = [];
        let track = false;
        for (const char of body) {
            if (char === "#") {
                track = true;
                buckets.push("");
                continue;
            }
            if (char === " " && track === true) {
                track = false;
            }
            if (track) {
                buckets[buckets.length-1] = buckets[buckets.length-1].concat(char);
            }
        }
        return buckets;
    }

    async updateBuckets() {
        let owner: User | Team = null;
        if (this.user !== undefined) {
            owner = await User.getUser(this.user);
        } else {
            owner = await Team.getTeam(this.team);
        }
        this.buckets.forEach(async (bucket) =>  {
            try {
                await owner.addBucket(bucket);
            } catch (error) {
                if (error !== "Bucket Already Exists") {
                    throw new Error("An unknown error has occured");
                }
            }
        })
    }

    async deleteTask() {
        database.deleteTask(this._id);
    }

    async editTask(assignees: string[], title: string, body: string) {
        this.assignees = assignees;
        this.title = title;
        this.body = body;
        this.buckets = Task.parseBuckets(body);
        this.updateBuckets();
        const newTask = await database.updateTask(this._id, assignees, title, body, this.buckets);

    }

}