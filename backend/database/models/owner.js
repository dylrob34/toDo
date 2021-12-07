const User = require("./user");
const Team = require("./teams");

class Owner {
    // not in use
    constructor(owner) {
        this.parent = owner;
    }

    static async getOwner(owner) {
        console.log(owner);
        let parent = null;
        try {
            try {
                parent = await User.getUser(owner);
            } catch (message) {
                throw "User not found, trying team..."
            }
        } catch (message) {
            try {
                parent = await Team.getTeam(owner);
            } catch {
                return null;
            }
        }
        return parent;
    }
    // not in use
    async deleteBucket(id) {
        await this.parent.deleteBucket(id);
    }
}

module.exports = Owner