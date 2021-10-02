const database = require("../data");
var auth = require("../../api/auth");

class User {
    constructor(email, password, firstName, lastName, buckets) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.buckets = buckets;
    }

    static async createUser(email, pass, passCheck, firstName, lastName) {
        if (typeof email === 'undefined' || email === '')
        {
            throw "Invalid Email";
        }
        if (typeof firstName === 'undefined' || firstName === '')
        {
            throw "Invalid First Name";
        }
        if (typeof lastName === 'undefined' || lastName === '')
        {
            throw "Invalid Last Name";
        }
        if (typeof pass === 'undefined' || passCheck === 'undefined' || pass.length < 4 || pass !== passCheck)
        {
            throw "Invalid Password";
        }
        const hash = await auth.hashPassword(pass);
        const result = await database.createUser(
            email,
            hash,
            firstName,
            lastName,
            []);
        return new User(email);
    }

    static async getUser(email) {
        const user = await database.getUser(email);
        return new User(user.email, user.password, user.firstName, user.lastName, user.buckets);
    }

    async addBucket(bucket) {
        if (this.buckets.includes(bucket)) {
            throw "Bucket Already Exists";
        }
        this.buckets.push(bucket);
        const res = await database.setBuckets(this.email, this.buckets);
        this.buckets = await User.getUser(this.email).buckets;
    }

    deleteBucket(bucket) {
        if (this.buckets.includes(bucket)) {
            const index = this.buckets.indexOf(bucket);
            this.buckets.splice(index, 1);
            database.setBuckets(this.email, this.buckets);
        } else {
            throw "Bucket Does Not Exist";
        }
    }

    deleteUser() {
        console.log("Does not exist yet");
    }

    editUser() {
        console.log("Does not exist yet");
    }
}

module.exports = User