const database = require("../data");

class Team {
    constructor(id, owner, name, admins, users, buckets)  {
        this.id = id;
        this.owner = owner; // email
        this.name = name; // string
        this.admins = admins; // list of emails
        this.users = users; // list of emails
        this.buckets = buckets; // list of strings

    }

    static async getTeam(id) {
        const temp = await database.getTeam(id);
        const buckets = temp.buckets.map((buck) => {
            return buck.toString()
        })
        return new Team(temp._id, temp.owner, temp.name, temp.admins, temp.users, buckets);
    }

    static async getTeams(email) {
        const temp = await database.getTeams(email);
        console.log(`Temp: ${temp}`)
        var teams = []
        for (var i = 0; i < temp.length; i++) {
            teams.push(new Team(temp[i]._id, temp[i].owner, temp[i].name, temp[i].admins, temp[i].users, temp[i].buckets));
        }
        return teams;
    }

    static async createTeam(email, name) {
        const result = await database.createTeam(
            email,
            name);
        var team = await Team.getTeam(result.ops[0]._id);
        return team;
    }

    async deleteTeam() {
        return await database.deleteTeam(this.id);
    }

    async editTeam(owner, admins, users, name) {
        this.owner = owner;
        this.admins = admins;
        this.users = users;
        this.name = name;
        const newTask = await database.updateTeam(this.id, this.owner, this.name, this.admins, this.users);
        var team = await Team.getTeam(this.id);
        return team;
    }

    async addBucket(bucket) {
        if (this.buckets.includes(bucket)) {
            throw "Bucket Already Exists";
        }
        this.buckets.push(bucket);
        const res = await database.setTeamBuckets(this.id, this.buckets);
        this.buckets = await Team.getTeam(this.id).buckets;
    }

    deleteBucket(bucket) {
        if (this.buckets.includes(bucket)) {
            const index = this.buckets.indexOf(bucket);
            this.buckets.splice(index, 1);
            database.setTeamBuckets(this.id, this.buckets);
        } else {
            throw "Bucket Does Not Exist";
        }
    }

    editBucket(oldBucket, newBucket) {
        if (this.buckets.includes(oldBucket)) {
            const index = this.buckets.indexOf(oldBucket);
            this.buckets[index] = newBucket;
            database.setTeamBuckets(this.id, this.buckets);
        } else {
            throw "Bucket Does Not Exist";
        }
    }

}

module.exports = Team