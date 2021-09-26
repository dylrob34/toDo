import database from "../data";
import { ObjectId } from "mongodb";

export default class Team {
    _id: ObjectId;
    owner: string;
    name: string;
    admins: string[];
    users: string[];
    buckets: string[];

    constructor(id: ObjectId, owner: string, name: string, admins: string[], users: string[], buckets: string[])  {
        this._id = id;
        this.owner = owner; // email
        this.name = name; // string
        this.admins = admins; // list of emails
        this.users = users; // list of emails
        this.buckets = buckets; // list of strings

    }

    static async getTeam(id: ObjectId) {
        const temp = await database.getTeam(id) as Team;
        return new Team(temp._id, temp.owner, temp.name, temp.admins, temp.users, temp.buckets);
    }

    static async getTeams(email: string) {
        const temp = await database.getTeams(email) as Team[];
        console.log(`Temp: ${temp}`)
        const teams = []
        for (const team of temp) {
            teams.push(new Team(team._id, team.owner, team.name, team.admins, team.users, team.buckets));
        }
        return teams;
    }

    static async createTeam(email: string, name: string) {
        const result = await database.createTeam(
            email,
            name) as any;
        const team = await Team.getTeam(result.ops[0]._id);
        return team;
    }

    async deleteTeam() {
        database.deleteTeam(this._id);
    }

    async editTeam(owner: string, admins: string[], users: string[], name: string) {
        this.owner = owner;
        this.admins = admins;
        this.users = users;
        this.name = name;
        const newTask = await database.updateTeam(this._id, this.owner, this.name, this.admins, this.users);
        const team = await Team.getTeam(this._id);
        return team;
    }

    async addBucket(bucket: string) {
        if (this.buckets.includes(bucket)) {
            throw new Error("Bucket Already Exists");
        }
        this.buckets.push(bucket);
        const res = await database.setTeamBuckets(this._id, this.buckets);
        const tempBuckets: Team = await Team.getTeam(this._id);
        this.buckets = tempBuckets.buckets;
    }

    deleteBucket(bucket: string) {
        if (this.buckets.includes(bucket)) {
            const index = this.buckets.indexOf(bucket);
            this.buckets.splice(index, 1);
            database.setTeamBuckets(this._id, this.buckets);
        } else {
            throw new Error("Bucket Does Not Exist");
        }
    }

    editBucket(oldBucket: string, newBucket: string) {
        if (this.buckets.includes(oldBucket)) {
            const index = this.buckets.indexOf(oldBucket);
            this.buckets[index] = newBucket;
            database.setTeamBuckets(this._id, this.buckets);
        } else {
            throw new Error("Bucket Does Not Exist");
        }
    }

}