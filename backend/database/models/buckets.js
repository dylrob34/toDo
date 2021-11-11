const database = require("../data");
const User = require("./user");
const Team = require("./teams");

class Bucket {
    constructor(_id, name, user, team)  {
        this._id = _id;
        this.name = name;
        this.user = user;
        this.team = team;
    }

    static async getBucket(_id) {
        const temp = await database.getBucket(_id);
        return new Bucket(temp._id, temp.name, temp.user, temp.team);
    }

    static async getBucketByName(owner, name) {
        const temp = await database.getBucketByName(owner, name);
        return new Bucket(temp._id, temp.name, temp.user, temp.team);
    }

    static async getBuckets(owner) {
        const tempBuckets = await database.getBuckets(owner)
        .catch(() => {
            throw "Error Getting Buckets"
        });
        let buckets = [];
        for (const bucket of tempBuckets) {
            buckets.push(new Bucket(bucket._id, bucket.name, bucket.user, bucket.team));
        }
        return buckets;
    }

    static async createBucket(name, user, team) {
        const result = await database.createBucket(
            name,
            user,
            team);
        var bucket = await Bucket.getBucket(result.ops[0]._id);
        if (user !== null) {
            let use = await User.getUser(user);
            use.addBucket(bucket._id);
        } else {
            let team = await Team.getTeam(team);
            team.addBucket(bucket._id);
        }
        return bucket;
    }

    async editBucket(name) {
        this.name = name;
        await database.editBucket(this._id, this.name);
    }

    async deleteBucket() {
        return await database.deleteBucket(this._id);
    }

}

module.exports = Bucket