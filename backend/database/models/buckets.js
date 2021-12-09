const database = require("../data");
const Owner = require("./owner");

class Bucket {
    constructor(_id, name, owner)  {
        this._id = _id;
        this.name = name;
        this.owner = owner;
    }

    static async getBucket(_id) {
        const temp = await database.getBucket(_id);
        return new Bucket(temp._id, temp.name, temp.owner);
    }

    static async getBucketByName(owner, name) {
        const temp = await database.getBucketByName(owner, name);
        return new Bucket(temp._id, temp.name, temp.owner);
    }

    static async getBuckets(owner) {
        const tempBuckets = await database.getBuckets(owner)
        .catch(() => {
            throw "Error Getting Buckets"
        });
        let buckets = [];
        for (const bucket of tempBuckets) {
            buckets.push(new Bucket(bucket._id, bucket.name, bucket.owner));
        }
        return buckets;
    }

    static async createBucket(owner, name) {
        const result = await database.createBucket(
            owner,
            name);
        const bucket = await Bucket.getBucket(result.ops[0]._id);
        const own = await Owner.getOwner(owner);
        own.addBucket(bucket._id);
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