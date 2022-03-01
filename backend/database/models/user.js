const database = require("../data");
var auth = require("../../api/auth");

class User {
    constructor(email, password, firstName, lastName, buckets, gender, day, month, year, timeSetting, showCompleted) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.buckets = buckets;
        this.gender = gender;
        this.day =  day;
        this.month = month;
        this.year = year;
        this.timeSetting = timeSetting;
        this.showCompleted = showCompleted;
    }

    static async createUser(email, pass, passCheck, firstName, lastName) {
        if (typeof email === 'undefined' || email === '')
        {
            throw new Error("Invalid Email");
        }
        if (typeof firstName === 'undefined' || firstName === '')
        {
            throw new Error("Invalid First Name");
        }
        if (typeof lastName === 'undefined' || lastName === '')
        {
            throw new Error("Invalid Last Name");
        }
        if (typeof pass === 'undefined' || passCheck === 'undefined' || pass.length < 4 || pass !== passCheck)
        {
            throw new Error("Invalid Password");
        }
        const hash = await auth.hashPassword(pass);
        const result = await database.createUser(
            email,
            hash,
            firstName,
            lastName,
            [],
            "",
            "DD",
            "MM",
            "YYYY",
            false,
            false);
        return new User(email);
    }

    static async getUser(email) {
        const user = await database.getUser(email);
        const buckets = user.buckets.map((buck) => {
            return buck.toString()
        })
        return new User(user.email, user.password, user.firstName, user.lastName, buckets, user.gender, user.day, user.month, user.year, user.timeSetting, user.showCompleted);
    }

    async edit(firstName, lastName, gender, day, month, year, timeSetting, showCompleted) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.day =  day;
        this.month = month;
        this.year = year;
        this.timeSetting = timeSetting;
        this.showCompleted = showCompleted;

        return await database.updateUser(this.email, this.firstName, this.lastName, this.gender, this.day, this.month, this.year, this.timeSetting, this.showCompleted);
    }

    async addBucket(bucket) {
        if (this.buckets.includes(bucket)) {
            throw "Bucket Already Exists";
        }
        this.buckets.push(bucket);
        const res = await database.setBuckets(this.email, this.buckets);
        this.buckets = await User.getUser(this.email).buckets;
    }

    async deleteBucket(bucket) {
        if (this.buckets.includes(bucket)) {
            const index = this.buckets.indexOf(bucket);
            this.buckets.splice(index, 1);
            return await database.setBuckets(this.email, this.buckets);
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