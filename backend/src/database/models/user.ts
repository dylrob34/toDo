import database from "../data";
import auth from "../../api/auth";

class User {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    buckets: string[]

    constructor(email: string, password: string, firstName: string, lastName: string, buckets: string[]) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.buckets = buckets;
    }

    static async createUser(email: string, pass: string, passCheck: string, firstName: string, lastName: string, team: boolean): Promise<User> {
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
        const hash = await auth.hashPassword(pass) as string;
        const result = await database.createUser(
            email,
            hash,
            firstName,
            lastName,
            []);
        return new User(email, pass, firstName, lastName, null);
    }

    static async getUser(email: string): Promise<User> {
        const user = await database.getUser(email) as User;
        return new User(user.email, user.password, user.firstName, user.lastName, user.buckets);
    }

    async addBucket(bucket: string) {
        if (this.buckets.includes(bucket)) {
            throw new Error("Bucket Already Exists");
        }
        this.buckets.push(bucket);
        const res = await database.setBuckets(this.email, this.buckets);
        const tempBuckets = await User.getUser(this.email) as User;
        this.buckets = tempBuckets.buckets;
    }

    deleteBucket(bucket: string) {
        if (this.buckets.includes(bucket)) {
            const index = this.buckets.indexOf(bucket);
            this.buckets.splice(index, 1);
            database.setBuckets(this.email, this.buckets);
        } else {
            throw new Error("Bucket Does Not Exist");
        }
    }

    editBucket(oldBucket: string, newBucket: string) {
        if (this.buckets.includes(oldBucket)) {
            const index = this.buckets.indexOf(oldBucket);
            this.buckets[index] = newBucket;
            database.setBuckets(this.email, this.buckets);
        } else {
            throw new Error("Bucket Does Not Exist");
        }
    }

    deleteUser() {
        console.log("Does not exist yet");
    }

    editUser() {
        console.log("Does not exist yet");
    }
}

export default User